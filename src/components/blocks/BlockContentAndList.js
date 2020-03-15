import React, { Component } from "react";
import BlockContent from "./BlockContent";
import BlockList from "./BlockList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class BlockContentAndList extends Component {
  state = {};
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col col-lg-4">
            <BlockList
              block={this.props.match.path}
              id={this.props.match.params.id}
            />
          </div>
          <div className="col col-lg-8">
            <BlockContent
              block={this.props.match.path}
              id={this.props.match.params.id}
              push={this.props.history.push}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    cvs: state.firestore.ordered.cvs
  };
};

export default connect(mapStateToProps)(BlockContentAndList);
