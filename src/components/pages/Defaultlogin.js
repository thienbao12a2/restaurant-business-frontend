import React from "react";
// import Sidenavigation from "../layouts/Sidenavigation";
// import Topnavigation from "../layouts/Topnavigation";
import Content from "../sections/Defaultlogin/Content";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class Defaultlogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", msg: "" };
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
  componentDidMount() {
    const logout = localStorage.getItem("logout");
    if (logout === "true") {
      this.toastsuccess();
      localStorage.removeItem("logout");
    }
  }
  toastsuccess = () => {
    toastr.remove();
    toastr.options.positionClass = "toast-top-right";
    toastr.success("Successfully Logged Out", "Alert");
  };

  loginUser = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/my-restaurant/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    const data = await response.json();
    if (data.userToken) {
      localStorage.setItem("token", data.userToken);
      localStorage.setItem("userData", data.user);
      localStorage.setItem("login", "true");
      window.location.href = "/live-orders";
    } else {
      this.setState({ msg: data.error });
    }
  };
  render() {
    return (
      <div className="ms-body ms-primary-theme ms-logged-out">
        {/* <Sidenavigation /> */}
        <main className="body-content">
          {/* <Topnavigation /> */}
          <Content
            setEmail={(email) => this.setState({ email })}
            setPassword={(password) => this.setState({ password })}
            loginUser={this.loginUser}
            msg={this.state.msg}
          />
        </main>
      </div>
    );
  }
}

export default Defaultlogin;
