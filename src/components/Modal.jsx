// DISCLOSURE: the following JavaScript code has been created with the aid of 
// Chat GPT 3.5 and edited by Group 6. 

import React from "react";
import "../style/Modal.css";
import { homePageMessages } from "../lang/messages/user";

const Modal = ({ isOpen, onClose, message }) => {
  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <p>{message}</p>
        <button className="button is-primary" onClick={onClose}>
          {homePageMessages.closeModal}
        </button>
      </div>
    </div>
  );
};

export default Modal;
