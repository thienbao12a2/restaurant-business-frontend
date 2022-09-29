import React, { Component } from "react";
import Sidenavigation from "../layouts/Sidenavigation";
import Topnavigation from "../layouts/Topnavigation";
import Breadcrumb from "../sections/Orders/Breadcrumb";
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
import Swal from "sweetalert2";
import SeatMap from "../sections/Checkin/SeatMap";
import {
  withContext,
  MerchantInterfaceConsumer,
} from "../../context/MerchantInterfaceContext";
import ding from "../../assets/audio/ding-sound.mp3";

class CheckIn extends Component {
  constructor(props) {
    super(props);
    // this.socket = io(Services.SOCKET_IO_URL, {
    //   extraHeaders: {
    //     "ngrok-skip-browser-warning": true,
    //   },
    //   transports: ["polling"],
    // });
    this.state = {
      shopData: {},
      activeOrders: {},
      showNewOrderModal: false,
    };
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
    const token = localStorage.getItem("token");
    const login = localStorage.getItem("login");
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
        // this.socket.connect();
        // this.startServices();
        // this.onCheckUpdatesFromSocket();
        // this.socket.on("connect", () => {
        //   const transport = this.socket.io.engine.transport.name;
        //   console.log("transport", transport);

        //   this.socket.io.engine.on("upgrade", () => {
        //     const upgradedTransport = this.socket.io.engine.transport.name;
        //     console.log("web", upgradedTransport);
        //   });
        // });
      }
    } else {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    }
  };
  // onAcceptOrder = (order, audio = null) => {
  //   const { orderID } = order;
  //   const { activeOrders } = this.state;
  //   const updatedActiveOrders = activeOrders.map((item) => {
  //     let orderDetails = { ...item.orderDetails };
  //     if (orderID === item.orderDetails.orderID) {
  //       orderDetails = { ...item.orderDetails, orderStatus: "Accepted" };
  //       this.onConfirmOrder({ ...item, orderDetails });
  //     }
  //     return { ...item, orderDetails };
  //   });
  //   this.setState({ activeOrders: updatedActiveOrders }, () => {
  //     if (audio) audio.pause();
  //   });
  // };
  // newOrderAlert(newOrder, audio) {
  //   Swal.fire({
  //     title: "New Online Order",
  //     text: `You have a new Online Order from ${newOrder.orderDetails.name}`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#07be6e",
  //     cancelButtonColor: "#f9423c",
  //     confirmButtonText: "Accept",
  //     cancelButtonText: "Ignore",
  //   }).then((result) => {
  //     if (result.value) {
  //       const { orderDetails } = newOrder;
  //       console.log(orderDetails);
  //       this.onAcceptOrder(orderDetails, audio);
  //       // Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     } else {
  //       audio.pause();
  //     }
  //   });
  // }
  // playNewOrderSound() {
  //   const audio = new Audio(ding);
  //   audio.loop = true;
  //   return audio;
  // }
  // onCheckUpdatesFromSocket = () => {
  //   this.socket.on("add-order-to-active-orders", this.onAddNewOrder);
  // };
  // onAddNewOrder = (newOrder) => {
  //   const audio = this.playNewOrderSound();
  //   audio.play();
  //   const { RankActiveOrders } = Functions;
  //   console.log("new", newOrder);
  //   this.setState(
  //     {
  //       activeOrders: RankActiveOrders([
  //         { ...newOrder },
  //         ...this.state.activeOrders,
  //       ]),
  //     },
  //     () => this.newOrderAlert(newOrder, audio)
  //   );
  // };
  toastsuccess = () => {
    toastr.remove();
    toastr.options.positionClass = "toast-top-right";
    toastr.success("Successfully Logged In", "Alert");
  };
  // startServices = async () => {
  //   const { RankActiveOrders } = Functions;
  //   const response = await axios.get(
  //     "https://6505-2600-1700-5cac-3d30-f864-cbeb-fcb3-271b.ngrok.io/api/v1/my-restaurant/services",
  //     {
  //       headers: { "ngrok-skip-browser-warning": true },
  //     }
  //   );
  //   const { data } = response;
  //   this.setState(
  //     {
  //       shopBasicInfo: data.data,
  //       activeOrders: RankActiveOrders(data.data.order),
  //     },
  //     () => {
  //       localStorage.setItem(
  //         "activeOrders",
  //         JSON.stringify(this.state.activeOrders)
  //       );
  //       localStorage.setItem(
  //         "shopBasicInfo",
  //         JSON.stringify(this.state.shopBasicInfo)
  //       );
  //     }
  //   );
  // };
  // logoutUser = () => {
  //   localStorage.removeItem("activeOrders");
  //   localStorage.removeItem("token");
  //   localStorage.setItem("logout", "true");
  //   this.props.history.push("/login");
  // };
  // onConfirmOrder = async (orders) => {
  //   const response = await axios.post(
  //     "https://6505-2600-1700-5cac-3d30-f864-cbeb-fcb3-271b.ngrok.io/api/v1/my-restaurant/confirmOrder",
  //     {
  //       headers: { "ngrok-skip-browser-warning": true },
  //       orders,
  //     }
  //   );
  // };

  // expandOrder = () => {};
  render() {
    // const { activeOrders } = this.state;
    const { context } = this.props;
    const { activeOrders, onAcceptOrder, onCompleteOrder } = context;
    return (
      <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
        <Sidenavigation />
        <main className="body-content">
          <Topnavigation />
          <div className="ms-content-wrapper">
            <div className="row">
              <div className="col-md-12">
                <Breadcrumb page={"Check In"} />
                {/* <Favorder /> */}

                <SeatMap />
              </div>
            </div>
          </div>
        </main>
        {/* <Quickbar /> */}
      </div>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(CheckIn);
