import React from "react";
import "./HomePage.css";
import logo from "./logo.jpg";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const EditPet = () => {
  const [formInfo, setFormInfo] = useState({});
  const [picture, setPicture] = useState(null);
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
    const url =
      "http://localhost:5000/api" + history.location.pathname.slice(0, -4);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFormInfo(data);
      });
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const handleChange = (e) => {
    setFormInfo({
      ...formInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPicture(file);
  };

  const Edit = (e) => {
    e.preventDefault();
    if (picture) {
      console.log("hello");
      let formData = new FormData();
      formData.append("data", JSON.stringify(formInfo));
      formData.append("picture", picture);
      fetch("http://localhost:5000/api/pet/photo/" + formInfo._id, {
        method: "PUT",
        body: formData,
      });
    } else {
      fetch("http://localhost:5000/api/pet/" + formInfo._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInfo),
      });
    }
  };

  return (
    <div>
      <div className="homePage">
        <button onClick={goBack}>Back to the admin home page</button>
        <form onSubmit={Edit}>
          <img src={logo} alt="logo" className="logo" />
          <h1 className="welcome">Admin Page</h1>
          <h2>Edit Pet</h2>
          <div>Type:</div>
          <select name="type" value={formInfo.type} onChange={handleChange}>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
          <div>Name:</div>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formInfo.name}
          />
          <div>Adoption Status:</div>
          <select
            name="adoptionStatus"
            value={formInfo.adoptionStatus}
            onChange={handleChange}
          >
            <option value="adopted">Adopted</option>
            <option value="fostered">Fostered</option>
            <option value="available">Available</option>
          </select>
          <div>Picture:</div>
          <input type="file" name="picture" onChange={handleFileUpload} />
          <div>Height:</div>
          <input
            type="text"
            name="height"
            onChange={handleChange}
            value={formInfo.height}
          />
          <div>Weight:</div>
          <input
            type="text"
            name="weight"
            onChange={handleChange}
            value={formInfo.weight}
          />
          <div>Color:</div>
          <input
            type="text"
            name="color"
            value={formInfo.color}
            onChange={handleChange}
          />
          <div>Bio:</div>
          <input
            type="text"
            name="bio"
            value={formInfo.bio}
            onChange={handleChange}
          />
          <div>Hypoallergenic:</div>
          <select
            name="hypoallergenic"
            value={formInfo.hypoallergenic}
            onChange={handleChange}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div>Dietary Restrictions:</div>
          <input
            type="text"
            name="dietaryRestrictions"
            value={formInfo.dietaryRestrictions}
            onChange={handleChange}
          />
          <div>Breed:</div>
          <input
            type="text"
            name="breed"
            value={formInfo.breed}
            onChange={handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default EditPet;
