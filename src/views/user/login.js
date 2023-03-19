import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/img/logo2.png';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = <IntlMessages id="login.passwordErr" />;
  } else if (value.length < 6) {
    error = <IntlMessages id="login.passwordErr-1" />;
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = <IntlMessages id="login.email-addressErr" />;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = <IntlMessages id="login.email-addressErr-1" />;
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
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

  const onUserLogin = (values) => {
    loginUserAction(values, history);
    if (!loading) {
      if (values.email !== '' && values.password !== '') {
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
                    <Field
                      className="form-control"
                      name="username"
                      // validate={validateEmail}
                    />
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
                      validate={validatePassword}
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
