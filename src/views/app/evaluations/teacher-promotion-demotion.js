import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
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

const servicePath = 'http://localhost:8000';
const institutesApiUrl = `${servicePath}/institute/`;
const teachersApiUrl = `${servicePath}/teachers/`;
const promotionDemotionAPIUrl = `${servicePath}/teachers/create_teachers_bonusandpunish/`;

const promotionTypeOptions = [
  { value: '1', label: <IntlMessages id="teacher.promotion.type1" /> },
  { value: '2', label: <IntlMessages id="teacher.promotion.type1" /> },
];

const SignupSchema = Yup.object().shape({
  evaluator: Yup.string().required(<IntlMessages id="teacher.evaluatorErr" />),
});
const createNotification = (type, className) => {
  const cName = className || '';
  switch (type) {
    case 'success':
      NotificationManager.success(
        'استاد موفقانه رجستر شو',
        'موفقیت',
        3000,
        null,
        null,
        cName
      );
      break;
    case 'error':
      NotificationManager.error(
        'استاد ثبت نشو،لطفا معلومات دقیق دننه کی',
        'خطا',
        5000,
        () => {
          alert('callback');
        },
        null,
        cName
      );
      break;
    default:
      NotificationManager.info('Info message');
      break;
  }
};

const initialValues = {
  teacher: {
    value: '0',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  institute: {
    value: '0',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
};

const TeacherEvaluation = () => {
  const [institutes, setInstitutes] = useState([]);
  const [teachers, setTeachers] = useState([]);
  var [details, setDetails] = useState('');

  const fetchInstitutes = async () => {
    const response = await axios.get(institutesApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };

  const fetchTeachers = async () => {
    const response = await axios.get(teachersApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.id,
    }));
    setTeachers(updatedData);
  };

  useEffect(() => {
    fetchInstitutes();
    fetchTeachers();
  }, []);

  const onRegister = (values) => {
    console.log('values', values);
    console.log('1', values.teacher.value);
    console.log('2', values.institute.value);
    console.log('3', values.evaluationDate);
    console.log('4', values.promotionType.value);
    console.log('details12', details);

    // REMOVE USER_ID WHEN THE AUTHENTICATION IS DONE
    const data = {
      teacher_id: values.teacher.value,
      institute_id: values.institute.value,
      evaluation_date: values.evaluationDate,
      type: values.promotionType.value,
      details: details,
      user_id: 1,
    };
    console.log('data', data);
    axios
      .post(promotionDemotionAPIUrl, data)
      .then((response) => {
        console.log(response);
        createNotification('success', 'filled');
      })
      .catch((error) => {
        console.log(error);
        createNotification('error', 'filled');
      });
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.PromotionDemotionTitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            // validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row className="justify-content-center">
                  <Colxx xxs="5">
                    {/* Teacher Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.IdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="teacher"
                        id="teacher"
                        value={values.teacher}
                        options={teachers}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.teacher && touched.teacher ? (
                        <div className="invalid-feedback d-block">
                          {errors.teacher}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Evalualtion Date */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.evaluationDateLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="evaluationDate"
                        type="date"
                      />
                      {errors.evaluationDate && touched.evaluationDate ? (
                        <div className="invalid-feedback d-block">
                          {errors.evaluationDate}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="5">
                    {/* Institutes */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.InstituteIdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="institute"
                        id="institute"
                        value={values.institute}
                        options={institutes}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.institute && touched.institute ? (
                        <div className="invalid-feedback d-block">
                          {errors.institute}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* type */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.promotion.type" />
                      </Label>
                      <FormikReactSelect
                        name="promotionType"
                        id="promotionType"
                        value={values.promotionType}
                        options={promotionTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.promotionType && touched.promotionType ? (
                        <div className="invalid-feedback d-block">
                          {errors.promotionType}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row className="justify-content-center">
                  <Colxx xxs="10">
                    {/* details */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.promotion.description" />
                      </Label>
                      <textarea
                        className="form-control"
                        name="details"
                        id="details"
                        onChange={(e) => setDetails(e.target.value)}
                        rows={5}
                      />
                      {errors.details && touched.details ? (
                        <div className="invalid-feedback d-block">
                          {errors.details}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* Demotion*/}
                    {/* <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="teacher.demotionLabel" />
                      </Label>
                      <textarea
                        className="form-control"
                        name="weaknessPoints"
                        id="weaknessPoints"
                        rows={4}
                        type="textarea"
                      />
                      {errors.weaknessPoints && touched.weaknessPoints ? (
                        <div className="invalid-feedback d-block">
                          {errors.weaknessPoints}
                        </div>
                      ) : null}
                    </FormGroup> */}

                    <div className="d-flex justify-content-between align-items-center m-4 float-right">
                      <Button
                        className={`btn-shadow btn-multiple-state `}
                        size="lg"
                        type="submit"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="button.SubmitButton" />
                        </span>
                      </Button>
                    </div>
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

export default TeacherEvaluation;
