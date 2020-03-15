import React from "react";
import Profile from "./Profile";
import Education from "./Education";

const BlockContent = ({ block, id, push }) => {
  if (block === "/:id/profile") {
    return <Profile id={id} push={push} />;
  } else if (block === "/:id/education") {
    return <Education id={id} push={push} />;
  } /*else if (block === "/:id/skills") {
    return (
      <div className="container">
        <form>
          <div className="form-group">
            <label>Skills</label>
            <input type="text" class="form-control" id="name" />
          </div>
        </form>
      </div>
    );
  }*/
};

export default BlockContent;
