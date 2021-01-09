import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link, useHistory } from "react-router-dom";
import logo from "./logo.jpg";

function HomePageIn() {
  const [LogInStatus, setLogInStatus] = useState("");
  const history = useHistory();
  useEffect(() => {
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
          setLogInStatus(data.user.firstName + " " + data.user.lastName);
        } else {
          history.push("/");
        }
      });
  }, []);

  const LogOut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="homePage">
      <nav>
        <ul className="navbar">
          <li className="navLi">
            <Link to="/searchpage">Search Page</Link>
          </li>
          <li className="navLi">
            <Link to="/mypetspage">My Pets Page</Link>
          </li>
          <li className="navLi">
            <Link to="/profilesettings">Profile Settings</Link>
          </li>
          <li className="navLi">
            <Link to="/admin">Admin Page</Link>
          </li>
          <li className="navLi">
            <Link to="/" onClick={LogOut}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
      <h1 className="welcomeUser">Welcome {LogInStatus} !</h1>
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
}

export default HomePageIn;
