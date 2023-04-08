import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { provinceOptions } from './../global-data/data';
import { workersGrade } from './../global-data/data';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const ValidationSchema = Yup.object().shape({
  workerName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StdKankorNameErr" />),

  workerProvince: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="workerProvinceErr" />),

  workerQualification: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="workerQualificationErr" />),

  workerField: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="workerFieldErr" />),

  workerGender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="workerGenderErr" />),

  workerTazkera: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="workerTazkeraErr" />),

  workerDateOfBirth: Yup.string().required(<IntlMessages id="workerDOB" />),

  workerPosition: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="workerPositionErr" />),

  workerStep: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="workerStepErr" />),

  workerGrade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="workerGradeErr" />),

  workerId: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="workerIdErr" />),

  workerTashkilGrade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="workerTashkilGradeErr" />),

  workerGradeType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="workerGradeTypeErr" />),

  workerAppointedDate: Yup.string().required(
    <IntlMessages id="workerAppointedDateErr" />
  ),

  workerStartDate: Yup.string().required(
    <IntlMessages id="workerStartDateErr" />
  ),

  workerAppointedType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="appointedTypeErr" />),
});

const StudentRegistraion = () => {
  // worker's field initiliazation
  const initialValues = {
    workerAppointedType: [],
    workerQualification: '',
    workerGender: [],
    workerName: '',
    workerProvince: [],
    workerGrade: [],
    workerGradeType: [],
    workerAppointedDate: '',
    workerTashkilGrade: [],
    workerPosition: '',
    workerGender: [],
    workerDateOfBirth: '',
    workerField: '',
    workerId: '',
    workerStartDate: '',
    workerStep: '',
    workerTazkera: '',
  };

  // state varibales are going to be set to defaul values
  const [isNext, setIsNext] = useState(false);

  const [workerProvince, setWorkerProvince] = useState(provinceOptions);
  const [workerAppointedType, setworkerAppointedType] = useState([
    {
      value: 1,
      label: 'حکمی',
    },
    {
      value: 2,
      label: 'رقابتی',
    },
  ]);
  const [workerGender, setWorkerGender] = useState([
    {
      value: 1,
      label: 'مرد',
    },
    {
      value: 2,
      label: 'زن',
    },
  ]);

  const [workerGrade, setworkerGrade] = useState(workersGrade);
  const [workerTashkilGrade, setworkerTashkilGrade] = useState(workersGrade);

  const [workerGradeType, setWorkerGradeType] = useState([
    {
      value: 1,
      label: 'مامور',
    },
    {
      value: 2,
      label: 'اجیر',
    },
  ]);

  // after submitting the form
  const handleClick = (event) => {};

  // when form is submitted
  const onRegister = (values, { resetForm }) => {
    console.log('values', values);
    resetForm();
    setIsNext(true);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="workerRegistrationTitle" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Row>
                    <Colxx xxs="6">
                      {/* Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerName" />
                        </Label>
                        <Field className="form-control" name="workerName" />
                        {errors.workerName && touched.workerName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* province  */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerProvince" />
                        </Label>
                        <FormikReactSelect
                          name="workerProvince"
                          id="workerProvince"
                          value={values.workerProvince}
                          options={workerProvince}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.workerProvince && touched.workerProvince ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerProvince}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Institutes  now appointedType*/}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerAppointedType" />
                        </Label>
                        <FormikReactSelect
                          name="workerAppointedType"
                          id="workerAppointedType"
                          value={values.workerAppointedType}
                          options={workerAppointedType}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.workerAppointedType &&
                        touched.workerAppointedType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerAppointedType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*worker qualifications  */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerQualification" />
                        </Label>
                        <Field
                          className="form-control"
                          name="workerQualification"
                        />
                        {errors.workerQualification &&
                        touched.workerQualification ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerQualification}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker field*/}

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerField" />
                        </Label>
                        <Field className="form-control" name="workerField" />
                        {errors.workerField && touched.workerField ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerField}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker Gender */}

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerGender" />
                        </Label>
                        <FormikReactSelect
                          name="workerGender"
                          id="workerGender"
                          value={values.workerGender}
                          options={workerGender}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.workerGender && touched.workerGender ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerGender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker Tazkera */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerTazkera" />
                        </Label>
                        <Field className="form-control" name="workerTazkera" />
                        {errors.workerTazkera && touched.workerTazkera ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerTazkera}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker date of birth*/}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerDateOfBirth" />
                        </Label>
                        <Field
                          className="form-control"
                          name="workerDateOfBirth"
                          type="date"
                        />
                        {errors.workerDateOfBirth &&
                        touched.workerDateOfBirth ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerDateOfBirth}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="6">
                      {/* worker position title*/}

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerPosition" />
                        </Label>
                        <Field className="form-control" name="workerPosition" />
                        {errors.workerPosition && touched.workerPosition ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerPosition}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* wroker step */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerStep" />
                        </Label>
                        <Field className="form-control" name="workerStep" />
                        {errors.workerStep && touched.workerStep ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerStep}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker ID */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerId" />
                        </Label>
                        <Field className="form-control" name="workerId" />
                        {errors.workerId && touched.workerId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker grade */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerGrade" />
                        </Label>
                        <FormikReactSelect
                          name="workerGrade"
                          id="workerGrade"
                          value={values.workerGrade}
                          options={workerGrade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.workerGrade && touched.workerGrade ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerGrade}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* worker tashkil grade */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerTashkeilGrade" />
                        </Label>
                        <FormikReactSelect
                          name="workerTashkilGrade"
                          id="workerTashkilGrade"
                          value={values.workerTashkilGrade}
                          options={workerTashkilGrade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.workerTashkilGrade &&
                        touched.workerTashkilGrade ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerTashkilGrade}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerGradeType" />
                        </Label>
                        <FormikReactSelect
                          name="workerGradeType"
                          id="workerGradeType"
                          value={values.workerGradeType}
                          options={workerGradeType}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.workerGradeType && touched.workerGradeType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerGradeType}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerAppointedDate" />
                        </Label>
                        <Field
                          className="form-control"
                          name="workerAppointedDate"
                          type="date"
                        />
                        {errors.workerAppointedDate &&
                        touched.workerAppointedDate ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerAppointedDate}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="workerStartDate" />
                        </Label>
                        <Field
                          className="form-control"
                          name="workerStartDate"
                          type="date"
                        />
                        {errors.workerStartDate && touched.workerStartDate ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.workerStartDate}
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
                          <IntlMessages id="forms.SubimssionButton" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
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

export default StudentRegistraion;
