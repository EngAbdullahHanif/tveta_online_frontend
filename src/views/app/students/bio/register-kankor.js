import React, { useState } from 'react';
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
} from '../../../../containers/form-validations/FormikFields';

const SignupSchema = Yup.object().shape({
  StdName: Yup.string()
    .min(3, <IntlMessages id="forms.nameChar" />)
    .required(<IntlMessages id="forms.StdKankorNameErr" />),

  StdKankorId: Yup.string().required(
    <IntlMessages id="forms.StdKankorIdErr" />
  ),

  StdFatherName: Yup.string()
    // .min(3 'ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.StdFatherNameError" />),

  KankorMarks: Yup.number().required(
    <IntlMessages id="forms.KankorMarksErr" />
  ),

  Institute: Yup.string().required(<IntlMessages id="forms.InstituteErr" />),

  Field: Yup.string().required(<IntlMessages id="forms.FieldErr" />),

  StudyTime: Yup.string().required(<IntlMessages id="forms.StudyTimeErr" />),
});

const options = [
  {
    value: 'Electronic',
    label: <IntlMessages id="forms.StdTazkiraElectronic" />,
  },
  { value: 'paper', label: <IntlMessages id="forms.StdTazkiraPaper" /> },
];

const StdInteranceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdInteranceOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdInteranceOption_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdInteranceOption_3" /> },
];

const StudyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];

const InstituteOptions = [
  { value: '1', label: 'Option1' },
  { value: '2', label: 'Option2' },
  { value: '3', label: 'Option3' },
];

const FieldOptions = [
  { value: '1', label: 'Option1' },
  { value: '2', label: 'Option2' },
  { value: '3', label: 'Option3' },
];

const StudentRegistraion = () => {
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
  const [isNext, setIsNext] = useState(false);
  const [IdCard, setIdCard] = useState(null);

  const handleClick = (event) => {
    setIsNext(event);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="forms.Kankorformstitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={{
              StdSchoolProvince: {
                value: '',
                label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
              },
              Province: {
                value: '',
                label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
              },
              C_Province: {
                value: '',
                label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
              },
              Institute: {
                value: '',
                label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
              },
              StudyTime: {
                value: '',
                label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
              },
              Field: {
                value: '',
                label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
              },
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
                <Row>
                  <Colxx xxs="6">
                    {/* Name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdName" />
                      </Label>
                      <Field className="form-control" name="StdName" />
                      {errors.StdName && touched.StdName ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdName}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/*Father Name  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdFatherName" />
                      </Label>
                      <Field className="form-control" name="StdFatherName" />
                      {errors.StdFatherName && touched.StdFatherName ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdFatherName}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Institutes */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.InstituteLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Institute"
                        id="Institute"
                        value={values.Institute}
                        options={InstituteOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.Institute && touched.Institute ? (
                        <div className="invalid-feedback d-block">
                          {errors.Institute}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Study time */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StudyTimeLabel" />
                      </Label>
                      <FormikReactSelect
                        name="StudyTime"
                        id="StudyTime"
                        value={values.StudyTime}
                        options={StudyTimeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.StudyTime && touched.StudyTime ? (
                        <div className="invalid-feedback d-block">
                          {errors.StudyTime}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>

                  <Colxx xxs="6">
                    {/* Exam Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdKankorIdLabel" />
                      </Label>
                      <Field className="form-control" name="StdKankorId" />
                      {errors.StdKankorId && touched.StdKankorId ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdKankorId}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Kankor Marks */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.KankorMarksLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="KankorMarks"
                        type="number"
                      />
                      {errors.KankorMarks && touched.KankorMarks ? (
                        <div className="invalid-feedback d-block">
                          {errors.KankorMarks}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Field */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Field"
                        id="Field"
                        value={values.Field}
                        options={FieldOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.Field && touched.Field ? (
                        <div className="invalid-feedback d-block">
                          {errors.Field}
                        </div>
                      ) : null}
                    </FormGroup>

                    <Button
                      onClick={() => handleClick(false)}
                      className="float-right m-2 mt-5"
                    >
                      ثبت
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default StudentRegistraion;
