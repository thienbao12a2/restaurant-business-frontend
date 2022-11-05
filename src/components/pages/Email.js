import React, { Component } from "react";
import Sidenavigation from "../layouts/Sidenavigation";
import Topnavigation from "../layouts/Topnavigation";
import Content from "../sections/Email/Content";

class Email extends Component {
  render() {
    return (
      <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
        <Sidenavigation />
        <main className="body-content">
          <Topnavigation />
          <Content />
        </main>
      </div>
    );
  }
}

export default Email;
