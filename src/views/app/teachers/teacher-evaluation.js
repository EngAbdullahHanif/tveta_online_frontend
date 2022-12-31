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

const SignupSchema = Yup.object().shape({
  // Name: Yup.string().required(<IntlMessages id="teacher.NameErr" />),

  // InstituteId: Yup.string().required(
  //   <IntlMessages id="teacher.InstituteIdErr" />
  // ),

  // departmentId: Yup.string().required(
  //   <IntlMessages id="teacher.departmentIdErr" />
  // ),

  // ClassId: Yup.string().required(<IntlMessages id="teacher.ClassIdErr" />),

  // subjectId: Yup.string().required(<IntlMessages id="teacher.subjectIdErr" />),

  topic: Yup.string().required(<IntlMessages id="teacher.topicErr" />),

  evaluator: Yup.string().required(<IntlMessages id="teacher.evaluatorErr" />),
  marks: Yup.string().required(<IntlMessages id="teacher.marksErr" />),

  strengthPoints: Yup.string().required(
    <IntlMessages id="teacher.strengthPointsErr" />
  ),

  weaknessPoints: Yup.string().required(
    <IntlMessages id="teacher.weaknessPointsErr" />
  ),
});

const TeacherEvaluation = () => {
  const initialValues = {
    evaluationType: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Id: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    departmentId: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    InstituteId: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    classId: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
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
            // onSubmit={onRegister}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row className="justify-content-center">
                  <Colxx xxs="5">
                    {/* Teacher Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.IdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Id"
                        id="Id"
                        value={values.Id}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.Id && touched.Id ? (
                        <div className="invalid-feedback d-block">
                          {errors.Id}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Departement Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.departmentIdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="departmentId"
                        id="departmentId"
                        value={values.departmentId}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.departmentId && touched.departmentId ? (
                        <div className="invalid-feedback d-block">
                          {errors.departmentId}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Subject Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.subjectIdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="subjectId"
                        id="subjectId"
                        value={values.departmentId}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.subjectId && touched.subjectId ? (
                        <div className="invalid-feedback d-block">
                          {errors.subjectId}
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
                        <div className="invalid-feedback d-block">
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
                        <div className="invalid-feedback d-block">
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
                        <div className="invalid-feedback d-block">
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
                        <div className="invalid-feedback d-block">
                          {errors.evaluationDate}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="5">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.InstituteIdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="InstituteId"
                        id="InstituteId"
                        value={values.InstituteId}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.InstituteId && touched.InstituteId ? (
                        <div className="invalid-feedback d-block">
                          {errors.InstituteId}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/*  Class Id  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.classIdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="classId"
                        id="classId"
                        value={values.classId}
                        options={evaluationTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.classId && touched.classId ? (
                        <div className="invalid-feedback d-block">
                          {errors.classId}
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
                        <div className="invalid-feedback d-block">
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
                        <div className="invalid-feedback d-block">
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
                        <div className="invalid-feedback d-block">
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
                        name="weaknessPoints"
                        rows={4}
                      />
                      {errors.suggestion && touched.suggestion ? (
                        <div className="invalid-feedback d-block">
                          {errors.suggestion}
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

                <Row>
                  <Colxx xxs="6"></Colxx>
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
