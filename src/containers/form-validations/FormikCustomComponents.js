/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCheckbox,
  FormikRadioButtonGroup,
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker,
} from './FormikFields';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('ایمیل که وارد کردی نامعتبره')
    .required('پست الکترونیک اجباریه!'),
  select: Yup.string().required('انتخاب گزینه اجباریه'),
  reactSelect: Yup.array()
    .min(3, 'حداقل 3 تا تگ انتخاب کنید')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),
  checkboxSingle: Yup.bool().oneOf([true], 'یه چیزی رو باید بپذیری'),
  checkboxCustomSingle: Yup.bool().oneOf([true], 'یه چیزی رو باید بپذیری'),
  checkboxGroup: Yup.array()
    .min(2, 'حداقل 2تا تگ باید انتخاب کنید')
    .required('حداقل یک چک باکس اجباریه'),

  customCheckGroup: Yup.array()
    .min(2, 'حداقل 2تا تگ باید انتخاب کنید')
    .required('حداقل یک چک باکس اجباریه'),

  radioGroup: Yup.string().required('انتخاب رادیوباتن اجباریه'),
  customRadioGroup: Yup.string().required('انتخاب رادیوباتن اجباریه'),
  tags: Yup.array()
    .min(3, 'حداقل 3 تا تگ انتخاب کنید')
    .required('حداقل یک چک باکس اجباریه'),
  switch: Yup.bool().oneOf([true], 'یه چیزی رو باید بپذیری'),
  date: Yup.date().nullable().required('تاریخ اجباریه'),
});

const options = [
  { value: 'food', label: 'نهار' },
  { value: 'beingfabulous', label: 'میان وعده صبح', disabled: true },
  { value: 'reasonml', label: 'میان وعده عصر' },
  { value: 'unicorns', label: 'بعد غذا' },
  { value: 'kittens', label: 'شام' },
];

const FormikCustomComponents = () => {
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      reactSelect: values.reactSelect.map((t) => t.value),
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">کامپوننت ها و طرح بندی سفارشی با Yup</h6>
            <Formik
              initialValues={{
                email: 'test@test.com',
                select: '3',
                reactSelect: [{ value: 'reasonml', label: 'میان وعده عصر' }],
                checkboxGroup: ['kittens'],
                customCheckGroup: ['unicorns'],
                checkboxSingle: true,
                checkboxCustomSingle: false,
                radioGroup: '',
                customRadioGroup: '',
                tags: ['کیک', 'دسر'],
                switch: false,
                date: null,
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
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup className="error-l-100">
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
                  <FormGroup className="error-l-100">
                    <Label>سلکت </Label>
                    <select
                      name="select"
                      className="form-control"
                      value={values.select}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="">یه گزینه رو انتخاب کن</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>

                    {errors.select && touched.select ? (
                      <div className="invalid-feedback d-block">
                        {errors.select}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label>ری اکت سلکت - React Select</Label>
                    <FormikReactSelect
                      name="reactSelect"
                      id="reactSelect"
                      value={values.reactSelect}
                      isMulti
                      options={options}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.reactSelect && touched.reactSelect ? (
                      <div className="invalid-feedback d-block">
                        {errors.reactSelect}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-150">
                    <Label className="d-block">چک باکس تکی  </Label>
                    <FormikCheckbox
                      name="checkboxSingle"
                      value={values.checkboxSingle}
                      label="یه چیزی رو بپذیر"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.checkboxSingle && touched.checkboxSingle ? (
                      <div className="invalid-feedback d-block">
                        {errors.checkboxSingle}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-150">
                    <Label className="d-block">چک باکس سفارشی تکی</Label>
                    <FormikCustomCheckbox
                      name="checkboxCustomSingle"
                      value={values.checkboxCustomSingle}
                      label="یه چیزی رو بپذیر"
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.checkboxCustomSingle &&
                    touched.checkboxCustomSingle ? (
                      <div className="invalid-feedback d-block">
                        {errors.checkboxCustomSingle}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-150 ">
                    <Label className="d-block">چک باکس گروهی</Label>
                    <FormikCheckboxGroup
                      inline
                      name="checkboxGroup"
                      id="checkboxGroup"
                      label="کدوم یکی؟"
                      value={values.checkboxGroup}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={options}
                    />
                    {errors.checkboxGroup && touched.checkboxGroup ? (
                      <div className="invalid-feedback d-block">
                        {errors.checkboxGroup}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-175 ">
                    <Label className="d-block">چک باکس گروهی سفارشی</Label>
                    <FormikCustomCheckboxGroup
                      inline
                      name="customCheckGroup"
                      id="customCheckGroup"
                      label="کدوم یکی؟"
                      value={values.customCheckGroup}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={options}
                    />
                    {errors.customCheckGroup && touched.customCheckGroup ? (
                      <div className="invalid-feedback d-block">
                        {errors.customCheckGroup}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-150">
                    <Label className="d-block">رادیوباتن گروهی</Label>
                    <FormikRadioButtonGroup
                      inline
                      name="radioGroup"
                      id="radioGroup"
                      label="یکی از اینها لطفا"
                      value={values.radioGroup}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={options}
                    />
                    {errors.radioGroup && touched.radioGroup ? (
                      <div className="invalid-feedback d-block">
                        {errors.radioGroup}
                      </div>
                    ) : null}
                  </FormGroup>
                  <FormGroup className="error-l-175">
                    <Label className="d-block">رادیوباتن گروهی سفارشی</Label>
                    <FormikCustomRadioGroup
                      inline
                      name="customRadioGroup"
                      id="customRadioGroup"
                      label="کدوم یکی؟"
                      value={values.customRadioGroup}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                      options={options}
                    />
                    {errors.customRadioGroup && touched.customRadioGroup ? (
                      <div className="invalid-feedback d-block">
                        {errors.customRadioGroup}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-175">
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

                  <FormGroup className="error-l-100">
                    <Label className="d-block">
                      <IntlMessages id="form-components.switch" />
                    </Label>
                    <FormikSwitch
                      name="switch"
                      className="custom-switch custom-switch-primary"
                      value={values.switch}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                    {errors.switch && touched.switch ? (
                      <div className="invalid-feedback d-block">
                        {errors.switch}
                      </div>
                    ) : null}
                  </FormGroup>

                  <FormGroup className="error-l-100">
                    <Label className="d-block">
                      <IntlMessages id="form-components.date-picker" />
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

                  <Button color="primary" type="submit">
                    ارسال فرم
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default FormikCustomComponents;
