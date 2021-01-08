import React, {useEffect, useState} from "react";
import Header from "../../commons/Header";
import axios from 'axios'

export default function ModuleAssessment() {

    const [students, setStudents] = useState([]);
    const [modules, setModules] = useState([]);

    function fetchAllStudents(){
        axios.get('http://localhost:8080/students')
        .then( (response) => {
            // handle success
            var resData = response.data;
            //console.log(resData.data);
            setStudents(resData.data);
            let data = JSON.stringify(resData);
        });
    }

    function fetchAllModules(){
        axios.get('http://localhost:8080/modules')
        .then( (response) => {
            // handle success
            var resData = response.data;
            console.log(resData.data);
            setModules(resData.data);
            let data = JSON.stringify(resData);
        });
    }

    useEffect(() => {
        fetchAllStudents();
        fetchAllModules();
        return () => {
            
        }
    }, [])



  return (
    <>
      <Header name="Assessment" link="/module-assessment" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Student Name</label>
              <select className="form-control" name="students" id="students">
                {students.map((student, index) => {
                    return(
                        <option key={index}>{student.firstname + ' ' + student.lastname}</option>
                    )
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Module Name</label>
              <select className="form-control">
              {modules.map((module, index) => {
                    return(
                        <option key={index}>{module.module_name}</option>
                    )
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Assessment Type</label>
              <select className="form-control">
                <option>In-Course</option>
                <option>Examination</option>
              </select>
            </div>
            <div className="form-group">
              <label>Score</label>
              <input
                type="number"
                step="0.5"
                placeholder="Enter Score"
                className="form-control"
              />
            </div>
            <div>
              <button className="btn btn-primary">Add to record</button>
            </div>
          </div>
        </div>
        <table className="table mt-5 text-center table-bordered table-hover">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Id</th>
              <th>Assessment Type</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3 text-center">
          <button className="btn btn-info">Save Record</button>
        </div>
      </div>
    </>
  );
}
