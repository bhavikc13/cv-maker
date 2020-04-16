import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import "./CompStyle.css";
import Loader from "./../../../loader/Loader";
import AwardInfoComp from "./AwardInfoComp";

class AwardInfo extends Component {
  state = { isLoading: false };
  handleAddAwardBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addAwardBlock(newBlock, this.props.auth.uid, this.props.id);
    this.props.addOrderOfAwardBlock(
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
      .collection("award")
      .doc(this.props.id)
      .get()
      .then((resp) => {
        let award = resp.data();
        if (!award) {
          this.setState({ isLoading: false });
          return null;
        }
        let sz = Object.keys(award).length;
        let blocks = [];
        for (let i = 0; i < sz; i++) {
          blocks.push(award[i]);
        }
        this.props.loadAllBlocks(blocks);
        this.setState({ isLoading: false });
      });
  }

  /*handleChangeAward = (event, id) => {
    this.props.updateAward(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addAwardBlock(dummyBlock);
    this.props.removeAwardBlock("dummy");
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

  handleRemoveAwardBlock = id => {
    this.props.removeAwardBlock(id);
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
        <AwardInfoComp cvid={this.props.id} />
        {/*{this.props.AwardBlocks.map((value, index) => {
          return (
            <Card body style={cardStyle} key={index}>
              <Form>
                <Form.Group controlId="formGroupPos">
                  {" "}
                  <Form.Control className="inputStyle" style={bgcolor}
                    type="text"
                    placeholder="Member of X committee from January 2020 to May 2020..."
                    onChange={event => {
                      this.handleChangeAward(event, value.id);
                    }}
                    defaultValue={this.props.AwardBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                className="remove"
                onClick={() => {
                  this.handleRemoveAwardBlock(value.id);
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
          onClick={this.handleAddAwardBlock}
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
    awardBlocks: state.awardRed_1.awardBlocks_1,
    auth: state.firebase.auth,
    orderOfAwardBlocks: state.orderOfAwardBlocksRed.orderOfAwardBlocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAwardBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_AWARD_BLOCK_1",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    updateAward: (information, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_AWARD_INFORMATION_1",
        information: information,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removeAwardBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_AWARD_BLOCK_1",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateOrderOfAwardBlocks: (orderOfAwardBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_AWARD_BLOCKS",
        orderOfAwardBlocks: orderOfAwardBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    addOrderOfAwardBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_ORDER_OF_AWARD_BLOCK",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    removeAllBlocks: () => {
      dispatch({
        type: "REMOVE_ALL_AWARD_BLOCKS_1",
      });
    },
    loadAllBlocks: (blocks) => {
      dispatch({
        type: "LOAD_ALL_AWARD_BLOCKS_1",
        blocks: blocks,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AwardInfo);
