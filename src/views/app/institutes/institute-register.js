import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  // Form,
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

const provinceOptions = [
  { value: 'kabul', label: 'کابل' },
  { value: 'herat', label: 'هرات' },
  { value: 'kandahar', label: 'کندهار' },
  { value: 'mazar', label: 'مزار' },
  { value: 'jalaabad', label: 'جلااباد' },
  { value: 'kunar', label: 'کنر' },
  { value: 'laghman', label: 'لغمان' },
  { value: 'sarepul', label: 'سرپل' },
];

const options = [
  { value: 'Electronic', label: 'الکترونیکی' },
  { value: 'paper', label: 'کاغذی' },
];

const instTypeOptions = [
  { value: '1', label: 'دولتی' },
  { value: '2', label: 'شخصی' },
];

const genderOptions = [
  { value: '1', label: 'ذکور' },
  { value: '2', label: 'اناث' },
  { value: '3', label: 'مختلط' },
];

// const InstituteRegistgerSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('ایمیل که وارد کردی نامعتبره')
//     .required('پست الکترونیک اجباریه!'),
//   password: Yup.string().required('کلمه عبور اجباریه!'),
//   tags: Yup.array()
//     .min(3, 'حداقل 3 تا تگ انتخاب کنید')
//     .required('حداقل یک تگ اجباریه'),
//   date: Yup.date().nullable().required('تاریخ اجباریه!'),
//   state: Yup.object()
//     .shape({
//       label: Yup.string().required(),
//       value: Yup.string().required(),
//     })
//     .nullable()
//     .required('استان اجباریه!'),
// });

const InstituteRegister = () => {
  const [province, setProvince] = useState({});
  const [instType, setInstType] = useState({});
  const [gender, setGender] = useState({});
  const [] = useState('وتاکئ / انتخاب کنید');

  const initialValues = {
    province: { value: '0', label: 'وتاکئ / انتخاب کنید' },
    instType: { value: '0', label: 'وتاکئ / انتخاب کنید' },
    gender: { value: '0', label: 'وتاکئ / انتخاب کنید' },
  };

  const onRegister = (values) => {
    console.log(values);
    if (!loading) {
      // if (values.email !== '' && values.password !== '') {
      //   loginUserAction(values, history);
      // }
    }
  };
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="inst.register.title" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            // validationSchema={InstituteRegistgerSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="inst.name" />
                  </Label>
                  <Field
                    className="form-control"
                    name="instName"
                    // validate={validateInstName}
                  />
                  {errors.instName && touched.instName && (
                    <div className="invalid-feedback d-block">
                      {errors.instName}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="province" />
                  </Label>
                  <FormikReactSelect
                    name="province"
                    id="province"
                    value={values.province}
                    options={provinceOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.province && touched.province ? (
                    <div className="invalid-feedback d-block">
                      {errors.province}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="district" />
                  </Label>
                  <Field className="form-control" name="district" />
                  {errors.district && touched.district && (
                    <div className="invalid-feedback d-block">
                      {errors.district}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="vilage" />
                  </Label>
                  <Field className="form-control" name="vilage" />
                  {errors.vilage && touched.vilage && (
                    <div className="invalid-feedback d-block">
                      {errors.vilage}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="inst.type" />
                  </Label>
                  <FormikReactSelect
                    name="instType"
                    id="instType"
                    value={values.instType}
                    options={instTypeOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.instType && touched.instType ? (
                    <div className="invalid-feedback d-block">
                      {errors.instType}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="gender" />
                  </Label>
                  <FormikReactSelect
                    name="gender"
                    id="gender"
                    value={values.gender}
                    options={genderOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.gender && touched.gender ? (
                    <div className="invalid-feedback d-block">
                      {errors.gender}
                    </div>
                  ) : null}
                </FormGroup>

                <div className="d-flex justify-content-between align-items-center">
                  <Button
                    color="primary"
                    className={`btn-shadow btn-multiple-state`}
                    size="lg"
                    type="submit"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="user.register" />
                    </span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default InstituteRegister;
