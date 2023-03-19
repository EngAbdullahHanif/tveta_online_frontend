import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
// import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import { NotificationManager } from 'components/common/react-notifications';


import axios from 'axios';

import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

async function getUserDetails() {
  try {
    const accessToken = localStorage.getItem('access_token');
    return await axios
      .get('http://localhost:8000/user/user-profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('user info response', response.data);
        return response.data;
      });
  } catch (error) {
    throw error.response.data;
  }
}

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPasswordAsync);
}

function loginWithEmailPassword(username, password) {
  return (
    axios
      .post('http://localhost:8000/user/logins/', { username, password })
      .then((response) => {
        console.log('response', response.data)
        return response.data;
      })
      .catch((error) => {
        // history.push('/user/login');
        console.log('error of response', error)
        // throw error;  
      })
  );
}

export function* loginWithEmailPasswordAsync(action) {
  const { username, password } = action.payload.user;
  const { history } = action.payload;
  console.log('username, password, history', username, password, history)
  try {
    const data = yield call(loginWithEmailPassword, username, password);
    console.log('data', data)
    if(data){
      localStorage.setItem('access_token', data.token.access);
      localStorage.setItem('refresh_token', data.token.refresh);
      setCurrentUser(data.data); // set the current user details
      yield put(loginUserSuccess(data.token));
      history.push('/app');
    }  else {
      yield put(loginUserError('error'));
    }
  } catch (error) {
    yield put(loginUserError(error));
    

  }
}


export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPasswordAsync);
}

function registerWithEmailPassword(username, email, password) {
  return (
    axios
      .post('http://localhost:8000/user/register/', { username, email, password })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log('error of response', error)
      })
  );
}

export function* registerWithEmailPasswordAsync (action)   {
  console.log("action", action)
  const { username, email, password } = action.payload.user;
  const { history } = action.payload;
  console.log('username, email, password, history', username, email, password, history)
  try {
    const data = yield call(registerWithEmailPassword, username, email, password);
    console.log('data', data)
    if(data){
      yield put(registerUserSuccess(data));
      NotificationManager.success(
        "success",
        'done',
        9000,
        null,
        null,
        ''
      );
      history.push('/user/register');
    }  else {
      yield put(registerUserError('error'));
      history.push('/user/register');
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}



export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .sendPasswordResetEmail(email)
    .then((user) => user)
    .catch((error) => error);
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (!forgotPasswordStatus) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      yield put(forgotPasswordError(forgotPasswordStatus.message));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
