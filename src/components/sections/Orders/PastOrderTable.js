import React, { Component } from "react";
import { Functions, Constants } from "../../../lib";
import { Collapse } from "react-collapse";
import OrderDetails from "./OrderDetails";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

class PastOrderTable extends Component {
  constructor(props) {
    super(props);
    this.state = { pastOrderView: this.props.pastOrders };
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState({
      pastOrderView: nextProps.pastOrders,
    });
  }
  renderTableHead() {
    const tableHead = [
      "Order ID",
      "Completed At",
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
    const newShowExpandOrder = [...this.state.pastOrderView];
    newShowExpandOrder[index].showExpandOrder =
      !newShowExpandOrder[index].showExpandOrder;
    this.setState({ pastOrderView: newShowExpandOrder });
  }
  renderSubmittedTime = (orderDetails, completedTime) => {
    const { DATE_FORMAT, DEFAULT_TIMEZONE, TIME_FORMAT } = Constants;
    const { timeStamp, completeTimeStamp } = orderDetails;
    const submittedDate = formatToTimeZone(
      completedTime ? completeTimeStamp : timeStamp,
      DATE_FORMAT,
      {
        timeZone: DEFAULT_TIMEZONE,
      }
    );
    const submittedTime = formatToTimeZone(
      completedTime ? completeTimeStamp : timeStamp,
      TIME_FORMAT,
      {
        timeZone: DEFAULT_TIMEZONE,
      }
    );
    return `${submittedDate} ${submittedTime}`;
  };

  renderPastOrders() {
    const { calculateOrderTotal } = Functions;
    const { pastOrderView } = this.state;
    // const { onAcceptOrder, onCompleteOrder } = this.props;
    return pastOrderView.map((item, index) => {
      const { orderDetails } = item;
      return (
        <React.Fragment key={index}>
          <tr>
            <th scope="row">#{orderDetails.orderID}</th>
            <td className="order-style">
              {this.renderSubmittedTime(orderDetails, true)}
            </td>
            <td className="order-style">{orderDetails.name}</td>
            <td>
              <span className="badge btn-light">
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
              {/* {orderDetails.orderStatus === "Pending" ? (
                <button
                  className={`btn btn-statel btn-success my-0 align-middle order-text`}
                  onClick={() => onAcceptOrder(orderDetails)}
                >
                  <i className="fas fa-check" />
                  Accept
                </button>
              ) : (
                <button
                  className={`btn btn-state btn-secondary my-0 align-middle order-text`}
                  onClick={() => onCompleteOrder(orderDetails)}
                >
                  <i className="fas fa-thumbs-up" />
                  Complete
                </button>
              )} */}
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
    const { pastOrderView } = this.state;
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
                  <tr>{this.renderTableHead()}</tr>
                </thead>
                <tbody>
                  {pastOrderView.length > 0 ? (
                    this.renderPastOrders()
                  ) : (
                    <tr className="no-order">
                      <td colspan="7">You don't have any Past Order</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PastOrderTable;
