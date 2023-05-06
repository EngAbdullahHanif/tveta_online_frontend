import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import currentUser from 'helpers/currentUser';
import { studyTimeOptions } from './../global-data/options';

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
import { NotificationManager } from 'components/common/react-notifications';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import userEvent from '@testing-library/user-event';
import { async } from 'q';

const servicePath = 'http://localhost:8000';
const studentApi = `${servicePath}/api`;
// http://localhost:8000/api/?student_id=1232
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

  subject: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.SubjectErr" />),
});

const initialValues = {
  institute: [],
  educationlaYear: '',
  studyTime: [],
  classs: [],
  department: [],
  subject: [],
};
const MarksRegistration = ({ match }) => {
  const [isNext, setIsNext] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
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
  const [examId, setExamId] = useState();

  const { markId } = useParams();

  if (markId) {
    useEffect(() => {
      async function fetchStudent() {
        const { data } = await axios.get(
          `${studentMarkId}/?student_id=${markId}`
        );
        console.log(data, 'object of the data');

        // const instGender = genderOptions.map((studentGender) => {
        //   if (studentGender.value === data[0].gender) {
        //     setInitialGender(studentGender);
        //   }
        // });
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }

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
  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'نمری په بریالیتوب سره ثبت شوی',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'نمری ثبت نه شوی بیا کوشش وکری',
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

  const fechtStudens = async () => {
    const response = await callApi(
      `api/student-for-marks?institute=${selectedInstitute.value}&classs=${selectedClass.value}&study_time=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      console.log('response of students', response);
      setStudents(response.data);
      setIsNext(true);
    } else {
      console.log('subject error');
    }
    // console.log(
    //   `http://localhost:8000/api/student-for-marks?institute=${selectedInstitute.value}&classs=${selectedClass.value}&study_time=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear}`
    // );
  };

  const onSubmit = async (values) => {
    // console.log('students', students);
    console.log('values sdfs', values);
    const educationalYear = selectedEducationalYear;
    const instituteId = selectedInstitute.value;
    const departmentId = selectedDepartment.value;
    const classId = selectedClass.value;
    const subjectId = selectedSubject.value;
    console.log('educationalYear', educationalYear);
    console.log('instituteId', instituteId);
    console.log('departmentId', departmentId);
    console.log('classId', classId);
    console.log('subjectId', subjectId);
    // i want to create an array which first node has exam_id and the rest of the nodes has student_id and marks
    // values.score[student.student_id]
    const newStudents = students.map((student, index) => {
      console.log('student sadfsd', student.student_id);
      return {
        student_id: student.student_id,
        score: values.score[student.student_id],
      };
    });

    let data = [
      {
        educational_year: educationalYear,
        institute_id: instituteId,
        department_id: departmentId,
        class_id: classId,
        subject_id: subjectId,
        user_id: currentUser(),
      },
      ...newStudents,
    ];

    console.log('data', data);

    const response = await callApi('api/create_marks/', 'POST', data);
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202
    ) {
      console.log('response of students', response);
      setIsSubmitted(true);
      createNotification('success', 'filled');
    } else {
      console.log('marks error');
      // setIsSubmitted(false);
      createNotification('error', 'filled');
    }

    // axios
    //   .post('http://localhost:8000/api/create_marks/', data)
    //   .then((res) => {
    //     console.log('res', res);
    //   })
    //   .then((err) => {
    //     console.log('err', err);
    //   });

    // students.map(async (student, index) => {
    //   let exam_id = '';
    //   const examData = {
    //     educational_year: educational_year,
    //     student_id: student.student_id,
    //     institute_id: institute_id,
    //     department_id: department_id,
    //     class_id: class_id,
    //     semister: 1,
    //     teacher_id: 1,
    //     user_id: 1,
    //     verification: 1,
    //   };
    //   const exam = await axios.post(
    //     'http://localhost:8000/api/create_marks/',
    //     examData
    //   );
    //   const updatedExam = await exam.data;
    //   exam_id = updatedExam;

    //   console.log('exam_id', exam_id, index);

    //   const data = {
    //     exam_marks_id: exam_id,
    //     subject_id: subject_id,
    //     exam_types: 1,
    //     score: values.score[student.student_id],
    //     passing_score: 55,
    //     user_id: 1,
    //   };
    //   console.log('data', data, index);
    //   axios.post('http://localhost:8000/api/create_marks_details/', data);
    // });
  };

  console.log('condsotlsa f', students);
  return (
    <>
      <Card>
        <h2 className="mt-5 m-5">{<IntlMessages id="marks.title" />}</h2>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={fechtStudens}
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
                      <FormGroup className="form-group has-float-label error-l-15px0 ">
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

                      <FormGroup className="form-group has-float-label mt-5  error-l-15px0">
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

                      <FormGroup className="form-group has-float-label mt-5 error-l-15px0">
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
                      <FormGroup className="form-group has-float-label error-l-15px0 ">
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

                      <FormGroup className="form-group has-float-label mt-5 error-l-15px0">
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

                      <FormGroup className="form-group has-float-label mt-5 error-l-15px0">
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.subject}
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
                        type="submit"
                        size="lg"
                        // onClick={() => fechtStudens()}
                      >
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
              {!isSubmitted ? (
                <>
                  <Row
                    className="border border bg-primary me-5 p-1 "
                    style={{ marginInline: '16%' }}
                  >
                    <Colxx xxs="2">
                      <Label style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                      {console.log('selectedDepartment', selectedDepartment)}
                      <h6>{selectedDepartment.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <h6>{selectedClass.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        <IntlMessages id="forms.StudyTimeLabel" />
                      </Label>
                      <h6>{selecedStudyTime.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.SemesterLabel" />
                      </Label>
                      <h6>{selectedClass.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '15px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.SectionLabel" />
                      </Label>
                      <h6>{selectedClass.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '15px', fontWeight: 'bold' }}>
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
                          <th scope="col" style={{ fontSize: '15px' }}>
                            <IntlMessages id="marks.No" />
                          </th>
                          <th scope="col" style={{ fontSize: '15px' }}>
                            <IntlMessages id="marks.FullName" />
                          </th>
                          <th scope="col" style={{ fontSize: '15px' }}>
                            <IntlMessages id="marks.FatherName" />
                          </th>
                          <th scope="col" style={{ fontSize: '15px' }}>
                            <IntlMessages id="marks.ID" />
                          </th>
                          <th scope="col" style={{ fontSize: '15px' }}>
                            <IntlMessages id="marks.Marks" />
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </Row>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    // validationSchema={ValidationSchema}
                  >
                    {({ errors }) => (
                      <Form className="av-tooltip tooltip-label-right ">
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
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                              }}
                            >
                              {students.length > 0 &&
                                students.map((student, index) => (
                                  <tr key={index}>
                                    <th
                                      scope="row"
                                      style={{ width: '16%', fontSize: '15px' }}
                                    >
                                      {index + 1}
                                    </th>
                                    <td
                                      style={{ width: '20%', fontSize: '15px' }}
                                    >
                                      {student.name}
                                    </td>
                                    <td
                                      style={{ width: '29%', fontSize: '15px' }}
                                    >
                                      {student.father_name}
                                    </td>
                                    <td
                                      style={{ width: '10%', fontSize: '15px' }}
                                    >
                                      {student.student_id}
                                    </td>

                                    {/* Marks Entry */}
                                    <td>
                                      <div
                                        style={{
                                          margin: '-7px',
                                          fontSize: '15px',
                                        }}
                                      >
                                        <FormGroup className="form-group">
                                          <Field
                                            type="number"
                                            style={{ fontSize: '15pxpx' }}
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
                                    </td>
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
                                <th scope="col" style={{ fontSize: '15px' }}>
                                  <IntlMessages id="marks.No" />
                                </th>
                                <th scope="col" style={{ fontSize: '15px' }}>
                                  <IntlMessages id="marks.FullName" />
                                </th>
                                <th scope="col" style={{ fontSize: '15px' }}>
                                  <IntlMessages id="marks.FatherName" />
                                </th>
                                <th scope="col" style={{ fontSize: '15px' }}>
                                  <IntlMessages id="marks.ID" />
                                </th>
                                <th scope="col" style={{ fontSize: '15px' }}>
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
                              color="primary"
                              onClick={() => setIsNext(false)}
                            >
                              <IntlMessages id="button.Back" />
                            </Button>

                            <div className="d-flex justify-content-between align-items-center m-4 float-right">
                              <Button
                                size="lg"
                                type="submit"
                                color="primary"
                                // onSubmit={onSubmit}
                                // onClick={() => setIsSubmitted(true)}
                              >
                                <IntlMessages id="button.SubmitButton" />
                              </Button>
                            </div>
                          </Colxx>
                        </Row>
                      </Form>
                    )}
                  </Formik>
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
                        setIsNext(false);
                        setIsSubmitted(false);
                      }}
                    >
                      <IntlMessages id="button.Back" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default MarksRegistration;
