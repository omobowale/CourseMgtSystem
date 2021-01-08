import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Header from '../../commons/Header'

export default function EnrollmentRequest() {
    return (
        <>
        <Header name="Enrollment Request" link="/enrollment-request" />
        <div className="container mt-5 text-center">
          <Card>
            <Card.Header>
              <Card.Title>Enrollment Request</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <h4>You enrollment request has been sent for approval. </h4>
                <p>You will be able to automatically enrolled once approved.</p>
              </Card.Text>
              <a href="/course-enrollment"><Button variant="info">Back to all courses</Button></a>
            </Card.Body>
          </Card>
        </div>
      </>
    )
}