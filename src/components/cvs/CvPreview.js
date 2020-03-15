import React from "react";

const CvPreview = props => {
  const id = props.match.params.id;
  return <div className="container">{id} - Bhavik Chaudhary</div>;
};

export default CvPreview;
