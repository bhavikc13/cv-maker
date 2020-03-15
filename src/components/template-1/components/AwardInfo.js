import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card, Button } from "react-bootstrap";

class AwardInfo extends Component {
  handleAddAwardBlock = () => {
    let tid = Date.now();
    let newBlock = { id: tid, information: "" };
    this.props.addAwardBlock(newBlock);
  };
  componentDidMount() {
    let award = this.props.award.filter(e => e.id === this.props.id);
    if (award.length === 0) return null;
    let sz = Object.keys(award[0]).length;
    for (let i = 0; i < sz - 3; i++) {
      let newBlock = {
        id: award[0][i].id,
        information: award[0][i].information
      };
      this.props.removeAwardBlock(newBlock.id);
      this.props.addAwardBlock(newBlock);
    }
  }
  handleChangeAward = (event, id) => {
    this.props.updateAward(event.target.value, id);
    let dummyBlock = { id: "dummy", information: "" };
    this.props.addAwardBlock(dummyBlock);
    this.props.removeAwardBlock("dummy");
  };

  handleRemoveAwardBlock = id => {
    this.props.removeAwardBlock(id);
  };

  render() {
    return (
      <div>
        {this.props.awardBlocks.map((value, index) => {
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
                      this.handleChangeAward(event, value.id);
                    }}
                    defaultValue={this.props.awardBlocks[index].information}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="danger"
                onClick={() => {
                  this.handleRemoveAwardBlock(value.id);
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
        <Button variant="primary" onClick={this.handleAddAwardBlock}>
          {" "}
          +Add{" "}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    awardBlocks: state.awardRed.awardBlocks,
    award: state.firestore.ordered.award
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addAwardBlock: newBlock => {
      dispatch({ type: "ADD_AWARD_BLOCK", newBlock: newBlock });
    },
    updateAward: (information, id) => {
      dispatch({
        type: "UPDATE_AWARD_INFORMATION",
        information: information,
        id: id
      });
    },
    removeAwardBlock: id => {
      dispatch({ type: "REMOVE_AWARD_BLOCK", id: id });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AwardInfo);
