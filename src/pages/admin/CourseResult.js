import React from "react";
import Header from "../../commons/Header";

export default function CourseResult() {
  return (
    <>
      <Header name="Result" link="/course-result" />
      <div className="container-fluid px-4 mt-5">
        <div className="row">
          <div className="col-md-4 col-10">
            <div className="form-group">
              <label>Set pass mark</label>
              <input
                className="form-control"
                type="number"
                step="0.5"
                placeholder="50"
              />
            </div>
            <button className="btn btn-primary">Set</button>
          </div>
        </div>

        <table className="table mt-3 text-center table-bordered table-hover">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student ID</th>
              <th className="p-0 m-0">
                <p className="pt-2">Module</p>
                <table style={{ width: "100%" }} className="">
                  <tr>
                    <th>Module 1</th>
                    <th>Module 2</th>
                    <th>Module 3</th>
                  </tr>
                </table>
              </th>
              <th>Total Score</th>
              <th>Status</th>
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
      </div>
    </>
  );
}
