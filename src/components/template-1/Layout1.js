import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/TemplateStyle.css";

class Layout1 extends Component {
  
  updateDegreeBlock = () => {
    let newDegreeBlocks = [];

    for (let [index, value] of this.props.degreeBlocks.entries()) {
      newDegreeBlocks.push(
        <tr key={index}>
          <td style={{ textAlign: "left"}}>
            {" "}
            <b style={{fontSize:'18px'}}>{value.degreeName}</b>{" "}
          </td>
          <td style={{ textAlign: "left"}}>
            {" "}
            {value.instituteName}{" "}
          </td>
          <td style={{ textAlign: "left"}}>
            {" "}
            {value.year}{" "}
          </td>
          <td style={{ textAlign: "left"}}>
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
              <b style={{fontSize:'18px'}}>{value.organizationName}</b>
            </p>
          </td>
          <td className="w-60" style={{ textAlignVertical: "top" }}>
            <p style={{fontSize:'18px'}}>
              {value.description}
              <p style={{ textAlign: "left", fontSize: '18px'}}>
                <i style={{fontSize:'18px'}}>
                  <b style={{fontSize:'18px'}}>Guide:</b> {value.supervisor}
                </i>
              </p>
            </p>
          </td>
          <td
            className="w-20"
            style={{ textAlignVertical: "top", textAlign: "right" }}
          >
            <p style={{fontSize:'18px'}}>
              ({value.start} - {value.end})
            </p>
            <p style={{fontSize:'18px'}}>Team Size - {value.teamSize}</p>
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
              <b style={{fontSize:'18px'}}>{value.projectName}</b>
            </p>
            <p style={{fontSize:'18px'}}>
              {value.description}
              <p>
                <i style={{fontSize:'18px'}}>
                  <b style={{fontSize:'18px'}}>Guide:</b> {value.supervisor}
                </i>
              </p>
            </p>
          </td>
          <td
            className="w-20"
            style={{ textAlignVertical: "top", textAlign: "right" }}
          >
            <p style={{fontSize:'18px'}}>
              ({value.start} - {value.end})
            </p>
            <p style={{fontSize:'18px'}}>Team Size - {value.team_size}</p>
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
        <ul key={index} className="list" style={{ padding: '0px', margin: '0px', textAlign: 'left' }}>
            <li>
                {index + 1}. {value.information}
            </li>
        </ul>
      );
    }

    return newPositionBlocks;
  };

  updateAwardBlock = () => {
    let newAwardBlocks = [];

    for (let [index, value] of this.props.awardBlocks.entries()) {
      newAwardBlocks.push(
        <ul key={index} className="list" style={{ padding: '0px', margin: '0px', textAlign: 'left' }}>
            <li>
                {index + 1}. {value.information}
            </li>
        </ul>
      );
    }

    return newAwardBlocks;
  };

  updateHobbyBlock = () => {
    let newHobbyBlocks = [];

    for (let [index, value] of this.props.hobbyBlocks.entries()) {
      newHobbyBlocks.push(
        <ul key={index} className="list" style={{ padding: '0px', margin: '0px', textAlign: 'left' }}>
            <li>
                {index + 1}. {value.information}
            </li>
        </ul>
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
                <tr>
                    <td className={(this.props.image === null) ? "hide" : "w-20"}>
                        <img src={this.props.image} alt="image"/>
                    </td>

                    <td className={(this.props.image === null) ? "intro w-100" : "intro w-80"}>
                        <h1>{this.props.fullName}</h1>
                        <p>
                            <b style={{fontSize:'18px'}}>{this.props.collegeName}</b>
                        </p>
                        <p>
                            <span className="w-60 inline-block">
                                <b style={{fontSize:'18px'}}>Email:</b> {this.props.email}
                            </span>
                            <span className="w-40 text-right">
                                <b style={{fontSize:'18px'}}>DOB:</b> {this.props.dob}
                            </span>
                        </p>
                        <p>
                            <b style={{fontSize:'18px'}}>Address:</b> {this.props.address}
                        </p>
                    </td>
                </tr>
              </thead>
            </table>

            <table className={(this.props.degreeBlocks.length > 0) ? "w-100 section" : "hide"}>
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

            <table className={(this.props.areaOfInterest !== "" ||
                            this.props.proLanguages !== "" ||
                            this.props.toolsAndTech !== "" ||
                            this.props.techElectives !== "") ? "w-100 section" : "hide"}>
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>SKILLS</h3>
                  </td>
                </tr>
              </thead>

              <tr className={(this.props.areaOfInterest.length > 0) ? "" : "hide"}>
                <td className="w-30">
                  <b style={{fontSize:'18px'}}>Expertise Area/Area(s) of Interest</b>
                </td>

                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.areaOfInterest}
                </td>
              </tr>

              <tr className={(this.props.proLanguages.length > 0) ? "" : "hide"}>
                <td className="w-30">
                  <b style={{fontSize:'18px'}}>Programming Language(s)</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.proLanguages}
                </td>
              </tr>

              <tr className={(this.props.toolsAndTech.length > 0) ? "" : "hide"}>
                <td className="w-30">
                  <b style={{fontSize:'18px'}}>Tools and Technologies</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.toolsAndTech}
                </td>
              </tr>

              <tr className={(this.props.techElectives.length > 0) ? "" : "hide"}>
                <td className="w-30">
                  <b style={{fontSize:'18px'}}>Technical Electives</b>
                </td>
                <td className="w-70" style={{ textAlign: "left" }}>
                  {this.props.techElectives}
                </td>
              </tr>
            </table>
            <div className="page-break"></div>

            <table className={(this.props.internshipBlocks.length > 0) ? "w-100 section" : "hide"}>

              <thead>
                <tr>
                  <td colSpan="3" className="section-header">
                    <h3>PROFESSIONAL EXPERIENCE/INTERNSHIPS</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateInternshipBlock()}</tbody>
            </table>

            <table className={(this.props.projectBlocks.length > 0) ? "w-100 section" : "hide"}>
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>PROJECTS</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateProjectBlock()}</tbody>
            </table>

            <table className={(this.props.positionBlocks.length > 0) ? "w-100 section" : "hide"}>
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>POSITION OF RESPONSIBILITY</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updatePositionBlock()}</tbody>
            </table>

            <table className={(this.props.awardBlocks.length > 0) ? "w-100 section" : "hide"}>
              <thead>
                <tr>
                  <td colSpan="2" className="section-header">
                    <h3>AWARDS AND ACHIEVEMENTS</h3>
                  </td>
                </tr>
              </thead>

              <tbody>{this.updateAwardBlock()}</tbody>
            </table>

            <table className={(this.props.hobbyBlocks.length > 0) ? "w-100 section" : "hide"}>
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
  return {
    image: state.imageRed.img,

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
