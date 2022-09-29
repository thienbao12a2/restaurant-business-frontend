import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Preloader from "./components/layouts/Preloader";
import Dashboard from "./components/pages/Dashboard";
import Accordions from "./components/pages/Accordions";
import Addproduct from "./components/pages/Addproduct";
import Alerts from "./components/pages/Alerts";
import Animations from "./components/pages/Animations";
import Badges from "./components/pages/Badges";
import Basictables from "./components/pages/Basictables";
import Breadcrumbs from "./components/pages/Breadcrumbs";
import Buttons from "./components/pages/Buttons";
import Cards from "./components/pages/Cards";
import Chartjs from "./components/pages/Chartjs";
import Chat from "./components/pages/Chat";
import Cropper from "./components/pages/Cropper";
import Customerlist from "./components/pages/Customerlist";
import Customerreview from "./components/pages/Customerreview";
import Datatables from "./components/pages/Datatables";
import Draggables from "./components/pages/Draggables";
import Email from "./components/pages/Email";
import Flaticons from "./components/pages/Flaticons";
import Fontawesome from "./components/pages/Fontawesome";
import Formelements from "./components/pages/Formelements";
import Formlayouts from "./components/pages/Formlayouts";
import Formvalidation from "./components/pages/Formvalidation";
import Formwizard from "./components/pages/Formwizard";
import Googlemaps from "./components/pages/Googlemaps";
import Invoicedetail from "./components/pages/Invoicedetail";
import Invoicelist from "./components/pages/Invoicelist";
import Materialize from "./components/pages/Materialize";
import Menucatalogue from "./components/pages/Menucatalogue";
import Menugrid from "./components/pages/Menugrid";
import Menulist from "./components/pages/Menulist";
import Modals from "./components/pages/Modals";
import Googlechart from "./components/pages/Googlechart";
import Pagination from "./components/pages/Pagination";
import Preloaders from "./components/pages/Preloaders";
import Productdetail from "./components/pages/Productdetail";
import Progressbars from "./components/pages/Progressbars";
import Rangeslider from "./components/pages/Rangeslider";
import Rating from "./components/pages/Rating";
import Restaurantlist from "./components/pages/Restaurantlist";
import Sales from "./components/pages/Sales";
import Sliders from "./components/pages/Sliders";
import Socialactivity from "./components/pages/Socialactivity";
import Sweetalerts from "./components/pages/Sweetalerts";
import Tabs from "./components/pages/Tabs";
import Toast from "./components/pages/Toast";
import Todolist from "./components/pages/Todolist";
import Tour from "./components/pages/Tour";
import Typography from "./components/pages/Typography";
import Vectormaps from "./components/pages/Vectormaps";
import Widgets from "./components/pages/Widgets";
import Clientmanagement from "./components/pages/Clientmanagement";
import Comingsoon from "./components/pages/Comingsoon";
import Defaultlogin from "./components/pages/Defaultlogin";
import Defaultregister from "./components/pages/Defaultregister";
import Error from "./components/pages/Error";
import Faq from "./components/pages/Faq";
import Invoice from "./components/pages/Invoice";
import Lockscreen from "./components/pages/Lockscreen";
import Modallogin from "./components/pages/Modallogin";
import Modalregister from "./components/pages/Modalregister";
import Portfolio from "./components/pages/Portfolio";
import Stockmanagement from "./components/pages/Stockmanagement";
import Userprofile from "./components/pages/Userprofile";
import CheckIn from "./components/pages/CheckIn";
import Webanalytics from "./components/pages/Webanalytics";
import { MerchantInterfaceProvider } from "./context/MerchantInterfaceContext";
import LiveOrders from "./components/pages/LiveOrders";
import PastOrders from "./components/pages/PastOrders";
import { Services, Functions, Constants } from "../src/lib";
import { io } from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import ding from "../src/assets/audio/ding-sound.mp3";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import moment from "moment-timezone";

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
      pastOrders: {},
      newEmailCount: sessionStorage.getItem("newEmailCount"),
      // newNotificationCount: sessionStorage.getItem("newNotificationCount"),
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
    const { RankActiveOrders, RankPastOrders, startServices } = Functions;
    const data = await startServices();
    console.log("data", data);
    this.setState(
      {
        shopBasicInfo: data.data,
        activeOrders: RankActiveOrders(data.data.order),
        pastOrders: RankPastOrders(data.data.pastOrder),
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
    // if (!sessionStorage.getItem("newNotificationCount")) {
    //   sessionStorage.setItem("newNotificationCount", 1);
    // } else {
    //   sessionStorage.setItem(
    //     "newNotificationCount",
    //     Number(sessionStorage.getItem("newNotificationCount")) + 1
    //   );
    // }
    this.setState({
      inbox: [{ ...updatedInbox }, ...this.state.inbox],
      newEmailCount: sessionStorage.getItem("newEmailCount"),
      // newNotificationCount: sessionStorage.getItem("newNotificationCount"),
    });
  };

  // resetNotificationCount = () => {
  //   this.setState({
  //     newNotificationCount: sessionStorage.setItem("newNotificationCount", ""),
  //   });
  // };
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
  getAllEmails = async (refresh) => {
    const { RankEmail, onGetAllEmails } = Functions;
    const response = await onGetAllEmails();
    const { data } = response;
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
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
  // onConfirmOrder = async (orders) => {
  //   const response = await axios.post(
  //     "https://6505-2600-1700-5cac-3d30-f864-cbeb-fcb3-271b.ngrok.io/api/v1/my-restaurant/confirmOrder",
  //     {
  //       headers: { "ngrok-skip-browser-warning": true },
  //       orders,
  //     }
  //   );
  // };
  onAddPastOrder = (pastOrder) => {
    const { RankPastOrders } = Functions;
    // const audio = this.playNewOrderSound();
    // audio.play();
    // if (!sessionStorage.getItem("newNotificationCount")) {
    //   sessionStorage.setItem("newNotificationCount", 1);
    // } else {
    //   sessionStorage.setItem(
    //     "newNotificationCount",
    //     Number(sessionStorage.getItem("newNotificationCount")) + 1
    //   );
    //
    console.log("pasT", pastOrder);
    this.setState({
      pastOrders: RankPastOrders([{ ...pastOrder }, ...this.state.pastOrders]),
      // newNotificationCount: sessionStorage.getItem("newNotificationCount"),
    });
  };
  onAddNewOrder = (newOrder) => {
    const { RankActiveOrders } = Functions;
    const audio = this.playNewOrderSound();
    audio.play();
    // if (!sessionStorage.getItem("newNotificationCount")) {
    //   sessionStorage.setItem("newNotificationCount", 1);
    // } else {
    //   sessionStorage.setItem(
    //     "newNotificationCount",
    //     Number(sessionStorage.getItem("newNotificationCount")) + 1
    //   );
    // }
    this.setState(
      {
        activeOrders: RankActiveOrders([
          { ...newOrder },
          ...this.state.activeOrders,
        ]),
        // newNotificationCount: sessionStorage.getItem("newNotificationCount"),
      },
      () => this.newOrderAlert(newOrder, audio)
    );
  };
  render() {
    return (
      <MerchantInterfaceProvider
        value={{
          inbox: this.state.inbox,
          sentEmails: this.state.sentEmails,
          activeOrders: this.state.activeOrders,
          pastOrders: this.state.pastOrders,
          onAcceptOrder: this.onAcceptOrder,
          onCompleteOrder: this.onCompleteOrder,
          getAllEmails: this.getAllEmails,
          newEmailCount: this.state.newEmailCount,
          resetNewEmailCount: this.resetNewEmailCount,

          // newNotificationCount: this.state.newNotificationCount,
          // resetNotificationCount: this.resetNotificationCount,
        }}
      >
        <Router basename={"/empire-steakhouse"}>
          <Preloader />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/accordions" component={Accordions} />
            <Route path="/checkin" component={CheckIn} />
            <Route path="/add-product" component={Addproduct} />
            <Route path="/alerts" component={Alerts} />
            <Route path="/animations" component={Animations} />
            <Route path="/badges" component={Badges} />
            <Route path="/basic-tables" component={Basictables} />
            <Route path="/breadcrumbs" component={Breadcrumbs} />
            <Route path="/buttons" component={Buttons} />
            <Route path="/cards" component={Cards} />
            <Route path="/chartjs" component={Chartjs} />
            <Route path="/chat" component={Chat} />
            <Route path="/cropper" component={Cropper} />
            <Route path="/customer-list" component={Customerlist} />
            <Route path="/customer-review" component={Customerreview} />
            <Route path="/data-tables" component={Datatables} />
            <Route path="/draggables" component={Draggables} />
            <Route path="/email" component={Email} />
            <Route path="/flaticons" component={Flaticons} />
            <Route path="/fontawesome" component={Fontawesome} />
            <Route path="/form-elements" component={Formelements} />
            <Route path="/form-layouts" component={Formlayouts} />
            <Route path="/form-validation" component={Formvalidation} />
            <Route path="/form-wizard" component={Formwizard} />
            <Route path="/google-maps" component={Googlemaps} />
            <Route path="/invoice-detail" component={Invoicedetail} />
            <Route path="/invoice-list" component={Invoicelist} />
            <Route path="/materialize" component={Materialize} />
            <Route path="/menu-catalogue" component={Menucatalogue} />
            <Route path="/menu-grid" component={Menugrid} />
            <Route path="/menu-list" component={Menulist} />
            <Route path="/modals" component={Modals} />
            <Route path="/google-chart" component={Googlechart} />
            <Route path="/live-orders" component={LiveOrders} />
            <Route path="/past-orders" component={PastOrders} />
            <Route path="/pagination" component={Pagination} />
            <Route path="/preloaders" component={Preloaders} />
            <Route path="/product-detail" component={Productdetail} />
            <Route path="/progress-bars" component={Progressbars} />
            <Route path="/range-slider" component={Rangeslider} />
            <Route path="/rating" component={Rating} />
            <Route path="/restaurant-list" component={Restaurantlist} />
            <Route path="/sales" component={Sales} />
            <Route path="/sliders" component={Sliders} />
            <Route path="/social-activity" component={Socialactivity} />
            <Route path="/sweet-alerts" component={Sweetalerts} />
            <Route path="/tabs" component={Tabs} />
            <Route path="/toast" component={Toast} />
            <Route path="/todo-list" component={Todolist} />
            <Route path="/tour" component={Tour} />
            <Route path="/typography" component={Typography} />
            <Route path="/vector-maps" component={Vectormaps} />
            <Route path="/widgets" component={Widgets} />
            <Route path="/client-management" component={Clientmanagement} />
            <Route path="/coming-soon" component={Comingsoon} />
            <Route path="/login" component={Defaultlogin} />
            <Route path="/register" component={Defaultregister} />
            <Route path="/error" component={Error} />
            <Route path="/faq" component={Faq} />
            <Route path="/invoice" component={Invoice} />
            <Route path="/lock-screen" component={Lockscreen} />
            <Route path="/modal-login" component={Modallogin} />
            <Route path="/modal-register" component={Modalregister} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/stock-management" component={Stockmanagement} />
            <Route path="/user-profile" component={Userprofile} />
            <Route path="/web-analytics" component={Webanalytics} />
          </Switch>
        </Router>
      </MerchantInterfaceProvider>
    );
  }
}

export default App;
