import dayjs from "dayjs";

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
export default {
  RankActiveOrders,
  calculateOrderTotal,
  RankEmail,
};
