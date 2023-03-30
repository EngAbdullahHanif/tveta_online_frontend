import axios from 'axios';

const servicePath = 'http://localhost:8000';

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
    console.log('headers', headers);
    return headers;
  } else {
    return {};
  }
};

// make API calls
const callApi = async (endpoint, method = 'get', data = null) => {
  const headers = getHeaders(data);
  const url = `${servicePath}/${endpoint}`;


  //add current user id to the data
  if (data && data instanceof FormData) {
    data.append(
      'user_id',
      JSON.parse(localStorage.getItem('current_user')).user_id
    );
  } else if (data) {
    // data.user_id = JSON.parse(localStorage.getItem('current_user')).user_id;
    data.user_id = '1';
  }

  try {
    console.log('the method', method);
    const response = await axios({
      method,
      url,
      headers,
      data,
    });
    console.log('response of callApi', response);
    return response;
  } catch (error) {
    console.error('error of the call', error);
    return error;
  }
};

export default callApi;
