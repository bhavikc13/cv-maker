import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";

class EducationInfo extends Component {
  handleAddDegreeBlock = e => {
    let id = Date.now();
    let newBlock = {
      id: id,
      degreeName: "",
      instituteName: "",
      year: "",
      score: ""
    };
    this.props.addDegreeBlock(newBlock);
  };
  componentDidMount() {
    let education = this.props.education.filter(e => e.id === this.props.id);
    if (education.length === 0) return null;
    let sz = Object.keys(education[0]).length;
    for (let i = 0; i < sz - 3; i++) {
      let newBlock = {
        id: education[0][i].id,
        degreeName: education[0][i].degreeName,
        instituteName: education[0][i].instituteName,
        year: education[0][i].year,
        score: education[0][i].score
      };
      this.props.removeBlock(newBlock.id);
      this.props.addDegreeBlock(newBlock);
    }
  }
  handleChangeDegreeName = (event, id) => {
    this.props.updateDegreeName(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      degreeName: "",
      instituteName: "",
      year: "",
      score: ""
    };
    this.props.addDegreeBlock(dummyBlock);
    this.props.removeBlock("dummy");
  };

  handleChangeInstituteName = (event, id) => {
    this.props.updateInstituteName(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      degreeName: "",
      instituteName: "",
      year: "",
      score: ""
    };
    this.props.addDegreeBlock(dummyBlock);
    this.props.removeBlock("dummy");
  };

  handleChangeYear = (event, id) => {
    this.props.updateYear(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      degreeName: "",
      instituteName: "",
      year: "",
      score: ""
    };
    this.props.addDegreeBlock(dummyBlock);
    this.props.removeBlock("dummy");
  };

  handleChangeScore = (event, id) => {
    this.props.updateScore(event.target.value, id);
    let dummyBlock = {
      id: "dummy",
      degreeName: "",
      instituteName: "",
      year: "",
      score: ""
    };
    this.props.addDegreeBlock(dummyBlock);
    this.props.removeBlock("dummy");
  };

  handleRemoveBlock = id => {
    this.props.removeBlock(id);
  };
  render() {
    return (
      <div>
        <Accordion defaultActiveKey=" ">
          {this.props.degreeBlocks.map((value, index) => {
            return (
              <Card key={value.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  Degree #{index + 1}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="degreeName">
                        <Form.Label>Degree Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="B.Tech"
                          onChange={event => {
                            this.handleChangeDegreeName(event, value.id);
                          }}
                          defaultValue={
                            this.props.degreeBlocks[index].degreeName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupInstituteName">
                        <Form.Label>College Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Institute name"
                          onChange={event => {
                            this.handleChangeInstituteName(event, value.id);
                          }}
                          defaultValue={
                            this.props.degreeBlocks[index].instituteName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="2017-2021"
                          onChange={event => {
                            this.handleChangeYear(event, value.id);
                          }}
                          defaultValue={this.props.degreeBlocks[index].year}
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupScore">
                        <Form.Label>CPI/AGGREGATE</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="grade"
                          onChange={event => {
                            this.handleChangeScore(event, value.id);
                          }}
                          defaultValue={this.props.degreeBlocks[index].score}
                        />
                      </Form.Group>
                    </Form>

                    <Button
                      variant="danger"
                      onClick={() => {
                        this.handleRemoveBlock(value.id);
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
        <Button variant="primary" onClick={this.handleAddDegreeBlock}>
          +Add
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    degreeBlocks: state.educationRed.degreeBlocks,
    education: state.firestore.ordered.education
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addDegreeBlock: newBlock => {
      dispatch({ type: "ADD_EDUCATION_BLOCK", newBlock: newBlock });
    },
    updateDegreeName: (degreeName, id) => {
      dispatch({
        type: "UPDATE_EDUCATION_DEGREE_NAME",
        degreeName: degreeName,
        id: id
      });
    },
    updateInstituteName: (instituteName, id) => {
      dispatch({
        type: "UPDATE_EDUCATION_INSTITUTE_NAME",
        instituteName: instituteName,
        id: id
      });
    },
    updateYear: (year, id) => {
      dispatch({ type: "UPDATE_EDUCATION_YEAR", year: year, id: id });
    },
    updateScore: (score, id) => {
      dispatch({ type: "UPDATE_EDUCATION_SCORE", score: score, id: id });
    },
    removeBlock: id => {
      dispatch({ type: "REMOVE_EDUCATION_BLOCK", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EducationInfo);
