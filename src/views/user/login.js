import React, { useState, useEffect, useContext } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Spinner,
} from 'reactstrap';
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
import callApi from 'helpers/callApi';
import * as Yup from 'yup';

const Login = ({ history, loading, error, loginUserAction }) => {
  const authContext = useContext(AuthContext);
  const [email] = useState('');
  const [password] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userLoginSchema = Yup.object().shape({
    username: Yup.string()
      .required()
      .test(
        'len',
        'کارن نوم باید له پنځه حروفو زیات وي',
        (val) => val?.length >= 5
      )
      .label('username'),
    password: Yup.string()
      .required()
      .test(
        'len',
        'پاسورډ باید له پنځه حروفو زیات وي',
        (val) => val?.length >= 5
      )
      .label('password'),
  });
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
    setIsLoading(true);

    callApi(`auth/login/`, 'POST', {
      username: values.username,
      password: values.password,
    })
      .then((response) => {
        if (response.status === 200) {
          setLoginError(false);
          message.success(' شه راغلاست / خوش امدید');
          console.log('Data: ', response.data);
          console.log('Token: ', response.data.access);
          let loggedUser = jwt_decode(response.data.access);
          console.log('Logged User in Token: ', loggedUser);
          authContext.setUser(response.data.user);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('current_user', response.data.user); //this should be removed after conflict resolved
          localStorage.setItem('access_token', response.data.access);
          history.push('/');
        }
        console.log('response is: ', response);
        // return response.data;
      })
      .catch((err) => {
        console.log('error inside login: ', err);
        if (err?.response && err.response.status === 400) {
          setLoginError(true);
          console.log('status is 400');
        }
        console.log('error of response', err);
        // message.error('Network Error');
      })
      .finally(() => {
        setIsLoading(false);
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
            <p className=" mb-0"></p>
          </div>
          <div className="form-side">
            <CardTitle className="mb-4">
              {!isLoading && loginError && (
                <div className="alert alert-danger">
                  <>
                    <h2>
                      {
                        'کارن نوم او یا پاسورډ سم ندی. / یوزر یا پسورد اشتباه است'
                      }
                    </h2>

                    <h6>{'بیا ځلې کوشش وکړی/ دوباره کوشش کنید'}</h6>
                  </>
                </div>
              )}
              {isLoading && (
                <div className="alert  text-center">
                  {' '}
                  <Spinner />
                </div>
              )}

              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik
              initialValues={initialValues}
              onSubmit={onUserLogin}
              validationSchema={userLoginSchema}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email-Id" />
                    </Label>
                    <Field
                      className="form-control fieldStyle"
                      name="username"
                    />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                        {errors.username}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control fieldStyle"
                      type="password"
                      name="password"
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block bg-danger text-white messageStyle">
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
