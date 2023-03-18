import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';
import callApi from 'helpers/callApi';


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
  InputGroup,
  InputGroupAddon,
  CustomInput,
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

const SignupSchema = Yup.object().shape({
  name1: Yup.string().required(<IntlMessages id="subject.NameErr" />),
  englishName: Yup.string().required(
    <IntlMessages id="subject.englishNameErr" />
  ),
  code: Yup.string().required(<IntlMessages id="subject.codeErr" />),
  credit: Yup.string().required(<IntlMessages id="subject.creditErr" />),

  type: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="subject.typeErr" />),

  systemType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="subject.systemType" />),
});

const initialValues = {
  name1: '',
  englishName: '',
  code: '',
  credit: '',
  type: [],
  studetn_photo: '',
  systemType: [],
};

const SubjectRegister = () => {
  const [subjectType, setSubjectType] = useState({});
  const [systemType, setSystemType] = useState({});
  const [isNext, setIsNext] = useState(true);

  const handleClick = (event) => {
    // HANIF BROTHER DONT FORGET TO DISPLAY THE SUCCESS MESSAGE AFTER SUBMISSION
    // setIsNext(event);
  };

  const onRegister = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name1);
    formData.append('english_name', values.englishName);
    formData.append('code', values.code);
    formData.append('sub_credit', values.credit);
    formData.append('sub_type', values.type.value);
    formData.append('system', values.systemType.value);
    formData.append('studetn_photo', values.studetn_photo);
    formData.append('user_id', 1);

    console.log('student photo', values);

    // const reader = new FileReader();
    // reader.readAsArrayBuffer(values.studetn_photo);

    // reader.onload = function() {
    //   const fileContent = reader.result;
    //   const file = new Blob([fileContent], { type: values.studetn_photo.type });
    //   const formData = new FormData();
    //   formData.append('name', values.name);
    //   formData.append('studetn_photo', file);
    // }
    // const file = values.studetn_photo
    // // console.log('file', file)
    // const blob  = new Blob([file], { type: 'image/png' });
    // console.log("blob", blob)
    // formData.append('studetn_photo', blob );

    const response = await callApi('institute/subject_create/', 'POST', formData);
    console.log('response of tthe', response);
    if (response.data) {
      console.log('data sent to the server2');
    } else {
      console.log('data not sent to the server3');
    }
  };
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="subject.register.title" />}
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
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="subject.name" />
                        </Label>
                        <Field className="form-control" name="name1" />
                        {errors.name1 && touched.name1 && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.name1}
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
                          <div className="invalid-feedback d-block bg-danger text-white">
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
                          name="code"
                          // validate={validatesubjectCode}
                        />
                        {errors.code && touched.code && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.code}
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
                          name="credit"
                          // validate={validatecredits}
                        />
                        {errors.credit && touched.credit && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.credit}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="subject.type" />
                        </Label>
                        <FormikReactSelect
                          name="type"
                          id="type"
                          value={values.type}
                          options={subjectOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.type && touched.type ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.type}
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.systemType}
                          </div>
                        ) : null}
                      </FormGroup>

                       {/* Upload Photo */}
                       {/* <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="subject.credits" />
                        </Label>
                        <Field
                          type="file"
                          className="form-control"
                          name="studetn_photo"
                          accept="image/*"
                        />
                        {errors.studetn_photo && touched.studetn_photo && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.studetn_photo}
                          </div>
                        )}
                      </FormGroup> */}


                            <FormGroup>
                               
                                <InputGroup className="mb-3">
                                  <InputGroupAddon addonType="prepend">
                                    آپلود عکس
                                  </InputGroupAddon>
                                  <CustomInput
                                    type="file"
                                    id="studetn_photo"
                                    name="studetn_photo"
                                  />
                                </InputGroup>
                                {errors.studetn_photo && touched.studetn_photo ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.studetn_photo}
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

export default SubjectRegister;
