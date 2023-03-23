import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const GradeOptions = [
  { value: '3', label: <IntlMessages id="teacher.GradeOption_3" /> },
  { value: '4', label: <IntlMessages id="teacher.GradeOption_4" /> },
  { value: '5', label: <IntlMessages id="teacher.GradeOption_5" /> },
  { value: '6', label: <IntlMessages id="teacher.GradeOption_6" /> },
  { value: '7', label: <IntlMessages id="teacher.GradeOption_7" /> },
  { value: '8', label: <IntlMessages id="teacher.GradeOption_8" /> },
];
const StepOptions = [
  { value: '1', label: <IntlMessages id="teacher.StepOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.StepOption_2" /> },
  { value: '3', label: <IntlMessages id="teacher.StepOption_3" /> },
  { value: '4', label: <IntlMessages id="teacher.StepOption_4" /> },
  { value: '5', label: <IntlMessages id="teacher.StepOption_5" /> },
  { value: '6', label: <IntlMessages id="teacher.StepOption_6" /> },
];
const evaluationTypeOptions = [
  { value: '1', label: <IntlMessages id="teacher.evaluationTypeOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.evaluationTypeOption_2" /> },
];

const SignupSchema = Yup.object().shape({
  teacherId: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.teacherIdErr" />),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  marks: Yup.string().required(<IntlMessages id="teacher.marksErr" />),

  evaluationDate: Yup.string().required(
    <IntlMessages id="teacher.evaluationDateErr" />
  ),

  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.gradeErr" />),

  step: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.stepErr" />),

  newStep: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.newStepErr" />),

  newGrade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.newGradeErr" />),
});

const TeacherEvaluation = () => {
  const [isNext, setIsNext] = useState(false);
  const initialValues = {
    teacherId: [],
    institute: [],
    marks: '',
    evaluationDate: '',
    grade: [],
    step: [],
    newGrade: [],
    newStep: [],
  };

  const onRegister = () => {
    setIsNext(true);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionHrTitle" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={SignupSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-175">
                  <Row className="justify-content-center">
                    <Colxx xxs="5">
                      {/* Teacher Id */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.IdLabel" />
                        </Label>
                        <FormikReactSelect
                          name="teacherId"
                          id="teacherId"
                          value={values.teacherId}
                          options={evaluationTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.teacherId && touched.teacherId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.teacherId}
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
                      {/* Current Grade */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.curretGradeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="grade"
                          id="grade"
                          value={values.grade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={GradeOptions}
                        />
                        {errors.grade && touched.grade ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.grade}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* New Grade */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.newGradeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="newGrade"
                          id="newGrade"
                          value={values.newGrade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={GradeOptions}
                          required
                        />
                        {errors.newGrade && touched.newGrade ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.newGrade}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="5">
                      {/* ّInstitute ID*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.InstituteIdLabel" />
                        </Label>
                        <FormikReactSelect
                          name="institute"
                          id="institute"
                          value={values.institute}
                          options={evaluationTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institute}
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

                      {/* current Step */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.currentStepLabel" />
                        </Label>
                        <FormikReactSelect
                          name="step"
                          id="step"
                          value={values.step}
                          options={StepOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.step && touched.step ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.step}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* New Step */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.newStepLabel" />
                        </Label>
                        <FormikReactSelect
                          name="newStep"
                          id="newStep"
                          value={values.newStep}
                          options={StepOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.newStep && touched.newStep ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.newStep}
                          </div>
                        ) : null}
                      </FormGroup>

                      <div className="d-flex justify-content-between align-items-center m-4 float-right">
                        <Button
                          className={`btn-shadow btn-multiple-state `}
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
                      </div>
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
