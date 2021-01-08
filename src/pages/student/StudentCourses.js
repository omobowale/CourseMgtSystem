import React, {useState, useEffect} from 'react'
import Header from '../../commons/Header'
import axios from 'axios'

export default function EnrollRequests() {

    const [requests, setRequests] = useState([]);
    const [showRegNo, setShowRegNo] = useState(localStorage.getItem("reg_no"))

    function fetchAllCourses() {
        var notset = localStorage.getItem("reg_no") === null || localStorage.getItem("reg_no") === "";
        if(notset){
            //redirect to login
            window.location.href = '/login';
        }
        else {

            axios.get("http://localhost:8080/enroll-request").then((response) => {
            // handle success
            var resData = response.data;
            console.log(resData.data);
            var filteredrequests = resData.data.filter((request) => request.registration_number === localStorage.getItem("reg_no"));
            console.log(filteredrequests);
            setRequests(filteredrequests);

            });

        }
    }

    useEffect(() => {
        fetchAllCourses()
        return () => {

        }
    }, [])
    

    return (
        <>
        <Header />
        <div className="text-right text-info mr-4">Your Registration Number: <span className="text-primary" style={{fontWeight: "bold"}}>{showRegNo}</span></div>
        <div className="container">
            <p className="alert alert-info mt-5">All Courses</p>
            <table className="table table-bordered table-hover">
            <thead>
                <tr>
                <th>Course Code</th>
                <th>Status</th>
                <th>Your id</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request, index) => {
                    return (
                        <tr key={index}>
                            <td>{request.course_code}</td>
                            <td>{request.status}</td>
                            <td>{""}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>

        </div>
    </>
    )
}
