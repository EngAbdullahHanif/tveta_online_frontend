import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';

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

const SubjcetRegister = () => {
  const initialValues = {};
  const onRegister = (values) => {
    console.log(values);
    const data = {
      name: values.className,
      semester: values.semester,
    };
    console.log('data', data);

    axios
      .post('http://localhost:8000/institute/classs/', data)
      .then((response) => {
        console.log(response);
        console.log('data sent to the server2');
      })
      .catch((error) => {
        console.log('data sent to the server4');
        console.log(error);
      });

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
          {<IntlMessages id="class.register.title" />}
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
                    <IntlMessages id="class.name" />
                  </Label>
                  <Field
                    className="form-control"
                    name="className"
                    // validate={validateclassName}
                  />
                  {errors.className && touched.className && (
                    <div className="invalid-feedback d-block">
                      {errors.className}
                    </div>
                  )}
                </FormGroup>

                <FormGroup className="form-group has-float-label">
                  <Label>
                    <IntlMessages id="class.semester" />
                  </Label>
                  <Field
                    className="form-control"
                    name="semester"
                    type="number"
                    // validate={validatesemester}
                  />
                  {errors.semester && touched.semester && (
                    <div className="invalid-feedback d-block">
                      {errors.semester}
                    </div>
                  )}
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
                      <IntlMessages id="class.register" />
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

export default SubjcetRegister;
