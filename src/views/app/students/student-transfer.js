import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import profilePhoto from './../../../assets/img/profiles/22.jpg';
import axios from 'axios';

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

const educationYears = [
  { value: '12', label: <IntlMessages id="forms.educationalYearOption_12" /> },
  { value: '13', label: <IntlMessages id="forms.educationalYearOption_13" /> },
  { value: '14', label: <IntlMessages id="forms.educationalYearOption_14" /> },
  { value: '15', label: <IntlMessages id="forms.educationalYearOption_15" /> },
  { value: '16', label: <IntlMessages id="forms.educationalYearOption_16" /> },
  { value: '17', label: <IntlMessages id="forms.educationalYearOption_17" /> },
  { value: '18', label: <IntlMessages id="forms.educationalYearOption_18" /> },
  { value: '19', label: <IntlMessages id="forms.educationalYearOption_19" /> },
  { value: '20', label: <IntlMessages id="forms.educationalYearOption_20" /> },
  { value: '21', label: <IntlMessages id="forms.educationalYearOption_21" /> },
  { value: '22', label: <IntlMessages id="forms.educationalYearOption_22" /> },
  { value: '23', label: <IntlMessages id="forms.educationalYearOption_23" /> },
  { value: '24', label: <IntlMessages id="forms.educationalYearOption_24" /> },
  { value: '25', label: <IntlMessages id="forms.educationalYearOption_25" /> },
  { value: '26', label: <IntlMessages id="forms.educationalYearOption_26" /> },
  { value: '27', label: <IntlMessages id="forms.educationalYearOption_27" /> },
  { value: '28', label: <IntlMessages id="forms.educationalYearOption_28" /> },
  { value: '29', label: <IntlMessages id="forms.educationalYearOption_29" /> },
  { value: '30', label: <IntlMessages id="forms.educationalYearOption_30" /> },
  { value: '31', label: <IntlMessages id="forms.educationalYearOption_31" /> },
  { value: '31', label: <IntlMessages id="forms.educationalYearOption_32" /> },
  { value: '32', label: <IntlMessages id="forms.educationalYearOption_33" /> },
  { value: '33', label: <IntlMessages id="forms.educationalYearOption_34" /> },
  { value: '34', label: <IntlMessages id="forms.educationalYearOption_35" /> },
  { value: '35', label: <IntlMessages id="forms.educationalYearOption_36" /> },
];

const StudyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];

const mediumOfInstructionOptions = [
  {
    value: '1',
    label: <IntlMessages id="forms.mediumOfInstructionOption_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="forms.mediumOfInstructionOption_2" />,
  },
  {
    value: '3',
    label: <IntlMessages id="forms.mediumOfInstructionOption_3" />,
  },
  {
    value: '4',
    label: <IntlMessages id="forms.mediumOfInstructionOption_4" />,
  },
];

const SearchResultSchema = Yup.object().shape({
  searchfield: Yup.string()
    .min(4, <IntlMessages id="min.invalidId" />)
    .max(10, <IntlMessages id="max.invalidId" />)
    .required(<IntlMessages id="search.studentIdsearchErr" />),
});

const transferSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  transferDate: Yup.string().required(
    <IntlMessages id="teacher.transferDateErr" />
  ),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.educationYearErr" />),

  mediumOfInstruction: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.mediumOfInstructionErr" />),

  studyTime: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudyTimeErr" />),

  // transferDocument: Yup.string().required(
  //   <IntlMessages id="student.dissmissalDocumentErr" />
  // ),
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

  const handleSearch = async (event, values) => {
    setSearchResult(event);
    //search student in the server
    const response = await axios.get(
      `${studentSearchApiUrl}?student_id=${studentId}`
    );
    const studentResponse = await response.data;
    console.log(studentId, 'student IDDD');
    console.log(values, 'student Input Id');
    studentId == studentResponse.student_id
      ? setStudentIdMatch(true)
      : setStudentIdMatch(false);
    if (studentResponse) {
      setStudent(studentResponse);
      setData(true);
    } else {
      setMessage('Student not found');
    }
  };
  // const handleChange = (event) => {
  //   setMessage(event.target.value);
  // };

  const fetchInstitutes = async () => {
    const response = await axios.get(instituteApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
    console.log('updatedData', updatedData);
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);
  const onSubmit = (values) => {
    setReload(true);
    console.log('values.institute.value', values.institute.id);
    //is_transfer = 2 means transfered
    data = {
      student_id: studentId,
      institute_id: values.institute.id,
      transfer_date: values.transferDate,
      educational_year: values.educationalYear,
      time: values.shif.value, //shift
      language: values.language,
      is_transfer: 2,
    };
    //transfer student
    axios
      .post(`${studentTranferApiUrl}`, {
        data,
      })
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

  return (
    <Card className="card">
      <h3 className="mt-5 m-5">
        {<IntlMessages id="student.transferTitle" />}
      </h3>
      <h3 className="text-center">
        {' '}
        Mr Hanif Complete the Integration And Check Why its going to the student
        record if we enter the correct id for first time and incorrect for the
        second time 
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
                                    values.searchfield.length > 3
                                      ? () => handleSearch(false)
                                      : ''
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
                                onKeyUp={() => setStudentId(values.searchfield)}
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
                                    <h3>انتگریت گردد</h3>
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
                            <Colxx xxs="12" className="justify-content-center">
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
                  validationSchema={transferSchema}
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right error-l-150 ">
                      <Row className="mb-4 justify-content-center">
                        <Colxx xxs="8">
                          <div className=" p-3">
                            <h6 className=" mb-4">
                              {
                                <IntlMessages id="teacher.TransferNewInfoTittle" />
                              }
                            </h6>

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

                            {/* transferDate */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="student.transferDateLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="transferDate"
                                type="date"
                              />
                              {errors.transferDate && touched.transferDate ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.transferDate}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* educationalYear */}
                            <FormGroup className="form-group has-float-label  error-l-150 ">
                              <Label>
                                <IntlMessages id="curriculum.eduactionalYearLabel" />
                              </Label>
                              <FormikReactSelect
                                name="educationalYear"
                                id="educationalYear"
                                value={values.educationalYear}
                                options={educationYears}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.educationalYear &&
                              touched.educationalYear ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.educationalYear}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* medium OfInstruction (Teaching Language) */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.mediumOfInstruction" />
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
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.mediumOfInstruction}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Study Time */}
                            <FormGroup className="form-group has-float-label error-l-150">
                              <Label>
                                <IntlMessages id="forms.StudyTimeLabel" />
                              </Label>
                              <FormikReactSelect
                                name="studyTime"
                                id="studyTime"
                                value={values.studyTime}
                                options={StudyTimeOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.studyTime && touched.studyTime ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.studyTime}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup>
                              <Label>
                                <IntlMessages id="student.transferDocuments" />
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
                                <div className="invalid-feedback d-block bg-danger text-white">
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
                            className="float-right m-5 "
                            size="lg"
                            type="submit"
                            color="primary"
                            // onClick={() => setReload(true)}
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
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
