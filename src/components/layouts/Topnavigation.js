import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { Dropdown, NavLink } from "react-bootstrap";
import Scrollbar from "react-perfect-scrollbar";
import { Services, Functions, Constants } from "../../lib";
import "react-perfect-scrollbar/dist/css/styles.css";
import profile_pic from "../../assets/img/costic/profile_pic.png";
import { io } from "socket.io-client";
import {
  MerchantInterfaceConsumer,
  withContext,
} from "../../context/MerchantInterfaceContext";

class Topnavigation extends Component {
  constructor(props) {
    super(props);
    this.socket = io(Services.SOCKET_IO_URL, {
      extraHeaders: {
        "ngrok-skip-browser-warning": true,
      },
      transports: ["polling"],
    });
    this.state = {
      name: "",
      newEmailCount: this.props.context.newEmailCount,
    };
  }

  //   addsidenavigation = () => {
  //     $(".ms-body").toggleClass("ms-aside-left-open");
  //     $("#ms-side-nav").toggleClass("ms-aside-open");
  //     $(".ms-aside-overlay.ms-overlay-left").toggleClass("d-block");
  //   };
  //   topbaropen = () => {
  //     $("#ms-nav-options").toggleClass("ms-slide-down");
  //   };
  componentDidMount() {
    // this.socket.connect();
    const userName = localStorage.getItem("userData");
    // this.onCheckUpdatesFromSocket();
    // const newEmailCount = sessionStorage.getItem("newEmailCount");
    this.setState({ name: userName });
  }
  // componentWillUnmount() {
  //   this.socket.off("increment-email-count", this.onCheckEmailCount); //Topnavigation component is not shared between pages but rather reused between pages. So If we go to new page, it will unmount Topnavigation and immediately re-mount it because It is reused in different pages.
  // }
  // onCheckUpdatesFromSocket = () => {
  //   this.socket.on("increment-email-count", this.onCheckEmailCount);
  // };
  // onCheckEmailCount = (updatedInbox) => {
  //   if (!sessionStorage.getItem("newEmailCount")) {
  //     sessionStorage.setItem("newEmailCount", 1);
  //   } else {
  //     sessionStorage.setItem(
  //       "newEmailCount",
  //       Number(sessionStorage.getItem("newEmailCount")) + 1
  //     );
  //   }
  //   this.setState({ newEmailCount: sessionStorage.getItem("newEmailCount") });
  // };
  logoutUser = () => {
    localStorage.removeItem("activeOrders");
    localStorage.removeItem("token");
    localStorage.setItem("logout", "true");
    this.props.history.push("/login");
  };
  // onClickUserMenu = () => {
  //   const newEmailCount = sessionStorage.getItem("newEmailCount");
  //   this.setState({ newEmailCount });
  // };
  // resetNewEmailCount = () => {
  //   sessionStorage.removeItem("newEmailCount");
  //   console.log(1);
  // };
  render() {
    const { name } = this.state;
    const { context } = this.props;
    const {
      newEmailCount,
      newNotificationCount,
      resetNewEmailCount,
      resetNotificationCount,
      inbox,
      activeOrders,
    } = context;
    return (
      <nav className="navbar ms-navbar">
        <div
          className="ms-aside-toggler ms-toggler pl-0"
          //   onClick={this.addsidenavigation}
        >
          {/* <span className="ms-toggler-bar bg-primary" />
          <span className="ms-toggler-bar bg-primary" />
          <span className="ms-toggler-bar bg-primary" /> */}
        </div>
        <div className="logo-sn logo-sm ms-d-block-sm">
          <Link className="pl-0 ml-0 text-center navbar-brand mr-0" to="/">
            <img src={profile_pic} alt="logo" />{" "}
          </Link>
        </div>
        <ul className="ms-nav-list ms-inline mb-0" id="ms-nav-options">
          <li className="ms-nav-item ms-search-form pb-0 py-0">
            <form className="ms-form" method="post">
              <div className="ms-form-group my-0 mb-0 has-icon fs-14">
                <input
                  type="search"
                  className="ms-form-input"
                  name="search"
                  placeholder="Search here..."
                />{" "}
                <i className="flaticon-search text-disabled" />
              </div>
            </form>
          </li>
          {/* <li className="ms-nav-item dropdown">
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                as={NavLink}
                className="text-disabled ms-has-notification p-0"
              >
                <i className="flaticon-mail" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="mailDropdown"
              >
                <div className="dropdown-menu-header">
                  <h6 className="dropdown-header ms-inline m-0">
                    <span className="text-disabled">Mail</span>
                  </h6>
                  <span className="badge badge-pill badge-success">3 New</span>
                </div>
                <div className="dropdown-divider" />
                <Scrollbar className="ms-scrollable ms-dropdown-list">
                  <Link className="media p-2" to="#">
                    <div className="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
                      <img
                        src="assets/img/costic/customer-3.jpg"
                        className="ms-img-round"
                        alt="people"
                      />
                    </div>
                    <div className="media-body">
                      {" "}
                      <span>Hey man, looking forward to your new project.</span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 30 seconds
                        ago
                      </p>
                    </div>
                  </Link>
                  <Link className="media p-2" to="#">
                    <div className="ms-chat-status ms-status-online ms-chat-img mr-2 align-self-center">
                      <img
                        src="assets/img/costic/customer-2.jpg"
                        className="ms-img-round"
                        alt="people"
                      />
                    </div>
                    <div className="media-body">
                      {" "}
                      <span>
                        Dear John, I was told you bought Costic! Send me your
                        feedback
                      </span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 28 minutes
                        ago
                      </p>
                    </div>
                  </Link>
                  <Link className="media p-2" to="#">
                    <div className="ms-chat-status ms-status-offline ms-chat-img mr-2 align-self-center">
                      <img
                        src="assets/img/costic/customer-1.jpg"
                        className="ms-img-round"
                        alt="people"
                      />
                    </div>
                    <div className="media-body">
                      {" "}
                      <span>
                        How many people are we inviting to the dashboard?
                      </span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 6 hours
                        ago
                      </p>
                    </div>
                  </Link>
                </Scrollbar>
                <div className="dropdown-divider" />
                <div className="dropdown-menu-footer text-center">
                  {" "}
                  <Link to="/email">Go to Inbox</Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li> */}
          {/* <li className="ms-nav-item dropdown">
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle
                as={NavLink}
                className="text-disabled ms-has-notification p-0"
              >
                <i className="flaticon-bell" />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="notificationDropdown"
              >
                <div className="dropdown-menu-header">
                  <h6 className="dropdown-header ms-inline m-0">
                    <span className="text-disabled">Notifications</span>
                  </h6>
                  <span className="badge badge-pill badge-info">
                    {newNotificationCount ? `${newNotificationCount} New` : ""}
                  </span>
                </div>
                <div className="dropdown-divider" />
                <Scrollbar className="ms-scrollable ms-dropdown-list">
                  <Link className="media p-2" to="#">
                    <div className="media-body">
                      {" "}
                      <span>12 ways to improve your crypto dashboard</span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 30 seconds
                        ago
                      </p>
                    </div>
                  </Link>
                  <Link className="media p-2" to="#">
                    <div className="media-body">
                      {" "}
                      <span>You have newly registered users</span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 45 minutes
                        ago
                      </p>
                    </div>
                  </Link>
                  <Link className="media p-2" to="#">
                    <div className="media-body">
                      {" "}
                      <span>
                        Your account was logged in from an unauthorized IP
                      </span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 2 hours
                        ago
                      </p>
                    </div>
                  </Link>
                  <Link className="media p-2" to="#">
                    <div className="media-body">
                      {" "}
                      <span>An application form has been submitted</span>
                      <p className="fs-10 my-1 text-disabled">
                        <i className="material-icons">access_time</i> 1 day ago
                      </p>
                    </div>
                  </Link>
                </Scrollbar>
                <div className="dropdown-divider" />
                <div className="dropdown-menu-footer text-center">
                  {" "}
                  <Link to="#">View all Notifications</Link>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li> */}
          <li
            className="ms-nav-item ms-nav-user dropdown"
            // onClick={this.onClickUserMenu}
          >
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle as={NavLink} id="userDropdown" className="p-0">
                <img
                  className="ms-user-img ms-img-round"
                  src={profile_pic}
                  alt="user"
                />
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-right user-dropdown"
                aria-labelledby="userDropdown"
              >
                <div className="dropdown-menu-header">
                  <h6 className="dropdown-header ms-inline m-0">
                    <span className="text-disabled">{`Welcome, ${name}`}</span>
                  </h6>
                </div>
                <div className="dropdown-divider" />
                <div className="ms-dropdown-list">
                  {/* <Link className="media fs-14 p-2" to="/user-profile">
                    {" "}
                    <span>
                      <i className="flaticon-user mr-2" /> Profile
                    </span>
                  </Link> */}
                  <Link
                    className="media fs-14 p-2"
                    to="/email"
                    onClick={resetNewEmailCount}
                  >
                    {" "}
                    <span>
                      <i className="flaticon-mail mr-2" /> Inbox
                    </span>{" "}
                    <span className="badge badge-pill badge-info">
                      {newEmailCount}
                    </span>
                  </Link>
                  {/* <Link className="media fs-14 p-2" to="/user-profile">
                    {" "}
                    <span>
                      <i className="flaticon-gear mr-2" /> Account Settings
                    </span>
                  </Link> */}
                </div>
                <div className="dropdown-divider" />
                <div className="dropdown-menu-footer">
                  <Link className="media fs-14 p-2" to="/lock-screen">
                    {" "}
                    <span>
                      <i className="flaticon-security mr-2" /> Lock
                    </span>
                  </Link>
                </div>
                <div className="dropdown-menu-footer">
                  <button
                    className="media fs-14 p-2 border-0 "
                    onClick={this.logoutUser}
                  >
                    {" "}
                    <span>
                      <i className="flaticon-shut-down mr-2" /> Logout
                    </span>
                  </button>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        {/* <div
          className="ms-toggler ms-d-block-sm pr-0 ms-nav-toggler"
          onClick={this.topbaropen}
        >
          <span className="ms-toggler-bar bg-primary" />
          <span className="ms-toggler-bar bg-primary" />
          <span className="ms-toggler-bar bg-primary" />
        </div> */}
      </nav>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(
  withRouter(Topnavigation)
);
