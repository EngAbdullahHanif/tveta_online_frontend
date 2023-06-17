import React, { useState, useEffect, useContext } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/img/logo2.png';
import { Formik, Form, Field } from 'formik';
import { message } from 'antd';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';
import { AuthContext } from 'context/AuthContext';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const productionURL = 'http://172.16.105.244/tveta';
const localURL = 'http://localhost:8000';

const win = window.sessionStorage;
const Login = ({ history, loading, error, loginUserAction }) => {
  const authContext = useContext(AuthContext);
  const [email] = useState('');
  const [password] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.error(
        <IntlMessages id="login.wrong-credintialErr" />,
        <IntlMessages id="login.wrong-credintialErr-1" />,

        9000,
        null,
        null,
        ''
      );
    }
  }, [error]);

  // const onUserLogin = (values) => {
  //   loginUserAction(values, history);
  //   if (!loading) {
  //     if (values.email !== "" && values.password !== "") {
  //     }
  //   }
  // };
  const onUserLogin = (values) => {
    // alert("logged");
    console.log(values);
    axios
      .post(`${localURL}/user/login/`, {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        // alert("User Logged");
        message.success(response.data.msg);
        console.log('Data: ', response.data);
        console.log('Token: ', response.data.token);
        let loggedUser = jwt_decode(response.data.token.access);
        console.log('Logged User in Token: ', loggedUser);
        authContext.setUser(response.data.data);
        win.setItem('user', response.data.data);
        // window.location.href = window.location.origin;
        // return response.data;
      })
      .then(() => console.log('AUth User: ', authContext.user))
      .catch((err) => {
        console.log('error of response', err);
        message.error('Network Error');
      });
    if (!loading) {
      if (values.username !== '' && values.password !== '') {
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto m-all-outo">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <NavLink to="/" className="">
              <img src={logo} alt="Logo" />
            </NavLink>
            <p className=" h2 ">برای استفاده از سیستم شما نیاز به ورود دارید</p>
            <p className=" mb-0">
              برای ورود به سیستم نام کاربری و رمز خود را وارد کنید
              <br />
              اگه حساب کاربری نداری نگران نباش، از{' '}
              <NavLink to="/user/register" className="">
                اینجا
              </NavLink>{' '}
              میتونی تو سایت اسمتو بویسی
            </p>
          </div>
          <div className="form-side">
            <CardTitle className="mb-4">
              {error && (
                <div className="alert alert-danger">
                  <h2>{'یوزر یا پسورد اشتباهست'}</h2>

                  <h6>{'دوباره کوشش کنید'}</h6>
                </div>
              )}
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email-Id" />
                    </Label>
                    <Field className="form-control" name="username" />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback d-block">
                        {errors.username}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  {/* <div className="d-flex justify-content-between align-items-center"> */}
                  {/* <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink> */}
                  <Row>
                    <Colxx className="text-left">
                      {' '}
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          loading ? 'show-spinner' : ''
                        }`}
                        size="lg"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="user.login-button" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                  {/* </div> */}
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
