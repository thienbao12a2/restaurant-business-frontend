import React, { Component } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

class Detailcontent extends Component {
  calculateTotal() {
    const { item } = this.props;
    const { orderDetails } = item;
    const total = orderDetails.items.reduce(
      (partialSum, item) => partialSum + item.price * item.quantity,
      0
    );
    return total;
  }
  renderItem() {
    const { item } = this.props;
    const { orderDetails } = item;
    return orderDetails.items.map((item, index) => {
      return (
        <tr key={index}>
          <td className="text-center">{index + 1}</td>
          <td className="text-left order-text">{item.item_name}</td>
          <td className="order-text">{item.quantity}</td>
          <td className="order-text">${item.price}</td>
          <td className="order-text">${item.price * item.quantity}</td>
        </tr>
      );
    });
  }
  formatPhoneNumber() {
    const { item } = this.props;
    const { orderDetails } = item;
    const { phone_number } = orderDetails;
    const areaCode = phone_number.slice(0, 3);
    const midNumber = phone_number.slice(3, 6);
    const lastNumber = phone_number.slice(6);
    const formattedPhoneNubmer = `(${areaCode}) ${midNumber}-${lastNumber}`;
    return formattedPhoneNubmer;
  }
  render() {
    const { item, renderSubmittedTime } = this.props;
    const { orderDetails } = item;

    return (
      <div>
        <div className="row">
          <div className="col-md-12 px-0 py-0">
            <div className="ms-panel no-margin">
              <div className="ms-panel-header header-mini">
                <div className="d-flex justify-content-between">
                  <h6>Order Details</h6>
                  <h6>#{orderDetails.orderID}</h6>
                </div>
              </div>
              <div className="ms-panel-body">
                {/* Invoice To */}
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="invoice-address">
                      <h3>Customer Info </h3>
                      <h5>{orderDetails.name}</h5>
                      <p className="order-text">{this.formatPhoneNumber()}</p>
                    </div>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <ul className="invoice-date">
                      <li className="order-text">
                        Ordered At : {renderSubmittedTime(orderDetails)}
                      </li>
                      <li className="order-text">Pickup: 20 minutes</li>
                    </ul>
                  </div>
                </div>
                {/* Invoice Table */}
                <div className="ms-invoice-table table-responsive mt-5">
                  <table className="table table-hover text-right thead-light">
                    <thead>
                      <tr className="text-capitalize">
                        <th className="text-center w-5">id</th>
                        <th className="text-left">description</th>
                        <th>qty</th>
                        <th>Unit Price</th>
                        <th>sub total</th>
                      </tr>
                    </thead>
                    <tbody>{this.renderItem()}</tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={4} className="total-cost order-text">
                          Total:
                        </td>
                        <td className="order-text">
                          ${this.calculateTotal().toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="invoice-buttons text-right">
                  {" "}
                  <Link to="#" className="btn btn-primary mr-2 order-text">
                    Print Bill
                  </Link>
                  {/* <Link to="#" className="btn btn-primary">
                    Send Invoice
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detailcontent;
