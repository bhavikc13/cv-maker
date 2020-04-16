import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

const AwardBlock = ({
  id,
  auth,
  index,
  moveBlock,
  findBlock,
  eventKey,
  updateOrderOfAwardBlocks,
  removeAwardBlock,
  removeOrderOfAwardBlock,
  cvid,
  updateAward,
  addDummyBlock,
  removeDummyBlock,
  awardBlocks,
}) => {
  const [state, setState] = useState({ ok: false });
  /*useEffect(() => {
    if (AwardBlocks !== undefined) setState({ isLoading: false });
  }, [AwardBlocks]);*/
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "awardBlock", id, originalIndex },
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
    accept: "awardBlock",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const handleChangeAward = (event, bid) => {
    updateAward(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };
  const handleRemoveAwardBlock = (bid) => {
    removeAwardBlock(bid, auth.uid, cvid);
    removeOrderOfAwardBlock(id, auth.uid, cvid);
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
      {awardBlocks
        .filter((e) => e.id === id)
        .map((value) => {
          return (
            <Card key={value.id} ref={preview} style={bgcolor}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={index}
                style={accordStyle}
              >
                Award #{index}
                <Button
                  className="float-right remove"
                  size="sm"
                  style={{ border: "none" }}
                  onClick={() => {
                    handleRemoveAwardBlock(value.id);
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
                          handleChangeAward(event, value.id);
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
    orderOfAwardBlocks: state.orderOfAwardBlocksRed.orderOfAwardBlocks,
    awardBlocks: state.awardRed_1.awardBlocks_1,
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
    addAwardBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_AWARD_BLOCK_1",
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
    updateOrderOfAwardBlocks: (orderOfAwardBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_AWARD_BLOCKS",
        orderOfAwardBlocks: orderOfAwardBlocks,
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
    removeOrderOfAwardBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_ORDER_OF_AWARD_BLOCK",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AwardBlock);
