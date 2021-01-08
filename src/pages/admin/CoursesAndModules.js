import React, { useState, useEffect } from "react";

import Header from "../../commons/Header";
import axios from "axios";

export default function CoursesAndModules() {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [departments, setDepartments] = useState([]);

  //Course form details
  const [course_id, setCourseId] = useState();
  const [course_index, setCourseIndex] = useState();
  const [course_name, setCourseName] = useState("");
  const [course_code, setCourseCode] = useState("");
  const [course_department, setCourseDepartment] = useState("");
  const [course_prerequisite, setCoursePrerequisite] = useState("");

  //Edit Course form details
  const [course_name_edit, setCourseNameEdit] = useState("");
  const [course_code_edit, setCourseCodeEdit] = useState("");
  const [course_department_edit, setCourseDepartmentEdit] = useState("");
  const [course_prerequisite_edit, setCoursePrerequisiteEdit] = useState("");

  //Module form details
  const [module_id, setModuleId] = useState();
  const [module_index, setModuleIndex] = useState();
  const [module_name, setModuleName] = useState("");
  const [module_code, setModuleCode] = useState("");
  const [module_course_name, setModuleCourseName] = useState("");
  const [module_level_type, setModuleLevelType] = useState("");
  const [module_start_date, setModuleStartDate] = useState("");
  const [module_end_date, setModuleEndDate] = useState("");

  //Edit Module form details
  const [module_name_edit, setModuleNameEdit] = useState("");
  const [module_code_edit, setModuleCodeEdit] = useState("");
  const [module_course_name_edit, setModuleCourseNameEdit] = useState("");
  const [module_level_type_edit, setModuleLevelTypeEdit] = useState("");
  const [module_start_date_edit, setModuleStartDateEdit] = useState("");
  const [module_end_date_edit, setModuleEndDateEdit] = useState("");

  function fetchAllDepartments() {
    axios.get("http://localhost:8080/departments").then((response) => {
      // handle success
      var resData = response.data;
      // console.log(resData.data);
      setDepartments(resData.data);
      setCourseDepartment(resData.data[0]?.name);
    });
  }

  function fetchAllCourses() {
    axios.get("http://localhost:8080/courses").then((response) => {
      // handle success
      var resData = response.data;
      console.log(resData.data);
      setCourses(resData.data);
      setModuleCourseName(resData.data[0]?.name);
    });
  }

  function fetchAllModules() {
    axios.get("http://localhost:8080/modules").then((response) => {
      // handle success
      var resData = response.data;
      console.log(resData.data);
      setModules(resData.data);
    });
  }

  function saveCourse() {
    const value = {
      course_name: course_name,
      course_code: course_code,
      course_department: course_department,
      course_prerequisite: course_prerequisite,
    };

    axios.post("http://localhost:8080/courses", value).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      if (resData.error !== undefined) {
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Could not add course. ${resData.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        // window.alert("Response recieved from server = " + data);
        fetchAllCourses();

        message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Course has been added
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      }

      window.scrollTo(0, 0);
      document.getElementById("show-message").innerHTML = message;

      //clear all course form-inputs
      setCourseCode("");
      setCourseName("");
      setCourseDepartment("");
      setCoursePrerequisite("");
    });
  }

  function updateCourse(){
    const value = {
      course_name: course_name_edit,
      course_code: course_code_edit,
      course_department: course_department_edit,
      course_prerequisite: course_prerequisite_edit,
    };

    var id = course_id;

    axios.put(`http://localhost:8080/courses/${id}`, value).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      // console.log(resData);

      if (resData.error !== undefined) {
        // console.log(resData.error);
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong>Could not update course. Please try again later.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        // window.alert("Response recieved from server = " + data);
        fetchAllCourses();

        message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Course has been updated
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



  function deleteCourse(index){
    //get course id by index
    var id = courses[index].id;

    // console.log("delete course with id ", id);
    axios.delete(`http://localhost:8080/courses/${id}`).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      // console.log(resData);

      if (resData.error !== undefined) {
        // console.log(resData.error);
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong>Could not delete course. Please try again later.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        // window.alert("Response recieved from server = " + data);
        fetchAllCourses();
        fetchAllModules();
       

        message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Course has been deleted ${resData.message}
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

  function saveModule() {
    const value = {
      module_name: module_name,
      module_code: module_code,
      module_course_name: module_course_name,
      module_level_type: module_level_type,
      module_start_date: module_start_date,
      module_end_date: module_end_date,
    };

    // console.log(value);

    axios.post("http://localhost:8080/modules", value).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      if (resData.error !== undefined) {
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Could not add module. Kindly check that it hasn't been added before.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        // window.alert("Response recieved from server = " + data);
        fetchAllModules();

        message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Module has been added
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      }

      //scroll to the top and show status message
      window.scrollTo(0, 0);
      document.getElementById("show-message").innerHTML = message;

      //clear all module form-inputs
      setModuleCode("");
      setModuleName("");
      setModuleCourseName("");
      setModuleEndDate("");
      setModuleStartDate("");
      setModuleLevelType("");
    });
  }

  function updateModule() {
    const value = {
      module_name: module_name_edit,
      module_code: module_code_edit,
      module_course_name: module_course_name_edit,
      module_level_type: module_level_type_edit,
      module_start_date: module_start_date_edit,
      module_end_date: module_end_date_edit,
    };

    var id = module_id;

    // console.log(value);

    axios.put(`http://localhost:8080/modules/${id}`, value).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      

      if (resData.error !== undefined) {
        // console.log(resData.error);
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> Could not update module. Please try again later.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        // window.alert("Response recieved from server = " + data);
        fetchAllModules();

        message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Module has been updated
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      }

      //scroll to the top and show status message
      window.scrollTo(0, 0);
      document.getElementById("show-message").innerHTML = message;

      //clear all module form-inputs
      setModuleCode("");
      setModuleName("");
      setModuleCourseName("");
      setModuleEndDate("");
      setModuleStartDate("");
      setModuleLevelType("");

    });
  }

  function deleteModule(index){
    //get module id by index
    var id = modules[index].id;

    // console.log("delete course with id ", id);
    axios.delete(`http://localhost:8080/modules/${id}`).then((response) => {
      // handle success
      var resData = response.data;

      var message = "";

      // console.log(resData);

      if (resData.error !== undefined) {
        // console.log(resData.error);
        message = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong>Could not delete module. ${resData.error}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
      } else {
        // window.alert("Response recieved from server = " + data);
        fetchAllModules();

        message = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Success!</strong> Module has been deleted
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


  function setCourseModalDetails(index) {
    console.log(courses);
    setCourseId(courses[index].id);
    setCourseCodeEdit(courses[index].code);
    setCourseNameEdit(courses[index].name);
    setCourseDepartmentEdit(courses[index].department);
    setCoursePrerequisiteEdit(courses[index].prereq);
  }

  function setModuleModalDetails(index) {
    console.log(modules);
    setModuleId(modules[index].id);
    setModuleCodeEdit(modules[index].module_code);
    setModuleNameEdit(modules[index].module_name);
    setModuleCourseNameEdit(modules[index].module_course_name);
    setModuleLevelTypeEdit(modules[index].module_level_type);
    setModuleStartDateEdit(modules[index].module_start_date);
    setModuleEndDateEdit(modules[index].module_end_date);
  }

  useEffect(() => {
    fetchAllDepartments();
    fetchAllCourses();
    fetchAllModules();
    setModuleLevelType(document.getElementById("module_level_type").value);
    return () => {};
  }, []);

  return (
    <>
      <Header name="Courses And Modules" link="/courses-and-modules" />
      <div id="show-message"></div>
      <div className="container mt-5">
        <p className="alert alert-info mt-5">Courses and their details</p>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Course</th>
              <th>Course Code</th>
              <th>Pre-requisites</th>
              <th>Department</th>
              <th>Modules</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => {
              return (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.prereq}</td>
                  <td>{course.department}</td>
                  <td>
                    {modules
                      .filter((module) => module.module_course_name === course.name)
                      .map((m, index) => {
                        return (
                          <p key={index}>
                            {index + 1}. {m.module_name} ({m.module_level_type})
                          </p>
                        );
                      })}
                  </td>
                  <td style={{ fontWeight: "600" }}>
                    <p
                      id={index}
                      data-toggle="modal"
                      data-target="#course-modal"
                      onClick={() => setCourseModalDetails(index)}
                      className="text-info mr-4 action"
                    >
                      Edit
                    </p>
                    <p className="text-danger action" onClick={() => setCourseIndex(index)} data-toggle="modal" data-target="#delete-course-modal">Delete</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <p className="alert alert-info mt-5">Modules and their details</p>
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Module Name</th>
              <th>Module Code</th>
              <th>Module Course</th>
              <th>Module Level</th>
              <th>Module Start Date</th>
              <th>Module End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, index) => {
              return (
                <tr key={index}>
                  <td>{module.module_name}</td>
                  <td>{module.module_code}</td>
                  <td>{module.module_course_name}</td>
                  <td>{module.module_level_type}</td>
                  <td>{module.module_start_date}</td>
                  <td>{module.module_end_date}</td>
                  <td style={{ fontWeight: "600" }}>
                    <p
                      id={index}
                      data-toggle="modal"
                      data-target="#module-modal"
                      onClick={() => setModuleModalDetails(index)}
                      className="text-info mr-4 action"
                    >
                      Edit
                    </p>
                    <p className="text-danger action" onClick={() => setModuleIndex(index)} data-toggle="modal" data-target="#delete-module-modal">Delete</p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="row mb-5">
          {/* Add a course */}
          <div className="col-md-6 mt-5 add-course">
            <p className="text-primary" style={{ fontWeight: "600" }}>
              Add a course
            </p>
            <div className="form-group">
              <label>Course Name:</label>
              <input
                onChange={(e) => setCourseName(e.target.value)}
                value={course_name}
                type="text"
                placeholder="Enter course name"
                className="form-control"
                name="course_name"
                required
              />
            </div>
            <div className="form-group">
              <label>Course Code:</label>
              <input
                onChange={(e) => setCourseCode(e.target.value)}
                value={course_code}
                type="text"
                placeholder="Enter course code"
                className="form-control"
                name="course_code"
                required
              />
            </div>
            <div className="form-group">
              <label>Course Deparment:</label>
              <select
                className="form-control"
                id="course_department"
                name="course_department"
                value={course_department}
                onChange={(e) => {
                  setCourseDepartment(e.target.value);
                }}
              >
                {departments.map((dept, index) => {
                  return (
                    <option value={dept.name} key={index}>
                      {dept.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label>Course Pre-requisite:</label>
              <textarea
                onChange={(e) => setCoursePrerequisite(e.target.value)}
                type="text"
                placeholder="Enter course pre-requisiste"
                rows="7"
                className="form-control"
                name="course_prerequisite"
                value={course_prerequisite}
              ></textarea>
            </div>

            <div className="">
              <button
                type="button"
                onClick={saveCourse}
                className="btn btn-info btn-block"
              >
                Add Course
              </button>
            </div>
          </div>

          {/* Add a module */}
          <div className="col-md-6 mt-5 add-module">
            <p className="text-primary" style={{ fontWeight: "600" }}>
              Add a module
            </p>
            <div className="form-group">
              <label>Module Name:</label>
              <input
                onChange={(e) => setModuleName(e.target.value)}
                value={module_name}
                type="text"
                placeholder="Enter module name"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Module Code:</label>
              <input
                onChange={(e) => setModuleCode(e.target.value)}
                value={module_code}
                type="text"
                placeholder="Enter module code"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Module's Course:</label>
              <select
                className="form-control"
                name="courses"
                id="courses"
                value={module_course_name}
                onChange={(e) => setModuleCourseName(e.target.value)}
              >
                {courses.map((course, index) => {
                  return (
                    <option value={course.name} key={index}>
                      {course.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Level Type</label>
              <select
                className="form-control"
                name="module_level_type"
                id="module_level_type"
                onChange={(e) => setModuleLevelType(e.target.value)}
              >
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input
                onChange={(e) => setModuleStartDate(e.target.value)}
                value={module_start_date}
                type="date"
                placeholder="Enter module start date"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>End Date:</label>
              <input
                onChange={(e) => setModuleEndDate(e.target.value)}
                value={module_end_date}
                type="date"
                placeholder="Enter module end date"
                className="form-control"
                required
              />
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={saveModule}
                className="btn btn-info btn-block"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>

        {/* Edit course modal */}
        <div className="col-6 m-auto">
          <div className="modal col-md-8 offset-md-2" id="course-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Edit course here</div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Course Name:</label>
                  <input
                    onChange={(e) => setCourseNameEdit(e.target.value)}
                    value={course_name_edit}
                    type="text"
                    placeholder="Enter course name"
                    className="form-control"
                    name="course_name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Code:</label>
                  <input
                    onChange={(e) => setCourseCodeEdit(e.target.value)}
                    value={course_code_edit}
                    type="text"
                    placeholder="Enter course code"
                    className="form-control"
                    name="course_code"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Course Deparment:</label>
                  <select
                    className="form-control"
                    id="course_department"
                    name="course_department"
                    value={course_department_edit}
                    onChange={(e) => {
                      setCourseDepartmentEdit(e.target.value);
                    }}
                  >
                    {departments.map((dept, index) => {
                      return (
                        <option value={dept.name} key={index}>
                          {dept.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Course Pre-requisite:</label>
                  <textarea
                    onChange={(e) => setCoursePrerequisiteEdit(e.target.value)}
                    type="text"
                    placeholder="Enter course pre-requisiste"
                    rows="7"
                    className="form-control"
                    name="course_prerequisite"
                    value={course_prerequisite_edit}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
                <button className="btn btn-info" onClick={updateCourse} data-toggle="modal" data-target="#course-modal">Update</button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit module modal */}
        <div className="col-6 m-auto">
          <div className="modal col-md-8 offset-md-2" id="module-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Edit module here</div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Module Name:</label>
                  <input
                    onChange={(e) => setModuleNameEdit(e.target.value)}
                    value={module_name_edit}
                    type="text"
                    placeholder="Enter module name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Module Code:</label>
                  <input
                    onChange={(e) => setModuleCodeEdit(e.target.value)}
                    value={module_code_edit}
                    type="text"
                    placeholder="Enter module code"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Module's Course:</label>
                  <select
                    className="form-control"
                    name="courses"
                    id="courses"
                    value={module_course_name_edit}
                    onChange={(e) => setModuleCourseNameEdit(e.target.value)}
                  >
                    {courses.map((course, index) => {
                      return (
                        <option value={course.name} key={index}>
                          {course.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>Level Type</label>
                  <select
                    className="form-control"
                    name="module_level_type"
                    id="module_level_type"
                    onChange={(e) => setModuleLevelTypeEdit(e.target.value)}
                    value={module_level_type_edit}
                  >
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Start Date:</label>
                  <input
                    onChange={(e) => setModuleStartDateEdit(e.target.value)}
                    value={module_start_date_edit}
                    type="date"
                    placeholder="Enter module start date"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date:</label>
                  <input
                    onChange={(e) => setModuleEndDateEdit(e.target.value)}
                    value={module_end_date_edit}
                    type="date"
                    placeholder="Enter module end date"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  Cancel
                </button>
                <button className="btn btn-info" data-toggle="modal" onClick={updateModule} data-target="#module-modal">Update</button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete course modal */}
        <div className="col-6 m-auto">
          <div className="modal col-md-8 offset-md-2" id="delete-course-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Delete course here</div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Deleting a course will also delete the associated modules</p>
                <h4>Do you want to proceed?</h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  No
                </button>
                <button className="btn btn-info" onClick={() => deleteCourse(course_index)} data-toggle="modal" data-target="#delete-course-modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
        

        {/* Delete module modal */}
        <div className="col-6 m-auto">
          <div className="modal col-md-8 offset-md-2" id="delete-module-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Delete module here</div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>You are attempting to delete a module</p>
                <h4>Do you want to proceed?</h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  No
                </button>
                <button className="btn btn-info" onClick={() => deleteModule(module_index)} data-toggle="modal" data-target="#delete-module-modal">Yes</button>
              </div>
            </div>
          </div>
        </div>
        



      </div>
    </>

  );
}
