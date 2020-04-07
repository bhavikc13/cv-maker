import React from "react";
import "./../css/loader.css";

const Loader = () => {
  return (
    <div>
      <div className="spinner-border text-primary loader">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
