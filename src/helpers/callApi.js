import axios from 'axios';

// const servicePath = 'http://172.16.105.244/tveta'; #production mood
// const servicePath = 'localhost:8000';
const servicePath = 'http://127.0.0.1:8000';

//  get the API headers
const getHeaders = (data) => {
  const user = JSON.parse(localStorage.getItem('current_user'));
  const access_token = localStorage.getItem('access_token');
  if (user && access_token) {
    const headers = { Authorization: `Bearer ${access_token}` };
    console.log('data instanceof FormData', data instanceof FormData);
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }
    return headers;
  } else {
    return {};
  }
};

// make API calls
const callApi = async (endpoint, method = 'get', data = null) => {
  const headers = getHeaders(data);
  const url = `${servicePath}/${endpoint}`;

  // add current user id to the data
  if (data && data instanceof FormData) {
    console.log('Formdata format', data);
    data.append(
      'user_id',
      JSON.parse(localStorage.getItem('current_user')).user_id
    );
  } else if (data) {
    // data.user_id = 1
    data.user_id = JSON.parse(localStorage.getItem('current_user')).user_id;
  }
  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    return response;
  } catch (error) {
    console.log('errorasdfsadf');
    if (error.response && error.response.status === 404) {
      throw new Error('Resource not found');
    } else {
      throw error;
    }
  }
};

export default callApi;
