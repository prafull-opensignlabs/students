import React, { useState, useEffect } from "react";
import Parse from "parse";
import "./App.css";
import BootstrapTable from "react-bootstrap-table-next";
import "./fresh-bootstrap-table.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";  

const PARSE_APPLICATION_ID = "QNRm8MgB7Qi1DjAD0Rw6qtjXLnTZ1fa7JGWBknS8";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "U8VhPQ0CNgBF16PmcvNvjZFJv33mXw7gjJfvHQJm";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;



export const StudentData = () => {
  const [readResults, setReadResults] = useState([]);
  const [newStudentTitle, setNewStudentTitle] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentAge, setNewStudentAge] = useState("");

  //For fetching data automatically on page load
  useEffect(() => {
    readStudents();  
  }, []);

  // For creating new Entry
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

  //for reading data from db
  const readStudents = async function () {
    const parseQuery = new Parse.Query("Student");
    try {
      let students = await parseQuery.find();
      const studentsJsonArr = students.map((item) => ({
        title: item.get("title"),
        Email: item.get("Email"),
        Age: item.get("Age"),
        objectId: item.get("objectId"),
        done: item.get("done"),
        id: item.id,
      }));

      setReadResults(studentsJsonArr);
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  //For activate and deactivate Data
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

  //For delte Data from db 
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

  //for making columns in bootstrap table with buttons
  const columns = [
    {
      dataField: "title",
      text: "title",
    },
    {
      dataField: "Email",
      text: "Email",
    },
    {
      dataField: "Age",
      text: "Age",
    },
    {
      dataField: "df2",
      isDummyField: true,
      text: "Action",
      formatter: (_, row) => {
        if (row.done) {
          return (
            <>
              <button
                id="button"
                onClick={() => deleteStudent(row.id)}
                className="remove_btn"
              >
                Delete
              </button>
              <button
                id="button"
                onClick={() => updateStudent(row.id, false)}
                className="update_btn1"
              >
                Deactivate
              </button>
            </>
          );
        }
        return (
          <>
            <button
              id="button"
              onClick={() => deleteStudent(row.id)}
              className="remove_btn"
            >
              Delete
            </button>
            <button
              id="button"
              onClick={() => updateStudent(row.id, true)}
              className="update_btn2"
            >
              Activate
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <div className="container">
          <h2 className="list_heading">Student Data</h2>
          <div className="flex_between"></div>
          <div >
            {/* Inputs */}
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
            <button onClick={createStudent} className="add_btn">
              Add
               </button>
          </div>
          {/* Bootstrap table */}
          <BootstrapTable keyField="id" data={readResults} columns={columns}   striped hover condensed/>
        </div>
      </div>
    </>
  );
};
