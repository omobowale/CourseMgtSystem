import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './auth/Login';
import reportWebVitals from './reportWebVitals';
import CourseEnrollment from './pages/student/CourseEnrollement';
import EnrollmentRequest from './pages/student/EnrollmentRequest';
import Enrolled from './pages/student/Enrolled';
import CourseResult from './pages/admin/CourseResult';
import ModuleAssessment from './pages/admin/ModuleAssessment';
import CoursesAndModules from './pages/admin/CoursesAndModules';
import StudentCourses from './pages/student/StudentCourses';
import StudentResult from './pages/student/StudentResult';
import EnrollRequests from './pages/admin/EnrollRequests';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/enrolled" component={Enrolled}></Route>
      <Route exact path="/course-enrollment" component={CourseEnrollment}></Route>
      <Route exact path="/enroll-requests" component={EnrollRequests}></Route>
      <Route exact path="/enrollment-request" component={EnrollmentRequest}></Route>
      <Route exact path="/course-result" component={CourseResult}></Route>
      <Route exact path="/courses-and-modules" component={CoursesAndModules}></Route>
      <Route exact path="/module-assessment" component={ModuleAssessment}></Route>
      <Route exact path="/student-courses" component={StudentCourses}></Route>
      <Route exact path="/student-result" component={StudentResult}></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
