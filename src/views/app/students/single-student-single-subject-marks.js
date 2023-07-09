import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, isEmptyArray } from 'formik';
import axios from 'axios';
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

  subject: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.SubjectErr" />),
});

const initialValues = {
  studentID: '',
  educationalYear: [],
  classs: [],
  subject: [],
};
function singleStudentSingleSubjectMarks(props) {
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

  const onSubmit = async (values) => {
    console.log('Selected Class:', selectedClassLabel);
    console.log('VALUES in Single Subject Marks display: ', values);
    const data = {
      studentID: values.studentID,
      class: values.classs.value,
      educationalYear: values.educationalYear.value,
      subject: values.subject.value,
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
            // <>
            //   <Row
            //     className="border border bg-primary me-5 p-1 "
            //     style={{ marginInline: "6%" }}
            //   >
            //     <Colxx xxs="2">
            //       <Label>
            //         <IntlMessages id="forms.FieldLabel" />
            //       </Label>
            //       {/* {console.log('selectedDepartment', selectedDepartment)} */}
            //       <h6>{"selectedDepartment.label"}</h6>
            //     </Colxx>

            //     <Colxx xxs="2">
            //       <Label>
            //         <IntlMessages id="forms.StudyTimeLabel" />
            //       </Label>
            //       <h6>{"selecedStudyTime.label"}</h6>
            //     </Colxx>
            //     <Colxx xxs="2">
            //       <Label>
            //         <IntlMessages id="marks.ClassLabel" />
            //       </Label>
            //       <h6>{"selectedClassLabel.classs"}</h6>
            //     </Colxx>

            //     <Colxx xxs="2">
            //       <Label>
            //         <IntlMessages id="marks.SectionLabel" />
            //       </Label>
            //       <h6>{"selectedClassLabel.section"}</h6>
            //     </Colxx>

            //     <Colxx xxs="2">
            //       <Label>
            //         <IntlMessages id="marks.SubjectLabel" />
            //       </Label>
            //       <h6>{"selectedSubject.label"}</h6>
            //     </Colxx>
            //   </Row>

            //   <Row
            //     className="justify-content-center  border border"
            //     style={{ marginInline: "6%" }}
            //   >
            //     <table className="table ">
            //       <thead className="thead-dark">
            //         <tr>
            //           <th scope="col">
            //             <IntlMessages id="marks.No" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.FullName" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.FatherName" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.ID" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.Marks" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.type" />
            //           </th>{" "}
            //           {grad ? (
            //             <th scope="col">
            //               <IntlMessages id="marks.grade" />
            //             </th>
            //           ) : null}
            //           {gpa ? (
            //             <th scope="col">
            //               <IntlMessages id="marks.gpa" />
            //             </th>
            //           ) : null}
            //           <th scope="col">
            //             <IntlMessages id="marks.result" />
            //           </th>{" "}
            //         </tr>
            //       </thead>
            //       {/* </table>
            //       </Row>

            //       <Row
            //         className="justify-content-center  border border"
            //         style={{
            //           marginInline: '16%',
            //           height: '30rem',
            //           overflowY: 'scroll',
            //           overflowX: 'hidden',
            //         }}
            //       >
            //         <table class="table"> */}
            //       {/* <tbody
            //             className="border border "
            //             style={{
            //               height: '200px',
            //               overflowY: 'scroll',
            //               overflowX: 'hidden',
            //             }}
            //           >
            //             {students.map((student, index) => (
            //               <tr>
            //                 <th scope="row">{index}</th>
            //                 <td>{student.name}</td>
            //                 <td>{student.father_name}</td>
            //                 <td>{student.student_id}</td>
            //                 <td>{student.marks}</td>
            //               </tr>
            //             ))}
            //           </tbody> */}

            //       {tbodies}
            //       {/* <tfoot className="thead-dark">
            //         <tr>
            //           <th scope="col">
            //             <IntlMessages id="marks.No" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.FullName" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.FatherName" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.ID" />
            //           </th>
            //           <th scope="col">
            //             <IntlMessages id="marks.Marks" />
            //           </th>
            //           {grad ? (
            //             <th scope="col">
            //               <IntlMessages id="marks.grade" />
            //             </th>
            //           ) : null}
            //           {gpa ? (
            //             <th scope="col">
            //               <IntlMessages id="marks.gpa" />
            //             </th>
            //           ) : null}
            //           <th scope="col">
            //             <IntlMessages id="marks.type" />
            //           </th>{" "}
            //           <th scope="col">
            //             <IntlMessages id="marks.result" />
            //           </th>{" "}
            //         </tr>
            //       </tfoot> */}
            //     </table>
            //   </Row>
            //   <Row className=" justify-content-center">
            //     <Colxx xxs="9" className="m-5">
            //       <Button className=" m-4" onClick={() => setIsNext(false)}>
            //         <IntlMessages id="button.Back" />
            //       </Button>
            //     </Colxx>
            //   </Row>
            // </>
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
                initialValues={initialValues}
                onSubmit={onSubmit}
                // validationSchema={ValidationSchema}
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
                                  {student.id}
                                </td>
                                <td
                                  style={{
                                    fontSize: '20px',
                                    textAlign: 'center',
                                  }}
                                >
                                  {student.oldMarks}
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
                                      name={`score[${student.student_id}]`}
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
