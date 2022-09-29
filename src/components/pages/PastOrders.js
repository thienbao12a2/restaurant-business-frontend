import React, { Component } from "react";
import Sidenavigation from "../layouts/Sidenavigation";
import Topnavigation from "../layouts/Topnavigation";
import Breadcrumb from "../sections/Orders/Breadcrumb";
import PastOrderTable from "../sections/Orders/PastOrderTable";
import Favorder from "../sections/Orders/Favorder";
import Ordertable from "../sections/Orders/Ordertable";
import Quickbar from "../layouts/Quickbar";
import { Services, Functions } from "../../lib";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { io } from "socket.io-client";
import jwt from "jsonwebtoken";
import {
  withContext,
  MerchantInterfaceConsumer,
} from "../../context/MerchantInterfaceContext";

class PastOrders extends Component {
  constructor(props) {
    super(props);

    this.state = { shopData: {}, name: "", activeOrders: {} };
  }
  //   componentDidMount = () => {
  //     console.log(Services.SOCKET_IO_URL);
  //     const userName = localStorage.getItem("userData");
  //     const token = localStorage.getItem("token");
  //     const login = localStorage.getItem("login");

  //     this.setState({ name: userName });
  //     if (token) {
  //       const user = jwt.decode(token);
  //       if (!user) {
  //         localStorage.removeItem("token");
  //         this.props.history.push("/login");
  //       } else {
  //         if (login === "true") {
  //           this.toastsuccess();
  //           localStorage.removeItem("login");
  //         }
  //         console.log("123");
  //         this.socket.connect();
  //         this.startServices();
  //         // this.onGetActiveOrders();
  //         this.onCheckUpdatesFromSocket();
  //         this.socket.on("connect", () => {
  //           const transport = this.socket.io.engine.transport.name; // in most cases, "polling"
  //           console.log("transport", transport);

  //           this.socket.io.engine.on("upgrade", () => {
  //             const upgradedTransport = this.socket.io.engine.transport.name; // in most cases, "websocket"
  //             console.log("web", upgradedTransport);
  //           });
  //         });
  //       }
  //     } else {
  //       localStorage.removeItem("token");
  //       this.props.history.push("/login");
  //     }
  //   };
  componentDidMount() {
    const activeOrders = JSON.parse(localStorage.getItem("activeOrders"));
    this.setState({ activeOrders });
  }
  logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.setItem("logout", "true");
    this.props.history.push("/login");
  };
  render() {
    const { name, activeOrders } = this.state;
    const { context } = this.props;
    const { pastOrders } = context;
    console.log(pastOrders);
    return (
      <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
        <Sidenavigation />
        <main className="body-content">
          <Topnavigation logoutUser={this.logoutUser} name={name} />
          <div className="ms-content-wrapper">
            <div className="row">
              <div className="col-md-12">
                <Breadcrumb page={"Past Orders"} />
                {/* <Favorder /> */}
                <PastOrderTable pastOrders={pastOrders} />
              </div>
            </div>
          </div>
        </main>
        {/* <Quickbar /> */}
      </div>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(PastOrders);
