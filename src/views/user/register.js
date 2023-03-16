import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import * as Yup from 'yup';
import logo from '../../assets/img/logo2.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';
import { NotificationManager } from 'components/common/react-notifications';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { adminRoot } from 'constants/defaultValues';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';

const rollOptions = [
  { value: '1', label: <IntlMessages id="user.roleOption-1" /> },
  { value: '2', label: <IntlMessages id="user.roleOption-2" /> },
  { value: '3', label: <IntlMessages id="user.roleOption-3" /> },
  { value: '4', label: <IntlMessages id="user.roleOption-4" /> },
  { value: '5', label: <IntlMessages id="user.roleOption-5" /> },
  { value: '6', label: <IntlMessages id="user.roleOption-6" /> },
  { value: '7', label: <IntlMessages id="user.roleOption-7" /> },
];

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email(<IntlMessages id="login.email-addressErr-1" />)
    .required(<IntlMessages id="login.email-addressErr" />),
  password: Yup.string()
    .min(6, <IntlMessages id="login.passwordErr-1" />)
    .required(<IntlMessages id="login.passwordErr" />),

  username: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .required(<IntlMessages id="login.userNameErr" />),
});

const Register = ({ history, registerUserAction, loading, error }) => {
  const [username] = useState('');
  const [email] = useState('');
  const [password] = useState('');

  const onUserRegister = (values) => {
    registerUserAction(values);
  };
  const initialValues = { username, email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto m-all-outo">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <img src={logo} alt="Logo" />
            <NavLink to="/" className="white">
              <p className="text-white h2">اکونت جدید</p>
            </NavLink>
            <p className="white mb-3"></p>
            <p className="white mb-0">
              برای ورود به سیستم نام کاربری و رمز خود را وارد کنید
              <br />
              اگه حساب کاربری نداری نگران نباش، از{' '}
              <NavLink to="/user/register" className="white">
                اینجا
              </NavLink>{' '}
              میتونی تو سایت اسمتو بویسی
            </p>
          </div>
          <div className="form-side">
            {/* <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle> */}

            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={onUserRegister}
            >
              {({
                errors,
                touched,
                values,
                setFieldValue,
                setFieldTouched,
              }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      {' '}
                      <IntlMessages id="user.name" />
                    </Label>
                    <Field className="form-control" name="username" />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback d-block">
                        {errors.username}
                      </div>
                    )}
                  </FormGroup>

                  {/* Last Name */}
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      {' '}
                      <IntlMessages id="forms.lastName" />
                    </Label>
                    <Field className="form-control" name="lastName" />
                    {errors.lastName && touched.lastName && (
                      <div className="invalid-feedback d-block">
                        {errors.lastName}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field className="form-control" name="email" type="email" />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
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
                  {/* User Roll */}
                  <FormGroup className="form-group has-float-label error-l-100 ">
                    <Label>
                      <IntlMessages id="user.userRole" />
                    </Label>
                    <FormikReactSelect
                      name="levelOfEducation"
                      id="levelOfEducation"
                      value={values.levelOfEducation}
                      options={rollOptions}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.levelOfEducation && !LevelOfEducation ? (
                      <div className="invalid-feedback d-block bg-danger text-white">
                        {errors.levelOfEducation}
                      </div>
                    ) : null}
                  </FormGroup>
                  <Row>
                    <Colxx className="text-left">
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
                          <IntlMessages id="user.register-button" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
