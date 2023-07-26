import React, { useRef, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { dormGenderOptions } from '../global-data/options';
import {
  provincesOptionsForList,
  dateOfBirthOptoions,
  studyTimeOptions,
} from '../global-data/options';
import * as Yup from 'yup';

import {
  Row,
  Card,
  CardBody,
  // Form,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';

import callApi from 'helpers/callApi';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { institute } from 'lang/locales/fa_IR';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { message, Spin } from 'antd';
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});
const options = [
  { value: 'Electronic', label: 'الکترونیکی' },
  { value: 'paper', label: 'کاغذی' },
];

const instTypeOptions = [
  { value: 'governmental', label: 'دولتی' },
  { value: 'private', label: 'شخصی' },
];

const instituteCityOptions = [
  { value: 'urban', label: 'شهری' },
  { value: 'rural', label: 'دهاتی' },
];
const instituteLanguageOptions = [
  { value: 'pashto', label: 'پښتو' },
  { value: 'dari', label: 'دری' },
];
const instituteClimateOptions = [
  { value: 'cold', label: 'سرد سیر' },
  { value: 'warm', label: 'گرم سیر' },
  { value: 'very_cold', label: 'زیاد سرد سیر' },
];
const instituteTypeOptions = [
  { value: 'institute', label: 'انستیتوت' },
  { value: 'high_school', label: 'لیسه' },
  { value: 'special_education', label: 'تعلیمات خاص' },
];

const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/institute_create`;
//http://localhost:8000/institute/institute_create

const InstituteDepartmentRegister = () => {
  const [loader, setLoader] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [isNext, setIsNext] = useState(false);
  const [] = useState('وتاکئ / انتخاب کنید');

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'انستیتوت-دیپارتمنت  موفقانه رجستر شو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'انستیتوت-دیپارتمنت ثبت نشو، بیا کوشش وکری',
          'خطا',
          9000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    console.warn('Reponse Institutes: ', response);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      console.warn('Updated Institutes: ', updatedData);
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };

  const fetchDepartments = async () => {
    const response = await callApi(`institute/department/`, '', null);
    // console.log('response of department', response);
    if (response.data && response.status === 200) {
      console.log('response of department', response);
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(updatedData); //Set it up when data in Backend is ready
    } else {
      console.log('department error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
    fetchDepartments();
  }, []);

  // post student record to server
  const postInstituteRecord = async (data) => {
    const response = await callApi(
      'institute/institute-department-create/',
      'POST',
      data
    );
    if (response) {
      createNotification('success', 'filled');
      // resetForm();
      setIsNext(true);
      console.log('success message from backend', response);
    } else {
      createNotification('error', 'filled');
    }
  };

  const onRegister = (values) => {
    console.log('values', values);
    const data = {
      institute: values.institute.value,
      department: values.department.value,
    };
    postInstituteRecord(data);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {/* <IntlMessages id="inst.register.title" /> */}د انستیتوت -
          دیپارتمنت ثبت کول / ثبت انستیتوت - دیپارتمنت
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              validateOnMount
              initialValues={{
                institute: [],
                department: [],
              }}
              // validationSchema={ValidationSchema}
              onSubmit={onRegister}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                handleChange,
                resetForm,
              }) => (
                <Form className="av-tooltip tooltip-label-right  error-l-200">
                  <Row className="justify-content-center">
                    <Colxx xxs="11">
                      <FormGroup className="form-group has-float-label error-l-150 ">
                        <Label>
                          <IntlMessages id="forms.InstituteLabel" />
                        </Label>
                        <FormikReactSelect
                          name="institute"
                          id="institute"
                          // value={values.institute}
                          options={institutes}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />

                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.institute}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="forms.studyDepartment" />
                        </Label>
                        <FormikReactSelect
                          name="department"
                          id="department"
                          value={values.department}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.department && touched.department ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    {' '}
                    <Colxx style={{ marginLeft: '5%', marginBottom: '5%' }}>
                      <Button
                        className="float-right m-5 "
                        size="lg"
                        type="submit"
                        color="primary"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span
                          className="label"
                          style={{ fontSize: 18, fontWeight: 'bold' }}
                        >
                          <IntlMessages id="forms.SubimssionButton" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          ) : (
            <div
              className="wizard-basic-step text-center pt-3 "
              style={{ minHeight: '400px' }}
            >
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button
                  className="m-5 bg-primary"
                  onClick={() => setIsNext(false)}
                >
                  <IntlMessages id="button.back" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default InstituteDepartmentRegister;
