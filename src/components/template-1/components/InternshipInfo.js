import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
class InternshipInfo extends Component {
  handleAddInternshipBlock = event => {
    let tid = Date.now();
    let newBlock = {
      id: tid,
      organizationName: "",
      description: "",
      supervisor: "",
      start: "",
      end: "",
      teamSize: ""
    };
    this.props.addInternshipBlock(newBlock);
  };
  componentDidMount() {
    let internship = this.props.internship.filter(e => e.id === this.props.id);
    if (internship.length === 0) return null;
    let sz = Object.keys(internship[0]).length;
    for (let i = 0; i < sz - 3; i++) {
      let newBlock = {
        id: internship[0][i].id,
        organizationName: internship[0][i].organizationName,
        description: internship[0][i].description,
        supervisor: internship[0][i].supervisor,
        start: internship[0][i].start,
        end: internship[0][i].end,
        teamSize: internship[0][i].teamSize
      };
      this.props.removeInternshipBlock(newBlock.id);
      this.props.addInternshipBlock(newBlock);
    }
  }
  handleChangeOrganizationName = (event, id) => {
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
  };

  handleRemoveInternshipBlock = id => {
    this.props.removeInternshipBlock(id);
  };

  render() {
    return (
      <div>
        <Accordion defaultActiveKey=" ">
          {this.props.internshipBlocks.map((value, index) => {
            return (
              <Card key={value.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  Internship #{index + 1}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="formGroupOrganizationName">
                        <Form.Label>Organization/Institute Name</Form.Label>
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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
                        <Form.Control
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

                    <Button
                      variant="danger"
                      onClick={() => {
                        this.handleRemoveInternshipBlock(value.id);
                      }}
                      style={{
                        display: "inline-block",
                        float: "left",
                        margin: "5px"
                      }}
                    >
                      -Remove
                    </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>

        <Button variant="primary" onClick={this.handleAddInternshipBlock}>
          +Add
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    internshipBlocks: state.internshipRed.internshipBlocks,
    internship: state.firestore.ordered.internship
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addInternshipBlock: newBlock => {
      dispatch({ type: "ADD_INTERNSHIP_BLOCK", newBlock: newBlock });
    },
    updateOrganiztionName: (organizationName, id) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_ORGANIZATION_NAME",
        organizationName: organizationName,
        id: id
      });
    },
    updateDescription: (description, id) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_DESCRIPTION",
        description: description,
        id: id
      });
    },
    updateSupervisor: (supervisor, id) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_SUPERVISOR",
        supervisor: supervisor,
        id: id
      });
    },
    updateStart: (start, id) => {
      dispatch({ type: "UPDATE_INTERNSHIP_START", start: start, id: id });
    },
    updateEnd: (end, id) => {
      dispatch({ type: "UPDATE_INTERNSHIP_END", end: end, id: id });
    },
    updateTeamSize: (teamSize, id) => {
      dispatch({
        type: "UPDATE_INTERNSHIP_TEAM_SIZE",
        teamSize: teamSize,
        id: id
      });
    },
    removeInternshipBlock: id => {
      dispatch({ type: "REMOVE_INTERNSHIP_BLOCK", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InternshipInfo);
