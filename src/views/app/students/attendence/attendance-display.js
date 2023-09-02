import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import callApi from 'helpers/callApi';
import './../../.././../assets/css/global-style.css';
import { educationalYearsOptions } from './../../global-data/options';

// Year  and SHift

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { studyTimeOptions } from '../../global-data/options';

import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import DisplayMessage from 'components/messages/DisplayMessage';

const LevelOfEdcationOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];

const FieldOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const SemesterOptions = [
  { value: '1', label: <IntlMessages id="marks.SemesterOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SemesterOption_2" /> },
  // { value: '3', label: <IntlMessages id="marks.SemesterOption_3" /> },
  //   { value: '4', label: <IntlMessages id="marks.SemesterOption_4" /> },
];

const SectionOptions = [
  { value: '1', label: <IntlMessages id="marks.SectionOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SectionOption_2" /> },
  { value: '3', label: <IntlMessages id="marks.SectionOption_3" /> },
  { value: '4', label: <IntlMessages id="marks.SectionOption_4" /> },
  { value: '5', label: <IntlMessages id="marks.SectionOption_5" /> },
];

const ClassOptions = [
  { value: '1', label: <IntlMessages id="marks.ClassOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.ClassOption_2" /> },
  { value: '3', label: <IntlMessages id="marks.ClassOption_3" /> },
  { value: '4', label: <IntlMessages id="marks.ClassOption_4" /> },
  { value: '5', label: <IntlMessages id="marks.ClassOption_5" /> },
  { value: '6', label: <IntlMessages id="marks.ClassOption_6" /> },
];

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
  educationalYear: [],
  studyTime: [],
  classs: [],
  department: [],
};
const StudentAttendance = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNext, setIsNext] = useState(false);
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

  useEffect(() => {
    if (selectedInstitute) {
      console.log('selectedInstitute', selectedInstitute);
      fetchDepartments(selectedInstitute);
    }
  }, [selectedInstitute]);

  // fetch student list for typing attendance
  const fetchStudentList = async () => {
    const response = await callApi(
      `students/stdattendence_by/?institute=${selectedInstitute.value}&classs=${selectedClass.value}&shift=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear.value}`,
      'GET',
      null,
    );
    console.log('attendance repspossdfsde', response);
    if (response.data && response.status === 200) {
      setStudents(response.data);
      console.log('response.data.students', response.data);
      setIsNext(true);
    } else {
      console.log('attendance error');
    }
  };

  const onSubmit = (values) => {
    console.log('values', values);
    const educational_year = selectedEducationalYear;
    const institute_id = selectedInstitute.value;
    const department = selectedDepartment.value;
    const class_id = selectedClass.value;
    const subject_id = selectedSubject.value;
    students.map((student) => {
      const examData = {
        educational_year: educational_year,
        student_id: student.student_id,
        institute_id: institute_id,
        Department: department,
        class_id: class_id,
      };
      //REMOVE USER FROM HERE, IT'S JUST FOR TESTING
      //EXAM TYPE IS SELECTED 1, BECUASE THIS PAGE IS FOR THE FIRST CHANCE EXAM MRKS
      console.log('exam', examData);
      const data = {
        subject: subject_id,
        exam_types: 1,
        passing_score: passingScore,
        grad: subjectGrad,
        Gpa: subjectGPA,
        user_id: 1,
        mark: values.score[student.student_id],
      };
      console.log('data', data);
      // axios.post('http://localhost:8000/api/marks/', data);
    });
  };
  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className=" m-5  titleStyle">
            {<IntlMessages id="menu.class_attendance" />}
          </h2>
        </div>
        <CardBody>
          {!isNext ? (
            <Formik
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle ">
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
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right buttonStyle"
                        size="lg"
                        type="submit"
                        style={{ margin: '3% 0% 9% 8%' }}
                        // onClick={() => {
                        //   handleClick(false);
                        // }}
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
                style={{ marginInline: '10%' }}
              >
                <Colxx xxs="2">
                  <Label>
                    <IntlMessages id="forms.FieldLabel" />
                  </Label>
                  {console.log('selectedDepartment', selectedDepartment)}
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
                    <IntlMessages id="marks.SemesterLabel" />
                  </Label>
                  <h6>{selectedClass.label}</h6>
                </Colxx>

                <Colxx xxs="2">
                  <Label>
                    <IntlMessages id="marks.SectionLabel" />
                  </Label>
                  <h6>{selectedClass.label}</h6>
                </Colxx>
              </Row>

              <Row
                className="justify-content-center  border border"
                style={{ marginInline: '10%' }}
              >
                {students.length > 0 ? (
                  <table className="table">
                    <thead className="thead-dark ">
                      <tr>
                        <th colspan="4" className="border text-center">
                          <IntlMessages id="marks.studentChar" />
                        </th>
                        <th colspan="4" className="border text-center">
                          <IntlMessages id="marks.marksDisplayTitle" />
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
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{student.student.name}</td>
                          <td>{student.student.father_name}</td>
                          <td>{student.student.student_id}</td>
                          <td>{student.present_hours}</td>
                          <td>{student.absent_hours}</td>
                          <td>{student.necessary_work_hours}</td>
                          <td>{student.sickness_hours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <DisplayMessage type="error" message="معلومات شتون نلری" />
                )}
                <table class="table">
                  <tbody
                    className="border"
                    // style={{
                    //   height: '200px',
                    //   overflowY: 'scroll',
                    //   overflowX: 'hidden',
                    // }}
                  ></tbody>
                </table>
              </Row>

              <Row
                className="justify-content-center  border border"
                style={{
                  marginInline: '10%',
                }}
              >
                <table class="table ">
                  <tfoot className="thead-dark">
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

export default StudentAttendance;
