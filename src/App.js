import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import CvPreview from "./components/cvs/CvPreview";
import CreateCV from "./components/cvs/CreateCv";
import BlockContentAndList from "./components/blocks/BlockContentAndList";
import CvEditor from "./components/cvs/CvEditor";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/createcv" component={CreateCV} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/:id" component={CvEditor} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
