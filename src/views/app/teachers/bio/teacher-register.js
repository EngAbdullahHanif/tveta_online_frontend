/* eslint-disable no-param-reassign */
import React, { createRef, useState, Controller, useEffect } from 'react';

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
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import { NotificationManager } from 'components/common/react-notifications';

import axios from 'axios';
import * as Yup from 'yup';

import { Colxx } from 'components/common/CustomBootstrap';

const servicePath = 'http://localhost:8000';
const teacherResitgerAPIUrl = `${servicePath}/teachers/create_teachers/`;

const tazkiraOptions = [
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

const levelOfEdcationOptions = [
  {
    value: '14th',
    label: <IntlMessages id="teacher.EducationLevelOption_1" />,
  },
  {
    value: 'bachelor',
    label: <IntlMessages id="teacher.EducationLevelOption_2" />,
  },
  {
    value: 'master',
    label: <IntlMessages id="teacher.EducationLevelOption_3" />,
  },
  { value: 'PHD', label: <IntlMessages id="teacher.EducationLevelOption_4" /> },
];

const majorOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const langOptions = [
  {
    value: '1',
    label: <IntlMessages id="teacher.langOptions_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="teacher.langOptions_2" />,
  },
  {
    value: '3',
    label: <IntlMessages id="teacher.langOptions_3" />,
  },
];

const appointmentTypeOptions = [
  {
    value: '1',
    label: <IntlMessages id="teacher.appointmentTOptions_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="teacher.appointmentTOptions_2" />,
  },
];
const contractTypeOptions = [
  {
    value: '1',
    label: <IntlMessages id="teacher.contractTypeOptions_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="teacher.contractTypeOptions_2" />,
  },
];

const StdSchoolProvinceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" /> },
  { value: '4', label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" /> },
  { value: '5', label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" /> },
  { value: '6', label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" /> },
  { value: '7', label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" /> },
  { value: '8', label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" /> },
  { value: '9', label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" /> },
  {
    value: '10',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    value: '11',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    value: '12',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    value: '13',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    value: '14',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    value: '15',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    value: '16',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    value: '17',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    value: '18',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    value: '19',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    value: '20',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: '21',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    value: '22',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    value: '23',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    value: '24',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    value: '25',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    value: '26',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    value: '27',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    value: '28',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    value: '29',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: '30',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    value: '31',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    value: '32',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    value: '33',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    value: '34',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
];

const genderOptions = [
  { value: '1', label: <IntlMessages id="dorm.GenderOptions_1" /> },
  { value: '2', label: <IntlMessages id="dorm.GenderOptions_2" /> },
  { value: '3', label: <IntlMessages id="dorm.GenderOptions_3" /> },
];

const ValidationStepOne = Yup.object().shape({
  Name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  FatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  gender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.NameErr" />),

  GrandFatherName: Yup.string()
    .required(<IntlMessages id="teacher.GrandFatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  TazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),
  PhoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  DoB: Yup.date().required(<IntlMessages id="forms.StdDoBErr" />),

  levelOfEducation: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  major: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  tazkiraType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdTazkiraTypeErr" />),

  Email: Yup.string()
    .email(<IntlMessages id="teacher.EmailRequiredErr" />)
    .required(<IntlMessages id="teacher.EmailErr" />),
});

const ValidationStepTwo = Yup.object().shape({
  status: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.StatusErr" />),

  teachingField: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.teachingFieldErr" />),

  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.GradeErr" />),
  appointmentType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.appointmentTypeErr" />),

  province: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  jobLocation: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.jobLocationErr" />),

  step: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="teacher.StepErr" />),

  contractType: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="teacher.contractTypeErr" />),

  C_Province: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  C_District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

const TeacherRegister = ({ intl }, values) => {
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
  // const onRegister = (values) => {
  //   //REMOVE USER_ID LATER, IT IS JUST FOR TESTING
  //   //UNCOMMENT TEACHER_PHOTO LATER, when the frontend updated
  //   const data = {
  //     name: values.Name,
  //     father_name: values.FatherName,
  //     grand_father_name: values.GrandFatherName,
  //     cover_number: values.IdCardJoldNo,
  //     registration_number: values.TazkiraNo,
  //     gender: values.gender.value,
  //     main_province: values.Province.value,
  //     main_district: values.District,
  //     main_village: values.Village,
  //     current_province: values.C_Province.value,
  //     current_district: values.C_District,
  //     current_village: values.C_Village,
  //     education_degree: values.levelOfEducation.value,
  //     major: values.major.value,
  //     phone_number: values.PhoneNo,
  //     email: values.Email,
  //     birth_date: values.DoB,
  //     status_type: values.Status.value,
  //     grade: values.Grade.value,
  //     step: values.Step.value,
  //     user_id: 1,
  //     // teacher_photo: values.TeacherPhoto,
  //   };
  //   console.log('The Data', data);

  //   if (
  //     data.values.Name &&
  //     data.values.FatherName &&
  //     data.values.GrandFatherName &&
  //     data.values.IdCardJoldNo !== ''
  //   ) {
  //     return console.log('Please Enter Valid the value');
  //   }

  //   axios
  //     .post(teacherResitgerAPIUrl, data)
  //     .then((res) => {
  //       console.log('The Response', res);
  //       createNotification('success', 'filled');
  //     })
  //     .catch((err) => {
  //       createNotification('error', 'filled');
  //       console.log('The Error ', err);
  //       console.log('The Error ', err.message);
  //       console.log('The Error response ', err.response);
  //       console.log('The Error response.data ', err.response.data);
  //       console.log('The Error response.status', err.response.status);
  //     });
  // };

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({});
  const [Gender, setGender] = useState('0');
  const [LevelOfEducation, setLevelOfEducation] = useState('0');
  const [Major, setMajor] = useState('0');
  const [TazkiraType, setTazkiraType] = useState('0');
  const [Status, setStatus] = useState('0');
  const [TeachingField, setTeachingField] = useState('0');
  const [Grade, setGrade] = useState('0');
  const [AppointmentType, setAppointmentType] = useState('0');
  const [Province, setProvince] = useState('0');
  const [JobLocation, setJobLocation] = useState('0');
  const [TeachingLang, setTeachingLang] = useState('0');
  const [Step1, setStep1] = useState('0');
  const [ContractType, setContractType] = useState('0');
  const [CurrentProvince, setCurrentProvince] = useState('0');
  const onClickNext = (goToNext, steps, step, values) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    if (step.id === 'step1') {
      setGender(form.values.gender.value);
      setLevelOfEducation(form.values.levelOfEducation.value);
      setMajor(form.values.major.value);
      setTazkiraType(form.values.tazkiraType.value);
    }
    if (step.id === 'step2') {
      setStatus(form.values.status.value);
      setTeachingField(form.values.teachingField.value);
      setGrade(form.values.grade.value);
      setAppointmentType(form.values.appointmentType.value);
      setProvince(form.values.province.value);
      setJobLocation(form.values.jobLocation.value);
      setTeachingLang(form.values.teachingLang.value);
      setStep1(form.values.teachingLang.value);
      setContractType(form.values.contractType.value);
      setCurrentProvince(form.values.C_Province.value);
    }
    console.log(step.id, 'stepoId');
    console.log('First Step (Form) Values', form.values);
    form.submitForm().then(() => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...fields, ...form.values };
        setFields(newFields);
        if (steps.length - 2 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
          setLoading(true);
          console.log(newFields, 'Final Values');
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
                    gender: [],
                    levelOfEducation: [],
                    tazkiraType: [],
                    major: [],
                  }}
                  validateOnMount
                  // validationSchema={ValidationStepOne}
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
                    isSubmitting,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <Row>
                        <Colxx xxs="6">
                          <FormGroup className="form-group has-float-label error-l-175">
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
                          <FormGroup className="form-group has-float-label error-l-175">
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
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.TazkiraType" />
                            </Label>

                            <FormikReactSelect
                              name="tazkiraType"
                              id="tazkiraType"
                              value={values.tazkiraType}
                              options={tazkiraOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.tazkiraType && !TazkiraType ? (
                              <div className="invalid-feedback d-block   bg-danger text-white">
                                {errors.tazkiraType}
                              </div>
                            ) : null}
                          </FormGroup>
                          {values.tazkiraType.value === '2' ? (
                            <div>
                              {/* Safha */}
                              <div>
                                <FormGroup className="form-group has-float-label error-l-175">
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
                          <FormGroup className="form-group has-float-label error-l-175 ">
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
                          <FormGroup className="form-group has-float-label error-l-175">
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
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="teacher.MajorLabel" />
                            </Label>
                            <FormikReactSelect
                              name="major"
                              id="major"
                              value={values.major}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              options={majorOptions}
                              required
                            />
                            {errors.major && !Major ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.major}
                              </div>
                            ) : null}
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="6">
                          {/* Grand Father Name */}
                          <FormGroup className="form-group has-float-label error-l-175">
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

                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="gender.gender" />
                            </Label>
                            <FormikReactSelect
                              name="gender"
                              id="gender"
                              value={values.gender}
                              options={genderOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {!Gender && errors.gender ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.gender}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Tazkira Number */}
                          <FormGroup className="form-group has-float-label error-l-175">
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
                          {values.tazkiraType.value === '2' ? (
                            <div>
                              {/* Jold Number */}
                              <div>
                                <FormGroup className="form-group has-float-label error-l-175">
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
                          <FormGroup className="form-group has-float-label error-l-175">
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
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="teacher.LevelOfEducationLabel" />
                            </Label>
                            <FormikReactSelect
                              name="levelOfEducation"
                              id="levelOfEducation"
                              value={values.levelOfEducation}
                              options={levelOfEdcationOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              required
                            />
                            {errors.levelOfEducation && !LevelOfEducation ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.levelOfEducation}
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
                    status: [],
                    teachingField: [],
                    grade: [],
                    appointmentType: [],
                    province: [],
                    jobLocation: [],
                    teachingLang: [],
                    step: [],
                    contractType: [],
                    C_Province: [],
                    C_District: '',
                    district: '',
                    village: '',
                    C_Village: '',
                  }}
                  onSubmit={() => {}}
                  validationSchema={ValidationStepTwo}
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
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.StatusLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="status"
                                  id="status"
                                  value={values.status}
                                  options={StatusOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.status && !Status ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.status}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Grade */}
                              <FormGroup className="form-group has-float-label error-l-175">
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
                                {errors.teachingField && !TeachingField ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.teachingField}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Grade */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.GradeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="grade"
                                  id="grade"
                                  value={values.grade}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  options={GradeOptions}
                                  required
                                />
                                {errors.grade && !Grade ? (
                                  <div className="invalid-feedback d-block  bg-danger text-white ">
                                    {errors.grade}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Contract type */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.appointmentTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="appointmentType"
                                  id="appointmentType"
                                  value={values.appointmentType}
                                  options={appointmentTypeOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.appointmentType && !AppointmentType ? (
                                  <div className="invalid-feedback d-block bg-danger text-white ">
                                    {errors.appointmentType}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                          <Colxx xxs="6">
                            <div className="square p-3 ">
                              {/* Job location*/}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.jobLocationLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="jobLocation"
                                  id="jobLocation"
                                  value={values.jobLocation}
                                  options={dutyLocationOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.jobLocation && !JobLocation ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.jobLocation}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Meduim of instruction*/}
                              <FormGroup className="form-group has-float-label error-l-175">
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
                                {errors.teachingLang && !TeachingLang ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.teachingLang}
                                  </div>
                                ) : null}
                              </FormGroup>
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.StepLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="step"
                                  id="step"
                                  value={values.step}
                                  options={StepOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.step && !Step1 ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.step}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Contract type */}
                              <FormGroup className="form-group has-float-label error-l-175">
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
                                {errors.contractType && !ContractType ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
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
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.ProvinceLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="province"
                                  id="province"
                                  value={values.province}
                                  options={StdSchoolProvinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.province && !Province ? (
                                  <div className="invalid-feedback d-block   bg-danger text-white">
                                    {errors.province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District  permanent*/}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="district"
                                />
                                {errors.district && touched.district ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.district}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village permanent */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="village"
                                />
                                {errors.village && touched.village ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.village}
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
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.ProvinceLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="C_Province"
                                  id="C_Province"
                                  value={values.C_Province}
                                  options={StdSchoolProvinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.C_Province && !CurrentProvince ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.C_Province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="C_District"
                                />
                                {errors.C_District && touched.C_District ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.C_District}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="C_Village"
                                />
                                {errors.C_Village && touched.C_Village ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
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
                    <Button className="mt-5 bg-primary">
                      <IntlMessages id="button.back" />
                    </Button>
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
export default injectIntl(TeacherRegister);
