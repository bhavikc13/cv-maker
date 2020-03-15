import React from "react";
import "./App.css";
import Layout1 from "../components/template-1/Layout1";
import Sidebar from "../components/template-1/Sidebar";

function App() {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <Sidebar />
      <Layout1 />
    </div>
  );
}

export default App;
