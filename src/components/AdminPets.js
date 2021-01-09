import React from "react";
import "./HomePage.css";
import logo from "./logo.jpg";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const formFields = {
  type: "dog",
  name: "",
  adoptionStatus: "available",
  height: "",
  weight: "",
  color: "",
  bio: "",
  hypoallergenic: "no",
  dietaryRestrictions: "",
  breed: "",
  userId: "",
};

const AdminPets = () => {
  const [formInfo, setFormInfo] = useState(formFields);
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

  const AddPet = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("data", JSON.stringify(formInfo));
    formData.append("picture", picture);
    console.log(formData);
    fetch("http://localhost:5000/api/pet", {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <div className="homePage">
        <button onClick={goBack}>Back to the admin home page</button>
        <form onSubmit={AddPet}>
          <img src={logo} alt="logo" className="logo" />
          <h1 className="welcome">Admin Page</h1>
          <h2>Add a Pet Form</h2>
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

export default AdminPets;
