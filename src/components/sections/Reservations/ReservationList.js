import React, { Component } from "react";
import { Functions, Constants } from "../../../lib";
import { Collapse } from "react-collapse";
// import OrderDetails from "./OrderDetails";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

class ReservationList extends Component {
  constructor(props) {
    super(props);
    this.state = { reservationView: this.props.activeReservations };
  }

  componentWillReceiveProps(nextProps, prevState) {
    this.setState({
      reservationView: nextProps.activeReservations,
    });
  }
  renderTableHead() {
    const tableHead = [
      "Reservation Number",
      "Reservation Time",
      "Customer Name",
      "Phone Number",
      "Party Size",
      // "",
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
  renderReservations() {
    // const { calculateOrderTotal } = Functions;
    const { reservationView } = this.state;
    // const { onAcceptReservation, onCompleteReservation } = this.props;
    return reservationView.map((item, index) => {
      // const { orderDetails } = item;
      return (
        <React.Fragment key={index}>
          <tr>
            <th scope="row">#{item.reservationID}</th>
            <td className="order-style">{item.date.replace(/GMT.*/, "")}</td>
            <td className="order-style">{item.name}</td>
            <td className="order-style">{item.phone_number}</td>
            <td className="order-style">{item.guest_number}</td>
            {/* <td>
              <span
                className={`badge ${
                  orderDetails.orderStatus === "Pending"
                    ? "badge-primary"
                    : "badge-success"
                }`}
              >
                {orderDetails.orderStatus}
              </span>
            </td> */}
            {/* <td className="order-style">{`$${calculateOrderTotal(
              orderDetails.items
            ).toFixed(2)}`}</td> */}
            {/* <td className="text-center align-middle w-5">
              <button
                className="btn btn-state btn-primary align-middle my-0 mr-3 order-text"
                onClick={() => this.expandOrder(index)}
              >
                <i
                  className={`fas ${
                    item.showExpandReservation ? "fa-minus" : "fa-plus"
                  }`}
                />
                Details
              </button>
              {orderDetails.orderStatus === "Pending" ? (
                <button
                  className={`btn btn-statel btn-success my-0 align-middle order-text`}
                  onClick={() => onAcceptReservation(orderDetails)}
                >
                  <i className="fas fa-check" />
                  Accept
                </button>
              ) : (
                <button
                  className={`btn btn-state btn-secondary my-0 align-middle order-text`}
                  onClick={() => onCompleteReservation(item)}
                >
                  <i className="fas fa-thumbs-up" />
                  Complete
                </button>
              )}
            </td> */}
          </tr>

          {/* <tr className="order-details">
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
          </tr> */}
        </React.Fragment>
      );
    });
  }
  render() {
    const { reservationView } = this.state;
    return (
      <div className="col-12">
        <div className="ms-panel">
          <div className="ms-panel-header">
            <h6>Reservation List</h6>
          </div>
          <div className="ms-panel-body">
            <div className="table-responsive">
              <table className="table table-hover thead-primary">
                <thead>
                  <tr>{this.renderTableHead()}</tr>
                </thead>
                <tbody>
                  {reservationView.length > 0 ? (
                    this.renderReservations()
                  ) : (
                    <tr className="no-order">
                      <td colSpan="7">You don't have any Reservation</td>
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

export default ReservationList;
