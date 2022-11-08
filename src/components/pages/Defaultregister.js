import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Functions } from "../../lib";
import Content from "../sections/Defaultregister/Content";

const Defaultregister = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const registerUser = async (event) => {
    const { register } = Functions;
    event.preventDefault();
    setSpinner(true);
    const response = await register(firstName, lastName, email, password);
    const data = await response.json();
    if (data.status === "success") {
      setTimeout(() => {
        setSpinner(false);
        setSuccess(true);
      }, 3000);
      setTimeout(() => history.push("/login"), 7000);
    }
  };
  return (
    <div className="ms-body ms-primary-theme ms-logged-out">
      {/* <Sidenavigation /> */}
      <main className="body-content">
        {/* <Topnavigation /> */}
        <Content
          registerUser={registerUser}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
          success={success}
          spinner={spinner}
        />
      </main>
    </div>
  );
};

export default Defaultregister;
