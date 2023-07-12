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

const initialValues = {
  studentID: '',
  educationalYear: [],
  classs: [],
  // subject: [],
};
function singleStudentAttendace(props) {
  const [isNext, setIsNext] = useState(false);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([
    {
      id: '414',
      name: 'Sohaib',
      father_name: 'Khan',
      oldMarks: 59,
    },
  ]);
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

  const onSubmit = async (values) => {
    console.log('Selected Class:', selectedClassLabel);
    console.log('VALUES in Single Subject Marks display: ', values);
    const data = {
      studentID: values.studentID,
      class: values.classs.value,
      educationalYear: values.educationalYear.value,
      // subject: values.subject.value,
    };
    if (data.studentID) setIsNext(true);

    // const response = await callApi(
    //   `/api/students-marks?institute=${values.studentID}&classs=${values.classs.value}&study_time=${values.studyTime.value}&department=${values.department.value}&educational_year=${educationlaYear}&subject=${values.subject.value}`,
    //   "",
    //   null
    // );
    // console.log("responseeeeeeeeeeeeeeE", response.data);

    // if (response.data && response.status === 200) {
    //   setStudents(response.data);
    //   console.log("response.data", response.data);
    //   console.log("response", response);
    //   setIsNext(true);
    //   console.log("students", students);
    // } else {
    //   console.log("students error");
    // }
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
              onSubmit={onSubmit}
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
                      {/* Delete this */}
                      {/* <FormGroup className="form-group has-float-label mt-5  error-l-150">
                            <Label>
                              <IntlMessages id="forms.StudyTimeLabel" />
                              <span style={{ color: "red" }}>*</span>
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
                          </FormGroup> */}
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
                        {errors.studyTime && touched.studyTime ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.studyTime}
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
                      {/* Delete this */}
                      {/* <FormGroup className="form-group has-float-label mt-5 error-l-150">
                            <Label>
                              <IntlMessages id="forms.studyDepartment" />
                              <span style={{ color: "red" }}>*</span>
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
                          </FormGroup> */}

                      {/* <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="marks.SubjectLabel" />
                          <span style={{ color: "red" }}>*</span>
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
                      </FormGroup> */}
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      {/* Changes Started for a single student marks retrieval */}
                      {/* <FormGroup className="form-group has-float-label mt-5 error-l-150">
                                <Label>
                                  <IntlMessages id="شاګرد ایډی" />
                                  <span style={{ color: "red" }}>*</span>
                                </Label>
                                <Input
                                  name="student"
                                  id="student"
                                  value={values.student}
                                  onChange={handleChange("student")}
                                  onBlur={setFieldTouched}
                                />
                                {errors.student && touched.student ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.student}
                                  </div>
                                ) : null}
                              </FormGroup> */}
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
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                      }}
                    >
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
                          {students.length > 0 &&
                            students.map((student, index) => (
                              <tr>
                                <th
                                  style={{
                                    fontSize: '20px',
                                    minWidth: '50px',
                                    textAlign: 'center',
                                  }}
                                  className="pt-0"
                                >
                                  {index + 1}
                                </th>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    minWidth: '150px',
                                    textAlign: 'center',
                                  }}
                                  className="pt-0"
                                >
                                  {student.name}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    minWidth: '150px',
                                    textAlign: 'center',
                                  }}
                                  className="pt-0"
                                >
                                  {student.father_name}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    minWidth: '100px',
                                  }}
                                  className="pt-0"
                                >
                                  {student.id}
                                </td>
                                <td className="mb-2 p-0">
                                  {/* Present*/}
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
                                </td>
                                <td className="p-0">
                                  {/* Absent */}
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
                                </td>
                                <td className="p-0">
                                  {/* Necessary Work */}
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
                                </td>
                                <td className="mb-2 p-0">
                                  {/* SickNess */}

                                  <Field
                                    type="string"
                                    className="form-control"
                                    name={`sickness[${student.student_id}]`}
                                    // name={`${index}`}
                                  />
                                  {errors.sickness && touched.sickness ? (
                                    <div className="invalid-feedback d-block">
                                      {errors.sickness}
                                    </div>
                                  ) : null}
                                </td>
                                {/* <td className="mb-2">
                                DISPLAY MAHROOM OR FULL ATTEND
                              </td> */}
                                {/* <Separator /> */}
                              </tr>
                            ))}
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
