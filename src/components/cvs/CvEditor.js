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
  componentDidMount() {
    console.log(this.props.prevUrl);
    if (this.props.prevUrl !== "/cvlist") {
      window.onpopstate = e => {
        this.props.history.push("/");
      };
    }
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.match.params.id)
      .get()
      .then(resp => {
        this.props.updateOrderOfBlocks(resp.data().orderOfBlocks);
        this.setState({
          title: resp.data().title,
          isLoading: false,
          templateId: resp.data().templateId
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
    this.props.updatePrevUrl(window.location.pathname);
  }
  componentDidUpdate() {
    if (this.props.orderOfBlocks !== null) {
      firestore
        .collection("users")
        .doc(this.props.auth.uid)
        .collection("cvs")
        .doc(this.props.match.params.id)
        .update({
          updatedAt: new Date(),
          orderOfBlocks: this.props.orderOfBlocks
        })
        .then(() =>
          console.log("update date and time.\nupdate order of blocks")
        )
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container-fluid">
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

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl,
    orderOfBlocks: state.orderOfBlocksRed.orderOfBlocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrevUrl: prevUrl => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl
      });
    },
    updateOrderOfBlocks: orderOfBlocks => {
      dispatch({
        type: "UPDATE_ORDER_OF_BLOCKS",
        orderOfBlocks: orderOfBlocks
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CvEditor);
