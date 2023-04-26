import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {evaluationTypeOptions} from '../global-data/options'
import { teacherEvalautionSchema } from '../global-data/forms-validation';
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
const servicePath = 'http://localhost:8000';
const teachersApiUrl = `${servicePath}/teachers/`;
const institutesApiUrl = `${servicePath}/institute/`;
const departmentsApiUrl = `${servicePath}/institute/department/`;
const classesApiUrl = `${servicePath}/institute/classs/`;
const subjectApiUrl = `${servicePath}/institute/subject/`;
// const fieldsApiUrl = `${servicePath}/institute/field/`;
const evaluationApiUrl = `${servicePath}/teachers/evaluation-create/`;
const TeacherEvaluationAPI = `${servicePath}/teachers/evaluation`;
//http://localhost:8000/teachers/evaluation/?id=1



const TeacherEvaluation = () => {
  const { teacherId } = useParams();
  console.log('teacher evaluation', teacherId);

  if (teacherId) {
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get(
          `${TeacherEvaluationAPI}/?id=${teacherId}`
        );
        setInitialEvaluator(data[0].evaluator_name);
        setInitialStrengthPoints(data[0].strong_points);
        setInitialWeaknessPoint(data[0].weak_points);
        setInitialMarks(data[0].score);
        setInitialEvaluationDate(data[0].evaluation_date);
        setInitialSuggestions(data[0].suggestions);
        setInitialTopic(data[0].topic);

        setInitialId([
          { value: data[0].teacher_id.id, label: data[0].teacher_id.name },
        ]);
        setInitialDepartment([
          {
            value: data[0].department_id.id,
            label: data[0].department_id.name,
          },
        ]);
        setInitialSubject([
          {
            value: data[0].subject_id.id,
            label: data[0].subject_id.name,
          },
        ]);

        setInitialInsititute([
          {
            value: data[0].institute_id.id,
            label: data[0].institute_id.name,
          },
        ]);
        setInitialClass([
          {
            value: data[0].class_id.id,
            label: data[0].class_id.name,
          },
        ]);

        const TeacherEvaluationOptions = evaluationTypeOptions.map(
          (evaluationType) => {
            if (evaluationType.value === data[0].evaluation_type) {
              setInitialEvluationType(evaluationType);
            }
          }
        );
      }
      fetchData();
      //setUpdateMode(true);
    }, []);
  }

  const [initialId, setInitialId] = useState([]);
  const [initialDepartment, setInitialDepartment] = useState([]);
  const [initialSubject, setInitialSubject] = useState([]);
  const [initialEvaluator, setInitialEvaluator] = useState();
  const [initialMarks, setInitialMarks] = useState('');
  const [initialStrengthPoints, setInitialStrengthPoints] = useState('');
  const [initialEvaluationDate, setInitialEvaluationDate] = useState('');
  const [initialInsititute, setInitialInsititute] = useState([]);
  const [initialClass, setInitialClass] = useState([]);
  const [initialTopic, setInitialTopic] = useState('');
  const [initialEvluationType, setInitialEvluationType] = useState([]);
  const [initialSuggestions, setInitialSuggestions] = useState('');
  const [initialWeaknessPoint, setInitialWeaknessPoint] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [strengthPoints, setStrengthPoints] = useState('');
  const [weaknessPoints, setWeaknessPoints] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  const fetchTeachers = async () => {
    const response = await axios.get(teachersApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setTeachers(updatedData);
  };

  const fetchInstitutes = async () => {
    const response = await axios.get(institutesApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };

  const fetchDepartments = async () => {
    const response = await axios.get(departmentsApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setDepartments(updatedData);
  };

  const fetchClasses = async () => {
    const response = await axios.get(classesApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name + ' - ' + item.semester + ' - ' + item.section,
    }));
    setClasses(updatedData);
  };
  const fetchSubjects = async () => {
    const response = await axios.get(subjectApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setSubjects(updatedData);
  };

  useEffect(() => {
    fetchTeachers();
    fetchInstitutes();
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
  }, []);

  const initialValues = {
    id: initialId,
    department: initialDepartment,
    subject: initialSubject,
    evaluator: initialEvaluator,
    strengthPoints: initialStrengthPoints,
    marks: initialMarks,
    evaluationDate: initialEvaluationDate,
    institute: initialInsititute,
    class: initialClass,
    topic: initialTopic,
    evaluationType: initialEvluationType,
    weaknessPoints: initialWeaknessPoint,
    suggestion: initialSuggestions,
  };

  const onSubmit = (values) => {
    setIsNext(true)
    console.log(values);
    const data = {
      teacher_id: values.teacher.value,
      institute_id: values.institute.value,
      department_id: values.department.value,
      class_id: values.class.value,
      subject_id: values.subject.value,
      topic: values.topic,
      evaluator_name: values.evaluator,
      evaluation_type: values.evaluationType.value,
      strong_points: strengthPoints,
      weak_points: weaknessPoints,
      suggestions: suggestion,
      score: values.marks,
      evaluation_date: values.evaluationDate,
      user_id: 1,
    };

    axios
      .post(evaluationApiUrl, data)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const [isNext, setIsNext] = useState(false);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionTitle" />}
        </h3>
        <CardBody>
        {!isNext ? (
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={teacherEvalautionSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right error-l-150 ">
                <Row className="justify-content-center">
                  <Colxx xxs="5">
                    {/* teacher Name*/}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="teacher.IdLabel" />
                      </Label>

                      <FormikReactSelect
                        name="id"
                        id="id"
                        value={values.id}
                        options={teachers}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.id && touched.id ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.id}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Departement Id */}

                    <FormGroup className="form-group has-float-label ">
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
                        required
                      />
                      {errors.department && touched.department ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.department}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Subject Id */}
                    <FormGroup className="form-group has-float-label ">
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
                        required
                      />
                      {errors.subject && touched.subject ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.subject}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* evaluator Name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.evaluatorLabel" />
                      </Label>
                      <Field className="form-control" name="evaluator" />
                      {errors.evaluator && touched.evaluator ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.evaluator}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Strength Points */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.strengthPointsLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="strengthPoints"
                        as="textarea"
                      />
                      {errors.strengthPoints && touched.strengthPoints ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.strengthPoints}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Achieved Marks */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.marksLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="marks"
                        type="number"
                      />
                      {errors.marks && touched.marks ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.marks}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Evalualtion Date */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.evaluationDateLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="evaluationDate"
                        type="date"
                      />
                      {errors.evaluationDate && touched.evaluationDate ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.evaluationDate}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="5">
                    {/* Institute Name*/}
                    <FormGroup className="form-group has-float-label ">
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
                      />
                      {errors.institute && touched.institute ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.institute}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/*  Class Id  */}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <FormikReactSelect
                        name="class"
                        id="class"
                        value={values.class}
                        options={classes}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.class && touched.class ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.class}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Topic */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.topicLabel" />
                      </Label>
                      <Field className="form-control" name="topic" />
                      {errors.topic && touched.topic ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.topic}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Evlaution type */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.evaluationTypeLabel" />
                      </Label>
                      <FormikReactSelect
                        name="evaluationType"
                        id="evaluationType"
                        value={values.evaluationType}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.evaluationType && touched.evaluationType ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.evaluationType}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Weakness Points */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.weaknessPointsLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="weaknessPoints"
                        as="textarea"
                      />
                      {errors.weaknessPoints && touched.weaknessPoints ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.weaknessPoints}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Suggestion */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.suggestionLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="suggestion"
                        as="textarea"
                        rows={4}
                      />
                      {errors.suggestion && touched.suggestion ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.suggestion}
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
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="button.SubmitButton" />
                      </span>
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
          ) : (
            <div
              className="wizard-basic-step text-center pt-3 "
              style={{ minHeight: '400px' }}
            >
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button
                  className="m-5 bg-primary"
                  onClick={() => setIsNext(false)}
                >
                  <IntlMessages id="button.back" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};
export default TeacherEvaluation;
