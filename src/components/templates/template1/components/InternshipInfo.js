import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import InternshipInfoComp from "./InternshipInfoComp";
import Loader from "./../../../loader/Loader";
import "./CompStyle.css";

class InternshipInfo extends Component {
  state = { isLoading: false };
  handleAddInternshipBlock = (event) => {
    let tid = Date.now();
    let newBlock = {
      id: tid,
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: "",
    };
    this.props.addInternshipBlock(newBlock, this.props.auth.uid, this.props.id);
    this.props.addOrderOfInternshipBlock(
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
      .collection("internship")
      .doc(this.props.id)
      .get()
      .then((resp) => {
        let internship = resp.data();
        if (!internship) {
          this.setState({ isLoading: false });
          return null;
        }
        let sz = Object.keys(internship).length;
        let blocks = [];
        for (let i = 0; i < sz; i++) {
          blocks.push(internship[i]);
        }
        this.props.loadAllBlocks(blocks);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  /*handleChangeOrganizationName = (event, id) => {
    this.props.updateOrganiztionName(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(dummyBlock);
    this.props.removeInternshipBlock("dummy");
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

  handleChangeDescription = (event, id) => {
    this.props.updateDescription(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(dummyBlock);
    this.props.removeInternshipBlock("dummy");
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

  handleChangeSupervisor = (event, id) => {
    this.props.updateSupervisor(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(dummyBlock);
    this.props.removeInternshipBlock("dummy");
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

  handleChangeStart = (event, id) => {
    this.props.updateStart(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(dummyBlock);
    this.props.removeInternshipBlock("dummy");
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

  handleChangeEnd = (event, id) => {
    this.props.updateEnd(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(dummyBlock);
    this.props.removeInternshipBlock("dummy");
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

  handleChangeTeamSize = (event, id) => {
    this.props.updateTeamSize(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(dummyBlock);
    this.props.removeInternshipBlock("dummy");
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

  handleRemoveInternshipBlock = id => {
    this.props.removeInternshipBlock(id);
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
      margin: "10px 0px",
      color: "white",
      border: "none",
    };
    const accordStyle = {
      boxShadow: "inset 0 -1px 2px #303030",
    };

    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div>
        <InternshipInfoComp cvid={this.props.id} />
        {/*<Accordion >
          {this.props.internshipBlocks.map((value, index) => {
            return (
              <Card key={value.id} style={bgcolor}>
                <Accordion.Toggle as={Card.Header} eventKey={index} style={accordStyle}>
                  Internship #{index + 1}
                  <Button
                    className="float-right remove"
                    size="sm"
                    style={{border:"none"}}
                    onClick={() => {
                      this.handleRemoveInternshipBlock(value.id);
                    }}
                  >
                    -Remove
                  </Button>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Form style={bgcolor}>
                      <Form.Group controlId="formGroupOrganizationName">
                        <Form.Label>Organization/Institute Name</Form.Label>
                        <Form.Control className="inputStyle" style={bgcolor}
                          type="text"
                          placeholder="Microsoft/DA-IICT"
                          onChange={event => {
                            this.handleChangeOrganizationName(event, value.id);
                          }}
                          defaultValue={
                            this.props.internshipBlocks[index].organizationName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control className="inputStyle" style={bgcolor}
                          as="textarea"
                          row="2"
                          placeholder="Description about internship..."
                          onChange={event => {
                            this.handleChangeDescription(event, value.id);
                          }}
                          defaultValue={
                            this.props.internshipBlocks[index].description
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>Guide/Supervisor</Form.Label>
                        <Form.Control className="inputStyle" style={bgcolor}
                          type="text"
                          placeholder="Prof./Mr./Mrs./Ms. X"
                          onChange={event => {
                            this.handleChangeSupervisor(event, value.id);
                          }}
                          defaultValue={
                            this.props.internshipBlocks[index].supervisor
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control className="inputStyle" style={bgcolor}
                          type="text"
                          placeholder="February, 2020"
                          onChange={event => {
                            this.handleChangeStart(event, value.id);
                          }}
                          defaultValue={
                            this.props.internshipBlocks[index].start
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control className="inputStyle" style={bgcolor}
                          type="text"
                          placeholder="April, 2020"
                          onChange={event => {
                            this.handleChangeEnd(event, value.id);
                          }}
                          defaultValue={this.props.internshipBlocks[index].end}
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>Team Size</Form.Label>
                        <Form.Control className="inputStyle" style={bgcolor}
                          type="text"
                          placeholder="#4"
                          onChange={event => {
                            this.handleChangeTeamSize(event, value.id);
                          }}
                          defaultValue={
                            this.props.internshipBlocks[index].teamSize
                          }
                        />
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>*/}
        <Button
          className="add"
          onClick={this.handleAddInternshipBlock}
          style={{ marginTop: "10px" }}
        >
          +Add
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    internshipBlocks: state.internshipRed_1.internshipBlocks_1,
    auth: state.firebase.auth,
    orderOfInternshipBlocks:
      state.orderOfInternshipBlocksRed.orderOfInternshipBlocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addInternshipBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_INTERNSHIP_BLOCK_1",
        newBlock: newBlock,
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
    updateOrderOfInternshipBlocks: (orderOfInternshipBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_INTERNSHIP_BLOCKS",
        orderOfInternshipBlocks: orderOfInternshipBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    addOrderOfInternshipBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_ORDER_OF_INTERNSHIP_BLOCK",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    removeAllBlocks: () => {
      dispatch({
        type: "REMOVE_ALL_INTERNSHIP_BLOCKS_1",
      });
    },
    loadAllBlocks: (blocks) => {
      dispatch({
        type: "LOAD_ALL_INTERNSHIP_BLOCKS_1",
        blocks: blocks,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InternshipInfo);
