/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Form, Field } from 'formik';
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
} from './FormikFields';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('ایمیل که وارد کردی نامعتبره')
    .required('پست الکترونیک اجباریه!'),
  password: Yup.string().required('کلمه عبور اجباریه!'),
  tags: Yup.array()
    .min(3, 'حداقل 3 تا تگ انتخاب کنید')
    .required('حداقل یک تگ اجباریه'),
  date: Yup.date().nullable().required('تاریخ اجباریه!'),
  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required('استان اجباریه!'),
});

const options = [
  { value: 'food', label: 'تهران' },
  { value: 'beingfabulous', label: 'گلستان', disabled: true },
  { value: 'reasonml', label: 'خراسان' },
  { value: 'unicorns', label: 'اصفهان' },
  { value: 'kittens', label: 'فارس' },
];

const FormikCustomWithTopLabels = () => {

  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      state: values.state.value,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="forms.top-labels-over-line" />
              </CardTitle>

              <Formik
                initialValues={{
                  email: 'test@test.com',
                  password: '',
                  tags: [],
                  date: null,
                  state: { value: 'reasonml', label: 'تهران' },
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
                  isSubmitting,
                }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.email" />
                      </Label>
                      <Field className="form-control" name="email" />
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.password" />
                      </Label>
                      <Field
                        className="form-control"
                        name="password"
                        type="password"
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.tags" />
                      </Label>
                      <FormikTagsInput
                        name="tags"
                        value={values.tags}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />

                      {errors.tags && touched.tags ? (
                        <div className="invalid-feedback d-block">
                          {errors.tags}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.state" />
                      </Label>
                      <FormikReactSelect
                        name="state"
                        id="state"
                        value={values.state}
                        options={options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">
                          {errors.state}
                        </div>
                      ) : null}
                    </FormGroup>

                    <Button color="primary" type="submit" onSubmit={handleSubmit}>
                      ارسال فرم
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="forms.top-labels-in-input" />
              </CardTitle>

              <Formik
                initialValues={{
                  email: 'test@test.com',
                  password: '',
                  tags: [],
                  date: null,
                  state: { value: 'reasonml', label: 'خراسان' },
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
                  isSubmitting,
                }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-top-label">
                      <Label>
                        <IntlMessages id="forms.email-u" />
                      </Label>
                      <Field className="form-control" name="email" />
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="form-group has-top-label">
                      <Label>
                        <IntlMessages id="forms.password-u" />
                      </Label>
                      <Field
                        className="form-control"
                        name="password"
                        type="password"
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-top-label">
                      <Label className="d-block">
                        <IntlMessages id="forms.tags-u" />
                      </Label>
                      <FormikTagsInput
                        name="tags"
                        value={values.tags}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />

                      {errors.tags && touched.tags ? (
                        <div className="invalid-feedback d-block">
                          {errors.tags}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-top-label">
                      <Label className="d-block">
                        <IntlMessages id="forms.date-u" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-top-label">
                      <Label>
                        <IntlMessages id="forms.state-u" />
                      </Label>
                      <FormikReactSelect
                        name="state"
                        id="state"
                        value={values.state}
                        options={options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">
                          {errors.state}
                        </div>
                      ) : null}
                    </FormGroup>

                    <Button color="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};
export default FormikCustomWithTopLabels;
