import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

const InternshipBlock = ({
  id,
  auth,
  index,
  moveBlock,
  findBlock,
  eventKey,
  updateOrderOfInternshipBlocks,
  removeInternshipBlock,
  removeOrderOfInternshipBlock,
  cvid,
  updateDescription,
  updateEnd,
  updateOrganiztionName,
  updateStart,
  updateSupervisor,
  updateTeamSize,
  addDummyBlock,
  removeDummyBlock,
  internshipBlocks,
}) => {
  const [state, setState] = useState({ ok: false });
  /*useEffect(() => {
    if (internshipBlocks !== undefined) setState({ isLoading: false });
  }, [internshipBlocks]);*/
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "internshipBlock", id, originalIndex },
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
    accept: "internshipBlock",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const handleChangeOrganizationName = (event, bid) => {
    updateOrganiztionName(event.target.value, bid, auth.uid, cvid);
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
  const handleRemoveInternshipBlock = (bid) => {
    removeInternshipBlock(bid, auth.uid, cvid);
    removeOrderOfInternshipBlock(id, auth.uid, cvid);
  };
  const accordStyle = {
    boxShadow: "inset 0 -1px 2px #303030",
  };
  const bgcolor = {
    backgroundColor: "#202020",
    margin: "10px 0px",
    color: "white",
    border: "none",
  };
  return (
    <React.Fragment>
      {internshipBlocks
        .filter((e) => e.id === id)
        .map((value) => {
          return (
            <Card key={value.id} ref={preview} style={bgcolor}>
              <Accordion.Toggle
                as={Card.Header}
                eventKey={index}
                style={accordStyle}
              >
                Internship #{index}
                <Button
                  className="float-right remove"
                  size="sm"
                  style={{ border: "none" }}
                  onClick={() => {
                    handleRemoveInternshipBlock(value.id);
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
                <Card.Body>
                  <Form style={bgcolor}>
                    <Form.Group controlId="formGroupOrganizationName">
                      <Form.Label>Organization/Institute Name</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={bgcolor}
                        type="text"
                        placeholder="Microsoft/DA-IICT"
                        onChange={(event) => {
                          handleChangeOrganizationName(event, value.id);
                        }}
                        defaultValue={value.organizationName}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={bgcolor}
                        as="textarea"
                        row="2"
                        placeholder="Description about internship..."
                        onChange={(event) => {
                          handleChangeDescription(event, value.id);
                        }}
                        defaultValue={value.description}
                      />
                    </Form.Group>

                    <Form.Group controlId="formGroupScore">
                      <Form.Label>Guide/Supervisor</Form.Label>
                      <Form.Control
                        className="inputStyle"
                        style={bgcolor}
                        type="text"
                        placeholder="Prof./Mr./Mrs./Ms. X"
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
                        style={bgcolor}
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
                        style={bgcolor}
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
                        style={bgcolor}
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
    orderOfInternshipBlocks:
      state.orderOfInternshipBlocksRed.orderOfInternshipBlocks,
    internshipBlocks: state.internshipRed_1.internshipBlocks_1,
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
    addInternshipBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_INTERNSHIP_BLOCK_1",
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
    updateOrderOfInternshipBlocks: (orderOfInternshipBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_INTERNSHIP_BLOCKS",
        orderOfInternshipBlocks: orderOfInternshipBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    updateOrganiztionName: (organizationName, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_ORGANIZATION_NAME_1",
        organizationName: organizationName,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateDescription: (description, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_DESCRIPTION_1",
        description: description,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateSupervisor: (supervisor, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_SUPERVISOR_1",
        supervisor: supervisor,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateStart: (start, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_START_1",
        start: start,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateEnd: (end, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_END_1",
        end: end,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    updateTeamSize: (teamSize, id, uid, cvid) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_TEAM_SIZE_1",
        teamSize: teamSize,
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removeInternshipBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_INTERNSHIP_BLOCK_1",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
    removeOrderOfInternshipBlock: (id, uid, cvid) => {
      dispatch({
        type: "REMOVE_ORDER_OF_INTERNSHIP_BLOCK",
        id: id,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InternshipBlock);
