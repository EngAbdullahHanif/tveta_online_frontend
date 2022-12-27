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

const LevelOfEdcationOptions = [
  {
    value: '14th',
    label: <IntlMessages id="teacher.EducationLevelOption_1" />,
  },
  {
    value: 'bachelor',
    label: <IntlMessages id="teacher.EducationLevelOption_2" />,
  },
  {
    value: 'master',
    label: <IntlMessages id="teacher.EducationLevelOption_3" />,
  },
  { value: 'PHD', label: <IntlMessages id="teacher.EducationLevelOption_3" /> },
];

const MajorOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const SignupSchema = Yup.object().shape({
  Name: Yup.string().required(<IntlMessages id="teacher.NameErr" />),

  Institute: Yup.string().required(<IntlMessages id="teacher.InstituteErr" />),

  Department: Yup.string().required(
    <IntlMessages id="teacher.DepartmentErr" />
  ),

  Class: Yup.string().required(<IntlMessages id="teacher.ClassErr" />),

  TazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),

  IdCardPageNo: Yup.string().required(
    <IntlMessages id="teacher.IdCardPageNoErr" />
  ),

  IdCardJoldNo: Yup.string().required(
    <IntlMessages id="teacher.IdCardJoldNoErr" />
  ),

  PhoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),

  Email: Yup.string()
    .email(<IntlMessages id="teacher.EmailRequiredErr" />)
    .required(<IntlMessages id="teacher.EmailErr" />),
});

const TeacherEvaluation = () => {
  const [subjectType, setSubjectType] = useState({});
  const [systemType, setSystemType] = useState({});

  const initialValues = {
    TazkiraType: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    LevelOfEducation: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Status: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Grade: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Step: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Major: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    C_Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    IdCardPageNo: '0',
    IdCardJoldNo: '0',
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
                <Row>
                  <Colxx xxs="6">
                    {/* Teacher Name*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.NameLabel" />
                      </Label>
                      <Field className="form-control" name="Name" />
                      {errors.Name && touched.Name ? (
                        <div className="invalid-feedback d-block">
                          {errors.Name}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/*Department */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.DepartmentLabel" />
                      </Label>
                      <Field className="form-control" name="Department" />
                      {errors.Department && touched.Department ? (
                        <div className="invalid-feedback d-block">
                          {errors.Department}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="teacher.DoBLabel" />
                      </Label>
                      <FormikDatePicker
                        name="DoB"
                        type="date"
                        value={values.DoB}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.DoB && touched.DoB ? (
                        <div className="invalid-feedback d-block">
                          {errors.DoB}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6">
                    {/* Institute Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.InstituteLabel" />
                      </Label>
                      <Field className="form-control" name="Institute" />
                      {errors.Institute && touched.Institute ? (
                        <div className="invalid-feedback d-block">
                          {errors.Institute}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/*  Class  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.ClassLabel" />
                      </Label>
                      <Field className="form-control" name="Class" />
                      {errors.Class && touched.Class ? (
                        <div className="invalid-feedback d-block">
                          {errors.Class}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Tazkira Number */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.TazkiraNoLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="TazkiraNo"
                        type="number"
                      />
                      {errors.TazkiraNo && touched.TazkiraNo ? (
                        <div className="invalid-feedback d-block">
                          {errors.TazkiraNo}
                        </div>
                      ) : null}
                    </FormGroup>

                    {values.TazkiraType.value === '2' ? (
                      <div>
                        {/* Jold Number */}
                        <div>
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.IdCardJoldNoLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="IdCardJoldNo"
                              type="number"
                            />
                            {errors.IdCardJoldNo && touched.IdCardJoldNo ? (
                              <div className="invalid-feedback d-block">
                                {errors.IdCardJoldNo}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {/* Email Address */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.EmailLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="Email"
                        type="Email"
                      />
                      {errors.Email && touched.Email ? (
                        <div className="invalid-feedback d-block">
                          {errors.Email}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Education */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.LevelOfEducationLabel" />
                      </Label>
                      <FormikReactSelect
                        name="LevelOfEducation"
                        id="LevelOfEducation"
                        value={values.LevelOfEducation}
                        options={LevelOfEdcationOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.LevelOfEducation && touched.LevelOfEducation ? (
                        <div className="invalid-feedback d-block">
                          {errors.LevelOfEducation}
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
