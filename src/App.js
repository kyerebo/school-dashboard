import React, { Component } from "react";
import firebase, { auth, provider } from "./firebase.js";
import Enroll from "./Enroll.js";
import Assign from "./Assign.js";
import Hire from "./Hire.js";
import Remove from "./Remove.js";
import StudentInfo from "./StudentInfo.js";
import "./App.css";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      teachers: [],
      user: null,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
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
        let newStudents = [];
        for (let student in teachers[teacher].students) {
          console.log(teachers[teacher].students[student].student);
          newStudents.push(teachers[teacher].students[student].student);
        }
        newState.push({
          id: teacher,
          name: teachers[teacher].name,
          students: newStudents,
        });
      }
      this.setState({
        teachers: newState,
      });
    });
  }
  login = () => {
    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      this.setState({
        user: user,
      });
    });
  };
  logout = () => {
    auth.signOut().then(() => {
      this.setState({ user: null });
    });
  };
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Thomas Jefferson ES Dashboard</Navbar.Brand>
          {this.state.user ? (
            <Button variant="secondary" onClick={this.logout}>
              Log Out
            </Button>
          ) : (
            <Button variant="primary" onClick={this.login}>
              Log In
            </Button>
          )}
          {this.state.user ? (
            <img className="user-profile" src={this.state.user.photoURL} />
          ) : (
            <div></div>
          )}
          <div className="welcomeMessage">
            {this.state.user ? (
              <Navbar.Text>
                Welcome back {this.state.user.displayName}!
              </Navbar.Text>
            ) : (
              <Navbar.Text>
                Please sign in to access dashboard features.
              </Navbar.Text>
            )}
          </div>
        </Navbar>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="outline"
                eventKey="0"
                disabled={this.state.user ? false : true}
              >
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
              <Accordion.Toggle
                as={Button}
                variant="outline"
                eventKey="1"
                disabled={this.state.user ? false : true}
              >
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
              <Accordion.Toggle
                as={Button}
                variant="outline"
                eventKey="2"
                disabled={this.state.user ? false : true}
              >
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
              <Accordion.Toggle
                as={Button}
                variant="outline"
                eventKey="3"
                disabled={this.state.user ? false : true}
              >
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
                <StudentInfo
                  students={this.state.students}
                  teachers={this.state.teachers}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default App;
