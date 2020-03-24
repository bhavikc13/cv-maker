import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";

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
  componentDidUpdate() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("education")
      .doc(this.props.id)
      .set({
        ...this.props.degreeBlocks
      })
      .then(() => console.log("update education"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    let TdegreeBlocks = this.props.degreeBlocks;
    let n = TdegreeBlocks.length;
    for (let i = 0; i < n; i++) {
      this.props.removeBlock(TdegreeBlocks[i].id);
    }
  }
  componentDidMount() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("education")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let education = resp.data();
        if (!education) return null;
        let sz = Object.keys(education).length;
        for (let i = 0; i < sz; i++) {
          let newBlock = {
            id: education[i].id,
            degreeName: education[i].degreeName,
            instituteName: education[i].instituteName,
            year: education[i].year,
            score: education[i].score
          };
          this.props.addDegreeBlock(newBlock);
        }
      });
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

  handleRemoveBlock = id => {
    this.props.removeBlock(id);
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
  render() {
    return (
      <div>
        <Accordion defaultActiveKey=" ">
          {this.props.degreeBlocks.map((value, index) => {
            return (
              <Card key={value.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  Degree #{index + 1}
                  <Button
                    className="float-right"
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      this.handleRemoveBlock(value.id);
                    }}
                  >
                    -Remove
                  </Button>
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
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>
        <Button
          variant="primary"
          onClick={this.handleAddDegreeBlock}
          style={{ marginTop: "10px" }}
        >
          +Add
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    degreeBlocks: state.educationRed.degreeBlocks
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
