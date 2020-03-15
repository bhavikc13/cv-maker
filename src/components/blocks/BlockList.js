import React from "react";
import { Link } from "react-router-dom";

const BlockList = ({ block, id }) => {
  let profileActive = "",
    educationActive = "",
    skillsActive = "";
  if (block === "/:id/profile") {
    profileActive = "active";
  } else if (block === "/:id/education") {
    educationActive = "active";
  } else if (block === "/:id/skills") {
    skillsActive = "active";
  }
  return (
    <div className="container">
      <div className="list-group">
        <Link
          to={"/" + id + "/profile"}
          className={"list-group-item list-group-item-action" + profileActive}
        >
          Profile
        </Link>
        <Link
          to={"/" + id + "/education"}
          className={"list-group-item list-group-item-action" + educationActive}
        >
          Education
        </Link>
      </div>
    </div>
  );
};

export default BlockList;
