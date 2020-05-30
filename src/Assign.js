import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "./firebase.js";

class Assign extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.studentName = React.createRef();
    this.teacherName = React.createRef();
  }

  removeStudent = (studentID) => {
    const studentRef = firebase.database().ref(`/students/${studentID}`);
    studentRef.remove();
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let idName = this.studentName.current.value.split(",");
    let idNameT = this.teacherName.current.value.split(",");
    let student = idName[1];
    let teacher = idNameT[1];
    const studentRef = firebase.database().ref(`/students/${idName[0]}`);
    const teacherRef = firebase
      .database()
      .ref(`/teachers/${idNameT[0]}/students`);
    studentRef.update({
      name: student,
      teacher: teacher,
    });
    teacherRef.push({ student });
    alert(student + " assigned to " + teacher);
  };
  render() {
    let students = this.props.students.map(function (student) {
      return (
        <option key={student.id} value={[student.id, student.name]}>
          {student.name}
        </option>
      );
    });
    let teachers = this.props.teachers.map((teacher) => (
      <option key={teacher.id} value={[teacher.id, teacher.name]}>
        {teacher.name}
      </option>
    ));
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Select student</Form.Label>
            <Form.Control as="select" ref={this.studentName}>
              {students}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Select teacher to assign student to</Form.Label>
            <Form.Control as="select" ref={this.teacherName}>
              {teachers}
            </Form.Control>
          </Form.Group>
          <Button type="Submit">Assign</Button>
        </Form>
      </div>
    );
  }
}

export default Assign;
