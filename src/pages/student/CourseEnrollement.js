import React, { useState, useEffect } from "react";
import Header from "../../commons/Header";
import axios from "axios";

function CourseEnrollement() {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [currentDepartment, setCurrentDepartment] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [modules, setModules] = useState([]);

  const [loggedInDetails, setLoggedInDetails] = useState([]);

  //Enrollment details
  const [registration_number, setRegistrationNumber] = useState('');
  const [course_code, setCourseCode] = useState('');

  function fetchAllDepartments() {
    axios.get("http://localhost:8080/departments").then((response) => {
      // handle success
      var resData = response.data;
      // console.log(resData.data);
      setDepartments(resData.data);
      let data = JSON.stringify(resData);
    });
  }

  function fetchAllModules() {
    axios.get("http://localhost:8080/modules").then((response) => {
      // handle success
      var resData = response.data;
      // console.log(resData.data);
      setModules(resData.data);
      console.log("modules", modules);
      let data = JSON.stringify(resData);
    });
  }

  function fetchAllCourses() {
    axios.get("http://localhost:8080/courses").then((response) => {
      // handle success
      var resData = response.data;
      console.log("courses", resData.data);
      setCourses(resData.data);
      setFilteredCourses(resData.data);
      console.log(filteredCourses);
      let data = JSON.stringify(resData);
    });
  }


  function setDepartment(e) {
    setCurrentDepartment(e);
    var ncourses = [];
    console.log(e);

    if(e == "all"){
        ncourses = courses;
    }
    else {
        ncourses = courses.filter((course) => ((course.department == e)));
    }
    console.log(ncourses);
    setFilteredCourses(ncourses);
  }

  function enableDisableButton(e){
    setCourseCode(e);
    if(localStorage.getItem("reg_no") !== null && localStorage.getItem("reg_no") !== ""){
      setRegistrationNumber(localStorage.getItem("reg_no"));  
    }
    else{
      setRegistrationNumber("");
    }
    setDisableButton(false);
  }

  function requestEnrollment(){
    if(course_code !== "" && registration_number !== ""){
      //make a request
      const value = {
        course_code: course_code,
        registration_number: registration_number,
      };
  
      axios.post("http://localhost:8080/enroll-request", value).then((response) => {
        // handle success
        var resData = response.data;
  
        var message = "";
  
        if (resData.error !== undefined) {
          if(resData.error.includes("SQLITE_CONSTRAINT")){
            message = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Error!</strong> Seems like you have already requested enrollment for that course
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                </div>
                `;
          }
        } else {
          // window.alert("Response recieved from server = " + data);
          fetchAllCourses();

          window.location.href = "/enrollment-request"
  
          message = `
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Success!</strong> Request sent
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
              </div>
              `;
        }
  
        window.scrollTo(0, 0);
        document.getElementById("show-message").innerHTML = message;
  
      });


    }
    else {
      alert('not ready');
    }

  }

  function getLoggedInDetails(){
    var reg_no = localStorage.getItem("reg_no") || '';
    var u_name = localStorage.getItem('u_name') || ''
    var role = localStorage.getItem("role") || '';
    console.log("hey", u_name, reg_no, role);
  }

  useEffect(() => {
    fetchAllDepartments();
    fetchAllCourses();
    fetchAllModules();
    getLoggedInDetails();
    return () => {};
  }, []);

  return (
    <>
      <Header name="Enroll" link="/course-enrollment" />
      <div id="show-message"></div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-1">
            <p>Filter by department</p>
            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="form-control"
              name="departments"
              id="departments"
            >
            <option value="all">All</option>
              {departments.map((dept, index) => {
                return (
                  <option value={dept.name} key={index}>
                    {dept.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <p className="alert alert-info mt-5">Select a course to request enrolment</p>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Courses</th>
              <th>Pre-requisites</th>
              <th>Modules</th>
            </tr>
          </thead>
          <tbody>
              {filteredCourses.map((course, index) => {
                  return (
                      <tr key={index}>
                        <td><input onChange={(e) => enableDisableButton(e.target.value)} type="radio" name="course" value={course.code} /> {course.name}</td>
                        <td>{course.prereq}</td>
                        <td>{modules.filter((module) => module.module_course_name == course.name).map((m, index) => {
                            return <p key={index}>{index+1}.   {m.module_name} ({m.module_level_type})</p>
                        })}
                        </td>
                      </tr>
                  )
              })}
          </tbody>
        </table>

        <div className="mt-3 text-center">
          <button onClick={requestEnrollment} disabled={disableButton} className="btn btn-info">Request to enroll</button>
        </div>
      </div>
    </>
  );
}

export default CourseEnrollement;

