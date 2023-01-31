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

const tazkiraOptions = [
  { value: '1', label: <IntlMessages id="forms.StdTazkiraElectronic" /> },
  { value: '2', label: <IntlMessages id="forms.StdTazkiraPaper" /> },
];

const EducationLevelOptions = [
  { value: '9th', label: <IntlMessages id="forms.EducationalLevel_9th" /> },
  { value: '10th', label: <IntlMessages id="forms.EducationalLevel_10th" /> },
  { value: '11th', label: <IntlMessages id="forms.EducationalLevel_11th" /> },
  { value: '12th', label: <IntlMessages id="forms.EducationalLevel_12th" /> },
  { value: '13th', label: <IntlMessages id="forms.EducationalLevel_13th" /> },
  { value: '14th', label: <IntlMessages id="forms.EducationalLevel_14th" /> },
];

const StdInteranceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdInteranceOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdInteranceOption_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdInteranceOption_3" /> },
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

const StudentTypeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudentTypeContiniues" /> },
  { value: '2', label: <IntlMessages id="forms.StudentTypeNonContiniues" /> },
];

const ValidationStepOne = Yup.object().shape({
  stdName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  stdFatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),
  stdFatherDuty: Yup.string()
    .required(<IntlMessages id="forms.StdFatherDutyErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  stdEngName: Yup.string()
    .required(<IntlMessages id="forms.englishNameError" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  stdFatherEngName: Yup.string()
    .required(<IntlMessages id="forms.FatherEnglishNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  stdFatherDutyLocation: Yup.string()
    .required(<IntlMessages id="forms.StdFatherDutyLocationErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),
  stdPlaceOfBirth: Yup.string()
    .required(<IntlMessages id="forms.StdPlaceOfBirthErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  TazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),
  PhoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  DoB: Yup.date().required(<IntlMessages id="forms.StdDoBErr" />),

  province: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  C_Province: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  C_District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),

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
  levelOfEducation: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  stdPreSchool: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StPreShcoolErr" />),

  stdInteranceType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdInteranceTypeErr" />),

  stdSchoolProvince: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdInteranceTypeErr" />),

  stdGraduationYear: Yup.date().required(
    <IntlMessages id="forms.StdGraduationYearErr" />
  ),

  studentType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudentTypeErr" />),
});

const StudentRegistraion = ({ intl }, values) => {
  const [isNext, setIsNext] = useState(false);
  const [IdCard, setIdCard] = useState(null);
  // console.log('values', values);

  const handleClick = (event) => {
    setIsNext(event);
  };
  const onRegister = (values) => {
    // if (!values) {
    //   return;
    // }
    //send data to server
    const data = {
      std_id: '1',
      name: values.StdName,
      Eng_name: values.StdEngName,
      father_name: values.StdFatherName,
      Eng_father_name: values.StdFatherEngName,
      cover_number: values.StdIdCardCover,
      page_number: values.StdIdCardPageNo,
      registration_number: values.StdTazkiraNo,
      Sukuk_number: values.StdIdCardSakukNo,
      main_province: values.Province.value,
      main_district: values.District,
      main_village: values.Village,
      current_province: values.C_Province.value,
      current_district: values.C_District,
      current_village: values.C_Village,
      birth_date: values.StdDoB,
      fatherـprofession: values.StdFatherDuty,
      fatherـplaceـofـduty: values.StdFatherDutyLocation,
      finished_grade: values.EducationLevel.value,
      // finished_grade_year: values.StdGraduationYear,
      finished_grade_year: 2022,
      school: values.StPreShcool,
      schoolـprovince: values.StdSchoolProvince.value,
      study_types: 1,
      // study_types: add study types (فارغ، جاری، منفک)
      student_type: values.StudentType.value,
      internse_type: values.StdInteranceType.value,
      // std_photo: 'images/1.jpg',
      // Documents: 'images/2.jpg',

      //add student photo

      //add more documents
    };
    console.log('data', data);

    axios
      .post('http://localhost:8000/api/', data)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({});
  const [LevelOfEducation, setLevelOfEducation] = useState('0');
  const [TazkiraType, setTazkiraType] = useState('0');
  const [Province, setProvince] = useState('0');
  const [CurrentProvince, setCurrentProvince] = useState('0');
  const [StdInteranceType, setStdInteranceType] = useState('0');
  const [StdSchoolProvince, setStdSchoolProvince] = useState('0');
  const [StudentType, setStudentType] = useState('0');

  const onClickNext = (goToNext, steps, step, values) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    if (step.id === 'step1') {
      setTazkiraType(form.values.tazkiraType.value);
      setProvince(form.values.province.value);
      setCurrentProvince(form.values.C_Province.value);
    }
    if (step.id === 'step2') {
      setStdInteranceType(form.values.stdInteranceType.value);
      setLevelOfEducation(form.values.levelOfEducation.value);
      setStdSchoolProvince(form.values.stdSchoolProvince.value);
      setStudentType(form.values.studentType.value);
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
        <h3 className="mt-5 m-5">{<IntlMessages id="forms.title" />}</h3>
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
                    stdName: '',
                    stdFatherName: '',
                    stdFatherDuty: '',
                    stdEngName: '',
                    stdFatherEngName: '',
                    stdFatherDutyLocation: '',
                    stdPlaceOfBirth: '',
                    DoB: '',
                    TazkiraNo: '',
                    PhoneNo: '',
                    Email: '',
                    IdCardPageNo: '',
                    IdCardJoldNo: '',
                    // gender: [
                    //   {
                    //     value: '0',
                    //     label: (
                    //       <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                    //     ),
                    //   },
                    // ],

                    tazkiraType: [
                      {
                        value: '0',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],

                    province: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
                    C_Province: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
                    C_District: '',
                    district: '',
                    village: '',
                    C_Village: '',
                  }}
                  validateOnMount
                  validationSchema={ValidationStepOne}
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
                              <IntlMessages id="forms.StdName" />
                            </Label>
                            <Field className="form-control" name="stdName" />
                            {errors.stdName && touched.stdName ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdName}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Father Name */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.StdFatherName" />
                            </Label>
                            <Field
                              className="form-control"
                              name="stdFatherName"
                            />
                            {errors.stdFatherName && touched.stdFatherName ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdFatherName}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* Father Duty */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.StdFatherDutyLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="stdFatherDuty"
                            />
                            {errors.stdFatherDuty && touched.stdFatherDuty ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdFatherDuty}
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
                        </Colxx>
                        <Colxx xxs="6">
                          {/* Student English Name */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.Eng_name" />
                            </Label>
                            <Field className="form-control" name="stdEngName" />
                            {errors.stdEngName && touched.stdEngName ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdEngName}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/*Students Father English Name */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.Std_father_Eng_Name" />
                            </Label>
                            <Field
                              className="form-control"
                              name="stdFatherEngName"
                            />
                            {errors.stdFatherEngName &&
                            touched.stdFatherEngName ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdFatherEngName}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Father duty place */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="stdFatherDutyLocation"
                            />
                            {errors.stdFatherDutyLocation &&
                            touched.stdFatherDutyLocation ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdFatherDutyLocation}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Place of birth */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="forms.PlaceOfBirthLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="stdPlaceOfBirth"
                            />
                            {errors.stdPlaceOfBirth &&
                            touched.stdPlaceOfBirth ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.stdPlaceOfBirth}
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

                          {/* Gender */}
                          {/* <FormGroup className="form-group has-float-label error-l-175">
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
                          </FormGroup> */}

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
                              <Field className="form-control" name="district" />
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
                              <Field className="form-control" name="village" />
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
                              {<IntlMessages id="forms.CurrentAddresslabel" />}
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
                    status: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
                    levelOfEducation: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
                    stdInteranceType: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
                    studentType: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
                    stdPreSchool: '',
                    stdGraduationYear: '',
                    stdSchoolProvince: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],

                    jobLocation: [
                      {
                        value: '',
                        label: (
                          <IntlMessages id="forms.TazkiraTypeDefaultValue" />
                        ),
                      },
                    ],
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
                            <div className="p-3">
                              {' '}
                              {/* Education */}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="teacher.LevelOfEducationLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="levelOfEducation"
                                  id="levelOfEducation"
                                  value={values.levelOfEducation}
                                  options={EducationLevelOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.levelOfEducation &&
                                !LevelOfEducation ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.levelOfEducation}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Student Maktab*/}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.StPreShcoolLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="stdPreSchool"
                                />
                                {errors.stdPreSchool && touched.stdPreSchool ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.stdPreSchool}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* internse type*/}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.StdInteranceTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="stdInteranceType"
                                  id="stdInteranceType"
                                  value={values.stdInteranceType}
                                  options={StdInteranceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />

                                {errors.stdInteranceType &&
                                !StdInteranceType ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.stdInteranceType}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                          <Colxx xxs="6">
                            <div className="square p-3 ">
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.StdGraduationYearLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="stdGraduationYear"
                                  type="date"
                                />
                                {errors.stdGraduationYear &&
                                touched.stdGraduationYear ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.stdGraduationYear}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/*School province*/}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.StdSchoolProvinceLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="stdSchoolProvince"
                                  id="stdSchoolProvince"
                                  value={values.stdSchoolProvince}
                                  options={StdSchoolProvinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.stdSchoolProvince &&
                                !StdSchoolProvince ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.stdSchoolProvince}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/*Student Type*/}
                              <FormGroup className="form-group has-float-label error-l-175">
                                <Label>
                                  <IntlMessages id="forms.StudentTypeLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="studentType"
                                  id="studentType"
                                  value={values.studentType}
                                  options={StudentTypeOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.studentType && !StudentType ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.studentType}
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

                    <Button className="mt-2">
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
export default injectIntl(StudentRegistraion);
