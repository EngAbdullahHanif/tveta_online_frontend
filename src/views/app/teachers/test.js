/* eslint-disable no-param-reassign */
import React, { createRef, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Spinner,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import { levelOfEdcationOptions } from '../global-data/options';
import { langOptions } from '../global-data/options';
import { contractTypeOptions } from '../global-data/options';
import { appointmentTypeOptions } from '../global-data/options';
import { provinceOptions } from '../global-data/options';
import { gradeOptions } from '../global-data/options';
import { stepOptions } from '../global-data/options';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import TopNavigation from 'components/wizard/TopNavigation';
import IconCard from 'components/cards/IconCard';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
// import TopNavigation from 'components/wizard/TopNavigation';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { NotificationManager } from 'components/common/react-notifications';

import axios from 'axios';
import * as Yup from 'yup';

import { Colxx } from 'components/common/CustomBootstrap';

const servicePath = 'http://localhost:8000';
const teacherResitgerAPIUrl = `${servicePath}/teachers/`;

const TazkiraOptions = [
  { value: '1', label: <IntlMessages id="forms.StdTazkiraElectronic" /> },
  { value: '2', label: <IntlMessages id="forms.StdTazkiraPaper" /> },
];

const dutyLocationOptions = [
  { value: '1', label: 'انستیتوت نیما' },
  { value: '2', label: 'لیسه مسلکی نابینایان' },
];
const teacherteachingfieldOptions = [
  { value: '1', label: 'زراعت' },
  { value: '2', label: 'کمپیوتر ساینس ' },
];
const StatusOptions = [
  { value: '1', label: <IntlMessages id="teacher.StatusOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.StatusOption_2" /> },
];

const GradeOptions = [
  { value: '3', label: <IntlMessages id="teacher.GradeOption_3" /> },
  { value: '4', label: <IntlMessages id="teacher.GradeOption_4" /> },
  { value: '5', label: <IntlMessages id="teacher.GradeOption_5" /> },
  { value: '6', label: <IntlMessages id="teacher.GradeOption_6" /> },
  { value: '7', label: <IntlMessages id="teacher.GradeOption_7" /> },
  { value: '8', label: <IntlMessages id="teacher.GradeOption_8" /> },
];

const StepOptions = [
  { value: '1', label: <IntlMessages id="teacher.StepOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.StepOption_2" /> },
  { value: '3', label: <IntlMessages id="teacher.StepOption_3" /> },
  { value: '4', label: <IntlMessages id="teacher.StepOption_4" /> },
  { value: '5', label: <IntlMessages id="teacher.StepOption_5" /> },
  { value: '6', label: <IntlMessages id="teacher.StepOption_6" /> },
];

const MajorOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const genderOptions = [
  { value: '1', label: <IntlMessages id="dorm.GenderOptions_1" /> },
  { value: '2', label: <IntlMessages id="dorm.GenderOptions_2" /> },
  { value: '3', label: <IntlMessages id="dorm.GenderOptions_3" /> },
];
const SignupSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  FatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  GrandFatherName: Yup.string()
    .required(<IntlMessages id="teacher.GrandFatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  TazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),
  PhoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  DoB: Yup.date().required(<IntlMessages id="teacher.PhoneNoErr" />),

  LevelOfEducation: Yup.string()
    .oneOf(['14th', 'bachelor', 'master', 'PHD'])
    .required('is required'),

  // IdCardPageNo: Yup.string().required(
  //   <IntlMessages id="teacher.IdCardPageNoErr" />
  // ),

  // IdCardJoldNo: Yup.string().required(
  //   <IntlMessages id="teacher.IdCardJoldNoErr" />
  // ),
  // TazkiraType: Yup.string().required(
  //   <IntlMessages id="teacher.IdCardJoldNoErr" />
  // ),

  Email: Yup.string()
    .email(<IntlMessages id="teacher.EmailRequiredErr" />)
    .required(<IntlMessages id="teacher.EmailErr" />),

  // LevelOfEducation: Yup.string()
  //   .required(<IntlMessages id="teacher.LevelOfEducationErr" />)

  // LevelOfEducation: Yup.arra.shape({
  //   value: Yup.string()
  //     .required('Required')
  //     .oneOf(['14th', 'master', 'bachelor', 'PHD']),
  //   label: Yup.string().required('Required'),
  // }),

  //        Major: Yup.string()
  // .required(<IntlMessages id="teacher.MajorErr" />),

  //                  Status: Yup.string()
  // .required(<IntlMessages id="teacher.StatusErr" />),
  //  Grade: Yup.string()
  // .required(<IntlMessages id="teacher.GradeErr" />),
});

const Validation = ({ intl }) => {
  const initialValues = {
    Status: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Grade: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Step: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    C_Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    teachingField: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    jobLocation: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    teachingLang: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    appointmentType: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    contractType: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    IdCardPageNo: 0,
    IdCardJoldNo: 0,
  };
  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

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
  const onRegister = (values) => {
    //REMOVE USER_ID LATER, IT IS JUST FOR TESTING
    //UNCOMMENT TEACHER_PHOTO LATER, when the frontend updated
    const data = {
      name: values.Name,
      father_name: values.FatherName,
      grand_father_name: values.GrandFatherName,
      cover_number: values.IdCardJoldNo,
      registration_number: values.TazkiraNo,
      gender: values.gender.value,
      main_province: values.Province.value,
      main_district: values.District,
      main_village: values.Village,
      current_province: values.C_Province.value,
      current_district: values.C_District,
      current_village: values.C_Village,
      education_degree: values.LevelOfEducation.value,
      major: values.Major.value,
      phone_number: values.PhoneNo,
      email: values.Email,
      birth_date: values.DoB,
      status_type: values.Status.value,
      grade: values.Grade.value,
      step: values.Step.value,
      user_id: 1,
      // teacher_photo: values.TeacherPhoto,
    };
    console.log('The Data', data);

    if (
      data.values.Name &&
      data.values.FatherName &&
      data.values.GrandFatherName &&
      data.values.IdCardJoldNo !== ''
    ) {
      return console.log('Please Enter Valid the value');
    }

    axios
      .post(teacherResitgerAPIUrl, data)
      .then((res) => {
        console.log('The Response', res);
        createNotification('success', 'filled');
      })
      .catch((err) => {
        createNotification('error', 'filled');
        console.log('The Error ', err);
        console.log('The Error ', err.message);
        console.log('The Error response ', err.response);
        console.log('The Error response.data ', err.response.data);
        console.log('The Error response.status', err.response.status);
      });
  };

  // const [Name1, setName] = useState('');
  // console.log(Name1, 'name');

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({});

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    console.log(step.id, 'stepoId');
    console.log(form.values, 'Errors');

    form.submitForm().then(() => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...fields, ...form.values };
        setFields(newFields);

        if (steps.length - 2 <= steps.indexOf(step)) {
          // done
          setBottomNavHidden(true);
          setLoading(true);
          console.log(newFields, 'sdafsadfdsa');
          setTimeout(() => {
            setLoading(false);
          }, 0);
        }
        goToNext();
        step.isDone = true;
      }
    });
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;
  return (
    <Card>
      <h3 className="mt-5 m-5">
        {<IntlMessages id="teacher.RegisterTitle" />}
      </h3>
      <CardBody className="wizard wizard-default">
        <Wizard>
          <Steps>
            <Step
              id="step1"
              name={messages['wizard.step-name-1']}
              desc={messages['wizard.step-desc-1']}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[0]}
                  initialValues={{
                    Name: '',
                    FatherName: '',
                    GrandFatherName: '',
                    DoB: '',
                    TazkiraNo: '',
                    PhoneNo: '',
                    Email: '',
                    IdCardPageNo: '',
                    IdCardJoldNo: '',
                    TazkiraType: {
                      value: '',
                      label: (
                        <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                      ),
                    },
                    LevelOfEducation: {
                      value: '',
                      label: (
                        <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                      ),
                    },
                    gender: {
                      value: '',
                      label: (
                        <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                      ),
                    },
                    Major: {
                      value: '',
                      label: (
                        <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                      ),
                    },
                  }}
                  validateOnMount
                  validationSchema={SignupSchema}
                  onSubmit={() => {}}
                >
                  {({
                    errors,
                    touched,
                    values,
                    onBlur,
                    handleChange,
                    handleBlur,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <Row>
                        <Colxx xxs="6">
                          {/* Teacher Name */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.NameLabel" />
                            </Label>
                            <Field className="form-control" name="Name" />
                            {errors.Name && touched.Name ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.Name}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Father Name */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.FatherNameLabel" />
                            </Label>
                            <Field className="form-control" name="FatherName" />
                            {errors.FatherName && touched.FatherName ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.FatherName}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Tazkira Type */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="forms.TazkiraType" />
                            </Label>

                            <FormikReactSelect
                              name="TazkiraType"
                              id="TazkiraType"
                              value={values.TazkiraType}
                              options={TazkiraOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.TazkiraType && touched.TazkiraType ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.TazkiraType}
                              </div>
                            ) : null}
                          </FormGroup>
                          {values.TazkiraType === '2' ? (
                            <div>
                              {/* Safha */}
                              <div>
                                <FormGroup className="form-group has-float-label">
                                  <Label>
                                    <IntlMessages id="teacher.IdCardPageNoLabel" />
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="IdCardPageNo"
                                    type="number"
                                  />
                                  {errors.IdCardPageNo &&
                                  touched.IdCardPageNo ? (
                                    <div className="invalid-feedback d-block  bg-danger text-white">
                                      {errors.IdCardPageNo}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {/* Contact No */}
                          <FormGroup className="form-group has-float-label ">
                            <Label>
                              <IntlMessages id="teacher.PhoneNoLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="PhoneNo"
                              type="number"
                            />
                            {errors.PhoneNo && touched.PhoneNo ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.PhoneNo}
                              </div>
                            ) : null}
                          </FormGroup>
                          <FormGroup className="form-group has-float-label">
                            <Label className="d-block">
                              <IntlMessages id="teacher.DoBLabel" />
                            </Label>
                            <FormikDatePicker
                              name="DoB"
                              type="date"
                              value={values.DoB}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.DoB && touched.DoB ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.DoB}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Major */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.MajorLabel" />
                            </Label>
                            <FormikReactSelect
                              name="Major"
                              id="Major"
                              value={values.Major}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              options={MajorOptions}
                              required
                            />
                            {errors.Major && touched.Major ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.Major}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="6">
                          {/* Grand Father Name */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.GrandFatherNameLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="GrandFatherName"
                            />
                            {errors.GrandFatherName &&
                            touched.GrandFatherName ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.GrandFatherName}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Gender */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="gender" />
                            </Label>
                            <FormikReactSelect
                              name="gender"
                              id="gender"
                              value={values.gender}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              options={genderOptions}
                              required
                            />
                            {errors.gender && touched.gender ? (
                              <div className="invalid-feedback d-block">
                                {errors.gender}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Tazkira Number */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.TazkiraNoLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="TazkiraNo"
                              type="number"
                            />
                            {errors.TazkiraNo && touched.TazkiraNo ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.TazkiraNo}
                              </div>
                            ) : null}
                          </FormGroup>

                          {values.TazkiraType === '2' ? (
                            <div>
                              {/* Jold Number */}
                              <div>
                                <FormGroup className="form-group has-float-label">
                                  <Label>
                                    <IntlMessages id="teacher.IdCardJoldNoLabel" />
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="IdCardJoldNo"
                                    type="number"
                                  />
                                  {errors.IdCardJoldNo &&
                                  touched.IdCardJoldNo ? (
                                    <div className="invalid-feedback d-block  bg-danger text-white">
                                      {errors.IdCardJoldNo}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}

                          {/* Email Address */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.EmailLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="Email"
                              type="Email"
                            />
                            {errors.Email && touched.Email ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.Email}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Education */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.LevelOfEducationLabel" />
                            </Label>
                            <FormikReactSelect
                              name="LevelOfEducation"
                              id="LevelOfEducation"
                              value={values.LevelOfEducation}
                              options={levelOfEdcationOptions}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                            />
                            {errors.LevelOfEducation &&
                            touched.LevelOfEducation ? (
                              <div className="invalid-feedback d-block    bg-danger text-white">
                                {errors.LevelOfEducation}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step
              id="step2"
              name={messages['wizard.step-name-2']}
              desc={messages['wizard.step-desc-2']}
            >
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[1]}
                  initialValues={{
                    email: fields.email,
                  }}
                  onSubmit={() => {}}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <>
                        <Row>
                          <Colxx xxs="6">
                            <div
                              className="square p-1 "
                              style={{ marginInline: '2%' }}
                            >
                              <h6 className="">
                                {' '}
                                {<IntlMessages id="teacher.JobDeteilsLabel" />}
                              </h6>
                            </div>
                          </Colxx>
                        </Row>
                        <Row>
                          <Colxx xxs="6">
                            <div className="p-3">
                              {' '}
                              {/* Status */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.StatusLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="Status"
                                  id="Status"
                                  value={values.Status}
                                  options={stepOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.Status && touched.Status ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Status}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Grade */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.teachingFieldLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="teachingField"
                                  id="teachingField"
                                  value={values.teachingField}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={teacherteachingfieldOptions}
                                  required
                                />
                                {errors.teachingField &&
                                touched.teachingField ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.teachingField}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Grade */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.GradeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="Grade"
                                  id="Grade"
                                  value={values.Grade}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={GradeOptions}
                                  required
                                />
                                {errors.Grade && touched.Grade ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Grade}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Contract type */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.appointmentTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="appointmentType"
                                  id="appointmentType"
                                  value={values.contractType}
                                  options={appointmentTypeOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.appointmentType &&
                                touched.appointmentType ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.appointmentType}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                          <Colxx xxs="6">
                            <div className="square p-3 ">
                              {/* Job location*/}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.jobLocationLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="jobLocation"
                                  id="StatujobLocations"
                                  value={values.jobLocation}
                                  options={dutyLocationOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.jobLocation && touched.jobLocation ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.jobLocation}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Meduim of instruction*/}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.teachingLang" />
                                </Label>
                                <FormikReactSelect
                                  name="teachingLang"
                                  id="teachingLang"
                                  value={values.teachingLang}
                                  isMulti
                                  options={langOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.jobLocation && touched.teachingLang ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.jobLocation}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.StepLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="Step"
                                  id="Step"
                                  value={values.Step}
                                  options={stepOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.Step && touched.Step ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.Step}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Contract type */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="teacher.contractTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="contractType"
                                  id="contractType"
                                  value={values.contractType}
                                  options={contractTypeOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.contractType && touched.contractType ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.contractType}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>

                        <Row>
                          <Colxx xxs="6">
                            <div className="square  p-3">
                              <h6 className=" mb-4">
                                {
                                  <IntlMessages id="forms.PermanentAddressLabel" />
                                }
                              </h6>

                              {/* province permanent*/}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="forms.ProvinceLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="Province"
                                  id="Province"
                                  value={values.Province}
                                  options={provinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.Province && touched.Province ? (
                                  <div className="invalid-feedback d-block   bg-danger text-white">
                                    {errors.Province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District  permanent*/}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="District"
                                />
                                {errors.District && touched.District ? (
                                  <div className="invalid-feedback d-block   bg-danger text-white">
                                    {errors.District}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village permanent */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="Village"
                                />
                                {errors.Village && touched.Village ? (
                                  <div className="invalid-feedback d-block   bg-danger text-white">
                                    {errors.Village}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>

                          <Colxx xxs="6">
                            <div className="square p-3 ">
                              <h6 className=" mb-4">
                                {' '}
                                {
                                  <IntlMessages id="forms.CurrentAddresslabel" />
                                }
                              </h6>

                              {/* Current Address */}
                              {/* province Current */}
                              <FormGroup className="form-group has-float-label   bg-danger text-white">
                                <Label>
                                  <IntlMessages id="forms.ProvinceLabel " />
                                </Label>
                                <FormikReactSelect
                                  name="C_Province"
                                  id="C_Province"
                                  value={values.C_Province}
                                  options={provinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.C_Province && touched.C_Province ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.C_Province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="C_District"
                                />
                                {errors.C_District && touched.C_District ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.C_District}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village */}
                              <FormGroup className="form-group has-float-label">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="C_Village"
                                />
                                {errors.C_Village && touched.C_Village ? (
                                  <div className="invalid-feedback d-block">
                                    {errors.C_Village}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>
                      </>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step id="step3" hideTopNav>
              <div className="wizard-basic-step text-center pt-3">
                {loading ? (
                  <div>
                    <Spinner color="primary" className="mb-1" />
                    <p>
                      <IntlMessages id="submit.waitmessage" />
                    </p>
                  </div>
                ) : (
                  <div>
                    <h1 className="mb-2">
                      <IntlMessages id="wizard.content-thanks" />
                    </h1>
                    <h3>
                      <IntlMessages id="wizard.registered" />
                    </h3>
                  </div>
                )}
              </div>
            </Step>
          </Steps>
          <BottomNavigation
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
            className={` m-5  ${bottomNavHidden && 'invisible'}`}
            prevLabel={messages['wizard.prev']}
            nextLabel={messages['wizard.next']}
          />
        </Wizard>
      </CardBody>
    </Card>
  );
};
export default injectIntl(Validation);
