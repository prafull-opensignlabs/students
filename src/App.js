import './App.css'
import React from "react";
import Parse from 'parse/dist/parse.min.js';
import { StudentData } from "./StudentData";



const PARSE_APPLICATIION_ID = "QNRm8MgB7Qi1DjAD0Rw6qtjXLnTZ1fa7JGWBknS8";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "U8VhPQ0CNgBF16PmcvNvjZFJv33mXw7gjJfvHQJm";

Parse.initialize(PARSE_APPLICATIION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App(){
    return(
        <div className="App">
            <header className="App.header">
                <StudentData />
            </header>
        </div>
    )
}
    

export default App;