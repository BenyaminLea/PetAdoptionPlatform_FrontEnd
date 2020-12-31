import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

function PetPage() {
  const [canDisplay, setcanDisplay] = useState(false);
  const [pet, setPet] = useState();
  const history = useHistory();
  useEffect(() => {
    const url = "http://localhost:5000/api" + history.location.pathname;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPet(data);
        console.log(data);
        setcanDisplay(true);
      });
  }, []);
  return (
    <div>
      {!canDisplay && <div>Loading...</div>}
      {canDisplay && (
        <div>
          <div>Type : {pet.type}</div>
          <div>Name : {pet.name}</div>
          <div>Adoption Status : {pet.adoptionStatus} </div>
          <img src={`http://localhost:5000/${pet.picture}`} />
          <div>Height : {pet.height}</div>
          <div>Color : {pet.color}</div>
          <div>Bio: {pet.bio}</div>
          <div>Hypoallergenic : {pet.hypoallergenic}</div>
          <div>Dietary Restrictions: {pet.dietaryRestrictions}</div>
          <div>Breed of animal : {pet.breed}</div>
        </div>
      )}
    </div>
  );
}

export default PetPage;
