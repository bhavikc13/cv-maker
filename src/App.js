import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import CvList from "./components/cvs/CvList";
import TemplateList from "./components/templates/TemplateList";
import CreateCV from "./components/cvs/CreateCv";
import CvEditor from "./components/cvs/CvEditor";
import Feedback from "./components/layout/Feedback";
import ForgotPassword from "./components/auth/ForgotPassword";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Error404 from "./Error404";
//import { TouchBackend } from "react-dnd-touch-backend";
//import { DndProvider } from "react-dnd-multi-backend/dist/cjs/components/DndProvider";
//import HTML5toTouch from "react-dnd-multi-backend/dist/cjs/HTML5toTouch";

class App extends React.Component {
  componentDidMount() {
    document.title = "CV Maker";
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <DndProvider backend={HTML5Backend}>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/cvlist" component={CvList} />
              <Route exact path="/templatelist" component={TemplateList} />
              <Route exact path="/createcv" component={CreateCV} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/feedback" component={Feedback} />
              <Route path="/cvlist/:id" component={CvEditor} />
              <Route component={Error404} />
            </Switch>
          </DndProvider>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
