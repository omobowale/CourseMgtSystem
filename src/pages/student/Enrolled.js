import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from "../../commons/Header";

export default function Enrolled() {
  return (
    <>
      <Header name="Enrollment Status" link="/enrolled" />
      <div className="container mt-5 text-center">
        <Card>
          <Card.Header>
            <Card.Title>Enrollment Status</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <h4>You have successfully enrolled to the course.</h4>
              <p>Your student id is ...</p>
              <p>The following are the details of the course</p>
            </Card.Text>
            <a href="/home"><Button variant="info">Back to home</Button></a>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
