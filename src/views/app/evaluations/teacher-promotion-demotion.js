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
  evaluator: Yup.string().required(<IntlMessages id="teacher.evaluatorErr" />),
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
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.PromotionDemotionTitle" />}
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
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="10">
                    {/* Promotion */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.promotionLabel" />
                      </Label>
                      <textarea
                        className="form-control"
                        name="promotion"
                        rows={4}
                      />
                      {errors.promotion && touched.promotion ? (
                        <div className="invalid-feedback d-block">
                          {errors.promotion}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* Demotion*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.demotionLabel" />
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
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherEvaluation;
