import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../../dorms/dorm-register.css';
import profilePhoto from './../../../../../src/assets/img/profiles/22.jpg';

import * as Yup from 'yup';
import axios from 'axios';

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
  InputGroup,
  InputGroupAddon,
  CustomInput,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/`;
const fieldsApiUrl = `${servicePath}/institute/field/`;
const teacherSearchApiUrl = `${servicePath}/teachers/institute/`;
const teacherTranferApiUrl = `${servicePath}/teachers/institute-create/`;

const instituteOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
];

const ValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  transferDate: Yup.string().required(
    <IntlMessages id="teacher.transferDateErr" />
  ),
});

const initialValues = {
  institute: [],
  transferDate: '',
  transferDoc: [],
};

const appointmentTypeOptions = [
  {
    value: '1',
    label: <IntlMessages id="teacher.appointmentTOptions_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="teacher.appointmentTOptions_2" />,
  },
];

const contractTypeOptions = [
  {
    value: '1',
    label: <IntlMessages id="teacher.contractTypeOptions_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="teacher.contractTypeOptions_2" />,
  },
];

const TeacherTransfer = (values) => {
  const [data, setData] = useState(false);
  const [teacherId, setTeacherId] = useState();
  const [teacher, setTeacher] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState([]);
  const [fields, setFields] = useState([]);

  const fetchInstitutes = async () => {
    const response = await axios.get('http://localhost:8000/institute/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };

  const fetchFields = async () => {
    const response = await axios.get('http://localhost:8000/institute/field/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setFields(updatedData);
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
  }, []);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const handleSearch = async () => {
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

  console.log(message, 'Message');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  const onSubmit = (values) => {
    //is_transfer = 1 means transfered
    //type = 1 means current job, not old
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
      // teacher_documents: values.transferDoc, //uncomment when file transfer is done
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
        <h3 className="mt-5 m-5">
          {<IntlMessages id="treacher.TansferTitle" />}
        </h3>
        <CardBody>
          {isNext ? (
            <div>
              {' '}
              <Row className="justify-content-center inlineBlock">
                <Label>
                  <IntlMessages id="search.teacherIdSearchLabel" />
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
                    onChange={(e) => setTeacherId(e.target.value)}
                  />
                </div>

                <Colxx style={{ paddingInline: '3%' }}>
                  {data ? (
                    <div className="border rounded">
                      <Label>
                        <h6 className="mt-5 m-5">
                          {<IntlMessages id="dorm.SearchResult" />}
                        </h6>
                      </Label>{' '}
                      <Row>
                        <Colxx xxs="1"></Colxx>

                        <Colxx>
                          <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx>
                          <div>
                            <Row className="justify-content-center border border-primary rounded m-5">
                              <Colxx className=" p-5  border rounded" xxs="">
                                <Label>
                                  <IntlMessages id="teacher.NameLabel" />
                                </Label>
                                <h3>{teacher[0].teacher_id.name}</h3>
                                <Label>
                                  <IntlMessages id="teacher.FatherNameLabel" />
                                </Label>
                                <h3>{teacher[0].teacher_id.father_name}</h3>
                                <Label>
                                  <IntlMessages id="teacher.PhoneNoLabel" />
                                </Label>
                                <h3>{teacher[0].teacher_id.phone_number}</h3>
                                <Label>
                                  <IntlMessages id="teacher.EmailLabel" />
                                </Label>
                                <h3>{teacher[0].teacher_id.email}</h3>

                                <Label>
                                  {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                  Tazkira registration_number
                                </Label>
                                <h3>
                                  {teacher[0].teacher_id.registration_number}
                                </h3>
                                <Label>
                                  <IntlMessages id="forms.InstituteLabel" />
                                </Label>
                                <h3>{teacher[0].institute_id.name}</h3>
                                <Label>
                                  {/* <IntlMessages id="marks.ClassLabel" /> */}
                                  Major
                                </Label>
                                <h3>{teacher[0].teacher_id.major}</h3>
                              </Colxx>
                              <Colxx className="p-5 border rounded">
                                <Label>
                                  {/* <IntlMessages id="field.SemesterLabel" /> */}
                                  Grade
                                </Label>

                                <h3>{teacher[0].teacher_id.grade}</h3>
                                <Label>
                                  {/* <IntlMessages id="forms.FieldLabel" /> */}
                                  Step
                                </Label>
                                <h3>{teacher[0].teacher_id.step}</h3>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx>
                                <Button
                                  onClick={() => handleClick(false)}
                                  className="float-right m-5 "
                                  color="primary"
                                  style={{
                                    paddingInline: '30px',
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
                    <div
                      className={message == '' ? 'd-none' : 'border rounded'}
                    >
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
              onSubmit={onSubmit}
              // validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-150 ">
                  <div>
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
                              <IntlMessages id="teacher.transferDateLabel" />
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

                          {/* major */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              {/* <IntlMessages id="student.transferDateLabel" /> */}
                              major
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
                              <div className="invalid-feedback d-block">
                                {errors.major}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* language */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              {/* <IntlMessages id="student.transferDateLabel" /> */}
                              teaching language
                            </Label>
                            <Field
                              className="form-control"
                              name="language"
                              type="number"
                            />
                            {errors.language && touched.language ? (
                              <div className="invalid-feedback d-block">
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
                              required
                            />
                            {errors.appointmentType && !AppointmentType ? (
                              <div className="invalid-feedback d-block bg-danger text-white ">
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
                              required
                            />
                            {errors.contractType && !ContractType ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.contractType}
                              </div>
                            ) : null}
                          </FormGroup>

                          <FormGroup>
                            <Label>
                              <IntlMessages id="teacher.transferDocuments" />
                            </Label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                {/* <IntlMessages id="teacher.fileUploadBttn" /> */}
                                آپلود
                              </InputGroupAddon>
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="transferDoc"
                              />
                            </InputGroup>
                          </FormGroup>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx>
                        <Button
                          style={{ marginLeft: '34%' }}
                          color="primary"
                          className="float-right mb-5 "
                          size="lg"
                          onClick={() => {
                            handleClick(true);
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
                      <Colxx>
                        <Button
                          style={{ marginLeft: '38%' }}
                          color="primary"
                          className="float-right mb-5 "
                          size="lg"
                          type="submit"
                          onClick={() => {
                            handleClick(false);
                          }}
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
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherTransfer;
