import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preloader from "./components/layouts/Preloader";
import Email from "./components/pages/Email";
import Defaultlogin from "./components/pages/Defaultlogin";
import Defaultregister from "./components/pages/Defaultregister";
import { MerchantInterfaceProvider } from "./context/MerchantInterfaceContext";
import LiveOrders from "./components/pages/LiveOrders";
import PastOrders from "./components/pages/PastOrders";
import Reservations from "./components/pages/Reservations";
import { Services, Functions } from "../src/lib";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import ding from "../src/assets/audio/ding-sound.mp3";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(Services.SOCKET_IO_URL, {
      extraHeaders: {
        "ngrok-skip-browser-warning": true,
      },
      transports: ["polling"],
      autoConnect: false,
    });
    this.toastsuccess = this.toastsuccess.bind(this);
    this.state = {
      inbox: [],
      sentEmails: [],
      shopData: {},
      activeOrders: {},
      activeReservations: {},
      pastOrders: {},
      newEmailCount: sessionStorage.getItem("newEmailCount"),
    };
  }
  componentDidMount() {
    if (window.location.pathname !== "/empire-steakhouse/login") {
      this.socket.connect();
      this.startServices();
      this.getAllEmails();
      this.onCheckUpdatesFromSocket();
    }
  }
  resetNewEmailCount = () => {
    this.setState({
      newEmailCount: sessionStorage.setItem("newEmailCount", ""),
    });
  };
  toastsuccess(updatedInbox) {
    const { name } = updatedInbox;
    toastr.remove();
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: 0,
      extendedTimeOut: 0,
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    toastr.options.onclick = () => {
      this.resetNewEmailCount();
      window.location.pathname = "/empire-steakhouse/email";
    };
    toastr.success(`New message from ${name}`, "Alert");
  }
  startServices = async () => {
    const {
      RankActiveOrders,
      RankPastOrders,
      RankActiveReservations,
      startServices,
    } = Functions;
    const data = await startServices();
    console.log("data", data);
    this.setState(
      {
        shopBasicInfo: data.data,
        activeOrders: RankActiveOrders(data.data.order),
        pastOrders: RankPastOrders(data.data.pastOrder),
        activeReservations: RankActiveReservations(data.data.booking),
      },
      () => {
        localStorage.setItem(
          "activeOrders",
          JSON.stringify(this.state.activeOrders)
        );
        localStorage.setItem(
          "shopBasicInfo",
          JSON.stringify(this.state.shopBasicInfo)
        );
      }
    );
  };
  onCheckUpdatesFromSocket = () => {
    this.socket.on("add-order-to-active-orders", this.onAddNewOrder);
    this.socket.on("add-order-to-past-orders", this.onAddPastOrder);
    this.socket.on("add-email-to-inbox", this.onAddNewEmail);
    this.socket.on("add-reservations", this.onAddNewReservations);
  };
  onAddNewEmail = (updatedInbox) => {
    this.toastsuccess(updatedInbox);
    if (!sessionStorage.getItem("newEmailCount")) {
      sessionStorage.setItem("newEmailCount", 1);
    } else {
      sessionStorage.setItem(
        "newEmailCount",
        Number(sessionStorage.getItem("newEmailCount")) + 1
      );
    }

    this.setState({
      inbox: [{ ...updatedInbox }, ...this.state.inbox],
      newEmailCount: sessionStorage.getItem("newEmailCount"),
      // newNotificationCount: sessionStorage.getItem("newNotificationCount"),
    });
  };
  onAddNewReservations = (newReservation) => {
    console.log(newReservation);
    const { RankActiveReservations } = Functions;
    this.setState({
      activeReservations: RankActiveReservations([
        { ...newReservation },
        ...this.state.activeReservations,
      ]),
    });
  };
  onAcceptOrder = (order, audio = null) => {
    const { onConfirmOrder } = Functions;
    const { orderID } = order;
    const { activeOrders } = this.state;
    const updatedActiveOrders = activeOrders.map((item) => {
      let orderDetails = { ...item.orderDetails };
      if (orderID === item.orderDetails.orderID) {
        orderDetails = { ...item.orderDetails, orderStatus: "Accepted" };
        onConfirmOrder({ ...item, orderDetails });
      }
      return { ...item, orderDetails };
    });
    this.setState({ activeOrders: updatedActiveOrders }, () => {
      if (audio) audio.pause();
    });
  };

  onCompleteOrder = async (order) => {
    const { onCompleteOrder } = Functions;
    console.log(1);
    order.orderDetails.orderStatus = "Completed";
    await onCompleteOrder(order);
    console.log(1);
    this.startServices();
  };
  onCompleteReservation = async (order) => {
    const { onCompleteOrder } = Functions;
    console.log(1);
    order.orderDetails.orderStatus = "Completed";
    await onCompleteOrder(order);
    console.log(1);
    this.startServices();
  };
  getAllEmails = async (refresh) => {
    const { RankEmail, onGetAllEmails } = Functions;
    const response = await onGetAllEmails();
    const { data } = response;
    console.log(data);
    this.setState({
      inbox: RankEmail(data.emails),
      sentEmails: RankEmail(data.sentEmails),
    });
  };
  newOrderAlert(newOrder, audio) {
    Swal.close();
    Swal.fire({
      title: "New Online Order",
      text: `You have a new Online Order from ${newOrder.orderDetails.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#07be6e",
      cancelButtonColor: "#f9423c",
      confirmButtonText: "Accept",
      cancelButtonText: "Ignore",
    }).then((result) => {
      if (result.value) {
        const { orderDetails } = newOrder;
        this.onAcceptOrder(orderDetails, audio);
      } else {
        audio.pause();
      }
    });
  }
  playNewOrderSound() {
    const audio = new Audio(ding);
    audio.loop = true;
    return audio;
  }
  onAddPastOrder = (pastOrder) => {
    const { RankPastOrders } = Functions;
    console.log("pasT", pastOrder);
    this.setState({
      pastOrders: RankPastOrders([{ ...pastOrder }, ...this.state.pastOrders]),
    });
  };
  onAddNewOrder = (newOrder) => {
    const { RankActiveOrders } = Functions;
    const audio = this.playNewOrderSound();
    audio.play();
    this.setState(
      {
        activeOrders: RankActiveOrders([
          { ...newOrder },
          ...this.state.activeOrders,
        ]),
      },
      () => this.newOrderAlert(newOrder, audio)
    );
  };
  render() {
    console.log("reservatopm", this.state.activeReservations);
    return (
      <MerchantInterfaceProvider
        value={{
          inbox: this.state.inbox,
          sentEmails: this.state.sentEmails,
          activeOrders: this.state.activeOrders,
          activeReservations: this.state.activeReservations,
          pastOrders: this.state.pastOrders,
          onAcceptOrder: this.onAcceptOrder,
          onAcceptReservation: this.onAcceptReservation,
          onCompleteOrder: this.onCompleteOrder,
          onCompleteReservation: this.onCompleteReservation,
          getAllEmails: this.getAllEmails,
          newEmailCount: this.state.newEmailCount,
          resetNewEmailCount: this.resetNewEmailCount,
        }}
      >
        <Router basename={"/empire-steakhouse"}>
          <Preloader />
          <Switch>
            <Route exact path="/reservations" component={Reservations} />
            <Route path="/email" component={Email} />
            <Route path="/live-orders" component={LiveOrders} />
            <Route path="/past-orders" component={PastOrders} />
            <Route path="/login" component={Defaultlogin} />
            <Route path="/register" component={Defaultregister} />
          </Switch>
        </Router>
      </MerchantInterfaceProvider>
    );
  }
}

export default App;
