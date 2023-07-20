import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import axios from 'axios';
import callApi from 'helpers/callApi';
import { NotificationManager } from 'components/common/react-notifications';

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
import config from '../../../config';

const servicePath = config.API_URL;
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

const createNotification = (type, className) => {
  const cName = className || '';
  switch (type) {
    case 'success':
      NotificationManager.success(
        'شاگرد موفقانه لیلیی نه خارج شو',
        'موفقیت',
        3000,
        null,
        null,
        cName
      );
      break;
    case 'error':
      NotificationManager.error(
        'شاگرد لیلی نه خارج نشو، بیا کوشش وکری',
        'خطا',
        5000,
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

const StudentsDismissal = (values) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [institute, setInstitute] = useState();
  const [department, setDepartment] = useState();
  const [classs, setClasss] = useState(); //classs is used because class is a reserved word
  const [dormRegistration, setDormRegistration] = useState();
  const [data, setData] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState();

  const [checkoutDoc, setCheckoutDoc] = useState();

  const SearchResultSchema = Yup.object().shape({
    searchfield: Yup.string()
      .min(4, <IntlMessages id="min.invalidId" />)
      .max(10, <IntlMessages id="max.invalidId" />)
      .required(<IntlMessages id="search.studentIdsearchErr" />),
  });

  const dismissalSchema = Yup.object().shape({
    checkoutDate: Yup.string().required(
      <IntlMessages id="student.dissmissalDateErr" />
    ),
    checkoutDocument: Yup.mixed().required(
      <IntlMessages id="student.dissmissalDocumentErr" />
    ),
  });

  const initialValues = {
    searchfield: '',
    checkoutDate: '',
    checkoutDocument: '',
  };

  const handleClick = (event) => {
    setIsNext(event);
    setData(true);
  };

  const [searchResult, setSearchResult] = useState(true);
  const [studentIdMatch, setStudentIdMatch] = useState(false);
  const handleChange = (event) => {
    console.log('event sadfsdf', event.target.value);
    setStudentId(event.target.value);
  };
  const handleSearch = async () => {
    const response = await callApi(
      `students/student_accademic/?student_id=${studentId}`,
      '',
      null
    );
    console.log(response);
    if (response.data && response.status === 200) {
      console.log('dissmiss student ', response.data.results);
      console.log('student is: ', response.data.results);

      setStudent(response.data.results);
    } else {
      console.log('student error');
    }
  };

  const handleRegister = async (values) => {
    console.log('handleRegister');
    const response = await callApi(
      `students/student_accademic/?student_id=${values.student_id}`,
      '',
      null
    );
    console.log(response);
    if (response.status === 200) {
      console.log('student is: ', response.data);
      console.log('setting student');
      setStudent(response.data);
      // setIsNext(false);
      setData(true);
    } else {
      console.log('student error');
    }

    console.log('values', values);
  };

  const fetchStudentEnrollments = async () => {
    const instituteResponse = await callApi(
      `students/${student.id}/institute`,
      '',
      null
    );
    if (instituteResponse.data && instituteResponse.status === 200) {
      setInstitute(instituteResponse.data);
    } else {
      console.log('student institute error');
    }

    const departmentResponse = await callApi(
      `students/${student.id}/department`,
      '',
      null
    );
    if (departmentResponse.data && departmentResponse.status === 200) {
      setDepartment(departmentResponse.data);
    } else {
      console.log('student department error');
    }

    const response = await callApi(`students/${student.id}/dorm`, '', null);
    if (response.data && response.status === 200) {
      setDormRegistration(response.data);
    } else {
      setDormRegistration(null);
      console.log('');
    }

    const classResponse = await callApi(
      `students/${student.id}/class`,
      '',
      null
    );
    if (classResponse.data && classResponse.status === 200) {
      setClasss(classResponse.data);
    } else {
      console.log('student class error');
    }
  };

  const handleCheckoutFile = (event) => {
    setCheckoutDoc(event.target.files[0]);
  };

  useEffect(() => {
    if (student) fetchStudentEnrollments();
  }, [student]);

  const handleStudentDormDismissal = async (values) => {
    console.log('inside dismissal function');
    const formData = new FormData();
    formData.append('checkout_date', values.checkoutDate);
    formData.append('checkout_proof', checkoutDoc);
    console.log('checkoutDocument', checkoutDoc);
    const response = await callApi(
      `students/${student.id}/dorm/checkout`,
      'POST',
      formData
    );

    if (response?.status === 200) {
      createNotification('success', 'filled');
    } else {
      createNotification('error', 'filled');
      setStudent(null);
      setIsNext(!isNext);
    }

    console.log(response);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="student.dismissalFromDormTitle" />}
        </h3>
        <CardBody>
          {!successMessage ? (
            <div>
              {isNext ? (
                <div>
                  <Row className="justify-content-center inlineBlock">
                    <Colxx style={{ paddingInline: '3%' }}>
                      <Formik
                        initialValues={initialValues}
                        onSubmit={handleRegister}
                        // validationSchema={SignupSchema}
                      >
                        {({
                          errors,
                          touched,
                          values,
                          setFieldTouched,
                          setFieldValue,
                        }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <Label>
                              <IntlMessages id="search.studentIdSearchLabel" />
                            </Label>
                            <div class="input-group mb-3">
                              <div class="input-group-prepend">
                                <button
                                  class="btn btn-outline-secondary"
                                  type="submit"
                                >
                                  <IntlMessages id="search.studentId" />
                                </button>
                              </div>
                              <Field
                                type="text"
                                class="form-control"
                                name="student_id"
                                value={values.student_id}
                              />
                            </div>
                          </Form>
                        )}
                      </Formik>

                      {student ? (
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
                                src={student.photo}
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
                                      {/* <IntlMessages id="teacher.NameLabel" /> */}
                                      د شاگرد ایدی / ایدی شاگرد
                                    </Label>
                                    <h3>{student.student_id}</h3>
                                    <Label>
                                      <IntlMessages id="teacher.NameLabel" />
                                    </Label>
                                    <h3>
                                      {student.student_name +
                                        '  ' +
                                        student.last_name}
                                    </h3>
                                    <Label>
                                      <IntlMessages id="teacher.FatherNameLabel" />
                                    </Label>
                                    <h3>{student.father_name}</h3>
                                    <Label>
                                      <IntlMessages id="teacher.PhoneNoLabel" />
                                    </Label>
                                    <h3>{student.phone_number}</h3>
                                    <Label>
                                      {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                      دایمی ادرس / ادرس دایمی
                                    </Label>
                                    <h3>
                                      {student.main_province +
                                        ' - ' +
                                        student.main_district +
                                        ' - ' +
                                        student.main_village}
                                    </h3>
                                    <Label>
                                      {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                      اوسنی ادرس / ادرس فعلی
                                    </Label>
                                    <h3>
                                      {student.current_province +
                                        ' - ' +
                                        student.current_district +
                                        ' - ' +
                                        student.current_village}
                                    </h3>
                                  </Colxx>
                                  {institute &&
                                    classs &&
                                    department &&
                                    dormRegistration && (
                                      <Colxx className="p-5 border rounded">
                                        <Label>
                                          <IntlMessages id="forms.InstituteLabel" />
                                        </Label>
                                        <h3>{institute.institute.name}</h3>
                                        <Label>لیلیه</Label>
                                        <h3>{dormRegistration.dorm.name}</h3>
                                        <Label></Label>
                                        <Label>د انستیوت ادرس</Label>
                                        <h3>
                                          {institute.institute.province
                                            .native_name +
                                            ' - ' +
                                            institute.institute.district
                                              .native_name +
                                            ' - ' +
                                            institute.institute.village}
                                        </h3>
                                        <Label>
                                          <IntlMessages id="forms.FieldLabel" />
                                        </Label>
                                        <h3>{department.department.name}</h3>
                                        <Label>
                                          <IntlMessages id="marks.ClassLabel" />
                                        </Label>
                                        <h3>{classs.classs.name}</h3>
                                        <Label>
                                          <IntlMessages id="field.SemesterLabel" />
                                        </Label>
                                        <h3>{classs.classs.semester}</h3>
                                      </Colxx>
                                    )}
                                </Row>
                                <Row>
                                  <Colxx>
                                    <Button
                                      onClick={() => handleClick(false)}
                                      className="float-right m-5  "
                                      style={{
                                        paddingInline: '30px',
                                      }}
                                    >
                                      <IntlMessages id="forms.ConfirmButton" />
                                    </Button>
                                  </Colxx>
                                </Row>
                              </div>
                            </Colxx>
                          </Row>
                        </div>
                      ) : (
                        <div>
                          <Label>
                            <h6 className="mt-5 m-5">
                              {<IntlMessages id="dorm.SearchResult" />}
                            </h6>
                          </Label>
                          <Row className="justify-content-center mb-5">
                            <Colxx xxs="6">
                              <h5 className="m-5">
                                <IntlMessages id="forms.NoData" />
                              </h5>
                            </Colxx>
                          </Row>
                        </div>
                      )}
                    </Colxx>
                  </Row>
                </div>
              ) : (
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleStudentDormDismissal}
                  // validationSchema={SignupSchema}
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-bottom">
                      <div>
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
                                  name="checkoutDate"
                                  type="date"
                                />
                                {errors.checkoutDate && touched.checkoutDate ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.checkoutDate}
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
                                    name="checkoutDocument"
                                    onChange={handleCheckoutFile}
                                  />
                                </InputGroup>
                                {errors.checkoutDocument &&
                                touched.checkoutDocument ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.checkoutDocument}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                            <Button
                              onClick={() => handleClick(true)}
                              className="m-2 m-5"
                            >
                              شاته/ عقب
                            </Button>
                            <Button
                              style={{
                                paddingInline: '30px',
                              }}
                              className="float-right m-2 mt-5"
                              type="submit"
                              // onSubmit={handleSubmit}
                              // onClick={}
                            >
                              {<IntlMessages id="forms.SubimssionButton" />}
                            </Button>
                          </Colxx>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
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
                  onClick={() => {
                    setSuccessMessage(false);
                    setIsNext(true);
                  }}
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

export default StudentsDismissal;
