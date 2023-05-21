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
  sectionValueOptions,
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

  semester: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    // .required(<IntlMessages id="marks.SubjectErr" />),
    .required('semester error'),
});

const initialValues = {
  institute: [],
  educationlaYear: '',
  studyTime: [],
  classs: [],
  department: [],
  semester: [],
};

const submitInitialValues = {
  section: [],
};

const MarskStatusCheckedStudents = ({ match }) => {
  const [isNext, setIsNext] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selecedStudyTime, setSelectedStudyTime] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');
  const [passingScore, setPassingScore] = useState(55);
  const [subjectGrad, setSubjectGrad] = useState();
  const [subjectGPA, setSubjectGPA] = useState();
  const [examId, setExamId] = useState();

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

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
    fetchClasses();
  }, []);

  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'زده کوونکو ته صنف په بریالیتوب تعین شو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'زده کوونکو ته صنف تعین نشو ',
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
    console.log('selectedSemester', selectedSemester);
    const response = await callApi(
      `api/marks-status-checked-students/?institute_id=${selectedInstitute.value}&class=${selectedClass.value}&semester=${selectedSemester.value}&shift=${selecedStudyTime.value}&department_id=${selectedDepartment.value}&educational_year=${selectedEducationalYear}`,
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
    const semesterId = selectedSemester.value;
    const educationalYear = selectedEducationalYear;
    const instituteId = selectedInstitute.value;
    const departmentId = selectedDepartment.value;
    const className = selectedClass.value;

    const newStudents = students.map((student, index) => {
      return {
        student_id: student.student_id,
        section: values.section[student.student_id].value,
      };
    });

    let data = [
      {
        educational_year: educationalYear,
        institute_id: instituteId,
        department_id: departmentId,
        class_name: className,
        semester: semesterId,
        shift: selecedStudyTime.value,
        user_id: currentUser(),
      },
      ...newStudents,
    ];

    const response = await callApi(
      'api/set-students-to-new-class/',
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
      setIsSubmitted(false);
      createNotification('error', 'filled');
    }
  };

  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className="mt-5 m-5 titleStyle">
            {/* {<IntlMessages id="marks.title" />} */}
            student class assigment
          </h2>
        </div>
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

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="forms.educationYearLabel" />
                        </Label>
                        <Field
                          type="number"
                          id="educationlaYear"
                          className="form-control fieldStyle"
                          name="educationlaYear"
                          // assign value to selectedEducationalYear
                          onClick={setSelectedEducationalYear(
                            values.educationlaYear
                          )}
                        />
                        {errors.educationlaYear && touched.educationlaYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
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
                          options={classOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedClass(values.classs)}
                          required
                        />
                        {errors.classs && touched.classs ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          {/* <IntlMessages id="marks.SubjectLabel" /> */}
                          semester
                        </Label>
                        <FormikReactSelect
                          name="semester"
                          id="semester"
                          value={values.semester}
                          options={semesterValueOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedSemester(values.semester)}
                          required
                        />
                        {errors.semester && touched.semester ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.semester}
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
                                  {/* <IntlMessages id="marks.Marks" /> */}
                                  section
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
                                students.map((student, index) => (
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
                                      {student.name}
                                    </td>
                                    <td
                                      style={{
                                        fontSize: '20px',
                                        textAlign: 'center',
                                      }}
                                    >
                                      {student.father_name}
                                    </td>
                                    <td
                                      style={{
                                        fontSize: '20px',
                                        textAlign: 'center',
                                      }}
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
                                          name={`section[${student.student_id}]`}
                                          id={`section[${student.student_id}]`}
                                          // value={`values.section[${student.student_id}]`}
                                          options={sectionValueOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          // onClick={setSelectedSection(
                                          //   values.section
                                          // )}
                                          required
                                        />
                                        {errors.section && touched.section ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.semester}
                                          </div>
                                        ) : null}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
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

export default MarskStatusCheckedStudents;
