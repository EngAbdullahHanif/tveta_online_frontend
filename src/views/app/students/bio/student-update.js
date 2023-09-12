/* eslint-disable no-param-reassign */
import React, { createRef, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import {
  genderOptions,
  tazkiraOptions,
  StdInteranceOptions,
  mediumOfInstructionOptions,
  studyTimeOptions,
  persianMonthOptions,
  StudentEnrollmentTypeOptions,
} from '../../global-data/options';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { inputLabel } from 'config/styling';

import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';

import './../../../../assets/css/global-style.css';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import { message } from 'antd';
import { AuthContext } from 'context/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  MyLabel,
  RequiredHash,
} from 'components/form_components/form_components';
import { studentRegisterFormStep_1 } from 'views/app/global-data/forms-validation';

const StudentUpdate = ({ intl }, values) => {
  const {
    contextFields,
    provinces,
    districts,
    departments,
    institutes,
    classes: classs,
  } = useContext(AuthContext);
  const [filterDepartmentClasses, setFilterDepartmentClasses] =
    useState(departments);
  const [mainDistricts, setMainDistricts] = useState(districts);
  const [currentDistricts, setCurrentDistricts] = useState([]);
  const [selectedMainProvince, setSelectedMainProvince] = useState('');
  const [selectedCurrentProvince, setSelectedCurrentProvince] = useState('');
  const [student, setStudent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [instituteDeps, setInstituteDeps] = useState([]);
  const [instDepartmentOptions, setInstDepartmentOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);

  // fetch department based on selected institute

  const fetchInstDepts = (inst, selectedDepartment) => {
    const instId = inst.value;
    if (!instId) return;

    callApi(`institute/${instId}/departments/`).then((inst) => {
      console.log('Institutes Departments: ', inst.data);
      setInstituteDeps(inst.data);
      const newOptions = departments.filter((dep) => {
        // if department id is in data.department
        let department_ids = inst.data.reduce(
          (acc, cur, i) => acc.add(cur.department),
          new Set(),
        );
        console.log(department_ids);
        return department_ids.has(dep.value);
      });
      setInstDepartmentOptions(newOptions);
      const class_ids = inst.data
        .find((d) => d.id === selectedDepartment)
        ?.classes.map((c) => c.classs);
      console.log('class_ids', class_ids);
      setClassOptions(classs.filter((c) => class_ids.includes(c.value)));
    });
  };

  async function fetchStudent() {
    try {
      setIsLoading(true);
      const { data } = await callApi(`students/${studentId}/`, '', null);
      console.log('already existing data:', data);
      setStudent(data);
      await fetchStudentEnrollment();
    } catch (error) {
      console.log('Error in fetching student: ', error);
    } finally {
      setIsLoading(true);
    }
  }

  async function fetchStudentEnrollment() {
    const { data } = await callApi(
      `students/${studentId}/institute/`,
      '',
      null,
    );
    console.log('STD ENRRRRRRRRRRRRRRRRRRRRRR', data);
    setStudentEnrollmentData(data);
    fetchInstDepts({ value: data.institute }, data?.department);
  }

  const { studentId } = useParams();
  useEffect(() => {
    if (studentId) {
      setIsLoading(true);
      fetchStudent();
      setIsLoading(false);
    }
  }, [studentId]);

  const updateStudent = (newFields) => {
    // alert('Form Submitted');
    console.log('Form Data: ', newFields);
    setIsLoading(true);
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
      cover_number: newFields.idCardJoldNo,
      page_number: newFields.idCardPageNo,
      sabt_number: newFields.sabtNo,
      phone_number: newFields.phoneNumber,
      place_of_birth: newFields.placeOfBirth,
      registration_number: newFields.registrationNumber,
      year_of_birth: newFields.yearOfBirth?.value,
      // status: newFields.status?.value,
      admission_method: newFields.admission_method?.value,
    };
    callApi(`students/${studentId}/`, 'PATCH', data)
      .then((response) => {
        if (response.data) {
          message.success('شاګرد آپډیټ شو');
          history.push(`/app/students/student/${studentId}`);
        }
      })
      .catch((err) => console.log('Error in Teacher Save: ', err))
      .finally(() => setIsLoading(false));
  };

  const updateStudentEnrollment = async (newFields) => {
    // alert('Form Submitted');
    console.log('Form Data: ', newFields);
    setIsLoading(true);
    const data = {
      maktob_date: newFields?.maktoobDate
        ? newFields?.maktoobDate
            .convert(gregorian, gregorian_en)
            .format('YYYY-MM-DD')
        : null,
      roll_number: newFields?.rollNumber,
      maktob_number: newFields?.maktoobNumber || null,
      institute: newFields.institute?.value,
      department: newFields.department?.value,
      student_type: newFields.enrollment_type?.value,
      classs: newFields.class?.value,
      educational_year: newFields.educationalYear,
      study_time: newFields.studyTime?.value,
    };
    await callApi(`students/${studentId}/institute/`, 'PATCH', data)
      .then((response) => {
        if (response.data) {
          message.success('شاګرد آپډیټ شو');
          history.push(`/app/students/student/${studentId}`);
        }
      })
      .catch((err) => console.log('Error in Teacher Save: ', err))
      .finally(() => setIsLoading(false));
  };

  const initValues = {
    maktoobDate: studentEnrollmentData?.maktoobDate || null,
    maktoobNumber: studentEnrollmentData?.maktoobNumber || '',
    institute:
      institutes.find((op) => op.value === studentEnrollmentData?.institute) ||
      '',
    department:
      departments.find(
        (op) => op.value === studentEnrollmentData?.department,
      ) || '',
    name: student?.name,
    englishName: student?.english_name,
    lastName: student?.last_name,
    englishLastName: student?.english_last_name,
    fatherName: student?.father_name,
    englishFatherName: student?.english_father_name,
    grandFatherName: student?.grandfather_name,
    yearOfBirth: student?.year_of_birth,
    placeOfBirth: student?.place_of_birth,
    phoneNumber: student?.phone_number,

    registrationNumber: student?.registration_number,
    pageNumber: student?.page_number,
    coverNumber: student?.cover_number,
    gender: genderOptions.find((gen) => gen.value === student?.gender),
    tazkiraType: tazkiraOptions.find(
      (option) => option.value == student?.tazkira_type,
    ),
    idCardJoldNo: student?.cover_number,
    idCardPageNo: student?.page_number,

    currentDistrict: districts.find(
      (district) => district.value == student?.current_district,
    ),
    currentProvince: provinces.find(
      (province) => province.value == student?.current_province,
    ),
    mainProvince: provinces.find(
      (province) => province.value == student?.main_province,
    ),
    mainDistrict: districts.find(
      (district) => district.value == student?.main_district,
    ),
    currentVillage: student?.current_village,
    mainVillage: student?.main_village,
    // status: studentStatusOptions.find(
    //   (status) => status.value == student?.status
    // ),

    admission_method: StdInteranceOptions.find(
      (type) => type.value == student?.admission_method,
    ),
  };
  const initValues2 = {
    // if maktob_date is empty, keep it null
    maktoobDate: studentEnrollmentData?.maktob_date
      ? new DateObject(studentEnrollmentData?.maktob_date).convert(
          persian,
          persian_fa,
        )
      : null,
    maktoobNumber: studentEnrollmentData?.maktob_number || '',
    institute:
      institutes.find((op) => op.value === studentEnrollmentData?.institute) ||
      [],
    department:
      departments.find(
        (op) => op.value === studentEnrollmentData?.department,
      ) || [],
    studentType:
      StudentEnrollmentTypeOptions.find(
        (op) => op.value === studentEnrollmentData.enrollment_type,
      ) || [],
    class: classs.find((op) => op.value === studentEnrollmentData.classs),
    educationalYear: studentEnrollmentData.educational_year,
    studyTime: studyTimeOptions.find(
      (op) => op.value === studentEnrollmentData.shift,
    ),
    rollNumber: studentEnrollmentData.roll_number,
  };
  //   console.log('Student: ', student);
  console.log('Student Init Values: ', studyTimeOptions);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <Card>
      <div className="mt-4 ml-5">
        <h2 className="mt-5 m-5 titleStyle">د زده کوونکي آپډټ/ آپدیت شاگرد</h2>
      </div>
      <CardBody className="wizard wizard-default">
        <div className="wizard-basic-step">
          {console.log('Student: ', student)}
          <Formik
            enableReinitialize={true}
            innerRef={forms[0]}
            initialValues={initValues}
            // validateOnMount
            validationSchema={studentRegisterFormStep_1}
            onSubmit={updateStudent}
          >
            {({
              errors,
              touched,
              values,
              setFieldTouched,
              setFieldValue,
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

                    {/* Tazkira Number */}
                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        نمبر تذکره الکترونی/صکوک نمبر
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

                    {values?.tazkiraType?.value === 'paper' ? (
                      <>
                        <div>
                          {/* Jold Number */}
                          <div>
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="teacher.IdCardJoldNoLabel" />
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="idCardJoldNo"
                                type="string"
                              />
                              {errors.idCardJoldNo && touched.idCardJoldNo ? (
                                <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                  {errors.idCardJoldNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>

                        <div>
                          {/* Safha */}
                          <div>
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="teacher.IdCardPageNoLabel" />
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="idCardPageNo"
                                type="number"
                              />
                              {errors.idCardPageNo && touched.idCardPageNo ? (
                                <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                  {errors.idCardPageNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <FormGroup className="form-group has-float-label error-l-100 ">
                      <Label>
                        <IntlMessages id="teacher.DoBLabel" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="yearOfBirth"
                        id="yearOfBirth"
                        required
                      />
                      {errors.yearOfBirth && touched.yearOfBirth ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.yearOfBirth}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* <FormGroup className="form-group has-float-label error-l-175">
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
                    </FormGroup> */}
                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="forms.StdInteranceTypeLabel" />
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
                          onChange={(name, value) => {
                            setFieldValue(name, value);
                            setFieldValue('mainDistrict', null);
                          }}
                          onBlur={setFieldTouched}
                          onClick={setSelectedMainProvince(
                            values.mainProvince?.value,
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
                          options={mainDistricts}
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
                            setFieldValue(name, value);
                            setFieldValue('currentDistrict', null);
                          }}
                          onBlur={setFieldTouched}
                          onClick={setSelectedCurrentProvince(
                            values?.currentProvince?.value,
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
                          options={currentDistricts}
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

                <Button className="mt-5 bg-primary" onClick={handleSubmit}>
                  آپدیت معلومات شاګرد
                </Button>
              </Form>
            )}
          </Formik>

          <Formik
            enableReinitialize={true}
            innerRef={forms[1]}
            initialValues={initValues2}
            // validateOnMount
            onSubmit={updateStudentEnrollment}
          >
            {({
              errors,
              touched,
              values,
              setFieldTouched,
              setFieldValue,
              handleSubmit,
            }) => (
              <Form className="av-tooltip tooltip-label-right style">
                <Row className="justify-content-center">
                  <Colxx xxs="5">
                    <div className="pt-5">
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
                          نمبر اساس
                          <RequiredHash />
                        </Label>

                        <Field
                          className="form-control fieldStyle"
                          name="rollNumber"
                          type="number"
                        />
                        {errors.rollNumber && touched.rollNumber ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.rollNumber}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label ">
                        <MyLabel>مکتوب تاریخ</MyLabel>
                        <DatePicker
                          style={{
                            width: '100%',
                            height: 40,
                            borderRadius: 0,
                            border: 'none',
                          }}
                          containerClassName="form-control fieldStyle"
                          name="maktoobDate"
                          value={values.maktoobDate}
                          calendar={persian}
                          locale={persian_fa}
                          months={persianMonthOptions}
                          format="YYYY-MM-DD"
                          onChange={(date) => {
                            setFieldValue(
                              'maktoobDate',
                              date?.isValid ? date : '',
                            );
                          }}
                        />
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>مکتوب نمبر</Label>
                        <Field
                          className="form-control fieldStyle"
                          name="maktoobNumber"
                          type="number"
                        />
                        {errors.maktoobNumber && touched.maktoobNumber ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.maktoobNumber}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Institute Name*/}
                      <FormGroup className=" has-float-label ">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.InstituteLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="institute"
                          id="institute"
                          value={values.institute}
                          options={institutes}
                          onChange={(name, value) => {
                            setFieldValue('institute', value);
                            fetchInstDepts(value);
                          }}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                        />
                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.institute}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Departement  */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.studyDepartment" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="department"
                          id="department"
                          value={values.department}
                          options={instDepartmentOptions}
                          onChange={(name, value) => {
                            setFieldValue(name, value);
                            setFieldValue('class', []);
                            console.log('selected department: ', value.value);
                            console.log('institute deps: ', instituteDeps);
                            const dep = instituteDeps?.find(
                              (d) => d.department === value.value,
                            );
                            console.log('departments: ', departments);
                            const class_ids = dep?.classes.map((c) => c.classs);
                            if (class_ids) {
                              setClassOptions(
                                classs.filter((c) =>
                                  class_ids.includes(c.value),
                                ),
                              );
                            }
                            console.log('class_ids', class_ids);
                          }}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                          required
                        />
                        {errors.department && touched.department ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/*  Class name  */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
                          <IntlMessages id="curriculum.admissionGrade" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="class"
                          id="class"
                          value={values.class}
                          options={classOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                          required
                        />
                        {errors.class && touched.class ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.class}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>
                  </Colxx>
                  <Colxx xxs="5">
                    <div className="pt-5">
                      {/*Student Type*/}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.EnrollmentType" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="studentType"
                          id="studentType"
                          value={values.studentType}
                          options={StudentEnrollmentTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                        />
                        {errors.studentType && touched.studentType ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studentType}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Eduactional Year*/}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
                          <IntlMessages id="curriculum.admissionYear" />
                          <RequiredHash />
                        </Label>

                        <Field
                          className="form-control fieldStyle"
                          name="educationalYear"
                          type="number"
                        />
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.educationalYear}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* admission method*/}

                      {/* medium OfInstruction (Teaching Language) */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.mediumOfInstruction" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="mediumOfInstruction"
                          id="mediumOfInstruction"
                          value={values.mediumOfInstruction}
                          options={mediumOfInstructionOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                          required
                        />
                        {errors.mediumOfInstruction &&
                        touched.mediumOfInstruction ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.mediumOfInstruction}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Study Time */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.StudyTimeLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="studyTime"
                          id="studyTime"
                          value={values.studyTime}
                          options={studyTimeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                        />
                        {errors.studyTime && touched.studyTime ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studyTime}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>
                  </Colxx>
                </Row>

                <Button className="mt-5 bg-primary" onClick={handleSubmit}>
                  آپدیت معلومات شمولیت
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </CardBody>
    </Card>
  );
};
export default StudentUpdate;
