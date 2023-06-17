import { message } from "antd";
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});
import axios from "axios";

// const servicePath = 'http://172.16.105.244/tveta'; #production mood
// const servicePath = "localhost:8000";
const servicePath = "http://127.0.0.1:8000";

//  get the API headers
const getHeaders = (data) => {
  const user = localStorage.getItem("user");
  const access_token = localStorage.getItem("access_token");

  if (user && access_token) {
    const headers = { Authorization: `Bearer ${access_token}` };
    if (data instanceof FormData) {
      console.log("data instanceof FormData", data instanceof FormData);
      headers["Content-Type"] = "multipart/form-data";
    }
    return headers;
  } else {
    return {};
  }
};

// make API calls
const callApi = async (endpoint, method = "get", data = null) => {
  const headers = getHeaders(data);
  console.log("HEaders: ", headers);
  const url = `${servicePath}/${endpoint}`;
  console.log("DATA in API Call: ", data);
  // add current user id to the data
  // if (data && data instanceof FormData) {
  //   console.log("Formdata format", data);
  //   data.append("user_id", localStorage.getItem("user").user_id);
  // } else if (data) {
  //   data.user_id = 1;
  //   // data.user_id = localStorage.getItem("user").user_id;
  // }
  console.log("the url is", url);
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    console.log("CALL API Response:", response.data);
    return response;
  } catch (error) {
    console.log("Error in API: ", error);
    if (error.response && error.response.status === 404) {
      throw new Error("Resource not found");
    } else {
      throw error;
    }
  }
};

export default callApi;
