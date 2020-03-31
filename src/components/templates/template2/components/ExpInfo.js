import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card, Form, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";

class ExpInfo extends Component {
  handleAddExperienceBlock = e => {
    let tid = Date.now();
    let newBlock = {
      id: tid,
      positionName: "",
      organizationName: "",
      start: "",
      end: "",
      descBlocks: [],
      keyAchvBlocks: []
    };
    this.props.addExperienceBlock(newBlock);
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

  handleChangePositionName = (event, id) => {
    this.props.updatePositionName(event.target.value, id);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleChangeOrganizationName = (event, id) => {
    this.props.updateOrganiztionName(event.target.value, id);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleChangeStart = (event, id) => {
    this.props.updateStart(event.target.value, id);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleChangeEnd = (event, id) => {
    this.props.updateEnd(event.target.value, id);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };
  handleAddDescBlock = expID => {
    let tid = Date.now();
    let newDescBlock = { descId: tid, descInfo: "" };
    this.props.addDescBlock(newDescBlock, expID);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleChangeDescription = (event, expID, descID) => {
    this.props.updateDescription(event.target.value, expID, descID);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleRemoveDescBlock = (expID, descID) => {
    this.props.removeDescBlock(expID, descID);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleAddKeyAchvBlock = expID => {
    let tid = Date.now();
    let newKeyAchvBlock = { keyAchvId: tid, keyAchvInfo: "" };
    this.props.addKeyAchvBlock(newKeyAchvBlock, expID);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleChangeKeyAchvBlock = (event, expID, keyAchvID) => {
    this.props.updateKeyAchBlock(event.target.value, expID, keyAchvID);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleRemoveKeyAchvBlock = (expID, keyAchvID) => {
    this.props.removeKeyAchvBlock(expID, keyAchvID);
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
    let dummyBlock = { id: "dummy" };
    this.props.addDummyBlock(dummyBlock);
    this.props.removeDummyBlock("dummy");
  };

  handleRemoveExperienceBlock = id => {
    this.props.removeExperienceBlock(id);
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

  //Blocks=this.props.expBlocks;
  componentDidUpdate() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("experience")
      .doc(this.props.id)
      .set({
        ...this.props.expBlocks
      })
      .then(() => console.log("update experience"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    let TexpBlocks = this.props.expBlocks;
    let n = TexpBlocks.length;
    for (let i = 0; i < n; i++) {
      this.props.removeExperienceBlock(TexpBlocks[i].id);
    }
  }
  componentDidMount() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("experience")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let experience = resp.data();
        if (!experience) return null;
        let sz = Object.keys(experience).length;
        for (let i = 0; i < sz; i++) {
          let newBlock = {
            id: experience[i].id,
            positionName: experience[i].positionName,
            organizationName: experience[i].organizationName,
            start: experience[i].start,
            end: experience[i].end,
            descBlocks: experience[i].descBlocks,
            keyAchvBlocks: experience[i].keyAchvBlocks
          };
          this.props.addExperienceBlock(newBlock);
        }
      });
  }
  render() {
    return (
      <div>
        <Accordion defaultActiveKey=" ">
          {this.props.expBlocks.map((value, index) => {
            return (
              <Card key={value.id}>
                <Accordion.Toggle as={Card.Header} eventKey={index}>
                  Experience #{index + 1}
                  <Button
                    className="float-right"
                    size="sm"
                    variant="danger"
                    onClick={() => {
                      this.handleRemoveExperienceBlock(value.id);
                    }}
                  >
                    -Remove
                  </Button>
                </Accordion.Toggle>

                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="formGroupPositionName">
                        <Form.Label>Position in Organization</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Software Devlopment Engineer"
                          onChange={event => {
                            this.handleChangePositionName(event, value.id);
                          }}
                          defaultValue={
                            this.props.expBlocks[index].positionName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupOrganizationName">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Microsoft"
                          onChange={event => {
                            this.handleChangeOrganizationName(event, value.id);
                          }}
                          defaultValue={
                            this.props.expBlocks[index].organizationName
                          }
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupJoinDate">
                        <Form.Label>Join Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="2020-01"
                          onChange={event => {
                            this.handleChangeStart(event, value.id);
                          }}
                          defaultValue={this.props.expBlocks[index].start}
                        />
                      </Form.Group>

                      <Form.Group controlId="formGroupLeaveDate">
                        <Form.Label>Leave Date</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="2020-12"
                          onChange={event => {
                            this.handleChangeEnd(event, value.id);
                          }}
                          defaultValue={this.props.expBlocks[index].end}
                        />
                      </Form.Group>

                      <Accordion defaultActiveKey="">
                        <Card>
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey={value.id}
                          >
                            Description
                          </Accordion.Toggle>

                          <Accordion.Collapse eventKey={value.id}>
                            <div>
                              <Card.Body>
                                <Accordion defaultActiveKey=" ">
                                  {value.descBlocks.map((val, ind) => {
                                    return (
                                      <Card key={val.descId}>
                                        <Accordion.Toggle
                                          as={Card.Header}
                                          eventKey={val.descId}
                                        >
                                          Description #{ind + 1}
                                          <Button
                                            className="float-right"
                                            size="sm"
                                            variant="danger"
                                            onClick={() => {
                                              this.handleRemoveDescBlock(
                                                value.id,
                                                val.descId
                                              );
                                            }}
                                          >
                                            - Remove
                                          </Button>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse
                                          eventKey={val.descId}
                                        >
                                          <div>
                                            <Card.Body>
                                              <Form.Group controlId="formGroupDescription">
                                                <Form.Label>
                                                  Description
                                                </Form.Label>
                                                <Form.Control
                                                  as="textarea"
                                                  col="2"
                                                  placeholder="Key points about experience according to position"
                                                  onChange={event => {
                                                    this.handleChangeDescription(
                                                      event,
                                                      value.id,
                                                      val.descId
                                                    );
                                                  }}
                                                  defaultValue={
                                                    this.props.expBlocks[index]
                                                      .descBlocks[ind].descInfo
                                                  }
                                                />
                                              </Form.Group>
                                            </Card.Body>
                                          </div>
                                        </Accordion.Collapse>
                                      </Card>
                                    );
                                  })}
                                </Accordion>

                                <Button
                                  variant="primary"
                                  className="float-right"
                                  size="md"
                                  style={{ margin: "4px 2px" }}
                                  onClick={() => {
                                    this.handleAddDescBlock(value.id);
                                  }}
                                >
                                  {" "}
                                  +Add Description Point
                                </Button>
                              </Card.Body>
                            </div>
                          </Accordion.Collapse>
                        </Card>

                        <Card>
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey={index + 100}
                          >
                            Key Achievements
                          </Accordion.Toggle>

                          <Accordion.Collapse eventKey={index + 100}>
                            <div>
                              <Card.Body>
                                <Accordion defaultActiveKey=" ">
                                  {value.keyAchvBlocks.map((val, ind) => {
                                    return (
                                      <Card key={val.keyAchvId}>
                                        <Accordion.Toggle
                                          as={Card.Header}
                                          eventKey={val.keyAchId}
                                        >
                                          Achievement #{ind + 1}
                                          <Button
                                            className="float-right"
                                            size="sm"
                                            variant="danger"
                                            onClick={() => {
                                              this.handleRemoveKeyAchvBlock(
                                                value.id,
                                                val.keyAchvId
                                              );
                                            }}
                                          >
                                            - Remove
                                          </Button>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse
                                          eventKey={val.keyAchId}
                                        >
                                          <div>
                                            <Card.Body>
                                              <Form.Group controlId="formGroupKeyAchv">
                                                <Form.Label>
                                                  Key Achievement
                                                </Form.Label>
                                                <Form.Control
                                                  as="textarea"
                                                  col="2"
                                                  placeholder="Key points about achievements according to position"
                                                  onChange={event => {
                                                    this.handleChangeKeyAchvBlock(
                                                      event,
                                                      value.id,
                                                      val.keyAchvId
                                                    );
                                                  }}
                                                  defaultValue={
                                                    this.props.expBlocks[index]
                                                      .keyAchvBlocks[ind]
                                                      .keyAchvInfo
                                                  }
                                                />
                                              </Form.Group>
                                            </Card.Body>
                                          </div>
                                        </Accordion.Collapse>
                                      </Card>
                                    );
                                  })}
                                </Accordion>

                                <Button
                                  variant="primary"
                                  className="float-right"
                                  size="md"
                                  style={{ margin: "4px 2px" }}
                                  onClick={() => {
                                    this.handleAddKeyAchvBlock(value.id);
                                  }}
                                >
                                  {" "}
                                  +Add Key Achievement
                                </Button>
                              </Card.Body>
                            </div>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </Form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
        </Accordion>

        <Button
          variant="primary"
          style={{ margin: "5px" }}
          onClick={this.handleAddExperienceBlock}
        >
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state);
  return {
    auth: state.firebase.auth,
    expBlocks: state.expRed_2.expBlocks_2
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addExperienceBlock: newBlock => {
      dispatch({ type: "ADD_EXP_BLOCK_2", newBlock: newBlock });
    },
    updatePositionName: (positionName, id) => {
      dispatch({
        type: "UPDATE_EXP_POSITION_2",
        positionName: positionName,
        id: id
      });
    },
    updateOrganiztionName: (organizationName, id) => {
      dispatch({
        type: "UPDATE_EXP_ORGANIZATION_NAME_2",
        organizationName: organizationName,
        id: id
      });
    },
    updateStart: (start, id) => {
      dispatch({ type: "UPDATE_EXP_START_2", start: start, id: id });
    },
    updateEnd: (end, id) => {
      dispatch({ type: "UPDATE_EXP_END_2", end: end, id: id });
    },

    addDummyBlock: dummyBlock => {
      dispatch({ type: "ADD_DUMMY_BLOCK_2", dummyBlock: dummyBlock });
    },
    removeDummyBlock: id => {
      dispatch({ type: "REMOVE_DUMMY_BLOCK_2", id: id });
    },

    addDescBlock: (newDescBlock, expID) => {
      dispatch({
        type: "ADD_EXP_DESC_BLOCK_2",
        newDescBlock: newDescBlock,
        expID: expID
      });
    },
    updateDescription: (descInfo, expID, descID) => {
      dispatch({
        type: "UPDATE_EXP_DESCRIPTION_2",
        descInfo: descInfo,
        expID: expID,
        descID: descID
      });
    },
    removeDescBlock: (expID, descID) => {
      dispatch({
        type: "REMOVE_EXP_DESC_BLOCK_2",
        expID: expID,
        descID: descID
      });
    },

    addKeyAchvBlock: (newKeyAchvBlock, expID) => {
      dispatch({
        type: "ADD_EXP_KEY_ACHV_BLOCK_2",
        newKeyAchvBlock: newKeyAchvBlock,
        expID: expID
      });
    },
    updateKeyAchBlock: (keyAchvInfo, expID, keyAchvID) => {
      dispatch({
        type: "UPDATE_EXP_KEY_ACHV_BLOCK_2",
        keyAchvInfo: keyAchvInfo,
        expID: expID,
        keyAchvID: keyAchvID
      });
    },
    removeKeyAchvBlock: (expID, keyAchvID) => {
      dispatch({
        type: "REMOVE_EXP_KEY_ACHV_BLOCK_2",
        expID: expID,
        keyAchvID: keyAchvID
      });
    },

    removeExperienceBlock: id => {
      dispatch({ type: "REMOVE_EXP_BLOCK_2", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpInfo);

{
  /*
	
*/
}
