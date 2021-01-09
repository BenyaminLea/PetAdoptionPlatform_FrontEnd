import React from "react";
import "./ProfileSettings.css";
import { withRouter } from "react-router-dom";
import logo from "./logo.jpg";
import "./HomePage.css";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      message: "",
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
        console.log(data);
        if (data.loggedIn) {
          this.setState({ user: data.user });
          console.log(this.state.user);
        } else {
          this.props.history.push("/");
        }
      });
  }

  goBack() {
    this.props.history.goBack();
  }

  handleEmailChange(event) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        email: event.target.value,
      },
    }));
  }
  handlePasswordChange(event) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        password: event.target.value,
      },
    }));
  }
  handleFirstNameSignInChange(event) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        firstName: event.target.value,
      },
    }));
  }
  handleLastNameSignInChange(event) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        lastName: event.target.value,
      },
    }));
  }
  handlePhoneSignInChange(event) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        phone: event.target.value,
      },
    }));
  }
  handleShortBioChange(event) {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        shortBio: event.target.value,
      },
    }));
  }
  Change() {
    const url = "http://localhost:5000/api/user/" + this.state.user._id;
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(this.state.user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ message: data.message });
      });
  }

  render() {
    return (
      <div className="homePage">
        <button onClick={() => this.goBack()}>Back to the home page</button>
        <img src={logo} alt="logo" className="logo" />
        <div className="profileSettings">
          <h1>Profile Settings</h1>
          <div>
            <div> Email Address</div>
            <input
              type="text"
              name="emailSignIn"
              id="emailSignIn"
              value={this.state.user.email}
              onChange={(event) => this.handleEmailChange(event)}
            />
          </div>
          <div>
            <div>Password</div>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.user.password}
              onChange={(event) => this.handlePasswordChange(event)}
            />
          </div>
          <div>
            <div>First Name</div>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={this.state.user.firstName}
              onChange={(event) => this.handleFirstNameSignInChange(event)}
            />
          </div>
          <div>
            <div>Last Name</div>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={this.state.user.lastName}
              onChange={(event) => this.handleLastNameSignInChange(event)}
            />
          </div>
          <div>
            <div>Phone Number </div>
            <input
              type="text"
              name="phone"
              id="phone"
              value={this.state.user.phone}
              onChange={(event) => this.handlePhoneSignInChange(event)}
            />
          </div>
          <div>
            <div>Short Bio</div>
            <input
              type="text"
              name="shortBio"
              id="shortBio"
              value={this.state.user.shortBio}
              onChange={(event) => this.handleShortBioChange(event)}
            />
          </div>
          <div>{this.state.message && <div>{this.state.message}</div>} </div>
          <div>
            <button className="change" onClick={() => this.Change()}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProfileSettings);
