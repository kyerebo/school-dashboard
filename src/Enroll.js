import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "./firebase.js";

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.studentName = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const studentsRef = firebase.database().ref("students");
    const student = {
      name: this.studentName.current.value,
    };
    studentsRef.push(student);
    alert(this.studentName.current.value + " submitted as new student.");
    this.studentName.current.value = "";
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              ref={this.studentName}
              type="text"
              placeholder="e.g. James Smith"
            />
          </Form.Group>
          <Button type="Submit">Enroll</Button>
        </Form>
      </div>
    );
  }
}

export default Enroll;
