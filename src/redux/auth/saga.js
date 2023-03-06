import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
// import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';

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

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPasswordAsync);
}

async function getUserDetails() {
  try {
    const accessToken = localStorage.getItem('access_token');
    return await axios
      .get('http://localhost:8000/api/user/user-profile/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log('response', response.data);
        return response.data;
      });
  } catch (error) {
    throw error.response.data;
  }
}
function loginWithEmailPassword(username, password) {
  return (
    axios
      // .post('http://localhost:8000/api/token/', { username, password })
      .post('http://localhost:8000/api/user/login/', { username, password })
      .then((response) => {
        console.log('response', response.data.token);
        return response.data.token;
      })
      .catch((error) => {
        console.log('error of response', error);
        throw error.response.data;
      })
  );
}

export function* loginWithEmailPasswordAsync(action) {
  const { email, password } = action.payload.user;
  try {
    const tokens = yield call(loginWithEmailPassword, email, password);
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    const user = yield call(getUserDetails); // call the API to get user details
    console.log('user:  ', user);
    setCurrentUser(user); // set the current user details
    yield put(loginUserSuccess(tokens));

    // yield browserHistory.push('/');
    yield put(push('/'));
    // history.push('/');
    console.log('after the push');
    // yield call(history.push, adminRoot);
  } catch (error) {
    yield put(loginUserError(error));
  }
}

// function loginWithEmailPassword(email, password) {
//   const username = email.payload.user.email;
//   password = email.payload.user.password;

//   console.log('email', email.payload.user.email);
//   console.log('password', email.payload.user.password);

//   return axios
//     .post('http://localhost:8000/api/token/', { username, password })
//     .then((response) => {
//       response.data;
//       console.log('response', response);
//     })
//     .catch((error) => {
//       console.log('error of response', error);
//       throw error.response.data;
//     });
// }

// export function* loginWithEmailPasswordAsync(action) {
//   console.log('action', action);
//   const { email, password } = action.payload;
//   try {
//     const tokens = yield call(loginWithEmailPassword, email, password);
//     localStorage.setItem('access_token', tokens.access);
//     localStorage.setItem('refresh_token', tokens.refresh);
//     console.log('success');
//     yield put(loginUserSuccess(tokens));
//   } catch (error) {
//     console.log('error lskjdflsald');
//     yield put(loginUserError(error));
//   }
// }

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
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
