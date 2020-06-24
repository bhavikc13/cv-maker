import React, { Component } from "react";

export class Error404 extends Component {
  render() {
    return (
      <div className="container">
        <p style={{ color: "white", fontSize: "80px", textAlign: "center" }}>
          Error 404
        </p>
        <p style={{ color: "white", fontSize: "40px", textAlign: "center" }}>
          Page not found!!
        </p>
      </div>
    );
  }
}

export default Error404;
