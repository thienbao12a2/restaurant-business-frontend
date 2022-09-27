import React, { Component } from "react";
import { Functions, Constants } from "../../../lib";
import { Collapse } from "react-collapse";
import OrderDetails from "./OrderDetails";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

class Ordertable extends Component {
  constructor(props) {
    super(props);
    this.state = { orderView: this.props.activeOrders };
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState({
      orderView: nextProps.activeOrders,
    });
  }
  renderTableHead() {
    const tableHead = [
      "Order ID",
      "Received At",
      "Customer Name",
      "Order Status",
      "Price",
      "",
      "",
    ];
    return tableHead.map((key, index) => {
      return (
        <th scope="col" key={index} className="table-head">
          {key}
        </th>
      );
    });
  }
  expandOrder(index) {
    const newShowExpandOrder = [...this.state.orderView];
    newShowExpandOrder[index].showExpandOrder =
      !newShowExpandOrder[index].showExpandOrder;
    this.setState({ orderView: newShowExpandOrder });
  }
  renderSubmittedTime = (orderDetails) => {
    const { DATE_FORMAT, DEFAULT_TIMEZONE, TIME_FORMAT } = Constants;
    const { timeStamp } = orderDetails;
    const submittedDate = formatToTimeZone(timeStamp, DATE_FORMAT, {
      timeZone: DEFAULT_TIMEZONE,
    });
    const submittedTime = formatToTimeZone(timeStamp, TIME_FORMAT, {
      timeZone: DEFAULT_TIMEZONE,
    });
    return `${submittedDate} ${submittedTime}`;
  };
  renderLiveOrders() {
    const { calculateOrderTotal } = Functions;
    const { orderView } = this.state;
    const { changeOrderStatus } = this.props;
    return orderView.map((item, index) => {
      const { orderDetails } = item;
      return (
        <React.Fragment key={index}>
          <tr>
            <th scope="row">#{orderDetails.orderID}</th>
            <td className="order-style">
              {this.renderSubmittedTime(orderDetails)}
            </td>
            <td className="order-style">{orderDetails.name}</td>
            <td>
              <span
                className={`badge ${
                  orderDetails.orderStatus === "Pending"
                    ? "badge-primary"
                    : "badge-success"
                }`}
              >
                {orderDetails.orderStatus}
              </span>
            </td>
            <td className="order-style">{`$${calculateOrderTotal(
              orderDetails.items
            ).toFixed(2)}`}</td>
            <td className="text-center align-middle w-5">
              <button
                className="btn btn-state btn-primary align-middle my-0 mr-3 order-text"
                onClick={() => this.expandOrder(index)}
              >
                <i
                  className={`fas ${
                    item.showExpandOrder ? "fa-minus" : "fa-plus"
                  }`}
                />
                Details
              </button>
              {orderDetails.orderStatus === "Pending" ? (
                <button
                  className={`btn btn-statel btn-success my-0 align-middle order-text`}
                  onClick={() => changeOrderStatus(orderDetails)}
                >
                  <i className="fas fa-check" />
                  Accept
                </button>
              ) : (
                <button
                  className={`btn btn-state btn-secondary my-0 align-middle order-text`}
                  onClick={() => changeOrderStatus(orderDetails)}
                >
                  <i className="fas fa-thumbs-up" />
                  Complete
                </button>
              )}
            </td>
          </tr>

          <tr className="order-details">
            <td colSpan="6" className="py-0">
              <Collapse
                isOpened={item.showExpandOrder}
                className="ReactCollapse--collapse"
              >
                <OrderDetails
                  item={item}
                  renderSubmittedTime={this.renderSubmittedTime}
                />
              </Collapse>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  }
  render() {
    const { orderView } = this.state;
    return (
      <div className="col-12">
        <div className="ms-panel">
          <div className="ms-panel-header">
            <h6>Order List</h6>
          </div>
          <div className="ms-panel-body">
            <div className="table-responsive">
              <table className="table table-hover thead-primary">
                <thead>
                  <tr>{orderView.length > 0 && this.renderTableHead()}</tr>
                </thead>
                <tbody>{orderView.length > 0 && this.renderLiveOrders()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ordertable;
