import React from "react";
import "./HomePage.css";
import logo from "./logo.jpg";
import { useHistory, Link } from "react-router-dom";
import { useEffect } from "react";

const Admin = () => {
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
        if (data.loggedIn && data.user.isAdmin) {
        } else {
          history.push("/");
        }
      });
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="homePage">
      <button onClick={goBack}>Back to the home page</button>
      <nav>
        <ul className="navbar">
          <li className="navLi">
            <Link to="/admin/addpet">Add Pet Form</Link>
          </li>
          <li className="navLi">
            <Link to="/admin/dashboard">Admin Dashboard</Link>
          </li>
        </ul>
      </nav>
      <h1 className="welcomeUser">Admin Pages</h1>
      <img src={logo} alt="logo" className="logo" />
    </div>
  );
};

export default Admin;
