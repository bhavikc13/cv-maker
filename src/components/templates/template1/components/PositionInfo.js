import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import "./CompStyle.css";
import Loader from "./../../../loader/Loader";
import PositionInfoComp from "./PositionInfoComp";

class PositionInfo extends Component {
  state = { isLoading: false };
  handleAddPositionBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addPositionBlock(newBlock, this.props.auth.uid, this.props.id);
    this.props.addOrderOfPositionBlock(
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
      .collection("position")
      .doc(this.props.id)
      .get()
      .then((resp) => {
        let position = resp.data();
        if (!position) {
          this.setState({ isLoading: false });
          return null;
        }
        let sz = Object.keys(position).length;
        let blocks = [];
        for (let i = 0; i < sz; i++) {
          blocks.push(position[i]);
        }
        this.props.loadAllBlocks(blocks);
        this.setState({ isLoading: false });
      });
  }

  /*handleChangePosition = (event, id) => {
    this.props.updatePosition(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addPositionBlock(dummyBlock);
    this.props.removePositionBlock("dummy");
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

  handleRemovePositionBlock = id => {
    this.props.removePositionBlock(id);
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
        <PositionInfoComp cvid={this.props.id} />
        {/*{this.props.positionBlocks.map((value, index) => {
          return (
            <Card body style={cardStyle} key={index}>
              <Form>
                <Form.Group controlId="formGroupPos">
                  {" "}
                  <Form.Control className="inputStyle" style={bgcolor}
                    type="text"
                    placeholder="Member of X committee from January 2020 to May 2020..."
                    onChange={event => {
                      this.handleChangePosition(event, value.id);
                    }}
                    defaultValue={this.props.positionBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                className="remove"
                onClick={() => {
                  this.handleRemovePositionBlock(value.id);
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
          onClick={this.handleAddPositionBlock}
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
    positionBlocks: state.positionRed_1.positionBlocks_1,
    auth: state.firebase.auth,
    orderOfPositionBlocks: state.orderOfPositionBlocksRed.orderOfPositionBlocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPositionBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_POSITION_BLOCK_1",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    updatePosition: (information, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_POSITION_INFORMATION_1",
        information: information,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removePositionBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_POSITION_BLOCK_1",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateOrderOfPositionBlocks: (orderOfPositionBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_POSITION_BLOCKS",
        orderOfPositionBlocks: orderOfPositionBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    addOrderOfPositionBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_ORDER_OF_POSITION_BLOCK",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    removeAllBlocks: () => {
      dispatch({
        type: "REMOVE_ALL_POSITION_BLOCKS_1",
      });
    },
    loadAllBlocks: (blocks) => {
      dispatch({
        type: "LOAD_ALL_POSITION_BLOCKS_1",
        blocks: blocks,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionInfo);
