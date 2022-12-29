import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

// Year  and SHift

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  // Form,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import userEvent from '@testing-library/user-event';

const LevelOfEdcationOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];

const FieldOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const SemesterOptions = [
  { value: '1', label: <IntlMessages id="marks.SemesterOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SemesterOption_2" /> },
  // { value: '3', label: <IntlMessages id="marks.SemesterOption_3" /> },
  //   { value: '4', label: <IntlMessages id="marks.SemesterOption_4" /> },
];

const SectionOptions = [
  { value: '1', label: <IntlMessages id="marks.SectionOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SectionOption_2" /> },
  { value: '3', label: <IntlMessages id="marks.SectionOption_3" /> },
  { value: '4', label: <IntlMessages id="marks.SectionOption_4" /> },
  { value: '5', label: <IntlMessages id="marks.SectionOption_5" /> },
];

const ClassOptions = [
  { value: '1', label: <IntlMessages id="marks.ClassOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.ClassOption_2" /> },
  { value: '3', label: <IntlMessages id="marks.ClassOption_3" /> },
  { value: '4', label: <IntlMessages id="marks.ClassOption_4" /> },
  { value: '5', label: <IntlMessages id="marks.ClassOption_5" /> },
  { value: '6', label: <IntlMessages id="marks.ClassOption_6" /> },
];

const StudyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];

const SubjectOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [10, 20, 40, 80];

const initialValues = {
  Field: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  Semester: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  Section: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  Subject: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  Class: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  StudyTime: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
};

const MarksRegistration = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [inNext, setIsNext] = useState(true);
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selecedStudyTime, setSelectedStudyTime] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');

  const fetchInstitutes = async () => {
    const response = await axios.get('http://localhost:8000/institute/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };
  const fetchFields = async () => {
    const response = await axios.get('http://localhost:8000/institute/filed/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setFields(updatedData);
  };
  const fetchDepartments = async () => {
    const response = await axios.get(
      'http://localhost:8000/institute/department/'
    );
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setDepartments(updatedData);
  };

  const fetchClasses = async () => {
    const response = await axios.get('http://localhost:8000/institute/classs/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name + ' - ' + item.semester + ' - ' + item.section,
    }));
    setClasses(updatedData);
  };

  const fetchSubjects = async () => {
    const response = await axios.get(
      'http://localhost:8000/institute/subject/'
    );
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setSubjects(updatedData);
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
  }, []);

  const handleClick = (event) => {
    setIsNext(event);

    const fetchStudents = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/student-for-marks?institute=${selectedInstitute}&classs=${selectedClass}&study_time=${selecedStudyTime}&department=${selectedDepartment}&educational_year=${selectedEducationalYear}`,
        data
      );
      const updatedData = await response.data.map((item) => ({
        name: item.name,
        studentId: item.student_id,
        registrationNumber: item.registration_number,
      }));
      setStudents(updatedData);
      setIsLoaded(true);
    };
    useEffect(() => {
      fetchStudents();
    });
  };

  const onSubmit = (values) => {
    console.log('values', values);
  };
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">{<IntlMessages id="marks.title" />}</h3>
        <CardBody>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                {inNext ? (
                  <Row className="m-5">
                    <Colxx xxs="6">
                      {/* set if condition, if institutes are loaded */}
                      {institutes.length > 0 && (
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
                            onClick={setSelectedInstitute(values.institute)}
                            required
                          />

                          {errors.institute && touched.institute ? (
                            <div className="invalid-feedback d-block">
                              {errors.institute}
                            </div>
                          ) : null}
                        </FormGroup>
                      )}

                      <FormGroup className="form-group has-float-label mt-5  ">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="StudyTime"
                          id="StudyTime"
                          value={values.StudyTime}
                          options={StudyTimeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedStudyTime(values.StudyTime.value)}
                          required
                        />
                        {errors.StudyTime && touched.StudyTime ? (
                          <div className="invalid-feedback d-block">
                            {errors.StudyTime}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label mt-5">
                        <Label>
                          <IntlMessages id="forms.educationYear" />
                        </Label>
                        <Field
                          type="number"
                          className="form-control"
                          name="educationlaYear"
                          // assign value to selectedEducationalYear
                          // onClick={setSelectedEducationalYear(
                          //   values.educationlaYear
                          // )}
                          required
                        />
                        {errors.educationlaYear && touched.educationlaYear ? (
                          <div className="invalid-feedback d-block">
                            {errors.educationlaYear}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="6">
                      <FormGroup className="form-group has-float-label ">
                        <Label>
                          <IntlMessages id="marks.ClassLabel" />
                        </Label>
                        <FormikReactSelect
                          name="classs"
                          id="classs"
                          value={values.classs}
                          options={classes}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          // onClick={setSelectedClass(values.classs.value)}
                          required
                        />
                        {errors.Classs && touched.Classs ? (
                          <div className="invalid-feedback d-block">
                            {errors.Classs}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5">
                        <Label>
                          <IntlMessages id="forms.studyDepartment" />
                        </Label>
                        <FormikReactSelect
                          name="department"
                          id="department"
                          value={values.department}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          // onClick={setSelectedDepartment(
                          //   values.department.value
                          // )}
                          required
                        />
                        {errors.Field && touched.Field ? (
                          <div className="invalid-feedback d-block">
                            {errors.Field}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5">
                        <Label>
                          <IntlMessages id="marks.SubjectLabel" />
                        </Label>
                        <FormikReactSelect
                          name="subject"
                          id="subject"
                          value={values.subject}
                          options={subjects}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          // onClick={setSelectedSubject(values.subject.value)}
                          required
                        />
                        {errors.subject && touched.subject ? (
                          <div className="invalid-feedback d-block">
                            {errors.subject}
                          </div>
                        ) : null}
                      </FormGroup>

                      <Button
                        onClick={() => handleClick(false)}
                        className="float-right "
                        style={{ marginTop: '15%' }}
                      >
                        <IntlMessages id="button.Next" />
                      </Button>
                    </Colxx>
                  </Row>
                ) : (
                  <>
                    <Row
                      className="border border me-5 p-1 "
                      style={{ marginInline: '16%' }}
                    >
                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="forms.FieldLabel" />
                        </Label>
                        <h6>{selectedDepartment}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.ClassLabel" />
                        </Label>
                        <h6>{selectedClass}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <h6>{selecedStudyTime}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.SemesterLabel" />
                        </Label>
                        <h6>{selectedClass}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.SectionLabel" />
                        </Label>
                        <h6>{selectedClass}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.SubjectLabel" />
                        </Label>
                        <h6>{selectedSubject}</h6>
                      </Colxx>
                    </Row>

                    <Row
                      className="justify-content-center  border border"
                      style={{ marginInline: '16%' }}
                    >
                      <table className="table">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">
                              <IntlMessages id="marks.No" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.FullName" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.FatherName" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.ID" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.Marks" />
                            </th>
                          </tr>
                        </thead>
                      </table>
                    </Row>

                    <Row
                      className="justify-content-center  border border"
                      style={{
                        marginInline: '16%',
                        height: '30rem',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                      }}
                    >
                      <table class="table ">
                        <tbody
                          className="border border "
                          style={{
                            height: '200px',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                          }}
                        >
                          <tr>
                            <th scope="row">1</th>
                            <td>Samiullah</td>
                            <td>the Bird</td>
                            <td>123123</td>

                            <div class="form-group mx-sm-3 mb-2">
                              {/* <label for="inputPassword2" class="sr-only">
                                Password
                              </label>
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword2"
                                placeholder="marks"
                              /> */}
                              <FormGroup className="form-group">
                                <Field
                                  type="number"
                                  className="form-control"
                                  name="score"
                                />
                                {errors.score && touched.score ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.score}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <div class="form-group mx-sm-3 mb-2">
                              <label for="inputPassword2" class="sr-only">
                                Password
                              </label>
                              <input
                                type="number"
                                class="form-control"
                                id="inputPassword2"
                                placeholder="marks"
                              />
                            </div>
                          </tr>
                        </tbody>
                      </table>
                    </Row>
                    <Row
                      className="justify-content-center  border border"
                      style={{
                        marginInline: '16%',
                      }}
                    >
                      <table class="table ">
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                        <tfoot className="thead-dark">
                          <tr>
                            <th scope="col">
                              <IntlMessages id="marks.No" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.FullName" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.FatherName" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.ID" />
                            </th>
                            <th scope="col">
                              <IntlMessages id="marks.Marks" />
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </Row>
                    <Row className=" justify-content-center">
                      <Colxx xxs="9" className="m-5">
                        <Button
                          className=" m-4 "
                          onClick={() => handleClick(true)}
                        >
                          <IntlMessages id="button.Back" />
                        </Button>

                        <div className="d-flex justify-content-between align-items-center m-4 float-right">
                          <Button
                            className={`btn-shadow btn-multiple-state `}
                            size="lg"
                            type="submit"
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">
                              <IntlMessages id="SubmitButton" />
                            </span>
                          </Button>
                        </div>
                      </Colxx>
                    </Row>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default MarksRegistration;
