import React, { Component } from "react";
import "./style/SidebarStyle.css";
import { Accordion, Card } from "react-bootstrap";
import Layout2 from "./Layout2";
import ImageInfo from "./components/ImageInfo";
import DescriptionInfo from "./components/DescriptionInfo";
import PersonalInfo from "./components/PersonalInfo";
import ExpInfo from "./components/ExpInfo";
import EducationInfo from "./components/EducationInfo";
import AwardInfo from "./components/AwardInfo";
import SkillsInfo from "./components/SkillsInfo";
import LanguageInfo from "./components/LanguageInfo";
import HobbyInfo from "./components/HobbyInfo";
import { connect } from "react-redux";
import PdfLayout2 from "./PdfLayout2";

class SidebarAndLayout2 extends Component {
  componentDidMount() {
    this.props.updatePrevUrl(window.location.pathname);
  }
  render() {
    const cardBodyBg = {
      backgroundColor: "#282828",
    };
    const styles = {
      backgroundColor: "#202020",
      color: "white",
    };
    return (
      <div>
        <PdfLayout2 />
        <h3 className="text-center cvtitle">{this.props.title}</h3>
        <div style={{ position: "relative" }}>
          <div className="screenView2">
            <div className="sidebar2">
              <Accordion defaultActiveKey=" ">
                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m0">
                    Upload Image
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m0">
                    <Card.Body>
                      <ImageInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m1">
                    Personal Information
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m1">
                    <Card.Body style={cardBodyBg}>
                      <PersonalInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m2">
                    Description
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m2">
                    <Card.Body style={cardBodyBg}>
                      <DescriptionInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m3">
                    Experience
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m3">
                    <Card.Body style={cardBodyBg}>
                      <ExpInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m4">
                    Education
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m4">
                    <Card.Body style={cardBodyBg}>
                      <EducationInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m5">
                    Honours or Awards
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m5">
                    <Card.Body style={cardBodyBg}>
                      <AwardInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m6">
                    Skills
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m6">
                    <Card.Body style={cardBodyBg}>
                      <SkillsInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m7">
                    Languages
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m7">
                    <Card.Body style={cardBodyBg}>
                      <LanguageInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>

                <Card style={styles} className="bgcolor">
                  <Accordion.Toggle as={Card.Header} eventKey="m8">
                    Interests and Hobbies
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="m8">
                    <Card.Body style={cardBodyBg}>
                      <HobbyInfo id={this.props.id} />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
            <div className="template2">
              <Layout2 />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePrevUrl: (prevUrl) => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarAndLayout2);
