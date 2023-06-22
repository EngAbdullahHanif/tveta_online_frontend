import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import '../../dorms/dorm-register.css';
import profilePhoto from '../../../../assets/img/profiles/22.jpg';
import { NotificationManager } from 'components/common/react-notifications';
import '../../../../assets/css/global-style.css';
import { studentdismissalvalidationSchema } from '../../global-data/forms-validation';
import axios from 'axios';
import callApi from 'helpers/callApi';
import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  InputGroup,
  InputGroupAddon,
  CustomInput,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import DisplayMessage from 'components/messages/DisplayMessage';

import config from '../../../../config';
const servicePath = config.API_URL;
const instituteApiUrl = `${servicePath}/institute/`;
const studentSearchApiUrl = `${servicePath}/api/student_accademic/`;
const studentTranferApiUrl = `${servicePath}/api/student-transfer/`;

const ClassTransfer = (values) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [data, setData] = useState(false);
  const [message, setMessage] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState();
  const [reload, setReload] = useState(false);
  const SearchResultSchema = Yup.object().shape({
    searchfield: Yup.string()
      .min(4, <IntlMessages id="min.invalidId" />)
      .max(10, <IntlMessages id="max.invalidId" />)
      .required(<IntlMessages id="search.studentIdsearchErr" />),
  });

  const initialValues = {
    searchfield: '',
    dismissalDate: '',
    dismissalDocument: undefined,
  };

  const handleClick = (event) => {
    setIsNext(event);
    setData(true);
  };

  const [searchResult, setSearchResult] = useState(true);
  const [studentIdMatch, setStudentIdMatch] = useState(false);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'زده کوونکی په بریالیتوب سره منفک شو',
          'موفقیت',
          9000,
          null,
          null,
          cName
        );
        break;
      case 'info':
        NotificationManager.info(
          'زده کوونکی په انستیوت کی شتون نلری',
          'تیروتنه',
          9000,
          null,
          null,
          cName
        );
        break;

      case 'error':
        NotificationManager.error(
          'زده کوونکی منفک نشو بیا کوشش وکری',
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
  const handleSearch = async (event, values) => {
    setSearchResult(event);
    const response = await callApi(
      `api/student_accademic/?student_id=${studentId}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      studentId == response.data.student_id
        ? setStudentIdMatch(true)
        : setStudentIdMatch(false);
      if (response.data) {
        setStudent(response.data);
        setData(true);
      } else {
        setMessage('Student not found');
      }
    } else {
      console.log('student search error');
    }
  };
  const onSubmit = async (values) => {
    // setReload(true);
    const data = {
      student_id: studentId,
      dismissal_date: values.dismissalDate,
    };
    try {
      const response = await callApi(`api/student-dissmiss/`, 'POST', data);
      if (response.status === 200 || response.status === 201) {
        console.log('success');
        createNotification('success', 'filled');
        setReload(true);
      }
    } catch (error) {
      if (error.message === 'Resource not found') {
        console.log('student not found');
        createNotification('info', 'filled');
      } else {
        console.log('An error occurred:', error.message);
        createNotification('error', 'filled');
      }
    }

    // if (response.status === 200 || response.status === 201) {
    //   console.log('success');
    //   createNotification('success', 'filled');
    // } else if (response.status === 404 || response.status === 400) {
    //   console.log('student not found');
    //   createNotification('info', 'filled');
    // } else {
    //   console.log('error');
    //   createNotification('error', 'filled');
    // }
  };

  console.log('reload, isNext, searchResult,', reload, isNext, searchResult);
  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className=" m-5  titleStyle">
            {
              <IntlMessages id="تبدیلی صنف-سکشن شاګرد / د شاګرد د صنف-سکشن تبدیلی" />
            }
          </h2>
        </div>
        <CardBody>
          {!reload ? (
            <>
              {isNext ? (
                <>
                  {searchResult ? (
                    <Row className="justify-content-center inlineBlock">
                      <Colxx>
                        <Formik
                          initialValues={initialValues}
                          onSubmit={handleSearch}
                          // validationSchema={studentdismissalvalidationSchema}
                        >
                          {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => (
                            <Form
                              className="av-tooltip tooltip-label-bottom style"
                              onSubmit={handleSubmit}
                              style={{ minHeight: '300px' }}
                            >
                              <Label>
                                <IntlMessages id="search.studentIdSearchLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <div class="input-group mb-3 error-l-175 ">
                                <div class="input-group-prepend">
                                  <Button
                                    size="lg"
                                    style={{ fontSize: '80%' }}
                                    type="submit"
                                    color="primary"
                                    onClick={
                                      // values.searchfield.length > 3
                                      // ?
                                      () => handleSearch(false)
                                      // : ''
                                    }
                                  >
                                    <span className="spinner d-inline-block">
                                      <span className="bounce1" />
                                      <span className="bounce2" />
                                      <span className="bounce3" />
                                    </span>
                                    <span className="label">
                                      <IntlMessages id="search.studentId" />
                                    </span>
                                  </Button>
                                </div>
                                <Field
                                  className="form-control fieldStyle"
                                  name="searchfield"
                                  type="text"
                                  onKeyUp={() =>
                                    setStudentId(values.searchfield)
                                  }
                                />
                                {errors.searchfield && touched.searchfield ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.searchfield}
                                  </div>
                                ) : null}
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </Colxx>
                    </Row>
                  ) : (
                    <Row className="justify-content-center inlineBlock">
                      <Colxx style={{ paddingInline: '3%' }}>
                        {studentIdMatch ? (
                          <div className="border rounded">
                            <Label>
                              <h3 className="mt-5 m-5 data-style">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h3>
                            </Label>{' '}
                            <Row>
                              <Colxx xxs="1"></Colxx>

                              <Colxx>
                                <img
                                  src={student.student_photo}
                                  alt="Photo"
                                  width={'10%'}
                                />{' '}
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx>
                                <div>
                                  <Row className="justify-content-center border border-primary rounded m-5">
                                    <Colxx
                                      className=" p-5  border rounded"
                                      xxs=""
                                    >
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.NameLabel" />
                                      </Label>
                                      <h2>{student.student_name}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.FatherNameLabel" />
                                      </Label>
                                      <h2>{student.father_name}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.PhoneNoLabel" />
                                      </Label>
                                      <h2>{student.phone_number}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.EmailLabel" />
                                      </Label>
                                      <h2>{student.email}</h2>

                                      <Label className="data-style">
                                        <IntlMessages id="forms.InstituteLabel" />
                                      </Label>
                                      <h2>{student.institute_name}</h2>

                                      <Label className="data-style">
                                        <IntlMessages id="marks.ClassLabel" />
                                      </Label>
                                      <h2>دیارلسم/ سیزدهم</h2>
                                      <h2>{student.class_name}</h2>
                                    </Colxx>
                                    <Colxx className="p-5 border rounded">
                                      <Label className="data-style">
                                        <IntlMessages id="field.SemesterLabel" />
                                      </Label>
                                      <h2>{student.semester}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="forms.studyDepartment" />
                                      </Label>
                                      <h2>{student.department_name}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="forms.ProvinceLabel" />
                                      </Label>
                                      <h2>{student.current_province}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="forms.DistrictLabel" />
                                      </Label>
                                      <h2>{student.current_district}</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="forms.VillageLabel" />
                                      </Label>
                                      <h2>{student.current_village}</h2>
                                    </Colxx>
                                  </Row>
                                  <Row>
                                    <Colxx style={{ marginRight: '10%' }}>
                                      <Button
                                        color="primary"
                                        className="buttonStyle1"
                                        size="lg"
                                        type="submit"
                                        style={{
                                          margin: '5% 6% 15% 8%',
                                          paddingInline: '10%',
                                        }}
                                        onClick={() => {
                                          handleSearch(true);
                                          setStudentIdMatch(false);
                                        }}
                                      >
                                        <span className="label">
                                          <IntlMessages id="button.Back" />
                                        </span>
                                      </Button>
                                    </Colxx>
                                    <Colxx style={{ marginLeft: '10%' }}>
                                      <Button
                                        color="primary"
                                        className=" float-right buttonStyle1"
                                        size="lg"
                                        type="submit"
                                        style={{
                                          margin: '5% 0% 15% 6%',
                                          paddingInline: '10%',
                                        }}
                                        onClick={() => handleClick(false)}
                                      >
                                        <span className="label">
                                          <IntlMessages id="student.buttonDismissal" />
                                        </span>
                                      </Button>
                                    </Colxx>
                                  </Row>
                                </div>
                              </Colxx>
                            </Row>
                          </div>
                        ) : (
                          <div style={{ minHeight: '300px' }}>
                            <Label>
                              <h2 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h2>
                            </Label>
                            <Row className="justify-content-left mb-5">
                              <Colxx xxs="8" className="text-left">
                                <h1 className="text-center">
                                  <DisplayMessage
                                    type="error"
                                    message={<IntlMessages id="forms.NoData" />}
                                  />
                                </h1>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx>
                                <Button
                                  className=" m-5 buttonStyle"
                                  style={{
                                    fontSize: '140%',
                                    margin: '3% 0% 17% 8%',
                                  }}
                                  size="lg"
                                  type="submit"
                                  color="primary"
                                  onClick={() => handleSearch(true)}
                                >
                                  <span className="label">
                                    <IntlMessages id="button.Back" />
                                  </span>
                                </Button>
                              </Colxx>
                            </Row>
                          </div>
                        )}
                      </Colxx>
                    </Row>
                  )}
                </>
              ) : (
                <>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={studentdismissalvalidationSchema}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      setFieldTouched,
                      setFieldValue,
                      onBlur,
                      handleBlur,
                    }) => (
                      <Form
                        className="av-tooltip tooltip-label-right error-l-150 style "
                        style={{ height: '500px' }}
                      >
                        <Row className="mb-4 justify-content-center">
                          <Colxx xxs="8">
                            <div className=" p-3">
                              {/* Dismissal Date */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="student.dismissalDateLabel" />
                                </Label>
                                <Field
                                  className="form-control fieldStyle "
                                  name="dismissalDate"
                                  placeholder="1399/01/01"
                                />
                                {errors.dismissalDate &&
                                touched.dismissalDate ? (
                                  <div className="invalid-feedback d-block bg-danger text-white  messageStyle">
                                    {errors.dismissalDate}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* Dismissal Documents */}
                              <FormGroup>
                                <Label>
                                  <IntlMessages id="student.dissmissalDocuments" />
                                </Label>
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    آپلود
                                  </InputGroupAddon>
                                  <CustomInput
                                    type="file"
                                    name="dismissalDocument"
                                    onChange={(event) => {
                                      setFieldValue(
                                        'dismissalDocument',
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                    onBlur={handleBlur}
                                    invalid={
                                      touched.dismissalDocument &&
                                      errors.dismissalDocument
                                    }
                                  />
                                </InputGroup>
                                {errors.dismissalDocument &&
                                  touched.dismissalDocument && (
                                    <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                      {errors.dismissalDocument}
                                    </div>
                                  )}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx style={{ marginRight: '15%' }}>
                            <Button
                              color="primary"
                              className=" buttonStyle"
                              size="lg"
                              type="submit"
                              style={{
                                margin: '5% 10% 30% 6%',
                                paddingInline: '10%',
                              }}
                              onClick={() => handleClick(true)}
                            >
                              <span className="label">
                                <IntlMessages id="button.Back" />
                              </span>
                            </Button>
                          </Colxx>
                          <Colxx style={{ marginLeft: '15%' }}>
                            <Button
                              color="primary"
                              className=" float-right buttonStyle"
                              size="lg"
                              type="submit"
                              style={{
                                margin: '5% 10% 30% 8%',
                                paddingInline: '10%',
                              }}
                            >
                              <span className="label">
                                <IntlMessages id="student.buttonDismissal" />
                              </span>
                            </Button>
                            {/* <Button
                              className="float-right m-5 "
                              size="lg"
                              type="submit"
                              color="primary"
                              onClick={() => setReload(true)}
                            >
                              <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                              </span>
                              <span className="label">
                                <IntlMessages id="forms.SubimssionButton" />
                              </span>
                            </Button> */}
                          </Colxx>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </>
              )}
            </>
          ) : (
            <div className="wizard-basic-step text-center pt-3">
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button
                  className="m-5 bg-primary"
                  onClick={() => {
                    {
                      setReload(false);
                      setIsNext(true);
                      handleSearch(true);
                    }
                  }}
                >
                  <IntlMessages id="button.Back" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default ClassTransfer;
