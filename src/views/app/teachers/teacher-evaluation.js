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

const evaluationTypeOptions = [
  { value: '1', label: <IntlMessages id="teacher.evaluationTypeOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.evaluationTypeOption_2" /> },
];

const ValidationSchema = Yup.object().shape({
  id: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.IdErr" />),

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

  evaluator: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.evaluatorErr" />),

  strengthPoints: Yup.string()
    .min(10, <IntlMessages id="min.minInputValues" />)
    .required(<IntlMessages id="teacher.strengthPointsErr" />),

  marks: Yup.string().required(<IntlMessages id="teacher.marksErr" />),
  evaluationDate: Yup.string().required(
    <IntlMessages id="teacher.evaluationDateErr" />
  ),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  classs: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.ClassErr" />),

  topic: Yup.string().required(<IntlMessages id="teacher.topicErr" />),

  evaluationType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.evaluationTypeErr" />),

  weaknessPoints: Yup.string().required(
    <IntlMessages id="teacher.weaknessPointsErr" />
  ),
  // suggestion: Yup.string().required(
  //   <IntlMessages id="teacher.suggestionErr" />
  // ),
});

const TeacherEvaluation = () => {
  const initialValues = {
    id: [],
    department: [],
    subject: [],
    evaluator: '',
    strengthPoints: '',
    marks: '',
    evaluationDate: '',
    institute: [],
    classs: [],
    topic: '',
    evaluationType: [],
    weaknessPoints: '',
    suggestion: '',
  };

  const onSubmit = () => {
    console.log('onSubmit is called');
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionTitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ValidationSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right error-l-150 ">
                <Row className="justify-content-center">
                  <Colxx xxs="5">
                    {/* Teacher Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.IdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="id"
                        id="id"
                        value={values.id}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
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
                        options={evaluationTypeOptions}
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
                        options={evaluationTypeOptions}
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
                      <textarea
                        className="form-control"
                        name="strengthPoints"
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
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="forms.InstituteLabel" />
                      </Label>
                      <FormikReactSelect
                        name="institute"
                        id="institute"
                        value={values.institute}
                        options={evaluationTypeOptions}
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
                        name="classs"
                        id="classs"
                        value={values.classs}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.classs && touched.classs ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.classs}
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
                      <textarea
                        className="form-control"
                        name="weaknessPoints"
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
                      <textarea
                        className="form-control"
                        name="suggestion"
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
                      onClick={() => {
                        onSubmit;
                      }}
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
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherEvaluation;
