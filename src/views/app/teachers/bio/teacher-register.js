/* eslint-disable no-param-reassign */
import React, { createRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import {
  stepOptions,
  gradeOptions,
  genderOptions,
  tazkiraOptions,
  teacherCurrentStatusOptions,
  dateOfBirthOptoions,
} from '../../global-data/options';
import { teacherRegisterFormStep_1 } from '../../global-data/forms-validation';
import { NavLink } from 'react-router-dom';
import './../../../../assets/css/global-style.css';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { message } from 'antd';
import { AuthContext } from 'context/AuthContext';

const TeacherRegister = ({ intl }, values) => {
  const { provinces, districts } = useContext(AuthContext);
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
  const [initialcoverNumber, setInitialcoverNumber] = useState('');
  const [initialStatus, setinitialStatus] = useState([]);
  const [initialGrade, setInitialGrade] = useState([]);
  const [initialStep, setInitialStep] = useState([]);
  const [initialCurrentProvince, setInitialCurrentProvince] = useState([]);
  const [initialCurrentDistrict, setInitialCurrentDistrict] = useState([]);
  const [initialCurrentVillage, setInitialCurrentVillage] = useState('');
  const [initialMainProvince, setInitialMainProvince] = useState([]);
  const [initialMainDistrict, setInitialMainDistrict] = useState([]);
  const [initialMainVillage, setInitialMainVillage] = useState('');

  const forms = [createRef(null), createRef(null), createRef(null)];
  const { teacherId } = useParams();

  if (teacherId) {
    useEffect(() => {
      async function fetchTeacher() {
        const { data } = await callApi(`teachers/${teacherId}`, '', null);
        console.log('DATA in teacher UPDATE:', data);
        setInitialName(data.name);
        setInitialFatherName(data.father_name);
        setInitialGrandFatherName(data.grand_father_name);
        setInitialregistrationNumber(data.sukuk_number);
        setInitialLastName(data.last_name);
        setInitialEnglishName(data.english_name);
        setInitialEnglishLastName(data.english_last_name);
        setInitialEnglishFatherName(data.english_father_name);
        setInitialGrandFatherName(data.grandfather_name);
        setInitialregistrationNumber(data.registration_number);
        setInitialPlaceOfBirth(data.place_of_birth);
        setInitialPhoneNumber(data.phone_number);
        setInitialpageNumber(data.page_number);
        setInitialEmail(data.email);
        setInitialcoverNumber(data.cover_number);
        setInitialMainVillage(data.main_village);
        setInitialCurrentVillage(data.current_village);

        dateOfBirthOptoions.map((teacherBirth) => {
          if (teacherBirth.value === data.year_of_birth.toString()) {
            setYearOfBirth(teacherBirth);
          }
        });

        gradeOptions.map((teacherGrade) => {
          if (teacherGrade.value === data.grade) {
            setInitialGrade(teacherGrade);
          }
        });
        genderOptions.map((teacherGender) => {
          if (teacherGender.value === data.gender) {
            setInitialGender(teacherGender);
          }
        });

        teacherCurrentStatusOptions.map((teacherStatus) => {
          if (teacherStatus.value == data.status) {
            setinitialStatus(teacherStatus);
          }
        });

        provinces.map((province) => {
          if (province.value == data.current_province) {
            setInitialCurrentProvince(province);
          }
          if (province.value == data.main_province) {
            setInitialMainProvince(province);
          }
        });

        districts.map((district) => {
          if (district.value == data.main_district) {
            setInitialMainDistrict(district);
          }
        });
        districts.map((district) => {
          if (district.value == data.current_district) {
            setInitialCurrentDistrict(district);
          }
        });

        stepOptions.map((teacherStep) => {
          if (teacherStep.value == data.step) {
            setInitialStep(teacherStep);
          }
        });
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

  const RegisterTeacher = async (newFields) => {
    let apiParams = {
      endPoint: 'teachers/',
      method: 'POST',
    };
    if (teacherId) {
      apiParams.endPoint = `teachers/${teacherId}/`;
      apiParams.method = 'PATCH';
    }
    const data = {
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
      last_name: newFields.lastName,
      main_district: newFields.mainDistrict?.value,
      main_province: newFields.mainProvince?.value,
      main_village: newFields.mainVillage,
      tazkira_type: newFields.tazkiraType?.value,
      name: newFields.name,
      page_number: newFields.pageNumber || null,
      phone_number: newFields.phoneNumber || null,
      place_of_birth: newFields.placeOfBirth,
      registration_number: newFields.registrationNumber,
      step: newFields.step?.value,
      year_of_birth: newFields.yearOfBirth?.value,
      status: newFields.status?.value,
    };
    await callApi(apiParams.endPoint, apiParams.method, data)
      .then((response) => {
        message.success('استاد ثبت شو');
        window.location.replace(`/`);
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
                            onChange={(name, value) => {
                              setFieldValue('mainDistrict', '');
                              setFieldValue(name, value);
                            }}
                            onBlur={setFieldTouched}
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
                            onChange={(name, value) => {
                              setFieldValue('currentDistrict', '');
                              setFieldValue(name, value);
                            }}
                            onBlur={setFieldTouched}
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
