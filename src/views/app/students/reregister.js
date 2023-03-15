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
import Institues from '../institutes';

const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/`;
const studentSearchApiUrl = `${servicePath}/api/student_accademic/`;
const studentTranferApiUrl = `${servicePath}/api/student-transfer/`;

const instituteOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
];

const options = [
  { value: '1', label: 'rozana' },
  { value: '2', label: 'shabana' },
];

const StudentsRergister = (values) => {
  const [studentId, setStudentId] = useState('');
  const [student, setStudent] = useState('');
  const [data, setData] = useState(false);
  const [message, setMessage] = useState('');
  const [isNext, setIsNext] = useState(true);
  const [institutes, setInstitutes] = useState();

  const SearchResultSchema = Yup.object().shape({
    searchfield: Yup.string()
      .min(4, <IntlMessages id="min.invalidId" />)
      .max(10, <IntlMessages id="max.invalidId" />)
      .required(<IntlMessages id="search.studentIdsearchErr" />),
  });

  const dismissalSchema = Yup.object().shape({
    newDepartment: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="teacher.departmentIdErr" />),

    newInstitute: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="forms.InstituteErr" />),

    newField: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="forms.FieldErr" />),

    studyTime: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="forms.StudyTimeErr" />),

    newClass: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="forms.classErr" />),

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
    newDepartment: [],
    newClass: [],
    newInstitute: [],
    newField: [],
    studyTime: [],
  };

  const handleClick = (event) => {
    setIsNext(event);
    setData(true);
  };

  const [searchResult, setSearchResult] = useState(true);
  const [studentIdMatch, setStudentIdMatch] = useState(false);

  const handleSearch = (event, values) => {
    setSearchResult(event);
    studentId === 'abcc' ? setStudentIdMatch(true) : setStudentIdMatch(false);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">{<IntlMessages id="student.reregister" />}</h3>
        <CardBody>
          {isNext ? (
            <>
              {searchResult ? (
                <Row className="justify-content-center inlineBlock">
                  <Colxx>
                    <Formik
                      initialValues={initialValues}
                      //   onSubmit={searhResult}
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
                                  <Label>
                                    <IntlMessages id="student.currentStatus" />
                                  </Label>
                                  <h3 className="text-danger">منفک</h3>
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
                                      <IntlMessages id="student.buttonReregister" />
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
                //   onSubmit={searhResult}
                // validationSchema={dismissalSchema}
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
                    style={{ height: '700px' }}
                  >
                    <Row className="mb-4 justify-content-center">
                      <Colxx xxs="8">
                        <div className=" p-3">
                          {/* Institutes */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.newIstituteLabel" />
                            </Label>
                            <FormikReactSelect
                              name="newInstitute"
                              id="newInstitute"
                              value={values.newInstitute}
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.newInstitute && touched.newInstitute ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.newInstitute}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Department */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.newDepartmentLabel" />
                            </Label>
                            <FormikReactSelect
                              name="newDepartment"
                              id="newDepartment"
                              value={values.newDepartment}
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.newDepartment && touched.newDepartment ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.newDepartment}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Field */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.newFieldLabel" />
                            </Label>
                            <FormikReactSelect
                              name="newField"
                              id="newField"
                              value={values.newField}
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.newField && touched.newField ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.newField}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/*New Class */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.newClassLabel" />
                            </Label>
                            <FormikReactSelect
                              name="newClass"
                              id="newClass"
                              value={values.newClass}
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.newClass && touched.newClass ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.newClass}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Study Time */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.StudyTimeLabel" />
                            </Label>
                            <FormikReactSelect
                              name="studyTime"
                              id="studyTime"
                              value={values.studyTime}
                              placeholder="Select option"
                              options={options}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.studyTime && touched.studyTime ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.studyTime}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Dismissal Date */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="student.reregisterDateLabel" />
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
                              <IntlMessages id="student.reregisterDocuments" />
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
        </CardBody>
      </Card>
    </>
  );
};

export default StudentsRergister;
