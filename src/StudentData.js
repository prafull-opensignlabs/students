import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./App.css";
import { Button, Input, List } from "antd";
import logo from "./images/NXG_logo.png";

const PARSE_APPLICATIION_ID = "QNRm8MgB7Qi1DjAD0Rw6qtjXLnTZ1fa7JGWBknS8";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "U8VhPQ0CNgBF16PmcvNvjZFJv33mXw7gjJfvHQJm";

Parse.initialize(PARSE_APPLICATIION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const COLOR_CODES = ['blue', "red", "green", "purple", "yellow", "#00FF00"];

export const StudentData = () => {
  const [readResults, setReadResults] = useState([]);
  const [newStudentTitle, setNewStudentTitle] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");

  const createStudent = async function () {
    const newStudentTitleValue = newStudentTitle;
    const newStudentEmailVaule = newStudentEmail;
    const newStudentAgeValue = Number(newStudentAge);

    let Student = new Parse.Object("Student");
    Student.set("title", newStudentTitleValue);
    Student.set("Email", newStudentEmailVaule);
    Student.set("Age", newStudentAgeValue);
    Student.set("done", false);

    try {
      await Student.save();

      alert("Success! Student Data created!");

      readStudents();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const readStudents = async function () {
    const parseQuery = new Parse.Query("Student");
    try {
      let students = await parseQuery.find();

      setReadResults(students);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  window.onload = function () {
    readStudents();
  };

  const updateStudent = async function (studentId, done) {
    let Student = new Parse.Object("Student");
    Student.set("objectId", studentId);

    Student.set("done", done);
    try {
      await Student.save();

      alert("Success! Student updated!");

      readStudents();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  const deleteStudent = async function (studentId) {
    let Student = new Parse.Object("Student");
    Student.set("objectId", studentId);

    try {
      await Student.destroy();
      alert("Success! Student Data deleted!");

      readStudents();
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  const getRowColor = (index) => {
    return COLOR_CODES[index%6]
  }
  return (
    <div>
      <div className="header">
        <img
          className="header_logo"
          src={logo}
          alt="NXGlabs_logo"
          style={{ width: "200px", height: "118px" }}
        />
      </div>
      <div></div>
      <div className="container">
        <h2 className="list_heading">Student Data</h2>
        <div className="flex_between">
          {/* student read (refresh) button */}
          {/* <Button onClick={readStudents} className="refresh_btn">
            Refresh
          </Button> */}
        </div>

        <div className="new_student_wrapper flex_between ">
          {/* Student create text input */}
          <form class="form-inline">
            <div class="form-group">
              <Input
                value={newStudentTitle}
                onChange={(event) => setNewStudentTitle(event.target.value)}
                placeholder="Student Name"
                size="large"
              />
            </div>
            <div class="form-group">
              <Input
                value={newStudentEmail}
                onChange={(event) => setNewStudentEmail(event.target.value)}
                placeholder="Student Email"
                size="large"
              />
            </div>
            <div class="form-group">
              <Input
                value={newStudentAge}
                onChange={(event) => setNewStudentAge(event.target.value)}
                placeholder="Student Age"
                size="large"
              />
            </div>
            {/* <div class="form-group"> */}
            <Button onClick={createStudent} className="add_btn">
              Add
            </Button>
            {/* </div> */}
          </form>
        </div>

        <div>
          {/* Student read results list */}
          {readResults !== null &&
            readResults !== undefined &&
            readResults.length > 0 && (
              <List
                dataSource={readResults}
                renderItem={(item, index) => (
                  <>
                  <table>
                      <tr style={{backgroundColor: getRowColor(index)}}>
                        <td>
                          <span>Name: {item.get("title")} </span>
                          <span>Email: {item.get("Email")} </span>
                          <span>Age: {item.get("Age")}</span>
                        </td>
                        <td>
                          <Button
                            id="button"
                            onClick={() => deleteStudent(item.id)}
                            className="remove_btn"
                          >
                            Delete
                          </Button>
                          {/* Student update button */}
                          {item.get("done") !== false && (
                            <Button
                              id="button"
                              onClick={() => updateStudent(item.id, false)}
                              className="update_btn1"
                            >
                              Deactivate
                            </Button>
                          )}
                          {item.get("done") !== true && (
                            <Button
                              id="button"
                              onClick={() => updateStudent(item.id, true)}
                              className="update_btn2"
                            >
                              Activate
                            </Button>
                          )}
                        </td>
                      </tr>
                      </table>
                     </>
                   
                )}
              />
            )}
        </div>
      </div>
    </div>
  );
};
