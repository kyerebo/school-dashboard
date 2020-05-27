import React, { Component } from "react";
import firebase from "./firebase.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Remove extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.teacherName = React.createRef();
    this.studentName = React.createRef();
  }

  removeStudent(studentID) {
    const studentRef = firebase.database().ref(`/students/${studentID}`);
    studentRef.remove();
  }
  removeTeacher(teacherID) {
    const teacherRef = firebase.database().ref(`/teachers/${teacherID}`);
    teacherRef.remove();
  }
  handleStudentSubmit = (e) => {
    e.preventDefault();
    this.removeStudent(this.studentName.current.value);
    alert("Student has been removed");
  };
  handleTeacherSubmit = (e) => {
    e.preventDefault();
    this.removeTeacher(this.teacherName.current.value);
    alert("Teacher has been removed");
  };

  render() {
    let students = this.props.students.map((student) => (
      <option key={student.id} value={student.id}>
        {student.name}
      </option>
    ));
    let teachers = this.props.teachers.map((teacher) => (
      <option key={teacher.id} value={teacher.id}>
        {teacher.name}
      </option>
    ));
    return (
      <div>
        <Form onSubmit={this.handleStudentSubmit}>
          <Form.Group>
            <Form.Label>Remove student</Form.Label>
            <Form.Control as="select" ref={this.studentName}>
              {students}
            </Form.Control>
          </Form.Group>
          <Button variant="danger" type="Submit">
            Remove
          </Button>
        </Form>
        <Form onSubmit={this.handleTeacherSubmit}>
          <Form.Group>
            <Form.Label>Remove teacher</Form.Label>
            <Form.Control as="select" ref={this.teacherName}>
              {teachers}
            </Form.Control>
          </Form.Group>
          <Button variant="danger" type="Submit">
            Remove
          </Button>
        </Form>
      </div>
    );
  }
}
export default Remove;
