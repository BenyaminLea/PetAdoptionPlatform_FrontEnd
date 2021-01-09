import React from "react";
import "./HomePage.css";
import Modal from "react-modal";
import logo from "./logo.jpg";
import { withRouter } from "react-router-dom";

Modal.setAppElement("#root");

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLogIn: false,
      isOpenSignIn: false,
      emailLogIn: "",
      passwordLogIn: "",
      emailSignIn: "",
      passwordSignIn1: "",
      passwordSignIn2: "",
      firstName: "",
      lastName: "",
      phone: "",
      login: false,
      message: "",
      signin: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/login", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.loggedIn) {
          this.props.history.push("/in");
        }
      });
  }

  onOpenLogInModal() {
    this.setState({ isOpenLogIn: true });
  }
  onOpenSignInModal() {
    this.setState({ isOpenSignIn: true });
  }
  onCloseLogInModal() {
    this.setState({ isOpenLogIn: false });
  }
  onCloseSignInModal() {
    this.setState({ isOpenSignIn: false });
  }
  handleEmailLogInChange(event) {
    this.setState({ emailLogIn: event.target.value });
  }
  handlePasswordLogInChange(event) {
    this.setState({ passwordLogIn: event.target.value });
  }
  handleEmailSignInChange(event) {
    this.setState({ emailSignIn: event.target.value });
  }
  handlePasswordSignIn1Change(event) {
    this.setState({ passwordSignIn1: event.target.value });
  }
  handlePasswordSignIn2Change(event) {
    this.setState({ passwordSignIn2: event.target.value });
  }
  handleFirstNameSignInChange(event) {
    this.setState({ firstName: event.target.value });
  }
  handleLastNameSignInChange(event) {
    this.setState({ lastName: event.target.value });
  }
  handlePhoneSignInChange(event) {
    this.setState({ phone: event.target.value });
  }
  LogIn() {
    const user = {
      email: this.state.emailLogIn,
      password: this.state.passwordLogIn,
    };
    fetch("http://localhost:5000/api/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) {
          this.setState({ login: false, message: data.message });
        } else {
          localStorage.setItem("token", data.token);
          this.setState({ login: true });
          this.props.history.push("/in");
        }
      });
  }

  SignIn() {
    const newUser = {
      email: this.state.emailSignIn,
      password1: this.state.passwordSignIn1,
      password2: this.state.passwordSignIn2,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      shortBio: "",
      pets: [],
      petsSaved: [],
    };
    fetch("http://localhost:5000/api/signup", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) {
          this.setState({ login: false, message: data.message });
        } else {
          localStorage.setItem("token", data.token);
          this.setState({ login: true });
          this.props.history.push("/in");
        }
      });
  }

  render() {
    return (
      <div>
        <div className="homePage">
          <img src={logo} alt="logo" className="logo" />
          <h1 className="welcome">Welcome to AdoptAPet</h1>
          <p className="description">AdoptAPet is a pet adoption platform </p>
          <button className="btn" onClick={() => this.onOpenLogInModal()}>
            Log In
          </button>
          <button className="btn" onClick={() => this.onOpenSignInModal()}>
            Sign Up
          </button>
          <a href="/searchpage" className="searchPage">
            Search Page
          </a>
          <Modal
            isOpen={this.state.isOpenLogIn}
            onRequestClose={() => this.onCloseLogInModal()}
            style={{
              overlay: { backgroundColor: "black" },
              content: {
                width: "300px",
                height: "300px",
                top: "25%",
                left: "25%",
                right: "auto",
                bottom: "auto",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <h2>Log In</h2>
            <div>Email:</div>
            <input
              type="text"
              name="emailLogIn"
              id="emailLogIn"
              value={this.state.emailLogIn}
              onChange={(event) => this.handleEmailLogInChange(event)}
            />
            <div>Password:</div>
            <input
              type="password"
              name="passwordLogIn"
              id="passwordLogIn"
              value={this.state.passwordLogIn}
              onChange={(event) => this.handlePasswordLogInChange(event)}
            />
            <button className="btn btnModal" onClick={() => this.LogIn()}>
              Log In
            </button>
            {!this.state.login && <div>{this.state.message}</div>}
          </Modal>
          <Modal
            isOpen={this.state.isOpenSignIn}
            onRequestClose={() => this.onCloseSignInModal()}
            style={{
              overlay: { backgroundColor: "black" },
              content: {
                width: "400px",
                height: "400px",
                top: "25%",
                left: "25%",
                right: "auto",
                bottom: "auto",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <h2>Sign In</h2>
            <div>Email:</div>
            <input
              type="text"
              name="emailSignIn"
              id="emailSignIn"
              value={this.state.emailSignIn}
              onChange={(event) => this.handleEmailSignInChange(event)}
            />
            <div>Password:</div>
            <input
              type="password"
              name="passwordSignIn1"
              id="passwordSignIn1"
              value={this.state.passwordSignIn1}
              onChange={(event) => this.handlePasswordSignIn1Change(event)}
            />
            <div>Password:</div>
            <input
              type="password"
              name="passwordSignIn2"
              id="passwordSignIn2"
              value={this.state.passwordSignIn2}
              onChange={(event) => this.handlePasswordSignIn2Change(event)}
            />
            <div>First Name:</div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.firstName}
              onChange={(event) => this.handleFirstNameSignInChange(event)}
            />
            <div>Last Name:</div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.lastName}
              onChange={(event) => this.handleLastNameSignInChange(event)}
            />
            <div>Phone Number:</div>
            <input
              type="text"
              name="phone"
              id="phone"
              value={this.state.phone}
              onChange={(event) => this.handlePhoneSignInChange(event)}
            />
            <button className="btn btnModal" onClick={() => this.SignIn()}>
              Sign Up
            </button>
            {!this.state.login && <div>{this.state.message}</div>}
          </Modal>
        </div>
      </div>
    );
  }
}

export default withRouter(Homepage);
