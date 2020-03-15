import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateProfile,
  updateEducation,
  updateSkill,
  updateInternship,
  updatePosition,
  updateProject,
  updateHobby,
  updateAward
} from "./../../store/actions/cvActions";

class NavbarBottom extends Component {
  handleClick = e => {
    e.preventDefault();
    let profile = {
      fullName: this.props.fullName,
      collegeName: this.props.collegeName,
      email: this.props.email,
      dob: this.props.dob,
      address: this.props.address
    };
    this.props.updateProfile(profile, this.props.id);
    this.props.updateEducation(this.props.degreeBlocks, this.props.id);
    let skill = {
      areaOfInterest: this.props.areaOfInterest,
      proLanguages: this.props.proLanguages,
      toolsAndTech: this.props.toolsAndTech,
      techElectives: this.props.techElectives
    };
    this.props.updateSkill(skill, this.props.id);
    this.props.updateInternship(this.props.internshipBlocks, this.props.id);
    this.props.updateProject(this.props.projectBlocks, this.props.id);
    this.props.updatePosition(this.props.positionBlocks, this.props.id);
    this.props.updateAward(this.props.awardBlocks, this.props.id);
    this.props.updateHobby(this.props.hobbyBlocks, this.props.id);
  };
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="btn btn-success ml-auto"
            onClick={this.handleClick}
          >
            Save
          </button>
        </div>
      </nav>
    );
  }
}
const mapStatesToProps = state => {
  return {
    auth: state.firebase.auth,
    fullName: state.personRed.name,
    collegeName: state.personRed.collegeName,
    email: state.personRed.email,
    dob: state.personRed.dob,
    address: state.personRed.address,

    degreeBlocks: state.educationRed.degreeBlocks,

    areaOfInterest: state.skillRed.areaOfInterest,
    proLanguages: state.skillRed.proLanguages,
    toolsAndTech: state.skillRed.toolsAndTech,
    techElectives: state.skillRed.techElectives,

    internshipBlocks: state.internshipRed.internshipBlocks,

    projectBlocks: state.projectRed.projectBlocks,

    positionBlocks: state.positionRed.positionBlocks,

    awardBlocks: state.awardRed.awardBlocks,

    hobbyBlocks: state.hobbyRed.hobbyBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (profile, id) => dispatch(updateProfile(profile, id)),
    updateEducation: (e, id) => dispatch(updateEducation(e, id)),
    updateSkill: (e, id) => dispatch(updateSkill(e, id)),
    updateInternship: (e, id) => dispatch(updateInternship(e, id)),
    updateAward: (e, id) => dispatch(updateAward(e, id)),
    updateHobby: (e, id) => dispatch(updateHobby(e, id)),
    updateProject: (e, id) => dispatch(updateProject(e, id)),
    updatePosition: (e, id) => dispatch(updatePosition(e, id))
  };
};

export default connect(mapStatesToProps, mapDispatchToProps)(NavbarBottom);
