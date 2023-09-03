import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

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
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { AuthContext } from 'context/AuthContext';
import { inputLabel } from 'config/styling';

const ValidationSchema = Yup.object().shape({
  className: Yup.string().required(<IntlMessages id="class.nameErr" />),
  semester: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="class.semesterErr" />),
});

const updateMode = true;
const seasonOptions = [
  {
    label: 'بهاری',
    value: 'spring',
  },
  {
    label: 'خزانی',
    value: 'fall',
  },
];
const sectionOptions = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
  {
    label: 'D',
    value: 'D',
  },
];

const semesterOptions = [
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
];
const ClassRegister = () => {
  const { fetchClasses } = useContext(AuthContext);
  const [initialClassName, setInitialClassName] = useState();
  const [initialGrade, setInitialGrade] = useState();
  const [initialSemester, setInitialSemester] = useState([]);
  const [initialSeason, setInitialSeason] = useState([]);
  const [initialSection, setInitialSection] = useState('');

  const [isNext, setIsNext] = useState(false);

  const initialValues = {
    className: initialClassName,
    grade: initialGrade,
    semester: initialSemester,
    season: initialSeason,
    section: initialSection,
  };
  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'صنف په بریالیتوب ثبت شو',
          'موفقیت',
          3000,
          null,
          null,
          cName,
        );
        break;
      case 'error':
        NotificationManager.error(
          'صنف ثبت نشو, بیا کوشش وکری',
          'خطا',
          9000,
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
  const onRegister = async (values, { resetForm }) => {
    const data = {
      name: values.className,
      grade: values.grade,
      semester: values.semester.value,
      season: values.season.value,
      section: values.section,
    };
    console.log('data', values);
    const response = await callApi('institute/classs_create/', 'POST', data);
    if (response) {
      createNotification('success', 'filled');
      fetchClasses();

      // setLoader(false);
      resetForm();
      setIsNext(true);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="class.register.title" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                resetForm,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-100">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="class.nameLabel" />
                        </Label>
                        <Field className="form-control" name="className" />
                        {errors.className && touched.className && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.className}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>درجه (عدد)</Label>
                        <Field
                          className="form-control"
                          name="grade"
                          type="number"
                          // max="14"
                          // min="10"
                        />
                        {errors.grade && touched.grade && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.grade}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-150">
                        <Label style={inputLabel}>
                          <IntlMessages id="class.semesterLabel" />
                        </Label>
                        <FormikReactSelect
                          name="semester"
                          id="semester"
                          value={values.semester}
                          options={semesterOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.semester && touched.semester ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.semester}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>گرمسیر/سردسیر</Label>
                        <FormikReactSelect
                          name="season"
                          id="season"
                          value={values.season}
                          options={seasonOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.season && touched.season ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.season}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>سیکشن</Label>
                        <Field
                          className="form-control"
                          name="section"
                          // value={values.section}
                          // options={sectionOptions}
                          maxLength={1}
                        />
                        {errors.section && touched.section ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.section}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
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

export default ClassRegister;
