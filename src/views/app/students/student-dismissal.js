import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import profilePhoto from './../../../assets/img/profiles/22.jpg';
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
  CardTitle,
  Input,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/`;
const studentSearchApiUrl = `${servicePath}/api/student_accademic/`;
const studentTranferApiUrl = `${servicePath}/api/student-transfer/`;

const instituteOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
];

const shifs = [
  { value: '1', label: 'rozana' },
  { value: '2', label: 'shabana' },
];

const StudentsDismissal = (values) => {
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

  const dismissalSchema = Yup.object().shape({
    dismissalDate: Yup.string().required(
      <IntlMessages id="student.dissmissalDateErr" />
    ),
  });

  const initialValues = {
    searchfield: '',
    dismissalDate: '',
    dismissalDocument: '',
  };

  const handleClick = (event) => {
    setIsNext(event);
    setData(true);
  };

  const [searchResult, setSearchResult] = useState(true);
  const [studentIdMatch, setStudentIdMatch] = useState(false);

  // const createNotification = (type, className) => {
  //   const cName = className || '';
  //   switch (type) {
  //     case 'success':
  //       NotificationManager.success(
  //         'شاگرد موفقانه لیلی ته رجستر شو',
  //         'موفقیت',
  //         3000,
  //         null,
  //         null,
  //         cName
  //       );
  //       break;
  //     case 'error':
  //       NotificationManager.error(
  //         'شاگرد ثبت نشو، بیا کوشش وکری',
  //         'خطا',
  //         9000,
  //         () => {
  //           alert('callback');
  //         },
  //         null,
  //         cName
  //       );
  //       break;
  //     default:
  //       NotificationManager.info('Info message');
  //       break;
  //   }
  // };

  // post student record to server

  // const postStudentRecord = async (data) => {
  //   const response = await callApi('api/student_create', 'POST', data);
  //   console.log('response of call api', response);
  //   if (response) {
  //     createNotification('success', 'filled');
  //     console.log('success message', response.data);
  //   } else {
  //     createNotification('error', 'filled');
  //     console.log('class error');
  //   }
  // };

  const handleSearch = async (event) => {
    console.log('handle search is called');
    setSearchResult(event);
    //search student in the server
    const response = await callApi(
      `api/student_accademic/?student_id=${studentId}`,
      'GET',
      'NULL'
    );
    const studentResponse = await response.data;
    //console.log('reone', studentResponse.student_id);
    studentId == studentResponse.student_id
      ? setStudentIdMatch(true)
      : setStudentIdMatch(false);
    //console.log(studentId, 'student Response');
    if (studentResponse) {
      setStudent(studentResponse);
      setData(true);
    } else {
      setMessage('Student not found');
    }
  };

  const onSubmit = (values) => {
    console.log('form values after search', values);
    //setReload(true);
  };

  console.log('reload, isNext, searchResult,', reload, isNext, searchResult);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="student.dismissalTitleFromInstitute" />}
        </h3>
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
                          validationSchema={SearchResultSchema}
                        >
                          {({
                            errors,
                            touched,
                            values,
                            setFieldTouched,
                            setFieldValue,
                          }) => (
                            <Form
                              className="av-tooltip tooltip-label-bottom"
                              style={{ height: '300px' }}
                            >
                              <Label>
                                <IntlMessages id="search.studentIdSearchLabel" />
                              </Label>
                              <div class="input-group mb-3 error-l-175 ">
                                <div class="input-group-prepend">
                                  <Button
                                    size="lg"
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
                                  className="form-control"
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
                              <h6 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h6>
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
                                      <Label>
                                        <IntlMessages id="teacher.NameLabel" />
                                      </Label>
                                      <h3>{student.student_name}</h3>
                                      <Label>
                                        <IntlMessages id="teacher.FatherNameLabel" />
                                      </Label>
                                      <h3>{student.father_name}</h3>
                                      <Label>
                                        <IntlMessages id="teacher.PhoneNoLabel" />
                                      </Label>
                                      <h3>{student.phone_number}</h3>
                                      <Label>
                                        <IntlMessages id="teacher.EmailLabel" />
                                      </Label>
                                      <h3>{student.email}</h3>

                                      <Label>
                                        <IntlMessages id="forms.InstituteLabel" />
                                      </Label>
                                      <h3>{student.institute_name}</h3>

                                      <Label>
                                        <IntlMessages id="marks.ClassLabel" />
                                      </Label>
                                      <h3>دیارلسم/ سیزدهم</h3>
                                      <h3>{student.class_name}</h3>
                                    </Colxx>
                                    <Colxx className="p-5 border rounded">
                                      <Label>
                                        <IntlMessages id="field.SemesterLabel" />
                                      </Label>
                                      <h3>{student.semester}</h3>
                                      <Label>
                                        <IntlMessages id="forms.FieldLabel" />
                                      </Label>
                                      <h3>{student.department_name}</h3>
                                      <Label>
                                        <IntlMessages id="forms.ProvinceLabel" />
                                      </Label>
                                      <h3>{student.current_province}</h3>
                                      <Label>
                                        <IntlMessages id="forms.DistrictLabel" />
                                      </Label>
                                      <h3>{student.current_district}</h3>
                                      <Label>
                                        <IntlMessages id="forms.VillageLabel" />
                                      </Label>
                                      <h3>{student.current_village}</h3>
                                    </Colxx>
                                  </Row>
                                  <Row>
                                    <Colxx style={{ marginRight: '10%' }}>
                                      <Button
                                        className=" mb-5 mt-5"
                                        size="lg"
                                        type="submit"
                                        color="primary"
                                        onClick={() => {
                                          handleSearch(true);
                                          setStudentIdMatch(false);
                                        }}
                                      >
                                        <span className="spinner d-inline-block">
                                          <span className="bounce1" />
                                          <span className="bounce2" />
                                          <span className="bounce3" />
                                        </span>
                                        <span className="label">
                                          <IntlMessages id="button.Back" />
                                        </span>
                                      </Button>
                                    </Colxx>
                                    <Colxx style={{ marginLeft: '10%' }}>
                                      <Button
                                        className="float-right mb-5 mt-5  "
                                        size="lg"
                                        type="submit"
                                        color="primary"
                                        onClick={() => handleClick(false)}
                                      >
                                        <span className="spinner d-inline-block">
                                          <span className="bounce1" />
                                          <span className="bounce2" />
                                          <span className="bounce3" />
                                        </span>
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
                          <div style={{ height: '300px' }}>
                            <Label>
                              <h6 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h6>
                            </Label>
                            <Row className="justify-content-center mb-5">
                              <Colxx
                                xxs="12"
                                className="justify-content-center"
                              >
                                <h3 className="text-center">
                                  <IntlMessages id="forms.NoData" />
                                </h3>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx style={{ marginLeft: '10%' }}>
                                <Button
                                  className=" m-5"
                                  size="lg"
                                  type="submit"
                                  color="primary"
                                  onClick={() => handleSearch(true)}
                                >
                                  <span className="spinner d-inline-block">
                                    <span className="bounce1" />
                                    <span className="bounce2" />
                                    <span className="bounce3" />
                                  </span>
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
                    validationSchema={dismissalSchema}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      setFieldTouched,
                      setFieldValue,
                    }) => (
                      <Form
                        className="av-tooltip tooltip-label-right error-l-150 "
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
                                  className="form-control"
                                  name="dismissalDate"
                                  type="date"
                                />
                                {errors.dismissalDate &&
                                touched.dismissalDate ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.dismissalDate}
                                  </div>
                                ) : null}
                              </FormGroup>

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
                                    id="exampleCustomFileBrowser1"
                                    name="dismissalDocument"
                                  />
                                </InputGroup>
                                {errors.dismissalDocument &&
                                touched.dismissalDocument ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.dismissalDocument}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx style={{ marginRight: '15%' }}>
                            <Button
                              className=" m-5"
                              size="lg"
                              type="button"
                              color="primary"
                              onClick={() => handleClick(true)}
                            >
                              <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                              </span>
                              <span className="label">
                                <IntlMessages id="button.Back" />
                              </span>
                            </Button>
                          </Colxx>
                          <Colxx style={{ marginLeft: '15%' }}>
                            <Button
                              className="float-right mb-5 mt-5  "
                              size="lg"
                              type="submit"
                              color="primary"
                              //onClick={() => setReload(true)}
                            >
                              <span className="spinner d-inline-block">
                                <span className="bounce1" />
                                <span className="bounce2" />
                                <span className="bounce3" />
                              </span>
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
                  // onClick={() => window.location.reload()}
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

export default StudentsDismissal;
