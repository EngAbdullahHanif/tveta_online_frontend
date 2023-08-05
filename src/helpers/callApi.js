import { message } from 'antd';

import { NotificationManager } from 'components/common/react-notifications';

message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});
import axios from 'axios';

// const servicePath = 'http://172.16.105.244/tveta'; #production mood
// const servicePath = 'http://0.0.0.0:8000';
const servicePath = 'http://172.16.105.108:8000';
// const servicePath = 'https://online.tveta.gov.af:8000';

const start_date = '2023-06-01';
const end_date = '2023-06-30';

//  sets authentication header and content-type
const getHeaders = (data) => {
  const user = localStorage.getItem('user');
  const access_token = localStorage.getItem('access_token');
  if (user && access_token) {
    const headers = { Authorization: `Bearer ${access_token}` };

    // if data includes files, send request as multipart/form-data
    if (data instanceof FormData) {
      console.log('data instanceof FormData', data instanceof FormData);
      headers['Content-Type'] = 'multipart/form-data';
    }
    return headers;
  } else {
    return {};
  }
};

// make API calls
const callApi = async (
  endpoint,
  method = 'get',
  data = null,
  params = null
) => {
  const headers = getHeaders(data);
  const url = `${servicePath}/${endpoint}`;
  console.log('DATA in API Call: ' + endpoint, data);
  console.log('the url is', url);

  try {
    const response = await axios({
      method,
      url,
      headers,
      data,
      params,
    });

    console.log('CALL API Response: on ' + endpoint, response.data);
    return response;
  } catch (error) {
    if (error.response) {
      // server responded with a non-2xx code
      switch (error.response.status) {
        case 404:
          NotificationManager.error(
            'an error occured while requesting resource at ' + endpoint,
            'پیدا نشو/دریافت نشد',
            5000
          );
          break;
        default:
          NotificationManager.error(
            'an error occured while connecting to server at ' + endpoint,
            error?.response?.status + ': Server Error',
            5000
          );
      }
      console.error(error);
    }
    if (error.request) {
      // request was made, but no response
      NotificationManager.error(
        'an error occured on the server-side ' + endpoint,
        'Server Error: no response received from server',
        5000
      );
    } else {
      NotificationManager.error(
        'An error occured while sending data to server' + endpoint,
        'Client Error: no response received from server',
        5000
      );
    }
    return false;
  }
};

export default callApi;
