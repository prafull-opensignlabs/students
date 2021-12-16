import "./App.css";
import React from "react";
import Parse from "parse";

//new changes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { About } from "./components/About";
import Navbarmenu from "./components/menu/Navbarmenu";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Error from "./components/Error";

const PARSE_APPLICATIION_ID = "TIYO6wjIN55gA47WdBG7iSROns8jhe798Pad7EdF";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "Si8mPs6maxQE3IDN8QHb6LRLF2mP1dJ7tj8vKa6A";

Parse.initialize(PARSE_APPLICATIION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <>
      <Router basename="/">
        {/* Add menu component */}
        <Navbarmenu />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          {/* <Route element={<Error />} /> */}
        </Routes>
        {/* <Error /> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
