import React from "react";
import Table from "react-bootstrap/Table";

const StudentInfo = ({ students }) => {
  return (
    <Table responsive bordered hover striped size="sm">
      <thead>
        <tr>
          <th>Student Name</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody>
        {students.slice(0).map((student) => {
          return (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.teacher}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default StudentInfo;
