import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Header(props) {

  return (
    <Navbar bg="primary" expand="lg">
      <Navbar.Brand href="/" className="text-white" style={{fontSize :"0.9em"}}>CourseManagementSystem</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="text-white">
        <Nav className="mr-auto">
          <Nav.Link href={"/course-enrollment"} className="text-dark"> Course Enrollment </Nav.Link>
          <Nav.Link href={"/student-courses"} className="text-dark"> My Courses </Nav.Link>
          <Nav.Link href={"/student-result"} className="text-dark"> My Result</Nav.Link>
          <Nav.Link href={"/enroll-requests"} className="text-dark"> All Requests</Nav.Link>
          <Nav.Link href={"/module-assessment"} className="text-dark"> Module Assessment</Nav.Link>
          <Nav.Link href={"/courses-and-modules"} className="text-dark"> Courses and Modules</Nav.Link>
          <Nav.Link href={"/course-result"} className="text-dark"> All Results</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
