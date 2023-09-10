import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field, isEmptyArray } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import {
  studyTimeOptions,
  educationalYearsOptions,
} from '../global-data/options';
import './../../../assets/css/global-style.css';

// Year  and SHift
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { AuthContext } from 'context/AuthContext';

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
  const { institutes } = useContext(AuthContext);
  const [isNext, setIsNext] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState([]);
  // const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selecedStudyTime, setSelectedStudyTime] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState([]);
  const [passingScore, setPassingScore] = useState(55);
  const [subjectGrad, setSubjectGrad] = useState();
  const [subjectGPA, setSubjectGPA] = useState();
  const [examId, setExamId] = useState();
  const { markId } = useParams();
  // separate and set labels for classes
  const [selectedClassLabel, setselectedClassLabel] = useState({
    classs: '',
    semester: '',
    section: '',
  });

  useEffect(() => {
    console.log(
      selectedClass,
      typeof selectedClass,
      'fjkdsjfkjsdafkjsdalkfjlsa',
    );
    if (!isEmptyArray(selectedClass) && selectedClass !== '') {
      const [semester, classs, section] = selectedClass.label.split('-');
      setselectedClassLabel({ classs, semester, section });
    }
  }, [selectedClass]);
  async function fetchStudent() {
    const { data } = await axios.get(
      // `${studentMarkId}/?student_id=${markId}`,
      `${1}/?student_id=${markId}`,
    );
    // console.log(data, 'object of the data');

    // const instGender = genderOptions.map((studentGender) => {
    //   if (studentGender.value === data[0].gender) {
    //     setInitialGender(studentGender);
    //   }
    // });
  }

  useEffect(() => {
    if (markId) {
      fetchStudent();
    }
    //setUpdateMode(true);
  }, []);

  // const fetchInstitutes = async () => {
  //   const response = await callApi('institute/', '', null);
  //   if (response.data && response.status === 200) {
  //     const updatedData = await response.data.map((item) => ({
  //       value: item.id,
  //       label: item.name,
  //     }));
  //     setInstitutes(updatedData);
  //   } else {
  //     console.log('institute error');
  //   }
  // };
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
    // fetchInstitutes();
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
          cName,
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
          cName,
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const fechtStudens = async () => {
    console.log('subject', selectedSubject.value);
    const response = await callApi(
      `students/class-marks/list/second-chance/?institute=${selectedInstitute.value}&classs=${selectedClass.value}&shift=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear.value}&subject=${selectedSubject.value}`,
      '',
      null,
    );
    if (response.data && response.status === 200) {
      setStudents(response.data);
      setIsNext(true);
    } else {
      console.log('subject error');
    }
  };

  const onSubmit = async (values) => {
    const educationalYear = selectedEducationalYear.value;
    const instituteId = selectedInstitute.value;
    const departmentId = selectedDepartment.value;
    const classId = selectedClass.value;
    const subjectId = selectedSubject.value;
    console.log('educationalYear', educationalYear);
    console.log('instituteId', instituteId);
    console.log('departmentId', departmentId);
    console.log('classId', classId);
    console.log('subjectId', subjectId);

    const newStudents = students.map((student, index) => {
      return {
        student_id: student.student_id,
        marks: values.score[student.student_id],
      };
    });

    let data = [
      {
        educational_year: educationalYear,
        institute: instituteId,
        department: departmentId,
        classs: classId,
        subject: subjectId,
      },
      ...newStudents,
    ];

    console.log('data', data);

    const response = await callApi(
      'students/class-marks/create/second-chance/',
      'POST',
      data,
    );
    if (response.status === 200) {
      console.log('response of students', response);
      setIsSubmitted(true);
      createNotification('success', 'filled');
    } else {
      console.log('marks error');
      setIsSubmitted(false);
      createNotification('error', 'filled');
    }
  };

  // console.log('condsotlsa f', students);
  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h3 className="mt-5 m-5 titleStyle">
            {<IntlMessages id="menu.second-chance-marks-register" />}
          </h3>
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
                <Form className="av-tooltip tooltip-label-right style ">
                  <Row className="m-5">
                    <Colxx xxs="6">
                      {/* set if condition, if institutes are loaded */}
                      <FormGroup className="form-group has-float-label error-l-150 ">
                        <Label>
                          <IntlMessages id="forms.InstituteLabel" />
                          <span style={{ color: 'red' }}>*</span>
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

                      <FormGroup className="form-group has-float-label mt-5  error-l-150 ">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                          <span style={{ color: 'red' }}>*</span>
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
                            values.educationalYear,
                          )}
                        />
                        {errors.educationlaYear && touched.educationlaYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.educationlaYear}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="6">
                      <FormGroup className="form-group has-float-label error-l-150 ">
                        <Label>
                          <IntlMessages id="marks.ClassLabel" />
                          <span style={{ color: 'red' }}>*</span>
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.classs}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="forms.studyDepartment" />
                          <span style={{ color: 'red' }}>*</span>
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
                          <IntlMessages id="marks.SubjectLabel" />
                          <span style={{ color: 'red' }}>*</span>
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
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
                      <Label>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                      {/* {console.log('selectedDepartment', selectedDepartment)} */}
                      <h6>{selectedDepartment.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <h6>{selectedClassLabel.classs}</h6>
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
                      <h6>{selectedClassLabel.semester}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="marks.SectionLabel" />
                      </Label>
                      <h6>{selectedClassLabel.section}</h6>
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
                          {/* LATTER UNCOMMENT IT, WHEN FIRST CHANCE MARKS IS GOT FROM BACKEND */}
                          {/* <th scope="col">
                            <IntlMessages id="marks.firstChance" />
                          </th> */}
                          <th scope="col">
                            <IntlMessages id="marks.secondChance" />
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
                    {({
                      errors,
                      // touched,
                      // // values,
                      // setFieldTouched,
                      // setFieldValue,
                    }) => (
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
                          <table className="table ">
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
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{student.name}</td>
                                    <td>{student.father_name}</td>
                                    <td>{student.student_id}</td>
                                    {/* LATTER UNCOMMENT IT, WHEN FIRST CHANCE MARKS IS GOT FROM BACKEND */}
                                    {/* <td>first chance marks</td> */}

                                    {/* Second Chance Marks */}
                                    <td>
                                      <div class="form-group mx-sm-3 mb-2">
                                        <FormGroup className="form-group">
                                          <Field
                                            type="number"
                                            className="form-control"
                                            name={`score[${student.student_id}]`}
                                            min="0"
                                            max="100"
                                          />
                                          {/* {errors.score && touched.score ? (
                                            <div className="invalid-feedback d-block">
                                              {errors.score}
                                            </div>
                                          ) : null} */}
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
                                  <IntlMessages id="marks.firstChance" />
                                </th>
                                <th scope="col">
                                  <IntlMessages id="marks.secondChance" />
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
