import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import './../../dorms/dorm-register.css';
import profilePhoto from './../../../../../src/assets/img/profiles/22.jpg';
import { appointmentTypeOptions } from '../../global-data/options';
import { contractTypeOptions } from '../../global-data/options';
import { teacherTransferValidationSchema } from '../../global-data/forms-validation';
import './../../../../assets/css/global-style.css';
import * as Yup from 'yup';
import axios from 'axios';
import callApi from 'helpers/callApi';
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
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/`;
const fieldsApiUrl = `${servicePath}/institute/field/`;
const teacherSearchApiUrl = `${servicePath}/teachers/institute/`;
const teacherTranferApiUrl = `${servicePath}/teachers/institute-create/`;

const instituteOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
];

const initialValues = {
  institute: [],
  transferDate: '',
  major: [],
  language: '',
  transferDoc: [],
  appointmentType: [],
  contractType: [],
  transferDoc: undefined,
};

const TeacherTransfer = (values) => {
  const [data, setData] = useState(false);
  const [teacherId, setTeacherId] = useState();
  const [teacher, setTeacher] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState([]);
  const [fields, setFields] = useState([]);
  const [searchResult, setSearchResult] = useState(true);

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
  const fetchFields = async () => {
    const response = await callApi('institute/field/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setFields(updatedData);
    } else {
      console.log('field error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
  }, []);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const handleSearch = async (event) => {
    setSearchResult(event);
    //search teacher in the server
    const response = await axios.get(
      `${teacherSearchApiUrl}?teacher_id=${teacherId}`
    );
    const teacherResponse = await response.data;

    if (teacherResponse) {
      setTeacher(teacherResponse);
      setData(true);
    } else {
      setMessage('Teacher not found');
    }
  };

  const [message, setMessage] = useState('');
  const [reload, setReload] = useState(false);
  const [teacherIdMatch, setTeacherIdMatch] = useState(false);

  console.log(message, 'Message');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const onSubmit = (values) => {
    //is_transfer = 1 means transfered
    setReload(true);
    const data = {
      teacher_id: teacherId,
      institute_id: values.institute.value,
      current_major: values.major.value,
      type: 1,
      is_transfer: 2,
      teacher_language: values.language,
      job_type: values.appointmentType.value,
      contract_type: values.contractType.value,
      hire_date: values.transferDate,
      user_id: 1,
    };
    console.log('data', data);
    //transfer teacher
    axios
      .post(`${teacherTranferApiUrl}`, data)
      .then((response) => {
        console.log(response, 'response');
        if (response.status === 201) {
          console.log('success');
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };
  console.log('institutes', institutes);
  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className="m-5  titleStyle">
            {<IntlMessages id="teacher.Transfer" />}
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
                          // validationSchema={SearchResultSchema}
                        >
                          {({
                            errors,
                            touched,
                            values,
                            setFieldTouched,
                            setFieldValue,
                          }) => (
                            <Form
                              className="av-tooltip tooltip-label-bottom style"
                              style={{ minHeight: '300px' }}
                            >
                              <Label>
                                <IntlMessages id="search.teacherIdSearchLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <div class="input-group mb-3 error-l-175 ">
                                <div class="input-group-prepend">
                                  <Button
                                    size="lg"
                                    style={{ fontSize: '80%' }}
                                    type="submit"
                                    color="primary"
                                    onClick={() => handleSearch(false)}
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
                                  className="form-control fieldStyle "
                                  name="searchfield"
                                  type="text"
                                  onKeyUp={(e) => setTeacherId(e.target.value)}
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
                        {!teacherIdMatch ? (
                          <div>
                            <Label>
                              <h1 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h1>
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
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.NameLabel" />
                                      </Label>
                                      <h2>
                                        {/* <h3>{teacher[0].teacher_id.name}</h3> */}
                                        TeacherName
                                      </h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.FatherNameLabel" />
                                      </Label>
                                      <h2>
                                        {/* {teacher[0].teacher_id.father_name} */}
                                        TeacherFatherName
                                      </h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.PhoneNoLabel" />
                                      </Label>
                                      <h2>
                                        {/* {teacher[0].teacher_id.phone_number} */}
                                        TeacherPhoneNo
                                      </h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.EmailLabel" />
                                      </Label>
                                      <h2>
                                        {/* <h3>{teacher[0].teacher_id.email}</h3> */}
                                        TeacherEmail
                                      </h2>
                                      <Label className="data-style">
                                        <IntlMessages id="forms.StdTazkiraNoLabel" />
                                      </Label>
                                      <h2>
                                        {/* {
                                          teacher[0].teacher_id
                                            .registration_number
                                        } */}
                                        430543j
                                      </h2>
                                    </Colxx>
                                    <Colxx className="p-5 border rounded">
                                      <Label className="data-style">
                                        <IntlMessages id="forms.InstituteLabel" />
                                      </Label>
                                      {/* <h3>{teacher[0].institute_id.name}</h3> */}
                                      <h2>Insitute Name</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="marks.ClassLabel" />
                                      </Label>
                                      <h2>institute Class</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.MajorLabel" />
                                      </Label>
                                      {/* <h3>{teacher[0].teacher_id.major}</h3> */}
                                      <h2>major</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.GradeLabel" />
                                      </Label>
                                      {/* <h3>{teacher[0].teacher_id.grade}</h3> */}
                                      <h2>Grade</h2>
                                      <Label className="data-style">
                                        <IntlMessages id="teacher.StepLabel" />
                                      </Label>
                                      {/* <h3>{teacher[0].teacher_id.step}</h3> */}
                                      <h2>Step</h2>
                                    </Colxx>
                                  </Row>
                                  <Row>
                                    <Colxx>
                                      <Button
                                        onClick={() => handleSearch(true)}
                                        color="primary"
                                        className="buttonStyle1"
                                        size="lg"
                                        type="submit"
                                        style={{
                                          margin: '5% 15% 15% 8%',
                                          paddingInline: '8%',
                                        }}
                                      >
                                        <IntlMessages id="button.Back" />
                                      </Button>
                                    </Colxx>
                                    <Colxx>
                                      <Button
                                        onClick={() => handleClick(false)}
                                        color="primary"
                                        className=" float-right buttonStyle1"
                                        size="lg"
                                        type="submit"
                                        style={{
                                          margin: '5% 0% 15% 15%',
                                          paddingInline: '10%',
                                        }}
                                      >
                                        <IntlMessages id="button.Teacher-transfer" />
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
                                  <IntlMessages id="forms.NoData" />
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
                    // </div>
                  )}
                </>
              ) : (
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={teacherTransferValidationSchema}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right error-l-175  style">
                      <div>
                        <Row className="mb-4 justify-content-center">
                          <Colxx xxs="8">
                            <div className=" p-3">
                              <h1 className=" mb-4">
                                {
                                  <IntlMessages id="teacher.TransferNewInfoTittle" />
                                }
                              </h1>

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
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.institute}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* transferDate */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.transferDateLabel" />
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="transferDate"
                                  type="date"
                                />
                                {errors.transferDate && touched.transferDate ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.transferDate}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* major */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.MajorLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="major"
                                  id="major"
                                  value={values.major}
                                  options={fields}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.major && touched.major ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.major}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* language */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="forms.mediumOfInstruction" />
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="language"
                                  type="number"
                                />
                                {errors.language && touched.language ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.language}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* appointment type */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.appointmentTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="appointmentType"
                                  id="appointmentType"
                                  value={values.appointmentType}
                                  options={appointmentTypeOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.appointmentType &&
                                touched.appointmentType ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.appointmentType}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* Contract type */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.contractTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="contractType"
                                  id="contractType"
                                  value={values.contractType}
                                  options={contractTypeOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.contractType && touched.contractType ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.contractType}
                                  </div>
                                ) : null}
                              </FormGroup>

                              <FormGroup>
                                <Label>
                                  <IntlMessages id="teacher.transferDocuments" />
                                </Label>
                                <InputGroup className="mb-3 ">
                                  <InputGroupAddon
                                    addonType="prepend"
                                    className="fieldStyle"
                                  >
                                    {/* <IntlMessages id="teacher.fileUploadBttn" /> */}
                                    آپلود
                                  </InputGroupAddon>
                                  <CustomInput
                                    type="file"
                                    id="exampleCustomFileBrowser1"
                                    className="fieldStyle"
                                    name="transferDoc"
                                    onChange={(event) => {
                                      setFieldValue(
                                        'transferDoc',
                                        event.currentTarget.files[0]
                                      );
                                    }}
                                    onBlur={handleBlur}
                                    invalid={
                                      touched.transferDoc && errors.transferDoc
                                    }
                                  />
                                </InputGroup>
                                {errors.transferDoc && touched.transferDoc && (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.transferDoc}
                                  </div>
                                )}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx>
                            <Button
                              color="primary"
                              className=" buttonStyle"
                              size="lg"
                              type="submit"
                              style={{
                                margin: '5% 40% 30% 6%',
                                paddingInline: '5%',
                              }}
                              onClick={() => {
                                handleClick(true);
                              }}
                            >
                              <span className="label">
                                <IntlMessages id="button.Back" />
                              </span>
                            </Button>
                          </Colxx>
                          <Colxx>
                            <Button
                              color="primary"
                              className=" float-right buttonStyle"
                              size="lg"
                              type="submit"
                              style={{
                                margin: '5% 10% 30% 40%',
                                paddingInline: '6%',
                              }}
                            >
                              <span className="label">
                                <IntlMessages id="forms.SubimssionButton" />
                              </span>
                            </Button>
                          </Colxx>
                        </Row>
                      </div>
                    </Form>
                  )}
                </Formik>
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
                  className="m-5 bg-primary buttonStyle1"
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

export default TeacherTransfer;
