import React from "react";
import Table from "react-bootstrap/Table";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import "./StudentInfo.css";
const StudentInfo = ({ students, teachers }) => {
  return (
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="student" title="By Student">
        <Table className="table" responsive bordered hover striped size="sm">
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
      </Tab>
      <Tab eventKey="teacher" title="By Teacher">
        <CardGroup className="cardGroup">
          {teachers.slice(0).map((teacher) => {
            return (
              <Card>
                <Card.Header>{teacher.name}</Card.Header>
                <ListGroup variant="flush">
                  {teacher.students.map((student) => {
                    return <ListGroupItem>{student}</ListGroupItem>;
                  })}
                </ListGroup>
              </Card>
            );
          })}
        </CardGroup>
      </Tab>
    </Tabs>
  );
};

export default StudentInfo;
