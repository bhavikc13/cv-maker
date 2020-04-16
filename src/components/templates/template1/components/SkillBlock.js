import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

const SkillBlock = ({
  id,
  auth,
  index,
  moveBlock,
  findBlock,
  eventKey,
  updateOrderOfSkillBlocks,
  removeOrderOfSkillBlock,
  cvid,
  aoi,
  pl,
  tt,
  te,
  updateAOI,
  updatePL,
  updatePrevUrl,
  updateTE,
  updateTT,
}) => {
  const [state, setState] = useState({ ok: false });
  /*useEffect(() => {
    if (SkillBlocks !== undefined) setState({ isLoading: false });
  }, [SkillBlocks]);*/
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "skillBlock", id, originalIndex },
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
    accept: "skillBlock",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const handleChangeAOI = (event) => {
    updateAOI(event.target.value, auth.uid, cvid);
  };

  const handleChangePL = (event) => {
    updatePL(event.target.value, auth.uid, cvid);
  };

  const handleChangeTT = (event) => {
    updateTT(event.target.value, auth.uid, cvid);
  };

  const handleChangeTE = (event) => {
    updateTE(event.target.value, auth.uid, cvid);
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
      {id === 1 ? (
        <Card key={id} ref={preview} style={bgcolor}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={index}
            style={accordStyle}
          >
            Expertise Area/Area(s) of Interest
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
                <Form.Group controlId="formGroupAOI">
                  <Form.Control
                    className="inputStyle"
                    style={bgcolor}
                    as="textarea"
                    rows="3"
                    placeholder="Web Development, Machine Learning..."
                    onChange={(event) => handleChangeAOI(event)}
                    defaultValue={aoi}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ) : null}
      {id === 2 ? (
        <Card key={id} ref={preview} style={bgcolor}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={index}
            style={accordStyle}
          >
            Programming Language(s)
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
                <Form.Group controlId="formGroupPL">
                  {" "}
                  <Form.Control
                    className="inputStyle"
                    style={bgcolor}
                    as="textarea"
                    rows="3"
                    placeholder="C++, Python..."
                    onChange={(event) => handleChangePL(event)}
                    defaultValue={pl}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ) : null}
      {id === 3 ? (
        <Card key={id} ref={preview} style={bgcolor}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={index}
            style={accordStyle}
          >
            Tools and Technologies
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
                <Form.Group controlId="formGroupTT">
                  {" "}
                  <Form.Control
                    className="inputStyle"
                    style={bgcolor}
                    as="textarea"
                    rows="3"
                    placeholder="React JS, Redux, Firebase..."
                    onChange={(event) => handleChangeTT(event)}
                    defaultValue={tt}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ) : null}
      {id === 4 ? (
        <Card key={id} ref={preview} style={bgcolor}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={index}
            style={accordStyle}
          >
            Technical Electives
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
                <Form.Group controlId="formGroupTE">
                  {" "}
                  <Form.Control
                    className="inputStyle"
                    style={bgcolor}
                    as="textarea"
                    rows="3"
                    placeholder="Software Engineering, Operating System..."
                    onChange={(event) => handleChangeTE(event)}
                    defaultValue={te}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
    orderOfSkillBlocks: state.orderOfSkillBlocksRed.orderOfSkillBlocks,
    aoi: state.skillRed_1.areaOfInterest_1,
    pl: state.skillRed_1.proLanguages_1,
    tt: state.skillRed_1.toolsAndTech_1,
    te: state.skillRed_1.techElectives_1,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAOI: (aoi, uid, cvid) => {
      dispatch({ type: "UPDATE_AOI_1", aoi: aoi, uid: uid, cvid: cvid });
    },
    updatePL: (pl, uid, cvid) => {
      dispatch({ type: "UPDATE_PL_1", pl: pl, uid: uid, cvid: cvid });
    },
    updateTT: (tt, uid, cvid) => {
      dispatch({ type: "UPDATE_TT_1", tt: tt, uid: uid, cvid: cvid });
    },
    updateTE: (te, uid, cvid) => {
      dispatch({ type: "UPDATE_TE_1", te: te, uid: uid, cvid: cvid });
    },
    updatePrevUrl: (prevUrl) => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl,
      });
    },
    updateOrderOfSkillBlocks: (orderOfSkillBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_SKILL_BLOCKS",
        orderOfSkillBlocks: orderOfSkillBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    removeOrderOfSkillBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_ORDER_OF_SKILL_BLOCK",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillBlock);
