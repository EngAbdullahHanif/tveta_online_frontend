// this is the page where admin can upgrade students exam status to send level which means that student all marks have uploaded, after giveing all subjects exams and if they pass the exam then they can upgrade this status to next level

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { studyTimeOptions } from '../global-data/options';
import './../../../assets/css/global-style.css';
import { NotificationManager } from 'components/common/react-notifications';

// Year  and SHift

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
} from 'containers/form-validations/FormikFields';

import callApi from 'helpers/callApi';

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

const StudentClassStatusUpgrade = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [header, setHeader] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selecedStudyTime, setSelectedStudyTime] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');
  const [passingScore, setPassingScore] = useState(55);
  const [subjectGrad, setSubjectGrad] = useState();
  const [reload, setReload] = useState();
  const [checkedItems, setCheckedItems] = useState({});

  const [classs, setClasss] = useState();
  const [semester, setSemester] = useState();
  const [section, setSection] = useState();

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
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
  }, []);

  const fetchStudents = async (event) => {
    const response = await callApi(
      `students/class_marks?institute=${selectedInstitute.value}&classs=${selectedClass.value}&shift=${selecedStudyTime.value}&department=${selectedDepartment.value}&educational_year=${selectedEducationalYear}&upgrade=1`,
      '',
      null
    );
    if (response.data && response.status === 200) {
      setIsNext(true);
      setStudents(response.data);
      setHeader(response.data[0]);

      console.log('response.data ', response.data);

      // split selected class to get semester and section
      const classArray = selectedClass.label.split(' - ');
      setClasss(classArray[0]);
      setSemester(classArray[1]);
      setSection(classArray[2]);
    } else {
      console.log('students error');
    }
  };
  const handleChange = (event, index) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => {
      const newCheckedItems = [...prevState];
      newCheckedItems[index] = checked;
      return newCheckedItems;
    });
  };

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'شاگردانو نمری تاید شوی',
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

  const onSubmit = async (values) => {
    const data = [
      {
        institute: selectedInstitute.value,
        classs: selectedClass.value,
        shift: selecedStudyTime.value,
        department: selectedDepartment.value,
        educational_year: selectedEducationalYear,
        verification_result: 'verified',
      },
      { students: students },
    ];
    console.log('data', data);

    const response = await callApi(
      'students/students-class-status-upgrade/',
      'POST',
      data
    );
    if (response.data && response.status === 200) {
      console.log('response.data', response.data);
      createNotification('success', 'filled');
      setReload(false);
      setIsNext(false);
      setStudents([]);
    } else {
      createNotification('error', 'filled');

      console.log('students error');
    }
  };

  const initialValues = {
    institute: [],
    educationlaYear: '',
    studyTime: [],
    classs: [],
    department: [],
  };
  const secondFormInitialValues = {
    passedStudents: [],
  };

  const [isMasterChecked, setIsMasterChecked] = useState(false);

  const handleMasterCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const updatedCheckedItems = Object.keys(checkedItems).reduce(
      (acc, index) => ({ ...acc, [index]: isChecked }),
      {}
    );
    setCheckedItems(updatedCheckedItems);
    setIsMasterChecked(isChecked);
  };

  // const handleMasterCheckboxChange = (event) => {
  //   const isChecked = event.target.checked;
  //   const updatedCheckedItems = Object.keys(checkedItems).reduce(
  //     (acc, studentId) => ({ ...acc, [studentId]: { checked: isChecked } }),
  //     {}
  //   );
  //   setCheckedItems(updatedCheckedItems);
  //   setIsMasterChecked(isChecked);
  // };

  useEffect(() => {
    setIsMasterChecked(Object.values(checkedItems).every(Boolean));
  }, [checkedItems]);

  const [checkedIndexes, setCheckedIndexes] = useState([]);

  const handleCheckboxChange = (index) => {
    console.log('indexsdfsd', index);
    // check if the index is already in the array
    if (checkedIndexes.includes(index)) {
      // if it is, remove it from the array
      setCheckedIndexes(checkedIndexes.filter((i) => i !== index));
      console.log('checkedIndexes reomved', checkedIndexes);
    } else {
      // if it's not, add it to the array
      setCheckedIndexes([...checkedIndexes, index]);
      console.log('checkedIndexes added', checkedIndexes);
    }
  };

  const getSelectedStudents = () => {
    const arrayLength = Array(students.map((student) => student));

    // cleanedStudents.shift();
    console.log('arrayLength', arrayLength);
    console.log('checkedIndesdfxes', checkedIndexes);
    // filter the students array based on the checkedIndexes array
    const selectedStudents = students.filter((student, index) =>
      checkedIndexes.includes(index)
    );
    // return the selected students
    // return selectedStudents;
    console.log('selectedStudents', selectedStudents);
  };

  return (
    <>
      <Card>
        <div className="mt-4 ml-5">
          <h2 className=" m-5  titleStyle">
            {<IntlMessages id="student.marks.completion-approval" />}
          </h2>
        </div>
        <CardBody>
          {!reload ? (
            <>
              {!isNext ? (
                <Formik
                  initialValues={initialValues}
                  validationSchema={ValidationSchema}
                  onSubmit={fetchStudents}
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
                          <FormGroup className="form-group has-float-label mt-5 error-l-150 ">
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
                            {errors.educationlaYear &&
                            touched.educationlaYear ? (
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

                          <FormGroup className="form-group has-float-label mt-5 error-l-150 ">
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
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx>
                          <Button
                            color="primary"
                            className="float-right m-5"
                            size="lg"
                            type="submit"
                            // onClick={() => {
                            //   handleClick(false);
                            // }}
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
                  {/* Result of Search */}
                  <Row
                    className="border border bg-primary me-5 p-1"
                    style={{ marginInline: '2%' }}
                  >
                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                      <h6>{selectedDepartment.label}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <h6>{classs}</h6>
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
                      <h6>{semester}</h6>
                    </Colxx>

                    <Colxx xxs="2">
                      <Label>
                        <IntlMessages id="marks.SectionLabel" />
                      </Label>
                      <h6>{section}</h6>
                    </Colxx>
                  </Row>
                  <Row
                    style={{
                      marginInline: '2%',
                      maxWidth: '97%',
                      maxHeight: '900px',
                      overflowX: 'auto',
                      overflowY: 'auto',
                    }}
                  >
                    <Formik
                      initialValues={secondFormInitialValues}
                      onSubmit={onSubmit}
                      // validationSchema={ValidationSchema}
                    >
                      {({ errors }) => (
                        <Form className="table" striped>
                          <Row>
                            <table className="table" striped>
                              <thead
                                className="thead-dark "
                                style={{ marginInline: '2%' }}
                              >
                                <tr>
                                  <th
                                    colspan="3"
                                    className="border text-center"
                                  >
                                    <IntlMessages id="marks.studentChar" />
                                  </th>
                                  <th
                                    colspan={header.length - 3}
                                    className="border text-center"
                                  >
                                    <IntlMessages id="marks.marksDisplayTitle" />
                                  </th>{' '}
                                  {/* <th className="border text-center">
                                <IntlMessages id="marks.resultHeader" />
                              </th> */}
                                </tr>
                              </thead>
                              <thead
                                className="thead-dark border  text-center"
                                style={{ marginInline: '5%' }}
                              >
                                <tr>
                                  {header.map((item, index) => (
                                    <th
                                      key={index}
                                      className="border  text-center"
                                    >
                                      {item.name}
                                    </th>
                                  ))}
                                </tr>
                              </thead>

                              <tbody
                                className="border border "
                                style={{
                                  maxHeight: '500px',
                                  overflowY: 'scroll',
                                  overflowX: 'hidden',
                                }}
                              >
                                {students.map((studentRow, index) => {
                                  return (
                                    <tr key={index}>
                                      {!index == 0 ? (
                                        <>
                                          {studentRow.map(
                                            (student, secondIndex) => {
                                              return (
                                                <>
                                                  {secondIndex === 0 ||
                                                  secondIndex === 1 ||
                                                  secondIndex === 2 ? (
                                                    <td
                                                      scope="col"
                                                      className="border text-center "
                                                    >
                                                      {student.name}
                                                    </td>
                                                  ) : (
                                                    <td
                                                      scope="col"
                                                      className="border text-center "
                                                    >
                                                      {student.score}
                                                    </td>
                                                  )}
                                                </>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : null}
                                    </tr>
                                  );
                                })}
                              </tbody>

                              <tfoot
                                className="thead-dark"
                                style={{ marginInline: '5%' }}
                              >
                                <tr>
                                  {header.map((header1, index) => (
                                    <th
                                      key={index}
                                      className="border  text-center"
                                    >
                                      {header1.name}
                                    </th>
                                  ))}
                                  {/* <th className="border text-center">
                                <IntlMessages id="marks.resultHeader" />
                              </th> */}
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
                                {/* <IntlMessages id="button.Back" /> */}
                                reject
                              </Button>
                            </Colxx>
                            <div className="d-flex justify-content-between align-items-center m-4 float-right">
                              <Button
                                // size="lg"
                                color="primary"
                                type="submit"
                                // onClick={() => getSelectedStudents()}
                              >
                                {/* <IntlMessages id="button.SubmitButton" /> */}
                                Approve
                              </Button>
                            </div>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </Row>
                </>
              )}
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
                  onClick={() => {
                    {
                      setReload(false);
                      setIsNext(false);
                    }
                  }}
                >
                  <IntlMessages id="button.Back" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default StudentClassStatusUpgrade;
