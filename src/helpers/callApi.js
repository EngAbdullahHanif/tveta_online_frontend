import axios from 'axios';

const servicePath = 'http://localhost:8000';

// Define a function to get the API headers
// const getHeaders = () => {
//     const user = JSON.parse(localStorage.getItem('current_user'));
//     const access_token = localStorage.getItem('access_token');
//     console.log('user', user)
//     if (user && access_token) {
//       return { Authorization: `Bearer ${access_token}` };
//     } else {
//       return {};
//     }
// };
const getHeaders = (data) => {
  const user = JSON.parse(localStorage.getItem('current_user'));
  const access_token = localStorage.getItem('access_token');

  if (user && access_token) {
    const headers = { Authorization: `Bearer ${access_token}`,}
      console.log("data instanceof FormData", data instanceof FormData)
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    console.log('headers', headers)
    return headers;
  } else {
    return {};
  }
};

// Define a function to make API calls
const callApi = async (endpoint, method = 'get', data = null) => {
  const headers = getHeaders(data);
  const url = `${servicePath}/${endpoint}`;
  try {
      const response = await axios({
            method,
            url,
            headers,
            data,
    });
    console.log('response of callApi', response)
    return response;
  } catch (error) {
    console.error("error of the call", error);
    return error.response.data;
  }
};

export default callApi;