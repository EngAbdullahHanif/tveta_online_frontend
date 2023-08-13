// this compoenent is used to show the list of students whose marks have been uploaded and verified, but students upgraded/degraded class has not been assigned yet

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import currentUser from 'helpers/currentUser';
import {
  studyTimeOptions,
  semesterValueOptions,
  classOptions,
  verificationValueOptions,
  educationalYearsOptions,
} from '../global-data/options';
import './../../../assets/css/global-style.css';

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

const initialValues = {
  institute: [],
  educationlaYear: '',
  studyTime: [],
  classs: [],
  department: [],
};

const submitInitialValues = {
  verification: [],
  examId: '',
};

const SubjectMarksVerification = ({ match }) => {
  const [isNext, setIsNext] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selecedStudyTime, setSelectedStudyTime] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');
  const [passingScore, setPassingScore] = useState(55);
  const [subjectGrad, setSubjectGrad] = useState();
  const [subjectGPA, setSubjectGPA] = useState();

  const { markId } = useParams();

  //   if (markId) {
  //     useEffect(() => {
  //       async function fetchStudent() {
  //         const { data } = await axios.get(
  //           `${studentMarkId}/?student_id=${markId}`
  //         );
  //         console.log(data, 'object of the data');

  //         // const instGender = genderOptions.map((studentGender) => {
  //         //   if (studentGender.value === data[0].gender) {
  //         //     setInitialGender(studentGender);
  //         //   }
  //         // });
  //       }
  //       fetchStudent();
  //       //setUpdateMode(true);
  //     }, []);
  //   }

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

  const fetchDepartments = async (instituteId) => {
    if (!instituteId || !instituteId.value) {
      return;
    }
    const response = await callApi(
      `institute/institite-department/?institute=${instituteId.value}`,
      '',
      null
    );
    // console.log('response of department', response);
    if (response.data && response.status === 200) {
      console.log('response of department', response);
      const updatedData = await response.data.map((item) => ({
        value: item.department.id,
        label: item.department.name,
      }));
      console.log('updatedData of department', updatedData);
      setDepartments(updatedData); //Set it up when data in Backend is ready
    } else {
      console.log('department error');
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
    if (selectedInstitute) {
      console.log('selectedInstitute', selectedInstitute);
      fetchDepartments(selectedInstitute);
    }
  }, [selectedInstitute]);

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

  useEffect(() => {
    fetchInstitutes();
    fetchClasses();
    fetchSubjects();
  }, []);

  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'نمری په بریالیتوب سره تاید شوی',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'نمری تاید نشوی, بیا کوشش وکری',
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

  const fechtStudents = async () => {
    console.log('selecedStudyTime.value', selecedStudyTime.value);
    const response = await callApi(
      `students/marks-verification-subjects-list/?institute=${selectedInstitute.value}&shift=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear.value}&subject=${selectedSubject.value}&classs=${selectedClass.value}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      console.log('response of students', response);
      setStudents(response.data);
      setIsNext(true);
    } else {
      console.log('students error');
    }
  };

  const onSubmit = async (values) => {
    const educationalYear = selectedEducationalYear;
    const instituteId = selectedInstitute.value;
    const departmentId = selectedDepartment.value;
    const classId = selectedClass.value;
    const subjectId = selectedSubject.value;
    console.log('values', values);

    const newStudents = students.map((student, index) => {
      return {
        student: student.student,
        verification_result: values.verification[student.student].value,
        exam_id: student.class_exam_id,
      };
    });
    console.log('newStudents', newStudents);

    let data = [
      {
        subject: subjectId,
        classs: classId,
      },
      ...newStudents,
    ];

    const response = await callApi(
      'students/verify-subject-marks/',
      'POST',
      data
    );
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
  };

  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className="mt-5 m-5 titleStyle">
            {/* {<IntlMessages id="student.assignment-to-class" />} */}د نمرو
            تایدی
          </h2>
        </div>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={fechtStudents}
              // validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right  style">
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studyTime}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5  error-l-150">
                        <Label>
                          <IntlMessages id="forms.educationYearLabel" />
                        </Label>
                        <FormikReactSelect
                          name="educationalYear"
                          id="educationalYear"
                          options={educationalYearsOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedEducationalYear(
                            values.educationalYear
                          )}
                        />
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.educationalYear}
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
                          <div className="invalid-feedback d-block bg-danger text-white ">
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
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
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
                          <div className="invalid-feedback d-block bg-danger text-white ">
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
                        className="float-right  buttonStyle"
                        size="lg"
                        type="submit"
                        style={{ margin: '2% 0% 10% 6%' }}
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
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                      {console.log('selectedDepartment', selectedDepartment)}
                      <h5>{selectedDepartment.label}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <h5>{selectedClass.label}</h5>
                    </Colxx>
                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.SemesterLabel" />
                      </Label>
                      <h5>{selectedSemester.label}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="forms.StudyTimeLabel" />
                      </Label>
                      <h5>{selecedStudyTime.label}</h5>
                    </Colxx>
                  </Row>
                  <Formik
                    initialValues={submitInitialValues}
                    onSubmit={onSubmit}
                    // validationSchema={ValidationSchema}
                  >
                    {({ errors, values, setFieldValue, setFieldTouched }) => (
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
                            <thead className="thead-dark">
                              <tr>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.No" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.FullName" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.FatherName" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.ID" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.Marks" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {/* <IntlMessages id="marks.Marks" /> */}
                                  result
                                </th>
                              </tr>
                            </thead>
                            <tbody
                              className="border border "
                              style={{
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                              }}
                            >
                              {students.length > 0 &&
                                students.map((student, index) => {
                                  return (
                                    <tr key={index}>
                                      <th
                                        scope="row"
                                        style={{
                                          fontSize: '20px',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {index + 1}
                                      </th>
                                      <td
                                        style={{
                                          fontSize: '20px',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {student.student_name}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: '20px',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {student.student_father_name}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: '20px',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {student.student}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: '20px',
                                          textAlign: 'center',
                                        }}
                                      >
                                        {student.subject_id.map((subject) => {
                                          return (
                                            <>
                                              {subject.second_chance_marks ||
                                                subject.marks}
                                            </>
                                          );
                                        })}
                                      </td>

                                      {/* Marks Entry */}
                                      <td>
                                        <div
                                          style={{
                                            margin: '-7px',
                                            fontSize: '15px',
                                          }}
                                        >
                                          {/* <Field
                                          type="number"
                                          style={{
                                            fontSize: '15px',
                                            textAlign: 'center',
                                          }}
                                          className="form-control"
                                          name={`score[${student.student_id}]`}
                                        />
                                        {errors.score && touched.score ? (
                                          <div className="invalid-feedback d-block">
                                            {errors.score}
                                          </div>
                                        ) : null} */}

                                          <FormikReactSelect
                                            name={`verification[${student.student}]`}
                                            id={`verification[${student.student}]`}
                                            // value={`values.section[${student.student_id}]`}
                                            options={verificationValueOptions}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.verification &&
                                          touched.verification ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.verification}
                                            </div>
                                          ) : null}
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                            <tfoot className="thead-dark">
                              <tr>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.No" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.FullName" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.FatherName" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.ID" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  <IntlMessages id="marks.Marks" />
                                </th>
                                <th
                                  scope="col"
                                  style={{
                                    fontSize: '15px',
                                    textAlign: 'center',
                                  }}
                                >
                                  result
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
                      {/* <IntlMessages id="wizard.registered" /> */}
                      زده کوونکو ته صنف په بریالیتوب سره تعین شو
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

export default SubjectMarksVerification;
