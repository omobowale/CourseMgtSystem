import React, {useState, useEffect} from 'react'
import Header from '../../commons/Header'
import axios from 'axios'

export default function EnrollRequests() {

    const [requests, setRequests] = useState([]);
    const [registration_number, setRegistrationNumber] = useState('');
    const [course_code, setCourseCode] = useState('');
    const [status, setStatus] = useState('');

    function fetchAllRequests() {
        axios.get("http://localhost:8080/enroll-request").then((response) => {
          // handle success
          var resData = response.data;
          // console.log(resData.data);
          setRequests(resData.data);
        });
    }

    function setApprovalDetails(registration_number, course_code, status){
        console.log(registration_number, course_code);
        setCourseCode(course_code);
        setRegistrationNumber(registration_number);
        setStatus(status);

        
    }

    function approveRequest(){
        const value = {
            registration_number: registration_number,
            course_code: course_code,
          };
      
          axios.put(`http://localhost:8080/enroll-request/${status}`, value).then((response) => {
            // handle success
            var resData = response.data;
      
            var message = "";
      
            console.log(resData);
      
            if (resData.error !== undefined) {
              // console.log(resData.error);
              message = `
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Error!</strong>Could not approve request. Please try again later.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </div>
                  `;
            } else {
              // window.alert("Response recieved from server = " + data);
              fetchAllRequests();
      
              message = `
                  <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Success!</strong> Request has been approved
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

    function setUnapprovalDetails(registration_number, course_code, status){
        console.log(registration_number, course_code);
        setCourseCode(course_code);
        setRegistrationNumber(registration_number);
        setStatus(status);

    }

    function unapproveRequest(){
        const value = {
            registration_number: registration_number,
            course_code: course_code,
          };
      
          axios.put(`http://localhost:8080/enroll-request/${status}`, value).then((response) => {
            // handle success
            var resData = response.data;
      
            var message = "";
      
            console.log(resData);
      
            if (resData.error !== undefined) {
              // console.log(resData.error);
              message = `
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>Error!</strong>Could not unapprove request. Please try again later.
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  </div>
                  `;
            } else {
              // window.alert("Response recieved from server = " + data);
              fetchAllRequests();
      
              message = `
                  <div class="alert alert-warning alert-dismissible fade show" role="alert">
                  <strong>Success!</strong> Request has been un-approved
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

    useEffect(() => {
        fetchAllRequests()
        return () => {
        }
    }, [])
    

    return (
        <>
        <Header />
        <div className="container">
            <div id="show-message"></div>
            <p className="alert alert-info mt-5">All Requests</p>
            <table className="table table-bordered table-hover">
            <thead>
                <tr>
                <th>Registration Number</th>
                <th>Course Code</th>
                <th>Status</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request, index) => {
                    return (
                        <tr key={index}>
                            <td>{request.registration_number}</td>
                            <td>{request.course_code}</td>
                            <td>{request.status}</td>
                            <td>
                                {request.status == "pending" ? <button onClick={() => setApprovalDetails(request.registration_number, request.course_code, "approve")} className="btn btn-warning action" data-toggle="modal" data-target="#approve-course-modal">Approve</button> : <button className="btn btn-success action" onClick={() => setUnapprovalDetails(request.registration_number, request.course_code, "unapprove")} data-toggle="modal" data-target="#unapprove-course-modal">Unapprove</button>}                                
                            </td>
                        </tr>
                    )
                })}
            </tbody>
            </table>


            <div className="col-6 m-auto">
          <div className="modal col-md-8 offset-md-2" id="approve-course-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Approve course enrollement here</div>
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
                <p>You are attempting to approve a request</p>
                <h4>Do you want to proceed?</h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  No
                </button>
                <button className="btn btn-info" onClick={() => approveRequest()} data-toggle="modal" data-target="#approve-course-modal">Yes</button>
              </div>
            </div>
          </div>
        </div>


            <div className="col-6 m-auto">
          <div className="modal col-md-8 offset-md-2" id="unapprove-course-modal">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-title">Unapprove course enrollement here</div>
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
                <p>You are attempting to unapprove a request</p>
                <h4>Do you want to proceed?</h4>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" data-dismiss="modal">
                  No
                </button>
                <button className="btn btn-info" onClick={() => unapproveRequest()} data-toggle="modal" data-target="#unapprove-course-modal">Yes</button>
              </div>
            </div>
          </div>
        </div>

        </div>
    </>
    )
}
