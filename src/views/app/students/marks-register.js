import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

// Year  and SHift

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
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
  department: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  semester: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  Section: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  subject: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  classs: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  StudyTime: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  institute: {
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
  const [passingScore, setPassingScore] = useState(55);
  const [subjectGrad, setSubjectGrad] = useState();
  const [subjectGPA, setSubjectGPA] = useState();

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
    axios
      .get(
        `http://localhost:8000/api/student-for-marks?institute=${selectedInstitute.value}&classs=${selectedClass.value}&study_time=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear}`
      )
      .then((response) => {
        console.log('response.data', response.data);
        setStudents(response.data);
      });
    console.log('students', students);
  };

  const onSubmit = async (values) => {
    // console.log('values', values);
    const educational_year = selectedEducationalYear;
    const institute_id = selectedInstitute.value;
    const department_id = selectedDepartment.value;
    const class_id = selectedClass.value;
    const subject_id = selectedSubject.value;
    students.map((student) => {
      const examData = {
        educational_year: educational_year,
        student_id: student.student_id,
        institute_id: institute_id,
        Department: department_id,
        class_id: class_id,
      };
      console.log('examData', examData);
      //send data to create_marks api to create exam
      // const exam = axios.post(
      //   'http://localhost:8000/api/create_marks/',
      //   examData
      // );

      axios
        .post('http://localhost:8000/api/create_marks/', examData)
        .then((res) => {
          console.log('res', res);
        })
        .catch((err) => {
          console.log('err', err);
        });

      // const response = axios.post(
      //   `http://localhost:8000/api/create_marks/`,
      //   examData
      // );
      // const exam = response.data;
      // console.log('exam', exam);
      //REMOVE USER FROM HERE, IT'S JUST FOR TESTING
      //EXAM TYPE IS SELECTED 1, BECUASE THIS PAGE IS FOR THE FIRST CHANCE EXAM MRKS
      // console.log('exam', examData);
      const data = {
        subject: subject_id,
        exam_types: 1,
        passing_score: passingScore,
        grad: subjectGrad,
        Gpa: subjectGPA,
        user_id: 1,
        mark: values.score[student.student_id],
      };
      // console.log('data', data);
      // axios.post('http://localhost:8000/api/marks/', data);
    });
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
                          onClick={setSelectedStudyTime(values.StudyTime)}
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
                          onClick={setSelectedEducationalYear(
                            values.educationlaYear
                          )}
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
                          onClick={setSelectedClass(values.classs)}
                          required
                        />
                        {errors.classs && touched.classs ? (
                          <div className="invalid-feedback d-block">
                            {errors.classs}
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
                          onClick={setSelectedDepartment(values.department)}
                          required
                        />
                        {errors.department && touched.department ? (
                          <div className="invalid-feedback d-block">
                            {errors.department}
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
                          onClick={setSelectedSubject(values.subject)}
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
                      className="border border bg-primary me-5 p-1 "
                      style={{ marginInline: '16%' }}
                    >
                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="forms.FieldLabel" />
                        </Label>
                        {console.log('selectedDepartment', selectedDepartment)}
                        <h6>{selectedDepartment.label}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.ClassLabel" />
                        </Label>
                        <h6>{selectedClass.label}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <h6>{selecedStudyTime.label}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.SemesterLabel" />
                        </Label>
                        <h6>{selectedClass.label}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.SectionLabel" />
                        </Label>
                        <h6>{selectedClass.label}</h6>
                      </Colxx>

                      <Colxx xxs="2">
                        <Label>
                          <IntlMessages id="marks.SubjectLabel" />
                        </Label>
                        <h6>{selectedSubject.label}</h6>
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
                          {students.map((student, index) => (
                            <tr>
                              <th scope="row">{index}</th>
                              <td>{student.name}</td>
                              <td>{student.father_name}</td>
                              <td>{student.student_id}</td>

                              {/* Marks Entry */}
                              <div class="form-group mx-sm-3 mb-2">
                                <FormGroup className="form-group">
                                  <Field
                                    type="number"
                                    className="form-control"
                                    name={`score[${student.student_id}]`}
                                  />
                                  {errors.score && touched.score ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.score}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </div>
                            </tr>
                          ))}
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
                              <IntlMessages id="button.SubmitButton" />
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
