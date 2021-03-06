import React, { Component } from "react";
import { connect } from "react-redux";
import "./style/TemplateStyleForPdf.css";
import { PDFExport } from "@progress/kendo-react-pdf";

class PdfLayout1 extends Component {
  updateDegreeBlock = () => {
    let newDegreeBlocks = [];

    for (let [ind, val] of this.props.orderOfEducationBlocks.entries()) {
      for (let [index, value] of this.props.degreeBlocks.entries()) {
        if (val.id === value.id) {
          newDegreeBlocks.push(
            <tr key={index}>
              <td colSpan="2" style={{ textAlign: "left" }} className="w-20">
                {" "}
                <b style={{ fontSize: "18px" }}>{value.degreeName}</b>{" "}
              </td>
              <td colSpan="1"></td>
              <td
                colSpan="4"
                style={{
                  textAlign: "left",
                }}
                className="w-60"
              >
                {" "}
                {value.instituteName}{" "}
              </td>
              <td colSpan="1"></td>
              <td colSpan="1" style={{ textAlign: "left" }} className="w-10">
                {" "}
                {value.year}{" "}
              </td>
              <td colSpan="1"></td>
              <td colSpan="1" style={{ textAlign: "left" }} className="w-10">
                {" "}
                {value.score}{" "}
              </td>
              <td colSpan="1"></td>
            </tr>
          );
          break;
        }
      }
    }
    return newDegreeBlocks;
  };

  updateSkillBlock = () => {
    let newSkillBlocks = [];

    for (let [ind, val] of this.props.orderOfSkillBlocks.entries()) {
      if (val.id === 1) {
        newSkillBlocks.push(
          <tr
            key={val.id}
            className={this.props.areaOfInterest.length > 0 ? "" : "hide"}
          >
            <td colSpan="4" className="w-30">
              <b style={{ fontSize: "18px" }}>
                Expertise Area/Area(s) of Interest
              </b>
            </td>

            <td colSpan="7" className="w-70" style={{ textAlign: "left" }}>
              {this.props.areaOfInterest}
            </td>
            <td colSpan="1"> </td>
          </tr>
        );
      } else if (val.id === 2) {
        newSkillBlocks.push(
          <tr
            key={val.id}
            className={this.props.proLanguages.length > 0 ? "" : "hide"}
          >
            <td colSpan="4" className="w-30">
              <b style={{ fontSize: "18px" }}>Programming Language(s)</b>
            </td>
            <td colSpan="7" className="w-70" style={{ textAlign: "left" }}>
              {this.props.proLanguages}
            </td>
            <td colSpan="1"> </td>
          </tr>
        );
      } else if (val.id === 3) {
        newSkillBlocks.push(
          <tr
            key={val.id}
            className={this.props.toolsAndTech.length > 0 ? "" : "hide"}
          >
            <td colSpan="4" className="w-30">
              <b style={{ fontSize: "18px" }}>Tools and Technologies</b>
            </td>
            <td colSpan="7" className="w-70" style={{ textAlign: "left" }}>
              {this.props.toolsAndTech}
            </td>
            <td colSpan="1"> </td>
          </tr>
        );
      } else if (val.id === 4) {
        newSkillBlocks.push(
          <tr
            key={val.id}
            className={this.props.techElectives.length > 0 ? "" : "hide"}
          >
            <td colSpan="4" className="w-30">
              <b style={{ fontSize: "18px" }}>Technical Electives</b>
            </td>
            <td colSpan="7" className="w-70" style={{ textAlign: "left" }}>
              {this.props.techElectives}
            </td>
            <td colSpan="1"> </td>
          </tr>
        );
      }
    }
    return newSkillBlocks;
  };

  updateInternshipBlock = () => {
    let newInternshipBlocks = [];

    for (let [ind, val] of this.props.orderOfInternshipBlocks.entries()) {
      for (let [index, value] of this.props.internshipBlocks.entries()) {
        if (val.id === value.id) {
          newInternshipBlocks.push(
            <tr key={index}>
              <td
                colSpan="2"
                className="w-20"
                style={{ textAlignVertical: "top", textAlign: "left" }}
              >
                <p>
                  <b style={{ fontSize: "18px" }}>{value.organizationName}</b>
                </p>
              </td>
              <td colSpan="1"></td>
              <td
                colSpan="5"
                className="w-60"
                style={{ textAlignVertical: "top" }}
              >
                <p style={{ fontSize: "18px" }}>{value.description}</p>

                <p style={{ textAlign: "left", fontSize: "18px" }}>
                  <i style={{ fontSize: "18px" }}>
                    <b style={{ fontSize: "18px" }}>Guide: </b>&nbsp;&nbsp;
                    {value.supervisor}
                  </i>
                </p>
              </td>
              <td colSpan="1"></td>
              <td
                colSpan="3"
                className="w-20"
                style={{ textAlignVertical: "top", textAlign: "right" }}
              >
                <p style={{ fontSize: "18px" }}>
                  (&nbsp;{value.start}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;
                  {value.end}&nbsp;)
                </p>
                <p style={{ fontSize: "18px" }}>
                  Team Size&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;{value.teamSize}
                </p>
              </td>
            </tr>
          );
        }
      }
    }

    return newInternshipBlocks;
  };

  updateProjectBlock = () => {
    let newProjectBlocks = [];

    for (let [ind, val] of this.props.orderOfProjectBlocks.entries()) {
      for (let [index, value] of this.props.projectBlocks.entries()) {
        if (val.id === value.id) {
          newProjectBlocks.push(
            <tr key={index}>
              <td
                colSpan="8"
                className="w-70"
                style={{ textAlignVertical: "top", textAlign: "left" }}
              >
                <p>
                  <b style={{ fontSize: "18px" }}>{value.projectName}</b>
                </p>
                <p style={{ fontSize: "18px" }}>{value.description}</p>
                <p>
                  <i style={{ fontSize: "18px" }}>
                    <b style={{ fontSize: "18px" }}>Guide: </b> &nbsp;&nbsp;
                    {value.supervisor}
                  </i>
                </p>
              </td>
              <td colSpan="1"></td>
              <td
                colSpan="3"
                className="w-30"
                style={{ textAlignVertical: "top", textAlign: "right" }}
              >
                <p style={{ fontSize: "18px" }}>
                  (&nbsp;{value.start}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;
                  {value.end}&nbsp;)
                </p>
                <p style={{ fontSize: "18px" }}>
                  Team Size&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;{value.teamSize}
                </p>
              </td>
            </tr>
          );
        }
      }
    }

    return newProjectBlocks;
  };

  updatePositionBlock = () => {
    let newPositionBlocks = [];

    for (let [ind, val] of this.props.orderOfPositionBlocks.entries()) {
      for (let [index, value] of this.props.positionBlocks.entries()) {
        if (val.id === value.id) {
          newPositionBlocks.push(
            <tr key={index}>
              <td
                colSpan="11"
                style={{ padding: "0px", margin: "0px", textAlign: "left" }}
              >
                {ind + 1}. {value.information}
              </td>
              <td colSpan="1"></td>
            </tr>
          );
        }
      }
    }

    return newPositionBlocks;
  };

  updateAwardBlock = () => {
    let newAwardBlocks = [];

    for (let [ind, val] of this.props.orderOfAwardBlocks.entries()) {
      for (let [index, value] of this.props.awardBlocks.entries()) {
        if (val.id === value.id) {
          newAwardBlocks.push(
            <tr key={index}>
              <td
                colSpan="11"
                style={{ padding: "0px", margin: "0px", textAlign: "left" }}
              >
                {ind + 1}. {value.information}
              </td>
              <td colSpan="1"></td>
            </tr>
          );
        }
      }
    }

    return newAwardBlocks;
  };

  updateHobbyBlock = () => {
    let newHobbyBlocks = [];

    for (let [ind, val] of this.props.orderOfHobbyBlocks.entries()) {
      for (let [index, value] of this.props.hobbyBlocks.entries()) {
        if (val.id === value.id) {
          newHobbyBlocks.push(
            <tr key={index}>
              <td
                colSpan="11"
                style={{ padding: "0px", margin: "0px", textAlign: "left" }}
              >
                {ind + 1}. {value.information}
              </td>
              <td colSpan="1"></td>
            </tr>
          );
        }
      }
    }

    return newHobbyBlocks;
  };

  educationSection = () => {
    return (
      <table
        key="education"
        className={
          this.props.degreeBlocks.length > 0 ? "w-100 section" : "hide"
        }
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>EDUCATION</h3>
            </td>
          </tr>

          <tr>
            <th colSpan="2">Degree</th>
            <th colSpan="1"></th>
            <th colSpan="4">University/Institute</th>
            <th colSpan="1"></th>
            <th colSpan="1">Year</th>
            <th colSpan="1"></th>
            <th colSpan="1">CPI/Aggregate</th>
            <th colSpan="1"></th>
          </tr>
        </thead>

        {/*console.log('2',this.props.degreeBlocks)*/}
        <tbody>{this.updateDegreeBlock()}</tbody>
      </table>
    );
  };

  skillSection = () => {
    return (
      <table
        key="skill"
        className={
          this.props.areaOfInterest !== "" ||
          this.props.proLanguages !== "" ||
          this.props.toolsAndTech !== "" ||
          this.props.techElectives !== ""
            ? "w-100 section"
            : "hide"
        }
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>SKILLS</h3>
            </td>
          </tr>
        </thead>

        <tbody>{this.updateSkillBlock()}</tbody>
      </table>
    );
  };

  internshipSection = () => {
    return (
      <table
        key="internship"
        className={
          this.props.internshipBlocks.length > 0 ? "w-100 section" : "hide"
        }
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>PROFESSIONAL EXPERIENCE/INTERNSHIPS</h3>
            </td>
          </tr>
        </thead>

        <tbody>{this.updateInternshipBlock()}</tbody>
      </table>
    );
  };

  projectSection = () => {
    return (
      <table
        key="project"
        className={
          this.props.projectBlocks.length > 0 ? "w-100 section" : "hide"
        }
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>PROJECTS</h3>
            </td>
          </tr>
        </thead>

        <tbody>{this.updateProjectBlock()}</tbody>
      </table>
    );
  };

  responsibilitySection = () => {
    return (
      <table
        key="position"
        className={
          this.props.positionBlocks.length > 0 ? "w-100 section" : "hide"
        }
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>POSITION OF RESPONSIBILITY</h3>
            </td>
          </tr>
        </thead>

        <tbody>{this.updatePositionBlock()}</tbody>
      </table>
    );
  };

  awardSection = () => {
    return (
      <table
        key="award"
        className={this.props.awardBlocks.length > 0 ? "w-100 section" : "hide"}
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>AWARDS AND ACHIEVEMENTS</h3>
            </td>
          </tr>
        </thead>

        <tbody>{this.updateAwardBlock()}</tbody>
      </table>
    );
  };

  hobbySection = () => {
    return (
      <table
        key="hobby"
        className={this.props.hobbyBlocks.length > 0 ? "w-100 section" : "hide"}
      >
        <thead>
          <tr>
            <td colSpan="12" className="section-header">
              <h3>INTERESTS AND HOBBIES</h3>
            </td>
          </tr>
        </thead>
        <tbody>{this.updateHobbyBlock()}</tbody>
      </table>
    );
  };

  sectionOrderDisplay = () => {
    let orderedSections = [];

    for (let [, value] of this.props.orderOfBlocks.entries()) {
      if (value.id === 1) {
        orderedSections.push(this.educationSection());
      } else if (value.id === 2) {
        orderedSections.push(this.skillSection());
      } else if (value.id === 3) {
        orderedSections.push(this.internshipSection());
      } else if (value.id === 4) {
        orderedSections.push(this.projectSection());
      } else if (value.id === 5) {
        orderedSections.push(this.responsibilitySection());
      } else if (value.id === 6) {
        orderedSections.push(this.awardSection());
      } else if (value.id === 7) {
        orderedSections.push(this.hobbySection());
      }
    }

    return orderedSections;
  };
  exportPDF = () => {
    this.pdfExportComponent.save();
  };
  render() {
    return (
      <React.Fragment>
        <button
          className="btn btn-primary float-right btn-sm"
          onClick={this.exportPDF}
          style={{ margin: "10px" }}
        >
          Download As PDF
        </button>
        <div style={{ position: "absolute", top: "100px" }}>
          <PDFExport
            keepTogether="table"
            paperSize="A4"
            scale={0.6}
            fileName="cv.pdf"
            title=""
            subject=""
            keywords=""
            ref={(component) => (this.pdfExportComponent = component)}
          >
            <div className="resume-template1">
              <table className="main" style={{ marignBottom: "20px" }}>
                <thead>
                  <tr>
                    <td className={this.props.image === null ? "hide" : "w-20"}>
                      <img src={this.props.image} alt="image" />
                    </td>

                    <td
                      className={
                        this.props.image === null ? "intro w-100" : "intro w-80"
                      }
                    >
                      <h1>{this.props.fullName}</h1>
                      <p className="w-95">
                        <b
                          style={{
                            fontSize: "18px",
                          }}
                        >
                          {this.props.collegeName}
                        </b>
                      </p>
                      <p>
                        <span className="w-55 inline-block">
                          <b style={{ fontSize: "18px" }}>Email: </b>
                          &nbsp;&nbsp;
                          {this.props.email}
                        </span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="w-25 inline-block">
                          <b style={{ fontSize: "18px" }}>DOB: </b>
                          &nbsp;&nbsp;
                          {this.props.dob}
                        </span>
                      </p>
                      <p className="w-95">
                        <b style={{ fontSize: "18px" }}>Address: </b>
                        &nbsp;&nbsp;&nbsp;
                        {this.props.address}
                      </p>
                    </td>
                  </tr>
                </thead>
              </table>
              {this.sectionOrderDisplay()}
            </div>
          </PDFExport>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    image: state.imageRed_1.img_1,

    fullName: state.personRed_1.name_1,
    collegeName: state.personRed_1.collegeName_1,
    email: state.personRed_1.email_1,
    dob: state.personRed_1.dob_1,
    address: state.personRed_1.address_1,

    degreeBlocks: state.educationRed_1.degreeBlocks_1,
    orderOfEducationBlocks:
      state.orderOfEducationBlocksRed.orderOfEducationBlocks,

    areaOfInterest: state.skillRed_1.areaOfInterest_1,
    proLanguages: state.skillRed_1.proLanguages_1,
    toolsAndTech: state.skillRed_1.toolsAndTech_1,
    techElectives: state.skillRed_1.techElectives_1,
    orderOfSkillBlocks: state.orderOfSkillBlocksRed.orderOfSkillBlocks,

    internshipBlocks: state.internshipRed_1.internshipBlocks_1,
    orderOfInternshipBlocks:
      state.orderOfInternshipBlocksRed.orderOfInternshipBlocks,

    projectBlocks: state.projectRed_1.projectBlocks_1,
    orderOfProjectBlocks: state.orderOfProjectBlocksRed.orderOfProjectBlocks,

    positionBlocks: state.positionRed_1.positionBlocks_1,
    orderOfPositionBlocks: state.orderOfPositionBlocksRed.orderOfPositionBlocks,

    awardBlocks: state.awardRed_1.awardBlocks_1,
    orderOfAwardBlocks: state.orderOfAwardBlocksRed.orderOfAwardBlocks,

    hobbyBlocks: state.hobbyRed_1.hobbyBlocks_1,
    orderOfHobbyBlocks: state.orderOfHobbyBlocksRed.orderOfHobbyBlocks,

    orderOfBlocks: state.orderOfBlocksRed.orderOfBlocks,
  };
};

export default connect(mapStateToProps)(PdfLayout1);
