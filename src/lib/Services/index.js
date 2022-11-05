const LIVE_MODE_ENABLED = () => {
  const { NODE_ENV } = process.env;
  return NODE_ENV !== "development";
};
const DEV_BASE_URL =
  "https://66b5-2600-1700-5cac-3d30-f086-1918-83b3-762b.ngrok.io";
// const DEV_BASE_URL = "http://localhost:8000";
const PROD_BASE_URL = "https://restaurant-backend.herokuapp.com";
const BASE_URL = LIVE_MODE_ENABLED() ? PROD_BASE_URL : DEV_BASE_URL;
export default {
  SOCKET_IO_URL: BASE_URL,
};
