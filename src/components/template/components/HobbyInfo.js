import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import firestore from "../../../firebase/firestore";

class HobbyInfo extends Component {
  handleAddHobbyBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addHobbyBlock(newBlock);
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
      .collection("hobby")
      .doc(this.props.id)
      .set({
        ...this.props.hobbyBlocks
      })
      .then(() => console.log("update hobby"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    let ThobbyBlocks = this.props.hobbyBlocks;
    let n = ThobbyBlocks.length;
    for (let i = 0; i < n; i++) {
      this.props.removeHobbyBlock(ThobbyBlocks[i].id);
    }
  }
  componentDidMount() {
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("hobby")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let hobby = resp.data();
        if (!hobby) return null;
        let sz = Object.keys(hobby).length;
        for (let i = 0; i < sz; i++) {
          let newBlock = {
            id: hobby[i].id,
            information: hobby[i].information
          };
          this.props.addHobbyBlock(newBlock);
        }
      });
  }
  handleChangeHobby = (event, id) => {
    this.props.updateHobby(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addHobbyBlock(dummyBlock);
    this.props.removeHobbyBlock("dummy");
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

  handleRemoveHobbyBlock = id => {
    this.props.removeHobbyBlock(id);
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
        {this.props.hobbyBlocks.map((value, index) => {
          return (
            <Card body border="primary" style={{ margin: "10px" }} key={index}>
              <Form>
                <Form.Group controlId="formGroupPos">
                  {" "}
                  {/*Area of Interest*/}
                  <Form.Control
                    type="text"
                    placeholder="Member of X committee from January 2020 to May 2020..."
                    onChange={event => {
                      this.handleChangeHobby(event, value.id);
                    }}
                    defaultValue={this.props.hobbyBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="danger"
                onClick={() => {
                  this.handleRemoveHobbyBlock(value.id);
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
            </Card>
          );
        })}
        <Button variant="primary" onClick={this.handleAddHobbyBlock}>
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hobbyBlocks: state.hobbyRed.hobbyBlocks,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addHobbyBlock: newBlock => {
      dispatch({ type: "ADD_HOBBY_BLOCK", newBlock: newBlock });
    },
    updateHobby: (information, id) => {
      dispatch({
        type: "UPDATE_HOBBY_INFORMATION",
        information: information,
        id: id
      });
    },
    removeHobbyBlock: id => {
      dispatch({ type: "REMOVE_HOBBY_BLOCK", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HobbyInfo);
