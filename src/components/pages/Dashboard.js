import React from "react";
import jwt from "jsonwebtoken";
import { io } from "socket.io-client";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Sidenavigation from "../layouts/Sidenavigation";
import Topnavigation from "../layouts/Topnavigation";
import Homecontent from "../sections/Dashboard/Homecontent";
import Quickbar from "../layouts/Quickbar";
// import { AuthContextConsumer, withContext } from "../../context/AuthContext";
// import AuthContext from "../../context/AuthContext";
import { Services, Functions } from "../../lib";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(Services.SOCKET_IO_URL, {
      extraHeaders: {
        "ngrok-skip-browser-warning": true,
      },
      transports: ["polling"],
    });
    this.state = { shopData: {}, name: "", activeOrders: {} };
    this.toastsuccess = this.toastsuccess.bind(this);
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-left",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  componentDidMount = () => {
    console.log(Services.SOCKET_IO_URL);
    const userName = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    const login = localStorage.getItem("login");

    this.setState({ name: userName });
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        this.props.history.push("/login");
      } else {
        if (login === "true") {
          this.toastsuccess();
          localStorage.removeItem("login");
        }
        console.log("123");
        this.socket.connect();
        this.startServices();
        // this.onGetActiveOrders();
        this.onCheckUpdatesFromSocket();
        this.socket.on("connect", () => {
          const transport = this.socket.io.engine.transport.name; // in most cases, "polling"
          console.log("transport", transport);

          this.socket.io.engine.on("upgrade", () => {
            const upgradedTransport = this.socket.io.engine.transport.name; // in most cases, "websocket"
            console.log("web", upgradedTransport);
          });
        });
      }
    } else {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    }
  };
  onCheckUpdatesFromSocket = () => {
    // const { shopID } = this.props;
    this.socket.on("add-order-to-active-orders", this.onAddNewOrder);
    // this.socket.on("change-status-of-active-order", (data) =>
    //   // this.onChangeStatusOfActiveOrder(data)
    //   console.log(123)
    // );
    // this.socket.on("close-an-order", this.onCloseAnOrder);
  };
  onAddNewOrder = (orderDetails) => {
    const { RankActiveOrders } = Functions;
    console.log("orderDetails", orderDetails);
    this.setState({
      activeOrders: RankActiveOrders([
        orderDetails,
        ...this.state.activeOrders,
      ]),
    });
    // this.setState({ activeOrders: addOrder });
  };
  toastsuccess = () => {
    toastr.remove();
    toastr.options.positionClass = "toast-top-right";
    toastr.success("Successfully Logged In", "Alert");
  };
  startServices = async () => {
    const { RankActiveOrders } = Functions;
    const response = await axios.get(
      "https://6505-2600-1700-5cac-3d30-f864-cbeb-fcb3-271b.ngrok.io/api/v1/my-restaurant/services",
      {
        headers: { "ngrok-skip-browser-warning": true },
      }
    );
    const { data } = response;
    this.setState({
      shopBasicInfo: data.data,
      activeOrders: RankActiveOrders(data.data.order),
    });
  };
  logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.setItem("logout", "true");
    this.props.history.push("/login");
  };
  render() {
    console.log("state", this.state.activeOrders);
    const { name } = this.state;
    return (
      <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
        <Sidenavigation />
        <main className="body-content">
          <Topnavigation logoutUser={this.logoutUser} name={name} />
          <Homecontent name={name} />
        </main>
        {/* <Quickbar /> */}
      </div>
    );
  }
}

export default withRouter(Dashboard);
