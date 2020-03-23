import React, { Component } from "react";
import Layout1 from "./../template-1/Layout1";
import SidebarAndLayout from "../template-1/SidebarAndLayout";
import NavbarBottom from "./../layout/NavbarBottom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "./../loader/Loader";
import { Link } from "react-router-dom";
import firestore from "./../../firebase/firestore";

class CvEditor extends Component {
  state = { title: "", isLoading: true };
  componentDidMount() {
    this.props.updatePrevUrl(window.location.pathname);
    window.onpopstate = e => {
      this.props.history.push("/");
    };
    firestore
      .collection("users")
      .doc(this.props.auth.uid)
      .collection("cvs")
      .doc(this.props.match.params.id)
      .get()
      .then(resp => {
        this.props.updateOrderOfBlocks(resp.data().orderOfBlocks);
        this.setState({ title: resp.data().title, isLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
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
      return <Redirect to="/" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container-fluid">
        <SidebarAndLayout
          id={this.props.match.params.id}
          title={this.state.title}
        />
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
