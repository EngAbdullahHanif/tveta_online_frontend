import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import profilePhoto from './../../../assets/img/profiles/22.jpg';
import { educationalYearsOptions } from '../global-data/options';
import { studyTimeOptions } from '../global-data/options';
import { mediumOfInstructionOptions } from '../global-data/options';
import axios from 'axios';
import callApi from 'helpers/callApi';
import { NotificationManager } from 'components/common/react-notifications';
import './../../../assets/css/global-style.css';
import { studentTransferValidationSchema } from './../global-data/forms-validation';

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

const SearchResultSchema = Yup.object().shape({
  searchfield: Yup.string()
    .min(4, <IntlMessages id="min.invalidId" />)
    .max(10, <IntlMessages id="max.invalidId" />)
    .required(<IntlMessages id="search.studentIdsearchErr" />),
});

const StudentsTransfer = (values) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [data, setData] = useState(false);
  const [message, setMessage] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState();
  const [isLoad, SetIsLoad] = useState();

  const initialValues = {
    institute: [],
    searchfield: '',
    transferDate: '',
    educationalYear: [],
    mediumOfInstruction: [],
    studyTime: [],
    transferDocument: '',
  };

  const handleClick = (event) => {
    setIsNext(event);
    setData(true);
  };
  const [searchResult, setSearchResult] = useState(true);
  const [studentIdMatch, setStudentIdMatch] = useState(false);
  const [reload, setReload] = useState(false);
  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'زده کوونکی په بریالیتوب سره تبدیل شو',
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
          'زده کوونکی تبدیل نشو بیا کوشش وکری',
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

  const handleSearch = async (values) => {
    setSearchResult(false);
    const response = await callApi(
      `students/student_accademic/?student_id=${values.searchfield}`,
      '',
      null
    );
    if (response && response.status === 200) {
      setStudentIdMatch(true);
      if (response) {
        console.log('response of student search', response);
        setStudent(response.data);
        // setData(true);
        // setSearchResult(true);
      } else {
        setMessage('Student not found');
      }
    } else {
      console.log('student search error');
    }
  };

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
  const onSubmit = async (values) => {
    // setReload(true);
    const data = {
      student: student.id,
      institute: values.institute.value,
      transfer_date: values.transferDate,
      educational_year: values.educationalYear.value,
      shift: values.studyTime.value, //shift
      language: values.mediumOfInstruction.value,
      type: 'inprogress', //type = 1 means this is student new institute, the old institute type is now 2 which means old institute
      is_transfer: true, //is_transfer = 2 means transfered
    };

    try {
      const response = await callApi(
        `students/student-transfer/`,
        'POST',
        data
      );
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

  return (
    <Card className="card">
      <div className="mt-4 ml-5">
        <h2 className=" m-5  titleStyle">
          {<IntlMessages id="student.transferTitle" />}
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
                            style={{ height: '300px' }}
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
                                  onClick={() => setSearchResult(true)}
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
                                  <Colxx className=" p-5  border rounded">
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
                                      onClick={() => handleSearch(true)}
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
                                        <IntlMessages id="student.buttonTransfer" />
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
                )}
              </>
            ) : (
              <>
                <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={studentTransferValidationSchema}
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right error-l-150 style">
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
                                <span style={{ color: 'red' }}>*</span>
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
                                <IntlMessages id="student.transferDateLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="transferDate"
                                placeholder="1399/01/01"
                              />
                              {errors.transferDate && touched.transferDate ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.transferDate}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* educationalYear */}
                            <FormGroup className="form-group has-float-label  error-l-150 ">
                              <Label>
                                <IntlMessages id="curriculum.eduactionalYearLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="educationalYear"
                                id="educationalYear"
                                value={values.educationalYear}
                                options={educationalYearsOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.educationalYear &&
                              touched.educationalYear ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.educationalYear}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* medium OfInstruction (Teaching Language) */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.mediumOfInstruction" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="mediumOfInstruction"
                                id="mediumOfInstruction"
                                value={values.mediumOfInstruction}
                                options={mediumOfInstructionOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.mediumOfInstruction &&
                              touched.mediumOfInstruction ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.mediumOfInstruction}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Study Time */}
                            <FormGroup className="form-group has-float-label error-l-150">
                              <Label>
                                <IntlMessages id="forms.StudyTimeLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="studyTime"
                                id="studyTime"
                                value={values.studyTime}
                                options={studyTimeOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.studyTime && touched.studyTime ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.studyTime}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup>
                              <Label>
                                <IntlMessages id="student.transferDocuments" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                  آپلود
                                </InputGroupAddon>
                                <CustomInput
                                  type="file"
                                  id="exampleCustomFileBrowser1"
                                  name="transferDocument"
                                />
                              </InputGroup>
                              {errors.transferDocument &&
                              touched.transferDocument ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.transferDocument}
                                </div>
                              ) : null}
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
                              <IntlMessages id="forms.SubimssionButton" />
                            </span>
                          </Button>
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
  );
};

export default StudentsTransfer;
