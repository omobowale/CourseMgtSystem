import React, { useState } from "react";
import Header from "../commons/Header";
import axios from 'axios'

export default function Login() {

  const [studentFirstName, setStudentFirstName] = useState('');
  const [studentLastName, setStudentLastName] = useState('');
  const [studentRegNo, setStudentRegNo] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  function signStudentIn(e){
    e.preventDefault();
    const value = {
      firstname: studentFirstName,
      lastname: studentLastName,
      registration_number: studentRegNo,
    };

    // console.log(value);

    axios.post(`http://localhost:8080/students/${studentRegNo}`, value).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      if (resData.error !== undefined) {
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Student not found. ${resData.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        if(resData.data !== undefined){
          message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Student found ${resData.data.registration_number}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;

          //log student in by creating session / cookie
          localStorage.setItem("reg_no", resData.data.registration_number);
          localStorage.setItem("u_name", "");
          localStorage.setItem("role", "student");

          //redirect to course enrollment page
          window.location.href = "/course-enrollment";
        }
      }

      window.scrollTo(0, 0);
      document.getElementById("show-message").innerHTML = message;

      //clear all student login form-inputs
      // setStudentFirstName("");
      // setStudentLastName("");
      // setStudentRegNo("");
    });
    
  }

  function signAdminIn(e){

    e.preventDefault();
    const value = {
      username: adminUsername,
      password: adminPassword,
    };

    console.log(value);

    axios.post(`http://localhost:8080/admin`, value).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      if (resData.error !== undefined) {
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Admin not found. ${resData.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        console.log(resData);
        if(resData.data !== undefined){
          message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Admin found ${resData.data.username}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;

          //log student in by creating session / cookie
          localStorage.setItem("u_name", resData.data.username);
          localStorage.setItem("reg_no", "");
          localStorage.setItem("role", "admin");

          //redirect to course enrollment page
          window.location.href = "/courses-and-modules";
        }
      }

      window.scrollTo(0, 0);
      document.getElementById("show-message").innerHTML = message;

      //clear all student login form-inputs
      // setStudentFirstName("");
      // setStudentLastName("");
      // setStudentRegNo("");
    });
    

  }



  return (
    <>
      <Header name="Login" link="/login" />
      <div id="show-message"></div>
      <div className="jumbotron lead text-center">
        <h2 className="mb-5">I AM A(n)</h2>
        <button
          className="btn btn-info mr-5"
          data-toggle="modal"
          data-target="#student-login-modal"
        >
          Student
        </button>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#admin-login-modal"
        >
          Admin
        </button>
      </div>

      {/* Student Login Modal */}
      <div className="modal col-md-6 offset-md-3" id="student-login-modal">
        <form onSubmit={(e) => signStudentIn(e)}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                Login as student
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  required
                  className="form-control"
                  type="text"
                  onChange={(e) => setStudentFirstName(e.target.value)}
                  value={studentFirstName}
                  placeholder="Enter your first name"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  className="form-control"
                  type="text"
                  onChange={(e) => setStudentLastName(e.target.value)}
                  value={studentLastName}
                  placeholder="Enter your last name"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  className="form-control"
                  type="text"
                  onChange={(e) => setStudentRegNo(e.target.value)}
                  value={studentRegNo}
                  placeholder="Enter your registration number"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">Go</button>
            </div>
          </div>
        </form>
      </div>

      {/* Admin Login Modal */}
      <div className="modal col-md-6 offset-md-3" id="admin-login-modal">
        <form onSubmit={signAdminIn}>
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                Login as admin
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  required
                  onChange = {(e) => setAdminUsername(e.target.value)}
                  value={adminUsername}
                  className="form-control"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <div className="form-group">
                <input
                  required
                  onChange = {(e) => setAdminPassword(e.target.value)}
                  value={adminPassword}
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
              <button type="submit" className="btn btn-primary">Go</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
