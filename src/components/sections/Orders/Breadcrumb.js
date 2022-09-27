import React, { Component } from "react";
import { Link } from "react-router-dom";

class Breadcrumb extends Component {
  render() {
    const { page } = this.props;
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb pl-0">
          {/* <li className="breadcrumb-item">
            <Link to="#">
              <i className="material-icons">home</i> Home
            </Link>
          </li> */}
          <li className="breadcrumb-item active page-name" aria-current="page">
            {page}
          </li>
        </ol>
      </nav>
    );
  }
}

export default Breadcrumb;
