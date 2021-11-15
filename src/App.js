import "./App.css";
import React from "react";
import Parse from "parse";
import { StudentData } from "./StudentData";

//new changes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { About } from "./components/About";
import Navbarmenu from "./components/menu/Navbarmenu";
import Footer from "./components/Footer";
// import Contact from "./components/Contact";

const PARSE_APPLICATIION_ID = "QNRm8MgB7Qi1DjAD0Rw6qtjXLnTZ1fa7JGWBknS8";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "U8VhPQ0CNgBF16PmcvNvjZFJv33mXw7gjJfvHQJm";

Parse.initialize(PARSE_APPLICATIION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <>
      <Router basename="/">
        {/* Add menu component */}
        <Navbarmenu />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/" Component={About} />
          {/* <Route path="/" Component={Contact} /> */}
        </Routes>
        <StudentData />
        <Footer />
      </Router>
    </>
  );
}

export default App;
