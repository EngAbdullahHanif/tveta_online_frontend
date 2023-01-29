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
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from './../../../containers/form-validations/FormikFields';

const ValidationSchema = Yup.object().shape({
  stdName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StdKankorNameErr" />),

  stdFatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  // StdKankorId: Yup.string().required(
  //   <IntlMessages id="forms.StdKankorIdErr" />
  // ),

  // stdFatherName: Yup.string()
  //   // .min(3 'ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
  //   .required(<IntlMessages id="forms.stdFatherNameError" />),

  // KankorMarks: Yup.number().required(
  //   <IntlMessages id="forms.KankorMarksErr" />
  // ),

  // Institute: Yup.string().required(<IntlMessages id="forms.InstituteErr" />),

  // Field: Yup.string().required(<IntlMessages id="forms.FieldErr" />),

  // StudyTime: Yup.string().required(<IntlMessages id="forms.StudyTimeErr" />),
});

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
  const initialValues = {
    stdName: '',
    stdFatherName: '',
    institute: [
      {
        value: '',
        label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
      },
    ],

    //   StdSchoolProvince: {
    //     value: '',
    //     label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    //   },
    //   Province: {
    //     value: '',
    //     label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    //   },
    //   C_Province: {
    //     value: '',
    //     label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    //   },
    //   Institute: {
    //     value: '',
    //     label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    //   },
    //   StudyTime: {
    //     value: '',
    //     label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    //   },
    //   Field: {
    //     value: '',
    //     label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    //   },
  };
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [Institute, setInstitute] = useState('0');
  const [isNext, setIsNext] = useState(true);

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
    setIsNext(event);
  };
  const onRegister = (values) => {
    // setInstitute();
    console.log('values', values.institute);
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
      // study_time: values.StudyTime.value,
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

  console.log('fields', fields);
  console.log('institutes', institutes);

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
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row>
                    <Colxx xxs="6">
                      {/* Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdName" />
                        </Label>
                        <Field className="form-control" name="stdName" />
                        {errors.stdName && touched.stdName ? (
                          <div className="invalid-feedback d-block">
                            {errors.stdName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*Father Name  */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdFatherName" />
                        </Label>
                        <Field className="form-control" name="StdFatherName" />
                        {errors.stdFatherName && touched.stdFatherName ? (
                          <div className="invalid-feedback d-block">
                            {errors.stdFatherName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Institutes */}
                      <FormGroup className="form-group has-float-label">
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
                          onClick={setInstitute(values.institute)}
                        />
                        {errors.institute && !Institute ? (
                          <div className="invalid-feedback d-block">
                            {errors.institute}
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

                      {/* Department */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.studyDepartment" />
                        </Label>
                        <FormikReactSelect
                          name="Department"
                          id="Department"
                          value={values.Department}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.Department && touched.Department ? (
                          <div className="invalid-feedback d-block">
                            {errors.Department}
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
                          options={fields}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.Field && touched.Field ? (
                          <div className="invalid-feedback d-block">
                            {errors.Field}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* date */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.RegistrationDateLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="StdInteranceDate"
                          type="date"
                        />
                        {errors.StdInteranceDate && touched.StdInteranceDate ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdInteranceDate}
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
