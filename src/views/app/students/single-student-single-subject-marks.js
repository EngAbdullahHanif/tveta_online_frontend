// this component is used to update marks of a subject of a student
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, isEmptyArray } from 'formik';
import axios from 'axios';
import './style.css';
import callApi from 'helpers/callApi';
import { NotificationManager } from 'components/common/react-notifications';

import {
  studyTimeOptions,
  educationalYearsOptions,
  chanceOptions,
} from '../global-data/options';
import './../../../assets/css/global-style.css';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikInputText,
} from 'containers/form-validations/FormikFields';

const ValidationSchema1 = Yup.object().shape({
  studentID: Yup.string().required(<IntlMessages id="student.studentId" />),

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

  subject: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.SubjectErr" />),

  chance: Yup.object()
    .shape({
      value: Yup.number().required(),
    })
    .nullable()
    .required('chance is required'),
});

const validationSchema2 = Yup.object().shape({
  marks: Yup.string().required(<IntlMessages id="marks.marksErr" />),
});

const initialValues = {
  studentID: '',
  educationalYear: [],
  classs: [],
  subject: [],
  chance: [],
};
const initialValues2 = {
  marks: '',
};
function singleStudentSingleSubjectMarks(props) {
  const [isNext, setIsNext] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState({});
  const [selectedStudentID, setSelectedStudentID] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');
  const [selectedChance, setSelectedChance] = useState('');

  // separate and set labels for classes
  const [selectedClassLabel, setselectedClassLabel] = useState({
    classs: '',
    semester: '',
    section: '',
  });

  useEffect(() => {
    if (!isEmptyArray(selectedClass) && selectedClass !== '') {
      const [semester, classs, section] = selectedClass.label.split('-');
      setselectedClassLabel({ classs, semester, section });
    }
  }, [selectedClass]);

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
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchStudents = async (values) => {
    const response = await callApi(
      `students/subject-marks-update/list/?classs=${selectedClass.value}&educational_year=${selectedEducationalYear.value}&subject=${selectedSubject.value}&student_id=${selectedStudentID}&chance=${selectedChance.value}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      console.log('response of students', response);
      // convert data to json format
      const updatedData = JSON.parse(response.data);
      console.log('updatedData', updatedData);
      setStudents(updatedData);
      setIsNext(true);
    } else {
      console.log('subject error');
    }
  };

  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'نمری په بریالیتوب سره اپدیت شوی',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'نمری اپدیت نه شوی بیا کوشش وکری',
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
    const data = {
      subject_result_id: students.subject_result_id,
      marks: values.marks,
      chance: selectedChance.value,
      classs: selectedClass.value,
    };
    console.log('data of onSubmit', data);

    const response = await callApi(
      'students/subject-marks-update/update/',
      'PUT',
      data,
      '',
      null
    );

    if (response.data && response.status === 200) {
      setStudents(response.data);
      createNotification('success', 'filled');
      setIsNext(false);
    } else {
      createNotification('error', 'filled');
      console.log('students error');
    }
  };
  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className="mt-5 ml-5 titleStyle">
            {/* {<IntlMessages id="marks.marksDisplayTitle" />} */}د شاګرد یو
            مضمون د نمرو اپدیتول
          </h2>
        </div>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={fetchStudents}
              validationSchema={ValidationSchema1}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                handleChange,
              }) => (
                <Form className="av-tooltip tooltip-label-right style ">
                  <Row className="m-5">
                    <Colxx xxs="6">
                      <FormGroup className="form-group has-float-label error-l-150">
                        <Label>
                          <IntlMessages id="شاګرد ایډی" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikInputText
                          name="studentID"
                          id="studentID"
                          onChange={handleChange('studentID')}
                          onBlur={setFieldTouched}
                          onClick={setSelectedStudentID(values.studentID)}
                        />
                        {errors.studentID && touched.studentID ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studentID}
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

                      <FormGroup className="form-group has-float-label mt-5  error-l-150">
                        <Label>
                          {/* <IntlMessages id="forms.educationYearLabel" /> */}
                          چانس
                        </Label>
                        <FormikReactSelect
                          name="chance"
                          id="chance"
                          options={chanceOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedChance(values.chance)}
                        />
                        {errors.chance && touched.chance ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.chance}
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
                      {/* Changes ended for a single student marks retrieval */}
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
              <Row
                className="border border bg-primary me-5 p-1 "
                style={{ marginInline: '16%' }}
              >
                <Colxx xxs="2">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="شاګرد ایډی" />
                  </Label>
                  <h5>{selectedStudentID}</h5>
                </Colxx>

                <Colxx xxs="3">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="marks.ClassLabel" />
                  </Label>
                  <h5>{selectedClassLabel.semester}</h5>
                </Colxx>

                {/* <Colxx xxs="2">
                  <Label style={{ fontSize: "20px", fontWeight: "bold" }}>
                    <IntlMessages id="forms.StudyTimeLabel" />
                  </Label>
                  <h5>{selecedStudyTime.label}</h5>
                </Colxx> */}

                <Colxx xxs="2">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="marks.SemesterLabel" />
                  </Label>
                  <h5>
                    {selectedEducationalYear.value}_{selectedClassLabel.classs}
                  </h5>
                </Colxx>

                <Colxx xxs="2">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="marks.SectionLabel" />
                  </Label>
                  <h5>{selectedClassLabel.section}</h5>
                </Colxx>

                <Colxx xxs="3">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="marks.SubjectLabel" />
                  </Label>
                  <h5>{selectedSubject.label}</h5>
                </Colxx>
              </Row>
              <Formik
                initialValues={initialValues2}
                onSubmit={onSubmit}
                validationSchema={validationSchema2}
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
                              <IntlMessages id="پخوانی نمری" />
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontSize: '15px',
                                textAlign: 'center',
                              }}
                            >
                              <IntlMessages id="نوی نمری" />
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
                          {students && (
                            <tr>
                              <th
                                scope="row"
                                style={{
                                  fontSize: '20px',
                                  textAlign: 'center',
                                }}
                              >
                                1
                              </th>
                              <td
                                style={{
                                  fontSize: '20px',
                                  textAlign: 'center',
                                }}
                              >
                                {students.student_name}
                              </td>
                              <td
                                style={{
                                  fontSize: '20px',
                                  textAlign: 'center',
                                }}
                              >
                                {students.student_father_name}
                              </td>
                              <td
                                style={{
                                  fontSize: '20px',
                                  textAlign: 'center',
                                }}
                              >
                                {students.student_id}
                              </td>
                              <td
                                style={{
                                  fontSize: '20px',
                                  textAlign: 'center',
                                }}
                              >
                                {students.old_marks}
                              </td>

                              {/* Marks Entry */}
                              <td>
                                <div
                                  style={{
                                    margin: '-7px',
                                    fontSize: '15px',
                                  }}
                                >
                                  <Field
                                    type="number"
                                    style={{
                                      fontSize: '15px',
                                      textAlign: 'center',
                                    }}
                                    className="form-control"
                                    name="marks"
                                    min="0"
                                    max="100"
                                  />
                                  {errors.score && touched.score ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.score}
                                    </div>
                                  ) : null}
                                </div>
                              </td>
                            </tr>
                          )}
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
                              <IntlMessages id="پخوانی نمری" />
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontSize: '15px',
                                textAlign: 'center',
                              }}
                            >
                              <IntlMessages id="نوی نمری" />
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
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default singleStudentSingleSubjectMarks;
