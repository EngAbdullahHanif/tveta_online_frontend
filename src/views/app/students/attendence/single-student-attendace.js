import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, isEmptyArray } from 'formik';
import axios from 'axios';
import '../style.css';
import callApi from 'helpers/callApi';
import {
  studyTimeOptions,
  educationalYearsOptions,
} from '../../global-data/options';
import '../../../../assets/css/global-style.css';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikInputText,
} from 'containers/form-validations/FormikFields';
import { on } from 'events';

import { NotificationManager } from 'components/common/react-notifications';

const ValidationSchema = Yup.object().shape({
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

  // subject: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="marks.SubjectErr" />),
});

const validationSchema2 = Yup.object().shape({
  presentHours: Yup.number()
    .min(0, 'نمبر تر صفر زیاد کیدای نشی')
    .max(100, 'نمبر تر سلو 100 زیاد کیدای نشی')
    .required('نمره ضروری ده'),
  absentHours: Yup.number()
    .min(0, 'نمبر تر صفر زیاد کیدای نشی')
    .max(100, 'نمبر تر سلو 100 زیاد کیدای نشی')
    .required('نمره ضروری ده'),
  necessaryWorkHours: Yup.number()
    .min(0, 'نمبر تر صفر زیاد کیدای نشی')
    .max(100, 'نمبر تر سلو 100 زیاد کیدای نشی')
    .required('نمره ضروری ده'),
  sicknessHours: Yup.number()
    .min(0, 'نمبر تر صفر زیاد کیدای نشی')
    .max(100, 'نمبر تر سلو 100 زیاد کیدای نشی')
    .required('نمره ضروری ده'),
});
const initialValues = {
  studentID: '',
  educationalYear: [],
  classs: [],
  // subject: [],
};

const initialValues2 = {
  presentHours: '',
  absentHours: '',
  necessaryWorkHours: '',
  sicknessHours: '',
};
function singleStudentAttendace(props) {
  const [isNext, setIsNext] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudentID, setSelectedStudentID] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');

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
      `students/student-attendance-update/list/?classs=${selectedClass.value}&educational_year=${selectedEducationalYear.value}&student_id=${selectedStudentID}`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      console.log('response of students attendance', response);
      // convert data to json format
      const updatedData = JSON.parse(response.data);
      console.log('updatedData', updatedData);
      setStudents(updatedData);
      setIsNext(true);
    } else {
      console.log('subject error');
    }
  };

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'حاضری په بریالیتوب سره اپدیت شوی',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'حاضری اپدیت نه شوی بیا کوشش وکری',
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
    console.log('Selected Class:', selectedClassLabel);
    console.log('VALUES in Single Subject Marks display: ', values);
    const data = {
      attendance_id: students.attendance_id,
      present_hours: values.presentHours,
      absent_hours: values.absentHours,
      necessary_work_hours: values.necessaryWorkHours,
      sickness_hours: values.sicknessHours,
    };
    console.log('data of att', data);

    const response = await callApi(
      `students/student-attendance-update/update/`,
      'POST',
      data
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
            {/* {<IntlMessages id="marks.marksDisplayTitle" />} */}د شاگرد حاضری
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
              <Row className="border border bg-primary me-5 p-1 ">
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

                <Colxx xxs="2">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="marks.SemesterLabel" />
                  </Label>
                  <h5>{selectedClassLabel.classs}</h5>
                </Colxx>

                <Colxx xxs="2">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="marks.SectionLabel" />
                  </Label>
                  <h5>{selectedClassLabel.section}</h5>
                </Colxx>

                <Colxx xxs="3">
                  <Label style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    <IntlMessages id="کال/سال" />
                  </Label>
                  <h5>{selectedEducationalYear.value}</h5>
                </Colxx>
              </Row>
              <Formik
                initialValues={initialValues2}
                onSubmit={onSubmit}
                validationSchema={validationSchema2}
              >
                {({
                  errors,
                  touched,
                  values,
                  setFieldTouched,
                  setFieldValue,
                }) => (
                  <Form className="">
                    <Row className="justify-content-center  border border">
                      <table class="table ">
                        <thead className="thead-dark ">
                          <tr>
                            <th
                              colspan="4"
                              className="border text-center list-header-1"
                            >
                              <IntlMessages id="marks.studentChar" />
                            </th>
                            <th
                              colspan="4"
                              className="border text-center list-header-1"
                            >
                              <IntlMessages id="attendance.attendaceDisplayTitle" />
                            </th>
                          </tr>
                        </thead>
                        <thead className="thead-dark">
                          <tr>
                            <th
                              scope="col"
                              className="border text-center list-header-2 "
                            >
                              <IntlMessages id="marks.No" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="marks.FullName" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="marks.FatherName" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="marks.ID" />
                            </th>

                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdPresentLabel" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdAbsentLabel" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdNecessaryWorkLabel" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdSicknessLabel" />
                            </th>
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
                          {students && (
                            <>
                              <tr>
                                <th
                                  style={{
                                    fontSize: '20px',
                                    minWidth: '50px',
                                    textAlign: 'center',
                                  }}
                                  className="pt-0"
                                >
                                  1
                                </th>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    minWidth: '150px',
                                    textAlign: 'center',
                                  }}
                                  className="pt-0"
                                >
                                  {students.student_name}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    minWidth: '150px',
                                    textAlign: 'center',
                                  }}
                                  className="pt-0"
                                >
                                  {students.student_father_name}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                  }}
                                  className="pt-0"
                                >
                                  {students.student_id}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                  }}
                                  className="pt-0"
                                >
                                  {students.present_hours}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                  }}
                                  className="pt-0"
                                >
                                  {students.absent_hours}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                  }}
                                  className="pt-0"
                                >
                                  {students.necessary_work_hours}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                  }}
                                  className="pt-0"
                                >
                                  {students.sickness_hours}
                                </td>

                                {/* <td className="mb-2">
                                DISPLAY MAHROOM OR FULL ATTEND
                              </td> */}
                                {/* <Separator /> */}
                              </tr>
                              <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="mb-2 p-0">
                                  {/* presentHours*/}

                                  <Field
                                    type="string"
                                    className="form-control"
                                    name="presentHours"
                                  />
                                  {errors.presentHours &&
                                  touched.presentHours ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.presentHours}
                                    </div>
                                  ) : null}
                                </td>
                                <td className="p-0">
                                  {/* absentHours */}
                                  <Field
                                    type="string"
                                    className="form-control"
                                    name="absentHours"
                                  />
                                  {errors.absentHours && touched.absentHours ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.absentHours}
                                    </div>
                                  ) : null}
                                </td>
                                <td className="p-0">
                                  {/* necessaryWorkHours  */}
                                  <Field
                                    type="string"
                                    className="form-control"
                                    name="necessaryWorkHours"
                                  />
                                  {errors.necessaryWorkHours &&
                                  touched.necessaryWorkHours ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.necessaryWorkHours}
                                    </div>
                                  ) : null}
                                </td>
                                <td className="mb-2 p-0">
                                  {/* sicknessHours */}

                                  <Field
                                    type="string"
                                    className="form-control"
                                    name="sicknessHours"
                                  />
                                  {errors.sicknessHours &&
                                  touched.sicknessHours ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.sicknessHours}
                                    </div>
                                  ) : null}
                                </td>
                              </tr>
                            </>
                          )}
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
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="marks.FullName" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="marks.FatherName" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="marks.ID" />
                            </th>

                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdPresentLabel" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdAbsentLabel" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdNecessaryWorkLabel" />
                            </th>
                            <th
                              scope="col"
                              className="border text-center list-header-2"
                            >
                              <IntlMessages id="forms.StdSicknessLabel" />
                            </th>
                            {/* <th scope="col" className="border text-center">
                            <IntlMessages id="marks.eligable_Deprive" />
                          </th> */}
                          </tr>
                        </tfoot>
                      </table>
                    </Row>
                    <Row className=" justify-content-center">
                      <Colxx xxs="10" className="m-5">
                        <Button
                          color="primary"
                          className="buttonStyle1"
                          size="lg"
                          type="submit"
                          style={{ margin: '5% 6% 10% 8%' }}
                          onClick={() => setIsNext(false)}
                        >
                          <IntlMessages id="button.Back" />
                        </Button>

                        <Button
                          color="primary"
                          className=" float-right buttonStyle1"
                          size="lg"
                          type="submit"
                          style={{ margin: '5% 0% 10% 6%' }}
                        >
                          <IntlMessages id="button.SubmitButton" />
                        </Button>
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

export default singleStudentAttendace;
