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

const subjectOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];

const systemOption = [
  { value: '1', label: 'عمومی' },
  { value: '2', label: 'GIZ' },
  { value: '3', label: 'نیما' },
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

const SubjectRegister = () => {
  const [subjectType, setSubjectType] = useState({});
  const [systemType, setSystemType] = useState({});

  const initialValues = {
    subjectType: { value: '0', label: 'وتاکئ / انتخاب کنید' },
    systemType: { value: '0', label: 'وتاکئ / انتخاب کنید' },
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
          {<IntlMessages id="subject.register.title" />}
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
                    <IntlMessages id="subject.name" />
                  </Label>
                  <Field
                    className="form-control"
                    name="subjectName"
                    // validate={validatesubjectName}
                  />
                  {errors.subjectName && touched.subjectName && (
                    <div className="invalid-feedback d-block">
                      {errors.subjectName}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="subject.english_name" />
                  </Label>
                  <Field
                    className="form-control"
                    name="englishName"
                    // validate={validateenglishName}
                  />
                  {errors.englishName && touched.englishName && (
                    <div className="invalid-feedback d-block">
                      {errors.englishName}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="subject.code" />
                  </Label>
                  <Field
                    type="number"
                    className="form-control"
                    name="subjectCode"
                    // validate={validatesubjectCode}
                  />
                  {errors.subjectCode && touched.subjectCode && (
                    <div className="invalid-feedback d-block">
                      {errors.subjectCode}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="subject.credits" />
                  </Label>
                  <Field
                    type="number"
                    className="form-control"
                    name="credits"
                    // validate={validatecredits}
                  />
                  {errors.credits && touched.credits && (
                    <div className="invalid-feedback d-block">
                      {errors.credits}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="subject.type" />
                  </Label>
                  <FormikReactSelect
                    name="subjectType"
                    id="subjectType"
                    value={values.subjectType}
                    options={subjectOptions}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.subjectType && touched.subjectType ? (
                    <div className="invalid-feedback d-block">
                      {errors.subjectType}
                    </div>
                  ) : null}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="subject.system_type" />
                  </Label>
                  <FormikReactSelect
                    name="systemType"
                    id="systemType"
                    value={values.systemType}
                    options={systemOption}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                  {errors.systemType && touched.systemType ? (
                    <div className="invalid-feedback d-block">
                      {errors.systemType}
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
                      <IntlMessages id="subject.register" />
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

export default SubjectRegister;
