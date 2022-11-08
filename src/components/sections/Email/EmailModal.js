import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCartShopping,
//   faPhone,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
import { RotatingLines } from "react-loader-spinner";
import { Functions } from "../../../lib";
// import moment from "moment-timezone";
import axios from "axios";
import moment from "moment-timezone";

const EmailModal = ({
  showModal,
  setShowModal,
  selectedItem = { email: "" },
  composeEmail,
}) => {
  const [email, setEmail] = useState(!composeEmail ? selectedItem.email : "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [empty, setEmpty] = useState(false);
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  // const onOrderFood = async () => {
  //   const { API_PostRequest } = Functions;
  //   if (name && phoneNumber) {
  //     setSpinner(true);
  //     const orderID =
  //       String(Math.floor(100000 + Math.random() * 900000)) +
  //       String.fromCharCode(97 + Math.floor(Math.random() * 26));
  //     const response = await API_PostRequest.onOrderFood({
  //       timeStamp: moment().toISOString(),
  //       orderStatus: "Pending",
  //       orderID,
  //       name,
  //       phone_number: phoneNumber,
  //       items: [...selectedItems],
  //     });
  //     if (response.status === "success") {
  //       setTimeout(() => setSpinner(false), 3000);
  //       setTimeout(() => setSuccess(true), 3000);
  //       var timeoutID = setTimeout(() => setSuccess(false), 8000);
  //     }
  //     //   else {

  //     //   }
  //   } else {
  //     setEmpty(true);
  //     var timeoutID = setTimeout(() => setEmpty(false), 5000);

  //     return;
  //   }
  // };
  const onSubmit = async () => {
    const { submitEmail } = Functions;
    if ((email, subject, message)) {
      setSpinner(true);
      const response = submitEmail(
        email,
        subject,
        message,
        moment().toISOString()
      );
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/v1/my-restaurant/email",
      //   { email, subject, message, timeStamp: moment().toISOString() }
      // );
      if (response.data.status === "success") {
        setTimeout(() => setSpinner(false), 3000);
        setTimeout(() => setSuccess(true), 3000);
        setTimeout(() => setSuccess(false), 8000);
      }
    } else {
      setEmpty(true);
      setTimeout(() => setEmpty(false), 5000);
      return;
    }
  };
  return (
    <Modal
      className="modal-min"
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center">
        <button
          type="button"
          className="close"
          onClick={() => setShowModal(false)}
        >
          <span aria-hidden="true">×</span>
        </button>
        {/* <FontAwesomeIcon className="flaticon-calender" icon={faCartShopping} /> */}
        <i className="fas fa-paper-plane icon-email" />
        <h1>
          {composeEmail ? "New Email" : `Replying To ${selectedItem.name}`}
        </h1>
        {/* <p>Receiver Email</p> */}
        <form method="post">
          <div className="ms-form-group has-icon">
            <input
              placeholder="To"
              className="form-control"
              value={email || ""}
              onChange={(event) => setEmail(event.target.value)}
            />
            {/* <FontAwesomeIcon className="flaticon-user" icon={faUser} /> */}
            <i className="material-icons">mail</i>
          </div>
          <div className="ms-form-group has-icon">
            <input
              type="text"
              placeholder="Subject"
              className="form-control"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            />
            {/* <FontAwesomeIcon className="flaticon-phone" icon={faPhone} /> */}
            <i className="material-icons">title</i>
          </div>
          <div className="ms-form-group has-icon">
            <textarea
              type="text"
              placeholder="Message"
              className="form-control message-box"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            {/* <FontAwesomeIcon className="flaticon-phone" icon={faPhone} /> */}
          </div>
          <div className="mb-3">
            {spinner && (
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            )}
          </div>
          {success ? (
            <>
              <p className="send-email">Email has been sent successfully</p>
            </>
          ) : (
            empty && <p className="empty-form">Please complete the form.</p>
          )}
          <button
            type="button"
            className="btn btn-secondary btn-state"
            onClick={onSubmit}
          >
            Send
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EmailModal;
