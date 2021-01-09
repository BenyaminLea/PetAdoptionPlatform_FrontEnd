import React, { useState } from "react";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import logo from "./logo.jpg";

import UserCard from "./UserCard";

const AdminDashboard = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);

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

    fetch("http://localhost:5000/api/user")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });

    fetch("http://localhost:5000/api/pet?type=")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPets(data);
      });
  }, []);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="homePage">
      <button onClick={goBack}>Back to the admin home page</button>
      <img src={logo} alt="logo" className="logo" />
      <h1> Admin Dashboard</h1>
      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </ul>
      <h2>List of Pets</h2>
      <ul>
        {pets.map((pet) => (
          <li
            key={pet._id}
            onClick={() => {
              history.replace("/pet/" + pet._id);
            }}
          >
            {pet.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
