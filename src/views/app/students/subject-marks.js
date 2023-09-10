import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, isEmptyArray } from 'formik';
import './style.css';
import callApi from 'helpers/callApi';
import {
  studyTimeOptions,
  educationalYearsOptions,
} from '../global-data/options';
import './../../../assets/css/global-style.css';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { AuthContext } from 'context/AuthContext';

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

  student: Yup.object()
    .shape({
      value: Yup.string(),
    })
    .nullable(),
});

const initialValues = {
  institute: [],
  educationalYear: [],
  studyTime: [],
  classs: [],
  department: [],
  subject: [],
};
const MarksDisplay = ({ match }) => {
  const { institutes } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNext, setIsNext] = useState(false);
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

  const fetchDepartments = async (instituteId) => {
    if (!instituteId || !instituteId.value) {
      return;
    }
    const response = await callApi(
      `institute/institite-department/?institute=${instituteId.value}`,
      '',
      null,
    );
    // console.log('response of department', response);
    if (response.data && response.status === 200) {
      console.log('response of department', response);
      const updatedData = await response.data.map((item) => ({
        value: item.department,
        label: item.department,
      }));
      console.log('updatedData of department', updatedData);
      setDepartments(updatedData); //Set it up when data in Backend is ready
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
    fetchClasses();
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedInstitute) {
      console.log('selectedInstitute', selectedInstitute);
      fetchDepartments(selectedInstitute);
    }
  }, [selectedInstitute]);

  let gpa = null;
  let grad = null;
  let tbodies;
  if (students.length > 0) {
    tbodies = students.map((student, index) => {
      const scores = Object.values(student.subject_id);
      const studentRows = scores.map((score, i) => {
        const student_name =
          i === 0 ? (
            <td rowSpan={scores.length + 1} style={{ borderStyle: 'hidden' }}>
              {student.student_name}
            </td>
          ) : null;
        const student_father_name =
          i === 0 ? (
            <td rowSpan={scores.length + 1} style={{ borderStyle: 'hidden' }}>
              {student.student_father_name}
            </td>
          ) : null;
        const student_id =
          i === 0 ? (
            <td rowSpan={scores.length + 1} style={{ borderStyle: 'hidden' }}>
              {student.student}
            </td>
          ) : null;
        const index_no =
          i === 0 ? (
            <td rowSpan={index.length + 1} style={{ borderStyle: 'hidden' }}>
              {index + 1}
            </td>
          ) : null;

        return (
          <>
            <tr key={i} className="red-background">
              <td className="red-background">{index_no}</td>
              <td className="red-background"> {student_name}</td>
              <td className="red-background">{student_father_name}</td>
              <td className="red-background">{student_id}</td>
              <td className="red-background">
                {<td style={{ borderStyle: 'hidden' }}>{score.marks}</td>}
              </td>
              <td className="red-background">
                {
                  <td style={{ borderStyle: 'hidden' }}>
                    {score.second_chance_marks}
                  </td>
                }
              </td>
              {score.grad
                ? (grad = score.grad) && (
                    <td className="red-background">
                      {' '}
                      {score.grad && (
                        <td style={{ borderStyle: 'hidden' }}>{score.grad}</td>
                      )}
                    </td>
                  )
                : null}
              {score.Gpa
                ? (gpa = score.Gpa) && (
                    <td className="red-background">
                      {' '}
                      {score.Gpa && (
                        <td style={{ borderStyle: 'hidden' }}>{score.Gpa}</td>
                      )}
                    </td>
                  )
                : null}
              <td className="red-background">
                {score.marks >= 50 || score.second_chance_marks >= 50 ? (
                  <div className="text-success pt-3">کامیاب </div>
                ) : (
                  <div className="text-danger pt-3">ناکام </div>
                )}
              </td>
            </tr>
          </>
        );
      });
      return (
        <>
          <tbody key={index} className={student.name + ' ' + ' border border '}>
            {studentRows}
          </tbody>
        </>
      );
    });
  } else {
    tbodies = (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>معلومات شتون نلری</h1>
      </div>
    );
  }

  const onSubmit = async (values) => {
    const response = await callApi(
      `students/students-marks/?institute_id=${selectedInstitute.value}&class_id=${selectedClass.value}&shift=${selecedStudyTime.value}&department_id=${selectedDepartment.value}&educational_year=${selectedEducationalYear.value}&subject_id=${selectedSubject.value}`,
      '',
      null,
    );

    console.log('responseeeeeeeeeeeeeeE', response.data);

    if (response.data && response.status === 200) {
      setStudents(response.data);
      console.log('response.data', response.data);
      console.log('response', response);
      setIsNext(true);
      console.log('students', students);
    } else {
      console.log('students error');
    }
  };

  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className="mt-5 ml-5 titleStyle">
            {<IntlMessages id="marks.marksDisplayTitle" />}
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

                      <FormGroup className="form-group has-float-label mt-5  error-l-150">
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
                style={{ marginInline: '6%' }}
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
                    <IntlMessages id="forms.StudyTimeLabel" />
                  </Label>
                  <h6>{selecedStudyTime.label}</h6>
                </Colxx>
                <Colxx xxs="2">
                  <Label>
                    <IntlMessages id="marks.ClassLabel" />
                  </Label>
                  <h6>{selectedClassLabel.classs}</h6>
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
                style={{ marginInline: '6%' }}
              >
                <table className="table ">
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
                      <th scope="col">
                        <IntlMessages id="marks.firstChance" />
                      </th>
                      <th scope="col">
                        <IntlMessages id="marks.secondChance" />
                      </th>{' '}
                      {grad ? (
                        <th scope="col">
                          <IntlMessages id="marks.grade" />
                        </th>
                      ) : null}
                      {gpa ? (
                        <th scope="col">
                          <IntlMessages id="marks.gpa" />
                        </th>
                      ) : null}
                      <th scope="col">
                        <IntlMessages id="marks.result" />
                      </th>{' '}
                    </tr>
                  </thead>
                  {/* </table>
              </Row>

              <Row
                className="justify-content-center  border border"
                style={{
                  marginInline: '16%',
                  height: '30rem',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                }}
              >
                <table class="table"> */}
                  {/* <tbody
                    className="border border "
                    style={{
                      height: '200px',
                      overflowY: 'scroll',
                      overflowX: 'hidden',
                    }}
                  >
                    {students.map((student, index) => (
                      <tr>
                        <th scope="row">{index}</th>
                        <td>{student.name}</td>
                        <td>{student.father_name}</td>
                        <td>{student.student_id}</td>
                        <td>{student.marks}</td>
                      </tr>
                    ))}
                  </tbody> */}

                  {tbodies}
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
                        <IntlMessages id="marks.Marks" />
                      </th>
                      {grad ? (
                        <th scope="col">
                          <IntlMessages id="marks.grade" />
                        </th>
                      ) : null}
                      {gpa ? (
                        <th scope="col">
                          <IntlMessages id="marks.gpa" />
                        </th>
                      ) : null}
                      <th scope="col">
                        <IntlMessages id="marks.type" />
                      </th>{' '}
                      <th scope="col">
                        <IntlMessages id="marks.result" />
                      </th>{' '}
                    </tr>
                  </tfoot>
                </table>
              </Row>
              <Row className=" justify-content-center">
                <Colxx xxs="9" className="m-5">
                  <Button className=" m-4" onClick={() => setIsNext(false)}>
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

export default MarksDisplay;
