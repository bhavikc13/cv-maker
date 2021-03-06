import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Accordion, Card } from "react-bootstrap";
import EducationInfo from "./components/EducationInfo";
import SkillsInfo from "./components/SkillsInfo";
import InternshipInfo from "./components/InternshipInfo";
import ProjectInfo from "./components/ProjectInfo";
import PositionInfo from "./components/PositionInfo";
import AwardInfo from "./components/AwardInfo";
import HobbyInfo from "./components/HobbyInfo";
import "./style/SidebarStyle.css";

const Block = ({ cvid, id, moveBlock, findBlock, eventKey }) => {
  const originalIndex = findBlock(id).index;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "block", id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveBlock(droppedId, originalIndex);
      }
    },
  });
  const [, drop] = useDrop({
    accept: "block",
    canDrop: () => false,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findBlock(id);
        moveBlock(draggedId, overIndex);
      }
    },
  });
  const opacity = isDragging ? 0 : 1;
  const card = {
    backgroundColor: "#202020",
  };
  const cardBodyBg = {
    backgroundColor: "#282828",
  };

  const Names = [
    "education",
    "skill",
    "internship",
    "project",
    "position",
    "award",
    "hobby",
  ];
  return (
    <Card
      ref={preview}
      className="bgcolor"
      style={card}
      data-testid={Names[id - 1] + "TestId"}
    >
      <Accordion.Toggle
        as={Card.Header}
        eventKey={eventKey}
        data-testid={Names[id - 1] + "LinkTestId"}
      >
        {id === 1 ? "Education" : null}
        {id === 2 ? "Skills" : null}
        {id === 3 ? "Internship" : null}
        {id === 4 ? "Project" : null}
        {id === 5 ? "Position of Responsibility" : null}
        {id === 6 ? "Awards and Achievement" : null}
        {id === 7 ? "Interests and Hobbies" : null}
        <p
          ref={(node) => drag(drop(node))}
          className="float-left"
          style={{
            paddingLeft: "10px",
            paddingRight: "10px",
            margin: "0px",
            cursor: "move",
          }}
        >
          ::
        </p>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body style={cardBodyBg}>
          {id === 1 ? <EducationInfo id={cvid} /> : null}
          {id === 2 ? <SkillsInfo id={cvid} /> : null}
          {id === 3 ? <InternshipInfo id={cvid} /> : null}
          {id === 4 ? <ProjectInfo id={cvid} /> : null}
          {id === 5 ? <PositionInfo id={cvid} /> : null}
          {id === 6 ? <AwardInfo id={cvid} /> : null}
          {id === 7 ? <HobbyInfo id={cvid} /> : null}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};
export default Block;
