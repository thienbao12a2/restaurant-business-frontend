import React, { Component } from "react";
import { Link } from "react-router-dom";
import Scrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Dropdown, NavLink } from "react-bootstrap";
import $ from "jquery";
import { io } from "socket.io-client";
import jwt from "jsonwebtoken";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Services, Functions, Constants } from "../../../lib";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";
import { Collapse } from "react-collapse";
import { Oval } from "react-loader-spinner";
import EmailModal from "./EmailModal";
import {
  MerchantInterfaceConsumer,
  withContext,
} from "../../../context/MerchantInterfaceContext";
// import OrderDetails from "../Orders/OrderDetails";
import moment from "moment-timezone";

class Content extends Component {
  constructor(props) {
    super(props);
    // this.socket = io(Services.SOCKET_IO_URL, {
    //   extraHeaders: {
    //     "ngrok-skip-browser-warning": true,
    //   },
    //   transports: ["polling"],
    // });
    this.state = {
      inbox: [],
      sentEmails: [],
      loading: false,
      showModal: false,
      selectedItem: {},
      composeEmail: false,
      switchToSentMail: false,
    };
  }

  // addpinned = (e) => {
  //   var elem = e.target,
  //     parentTask = elem.closest(".ms-email");
  //   $(parentTask).toggleClass("pinned");
  // };
  componentDidMount() {
    // function emailCheckAll() {
    //   $(".ms-email-check-all").on("click", function () {
    //     $(".ms-email input").not(this).prop("checked", this.checked);
    //   });
    // }
    // emailCheckAll();
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
        // this.getAllEmails();
        // this.onCheckUpdatesFromSocket();
        // this.startServices();
        // this.onCheckUpdatesFromSocket();
        // this.socket.on("connect", () => {
        //   const transport = this.socket.io.engine.transport.name; // in most cases, "polling"
        //   console.log("transport", transport);

        //   this.socket.io.engine.on("upgrade", () => {
        //     const upgradedTransport = this.socket.io.engine.transport.name; // in most cases, "websocket"
        //     console.log("web", upgradedTransport);
        //   });
        // });
      }
    } else {
      localStorage.removeItem("token");
      this.props.history.push("/login");
    }
  }

  checkUnreadEmail(index) {
    const { onReadEmail } = Functions;
    const { context } = this.props;
    const { inbox } = context;
    const newCheckUnreadEmail = [...inbox];
    if (newCheckUnreadEmail[index].read) return;
    newCheckUnreadEmail[index].read = true;
    onReadEmail(newCheckUnreadEmail[index]);
  }
  expandEmail(index, type) {
    if (type === "Inbox") {
      const { context } = this.props;
      const { inbox } = context;
      console.log("expandEmail", inbox);
      this.checkUnreadEmail(index);
      const newShowExpandEmail = [...inbox];
      console.log(newShowExpandEmail);
      newShowExpandEmail[index].showExpandEmail =
        !newShowExpandEmail[index].showExpandEmail;
      this.setState({
        composeEmail: false,
      });
    } else if (type === "Sent Email") {
      const { context } = this.props;
      const { sentEmails } = context;
      const newShowExpandEmail = [...sentEmails];
      newShowExpandEmail[index].showExpandEmail =
        !newShowExpandEmail[index].showExpandEmail;
      this.setState({
        composeEmail: false,
      });
    }
  }
  onComposeEmail = () => {
    this.setState({ composeEmail: true, showModal: true });
  };
  // onReadEmail = async (newCheckUnreadEmail) => {
  //   const response = await axios.post(
  //     "https://6505-2600-1700-5cac-3d30-f864-cbeb-fcb3-271b.ngrok.io/api/v1/my-restaurant/readEmail",
  //     {
  //       headers: { "ngrok-skip-browser-warning": true },
  //       newCheckUnreadEmail,
  //     }
  //   );
  // };
  // renderSubmittedTime = (email) => {
  //   const { DATE_FORMAT, DEFAULT_TIMEZONE, TIME_FORMAT } = Constants;
  //   const { timeStamp } = email;
  //   const submittedDate = formatToTimeZone(timeStamp, DATE_FORMAT, {
  //     timeZone: DEFAULT_TIMEZONE,
  //   });
  //   const submittedTime = formatToTimeZone(timeStamp, TIME_FORMAT, {
  //     timeZone: DEFAULT_TIMEZONE,
  //   });
  //   return `${submittedDate} ${submittedTime}`;
  // };
  // onCheckUpdatesFromSocket = () => {
  //   this.socket.on("add-email-to-inbox", this.onAddNewEmail);
  // };
  // onAddNewEmail = (updatedInbox) => {
  //   this.setState({
  //     inbox: [{ ...updatedInbox }, ...this.state.inbox],
  //   });
  // };
  // getAllEmails = async (refresh) => {
  //   const { RankEmail } = Functions;
  //   if (refresh) this.setState({ loading: true });
  //   const response = await axios.get(
  //     "http://127.0.0.1:8000/api/v1/my-restaurant/email"
  //   );

  //   const { data } = response;
  //   if (refresh) {
  //     setTimeout(
  //       () =>
  //         this.setState({ loading: false }, () =>
  //           this.setState({
  //             inbox: RankEmail(data.data.emails),
  //             sentEmails: RankEmail(data.data.sentEmails),
  //           })
  //         ),
  //       2000
  //     );
  //   } else {
  //     this.setState({
  //       inbox: RankEmail(data.data.emails),
  //       sentEmails: RankEmail(data.data.sentEmails),
  //     });
  //   }
  // };

  renderEmail(type) {
    const { renderSubmittedTime } = Functions;
    if (type === "Inbox") {
      // const { inbox } = this.state;
      const { context } = this.props;
      const { inbox } = context;
      console.log("inbox", inbox);
      return inbox.map((item, index) => {
        return (
          <li
            className="media ms-email clearfix"
            key={index}
            onClick={() => this.expandEmail(index, type)}
          >
            <div className="media-body ms-email-details">
              {" "}
              <span className="ms-email-sender">Customer: {item.name}</span>
              <span className="ms-email-email">
                Phone Number: {item.phone_number}
              </span>
              <span className="ms-email-email">Email: {item.email}</span>
              <h6 className="ms-email-subject">
                Event: {item.event_type}
              </h6>{" "}
              <span className="ms-email-unread">
                {item.read ? "Read" : "Unread"}
              </span>
              <span className="ms-email-time">
                Received at: {renderSubmittedTime(item)}
              </span>
              {!item.showExpandEmail && (
                <span className="ms-click-to-read">Click to read messages</span>
              )}
              <Collapse
                isOpened={item.showExpandEmail}
                className="ReactCollapse--collapse"
              >
                <p className="ms-email-msg">{item.message}</p>
                <div className="text-right">
                  {" "}
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() =>
                      this.setState({ showModal: true, selectedItem: item })
                    }
                  >
                    Reply
                  </button>
                </div>
              </Collapse>
            </div>
          </li>
        );
      });
    } else if (type === "Sent Email") {
      // const { sentEmails } = this.state;
      const { context } = this.props;
      const { sentEmails } = context;
      return sentEmails.map((item, index) => {
        return (
          <li
            className="media ms-email clearfix"
            key={index}
            onClick={() => this.expandEmail(index, type)}
          >
            <div className="media-body ms-email-details">
              {" "}
              <span className="ms-email-sender">To: {item.email}</span>
              <h6 className="ms-email-subject">Subject: {item.subject}</h6>{" "}
              <span className="ms-email-time">
                Sent at: {renderSubmittedTime(item)}
              </span>
              {!item.showExpandEmail && (
                <span className="ms-click-to-read">Click to read messages</span>
              )}
              <Collapse
                isOpened={item.showExpandEmail}
                className="ReactCollapse--collapse"
              >
                <p className="ms-email-msg">{item.message}</p>
              </Collapse>
            </div>
          </li>
        );
      });
    }
  }
  calculateUnreadMessages() {
    const { context } = this.props;
    const { inbox } = context;
    return inbox.reduce(
      (partialSum, item) => (!item.read ? partialSum + 1 : partialSum),
      0
    );
  }
  getAllEmails = async (refresh) => {
    const { RankEmail } = Functions;
    if (refresh) this.setState({ loading: true });
    const response = await axios.get(
      "http://127.0.0.1:8000/api/v1/my-restaurant/email"
    );
    const { data } = response;
    if (refresh) {
      setTimeout(
        () =>
          this.setState({ loading: false }, () =>
            this.setState({
              inbox: RankEmail(data.data.emails),
              sentEmails: RankEmail(data.data.sentEmails),
            })
          ),
        2000
      );
    } else {
      this.setState({
        inbox: RankEmail(data.data.emails),
        sentEmails: RankEmail(data.data.sentEmails),
      });
    }
  };
  onRefresh(refresh) {
    const { context } = this.props;
    const { getAllEmails } = context;
    if (refresh) {
      this.setState({ loading: true });
      setTimeout(() => getAllEmails(), 2000);
      setTimeout(() => this.setState({ loading: false }), 2000);
    } else {
      getAllEmails();
    }
  }
  renderInbox() {
    const { loading } = this.state;

    return (
      <div className="ms-email-main">
        <div className="ms-email-header">
          <div className="ms-panel-inbox">
            <h6>Inbox</h6>
            <p>{`You have ${this.calculateUnreadMessages()} Unread Messages`}</p>
          </div>
          <ul className="ms-email-options">
            <li>
              {loading ? (
                <Oval
                  height={15}
                  width={15}
                  color="gray"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="gray"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                <button
                  className="text-disabled refresh-btn"
                  onClick={() => this.onRefresh(true)}
                >
                  {" "}
                  <i className="material-icons">refresh</i> Refresh
                </button>
              )}
            </li>
          </ul>
        </div>
        {/* Email Content */}
        <div className="ms-email-content">
          <Scrollbar className="ms-scrollable">
            <ul>{this.renderEmail("Inbox")}</ul>
          </Scrollbar>
        </div>
      </div>
    );
  }
  renderSentEMail() {
    const {
      // inbox,
      loading,
      showModal,
      selectedItem,
      composeEmail,
      // sentEmails,
    } = this.state;

    return (
      <div className="ms-email-main">
        <div className="ms-email-header">
          <div className="ms-panel-inbox">
            <h6>Sent Mail</h6>
          </div>
          <ul className="ms-email-options">
            <li>
              {loading ? (
                <Oval
                  height={15}
                  width={15}
                  color="gray"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="gray"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
              ) : (
                <button
                  className="text-disabled refresh-btn"
                  onClick={() => this.getAllEmails(true)}
                >
                  {" "}
                  <i className="material-icons">refresh</i> Refresh
                </button>
              )}
            </li>
          </ul>
        </div>
        {/* Email Content */}
        <div className="ms-email-content">
          <Scrollbar className="ms-scrollable">
            <ul>{this.renderEmail("Sent Email")}</ul>
          </Scrollbar>
        </div>
      </div>
    );
  }
  render() {
    const {
      // inbox,
      loading,
      showModal,
      selectedItem,
      composeEmail,
      switchToSentMail,
      // sentEmails,
    } = this.state;
    const { context } = this.props;
    const { inbox, sentEmails } = context;
    return (
      <div className="ms-content-wrapper">
        <div className="ms-panel ms-email-panel">
          <div className="ms-panel-body p-0">
            <div className="ms-email-aside">
              <button
                onClick={this.onComposeEmail}
                className="btn btn-primary w-100 mt-0 has-icon"
              >
                {" "}
                <i className="flaticon-pencil" />
                Compose Email
              </button>
              <ul className="ms-list ms-email-list">
                <li className="ms-list-item ms-email-label">Main</li>
                <li
                  className={`ms-list-item ${
                    !switchToSentMail ? "ms-active-email" : ""
                  }`}
                >
                  <Link
                    to="#"
                    onClick={() =>
                      this.setState({
                        switchToSentMail: false,
                      })
                    }
                  >
                    {" "}
                    <i className="material-icons ">mail</i> Inbox{" "}
                    <span>{inbox.length}</span>
                  </Link>
                </li>

                <li
                  className={`ms-list-item ${
                    !switchToSentMail ? "" : "ms-active-email"
                  }`}
                >
                  <Link
                    to="#"
                    onClick={() =>
                      this.setState({
                        switchToSentMail: true,
                      })
                    }
                  >
                    {" "}
                    <i className="material-icons">send </i> Sent{" "}
                    <span>{sentEmails.length}</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Email Main */}
            {switchToSentMail ? this.renderSentEMail() : this.renderInbox()}
          </div>
        </div>
        {showModal && (
          <EmailModal
            showModal={showModal}
            setShowModal={(open) => this.setState({ showModal: open })}
            selectedItem={selectedItem}
            composeEmail={composeEmail}
          />
        )}
      </div>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(withRouter(Content));
