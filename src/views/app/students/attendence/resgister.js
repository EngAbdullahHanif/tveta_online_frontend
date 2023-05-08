import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
// import useSelector
import { useSelector } from 'react-redux';
import { educationalYearsOptions } from '../../global-data/options';
import { studyTimeOptions } from '../../global-data/options';

// Year  and SHift
import { useParams } from 'react-router-dom';

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
import callApi from 'helpers/callApi';
import currentUser from 'helpers/currentUser';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import userEvent from '@testing-library/user-event';
import { getDirection, getCurrentUser } from './../../../../helpers/Utils';
import { NotificationManager } from 'components/common/react-notifications';

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

const ValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.educationYearErr" />),

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

  totolEducationalDays: Yup.string().required(
    <IntlMessages id="forms.totolEduactionalDaysErr" />
  ),

  // studyTime: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="forms.StudyTimeErr" />),
});

const InnerInpufieldsValidation = Yup.object().shape({
  present: Yup.number().required(
    <IntlMessages id="forms.totolEduactionalDaysErr" />
  ),
  absent: Yup.number().required(
    <IntlMessages id="forms.totolEduactionalDaysErr" />
  ),
  necessaryWork: Yup.number().required(
    <IntlMessages id="forms.totolEduactionalDaysErr" />
  ),
  sickness: Yup.number().required(
    <IntlMessages id="forms.totolEduactionalDaysErr" />
  ),
});

const initialValues = {
  institute: [],
  studyTime: [],
  classs: [],
  department: [],
  totolEducationalDays: '',
  educationalYear: [],
  present: '',
  absent: '',
  necessaryWork: '',
  sickness: '',
};

const StudentAttendance = ({ match }) => {
  const { studentAttendanceId } = useParams();
  console.log('id of the attendacne', studentAttendanceId);
  if (studentAttendanceId) {
    useEffect(() => {
      async function fetchStudent() {
        const { data } = await axios.get(
          `${StudentAttendanceAPI}/?id=${studentAttendanceId}`
        );
        console.log(data[0].institute_id.name, 'kaknor student data');
        setInitialEducationalYear(data[0].educational_year),
          setInititalInstitute([
            {
              value: data[0].institute_id.id,
              label: data[0].institute_id.name,
            },
          ]);
        setInitialClass([
          { value: data[0].class_id.id, label: data[0].class_id.name },
        ]);
        setInitialDepartment([
          {
            value: data[0].department_id.id,
            label: data[0].department_id.name,
          },
        ]);
        setInitialSubject([
          {
            value: data[0].student_id.student_id,
            label: data[0].student_id.name,
          },
        ]);
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }

  const [isLoaded, setIsLoaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([{ label: 1, value: 'he' }]);
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
  const [initialInstitue, setInititalInstitute] = useState([]);
  const [initailEducationalYear, setInitialEducationalYear] = useState('');
  const [initalClass, setInitialClass] = useState([]);
  const [initailDepartment, setInitialDepartment] = useState([]);
  const [initalSubject, setInitialSubject] = useState([]);

  // fetch institute lists
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

  // fetch fields
  const fetchFields = async () => {
    const response = await callApi('institute/field/', 'GET', null);
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

  // fetch department list
  const fetchDepartments = async () => {
    const response = await callApi('institute/department/', 'GET', null);
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

  //fetch class list
  const fetchClasses = async () => {
    const response = await callApi('institute/classs/', 'GET', null);
    console.log('class repspossdfsde', response);
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

  //fetch subject list
  const fetchSubjects = async () => {
    const response = await callApi('institute/subject/', 'GET', null);
    console.log('class repspossdfsde', response);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + ' - ' + item.semester + ' - ' + item.section,
      }));
      setSubjects(updatedData);
    } else {
      console.log('class error');
    }
  };

  // fetch student list for typing attendance
  const fetchStudentList = async () => {
    const response = await callApi(
      `api/student-for-marks?institute=${selectedInstitute.value}&classs=${selectedClass.value}&study_time=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear}`,
      'GET',
      null
    );
    console.log('class repspossdfsde', response);
    if (response.data && response.status === 200) {
      setStudents(response.data);
      setIsNext(true);
    } else {
      console.log('class error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
  }, []);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'حاضری په بریالیتوب سره ثبت شوه',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'حاضری ثبت نه شوه بیا کوشش وکری',
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

  const onSubmit = async (values) => {
    // setIsSubmitted(true);
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
    //create an array which first node has exam_id and the rest of the nodes has student_id and marks
    // values.score[student.student_id]
    const newStudents = students.map((student, index) => {
      return {
        student_id: student.student_id,
        present_hours: values.present[student.student_id],
        absent_hours: values.absent[student.student_id],
        necessary_work_hours: values.necessaryWork[student.student_id],
        sickness_hours: values.sickness[student.student_id],
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

    const response = await callApi(
      'api/students-attendance-create/',
      'POST',
      data
    );
    if (response.status === 200 || response.status === 201) {
      setIsSubmitted(true);
      createNotification('success', 'filled');
    } else {
      console.log('marks error');
      // setIsSubmitted(false);
      createNotification('error', 'filled');
    }
  };
  console.log('isNext, isSubmitted', isNext, isSubmitted);

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="forms.AttendanceTitle" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={fetchStudentList}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right  ">
                  <Row className="m-5">
                    <Colxx xxs="6">
                      {/* set if condition, if institutes are loaded */}
                      <FormGroup className="form-group has-float-label error-l-150 ">
                        <Label>
                          <IntlMessages id="forms.In         stituteLabel" />
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

                      <FormGroup className="form-group has-float-label mt-5 error-l-150 ">
                        <Label>
                          <IntlMessages id="curriculum.eduactionalYearLabel" />
                        </Label>
                        <FormikReactSelect
                          name="educationalYear"
                          id="educationalYear"
                          value={values.educationalYear}
                          options={educationalYearsOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.educationalYear}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="forms.totolEducationalDays" />
                        </Label>
                        <Field
                          type="number"
                          id="totolEducationalDays"
                          className="form-control"
                          name="totolEducationalDays"
                          onClick={setSelectedEducationalYear(
                            values.totolEducationalDays
                          )}
                        />
                        {errors.totolEducationalDays &&
                        touched.totolEducationalDays ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.totolEducationalDays}
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
                        // onClick={() => fetchStudentList()}
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
              {!isSubmitted ? (
                <>
                  <Row
                    className="border border bg-primary me-5 p-1 "
                    style={{ marginInline: '10%' }}
                  >
                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="menu.institutes" />
                      </Label>
                      <h6>دینامیک گردد</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="attendance.departmentLabel" />
                      </Label>
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
                        <IntlMessages id="curriculum.eduactionalYearLabel" />
                      </Label>
                      <h6>دینامیک گردد</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="forms.totolEducationalDays" />
                      </Label>
                      <h6>دینامیک گردد</h6>
                    </Colxx>
                  </Row>
                  <Row
                    className="justify-content-center  border border"
                    style={{ marginInline: '10%' }}
                  >
                    <table className="table">
                      <thead className="thead-dark ">
                        <tr>
                          <th colspan="4" className="border text-center">
                            <IntlMessages id="marks.studentChar" />
                          </th>
                          <th colspan="4" className="border text-center">
                            <IntlMessages id="marks.marksDisplayTitle" />
                          </th>
                          <th colspan="1" className="border text-center">
                            {' '}
                            <IntlMessages id="marks.attendanceResult" />
                          </th>
                        </tr>
                      </thead>
                      <thead className="thead-dark">
                        <tr>
                          <th
                            scope="col"
                            className="border text-center "
                            style={{ maxWidth: '20px ', minWidth: '50px' }}
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
                            <IntlMessages id="forms.StdPresentLabel" />
                          </th>
                          <th scope="col" className="border text-center">
                            <IntlMessages id="forms.StdAbsentLabel" />
                          </th>
                          <th scope="col" className="border text-center">
                            <IntlMessages id="forms.StdNecessaryWorkLabel" />
                          </th>
                          <th scope="col" className="border text-center">
                            <IntlMessages id="forms.StdSicknessLabel" />
                          </th>
                          <th scope="col" className="border text-center">
                            <IntlMessages id="marks.eligable_Deprive" />
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </Row>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    // validationSchema={InnerInpufieldsValidation}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      setFieldTouched,
                      setFieldValue,
                    }) => (
                      <Form className="av-tooltip tooltip-label-right ">
                        <Row
                          className="justify-content-center  border border"
                          style={{
                            marginInline: '10%',
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
                              {students.length > 0 &&
                                students.map((student, index) => (
                                  <tr>
                                    <th scope="row">{index}</th>
                                    <td>{student.name}</td>
                                    <td>{student.father_name}</td>
                                    <td>{student.student_id}</td>
                                    <td>
                                      {/* Present*/}
                                      <div class="form-group mx-sm-3 mb-2">
                                        <FormGroup className="form-group">
                                          <Field
                                            type="string"
                                            className="form-control"
                                            name={`present[${student.student_id}]`}
                                            // name="present"
                                          />
                                          {errors.present && touched.present ? (
                                            <div className="invalid-feedback d-block">
                                              {errors.present}
                                            </div>
                                          ) : null}
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      {/* Absent */}
                                      <div class="form-group mx-sm-3 mb-2">
                                        <FormGroup className="form-group">
                                          <Field
                                            type="string"
                                            className="form-control"
                                            name={`absent[${student.student_id}]`}
                                            // name={`${index}`}
                                          />
                                          {errors.absent && touched.absent ? (
                                            <div className="invalid-feedback d-block">
                                              {errors.StdAbsent}
                                            </div>
                                          ) : null}
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      {/* Necessary Work */}
                                      <div class="form-group mx-sm-3 mb-2">
                                        <FormGroup className="form-group">
                                          <Field
                                            type="string"
                                            className="form-control"
                                            name={`necessaryWork[${student.student_id}]`}
                                            // name={`${index}`}
                                          />
                                          {errors.necessaryWork &&
                                          touched.necessaryWork ? (
                                            <div className="invalid-feedback d-block">
                                              {errors.necessaryWork}
                                            </div>
                                          ) : null}
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      {/* SickNess */}
                                      <div class="form-group mx-sm-3 mb-2">
                                        <FormGroup className="form-group">
                                          <Field
                                            type="string"
                                            className="form-control"
                                            name={`sickness[${student.student_id}]`}
                                            // name={`${index}`}
                                          />
                                          {errors.sickness &&
                                          touched.sickness ? (
                                            <div className="invalid-feedback d-block">
                                              {errors.sickness}
                                            </div>
                                          ) : null}
                                        </FormGroup>
                                      </div>
                                    </td>
                                    <td>
                                      Mahroom or full attendance should be
                                      displayed here
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </Row>
                        <Row
                          className="justify-content-center  border border"
                          style={{
                            marginInline: '10%',
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
                                <th
                                  scope="col"
                                  className="border text-center "
                                  style={{
                                    maxWidth: '20px ',
                                    minWidth: '50px',
                                  }}
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
                                  <IntlMessages id="forms.StdPresentLabel" />
                                </th>
                                <th scope="col" className="border text-center">
                                  <IntlMessages id="forms.StdAbsentLabel" />
                                </th>
                                <th scope="col" className="border text-center">
                                  <IntlMessages id="forms.StdNecessaryWorkLabel" />
                                </th>
                                <th scope="col" className="border text-center">
                                  <IntlMessages id="forms.StdSicknessLabel" />
                                </th>
                                <th scope="col" className="border text-center">
                                  <IntlMessages id="marks.eligable_Deprive" />
                                </th>
                              </tr>
                            </tfoot>
                          </table>
                        </Row>
                        <Row className=" justify-content-center">
                          <Colxx xxs="9" className="m-5">
                            <Button
                              className=" m-4"
                              onClick={() => setIsNext(false)}
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

export default StudentAttendance;
