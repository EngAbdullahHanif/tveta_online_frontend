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

const shifs = [
  { value: '1', label: 'rozana' },
  { value: '2', label: 'shabana' },
];

const SignupSchema = Yup.object().shape({});

const StudentsTransfer = (values) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [data, setData] = useState(false);
  const [message, setMessage] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState();
  const [isLoad, SetIsLoad] = useState();

  const initialValues = {
    institute: {
      value: '',
      label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    },
  };

  const handleClick = (event) => {
    setIsNext(event);
    setData(true);
  };

  const handleSearch = async () => {
    //search student in the server
    const response = await axios.get(
      `${studentSearchApiUrl}?student_id=${studentId}`
    );
    const studentResponse = await response.data;

    if (studentResponse) {
      setStudent(studentResponse);
      setData(true);
    } else {
      setMessage('Student not found');
    }
  };
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

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
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="student.transferTitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
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
                          onChange={(e) => setStudentId(e.target.value)}
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
                                    <Colxx>
                                      <Button
                                        onClick={() => handleClick(false)}
                                        className="float-right m-5  "
                                        style={{
                                          paddingInline: '30px',
                                        }}
                                      >
                                        <IntlMessages id="student.buttonTransfer" />
                                      </Button>
                                    </Colxx>
                                  </Row>
                                </div>
                              </Colxx>
                            </Row>
                          </div>
                        ) : (
                          <div
                            className={
                              message == '' ? 'd-none' : 'border rounded'
                            }
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
                              <div className="invalid-feedback d-block">
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
                              <div className="invalid-feedback d-block">
                                {errors.transferDate}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* educationalYear */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              {/* <IntlMessages id="student.transferDateLabel" /> */}
                              سال تحصیلی
                            </Label>
                            <Field
                              className="form-control"
                              name="educationalYear"
                              type="number"
                            />
                            {errors.educationalYear &&
                            touched.educationalYear ? (
                              <div className="invalid-feedback d-block">
                                {errors.educationalYear}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* language */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              {/* <IntlMessages id="student.transferDateLabel" /> */}
                              زبان تدریسی
                            </Label>
                            <Field
                              className="form-control"
                              name="language"
                              type="text"
                            />
                            {errors.language && touched.language ? (
                              <div className="invalid-feedback d-block">
                                {errors.language}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* shift */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              {/* <IntlMessages id="forms.StudyTypeLabel" /> */}
                              shift
                            </Label>
                            <FormikReactSelect
                              name="shift"
                              id="shift"
                              value={values.shift}
                              options={shifs}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />

                            {errors.shift && touched.shift ? (
                              <div className="invalid-feedback d-block">
                                {errors.shift}
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
                                name="customFile"
                              />
                            </InputGroup>
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
        </CardBody>
      </Card>
    </>
  );
};

export default StudentsTransfer;
