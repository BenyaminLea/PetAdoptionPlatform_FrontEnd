import "./PetCard.css";
import { useHistory } from "react-router-dom";
import logo from "./logo.jpg";
import "./HomePage.css";
function PetCard(props) {
  const history = useHistory();
  const seeMore = () => {
    const path = "/pet/" + props.pet._id;
    history.push(path);
  };
  return (
    <div className="card">
      <div className="cardName">{props.pet.name}</div>
      <img
        src={`http://localhost:5000/${props.pet.picture}`}
        className="cardImage"
      />
      <div className="cardStatus">Status : {props.pet.adoptionStatus}</div>
      <button className="cardBtn" onClick={seeMore}>
        See More
      </button>
    </div>
  );
}

export default PetCard;
