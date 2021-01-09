import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { useHistory } from "react-router-dom";
import PetCard from "./PetCard";
import logo from "./logo.jpg";
import "./HomePage.css";

function MyPetsPage() {
  const [User, setUser] = useState({ pets: [], petsSaved: [] });
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState("adopted");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const goBack = () => {
    history.goBack();
  };

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
          setUser(data.user);
        } else {
          history.push("/");
        }
      });
  }, []);

  return (
    <div>
      <div className="homePage">
        <button onClick={goBack}>Back to the home page</button>
        <h1>My Pets Page</h1>
        <img src={logo} alt="logo" className="logo" />
        <div>Which type of pets do you want to see ?</div>
        <div className="searchOptions">
          <select
            name="adoptedOrSaved"
            value={selectedOption}
            onChange={(event) => handleChange(event)}
          >
            <option value="adopted">Adopted or Fostered</option>
            <option value="saved">Saved</option>
          </select>
        </div>
        {selectedOption === "adopted" && User.pets.length === 0 && (
          <div>
            <h3>Adopted or Fostered Pets</h3>
            <div> You currently do not own or foster any pets</div>
          </div>
        )}
        {selectedOption === "adopted" && User.pets.length > 0 && (
          <div>
            <h3>Adopted or Fostered Pets</h3>
            <ul>
              {User.pets.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </ul>
          </div>
        )}
        {selectedOption === "saved" && User.petsSaved.length === 0 && (
          <div>
            <h3>Saved Pets</h3>
            <div> You have saved any pets</div>
          </div>
        )}
        {User.petsSaved.length > 0 && selectedOption === "saved" && (
          <div>
            <h3>Saved Pets</h3>
            <ul>
              {User.petsSaved.map((pet) => (
                <PetCard key={pet._id} pet={pet} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPetsPage;
