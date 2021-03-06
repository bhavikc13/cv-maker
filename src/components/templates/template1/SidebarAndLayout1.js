import React, { Component, useState, useEffect } from "react";
import "./style/SidebarStyle.css";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { Accordion, Card } from "react-bootstrap";
import PersonalInfo from "./components/PersonalInfo";
import EducationInfo from "./components/EducationInfo";
import SkillsInfo from "./components/SkillsInfo";
import InternshipInfo from "./components/InternshipInfo";
import ProjectInfo from "./components/ProjectInfo";
import PositionInfo from "./components/PositionInfo";
import AwardInfo from "./components/AwardInfo";
import HobbyInfo from "./components/HobbyInfo";
import { connect } from "react-redux";
import firestore from "./../../../firebase/firestore";
import Loader from "../../loader/Loader";
import Layout1 from "./Layout1";
import ImageInfo from "./components/ImageInfo";
import { Link } from "react-router-dom";
import Block from "./Block";
import PdfLayout1 from "./PdfLayout1";

const SidebarAndLayout1 = (props) => {
  const [state, setState] = useState({
    title: "",
    isLoading: false,
  });
  props.updatePrevUrl(window.location.pathname);
  const [blocks, setBlocks] = useState(props.orderOfBlocks);
  useEffect(() => {
    props.updateOrderOfBlocks(blocks, props.auth.uid, props.id);
  }, [blocks]);
  const moveBlock = (id, atIndex) => {
    const { block, index } = findBlock(id);
    setBlocks(
      update(blocks, {
        $splice: [
          [index, 1],
          [atIndex, 0, block],
        ],
      })
    );
  };
  const findBlock = (id) => {
    const block = blocks.filter((b) => b.id === id)[0];
    return {
      block,
      index: blocks.indexOf(block),
    };
  };
  const [, drop] = useDrop({ accept: "block" });
  const styles = {
    backgroundColor: "#202020",
  };
  const color = {
    color: "#fff",
    backgroundColor: "#202020",
  };
  const cardBodyBg = {
    backgroundColor: "#282828",
  };
  return state.isLoading ? (
    <Loader />
  ) : (
    <div data-testid="sidebarAndLayout1TestId">
      <PdfLayout1 />
      <h3 className="text-center cvtitle">{props.title}</h3>
      <div style={{ position: "relative" }}>
        <div className="screenView1">
          <div className="sidebar1" ref={drop} style={color}>
            <Accordion defaultActiveKey="">
              <Card
                className="bgcolor"
                style={styles}
                data-testid="uploadImageTestId"
              >
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  style={{ paddingLeft: "44px" }}
                  data-testid="uploadImageLinkTestId"
                >
                  Upload Image
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body style={{ backgroundColor: "#303030" }}>
                    <ImageInfo id={props.id} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>

              <Card
                className="bgcolor"
                style={styles}
                data-testid="personalInformationTestId"
              >
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"
                  style={{ paddingLeft: "44px" }}
                  data-testid="personalInformationLinkTestId"
                >
                  Personal Information
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body style={cardBodyBg}>
                    <PersonalInfo id={props.id} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              {blocks.map((block, index) => (
                <Block
                  key={block.id}
                  id={block.id}
                  cvid={props.id}
                  moveBlock={moveBlock}
                  findBlock={findBlock}
                  eventKey={index + 2}
                />
              ))}
            </Accordion>
          </div>
          <div className="template1">
            <Layout1 />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
    orderOfBlocks: state.orderOfBlocksRed.orderOfBlocks,
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
    updateOrderOfBlocks: (orderOfBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_BLOCKS",
        orderOfBlocks: orderOfBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarAndLayout1);

/*<Card>
              <Accordion.Toggle as={Card.Header} eventKey="2">
                Education
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="2">
                <Card.Body>
                  <EducationInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="3">
                Skills
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <SkillsInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="4">
                Internship
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="4">
                <Card.Body>
                  <InternshipInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="5">
                Project
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="5">
                <Card.Body>
                  <ProjectInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="6">
                Position of Responsibility
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="6">
                <Card.Body>
                  <PositionInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="7">
                Awards and Achievement
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="7">
                <Card.Body>
                  <AwardInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="8">
                Interests and Hobbies
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="8">
                <Card.Body>
                  <HobbyInfo id={this.props.id} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>*/
