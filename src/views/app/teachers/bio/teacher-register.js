/* eslint-disable no-param-reassign */
import React, {
  createRef,
  useState,
  Controller,
  useEffect,
  useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import {
  provinceOptions,
  langOptions,
  stepOptions,
  gradeOptions,
  contractTypeOptions,
  genderOptions,
  appointmentTypeOptions,
  tazkiraOptions,
  workersGrade,
  teacherCurrentStatusOptions,
  dateOfBirthOptoions,
} from '../../global-data/options';
import {
  teacherRegisterFormStep_1,
  teacherRegisterFormStep_2,
} from '../../global-data/forms-validation';
import { NavLink } from 'react-router-dom';
import './../../../../assets/css/global-style.css';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx } from 'components/common/CustomBootstrap';

import config from '../../../../config';
import { message } from 'antd';
import { AuthContext } from 'context/AuthContext';
const servicePath = config.API_URL;
const teacherResitgerAPIUrl = `${servicePath}/teachers/create_teachers/`;
const gettingSingleTeacherAPI = `${servicePath}/teachers/institute`;
// http://localhost:8000/teachers/?id=1

const TeacherRegister = ({ intl }, values) => {
  const { contextFields, provinces, districts } = useContext(AuthContext);
  const [initialName, setInitialName] = useState('');
  const [initialLastName, setInitialLastName] = useState('');
  const [initialEnglishName, setInitialEnglishName] = useState('');
  const [initialEnglishLastName, setInitialEnglishLastName] = useState('');
  const [initialEnglishFatherName, setInitialEnglishFatherName] = useState('');
  const [initialFatherName, setInitialFatherName] = useState('');
  const [initialGender, setInitialGender] = useState([]);
  const [initialGrandFatherName, setInitialGrandFatherName] = useState('');
  const [initialregistrationNumber, setInitialregistrationNumber] =
    useState('');
  const [initialPhoneNumber, setInitialPhoneNumber] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState([]);
  const [initialPlaceOfBirth, setInitialPlaceOfBirth] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialpageNumber, setInitialpageNumber] = useState('');
  // const [initialTazkiraType, setInitialTazkiraType] = useState([]);
  // const [initialLevelOfEducation, setInitialLevelOfEducation] = useState([]);
  // const [initialMajor, setInitialMajor] = useState('');
  // const [initialYearCompleted, setInitialYearCompleted] = useState([]);
  // const [initialInstitution, setInitialInstitution] = useState('');
  const [initialcoverNumber, setInitialcoverNumber] = useState('');
  const [initialStatus, setinitialStatus] = useState([]);
  const [initialGrade, setInitialGrade] = useState([]);
  // const [initialTeachingField, setInitialTeachingField] = useState([]);
  // const [initialAppointmentType, setInitialAppointmentType] = useState([]);
  // const [initialJobLocation, setInitialJobLocation] = useState([]);
  // const [initialTeachingLang, setInitialTeachingLang] = useState([]);
  const [initialStep, setInitialStep] = useState([]);
  // const [initialContractType, setInitialContractType] = useState([]);
  const [initialCurrentProvince, setInitialCurrentProvince] = useState([]);
  const [initialCurrentDistrict, setInitialCurrentDistrict] = useState([]);
  const [initialCurrentVillage, setInitialCurrentVillage] = useState('');
  const [initialMainProvince, setInitialMainProvince] = useState([]);
  const [initialMainDistrict, setInitialMainDistrict] = useState([]);
  const [initialMainVillage, setInitialMainVillage] = useState('');

  // const [provinces, setProvinces] = useState([]);
  const [mainDistricts, setMainDistricts] = useState(districts);
  const [currentDistricts, setCurrentDistricts] = useState([]);
  const [selectedMainProvince, setSelectedMainProvince] = useState('');
  const [selectedCurrentProvince, setSelectedCurrentProvince] = useState('');
  // const [institutes, setInstitutes] = useState([]);
  const [fieldsOfStudy, setFieldsOfStudy] = useState(contextFields);
  const forms = [createRef(null), createRef(null), createRef(null)];
  // const [bottomNavHidden, setBottomNavHidden] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [fields, setFields] = useState({});
  const { teacherId } = useParams();

  if (teacherId) {
    useEffect(() => {
      async function fetchTeacher() {
        try {
          const { data } = await callApi(`teachers/${teacherId}`, '', null);

          console.log('DATA in teacher UPDATE:', data);

          const {
            name,
            father_name,
            grand_father_name,
            sukuk_number,
            last_name,
            english_name,
            english_last_name,
            english_father_name,
            grandfather_name,
            registration_number,
            place_of_birth,
            phone_number,
            page_number,
            email,
            cover_number,
            main_village,
            current_village,
            year_of_birth,
            grade,
            gender,
            status,
            current_province,
            main_province,
            main_district,
            current_district,
            step,
          } = data;

          setInitialName(name);
          setInitialFatherName(father_name);
          setInitialGrandFatherName(grand_father_name);
          setInitialregistrationNumber(sukuk_number);
          setInitialLastName(last_name);
          setInitialEnglishName(english_name);
          setInitialEnglishLastName(english_last_name);
          setInitialEnglishFatherName(english_father_name);
          setInitialGrandFatherName(grandfather_name);
          setInitialregistrationNumber(registration_number);
          setInitialPlaceOfBirth(place_of_birth);

          setInitialPhoneNumber(phone_number);
          setInitialpageNumber(page_number);
          setInitialEmail(email);
          setInitialcoverNumber(cover_number);
          setInitialMainVillage(main_village);
          setInitialCurrentVillage(current_village);

          dateOfBirthOptoions.forEach((teacherBirth) => {
            if (teacherBirth.value === year_of_birth.toString()) {
              setYearOfBirth(teacherBirth);
            }
          });

          gradeOptions.forEach((teacherGrade) => {
            if (teacherGrade.value === grade) {
              setInitialGrade(teacherGrade);
            }
          });
          genderOptions.forEach((teacherGender) => {
            if (teacherGender.value === gender) {
              setInitialGender(teacherGender);
            }
          });

          teacherCurrentStatusOptions.forEach((teacherStatus) => {
            if (teacherStatus.value === status) {
              setinitialStatus(teacherStatus);
            }
          });
          provinces.forEach((province) => {
            if (province.value === current_province) {
              setInitialCurrentProvince(province);
            }
            if (province.value === main_province) {
              setInitialMainProvince(province);
            }
          });

          districts.forEach((district) => {
            if (district.value === main_district) {
              setInitialMainDistrict(district);
            }
          });
          currentDistricts.forEach((district) => {
            console.log(district);
            if (district.id === current_district) {
              setInitialCurrentDistrict(district);
            }
          });

          stepOptions.forEach((teacherStep) => {
            if (teacherStep.value === step) {
              setInitialStep(teacherStep);
            }
          });
        } catch (error) {
          console.error('Error fetching teacher:', error);
        }
      }
      fetchTeacher();
    }, []);
  }

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
            // alert('callback');
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

  const fetchDistricts = async (provinceId) => {
    console.log('provinceId', provinceId);
    const response = await callApi(
      `core/districts/?province=${provinceId}`,
      'GET',
      null
    );
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
      }));
      setMainDistricts(updatedData);
    } else {
      console.log('district error');
    }
  };

  const fetchCurrentDistricts = async (provinceId) => {
    console.log('provinceId', provinceId);
    const response = await callApi(
      `core/districts/?province=${provinceId}`,
      'GET',
      null
    );
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setCurrentDistricts(updatedData);
    } else {
      console.log('district error');
    }
  };

  useEffect(() => {
    console.log('selectedmainProvince', selectedMainProvince);
    if (selectedMainProvince) {
      fetchDistricts(selectedMainProvince);
    }
  }, [selectedMainProvince]);

  useEffect(() => {
    console.log('selectedProvince', selectedCurrentProvince);
    if (selectedCurrentProvince) {
      fetchCurrentDistricts(selectedCurrentProvince);
    }
  }, [selectedCurrentProvince]);

  const RegisterTeacher = async (newFields) => {
    let apiParams = {
      endPoint: 'teachers/',
      method: 'POST',
    };
    if (teacherId) {
      apiParams.endPoint = `teachers/${teacherId}/`;
      apiParams.method = 'PATCH';
    }
    // alert('Form Submitted');
    console.log('Form Data: ', newFields);

    const data = {
      // contract_type: newFields.appointmentType?.value,
      cover_number: newFields.coverNumber,
      current_district: newFields.currentDistrict?.value,
      current_province: newFields.currentProvince?.value,
      current_village: newFields.currentVillage,
      email: newFields.email,
      english_father_name: newFields.englishFatherName,
      english_last_name: newFields.englishLastName,
      english_name: newFields.englishName,
      father_name: newFields.fatherName,
      gender: newFields.gender?.value,
      grade: newFields.grade?.value,
      grandfather_name: newFields.grandFatherName,
      // hire_date: newFields.hireDate,
      // institution: newFields.institution,
      // institute: newFields.jobLocation?.value,
      last_name: newFields.lastName,
      // degree: newFields.levelOfEducation?.value,
      main_district: newFields.mainDistrict?.value,
      main_province: newFields.mainProvince?.value,
      main_village: newFields.mainVillage,
      // field_of_study: newFields.major,
      tazkira_type: newFields.tazkiraType?.value,
      name: newFields.name,
      page_number: newFields.pageNumber || null,
      phone_number: newFields.phoneNumber || null,
      place_of_birth: newFields.placeOfBirth,
      registration_number: newFields.registrationNumber,
      step: newFields.step?.value,
      // teaching_field: newFields.teachingField?.value,
      // teaching_language: newFields.teachingLang?.value,
      // year_completed: newFields.yearCompleted?.value,
      year_of_birth: newFields.yearOfBirth?.value,
      status: newFields.status?.value,
    };
    console.log('apiParas: ', apiParams);
    await callApi(apiParams.endPoint, apiParams.method, data)
      .then((response) => {
        message.success('استاد ثبت شو');
        window.location.replace(`/`);
        console.log('RESPONSE in Teacher register: ', response.data);
      })
      .catch((err) => console.log('Error in Teacher Save: ', err));
  };
  return (
    <Card>
      <div className="mt-4 ml-5">
        <h2 className="mt-5 m-5 titleStyle">
          {<IntlMessages id="teacher.RegisterTitle" />}
        </h2>
      </div>
      <CardBody className="wizard wizard-default">
        <div className="wizard-basic-step">
          <Formik
            enableReinitialize={true}
            innerRef={forms[0]}
            initialValues={{
              name: initialName,
              englishName: initialEnglishName,
              lastName: initialLastName,
              englishLastName: initialEnglishLastName,
              fatherName: initialFatherName,
              englishFatherName: initialEnglishFatherName,
              grandFatherName: initialGrandFatherName,
              yearOfBirth: yearOfBirth,
              placeOfBirth: initialPlaceOfBirth,
              registrationNumber: initialregistrationNumber,
              phoneNumber: initialPhoneNumber,
              email: initialEmail,
              pageNumber: initialpageNumber,
              coverNumber: initialcoverNumber,
              gender: initialGender,
              tazkiraType:
                initialpageNumber > 0 ? tazkiraOptions[1] : tazkiraOptions[0],
              grade: initialGrade,
              step: initialStep,
              currentDistrict: initialCurrentDistrict,
              currentProvince: initialCurrentProvince,
              mainProvince: initialMainProvince,
              mainDistrict: initialMainDistrict,
              currentVillage: initialCurrentVillage,
              mainVillage: initialMainVillage,
              status: initialStatus,
            }}
            validateOnMount
            validationSchema={teacherRegisterFormStep_1}
            onSubmit={(formData) => {
              RegisterTeacher(formData);
            }}
          >
            {({
              errors,
              touched,
              values,
              setFieldTouched,
              setFieldValue,
              isSubmitting,
              handleSubmit,
            }) =>
              isSubmitting ? (
                'Updating...'
              ) : (
                <Form className="av-tooltip tooltip-label-right style">
                  <Row className="justify-content-center">
                    <Colxx xxs="5" className="ml-5">
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.NameLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="name"
                        />
                        {errors.name && touched.name ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.name}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* lastname */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.lastName" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="lastName"
                        />
                        {errors.lastName && touched.lastName ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.lastName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Father Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.FatherNameLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="fatherName"
                        />
                        {errors.fatherName && touched.fatherName ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.fatherName}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Tazkira Type */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.TazkiraType" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>

                        <FormikReactSelect
                          name="tazkiraType"
                          id="tazkiraType"
                          value={values.tazkiraType}
                          options={tazkiraOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.tazkiraType && touched.tazkiraType ? (
                          <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                            {errors.tazkiraType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {values.tazkiraType.value === 'paper' ? (
                        <div>
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="teacher.IdCardJoldNoLabel" />
                            </Label>
                            <Field
                              className="form-control fieldStyle"
                              name="coverNumber"
                              type="number"
                            />
                            {errors.coverNumber && touched.coverNumber ? (
                              <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                {errors.coverNumber}
                              </div>
                            ) : null}
                          </FormGroup>
                          <FormGroup className="form-group has-float-label error-l-175">
                            <Label>
                              <IntlMessages id="teacher.IdcardPageNoLabel" />
                            </Label>
                            <Field
                              className="form-control fieldStyle"
                              name="pageNumber"
                              type="number"
                            />
                            {errors.pageNumber && touched.pageNumber ? (
                              <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                {errors.pageNumber}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label>
                          <IntlMessages id="teacher.DoBLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="yearOfBirth"
                          id="yearOfBirth"
                          value={values.yearOfBirth}
                          options={dateOfBirthOptoions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.yearOfBirth && touched.yearOfBirth ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.yearOfBirth}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Education */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.GradeLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="grade"
                          id="grade"
                          value={values.grade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={gradeOptions}
                          required
                        />
                        {errors.grade && touched.grade ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.grade}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.StepLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="step"
                          id="step"
                          value={values.step}
                          options={stepOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.step && touched.step ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.step}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.StatusLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="status"
                          id="status"
                          value={values.status}
                          options={teacherCurrentStatusOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.status && touched.status ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.status}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <FormGroup className="form-group has-float-label error-l-175 w-100">
                        <label for="grade" class="col-form-label">
                          Grade
                          <span style={{ color: 'red' }}>*</span>
                        </label>

                        <FormikReactSelect
                          name="grade"
                          id="grade"
                          value={values.grade}
                          options={gradeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.grade && touched.grade ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.grade}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label error-l-175 w-100">
                        <label for="step" class="col-form-label">
                          Step
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <FormikReactSelect
                          name="step"
                          id="step"
                          value={values.step}
                          options={stepOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.step && touched.step ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.step}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div> */}
                    </Colxx>
                    <Colxx xxs="5" className="mr-5">
                      {/* Teacher English Name */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label>
                          <IntlMessages id="forms.Eng_name" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="englishName"
                        />
                        {errors.englishName && touched.englishName ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.englishName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* englishLastname */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.lastNameEng" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="englishLastName"
                        />
                        {errors.englishLastName && touched.englishLastName ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.englishLastName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Teacher Father English Name */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="englishFatherName"
                        />
                        {errors.englishFatherName &&
                        touched.englishFatherName ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.englishFatherName}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Grand Father Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.GrandFatherNameLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="grandFatherName"
                        />
                        {errors.grandFatherName && touched.grandFatherName ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.grandFatherName}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Gender */}

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="gender.gender" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="gender"
                          id="gender"
                          value={values.gender}
                          options={genderOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {touched.gender && errors.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.gender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Tazkira Number */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.TazkiraNoLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="registrationNumber"
                          type="number"
                        />
                        {errors.registrationNumber &&
                        touched.registrationNumber ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.registrationNumber}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Contact No */}
                      <FormGroup className="form-group has-float-label error-l-175 ">
                        <Label>
                          <IntlMessages id="teacher.PhoneNoLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="phoneNumber"
                          type="number"
                        />
                        {errors.phoneNumber && touched.phoneNumber ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.phoneNumber}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Email Address */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.EmailLabel" />
                          {/* <span style={{ color: 'red' }}>*</span> */}
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="email"
                          type="email"
                        />
                        {errors.email && touched.email ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.email}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Place of birth */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label>
                          <IntlMessages id="forms.PlaceOfBirthLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="placeOfBirth"
                        />
                        {errors.placeOfBirth && touched.placeOfBirth ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.placeOfBirth}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>

                  <Row className="justify-content-center">
                    <Colxx xxs="5">
                      <div className="pt-5">
                        <h1 className=" mb-4">
                          {<IntlMessages id="forms.PermanentAddressLabel" />}
                        </h1>

                        {/* province permanent*/}
                        <FormGroup className="form-group has-float-label error-l-175">
                          <Label>
                            <IntlMessages id="forms.ProvinceLabel" />
                            <span style={{ color: 'red' }}>*</span>
                          </Label>
                          <FormikReactSelect
                            name="mainProvince"
                            id="mainProvince"
                            value={values.mainProvince}
                            options={provinces}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            onClick={setSelectedMainProvince(
                              values.mainProvince.value
                            )}
                          />
                          {errors.mainProvince && touched.mainProvince ? (
                            <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                              {errors.mainProvince}
                            </div>
                          ) : null}
                        </FormGroup>

                        {/* District  permanent*/}
                        <FormGroup className="form-group has-float-label error-l-175">
                          <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                            <IntlMessages id="forms.DistrictLabel" />
                          </Label>
                          <FormikReactSelect
                            name="mainDistrict"
                            id="mainDistrict"
                            value={values.mainDistrict}
                            options={districts?.filter(
                              (district) =>
                                district.province === values.mainProvince.value
                            )}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.mainDistrict && touched.mainDistrict ? (
                            <div className="invalid-feedback d-block bg-danger text-white">
                              {errors.mainDistrict}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/* Village  Main*/}
                        <FormGroup className="form-group has-float-label error-l-100">
                          <Label>
                            <IntlMessages id="forms.VillageLabel" />
                          </Label>
                          <Field
                            className="form-control fieldStyle"
                            name="mainVillage"
                          />
                          {errors.englishName && touched.englishName ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.englishName}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Colxx>

                    <Colxx xxs="5">
                      <div className="pt-5">
                        <h1 className=" mb-4">
                          {<IntlMessages id="forms.CurrentAddresslabel" />}
                        </h1>

                        {/* Current Address */}
                        {/* province Current */}
                        <FormGroup className="form-group has-float-label error-l-175">
                          <Label>
                            <IntlMessages id="forms.ProvinceLabel" />
                            <span style={{ color: 'red' }}>*</span>
                          </Label>
                          <FormikReactSelect
                            name="currentProvince"
                            id="currentProvince"
                            value={values.currentProvince}
                            options={provinces}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            onClick={setSelectedCurrentProvince(
                              values.currentProvince.value
                            )}
                          />
                          {errors.currentProvince && touched.currentProvince ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.currentProvince}
                            </div>
                          ) : null}
                        </FormGroup>

                        {/* Current District */}
                        <FormGroup className="form-group has-float-label error-l-175">
                          <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                            <IntlMessages id="forms.DistrictLabel" />
                          </Label>
                          <FormikReactSelect
                            name="currentDistrict"
                            id="currentDistrict"
                            value={values.currentDistrict}
                            options={districts.filter(
                              (district) =>
                                district.province ===
                                values.currentProvince.value
                            )}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.currentDistrict && touched.currentDistrict ? (
                            <div className="invalid-feedback d-block bg-danger text-white">
                              {errors.currentDistrict}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/* Village  Current*/}
                        <FormGroup className="form-group has-float-label error-l-100">
                          <Label>
                            <IntlMessages id="forms.VillageLabel" />
                          </Label>
                          <Field
                            className="form-control fieldStyle"
                            name="currentVillage"
                          />
                          {errors.englishName && touched.englishName ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.englishName}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Colxx>
                  </Row>
                  <NavLink
                    to={{
                      pathname: `app/teachers/`,
                      state: { data: 'TEACHER' },
                    }}
                  >
                    <Button className="mt-5 bg-primary" onClick={handleSubmit}>
                      <IntlMessages id="ثبت" />
                    </Button>
                  </NavLink>
                </Form>
              )
            }
          </Formik>
        </div>
      </CardBody>
    </Card>
  );
};
export default injectIntl(TeacherRegister);
