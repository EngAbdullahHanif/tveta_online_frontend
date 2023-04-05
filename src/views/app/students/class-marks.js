import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import callApi from 'helpers/callApi';
import { studyTimeOptions } from './../global-data/data';
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

// const LevelOfEdcationOptions = [
//   { value: '1', label: 'اصلی' },
//   { value: '2', label: 'فرعی' },
// ];

// const FieldOptions = [
//   { value: '14th', label: 'Computer Science' },
//   { value: 'bachelor', label: 'Agriculture' },
//   { value: 'master', label: 'BBA' },
//   { value: 'PHD', label: 'Mechenical Engineering' },
// ];

const SemesterOptions = [
  { value: '1', label: <IntlMessages id="marks.SemesterOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SemesterOption_2" /> },
  // { value: '3', label: <IntlMessages id="marks.SemesterOption_3" /> },
  //   { value: '4', label: <IntlMessages id="marks.SemesterOption_4" /> },
];

// const SectionOptions = [
//   { value: '1', label: <IntlMessages id="marks.SectionOption_1" /> },
//   { value: '2', label: <IntlMessages id="marks.SectionOption_2" /> },
//   { value: '3', label: <IntlMessages id="marks.SectionOption_3" /> },
//   { value: '4', label: <IntlMessages id="marks.SectionOption_4" /> },
//   { value: '5', label: <IntlMessages id="marks.SectionOption_5" /> },
// ];

// const ClassOptions = [
//   { value: '1', label: <IntlMessages id="marks.ClassOption_1" /> },
//   { value: '2', label: <IntlMessages id="marks.ClassOption_2" /> },
//   { value: '3', label: <IntlMessages id="marks.ClassOption_3" /> },
//   { value: '4', label: <IntlMessages id="marks.ClassOption_4" /> },
//   { value: '5', label: <IntlMessages id="marks.ClassOption_5" /> },
//   { value: '6', label: <IntlMessages id="marks.ClassOption_6" /> },
// ];

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [10, 20, 40, 80];

const ValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  educationlaYear: Yup.string().required(
    <IntlMessages id="forms.educationYearErr" />
  ),

  studyTime: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudyTimeErr" />),

  classs: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.ClassErr" />),

  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.departmentIdErr" />),
});

const AllSubjectsMarks = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNext, setIsNext] = useState(true);
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

  const [classs, setClasss] = useState();
  const [semester, setSemester] = useState();
  const [section, setSection] = useState();

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
  const fetchDepartments = async () => {
    const response = await callApi('institute/department/', '', null);
    console.log('response of department', response);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(updatedData);
    } else {
      console.log('department error');
    }
  };

  const fetchClasses = async () => {
    const response = await callApi('institute/classs/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + ' - ' + item.semester + ' - ' + item.section,
      }));
      setClasses(updatedData);
    } else {
      console.log('class error');
    }
  };

  const fetchSubjects = async () => {
    const response = await callApi('institute/subject/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSubjects(updatedData);
    } else {
      console.log('subject error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
  }, []);

  const handleClick = async (event) => {
    setIsNext(false);

    const response = await callApi(
      `api/class_marks?institute=${selectedInstitute.value}&classs=${selectedClass.value}&study_time=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      setStudents(response.data);

      console.log('response.data ', response.data);

      // split selected class to get semester and section
      const classArray = selectedClass.label.split(' - ');
      setClasss(classArray[0]);
      setSemester(classArray[1]);
      setSection(classArray[2]);
    } else {
      console.log('students error');
    }

    // console.log('students 321', students);
  };
  console.log('students 123', students);

  const onSubmit = (values) => {
    console.log('values', values);
    const educational_year = selectedEducationalYear;
    const institute_id = selectedInstitute.value;
    const department = selectedDepartment.value;
    const class_id = selectedClass.value;
    const subject_id = selectedSubject.value;
    students.map((student) => {
      const examData = {
        educational_year: educational_year,
        student_id: student.student_id,
        institute_id: institute_id,
        Department: department,
        class_id: class_id,
      };
      //REMOVE USER FROM HERE, IT'S JUST FOR TESTING
      //EXAM TYPE IS SELECTED 1, BECUASE THIS PAGE IS FOR THE FIRST CHANCE EXAM MRKS
      console.log('exam', examData);
      const data = {
        subject: subject_id,
        exam_types: 1,
        passing_score: passingScore,
        grad: subjectGrad,
        Gpa: subjectGPA,
        user_id: 1,
        mark: values.score[student.student_id],
      };
      console.log('data', data);
      // axios.post('http://localhost:8000/api/marks/', data);
    });
  };

  const initialValues = {
    institute: [],
    educationlaYear: '',
    studyTime: [],
    classs: [],
    department: [],
  };
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="marks.marksDisplayTitle" />}
        </h3>
        <CardBody>
          {isNext ? (
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right ">
                  <Row className="m-5">
                    <Colxx xxs="6">
                      {/* set if condition, if institutes are loaded */}
                      <FormGroup className="form-group has-float-label error-l-150 ">
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
                        />

                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institute}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5  error-l-150">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="studyTime"
                          id="studyTime"
                          value={values.studyTime}
                          options={studyTimeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedStudyTime(values.studyTime)}
                        />
                        {errors.studyTime && touched.studyTime ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.studyTime}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="forms.educationYearLabel" />
                        </Label>
                        <Field
                          type="number"
                          id="educationlaYear"
                          className="form-control"
                          name="educationlaYear"
                          // assign value to selectedEducationalYear
                          onClick={setSelectedEducationalYear(
                            values.educationlaYear
                          )}
                        />
                        {errors.educationlaYear && touched.educationlaYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.educationlaYear}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="6">
                      <FormGroup className="form-group has-float-label error-l-150 ">
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.classs}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right m-5"
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
                          <IntlMessages id="button.Next" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              {/* Result of Search */}
              <Row
                className="border border bg-primary me-5 p-1 "
                style={{ marginInline: '2%' }}
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
                  <h6>{classs}</h6>
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
                  <h6>{semester}</h6>
                </Colxx>

                <Colxx xxs="2">
                  <Label>
                    <IntlMessages id="marks.SectionLabel" />
                  </Label>
                  <h6>{section}</h6>
                </Colxx>
              </Row>

              <Row
                style={{
                  marginInline: '2%',
                  maxWidth: '97%',
                  maxHeight: '900px',
                  overflowX: 'auto',
                  overflowY: 'auto',
                }}
              >
                <table className="table" striped>
                  <thead className="thead-dark " style={{ marginInline: '2%' }}>
                    <tr>
                      <th colspan="4" className="border text-center">
                        <IntlMessages id="marks.studentChar" />
                      </th>
                      <th colspan="15" className="border text-center">
                        <IntlMessages id="marks.marksDisplayTitle" />
                      </th>
                    </tr>
                  </thead>
                  <thead className="thead-dark" style={{ marginInline: '5%' }}>
                    <tr>
                      <th scope="col" className="border text-center ">
                        <IntlMessages id="marks.No" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="marks.FullName" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="marks.FatherName" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="marks.ID" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                    </tr>
                  </thead>

                  <tbody
                    className="border border "
                    style={{
                      height: '200px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {students.map((studentRow, index) => {
                      return (
                        <tr key={index}>
                          <td key={index} className="border text-center">
                            {index + 1}
                          </td>
                          {index === 0 ? (
                            <>
                              {studentRow.map((student, secondIndex) => {
                                return (
                                  <>
                                    <th
                                      scope="col"
                                      className="border  text-center thead-dark "
                                    >
                                      {student.name}
                                    </th>
                                  </>
                                );
                              })}
                            </>
                          ) : (
                            <>
                              {studentRow.map((student, secondIndex) => {
                                return (
                                  <>
                                    {secondIndex === 0 ||
                                    secondIndex === 1 ||
                                    secondIndex === 2 ? (
                                      <td scope="col">{student.name}</td>
                                    ) : (
                                      <td scope="col">{student.score}</td>
                                    )}
                                  </>
                                );
                              })}
                            </>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>

                  <tfoot className="thead-dark">
                    <tr>
                      <th
                        scope="col"
                        className="border text-center "
                        style={{ maxWidth: '20px' }}
                      >
                        <IntlMessages id="marks.No" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="marks.FullName" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="marks.FatherName" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="marks.ID" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>{' '}
                      <th scope="col" className="border text-center">
                        <IntlMessages id="کمیا" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="قزیک" />
                      </th>
                      <th scope="col" className="border text-center">
                        <IntlMessages id="دری" />
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </Row>
              <Row className=" justify-content-center">
                <Colxx xxs="9" className="m-5">
                  <Button className=" m-4" onClick={() => handleClick(true)}>
                    <IntlMessages id="button.Back" />
                  </Button>
                </Colxx>
              </Row>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default AllSubjectsMarks;
