import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import "./CompStyle.css";

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
    const bgcolor = {
      backgroundColor: "#202020",
      color: "white",
      border:"none",
    }
    const cardStyle = {
      boxShadow: "inset 0 0px 4px #303030",
      backgroundColor: "#202020",
      color: "white",
      margin: "10px" 
    }
    return (
      <div>
        {this.props.hobbyBlocks.map((value, index) => {
          return (
            <Card body style={cardStyle} key={index}>
              <Form>
                <Form.Group controlId="formGroupPos">
                  {" "}
                  {/*Area of Interest*/}
                  <Form.Control className="inputStyle" style={bgcolor}
                    type="text"
                    placeholder="Interest or Hobby"
                    onChange={event => {
                      this.handleChangeHobby(event, value.id);
                    }}
                    defaultValue={this.props.hobbyBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                className="remove"
                onClick={() => {
                  this.handleRemoveHobbyBlock(value.id);
                }}
                style={{
                  display: "inline-block",
                  float: "left",
                  margin: "5px",
                  border:"none"
                }}
              >
                {" "}
                -Remove{" "}
              </Button>
            </Card>
          );
        })}
        <Button className="add"
        onClick={this.handleAddHobbyBlock}>
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hobbyBlocks: state.hobbyRed_1.hobbyBlocks_1,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addHobbyBlock: newBlock => {
      dispatch({ type: "ADD_HOBBY_BLOCK_1", newBlock: newBlock });
    },
    updateHobby: (information, id) => {
      dispatch({
        type: "UPDATE_HOBBY_INFORMATION_1",
        information: information,
        id: id
      });
    },
    removeHobbyBlock: id => {
      dispatch({ type: "REMOVE_HOBBY_BLOCK_1", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HobbyInfo);
