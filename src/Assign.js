import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "./firebase.js";

class Assign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.students,
      teachers: this.props.teachers,
    };
    this.studentName = React.createRef();
    this.teacherName = React.createRef();
  }

  componentDidMount() {
    const studentsRef = firebase.database().ref("students");
    const teachersRef = firebase.database().ref("teachers");
    studentsRef.on("value", (snapshot) => {
      let students = snapshot.val();
      let newState = [];
      for (let student in students) {
        newState.push({
          id: student,
          name: students[student].name,
        });
      }
      this.setState({
        students: newState,
      });
    });
    teachersRef.on("value", (snapshot) => {
      let teachers = snapshot.val();
      let newState = [];
      for (let teacher in teachers) {
        newState.push({
          id: teacher,
          name: teachers[teacher].name,
        });
      }
      this.setState({
        teachers: newState,
      });
    });
  }
  removeStudent(studentID) {
    const studentRef = firebase.database().ref(`/students/${studentID}`);
    studentRef.remove();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const studentsRef = firebase.database().ref("students");
    const student = {
      name: this.studentName.current.value,
      teacher: this.teacherName.current.value,
    };
    alert(
      this.studentName.current.value +
        " has been assigned to " +
        this.teacherName.current.value
    );
    studentsRef.push(student);
    this.removeStudent(this.studentName.current.key);
  };
  render() {
    let students = this.state.students.map((student) => (
      <option key={student.id} value={student.name}>
        {student.name}
      </option>
    ));
    let teachers = this.state.teachers.map((teacher) => (
      <option key={teacher.id} value={teacher.name}>
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
