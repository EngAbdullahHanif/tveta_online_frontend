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
const servicePath = 'https://online.tveta.gov.af:8000';

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
  console.log('headers are: ', headers);
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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 404) {
        // throw new Error('Resource not found');
        NotificationManager.warning(
          'Resource not found',
          'Error',
          10000,
          null,
          null,
          ''
        );
      }
      NotificationManager.error(
        'an error occured while connecting to server at ' + endpoint,
        error?.response?.status + ': Server Error',
        5000
      );
      console.log('Error in API: ', error?.response);
    } else if (error.request) {
      // The request was made but no response was received
      NotificationManager.warning(
        'ریکویسټ سرور ته ولیږل شوه،‌خو ځواب رانغی',
        'Error',
        10000,
        null,
        null,
        ''
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      NotificationManager.warning(
        'ریکویسټ جوړولو کې مشکل رامینځته شو',
        'Error',
        10000,
        null,
        null,
        ''
      );
    }
    console.log(error);
    // throw error;
    return false;
  }
};

export default callApi;
