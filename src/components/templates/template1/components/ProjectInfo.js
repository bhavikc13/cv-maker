import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import ProjectInfoComp from "./ProjectInfoComp";
import "./CompStyle.css";
import Loader from "./../../../loader/Loader";

class ProjectInfo extends Component {
  state = { isLoading: false };

  handleAddProjectBlock = (event) => {
    let tid = Date.now();
    let newBlock = {
      id: tid,
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: "",
    };
    this.props.addProjectBlock(newBlock, this.props.auth.uid, this.props.id);
    this.props.addOrderOfProjectBlock(
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
      .collection("project")
      .doc(this.props.id)
      .get()
      .then((resp) => {
        let project = resp.data();
        if (!project) {
          this.setState({ isLoading: false });
          return null;
        }
        let sz = Object.keys(project).length;
        let blocks = [];
        for (let i = 0; i < sz; i++) {
          blocks.push(project[i]);
        }
        this.props.loadAllBlocks(blocks);
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }
  /*handleChangeProjectName = (event, id) => {
    this.props.updateProjectName(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(dummyBlock);
    this.props.removeProjectBlock("dummy");
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
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(dummyBlock);
    this.props.removeProjectBlock("dummy");
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
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(dummyBlock);
    this.props.removeProjectBlock("dummy");
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
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(dummyBlock);
    this.props.removeProjectBlock("dummy");
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
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(dummyBlock);
    this.props.removeProjectBlock("dummy");
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
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(dummyBlock);
    this.props.removeProjectBlock("dummy");
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

  handleRemoveProjectBlock = id => {
    this.props.removeProjectBlock(id);
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
    const accordStyle = {
      boxShadow: "inset 0 -1px 2px #303030",
    };
    const cardBodyBg = {
      backgroundColor: "#282828",
      color: "white",
      border: "none",
    };
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div>
        <ProjectInfoComp cvid={this.props.id} />

        {/*<Accordion defaultActiveKey=" ">
          {this.props.projectBlocks.map((value, index) => {
            return (
              <Card key={value.id} style={bgcolor}>
                <Accordion.Toggle as={Card.Header} eventKey={index} style={accordStyle}>
                  Project #{index + 1}
                  <Button
                    className="float-right remove"
                    size="sm"
                    style={{border:"none"}}
                    onClick={() => {
                      this.handleRemoveProjectBlock(value.id);
                    }}
                  >
                    -Remove
                  </Button>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body style={cardBodyBg}>
                    <Form>
                      <Form.Group controlId="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control className="inputStyle" style={cardBodyBg}
                          type="text"
                          placeholder="Project Title"
                          onChange={event => {
                            this.handleChangeProjectName(event, value.id);
                          }}
                          defaultValue={
                            this.props.projectBlocks[index].projectName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control className="inputStyle" style={cardBodyBg}
                          as="textarea"
                          row="2"
                          placeholder="Description about project..."
                          onChange={event => {
                            this.handleChangeDescription(event, value.id);
                          }}
                          defaultValue={
                            this.props.projectBlocks[index].description
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>Guide</Form.Label>
                        <Form.Control className="inputStyle" style={cardBodyBg}
                          type="text"
                          placeholder="Prof. X"
                          onChange={event => {
                            this.handleChangeSupervisor(event, value.id);
                          }}
                          defaultValue={
                            this.props.projectBlocks[index].supervisor
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control className="inputStyle" style={cardBodyBg}
                          type="text"
                          placeholder="February, 2020"
                          onChange={event => {
                            this.handleChangeStart(event, value.id);
                          }}
                          defaultValue={this.props.projectBlocks[index].start}
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>End Time</Form.Label>
                        <Form.Control className="inputStyle" style={cardBodyBg}
                          type="text"
                          placeholder="April, 2020"
                          onChange={event => {
                            this.handleChangeEnd(event, value.id);
                          }}
                          defaultValue={this.props.projectBlocks[index].end}
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>Team Size</Form.Label>
                        <Form.Control className="inputStyle" style={cardBodyBg}
                          type="text"
                          placeholder="#4"
                          onChange={event => {
                            this.handleChangeTeamSize(event, value.id);
                          }}
                          defaultValue={
                            this.props.projectBlocks[index].teamSize
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
          onClick={this.handleAddProjectBlock}
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
    projectBlocks: state.projectRed_1.projectBlocks_1,
    auth: state.firebase.auth,
    orderOfProjectBlocks: state.orderOfProjectBlocksRed.orderOfProjectBlocks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProjectBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_PROJECT_BLOCK_1",
        newBlock: newBlock,
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
    updateOrderOfProjectBlocks: (orderOfProjectBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_PROJECT_BLOCKS",
        orderOfProjectBlocks: orderOfProjectBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    addOrderOfProjectBlock: (newBlock, uid, cvid) => {
      dispatch({
        type: "ADD_ORDER_OF_PROJECT_BLOCK",
        newBlock: newBlock,
        uid: uid,
        cvid: cvid,
      });
    },
    removeAllBlocks: () => {
      dispatch({
        type: "REMOVE_ALL_PROJECT_BLOCKS_1",
      });
    },
    loadAllBlocks: (blocks) => {
      dispatch({
        type: "LOAD_ALL_PROJECT_BLOCKS_1",
        blocks: blocks,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
