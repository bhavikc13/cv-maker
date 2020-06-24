import React, { Component } from "react";
import SidebarAndLayout1 from "../templates/template1/SidebarAndLayout1";
import SidebarAndLayout2 from "./../templates/template2/SidebarAndLayout2";
import NavbarBottom from "./../layout/NavbarBottom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";
import firestore from "./../../firebase/firestore";

class CvEditor extends Component {
  state = { title: "", isLoading: true, templateId: null };
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    if (!this.props.auth.uid) {
      return <Redirect to="/signin" />;
    }
    let prevUrl = this.props.prevUrl;
    window.onpopstate = (e) => {
      if (prevUrl !== "/cvlist") this.props.history.push("/");
    };
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.match.params.id)
      .get()
      .then((resp) => {
        if (resp.data().templateId === 1) {
          this.props.loadOrderOfBlocks(resp.data().orderOfBlocks);
          this.props.loadOrderOfEducationBlocks(
            resp.data().orderOfEducationBlocks
          );
          this.props.loadOrderOfInternshipBlocks(
            resp.data().orderOfInternshipBlocks
          );
          this.props.loadOrderOfProjectBlocks(resp.data().orderOfProjectBlocks);
          this.props.loadOrderOfPositionBlocks(
            resp.data().orderOfPositionBlocks
          );
          this.props.loadOrderOfAwardBlocks(resp.data().orderOfAwardBlocks);
          this.props.loadOrderOfHobbyBlocks(resp.data().orderOfHobbyBlocks);
          this.props.loadOrderOfSkillBlocks(resp.data().orderOfSkillBlocks);
        }
        this.setState({
          title: resp.data().title,
          isLoading: false,
          templateId: resp.data().templateId,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
    this.props.updatePrevUrl(window.location.pathname);
  }
  render() {
    const { auth } = this.props;
    if (auth.uid && auth.emailVerified === false) {
      return (
        <div style={{ marginTop: "50px" }}>
          <p style={{ color: "white", textAlign: "center" }}>
            We have sent you mail on your registered email ID for verification.
          </p>
          <p style={{ color: "white", textAlign: "center" }}>
            Please check your inbox!!
          </p>
          <p style={{ color: "white", textAlign: "center" }}>
            After verifying your email ID refresh the browser page.
          </p>
        </div>
      );
    }
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div
        className="container-fluid"
        style={{ padding: "0", margin: "0" }}
        data-testid="cvEditorTestId"
      >
        {this.state.templateId === 1 ? (
          <SidebarAndLayout1
            id={this.props.match.params.id}
            title={this.state.title}
            templateId={this.state.templateId}
          />
        ) : null}
        {this.state.templateId === 2 ? (
          <SidebarAndLayout2
            id={this.props.match.params.id}
            title={this.state.title}
            templateId={this.state.templateId}
          />
        ) : null}
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
    updateOrderOfBlocks: (orderOfBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_BLOCKS",
        orderOfBlocks: orderOfBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    updateOrderOfEducationBlocks: (orderOfEducationBlocks, uid, cvid) => {
      dispatch({
        type: "UPDATE_ORDER_OF_EDUCATION_BLOCKS",
        orderOfEducationBlocks: orderOfEducationBlocks,
        uid: uid,
        cvid: cvid,
      });
    },
    loadOrderOfBlocks: (orderOfBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_BLOCKS",
        orderOfBlocks: orderOfBlocks,
      });
    },
    loadOrderOfEducationBlocks: (orderOfEducationBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_EDUCATION_BLOCKS",
        orderOfEducationBlocks: orderOfEducationBlocks,
      });
    },
    loadOrderOfInternshipBlocks: (orderOfInternshipBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_INTERNSHIP_BLOCKS",
        orderOfInternshipBlocks: orderOfInternshipBlocks,
      });
    },
    loadOrderOfProjectBlocks: (orderOfProjectBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_PROJECT_BLOCKS",
        orderOfProjectBlocks: orderOfProjectBlocks,
      });
    },
    loadOrderOfPositionBlocks: (orderOfPositionBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_POSITION_BLOCKS",
        orderOfPositionBlocks: orderOfPositionBlocks,
      });
    },
    loadOrderOfAwardBlocks: (orderOfAwardBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_AWARD_BLOCKS",
        orderOfAwardBlocks: orderOfAwardBlocks,
      });
    },
    loadOrderOfHobbyBlocks: (orderOfHobbyBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_HOBBY_BLOCKS",
        orderOfHobbyBlocks: orderOfHobbyBlocks,
      });
    },
    loadOrderOfSkillBlocks: (orderOfSkillBlocks) => {
      dispatch({
        type: "LOAD_ORDER_OF_SKILL_BLOCKS",
        orderOfSkillBlocks: orderOfSkillBlocks,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CvEditor);
