import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';

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
import { useEffect } from 'react';

const Options = [
  {
    value: '1',
    label: 'option -1',
  },
  {
    value: '2',
    label: 'option-2',
  },
];

const SignupSchema = Yup.object().shape({
  departmentId: Yup.object()
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
    .required(<IntlMessages id="curriculum.subjectdErr" />),

  class: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="curriculum.classErr" />),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="curriculum.eduactionalYearErr" />),
});

const Curriculum = (values) => {
  const initialValues = {
    departmentId: [],
    subject: [],
    class: [],
    educationalYear: [],
  };

  const [isNext, setIsNext] = useState(true);

  const handleClick = (event) => {
    // HANIF BROTHER DONT FORGET TO DISPLAY THE SUCCESS MESSAGE AFTER SUBMISSION
    // setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="curriculum.curriculumTittle" />}
        </h3>
        <CardBody>
          {isNext ? (
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
                  <Row className="justify-content-center inlineBlock">
                    <Colxx xxs="11">
                      {/* Department Id */}
                      <FormGroup className="form-group has-float-label ">
                        <Label>
                          <IntlMessages id="curriculum.departmentIdLabel" />
                        </Label>
                        <FormikReactSelect
                          name="departmentId"
                          id="departmentId"
                          value={values.departmentId}
                          options={Options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.departmentId && touched.departmentId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Subject */}
                      <FormGroup className="form-group has-float-label ">
                        <Label>
                          <IntlMessages id="curriculum.subjectdLabel" />
                        </Label>
                        <FormikReactSelect
                          name="subject"
                          id="subject"
                          value={values.subject}
                          options={Options}
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

                      {/* Class */}
                      <FormGroup className="form-group has-float-label ">
                        <Label>
                          <IntlMessages id="curriculum.classLabel" />
                        </Label>
                        <FormikReactSelect
                          name="class"
                          id="class"
                          value={values.class}
                          options={Options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.class && touched.class ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.class}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Eduactional Year*/}
                      <FormGroup className="form-group has-float-label ">
                        <Label>
                          <IntlMessages id="curriculum.eduactionalYearLabel" />
                        </Label>
                        <FormikReactSelect
                          name="educationalYear"
                          id="educationalYear"
                          value={values.educationalYear}
                          options={Options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.educationalYear}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    {' '}
                    <Colxx style={{ marginLeft: '5%', marginBottom: '5%' }}>
                      <Button
                        className="float-right m-5 "
                        size="lg"
                        type="submit"
                        color="primary"
                        onClick={() => {
                          onRegister;
                          handleClick(false);
                        }}
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
                <Button className="m-5 bg-primary">
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

export default Curriculum;
