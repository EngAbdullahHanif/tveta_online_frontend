/* eslint-disable no-param-reassign */
import React, { createRef, useState, Controller, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';

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
const gettingSingleTeacherAPI = `${servicePath}/teachers/institute`;
// http://localhost:8000/teachers/?id=1

const tazkiraOptions = [
  { value: '1', label: 'الکترونیکی' },
  { value: '2', label: 'کاغذی' },
];

const dutyLocationOptions = [
  { value: '1', label: 'انستیتوت نیما' },
  { value: '2', label: 'لیسه مسلکی نابینایان' },
];
const teacherteachingfieldOptions = [
  { value: '1', label: 'زراعت' },
  { value: '2', label: 'کمپیوتر ساینس ' },
  { value: '3', label: 'کمپیوتر ساینس ' },
];
const StatusOptions = [
  { value: '1', label: 'فعال' },
  { value: '3', label: 'منفک' },
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
    value: '1',
    label: '14th',
  },
  {
    value: '2',
    label: 'لسانس',
  },
  {
    value: '3',
    label: 'ماستر',
  },
  { value: '4', label: 'PHD' },
];

const majorOptions = [
  { value: '1', label: 'Computer Science' },
  { value: '2', label: 'Agriculture' },
  { value: '3', label: 'BBA' },
  { value: '4', label: 'Mechenical Engineering' },
];

const langOptions = [
  {
    value: 1,
    label: 'پښتو',
  },
  {
    value: 2,
    label: 'دری',
  },
  {
    value: 3,
    label: 'English',
  },
];

const appointmentTypeOptions = [
  {
    value: '1',
    label: 'رسمی',
  },
  {
    value: '2',
    label: 'قراردادی',
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
  { value: 123, label: 'کابل' },
  { value: 23123, label: 'ننگرهار' },
  { value: 3, label: 'هرات' },
];

const genderOptions = [
  { value: '1', label: 'نارینه/مذکر' },
  { value: '2', label: 'ښځینه/مونث' },
];

const TeacherRegister = ({ intl }, values) => {
  const [intialName, setInitialName] = useState('');
  const [intialFatherName, setInitialFatherName] = useState('');
  const [initialGender, setInitialGender] = useState([]);
  const [initialGrandFatherName, setInitialGrandFatherName] = useState('');
  const [initialTazkiraNo, setInitialTazkiraNo] = useState('');
  const [initialPhoneNo, setInitialPhoneNo] = useState('');
  const [initialDoB, setInitialDoB] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialIdcardPageNo, setInitialIdcardPageNo] = useState('');
  const [initialTazkiraType, setInitialTazkiraType] = useState([]);
  const [initialLevelOfEducation, setInitialLevelOfEducation] = useState([]);
  const [initialMajor, setInitialMajor] = useState([]);
  const [initialIdCardJoldNo, setInitialIdCardJoldNo] = useState('');
  const [initialStatus, setinitialStatus] = useState('');
  const [initialGrade, setIntialGrade] = useState([]);
  const [initialTeachingField, setInitialTeachingField] = useState([]);
  const [initialAppointmentType, setInitialAppointmentType] = useState([]);
  const [initialProvince, setInitialProvince] = useState([]);
  const [initialJobLocation, setInitialJobLocation] = useState('');
  const [initialTeachingLang, setInitialTeachingLang] = useState([]);
  const [initialStep, setInitialStep] = useState([]);
  const [initialContractType, setInitialContractType] = useState([]);
  const [initialCurrentProvince, setInitialCurrentProvince] = useState([]);
  const [initialCurrentDistrict, setInitialCurrentDistrict] = useState([]);
  const [initialCurrentVillage, setInitialCurrentVillage] = useState('');
  const [initialDistrict, setInitialDistrict] = useState('');
  const [initialVillage, setInitialVillage] = useState('');

  const { teacherId } = useParams();
  console.log('teacher-id', teacherId);

  if (teacherId) {
    useEffect(() => {
      async function fetchStudent() {
        // const { data } = await axios.get(
        //   `${gettingSingleTeacherAPI}/?teacher_id=${teacherId}`
        // );
        const { data } = await callApi(
          `teachers/institute/?teacher_id=${teacherId}`,
          '',
          null
        );

        console.log(data, 'object of the data');

        setInitialName(data[0].teacher_id.name);
        setInitialFatherName(data[0].teacher_id.father_name);
        setInitialGrandFatherName(data[0].teacher_id.grand_father_name);
        setInitialTazkiraNo(data[0].teacher_id.sukuk_number);
        if (data[0].teacher_id.sukuk_number)
          setInitialTazkiraType(tazkiraOptions[1]);
        else setInitialTazkiraType(tazkiraOptions[0]);
        setInitialPhoneNo(data[0].teacher_id.phone_number);
        setInitialDoB('2022-08-12');
        setInitialIdcardPageNo(data[0].teacher_id.page_number);
        setInitialEmail(data[0].teacher_id.email);
        const teacherFieldOptions = majorOptions.map((teacherField) => {
          if (teacherField.value === data[0].teacher_id.education_degree) {
            setInitialMajor(teacherField);
          }
        });
        const teahcerGenderOptions = genderOptions.map((teacherGender) => {
          if (teacherGender.value === data[0].teacher_id.gender) {
            setInitialGender(teacherGender);
          }
        });
        setInitialIdCardJoldNo(data[0].teacher_id.cover_number);

        const teacherLevelOfEducationOptions = levelOfEdcationOptions.map(
          (teacherLevelOfEducation) => {
            if (
              teacherLevelOfEducation.value ===
              data[0].teacher_id.education_degree
            ) {
              setInitialLevelOfEducation(teacherLevelOfEducation);
            }
          }
        );
        const teacherMainProvince = StdSchoolProvinceOptions.map((province) => {
          if (province.value == data[0].teacher_id.main_province) {
            setInitialProvince(province);
          }
        });
        const teacherCurrentProvince = StdSchoolProvinceOptions.map(
          (province) => {
            if (province.value == data[0].teacher_id.current_province) {
              setInitialCurrentProvince(province);
            }
          }
        );
        const teachingLangugaeOptions = langOptions.map((teachingLangugage) => {
          if (teachingLangugage.value == data[0].institute_id.language) {
            setInitialTeachingLang(teachingLangugage);
          }
        });
        const teacherStatusOptions = StatusOptions.map((teacherStatus) => {
          if (teacherStatus.value == data[0].teacher_id.status_type) {
            setinitialStatus(teacherStatus);
          }
        });
        const teacherAppointingOptions = appointmentTypeOptions.map(
          (appointingType) => {
            if (appointingType.value == data[0].job_type) {
              setInitialAppointmentType(appointingType);
            }
          }
        );
        const teachingFieldOptions = teacherteachingfieldOptions.map(
          (teachingField) => {
            if (teachingField.value == data[0].teacher_id.education_degree) {
              setInitialTeachingField(teachingField);
            }
          }
        );
        const teacherGradeOptions = GradeOptions.map((teacherGrade) => {
          if (teacherGrade.value == data[0].teacher_id.status_type) {
            setIntialGrade(teacherGrade);
          }
        });

        setInitialCurrentDistrict(data[0].teacher_id.current_district);
        setInitialCurrentVillage(data[0].teacher_id.current_village);
        setInitialDistrict(data[0].teacher_id.main_district);
        setInitialVillage(data[0].teacher_id.main_village);
        setInitialJobLocation([
          {
            value: data[0].institute_id.id,
            label: data[0].institute_id.name,
          },
        ]);

        const teacherStepOptions = StepOptions.map((teacherStep) => {
          if (teacherStep.value == data[0].teacher_id.step) {
            setInitialStep(teacherStep);
          }
        });

        const contractTypeOptionss = contractTypeOptions.map(
          (teacherContractType) => {
            if (teacherContractType.value == data[0].contract_type) {
              setInitialContractType(teacherContractType);
            }
          }
        );
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }

  // Updating Mode is through
  const UpdatingMode = false;
  const ValidationStepOne = Yup.object().shape({
    name1: Yup.string()
      .min(3, <IntlMessages id="min.minInputValue" />)
      .max(50, <IntlMessages id="max.maxInputValue" />)
      .required(<IntlMessages id="teacher.NameErr" />),

    fatherName: Yup.string()
      .required(<IntlMessages id="teacher.FatherNameErr" />)
      .min(3, <IntlMessages id="min.minInputValue" />)
      .max(50, <IntlMessages id="max.maxInputValue" />),

    gender: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="forms.genderErr" />)
      : '',

    grandFatherName: Yup.string()
      .required(<IntlMessages id="teacher.GrandFatherNameErr" />)
      .min(3, <IntlMessages id="min.minInputValue" />)
      .max(50, <IntlMessages id="max.maxInputValue" />),

    tazkiraNo: Yup.string().required(
      <IntlMessages id="teacher.TazkiraNoErr" />
    ),
    phoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
    DoB: Yup.date().required(<IntlMessages id="forms.StdDoBErr" />),

    levelOfEducation: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.LevelOfEducationErr" />)
      : '',

    major: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.LevelOfEducationErr" />)
      : '',

    tazkiraType: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="forms.StdTazkiraTypeErr" />)
      : '',

    email: Yup.string()
      .email(<IntlMessages id="teacher.EmailRequiredErr" />)
      .required(<IntlMessages id="teacher.EmailErr" />),
  });

  const ValidationStepTwo = Yup.object().shape({
    status: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.StatusErr" />)
      : '',

    teachingField: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.teachingFieldErr" />)
      : '',

    grade: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.GradeErr" />)
      : '',

    appointmentType: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.appointmentTypeErr" />)
      : '',

    province: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
      : '',

    jobLocation: UpdatingMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="teacher.jobLocationErr" />)
      : '',

    step: UpdatingMode
      ? Yup.object()
          .shape({ value: Yup.string().required() })
          .nullable()
          .required(<IntlMessages id="teacher.StepErr" />)
      : '',

    contractType: UpdatingMode
      ? Yup.object()
          .shape({ value: Yup.string().required() })
          .nullable()
          .required(<IntlMessages id="teacher.contractTypeErr" />)
      : '',

    C_Province: UpdatingMode
      ? Yup.object()
          .shape({ value: Yup.string().required() })
          .nullable()
          .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
      : '',

    C_District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

    district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
    village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
    C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
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
  // const onRegister = (values) => {
  //   //REMOVE USER_ID LATER, IT IS JUST FOR TESTING
  //   //UNCOMMENT TEACHER_PHOTO LATER, when the frontend updated
  //   const data = {
  //     name: values.name1,
  //     father_name: values.fatherName,
  //     grand_father_name: values.grandFatherName,
  //     cover_number: values.idCardJoldNo,
  //     registration_number: values.tazkiraNo,
  //     gender: values.gender.value,
  //     main_province: values.province.value,
  //     main_district: values.district,
  //     main_village: values.village,
  //     current_province: values.C_Province.value,
  //     current_district: values.C_District,
  //     current_village: values.C_Village,
  //     education_degree: values.levelOfEducation.value,
  //     major: values.major.value,
  //     phone_number: values.PhoneNo,
  //     email: values.email,
  //     birth_date: values.DoB,
  //     status_type: values.status.value,
  //     grade: values.grade.value,
  //     step: values.step.value,
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
        console.log('form data all here', newFields);
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
                  enableReinitialize={true}
                  innerRef={forms[0]}
                  initialValues={{
                    name1: intialName,
                    fatherName: intialFatherName,
                    grandFatherName: initialGrandFatherName,
                    DoB: initialDoB,
                    tazkiraNo: initialTazkiraNo,
                    phoneNo: initialPhoneNo,
                    email: initialEmail,
                    idCardPageNo: initialIdcardPageNo,
                    idCardJoldNo: initialIdCardJoldNo,
                    // idCardJoldNo: 'initialIdCardJoldNo',
                    gender: initialGender,
                    levelOfEducation: initialLevelOfEducation,
                    tazkiraType: initialTazkiraType,
                    // tazkiraType: [],
                    major: initialMajor,
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
                              <IntlMessages id="teacher.NameLabel" />
                            </Label>
                            <Field className="form-control" name="name1" />
                            {errors.name1 && touched.name1 ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.name1}
                              </div>
                            ) : null}
                          </FormGroup>
                          {/* Father Name */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="teacher.FatherNameLabel" />
                            </Label>
                            <Field className="form-control" name="fatherName" />
                            {errors.fatherName && touched.fatherName ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.fatherName}
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
                                    name="idCardPageNo"
                                    type="number"
                                  />
                                  {errors.idCardPageNo &&
                                  touched.idCardPageNo ? (
                                    <div className="invalid-feedback d-block  bg-danger text-white">
                                      {errors.idCardPageNo}
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
                              name="phoneNo"
                              type="number"
                            />
                            {errors.phoneNo && touched.phoneNo ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.phoneNo}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* date */}
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="teacher.DoBLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="DoB"
                              type="date"
                            />
                            {errors.DoB && touched.DoB ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
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
                              name="grandFatherName"
                            />
                            {errors.grandFatherName &&
                            touched.grandFatherName ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.grandFatherName}
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
                              name="tazkiraNo"
                              type="number"
                            />
                            {errors.tazkiraNo && touched.tazkiraNo ? (
                              <div className="invalid-feedback d-block  bg-danger text-white">
                                {errors.tazkiraNo}
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
                                    name="idCardJoldNo"
                                    type="number"
                                  />
                                  {errors.idCardJoldNo &&
                                  touched.idCardJoldNo ? (
                                    <div className="invalid-feedback d-block  bg-danger text-white">
                                      {errors.idCardJoldNo}
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
                              name="email"
                              type="email"
                            />
                            {errors.email && touched.email ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.email}
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
                    status: initialStatus,
                    teachingField: initialTeachingField,
                    grade: initialGrade,
                    appointmentType: initialAppointmentType,
                    province: initialProvince,
                    jobLocation: initialJobLocation,
                    teachingLang: initialTeachingLang,
                    step: initialStep,
                    contractType: initialContractType,
                    C_Province: initialCurrentProvince,
                    C_District: initialCurrentDistrict,
                    district: initialDistrict,
                    village: initialVillage,
                    C_Village: initialCurrentVillage,
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
