import React, { Component } from "react";
import { Functions, Constants } from "../../../lib";
import { Collapse } from "react-collapse";
// import OrderDetails from "./OrderDetails";

import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

class SeatMap extends Component {
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
      console.log("123");
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

  render() {
    const { orderView } = this.state;
    return (
      <div className="col-12">
        <div className="ms-panel">
          {/* <div className="ms-panel-header">
            <h6>Seat Map</h6>
          </div> */}
          <div className="ms-panel-body">
            <div className="table-responsive">
              <img src="../../../assets/img/others/restaurant-seat-map.jpg" />
              {/* <table className="table table-hover thead-primary">
                <thead>
                  <tr>{this.renderTableHead()}</tr>
                </thead>
                <tbody>
                  {orderView.length > 0 ? (
                    this.renderLiveOrders()
                  ) : (
                    <tr className="no-order">
                      <td colspan="7">You don't have any Live Order</td>
                    </tr>
                  )}
                </tbody>
              </table> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SeatMap;
