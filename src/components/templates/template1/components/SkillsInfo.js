import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Card } from "react-bootstrap";
import firestore from "./../../../../firebase/firestore";
import "./CompStyle.css";
import Loader from "./../../../loader/Loader";
import SkillInfoComp from "./SkillInfoComp";

class SkillsInfo extends Component {
  state = { isLoading: false };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.removeAllBlocks();
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.id)
      .collection("skill")
      .doc(this.props.id)
      .get()
      .then((resp) => {
        let skill = resp.data();
        if (!skill) {
          this.setState({ isLoading: false });
          return null;
        }
        this.props.loadAllBlocks(
          skill.areaOfInterest,
          skill.proLanguages,
          skill.toolsAndTech,
          skill.techElectives
        );
        this.setState({ isLoading: false });
      });
  }
  /*handleChangeAOI = event => {
    this.props.updateAOI(event.target.value);
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

  handleChangePL = event => {
    this.props.updatePL(event.target.value);
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

  handleChangeTT = event => {
    this.props.updateTT(event.target.value);
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

  handleChangeTE = event => {
    this.props.updateTE(event.target.value);
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
  };*/
  render() {
    const bgcolor = {
      backgroundColor: "#202020",
      margin: "10px 0px",
      color: "white",
      border: "none",
    };

    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div>
        <SkillInfoComp cvid={this.props.id} />
        {/*<Form >
          <Card body  style={bgcolor} >
            <Form.Group controlId="formGroupAOI">
              
              <Form.Label>Expertise Area/Area(s) of Interest</Form.Label>
              <Form.Control className="inputStyle" style={bgcolor}
                as="textarea"
                rows="3"
                placeholder="Web Development, Machine Learning..."
                onChange={this.handleChangeAOI}
                defaultValue={this.props.aoi}
              />
            </Form.Group>
          </Card>

          <Card body style={bgcolor}>
            <Form.Group controlId="formGroupPL">
              {" "}
              
              <Form.Label>Programming Language(s)</Form.Label>
              <Form.Control className="inputStyle" style={bgcolor}
                as="textarea"
                rows="3"
                placeholder="C++, Python..."
                onChange={this.handleChangePL}
                defaultValue={this.props.pl}
              />
            </Form.Group>
          </Card>

          <Card body style={bgcolor}>
            <Form.Group controlId="formGroupTT">
              {" "}
              
              <Form.Label>Tools and Technologies</Form.Label>
              <Form.Control className="inputStyle" style={bgcolor}
                as="textarea"
                rows="3"
                placeholder="React JS, Redux, Firebase..."
                onChange={this.handleChangeTT}
                defaultValue={this.props.tt}
              />
            </Form.Group>
          </Card>

          <Card body style={bgcolor}>
            <Form.Group controlId="formGroupTE">
              {" "}
              
              <Form.Label>Technical Electives</Form.Label>
              <Form.Control className="inputStyle" style={bgcolor}
                as="textarea"
                rows="3"
                placeholder="Software Engineering, Operating System..."
                onChange={this.handleChangeTE}
                defaultValue={this.props.te}
              />
            </Form.Group>
          </Card>
        </Form>*/}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    aoi: state.skillRed_1.areaOfInterest_1,
    pl: state.skillRed_1.proLanguages_1,
    tt: state.skillRed_1.toolsAndTech_1,
    te: state.skillRed_1.techElectives_1,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAOI: (aoi, uid, cvid) => {
      dispatch({ type: "UPDATE_AOI_1", aoi: aoi, uid: uid, cvid: cvid });
    },
    updatePL: (pl, uid, cvid) => {
      dispatch({ type: "UPDATE_PL_1", pl: pl, uid: uid, cvid: cvid });
    },
    updateTT: (tt, uid, cvid) => {
      dispatch({ type: "UPDATE_TT_1", tt: tt, uid: uid, cvid: cvid });
    },
    updateTE: (te, uid, cvid) => {
      dispatch({ type: "UPDATE_TE_1", te: te, uid: uid, cvid: cvid });
    },
    removeAllBlocks: () => {
      dispatch({
        type: "REMOVE_ALL_SKILL_BLOCKS_1",
      });
    },
    loadAllBlocks: (aoi, pl, tt, te) => {
      dispatch({
        type: "LOAD_ALL_SKILL_BLOCKS_1",
        aoi: aoi,
        pl: pl,
        tt: tt,
        te: te,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsInfo);
