import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

const HobbyBlock = ({
  id,
  auth,
  index,
  moveBlock,
  findBlock,
  eventKey,
  updateOrderOfHobbyBlocks,
  removeHobbyBlock,
  removeOrderOfHobbyBlock,
  cvid,
  updateHobby,
  addDummyBlock,
  removeDummyBlock,
  hobbyBlocks,
}) => {
  const [state, setState] = useState({ ok: false });
  /*useEffect(() => {
    if (HobbyBlocks !== undefined) setState({ isLoading: false });
  }, [HobbyBlocks]);*/
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "hobbyBlock", id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveBlock(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: "hobbyBlock",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const handleChangeHobby = (event, bid) => {
    updateHobby(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };
  const handleRemoveHobbyBlock = (bid) => {
    removeHobbyBlock(bid, auth.uid, cvid);
    removeOrderOfHobbyBlock(id, auth.uid, cvid);
  };
  const accordStyle = {
    boxShadow: "inset 0 -1px 2px #303030",
  };
  const bgcolor = {
    backgroundColor: "#202020",
    color: "white",
    border: "none",
  };
  const cardBodyBg = {
    backgroundColor: "#282828",
    color: "white",
    border: "none",
  };
  return (
    <React.Fragment>
      {hobbyBlocks
        .filter((e) => e.id === id)
        .map((value) => {
          return (
            <Card key={value.id} ref={preview} style={bgcolor}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={index}
                style={accordStyle}
              >
                Hobby #{index}
                <Button
                  className="float-right remove"
                  size="sm"
                  style={{ border: "none" }}
                  onClick={() => {
                    handleRemoveHobbyBlock(value.id);
                  }}
                >
                  -Remove
                </Button>
                <p
                  ref={(node) => drag(drop(node))}
                  className="float-left"
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    margin: "0px",
                    cursor: "move",
                  }}
                >
                  ::
                </p>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={index}>
                <Card.Body style={cardBodyBg}>
                  <Form>
                    <Form.Group controlId="formGroupPos">
                      {" "}
                      <Form.Control
                        className="inputStyle"
                        style={bgcolor}
                        type="text"
                        placeholder="Reading Books"
                        onChange={(event) => {
                          handleChangeHobby(event, value.id);
                        }}
                        defaultValue={value.information}
                      />
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
    orderOfHobbyBlocks: state.orderOfHobbyBlocksRed.orderOfHobbyBlocks,
    hobbyBlocks: state.hobbyRed_1.hobbyBlocks_1,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDummyBlock: (dummyBlock) => {
      dispatch({
        type: "ADD_DUMMY_BLOCK_1",
        dummyBlock: dummyBlock,
      });
    },
    removeDummyBlock: (id) => {
      dispatch({
        type: "REMOVE_DUMMY_BLOCK_1",
        id: id,
      });
    },
    addHobbyBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_HOBBY_BLOCK_1",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    updatePrevUrl: (prevUrl) => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl,
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
    removeOrderOfHobbyBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_ORDER_OF_HOBBY_BLOCK",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HobbyBlock);
