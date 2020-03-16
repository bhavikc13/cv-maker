import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card } from "react-bootstrap";
import firestore from "../../../firebase/firestore";

class SkillsInfo extends Component {
  componentDidUpdate() {
    firestore
      .collection("skill")
      .doc(this.props.id)
      .set({
        areaOfInterest: this.props.aoi,
        proLanguages: this.props.pl,
        toolsAndTech: this.props.tt,
        techElectives: this.props.te
      })
      .then(console.log("update skill"))
      .catch(err => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    this.props.updateAOI("");
    this.props.updatePL("");
    this.props.updateTT("");
    this.props.updateTE("");
  }
  componentDidMount() {
    firestore
      .collection("skill")
      .doc(this.props.id)
      .get()
      .then(resp => {
        let skill = resp.data();
        if (!skill) return null;
        this.props.updateAOI(skill.areaOfInterest);
        this.props.updatePL(skill.proLanguages);
        this.props.updateTT(skill.toolsAndTech);
        this.props.updateTE(skill.techElectives);
      });
  }
  handleChangeAOI = event => {
    this.props.updateAOI(event.target.value);
  };

  handleChangePL = event => {
    this.props.updatePL(event.target.value);
  };

  handleChangeTT = event => {
    this.props.updateTT(event.target.value);
  };

  handleChangeTE = event => {
    this.props.updateTE(event.target.value);
  };

  render() {
    return (
      <div>
        <Form>
          <Card body border="primary" style={{ margin: "10px 0px" }}>
            <Form.Group controlId="formGroupAOI">
              {/*Area of Interest*/}
              <Form.Label>Expertise Area/Area(s) of Interest</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Web Development, Machine Learning..."
                onChange={this.handleChangeAOI}
                defaultValue={this.props.aoi}
              />
            </Form.Group>
          </Card>

          <Card body border="primary" style={{ margin: "10px 0px" }}>
            <Form.Group controlId="formGroupPL">
              {" "}
              {/* Programming Languages */}
              <Form.Label>Programming Language(s)</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="C++, Python..."
                onChange={this.handleChangePL}
                defaultValue={this.props.pl}
              />
            </Form.Group>
          </Card>

          <Card body border="primary" style={{ margin: "10px 0px" }}>
            <Form.Group controlId="formGroupTT">
              {" "}
              {/* Tools and Technologies */}
              <Form.Label>Tools and Technologies</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="React JS, Redux, Firebase..."
                onChange={this.handleChangeTT}
                defaultValue={this.props.tt}
              />
            </Form.Group>
          </Card>

          <Card body border="primary" style={{ margin: "10px 0px" }}>
            <Form.Group controlId="formGroupTE">
              {" "}
              {/* Technical Electives */}
              <Form.Label>Technical Electives</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Software Engineering, Operating System..."
                onChange={this.handleChangeTE}
                defaultValue={this.props.te}
              />
            </Form.Group>
          </Card>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    aoi: state.skillRed.areaOfInterest,
    pl: state.skillRed.proLanguages,
    tt: state.skillRed.toolsAndTech,
    te: state.skillRed.techElectives,
    skill: state.firestore.ordered.skill
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAOI: aoi => {
      dispatch({ type: "UPDATE_AOI", aoi: aoi });
    },
    updatePL: pl => {
      dispatch({ type: "UPDATE_PL", pl: pl });
    },
    updateTT: tt => {
      dispatch({ type: "UPDATE_TT", tt: tt });
    },
    updateTE: te => {
      dispatch({ type: "UPDATE_TE", te: te });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsInfo);
