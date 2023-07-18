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

const StudentsDismissal = (values) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [institute, setInstitute] = useState([]);
  const [department, setDepartment] = useState([]);
  const [classs, setClasss] = useState([]); //classs is used because class is a reserved word
  const [data, setData] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState();

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
    dismissalDocument: Yup.string().required(
      <IntlMessages id="student.dissmissalDocumentErr" />
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
  const handleChange = (event) => {
    console.log('event sadfsdf', event.target.value);
    setStudentId(event.target.value);
  };
  const handleSearch = async () => {
    const response = await callApi(
      `students/?student_id=${studentId}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      console.log('dissmiss student ', response.data.results);
      setStudent(response.data.results);
    } else {
      console.log('student error');
    }

    const instituteResponse = await callApi(
      `students/student_institutes/?student=${studentId}`,
      '',
      null
    );
    if (instituteResponse.data && instituteResponse.status === 200) {
      setInstitute(instituteResponse.data);
    } else {
      console.log('student institute error');
    }

    const departmentResponse = await callApi(
      `students/student_Departments/?student=${studentId}`,
      '',
      null
    );
    if (departmentResponse.data && departmentResponse.status === 200) {
      setDepartment(departmentResponse.data);
    } else {
      console.log('student department error');
    }

    const classResponse = await callApi(
      `students/student_class/?student=${studentId}`,
      '',
      null
    );
    if (classResponse.data && classResponse.status === 200) {
      setClasss(classResponse.data);
    } else {
      console.log('student class error');
    }

    console.log('Institute', institute);
    console.log('deparment', classs);
  };

  const handleRegister = async (values) => {
    console.log('values', values);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="student.dismissalFromDormTitle" />}
        </h3>
        <CardBody>
          {!successMessage ? (
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
                  {isNext ? (
                    <div>
                      {' '}
                      <Row className="justify-content-center inlineBlock">
                        <Label>
                          <IntlMessages id="search.studentIdSearchLabel" />
                        </Label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                              onClick={handleSearch}
                            >
                              <IntlMessages id="search.studentId" />
                            </button>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            placeholder=""
                            aria-label=""
                            aria-describedby="basic-addon1"
                            onChange={handleChange}
                          />
                        </div>

                        <Colxx style={{ paddingInline: '3%' }}>
                          {student.length > 0 ? (
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
                                    src={profilePhoto}
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
                                        <h3>{student[0].student_id}</h3>
                                        <Label>
                                          <IntlMessages id="teacher.NameLabel" />
                                        </Label>
                                        <h3>
                                          {student[0].name +
                                            '  ' +
                                            student[0].last_name}
                                        </h3>
                                        <Label>
                                          <IntlMessages id="teacher.FatherNameLabel" />
                                        </Label>
                                        <h3>{student[0].father_name}</h3>
                                        <Label>
                                          <IntlMessages id="teacher.PhoneNoLabel" />
                                        </Label>
                                        <h3>{student[0].phone_number}</h3>
                                        <Label>
                                          {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                          دایمی ادرس / ادرس دایمی
                                        </Label>
                                        <h3>
                                          {student[0].main_province.name +
                                            ' - ' +
                                            student[0].main_district.name +
                                            ' - ' +
                                            student[0].main_village}
                                        </h3>
                                        <Label>
                                          {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                          اوسنی ادرس / ادرس فعلی
                                        </Label>
                                        <h3>
                                          {student[0].main_province.name +
                                            ' - ' +
                                            student[0].main_district.name +
                                            ' - ' +
                                            student[0].main_village}
                                        </h3>
                                      </Colxx>
                                      {institute.length > 0 &&
                                        classs.length > 0 &&
                                        department.length > 0 && (
                                          <Colxx className="p-5 border rounded">
                                            <Label>
                                              <IntlMessages id="forms.InstituteLabel" />
                                            </Label>
                                            <h3>
                                              {institute[0].institute.name}
                                            </h3>
                                            <Label>د انستیوت ادرس</Label>
                                            <h3>
                                              {institute[0].institute.province
                                                .name +
                                                ' - ' +
                                                institute[0].institute.district
                                                  .name +
                                                ' - ' +
                                                institute[0].institute.village}
                                            </h3>
                                            <Label>
                                              <IntlMessages id="forms.FieldLabel" />
                                            </Label>
                                            <h3>
                                              {department[0].department.name}
                                            </h3>
                                            <Label>
                                              <IntlMessages id="marks.ClassLabel" />
                                            </Label>
                                            <h3>{classs[0].classs.name}</h3>
                                            <Label>
                                              <IntlMessages id="field.SemesterLabel" />
                                            </Label>
                                            <h3>{classs[0].classs.semester}</h3>
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
                                name="dismissalDate"
                                type="date"
                              />
                              {errors.dismissalDate && touched.dismissalDate ? (
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
                  )}
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
