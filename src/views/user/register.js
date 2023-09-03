import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import * as Yup from 'yup';
import logo from '../../assets/img/logo2.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from 'redux/actions';
import {
  FormikReactSelect,
} from 'containers/form-validations/FormikFields';
import callApi from 'helpers/callApi';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { Formik, Form, Field } from 'formik';

const rollOptions = [
  { value: '1', label: <IntlMessages id="user.roleOption-1" /> },
  { value: '2', label: <IntlMessages id="user.roleOption-2" /> },
  { value: '3', label: <IntlMessages id="user.roleOption-3" /> },
  { value: '4', label: <IntlMessages id="user.roleOption-4" /> },
  // { value: '5', label: <IntlMessages id="user.roleOption-5" /> },
  { value: '6', label: <IntlMessages id="user.roleOption-6" /> },
  { value: '7', label: <IntlMessages id="user.roleOption-7" /> },
];

const StdSchoolProvinceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" /> },
  { value: '4', label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" /> },
  { value: '5', label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" /> },
  { value: '6', label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" /> },
  { value: '7', label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" /> },
  { value: '8', label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" /> },
  { value: '9', label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" /> },
  {
    value: '10',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    value: '11',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    value: '12',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    value: '13',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    value: '14',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    value: '15',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    value: '16',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    value: '17',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    value: '18',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    value: '19',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    value: '20',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: '21',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    value: '22',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    value: '23',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    value: '24',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    value: '25',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    value: '26',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    value: '27',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    value: '28',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    value: '29',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: '30',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    value: '31',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    value: '32',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    value: '33',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    value: '34',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
  {
    value: '234234',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
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
  const [lastName] = useState('');
  const [email] = useState('');
  const [password] = useState('');
  const [institute] = useState('');
  const [role] = useState('');
  const [province] = useState('');
  const [institutes, setInstitutes] = useState([]);

  // fetch institute lists
  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const onUserRegister = (values) => {
    console.log('register values', values);
    const data = {
      username: values.username,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
      institute_id: values.institute.value,
      role: values.role.value,
      province: values.province.value,
    };
    registerUserAction(data);
  };
  const initialValues = {
    username,
    lastName,
    email,
    password,
    institute,
    role,
    province,
  };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto m-all-outo">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <img src={logo} alt="Logo" />
            <NavLink to="/" className="">
              <p className=" h2">اکونت جدید</p>
            </NavLink>
            <p className=" mb-3"></p>
            <p className="mb-0">
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

                  {/* Institute Name*/}
                  <FormGroup className="form-group has-float-label ">
                    <Label>
                      <IntlMessages id="forms.InstituteLabel" />
                    </Label>

                    <FormikReactSelect
                      name="institute"
                      id="institute"
                      value={values.institute}
                      options={institutes}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.institute && touched.institute ? (
                      <div className="invalid-feedback d-block bg-danger text-white">
                        {errors.institute}
                      </div>
                    ) : null}
                  </FormGroup>

                  {/* User Roll */}
                  <FormGroup className="form-group has-float-label error-l-100 ">
                    <Label>
                      <IntlMessages id="user.userRole" />
                    </Label>
                    <FormikReactSelect
                      name="role"
                      id="role"
                      value={values.role}
                      options={rollOptions}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.role && !role ? (
                      <div className="invalid-feedback d-block bg-danger text-white">
                        {errors.role}
                      </div>
                    ) : null}
                  </FormGroup>

                  {/* province */}
                  <FormGroup className="form-group has-float-label error-l-175">
                    <Label>
                      <IntlMessages id="forms.ProvinceLabel" />
                    </Label>
                    <FormikReactSelect
                      name="province"
                      id="province"
                      value={values.province}
                      options={StdSchoolProvinceOptions}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.province && touched.province ? (
                      <div className="invalid-feedback d-block bg-danger text-white">
                        {errors.province}
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
