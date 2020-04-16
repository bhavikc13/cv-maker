import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import "./CompStyle.css";
import Loader from "./../../../loader/Loader";
import HobbyInfoComp from "./HobbyInfoComp";

class HobbyInfo extends Component {
  state = { isLoading: false };
  handleAddHobbyBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addHobbyBlock(newBlock, this.props.auth.uid, this.props.id);
    this.props.addOrderOfHobbyBlock(
      {
        id: tid,
      },
      this.props.auth.uid,
      this.props.id
    );
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.removeAllBlocks();
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("hobby")
      .doc(this.props.id)
      .get()
      .then((resp) => {
        let hobby = resp.data();
        if (!hobby) {
          this.setState({ isLoading: false });
          return null;
        }
        let sz = Object.keys(hobby).length;
        let blocks = [];
        for (let i = 0; i < sz; i++) {
          blocks.push(hobby[i]);
        }
        this.props.loadAllBlocks(blocks);
        this.setState({ isLoading: false });
      });
  }

  /*handleChangeHobby = (event, id) => {
    this.props.updateHobby(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addHobbyBlock(dummyBlock);
    this.props.removeHobbyBlock("dummy");
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .update({
        updatedAt: new Date()
      })
      .then(() => console.log("update date and time"))
      .catch(err => {
        console.log(err);
      });
  };

  handleRemoveHobbyBlock = id => {
    this.props.removeHobbyBlock(id);
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .update({
        updatedAt: new Date()
      })
      .then(() => console.log("update date and time"))
      .catch(err => {
        console.log(err);
      });
  };*/

  render() {
    const bgcolor = {
      backgroundColor: "#202020",
      color: "white",
      border: "none",
    };
    const cardStyle = {
      boxShadow: "inset 0 0px 4px #303030",
      backgroundColor: "#202020",
      color: "white",
      margin: "10px",
    };

    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div>
        <HobbyInfoComp cvid={this.props.id} />
        {/*{this.props.HobbyBlocks.map((value, index) => {
          return (
            <Card body style={cardStyle} key={index}>
              <Form>
                <Form.Group controlId="formGroupPos">
                  {" "}
                  <Form.Control className="inputStyle" style={bgcolor}
                    type="text"
                    placeholder="Member of X committee from January 2020 to May 2020..."
                    onChange={event => {
                      this.handleChangeHobby(event, value.id);
                    }}
                    defaultValue={this.props.HobbyBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                className="remove"
                onClick={() => {
                  this.handleRemoveHobbyBlock(value.id);
                }}
                style={{
                  display: "inline-block",
                  float: "left",
                  margin: "5px",
                  border:"none"
                }}
              >
                {" "}
                -Remove{" "}
              </Button>
            </Card>
          );
        })}*/}
        <Button
          className="add"
          onClick={this.handleAddHobbyBlock}
          style={{ marginTop: "10px" }}
        >
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hobbyBlocks: state.hobbyRed_1.hobbyBlocks_1,
    auth: state.firebase.auth,
    orderOfHobbyBlocks: state.orderOfHobbyBlocksRed.orderOfHobbyBlocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addHobbyBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_HOBBY_BLOCK_1",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    updateHobby: (information, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_HOBBY_INFORMATION_1",
        information: information,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removeHobbyBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_HOBBY_BLOCK_1",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateOrderOfHobbyBlocks: (orderOfHobbyBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_HOBBY_BLOCKS",
        orderOfHobbyBlocks: orderOfHobbyBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    addOrderOfHobbyBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_ORDER_OF_HOBBY_BLOCK",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    removeAllBlocks: () => {
      dispatch({
        type: "REMOVE_ALL_HOBBY_BLOCKS_1",
      });
    },
    loadAllBlocks: (blocks) => {
      dispatch({
        type: "LOAD_ALL_HOBBY_BLOCKS_1",
        blocks: blocks,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HobbyInfo);
