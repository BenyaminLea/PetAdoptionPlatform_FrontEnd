import "./HomePage.css";
import Modal from "react-modal";
import React, { useState } from "react";
Modal.setAppElement("#root");

function UserCard(props) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = (e) => {
    e.stopPropagation();
    setIsOpenModal(false);
  };

  return (
    <div className="card">
      <li key={props.user._id} onClick={openModal}>
        {props.user.firstName} {props.user.lastName}
        <Modal
          isOpen={isOpenModal}
          onRequestClose={(e) => closeModal(e)}
          style={{
            overlay: { backgroundColor: "black" },
            content: {
              width: "auto",
              height: "auto",
              top: "25%",
              left: "25%",
              right: "auto",
              bottom: "auto",
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          <h2>User's informations</h2>
          <div>First Name: {props.user.firstName}</div>
          <div>Last Name: {props.user.lastName}</div>
          <div>Email: {props.user.email}</div>
          <div>Phone Number: {props.user.phone}</div>
          <div>is Admin ? {props.user.isAdmin === true ? "Yes" : "No"} </div>
          <div>
            Pets Owned :
            <ul>
              {props.user.pets.map((pet) => (
                <li key={pet._id}>
                  <div>Pet's id: {pet._id}</div>
                  <div> Pet's Name: {pet.name}</div>
                  <div>Pet's type: {pet.type}</div>
                  <div>Pet's Adoption Status: {pet.adoptionStatus}</div>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      </li>
    </div>
  );
}

export default UserCard;
