import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Dropdown, NavLink } from "react-bootstrap";
import { Services } from "../../lib";
import "react-perfect-scrollbar/dist/css/styles.css";
import profile_pic from "../../assets/img/general/profile_pic.png";
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
  componentDidMount() {
    const userName = localStorage.getItem("userData");
    this.setState({ name: userName });
  }
  logoutUser = () => {
    localStorage.removeItem("activeOrders");
    localStorage.removeItem("token");
    localStorage.setItem("logout", "true");
    this.props.history.push("/login");
  };

  render() {
    const { name } = this.state;
    const { context } = this.props;
    const { newEmailCount, resetNewEmailCount } = context;
    return (
      <nav className="navbar ms-navbar">
        <div className="ms-aside-toggler ms-toggler pl-0"></div>
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

          <li className="ms-nav-item ms-nav-user dropdown">
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
                </div>
                <div className="dropdown-divider" />
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
      </nav>
    );
  }
}

export default withContext(MerchantInterfaceConsumer)(
  withRouter(Topnavigation)
);
