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
  evaluator: Yup.string().required(<IntlMessages id="teacher.evaluatorErr" />),
  marks: Yup.string().required(<IntlMessages id="teacher.marksErr" />),
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
    InstituteId: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    Grade: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Step: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    newGrade: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    newStep: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionHrTitle" />}
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
                    {/* Current Grade */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.curretGradeLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Grade"
                        id="Grade"
                        value={values.Grade}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        options={GradeOptions}
                        required
                      />
                      {errors.Grade && touched.Grade ? (
                        <div className="invalid-feedback d-block">
                          {errors.Grade}
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
                        <div className="invalid-feedback d-block">
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

                    {/* current Step */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.currentStepLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Step"
                        id="Step"
                        value={values.Step}
                        options={StepOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.Step && touched.Step ? (
                        <div className="invalid-feedback d-block">
                          {errors.Step}
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
                        <div className="invalid-feedback d-block">
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
