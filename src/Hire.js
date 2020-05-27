import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import firebase from "./firebase.js";

class Hire extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.teacherName = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const teachersRef = firebase.database().ref("teachers");
    const teacher = {
      name: this.teacherName.current.value,
    };
    teachersRef.push(teacher);
    alert(this.teacherName.current.value + " submitted as new teacher.");
    this.teacherName.current.value = "";
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Teacher Name</Form.Label>
            <Form.Control
              ref={this.teacherName}
              type="text"
              placeholder="e.g. Susan Kelly"
            />
          </Form.Group>
          <Button type="Submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Hire;
