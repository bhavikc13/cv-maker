import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { getCvs } from "../../store/getData";

const CvList = ({ cvs, auth }) => {
  return (
    <div className="container-fluid">
      <div className="container-fluid">
        {cvs &&
          cvs
            .filter(cv => cv.userId === auth.uid)
            .map(cv => {
              return (
                <Link to={"/" + cv.id} key={cv.id}>
                  <div className="panel panel-default">
                    <div className="panel-heading">{cv.title}</div>
                  </div>
                </Link>
              );
            })}
      </div>
      <div className="container-fluid">
        <Link className="btn btn-secondary" to="/createcv">
          Create New CV
        </Link>
      </div>
    </div>
  );
};

export default CvList;
