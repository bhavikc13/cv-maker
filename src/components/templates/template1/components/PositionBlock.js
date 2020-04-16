import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

const PositionBlock = ({
  id,
  auth,
  index,
  moveBlock,
  findBlock,
  eventKey,
  updateOrderOfPositionBlocks,
  removePositionBlock,
  removeOrderOfPositionBlock,
  cvid,
  updatePosition,
  addDummyBlock,
  removeDummyBlock,
  positionBlocks,
}) => {
  const [state, setState] = useState({ ok: false });
  /*useEffect(() => {
    if (PositionBlocks !== undefined) setState({ isLoading: false });
  }, [PositionBlocks]);*/
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "positionBlock", id, originalIndex },
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
    accept: "positionBlock",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const handleChangePosition = (event, bid) => {
    updatePosition(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };
  const handleRemovePositionBlock = (bid) => {
    removePositionBlock(bid, auth.uid, cvid);
    removeOrderOfPositionBlock(id, auth.uid, cvid);
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
      {positionBlocks
        .filter((e) => e.id === id)
        .map((value) => {
          return (
            <Card key={value.id} ref={preview} style={bgcolor}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={index}
                style={accordStyle}
              >
                Position #{index}
                <Button
                  className="float-right remove"
                  size="sm"
                  style={{ border: "none" }}
                  onClick={() => {
                    handleRemovePositionBlock(value.id);
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
                        placeholder="Member of X committee from January 2020 to May 2020..."
                        onChange={(event) => {
                          handleChangePosition(event, value.id);
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
    orderOfPositionBlocks: state.orderOfPositionBlocksRed.orderOfPositionBlocks,
    positionBlocks: state.positionRed_1.positionBlocks_1,
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
    addPositionBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_POSITION_BLOCK_1",
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
    updateOrderOfPositionBlocks: (orderOfPositionBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_POSITION_BLOCKS",
        orderOfPositionBlocks: orderOfPositionBlocks,
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
    removeOrderOfPositionBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_ORDER_OF_POSITION_BLOCK",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PositionBlock);
