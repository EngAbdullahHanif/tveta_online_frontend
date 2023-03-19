import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
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
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from '../../../containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const fieldRegisterationApiUrl = `${servicePath}/institute/field-create/`;

const SignupSchema = Yup.object().shape({
  fieldId: Yup.string().required(<IntlMessages id="field.FieldIdErr" />),

  fieldName: Yup.string()
    //  .min(3, <IntlMessages id="forms.StdId" />)
    .required(<IntlMessages id="field.FieldNameErr" />),

  fieldEnglishName: Yup.string().required(
    <IntlMessages id="field.FieldEngNameErr" />
  ),

  sector: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.sectorErr" />),
});

const sectorOptions = [
  { value: '1', label: 'economic' },
  { value: '2', label: 'technology' },
  { value: '3', label: 'agriculture' },
];

const FieldRegister = () => {
  const [isNext, setIsNext] = useState(false);
  const onSubmit = (values, { resetForm }) => {
    console.log('values', values);
    console.log(values, 'values');
    setIsNext(true);
    resetForm();
    //remove the user_id after authentication is done
    const data = {
      fieldId: values.fieldId,
      name: values.fieldName,
      english_name: values.fieldEnglishName,
      sector: values.sector.value,
      user_id: 1,
    };

    axios
      .post(fieldRegisterationApiUrl, data)
      .then((res) => {
        console.log('success');
      })
      .catch((err) => {
        console.log('failed');
      });
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="field.FieldRegisterTitle" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={{
                fieldId: '',
                fieldName: '',
                fieldEnglishName: '',
                sector: [],
              }}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                resetForm,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-175">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      {/* Field ID */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="field.FieldIdLabel" />
                        </Label>

                        <Field className="form-control" name="fieldId" />
                        {errors.fieldId && touched.fieldId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.fieldId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Field Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="field.FieldNameLabel" />
                        </Label>

                        <Field className="form-control" name="fieldName" />
                        {errors.fieldName && touched.fieldName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.fieldName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Field Name In English */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="field.FieldEngNameLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="fieldEnglishName"
                        />
                        {errors.fieldEnglishName && touched.fieldEnglishName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.fieldEnglishName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* sector*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.sector" />
                        </Label>
                        <FormikReactSelect
                          name="sector"
                          id="sector"
                          value={values.sector}
                          options={sectorOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.sector && touched.sector ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.sector}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    {' '}
                    <Colxx style={{ marginLeft: '5%', marginBottom: '8%' }}>
                      <Button
                        className="float-right m-5 "
                        size="lg"
                        type="submit"
                        color="primary"
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

export default FieldRegister;
