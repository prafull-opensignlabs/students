import React, { useState } from "react";
import Parse from "parse";
import "./App.css";
// import BootstrapTable from "react-bootstrap-table-next";
import "./fresh-bootstrap-table.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const PARSE_APPLICATION_ID = "QNRm8MgB7Qi1DjAD0Rw6qtjXLnTZ1fa7JGWBknS8";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "U8VhPQ0CNgBF16PmcvNvjZFJv33mXw7gjJfvHQJm";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// const COLOR_CODES = ["#808080","#F0FFFF"];

export const StudentData = ({studentData}) => {
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
  // const getRowColor = (index) => {
  //   return COLOR_CODES[index % 2];
  // };

  return (
    <>
      <div>
        <div className="container">
          <h2 className="list_heading">Student Data</h2>
          <div className="flex_between"></div>
          <div className="card">
            <form className="form-inline">
              <input
                value={newStudentTitle}
                onChange={(event) => setNewStudentTitle(event.target.value)}
                placeholder="Student Name"
                size="large"
              />

              <input
                value={newStudentEmail}
                onChange={(event) => setNewStudentEmail(event.target.value)}
                placeholder="Student Email"
                size="large"
              />

              <input
                value={newStudentAge}
                onChange={(event) => setNewStudentAge(event.target.value)}
                placeholder="Student Age"
                size="large"
              />
            </form>
            <button type="submit"onClick={createStudent} className="add_btn">
              Add
            </button>
          </div>

          <div>
            {/* Student read results list*/}
            {readResults !== null &&
              readResults !== undefined &&
              readResults.length > 0 && (
                <div>
                  {/* <BootstrapTable> */}
                  <table id="bootstrap-table" className="table table-striped">
                    <thead>
                      <tr>
                      <th data-index="SrNo">Sr.No.</th>
                      <th data-index="title">Name</th>
                      <th data-index="Email">Email</th>
                      <th data-index="Age">Age</th>
                      <th data-index="Action ">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {readResults.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.get("SrNo")}</td>
                            <td>{item.get("title")}</td>
                            <td>{item.get("Email")}</td>
                            <td>{item.get("Age")}</td>
                            <td>
                              <button
                                id="button"
                                onClick={() => deleteStudent(item.id)}
                                className="remove_btn"
                              >
                                Delete
                              </button>
                              {/* Student update button */}
                              {item.get("done") !== false && (
                                <button
                                  id="button"
                                  onClick={() => updateStudent(item.id, false)}
                                  className="update_btn1"
                                >
                                  Deactivate
                                </button>
                              )}
                              {item.get("done") !== true && (
                                <button
                                  id="button"
                                  onClick={() => updateStudent(item.id, true)}
                                  className="update_btn2"
                                >
                                  Activate
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* </BootstrapTable> */}
                </div> 
              )}
          </div>
        </div>
      </div>
    </>
  );
};
