import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";

class HobbyInfo extends Component {
  handleAddHobbyBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addHobbyBlock(newBlock);
  };
  componentDidMount() {
    let hobby = this.props.hobby.filter(e => e.id === this.props.id);
    if (hobby.length === 0) return null;
    let sz = Object.keys(hobby[0]).length;
    for (let i = 0; i < sz - 3; i++) {
      let newBlock = {
        id: hobby[0][i].id,
        information: hobby[0][i].information
      };
      this.props.removeHobbyBlock(newBlock.id);
      this.props.addHobbyBlock(newBlock);
    }
  }
  handleChangeHobby = (event, id) => {
    this.props.updateHobby(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addHobbyBlock(dummyBlock);
    this.props.removeHobbyBlock("dummy");
  };

  handleRemoveHobbyBlock = id => {
    this.props.removeHobbyBlock(id);
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
    hobby: state.firestore.ordered.hobby
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
