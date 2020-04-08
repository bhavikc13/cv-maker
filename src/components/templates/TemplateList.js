import { Link } from "react-router-dom";
import firestore from "../../firebase/firestore";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./../css/loader.css";
import Loader from "../loader/Loader";
import moment from "moment";
import { Redirect } from "react-router-dom";
import {Modal, Button} from 'react-bootstrap';
import '../style/templatelist.css';
import template2BG from '../AddImage/template2BG.png';
import template1BG from '../AddImage/template1BG.png';

class TemplateList extends Component {
  state = { isLoading: true, modalShow1:false, modalShow2:false };

  componentWillUnmount() {}
  componentDidMount() {
    this.props.updatePrevUrl(window.location.pathname);
    this.setState({ isLoading: false });
  }

  setModal1Show = (val) => {
    this.setState({
      modalShow1: val
    })
  }

  handleShowModal1 = () => {
    return (
      <Modal
      onHide = {()=>{this.setModal1Show(false)}}
      show={this.state.modalShow1}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          DA-IICT Regular Preview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <center>
          <img src={template1BG} alt="template1"/>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{this.setModal1Show(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }

  setModal2Show = (val) => {
    this.setState({
      modalShow2: val
    })
  }

  handleShowModal2 = () => {
    return (
      <Modal
      onHide = {()=>{this.setModal2Show(false)}}
      show={this.state.modalShow2}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Professional Resume Preview
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <center>
          <img src={template2BG} alt="template2"/>
        </center>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{this.setModal2Show(false)}}>Close</Button>
      </Modal.Footer>
    </Modal>
    );
  }

  render() {
    
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin" />;
    }
    return this.state.isLoading ? (
      <Loader />
    ) : (
      
      <div  className="container-fluid d-flex justify-content-center screenViewTempList">
        {/*<div className="bgTempList" />*/}
        <div className="row rowTempList">
          <div
            className="col-md-6 colTempList"
            key={1}
          >
          
            <div className="card-body cardBodyTempList">
              <div className="card text-white cardHover">
                <div>
                  <h2 className="card-title titleTempList">DA-IICT Regular</h2>
                </div>

                <img className="card-img imageTempList" 
                    src={template1BG}
                    alt="Card image" 
                    onClick={() => this.setModal1Show(true)}
                />
                {this.handleShowModal1()}
                <div>
                  <p className="card-text textTempList">
                    DA-IICT | Student Placement Cell recommanded resume format for on-campus interviews
                  </p>
                  <div className="cardButtonTempList">
                    <Link to={{ pathname: "/createcv", templateId: 1}}>
                      <button className="btn btn-primary"> Select </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div  className="col-md-6 colTempList"
                key={2}
          >
          
            <div className="card-body cardBodyTempList">
              <div className="card text-white cardHover">
                <div>
                  <h2 className="card-title titleTempList">Professional</h2>
                </div>
                <img  className="card-img imageTempList" 
                      src={template2BG} 
                      alt="Card image" 
                      onClick={()=>{this.setModal2Show(true)}}
                />
                {this.handleShowModal2()}
                <div>
                  <p className="card-text textTempList">
                    Best suited for professional employees.<br/>
                  </p>
                  <div className="cardButtonTempList">
                    <Link to={{ pathname: "/createcv", templateId: 2 }}>
                      <button className="btn btn-primary"> Select </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  
  return {
    auth: state.firebase.auth,
    prevUrl: state.prevUrlRed.prevUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePrevUrl: prevUrl => {
      dispatch({
        type: "UPDATE_PREVURL",
        prevUrl: prevUrl
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);

/*
<div className="row" style={{ margin: "5px" }}>
        <div
          className="col-md-2 col-sm-4"
          key={1}
          style={{
            marginTop: "10px"
          }}
        >
          <div
            className="card border-dark"
            style={{
              minHeight: "200px"
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Template 1</h5>
              <p className="card-text"></p>
              <Link
                to={{
                  pathname: "/createcv",
                  templateId: 1
                }}
                className="stretched-link"
              ></Link>
            </div>
          </div>
        </div>
        <div
          className="col-md-2 col-sm-4"
          key={2}
          style={{
            marginTop: "10px"
          }}
        >
          <div
            className="card border-dark"
            style={{
              minHeight: "200px"
            }}
          >
            <div className="card-body">
              <h5 className="card-title">Template 2</h5>
              <p className="card-text"></p>
              <Link
                to={{
                  pathname: "/createcv",
                  templateId: 2
                }}
                className="stretched-link"
              ></Link>
            </div>
          </div>
        </div>
      </div>

*/
