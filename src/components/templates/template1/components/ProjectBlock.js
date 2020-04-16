import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

const ProjectBlock = ({
  id,
  auth,
  index,
  moveBlock,
  findBlock,
  eventKey,
  updateOrderOfProjectBlocks,
  removeProjectBlock,
  removeOrderOfProjectBlock,
  cvid,
  updateDescription,
  updateEnd,
  updateProjectName,
  updateStart,
  updateSupervisor,
  updateTeamSize,
  addDummyBlock,
  removeDummyBlock,
  projectBlocks,
}) => {
  const [state, setState] = useState({ ok: false });
  /*useEffect(() => {
    if (ProjectBlocks !== undefined) setState({ isLoading: false });
  }, [ProjectBlocks]);*/
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "projectBlock", id, originalIndex },
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
    accept: "projectBlock",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const handleChangeProjectName = (event, bid) => {
    updateProjectName(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };

  const handleChangeDescription = (event, bid) => {
    updateDescription(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };

  const handleChangeSupervisor = (event, bid) => {
    updateSupervisor(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };

  const handleChangeStart = (event, bid) => {
    updateStart(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };

  const handleChangeEnd = (event, bid) => {
    updateEnd(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };

  const handleChangeTeamSize = (event, bid) => {
    updateTeamSize(event.target.value, bid, auth.uid, cvid);
    let dummyBlock = { id: "dummy" };
    addDummyBlock(dummyBlock);
    removeDummyBlock("dummy");
  };

  const handleRemoveProjectBlock = (bid) => {
    removeProjectBlock(bid, auth.uid, cvid);
    removeOrderOfProjectBlock(id, auth.uid, cvid);
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
      {projectBlocks
        .filter((e) => e.id === id)
        .map((value) => {
          return (
            <Card key={value.id} ref={preview} style={bgcolor}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={index}
                style={accordStyle}
              >
                Project #{index}
                <Button
                  className="float-right remove"
                  size="sm"
                  style={{ border: "none" }}
                  onClick={() => {
                    handleRemoveProjectBlock(value.id);
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
                    <Form.Group controlId="projectName">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={cardBodyBg}
                        type="text"
                        placeholder="Project Title"
                        onChange={(event) => {
                          handleChangeProjectName(event, value.id);
                        }}
                        defaultValue={value.projectName}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={cardBodyBg}
                        as="textarea"
                        row="2"
                        placeholder="Description about project..."
                        onChange={(event) => {
                          handleChangeDescription(event, value.id);
                        }}
                        defaultValue={value.description}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupScore">
                      <Form.Label>Guide</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={cardBodyBg}
                        type="text"
                        placeholder="Prof. X"
                        onChange={(event) => {
                          handleChangeSupervisor(event, value.id);
                        }}
                        defaultValue={value.supervisor}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupScore">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={cardBodyBg}
                        type="text"
                        placeholder="February, 2020"
                        onChange={(event) => {
                          handleChangeStart(event, value.id);
                        }}
                        defaultValue={value.start}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupScore">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={cardBodyBg}
                        type="text"
                        placeholder="April, 2020"
                        onChange={(event) => {
                          handleChangeEnd(event, value.id);
                        }}
                        defaultValue={value.end}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupScore">
                      <Form.Label>Team Size</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={cardBodyBg}
                        type="text"
                        placeholder="#4"
                        onChange={(event) => {
                          handleChangeTeamSize(event, value.id);
                        }}
                        defaultValue={value.teamSize}
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
    orderOfProjectBlocks: state.orderOfProjectBlocksRed.orderOfProjectBlocks,
    projectBlocks: state.projectRed_1.projectBlocks_1,
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
    addProjectBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_PROJECT_BLOCK_1",
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
    updateOrderOfProjectBlocks: (orderOfProjectBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_PROJECT_BLOCKS",
        orderOfProjectBlocks: orderOfProjectBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    updateProjectName: (projectName, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_PROJECT_NAME_1",
        projectName: projectName,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateDescription: (description, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_PROJECT_DESCRIPTION_1",
        description: description,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateSupervisor: (supervisor, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_PROJECT_SUPERVISOR_1",
        supervisor: supervisor,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateStart: (start, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_PROJECT_START_1",
        start: start,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateEnd: (end, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_PROJECT_END_1",
        end: end,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateTeamSize: (teamSize, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_PROJECT_TEAM_SIZE_1",
        teamSize: teamSize,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removeProjectBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_PROJECT_BLOCK_1",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removeOrderOfProjectBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_ORDER_OF_PROJECT_BLOCK",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectBlock);
