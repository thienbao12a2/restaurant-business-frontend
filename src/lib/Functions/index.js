import dayjs from "dayjs";
import axios from "axios";
import { Constants, Services } from "../../lib";
import { formatToTimeZone } from "date-fns-timezone/dist/formatToTimeZone";

const DEFAULT_TIMESTAMP = "1980-01-01T00:00:00.000Z";
const RankActiveOrders = (activeOrders = []) => {
  // let rankedOrders = [];
  // let rankedOrders = [];
  let rankedOrders = activeOrders.sort((a, b) => {
    //   const obj1 = activeOrders[a];
    //   const obj2 = activeOrders[b];
    const timeStamp1 = a.orderDetails.timeStamp || DEFAULT_TIMESTAMP;
    const timeStamp2 = b.orderDetails.timeStamp || DEFAULT_TIMESTAMP;
    return dayjs(timeStamp2).diff(dayjs(timeStamp1));
    // const status1_score = ORDER_STATUS_SCORES[obj1.status || "active"];
    // const status2_score = ORDER_STATUS_SCORES[obj2.status || "active"];
    // if (status1_score === status2_score) {
    //   const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
    //   const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
    //   return differenceInMinutes(timeStamp2, timeStamp1);
    // }
    // return status2_score - status1_score;
  });
  return rankedOrders;
};
const RankPastOrders = (pastOrders = []) => {
  // let rankedOrders = [];
  // let rankedOrders = [];
  let rankedPastOrders = pastOrders.sort((a, b) => {
    //   const obj1 = activeOrders[a];
    //   const obj2 = activeOrders[b];
    const timeStamp1 = a.orderDetails.completeTimeStamp || DEFAULT_TIMESTAMP;
    const timeStamp2 = b.orderDetails.completeTimeStamp || DEFAULT_TIMESTAMP;
    console.log(timeStamp1, timeStamp2);
    return dayjs(timeStamp2).diff(dayjs(timeStamp1));
    // const status1_score = ORDER_STATUS_SCORES[obj1.status || "active"];
    // const status2_score = ORDER_STATUS_SCORES[obj2.status || "active"];
    // if (status1_score === status2_score) {
    //   const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
    //   const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
    //   return differenceInMinutes(timeStamp2, timeStamp1);
    // }
    // return status2_score - status1_score;
  });
  return rankedPastOrders;
};
const RankActiveReservations = (activeReservations = []) => {
  // let rankedOrders = [];
  // let rankedOrders = [];
  let rankedReservations = activeReservations.sort((a, b) => {
    //   const obj1 = activeOrders[a];
    //   const obj2 = activeOrders[b];
    const timeStamp1 = a.timeStamp || DEFAULT_TIMESTAMP;
    const timeStamp2 = b.timeStamp || DEFAULT_TIMESTAMP;
    return dayjs(timeStamp2).diff(dayjs(timeStamp1));
    // const status1_score = ORDER_STATUS_SCORES[obj1.status || "active"];
    // const status2_score = ORDER_STATUS_SCORES[obj2.status || "active"];
    // if (status1_score === status2_score) {
    //   const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
    //   const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
    //   return differenceInMinutes(timeStamp2, timeStamp1);
    // }
    // return status2_score - status1_score;
  });
  return rankedReservations;
};
const calculateOrderTotal = (orderDetails) => {
  return orderDetails.reduce(
    (partialSum, item) => item.price * item.quantity + partialSum,
    0
  );
};
const RankEmail = (emails = []) => {
  // let rankedOrders = [];
  // let rankedOrders = [];
  let rankedOrders = emails.sort((a, b) => {
    //   const obj1 = activeOrders[a];
    //   const obj2 = activeOrders[b];
    const timeStamp1 = a.timeStamp || DEFAULT_TIMESTAMP;
    const timeStamp2 = b.timeStamp || DEFAULT_TIMESTAMP;
    return dayjs(timeStamp2).diff(dayjs(timeStamp1));
    // const status1_score = ORDER_STATUS_SCORES[obj1.status || "active"];
    // const status2_score = ORDER_STATUS_SCORES[obj2.status || "active"];
    // if (status1_score === status2_score) {
    //   const timeStamp1 = obj1.timeStamp || DEFAULT_TIMESTAMP;
    //   const timeStamp2 = obj2.timeStamp || DEFAULT_TIMESTAMP;
    //   return differenceInMinutes(timeStamp2, timeStamp1);
    // }
    // return status2_score - status1_score;
  });
  return rankedOrders;
};

const onConfirmOrder = async (orders) => {
  const response = await axios.post(
    `${Services.SOCKET_IO_URL}/api/v1/my-restaurant/confirmOrder`,
    {
      headers: { "ngrok-skip-browser-warning": true },
      orders,
    }
  );
};

const onCompleteOrder = async (orders) => {
  console.log(orders);
  const response = await axios.post(
    `${Services.SOCKET_IO_URL}/api/v1/my-restaurant/past-order`,
    {
      headers: { "ngrok-skip-browser-warning": true },
      orders,
    }
  );
};

const onReadEmail = async (newCheckUnreadEmail) => {
  const response = await axios.post(
    `${Services.SOCKET_IO_URL}/api/v1/my-restaurant/readEmail`,
    {
      headers: { "ngrok-skip-browser-warning": true },
      newCheckUnreadEmail,
    }
  );
};

const onGetAllEmails = async () => {
  const response = await axios.get(
    `${Services.SOCKET_IO_URL}/api/v1/my-restaurant/email`,
    {
      headers: { "ngrok-skip-browser-warning": true },
    }
  );
  const { data } = response;
  return data;
};

const renderSubmittedTime = (email) => {
  const { DATE_FORMAT, DEFAULT_TIMEZONE, TIME_FORMAT } = Constants;
  const { timeStamp } = email;
  const submittedDate = formatToTimeZone(timeStamp, DATE_FORMAT, {
    timeZone: DEFAULT_TIMEZONE,
  });
  const submittedTime = formatToTimeZone(timeStamp, TIME_FORMAT, {
    timeZone: DEFAULT_TIMEZONE,
  });
  return `${submittedDate} ${submittedTime}`;
};

const startServices = async () => {
  const response = await axios.get(
    `${Services.SOCKET_IO_URL}/api/v1/my-restaurant/services`,
    {
      headers: { "ngrok-skip-browser-warning": true },
    }
  );
  const { data } = response;
  return data;
};
export default {
  RankActiveOrders,
  RankPastOrders,
  RankActiveReservations,
  calculateOrderTotal,
  RankEmail,
  onConfirmOrder,
  onCompleteOrder,
  onReadEmail,
  renderSubmittedTime,
  onGetAllEmails,
  startServices,
};
