const LIVE_MODE_ENABLED = () => {
  const { NODE_ENV } = process.env;
  return NODE_ENV !== "development";
};
const DEV_BASE_URL =
  "https://1a45-2600-1700-5cac-3d30-ddcd-daf1-e1e9-420d.ngrok.io";
// const DEV_BASE_URL = "http://localhost:8000";
const PROD_BASE_URL = "https://restaurant-backend.herokuapp.com";
const BASE_URL = LIVE_MODE_ENABLED() ? PROD_BASE_URL : DEV_BASE_URL;
export default {
  SOCKET_IO_URL: BASE_URL,
};
