import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

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
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const ValidationSchema = Yup.object().shape({
  stdName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StdKankorNameErr" />),

  stdFatherName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.FatherNameErr" />),

  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.departmentIdErr" />),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  field: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.FieldErr" />),

  stdKankorId: Yup.string().required(
    <IntlMessages id="forms.StdKankorIdErr" />
  ),

  kankorMarks: Yup.string().required(
    <IntlMessages id="forms.KankorMarksErr" />
  ),
  stdInteranceDate: Yup.date().required(
    <IntlMessages id="forms.KankorMarksErr" />
  ),

  studyTime: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudyTimeErr" />),
});

const studyTimeOptions = [
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
  const initialValues = {
    stdName: '',
    stdKankorId: '',
    kankorMarks: '',
    stdFatherName: '',
    stdInteranceDate: '',
    studyTime: [],
    department: [],
    field: [],
    institute: [],
  };
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [StudyTime, setStudyTIme] = useState('0');

  const fetchInstitutes = async () => {
    const response = await axios.get('http://localhost:8000/institute/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };
  const fetchFields = async () => {
    const response = await axios.get('http://localhost:8000/institute/filed/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setFields(updatedData);
  };
  const fetchDepartments = async () => {
    const response = await axios.get(
      'http://localhost:8000/institute/department/'
    );
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setDepartments(updatedData);
  };

  const handleClick = (event) => {
    // setIsNext(event);
  };
  const onRegister = (values) => {
    console.log('values', values);
    // console.log('institue', values.Department.value);
    const data = {
      // name: values.stdName,
      // father_name: values.stdFatherName,
      // Institute: values.Institute.value,
      // field_id: values.Field.value,
      // Dept_id: values.Department.value,
      // score: values.KankorMarks,
      // date: values.StdInteranceDate,
      // uncomment this line to send data to the server
      // kankor_id: values.StdKankorId,
      // study_time: values.studyTime.value,
    };
    console.log('data', data);
    axios
      .post('http://localhost:8000/api/Create_kankorResults/', data)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
  }, []);

  // console.log('fields', fields);
  // console.log('institutes', institutes);

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="forms.Kankorformstitle" />}
        </h3>
        <CardBody>
          {isNext == true ? (
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
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Row>
                    <Colxx xxs="6">
                      {/* Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StdName" />
                        </Label>
                        <Field className="form-control" name="stdName" />
                        {errors.stdName && touched.stdName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.stdName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*Father Name  */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StdFatherName" />
                        </Label>
                        <Field className="form-control" name="stdFatherName" />
                        {errors.stdFatherName && touched.stdFatherName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.stdFatherName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Institutes */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.InstituteLabel" />
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institute}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Study Time */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="studyTime"
                          id="studyTime"
                          value={values.studyTime}
                          placeholder="Select option"
                          options={studyTimeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.studyTime && touched.studyTime ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.studyTime}
                            {console.log(errors.studyTime, 'Kankor Marks')}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.studyDepartment" />
                        </Label>
                        <FormikReactSelect
                          name="department"
                          id="department"
                          value={values.department}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.department && touched.department ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="6">
                      {/* Exam Id */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StdKankorIdLabel" />
                        </Label>
                        <Field className="form-control" name="stdKankorId" />
                        {errors.stdKankorId && touched.stdKankorId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.stdKankorId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Kankor Marks */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.KankorMarksLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="kankorMarks"
                          type="number"
                        />
                        {errors.kankorMarks && touched.kankorMarks ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.kankorMarks}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Field */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.FieldLabel" />
                        </Label>
                        <FormikReactSelect
                          name="field"
                          id="field"
                          value={values.field}
                          options={fields}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.field && touched.field ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.field}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* date */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.RegistrationDateLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="stdInteranceDate"
                          type="date"
                        />
                        {errors.stdInteranceDate && touched.stdInteranceDate ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.stdInteranceDate}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right m-5"
                        size="lg"
                        type="submit"
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

export default StudentRegistraion;
