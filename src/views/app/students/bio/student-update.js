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
  StdInteranceOptions,
  studentStatusOptions,
} from '../../global-data/options';
import { teacherRegisterFormStep_1 } from '../../global-data/forms-validation';
import { NavLink } from 'react-router-dom';
import './../../../../assets/css/global-style.css';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx } from 'components/common/CustomBootstrap';

import config from '../../../../config';
import { message } from 'antd';
import { AuthContext } from 'context/AuthContext';

const StudentUpdate = ({ intl }, values) => {
  const { contextFields, provinces, districts } = useContext(AuthContext);

  const [mainDistricts, setMainDistricts] = useState(districts);
  const [currentDistricts, setCurrentDistricts] = useState([]);
  const [selectedMainProvince, setSelectedMainProvince] = useState('');
  const [selectedCurrentProvince, setSelectedCurrentProvince] = useState('');
  const [student, setStudent] = useState();
  const forms = [createRef(null), createRef(null), createRef(null)];

  const { studentId } = useParams();
  useEffect(() => {
    async function fetchTeacher() {
      const { data } = await callApi(`students/${studentId}/`, '', null);
      console.log('DATA in teacher UPDATE:', data);
      setStudent(data);
    }
    fetchTeacher();
  }, []);

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
    alert('Form Submitted');
    console.log('Form Data: ', newFields);

    const data = {
      cover_number: newFields.coverNumber,
      current_district: newFields.currentDistrict?.value,
      current_province: newFields.currentProvince?.value,
      current_village: newFields.currentVillage,
      english_father_name: newFields.englishFatherName,
      english_last_name: newFields.englishLastName,
      english_name: newFields.englishName,
      father_name: newFields.fatherName,
      gender: newFields.gender?.value,
      grandfather_name: newFields.grandFatherName,
      last_name: newFields.lastName,
      main_district: newFields.mainDistrict?.value,
      main_province: newFields.mainProvince?.value,
      main_village: newFields.mainVillage,
      name: newFields.name,
      page_number: newFields.pageNumber,
      phone_number: newFields.phoneNumber,
      place_of_birth: newFields.placeOfBirth,
      registration_number: newFields.registrationNumber,
      year_of_birth: newFields.yearOfBirth?.value,
      status: newFields.status?.value,
      admission_method: newFields.admission_method?.value,
    };
    await callApi(`students/${studentId}/`, 'PATCH', data)
      .then((response) => {
        if (response.data) {
          message.success('استاد ثبت شو');
          window.history.back();
          console.log('RESPONSE in Student Update: ', response.data);
        }
      })
      .catch((err) => console.log('Error in Teacher Save: ', err));
  };
  const initValues = {
    name: student?.name,
    englishName: student?.english_name,
    lastName: student?.last_name,
    englishLastName: student?.english_last_name,
    fatherName: student?.father_name,
    englishFatherName: student?.english_father_name,
    grandFatherName: student?.grandfather_name,
    yearOfBirth: dateOfBirthOptoions.filter((teacherBirth) => {
      if (teacherBirth.value === student?.year_of_birth.toString()) {
        return teacherBirth;
      }
    }),
    placeOfBirth: student?.place_of_birth,
    registrationNumber: student?.registration_number,
    phoneNumber: student?.phone_number,

    pageNumber: student?.page_number,
    coverNumber: student?.cover_number,
    gender: genderOptions.filter((gendr) => {
      if (gendr.value === student?.gender) {
        return gendr;
      }
    }),
    tazkiraType:
      student?.page_number > 0 ? tazkiraOptions[1] : tazkiraOptions[0],

    currentDistrict: districts.filter((district) => {
      if (district.value == student?.current_district) {
        return district;
      }
    }),
    currentProvince: provinces.filter((province) => {
      if (province.value == student?.current_province) {
        return province;
      }
    }),
    mainProvince: provinces.filter((province) => {
      if (province.value == student?.main_province) {
        return province;
      }
    }),
    mainDistrict: districts.filter((district) => {
      if (district.value == student?.main_district) {
        return district;
      }
    }),
    currentVillage: student?.current_village,
    mainVillage: student?.main_village,
    status: studentStatusOptions.filter((status) => {
      if (status.value == student?.status) {
        return status;
      }
    }),
    admission_method: StdInteranceOptions.map((type) => {
      if (type.value == student?.admission_method) {
        return type;
      }
    }),
  };
  //   console.log('Student: ', student);
  console.log('Student Init Values: ', initValues);

  return (
    <Card>
      <div className="mt-4 ml-5">
        <h2 className="mt-5 m-5 titleStyle">
          {<IntlMessages id="teacher.RegisterTitle" />}
        </h2>
      </div>
      <CardBody className="wizard wizard-default">
        <div className="wizard-basic-step">
          {console.log('Student: ', student)}
          <Formik
            enableReinitialize={true}
            innerRef={forms[0]}
            initialValues={initValues}
            validateOnMount
            // validationSchema={teacherRegisterFormStep_1}
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
            }) => (
              <Form className="av-tooltip tooltip-label-right style">
                <Row className="justify-content-center">
                  <Colxx xxs="5" className="ml-5">
                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="teacher.NameLabel" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field className="form-control fieldStyle" name="name" />
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

                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="teacher.status" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <FormikReactSelect
                        name="status"
                        id="status"
                        value={values.status}
                        options={studentStatusOptions}
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
                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="Admission Method" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <FormikReactSelect
                        name="admission_method"
                        id="admission_method"
                        value={values.admission_method}
                        options={StdInteranceOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.admission_method && touched.admission_method ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.admission_method}
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
                      {errors.englishFatherName && touched.englishFatherName ? (
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
                    {/* <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="teacher.EmailLabel" />
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
                    </FormGroup> */}
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
                            values.mainProvince?.value
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
                          options={districts.filter(
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
                              district.province === values.currentProvince.value
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
            )}
          </Formik>
        </div>
      </CardBody>
    </Card>
  );
};
export default StudentUpdate;
