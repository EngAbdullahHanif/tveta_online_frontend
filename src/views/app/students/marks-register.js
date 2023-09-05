import React, { useState, useEffect } from 'react';
import { Formik, Form, isEmptyArray } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import {
  studyTimeOptions,
  educationalYearsOptions,
} from './../global-data/options';
import './../../../assets/css/global-style.css';

// Year  and SHift
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

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
  educationalYear: [],
  studyTime: [],
  classs: [],
  department: [],
  subject: [],
  marks: 0,
};

const MarksRegistration = ({ match }) => {
  const [isNext, setIsNext] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState();
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
  const [arr, setArr] = useState({});
  // separate and set labels for classes
  const [selectedClassLabel, setselectedClassLabel] = useState({
    classs: '',
    semester: '',
    section: '',
  });
  const int = [
    {
      label: 'Dept 1',
      value: '1',
      institute: '1',
    },
    {
      label: 'Dept 2',
      value: '2',
      institute: '8',
    },
    {
      label: 'Dept 3',
      value: '3',
      institute: '1',
    },
    {
      label: 'Dept 4',
      value: '4',
      institute: 'انستیتوت تکنالوژی افغان',
    },
  ];
  useEffect(() => {
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

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    console.warn('Reponse Institutes: ', response);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      console.warn('Updated Institutes: ', updatedData);
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
  const fetchDepartments = async (instituteId) => {
    if (!instituteId || !instituteId.value) {
      return;
    }
    const response = await callApi(
      `institute/institite-department/?institute=${instituteId.value}`,
      'GET',
      null,
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
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedInstitute) {
      console.log('selectedInstitute', selectedInstitute);
      fetchDepartments(selectedInstitute);
    }
  }, [selectedInstitute]);

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

  const fetchStudents = async (values) => {
    const response = await callApi(
      `students/class-marks/list/?institute=${selectedInstitute.value}&classs=${selectedClass.value}&shift=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear.value}&subject=${selectedSubject.value}`,
      '',
      null,
    );
    if (response.data && response.status === 200) {
      console.log('response of students', response);
      setStudents(response.data);
      setIsNext(true);
    } else {
      console.log('subject error');
    }
  };

  const onSubmit = async (values) => {
    const newStudents = [];
    Object.keys(arr).forEach((id) => {
      newStudents.push({ student_id: id, ...arr[id] });
    });
    console.log('arr is: ', arr);
    const educationalYear = selectedEducationalYear.value;
    const instituteId = selectedInstitute.value;
    const departmentId = selectedDepartment.value;
    const classId = selectedClass.value;
    const subjectId = selectedSubject.value;
    const shift = selecedStudyTime.value;

    console.log('educationalYear', educationalYear);
    console.log('instituteId', instituteId);
    console.log('departmentId', departmentId);
    console.log('classId', classId);
    console.log('subjectId', subjectId);

    // const newStudents = students.map((student, index) => {
    //   return {
    //     student_id: student.student_id,
    //     marks: values.score[student.student_id],
    //   };
    // });

    console.log('newStudents', newStudents);

    let data = [
      {
        educational_year: educationalYear,
        institute: instituteId,
        department: departmentId,
        classs: classId,
        subject: subjectId,
        shift: shift,
      },
      ...newStudents,
    ];

    console.log('data', data);

    const response = await callApi(
      'students/class-marks/create/',
      'POST',
      data,
    );
    if (response.status >= 200 || response.status < 300 > 201) {
      // console.log('response of students', response);
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
          <h2 className="mt-5 m-5 titleStyle">
            {<IntlMessages id="marks.title" />}
          </h2>
        </div>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={fetchStudents}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                handleSubmit,
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
                          // value={values.institute}
                          options={institutes}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedInstitute(values.institute)}
                        />

                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
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
                          <div className="invalid-feedback d-block bg-danger text-white ">
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
                        onClick={handleSubmit}
                        color="primary"
                        className="float-right  buttonStyle"
                        size="lg"
                        // type="submit"
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
                      {/* {console.log('selectedDepartment', selectedDepartment)} */}
                      <h5>{selectedDepartment.label}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <h5>{selectedClassLabel.classs}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="forms.StudyTimeLabel" />
                      </Label>
                      <h5>{selecedStudyTime.label}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.SemesterLabel" />
                      </Label>
                      <h5>{selectedClassLabel.semester}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.SectionLabel" />
                      </Label>
                      <h5>{selectedClassLabel.section}</h5>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        <IntlMessages id="marks.SubjectLabel" />
                      </Label>
                      <h5>{selectedSubject.label}</h5>
                    </Colxx>
                  </Row>
                  <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    // validationSchema={ValidationSchema}
                  >
                    {({ errors, touched }) => (
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
                                        <input
                                          type="number"
                                          // style={{
                                          //   fontSize: '15px',
                                          //   textAlign: 'center',
                                          // }}
                                          className="form-control"
                                          // name={`score[${student.student_id}]`}
                                          name="marks"
                                          min={0}
                                          max={100}
                                          onChange={(e) => {
                                            const newArr = arr;
                                            newArr[student.student_id] = {
                                              ...newArr[student.student_id],
                                              [e.target.name]: Number.parseInt(
                                                e.target.value,
                                              ),
                                            };
                                            setArr(newArr);
                                          }}
                                        />
                                        {errors.score && touched.score ? (
                                          <div className="invalid-feedback d-block">
                                            {errors.score}
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
