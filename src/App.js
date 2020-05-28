import React, { Component } from "react";
import firebase from "./firebase.js";
import Enroll from "./Enroll.js";
import Assign from "./Assign.js";
import Hire from "./Hire.js";
import Remove from "./Remove.js";
import StudentInfo from "./StudentInfo.js";
import "./App.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      teachers: [],
    };
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
          teacher: students[student].teacher,
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

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Thomas Jefferson ES Dashboard</Navbar.Brand>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Username"
              className="mr-sm-2"
            />
            <FormControl
              type="password"
              placeholder="Password"
              className="mr-sm-2"
            />
            <Button variant="primary">Log in</Button>
          </Form>
        </Navbar>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="outline" eventKey="0">
                Enroll Student
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Enroll />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="outline" eventKey="1">
                Add New Teacher
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Hire />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="outline" eventKey="2">
                Assign Student to Teacher
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Assign
                  students={this.state.students}
                  teachers={this.state.teachers}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="outline" eventKey="3">
                Remove Student or Teacher
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <Remove
                  students={this.state.students}
                  teachers={this.state.teachers}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="outline" eventKey="4">
                Student Information
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <StudentInfo students={this.state.students} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default App;
