import React from "react";
import "./ProfileSettings.css";

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSignIn: "",
      passwordSignIn1: "",
      passwordSignIn2: "",
      firstName: "",
      lastName: "",
      phone: "",
      shortBio: "",
    };
  }

  handleEmailSignInChange(event) {
    this.setState({ emailSignIn: event.target.value });
  }
  handlePasswordSignIn1Change(event) {
    this.setState({ passwordSignIn1: event.target.value });
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
  handleShortBioChange(event) {
    this.setState({ shortBio: event.target.value });
  }
  Change() {
    if (this.state.passwordSignIn1 === this.state.passwordSignIn2) {
      const newUser = {
        email: this.state.emailSignIn,
        password: this.state.passwordSignIn1,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phone: this.state.phone,
        shortBio: "",
      };
      console.log(newUser);
      //modifier l'user dans la base de données
    } else {
      // print alert
    }
  }

  render() {
    return (
      <div className="profileSettings">
        <h1>Profile Settings</h1>
        <div>
          <div> Email Address</div>
          <input
            type="text"
            name="emailSignIn"
            id="emailSignIn"
            value={this.state.emailSignIn}
            onChange={(event) => this.handleEmailSignInChange(event)}
          />
        </div>
        <div>
          <div>Password</div>
          <input
            type="text"
            name="passwordSignIn1"
            id="passwordSignIn1"
            value={this.state.passwordSignIn1}
            onChange={(event) => this.handlePasswordSignIn1Change(event)}
          />
        </div>
        <div>
          <div>Password Again</div>
          <input
            type="text"
            name="passwordSignIn2"
            id="passwordSignIn2"
            value={this.state.passwordSignIn2}
            onChange={(event) => this.handlePasswordSignIn2Change(event)}
          />
        </div>
        <div>
          <div>First Name</div>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={this.state.firstName}
            onChange={(event) => this.handleFirstNameSignInChange(event)}
          />
        </div>
        <div>
          <div>Last Name</div>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={this.state.lastName}
            onChange={(event) => this.handleLastNameSignInChange(event)}
          />
        </div>
        <div>
          <div>Phone Number </div>
          <input
            type="text"
            name="phone"
            id="phone"
            value={this.state.phone}
            onChange={(event) => this.handlePhoneSignInChange(event)}
          />
        </div>
        <div>
          <div>Short Bio</div>
          <input
            type="text"
            name="shortBio"
            id="shortBio"
            value={this.state.shortBio}
            onChange={(event) => this.handleShortBioChange(event)}
          />
        </div>
        <div>
          <button className="change" onClick={() => this.Change()}>
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileSettings;
