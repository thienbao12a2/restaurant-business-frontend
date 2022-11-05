import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/vendors/iconic-fonts/font-awesome/css/all.min.css";
import "./assets/vendors/iconic-fonts/flat-icons/flaticon.css";
import "./assets/vendors/iconic-fonts/cryptocoins/cryptocoins.css";
import "./assets/vendors/iconic-fonts/cryptocoins/cryptocoins-colors.css";
import "./assets/css/animate.min.css";
import "./assets/css/style.css";

ReactDOM.render(
  <BrowserRouter basename={"/empire-steakhouse"}>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
