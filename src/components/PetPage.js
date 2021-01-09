import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import logo from "./logo.jpg";
import "./HomePage.css";

function PetPage() {
  const [canDisplay, setcanDisplay] = useState(false);
  const [LogInStatus, setLogInStatus] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [pet, setPet] = useState({});
  const history = useHistory();

  useEffect(() => {
    const url = "http://localhost:5000/api" + history.location.pathname;
    let Pet = {};
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Pet = data;
        setPet(data);
        setcanDisplay(true);
      });
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
          setLogInStatus(true);
          setUser(data.user);
          checkIfSaved(data.user, Pet);
          if (data.user.isAdmin) {
            setIsAdmin(true);
          }
        }
      });
  }, []);

  const goBack = () => {
    history.goBack();
  };

  const checkIfSaved = (user, pet) => {
    const petsSaved = user.petsSaved;
    let saved = false;
    for (let i = 0; i < petsSaved.length; i++) {
      if (petsSaved[i]._id === pet._id) {
        saved = true;
      }
    }
    setIsSaved(saved);
  };

  const Adopt = () => {
    const url =
      "http://localhost:5000/api" + history.location.pathname + "/adopt";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ pet: pet, user: user, type: "adopt" }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPet(data.pet);
        setUser(data.user);
      });
  };

  const Foster = () => {
    const url =
      "http://localhost:5000/api" + history.location.pathname + "/adopt";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ pet: pet, user: user, type: "foster" }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPet(data.pet);
        setUser(data.user);
      });
  };

  const Return = () => {
    const url =
      "http://localhost:5000/api" + history.location.pathname + "/return";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ pet: pet, user: user }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPet(data.pet);
        setUser(data.user);
      });
  };

  const UnSave = () => {
    const url =
      "http://localhost:5000/api" + history.location.pathname + "/save";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({ pet: pet, user: user }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
        checkIfSaved(data.user, pet);
      });
  };

  const Save = () => {
    const url =
      "http://localhost:5000/api" + history.location.pathname + "/save";
    fetch(url, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ pet: pet, user: user }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data.user);
        checkIfSaved(data.user, pet);
      });
  };

  return (
    <div>
      <div className="homePage">
        <button onClick={goBack}>Back to the previous page</button>
        <img src={logo} alt="logo" className="logo" />
        {!canDisplay && <div>Loading...</div>}
        {canDisplay && (
          <div>
            <div>Type : {pet.type}</div>
            <div>Name : {pet.name}</div>
            <div>Adoption Status : {pet.adoptionStatus} </div>
            <img
              className="petImg"
              src={`http://localhost:5000/${pet.picture}`}
            />
            <div>Height : {pet.height}</div>
            <div>Color : {pet.color}</div>
            <div>Bio: {pet.bio}</div>
            <div>Hypoallergenic : {pet.hypoallergenic}</div>
            <div>Dietary Restrictions: {pet.dietaryRestrictions}</div>
            <div>Breed of animal : {pet.breed}</div>
            {LogInStatus &&
              pet.adoptionStatus === "fostered" &&
              pet.userId === user._id && (
                <button onClick={Adopt}>Adopt The Pet</button>
              )}
            {LogInStatus && pet.adoptionStatus === "available" && (
              <button onClick={Adopt}>Adopt The Pet</button>
            )}
            {LogInStatus && pet.adoptionStatus === "available" && (
              <button onClick={Foster}>Foster The Pet</button>
            )}
            {LogInStatus &&
              pet.adoptionStatus === "adopted" &&
              pet.userId === user._id && (
                <button onClick={Return}>Return The Pet</button>
              )}
            {LogInStatus &&
              pet.adoptionStatus === "fostered" &&
              pet.userId === user._id && (
                <button onClick={Return}>Return The Pet</button>
              )}
            {LogInStatus && !isSaved && <button onClick={Save}>Save</button>}
            {LogInStatus && isSaved && <button onClick={UnSave}>UnSave</button>}
            {isAdmin && (
              <button
                onClick={() => {
                  history.push("/pet/" + pet._id + "/edit");
                }}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PetPage;
