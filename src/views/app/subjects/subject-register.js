import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import callApi from 'helpers/callApi';
// import { getCurrentUser } from './helpers/Utils';
import { NotificationManager } from 'components/common/react-notifications';
import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  // Form,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { inputLabel } from 'config/styling';

const subjectOptions = [
  { value: 'general', label: 'عمومی' },
  { value: 'supporting', label: 'فرعی' },
  { value: 'core', label: 'اصلی' },
  { value: 'specialized', label: 'مسلکی' },
  { value: 'practical', label: 'عملی' },
  { value: 'elective', label: 'اختیاری' },
];

const systemOption = [
  { value: 'general', label: 'عمومی' },
  { value: 'nima', label: 'NIMA' },
  { value: 'giz', label: 'GITZ' },
  { value: 'special_ed', label: 'تعلیمات خاص' },
];

const SignupSchema = Yup.object().shape({
  name1: Yup.string().required(<IntlMessages id="subject.NameErr" />),
  englishName: Yup.string().required(
    <IntlMessages id="subject.englishNameErr" />,
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
  systemType: [],
};

const SubjectRegister = () => {
  const [isNext, setIsNext] = useState(false);
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'شاگرد موفقانه لیلی ته رجستر شو',
          'موفقیت',
          3000,
          null,
          null,
          cName,
        );
        break;
      case 'error':
        NotificationManager.error(
          'شاگرد ثبت نشو، بیا کوشش وکری',
          'خطا',
          5000,
          () => {
            alert('callback');
          },
          null,
          cName,
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  // post dorm record to server
  const postStudentRecord = async (data) => {
    const response = await callApi('institute/subject_create/', 'POST', data);
    if (response) {
      createNotification('success', 'filled');
      setIsNext(true);
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const onRegister = async (values) => {
    const data = {
      code: values.code,
      name: values.name1,
      english_name: values.englishName,
      system_type: values.systemType.value,
      type: values.type.value,
      credit: values.credit,
      passing_marks: 50, // this field is temporarly, sub_passingScore should be deleted from both front and back
    };
    console.log('data', data);
    postStudentRecord(data);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="subject.register.title" />}
        </h3>
        <CardBody>
          {!isNext ? (
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
                resetForm,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-175">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
                          <IntlMessages id="subject.code" />
                        </Label>
                        <Field
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
                        <Label style={inputLabel}>
                          <IntlMessages id="subject.credits" />
                        </Label>
                        <Field
                          type="number"
                          className="form-control"
                          name="credit"
                          max="10"
                          min="1"
                          // validate={validatecredits}
                        />
                        {errors.credit && touched.credit && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.credit}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
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
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label" style={inputLabel}>
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

export default SubjectRegister;
