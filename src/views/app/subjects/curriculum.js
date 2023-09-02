import React, { useContext, useState } from 'react';
import { Formik, Form } from 'formik';
import './../dorms/dorm-register.css';
import { NotificationManager } from 'components/common/react-notifications';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { educationalYearsOptions } from '../global-data/options';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import callApi from 'helpers/callApi';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { AuthContext } from 'context/AuthContext';
const SignupSchema = Yup.object().shape({
  departmentId: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.departmentIdErr" />),

  subject: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="curriculum.subjectdErr" />),

  class: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="curriculum.classErr" />),

  // educationalYear: Yup.string().required(
  //   <IntlMessages id="curriculum.eduactionalYearErr" />
  // ),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="curriculum.eduactionalYearErr" />),
});

const Curriculum = (values) => {
  // later on, fetch only related subjects
  const { departments, classes, subjects } = useContext(AuthContext);
  // const [subjects, setSubjects] = useState([]);

  // // fetch department list
  // const fetchDepartments = async () => {
  //   const response = await callApi('institute/department/', 'GET', null);
  //   if (response.data && response.status === 200) {
  //     const updatedData = await response.data.map((item) => ({
  //       value: item.id,
  //       label: item.name,
  //     }));
  //     setDepartments(updatedData);
  //   } else {
  //     console.log('department error');
  //   }
  // };
  // //fetch class list
  // const fetchClasses = async () => {
  //   const response = await callApi('institute/classs/', 'GET', null);
  //   if (response.data && response.status === 200) {
  //     const updatedData = await response.data.map((item) => ({
  //       value: item.id,
  //       label: item.name + ' - ' + item.semester,
  //     }));
  //     setClasss(updatedData);
  //   } else {
  //     console.log('class error');
  //   }
  // };

  // // fetch subjects list
  // const fetchSubjects = async () => {
  //   const response = await callApi('institute/subject/', 'GET', null);
  //   if (response.data && response.status === 200) {
  //     const updatedData = await response.data.map((item) => ({
  //       value: item.id,
  //       label: item.name,
  //     }));
  //     setSubjects(updatedData);
  //   } else {
  //     console.log('class error');
  //   }
  // };

  // useEffect(() => {
  //   fetchDepartments();
  //   fetchClasses();
  //   fetchSubjects();
  // }, []);

  console.log('classes from context are: ', classes);
  const classs = classes;

  const [initialDepartment, setInitialDepartment] = useState([]);
  const [initialSubject, setInitialSubject] = useState([]);
  const [initialClass, setInitialClass] = useState([]);
  const [initialEducationalYear, setInitialEducationalYear] = useState([]);

  const initialValues = {
    departmentId: initialDepartment,
    subject: initialSubject,
    class: initialClass,
    educationalYear: initialEducationalYear,
  };

  const [isNext, setIsNext] = useState(false);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'نصاب موفقانه ثبت شوو',
          'موفقیت',
          3000,
          null,
          null,
          cName,
        );
        break;
      case 'error':
        NotificationManager.error(
          'نصاب ثبت نشو، بیا کوشش وکری',
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
    const response = await callApi(
      'institute/department-subject-create/',
      'POST',
      data,
    );
    if (response) {
      createNotification('success', 'filled');
      setIsNext(true);
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const onRegister = (values) => {
    const data = {
      department: values.departmentId.value,
      subject: values.subject.value,
      classs: values.class.value,
      educational_year: values.educationalYear.value,
    };
    console.log('data', data);
    postStudentRecord(data);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="curriculum.curriculumTittle" />}
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
                  <Row className="justify-content-center inlineBlock">
                    <Colxx xxs="11">
                      {/* Department Id */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          <IntlMessages id="curriculum.departmentIdLabel" />
                        </Label>
                        <FormikReactSelect
                          name="departmentId"
                          id="departmentId"
                          value={values.departmentId}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.departmentId && touched.departmentId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Subject */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          <IntlMessages id="curriculum.subjectdLabel" />
                        </Label>
                        <FormikReactSelect
                          name="subject"
                          id="subject"
                          value={values.subject}
                          options={subjects}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.subject && touched.subject ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.subject}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Class */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          <IntlMessages id="curriculum.classLabel" />
                        </Label>
                        <FormikReactSelect
                          name="class"
                          id="class"
                          value={values.class}
                          options={classs}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.class && touched.class ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.class}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.educationYear" />
                        </Label>
                        <FormikReactSelect
                          name="educationalYear"
                          id="educationalYear"
                          value={values.educationalYear}
                          options={educationalYearsOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block">
                            {errors.educationalYear}
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
                        <span
                          className="label"
                          style={{ fontSize: 18, fontWeight: 'bold' }}
                        >
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

export default Curriculum;
