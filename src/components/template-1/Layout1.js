import React, { Component } from "react";
import logo from "./assets/daiict-logo.jpg";
import { connect } from "react-redux";
import "./style/TemplateStyle.css";

class Layout1 extends Component {
  updateDegreeBlock = () => {
    let newDegreeBlocks = [];

    for (let [index, value] of this.props.degreeBlocks.entries()) {
      newDegreeBlocks.push(
        <tr key={index}>
          <td style={{ textAlign: "left", padding: "10px" }}>
            {" "}
            <b>{value.degreeName}</b>{" "}
          </td>
          <td style={{ textAlign: "left", padding: "10px 0px 10px 10px" }}>
            {" "}
            {value.instituteName}{" "}
          </td>
          <td style={{ textAlign: "left", padding: "10px 10px 10px 5px" }}>
            {" "}
            {value.year}{" "}
          </td>
          <td style={{ textAlign: "left", padding: "10px 5px 10px 10px" }}>
            {" "}
            {value.score}{" "}
          </td>
        </tr>
      );
    }

    return newDegreeBlocks;
  };

  updateInternshipBlock = () => {
    let newInternshipBlocks = [];

    for (let [index, value] of this.props.internshipBlocks.entries()) {
      newInternshipBlocks.push(
        <tr key={index}>
          <td
            className="w-20"
            style={{ textAlignVertical: "top", textAlign: "left" }}
          >
            <p>
              <b>{value.organizationName}</b>
            </p>
          </td>
          <td className="w-60" style={{ textAlignVertical: "top" }}>
            <p>
              {value.description}
              <p style={{ textAlign: "left" }}>
                <i>
                  <b>Guide:</b> {value.supervisor}
                </i>
              </p>
            </p>
          </td>
          <td
            className="w-20"
            style={{ textAlignVertical: "top", textAlign: "right" }}
          >
            <p>
              ({value.start} - {value.end})
            </p>
            <p>Team Size - {value.teamSize}</p>
          </td>
        </tr>
      );
    }

    return newInternshipBlocks;
  };

  updateProjectBlock = () => {
    let newProjectBlocks = [];

    for (let [index, value] of this.props.projectBlocks.entries()) {
      newProjectBlocks.push(
        <tr key={index}>
          <td
            className="w-80"
            style={{ textAlignVertical: "top", textAlign: "left" }}
          >
            <p>
              <b>{value.projectName}</b>
            </p>
            <p>
              {value.description}
              <p>
                <i>
                  <b>Guide:</b> {value.supervisor}
                </i>
              </p>
            </p>
          </td>
          <td
            className="w-20"
            style={{ textAlignVertical: "top", textAlign: "right" }}
          >
            <p>
              ({value.start} - {value.end})
            </p>
            <p>Team Size - {value.team_size}</p>
          </td>
        </tr>
      );
    }

    return newProjectBlocks;
  };

  updatePositionBlock = () => {
    let newPositionBlocks = [];

    for (let [index, value] of this.props.positionBlocks.entries()) {
      newPositionBlocks.push(
        <tr key={index}>
          <td style={{ textAlignVertical: "top", textAlign: "left" }}>
            <ul className="list">
              <li>{value.information}</li>
            </ul>
          </td>
        </tr>
      );
    }

    return newPositionBlocks;
  };

  updateAwardBlock = () => {
    let newAwardBlocks = [];

    for (let [index, value] of this.props.awardBlocks.entries()) {
      newAwardBlocks.push(
        <tr key={index}>
          <td style={{ textAlignVertical: "top", textAlign: "left" }}>
            <ul className="list">
              <li>{value.information}</li>
            </ul>
          </td>
        </tr>
      );
    }

    return newAwardBlocks;
  };

  updateHobbyBlock = () => {
    let newHobbyBlocks = [];

    for (let [index, value] of this.props.hobbyBlocks.entries()) {
      newHobbyBlocks.push(
        <tr key={index}>
          <td style={{ textAlignVertical: "top", textAlign: "left" }}>
            <ul className="list">
              <li>{value.information}</li>
            </ul>
          </td>
        </tr>
      );
    }

    return newHobbyBlocks;
  };

  render() {
    /*let newDegreeBlocks = this.props.degreeBlocks.map((value,index) => {
            return (
                <tr key={index}>
                    <td style={{textAlign: "left", padding: '10px'}}> <b>{value.degreeName}</b> </td>
                    <td style={{textAlign: "left", padding: '10px'}}> {value.instituteName} </td>
                    <td style={{textAlign: "left", padding: '10px'}}> {value.year} </td>
                    <td style={{textAlign: "left", padding: '10px'}}> {value.score} </td>
                </tr>
            )
        })
        */

    return (
      <div>
        <div className="resume-render-wrapper">
          <div className="resume-template">
            <table className="main" style={{ marignBottom: "20px" }}>
              <thead>
                {/*console.log('1',this.props.degreeBlocks)*/}
                <tr>
                  <td className="w-20">
                    <img src={logo} alt="daiict-logo" />
                  </td>

                  <td className="intro w-80">
                    <h1>{this.props.fullName}</h1>
                    <p>
                      <b>{this.props.collegeName}</b>
                    </p>
                    <p>
                      <span className="w-60 inline-block">
                        <b>Email:</b> {this.props.email}
                      </span>
                      <span className="w-40 text-right">
                        <b>DOB:</b> {this.props.dob}
                      </span>
                    </p>
                    <p>
                      <b>Address:</b> {this.props.address}
                    </p>
                  </td>
                </tr>
              </thead>
            </table>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="4" className="section-header">
                    <h3>EDUCATION</h3>
                  </td>
                </tr>

                <tr>
                  <th colSpan="1">Degree</th>
                  <th colSpan="1">University/Institute</th>
                  <th colSpan="1">Year</th>
                  <th colSpan="1">CPI/Aggregate</th>
                </tr>
              </thead>

              {/*console.log('2',this.props.degreeBlocks)*/}
              <tbody>{this.updateDegreeBlock()}</tbody>
            </table>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>SKILLS</h3>
                  </td>
                </tr>
              </thead>
              <tr>
                <td className="w-30">
                  <b>Expertise Area/Area(s) of Interest</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.areaOfInterest}
                </td>
              </tr>
              <tr>
                <td className="w-30">
                  <b>Programming Language(s)</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.proLanguages}
                </td>
              </tr>
              <tr>
                <td className="w-30">
                  <b>Tools and Technologies</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.toolsAndTech}
                </td>
              </tr>
              <tr>
                <td className="w-30">
                  <b>Technical Electives</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.techElectives}
                </td>
              </tr>
            </table>
            <div className="page-break"></div>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="3" className="section-header">
                    <h3>PROFESSIONAL EXPERIENCE/INTERNSHIPS</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateInternshipBlock()}</tbody>
            </table>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>PROJECTS</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateProjectBlock()}</tbody>
            </table>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>POSITION OF RESPONSIBILITY</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updatePositionBlock()}</tbody>
            </table>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>AWARDS AND ACHIEVEMENTS</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateAwardBlock()}</tbody>
            </table>

            <table className="w-100 section">
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>INTERESTS AND HOBBIES</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateHobbyBlock()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.educationRed.degreeBlocks);
  return {
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

export default connect(mapStateToProps)(Layout1);
