import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import firestore from "../../../firebase/firestore";

class ProjectInfo extends Component {
  handleAddProjectBlock = event => {
    let tid = Date.now();
    let newBlock = {
      id: tid,
      projectName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addProjectBlock(newBlock);
  };
  componentDidUpdate() {
    firestore
      .collection("project")
      .doc(this.props.id)
      .set({
        ...this.props.projectBlocks
      })
      .then(console.log("update project"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    let TprojectBlocks = this.props.projectBlocks;
    let n = TprojectBlocks.length;
    for (let i = 0; i < n; i++) {
      this.props.removeProjectBlock(TprojectBlocks[i].id);
    }
  }
  componentDidMount() {
    firestore
      .collection("project")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let project = resp.data();
        if (!project) return null;
        let sz = Object.keys(project).length;
        for (let i = 0; i < sz; i++) {
          let newBlock = {
            id: project[i].id,
            projectName: project[i].projectName,
            description: project[i].description,
            supervisor: project[i].supervisor,
            start: project[i].start,
            end: project[i].end,
            teamSize: project[i].teamSize
          };
          this.props.addProjectBlock(newBlock);
        }
      });
  }
  handleChangeProjectName = (event, id) => {
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
  };

  handleRemoveProjectBlock = id => {
    this.props.removeProjectBlock(id);
  };

  render() {
    return (
      <div>
        <Accordion defaultActiveKey=" ">
          {this.props.projectBlocks.map((value, index) => {
            return (
              <Card key={value.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  Project #{index + 1}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="projectName">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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

                    <Button
                      variant="danger"
                      onClick={() => {
                        this.handleRemoveProjectBlock(value.id);
                      }}
                      style={{
                        display: "inline-block",
                        float: "left",
                        margin: "5px"
                      }}
                    >
                      {" "}
                      -Remove{" "}
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>

        <Button variant="primary" onClick={this.handleAddProjectBlock}>
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectBlocks: state.projectRed.projectBlocks,
    project: state.firestore.ordered.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProjectBlock: newBlock => {
      dispatch({ type: "ADD_PROJECT_BLOCK", newBlock: newBlock });
    },
    updateProjectName: (projectName, id) => {
      dispatch({
        type: "UPDATE_PROJECT_NAME",
        projectName: projectName,
        id: id
      });
    },
    updateDescription: (description, id) => {
      dispatch({
        type: "UPDATE_PROJECT_DESCRIPTION",
        description: description,
        id: id
      });
    },
    updateSupervisor: (supervisor, id) => {
      dispatch({
        type: "UPDATE_PROJECT_SUPERVISOR",
        supervisor: supervisor,
        id: id
      });
    },
    updateStart: (start, id) => {
      dispatch({ type: "UPDATE_PROJECT_START", start: start, id: id });
    },
    updateEnd: (end, id) => {
      dispatch({ type: "UPDATE_PROJECT_END", end: end, id: id });
    },
    updateTeamSize: (teamSize, id) => {
      dispatch({
        type: "UPDATE_PROJECT_TEAM_SIZE",
        teamSize: teamSize,
        id: id
      });
    },
    removeProjectBlock: id => {
      dispatch({ type: "REMOVE_PROJECT_BLOCK", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfo);
