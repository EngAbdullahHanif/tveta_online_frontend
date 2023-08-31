/* eslint-disable no-param-reassign */
import React, { createRef, useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import { Colxx } from 'components/common/CustomBootstrap';
import { message } from 'antd';
import { AuthContext } from 'context/AuthContext';

const TeacherRegister = ({ intl }, values) => {
  // why used seperate states for each field?
  const { provinces, districts } = useContext(AuthContext);
  const [initialName, setInitialName] = useState('');
  const [initiallast_name, setInitiallast_name] = useState('');
  const [initialenglish_name, setInitialenglish_name] = useState('');
  const [initialenglish_last_name, setInitialenglish_last_name] = useState('');
  const [initialenglish_father_name, setInitialenglish_father_name] =
    useState('');
  const [initialfather_name, setInitialfather_name] = useState('');
  const [initialGender, setInitialGender] = useState([]);
  const [initialGrandfather_name, setInitialGrandfather_name] = useState('');
  const [initialregistration_number, setInitialregistration_number] =
    useState('');
  const [initialphone_number, setInitialphone_number] = useState('');
  const [year_of_birth, setyear_of_birth] = useState([]);
  const [initialplace_of_birth, setInitialplace_of_birth] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialpage_number, setInitialpage_number] = useState('');
  const [initialcover_number, setInitialcover_number] = useState('');
  const [initialStatus, setinitialStatus] = useState([]);
  const [initialGrade, setInitialGrade] = useState([]);
  const [initialStep, setInitialStep] = useState([]);
  const [initialcurrent_province, setInitialcurrent_province] = useState([]);
  const [initialcurrent_district, setInitialcurrent_district] = useState([]);
  const [initialcurrent_village, setInitialcurrent_village] = useState('');
  const [initialmain_province, setInitialmain_province] = useState([]);
  const [initialmain_district, setInitialmain_district] = useState([]);
  const [initialmain_village, setInitialmain_village] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);

  const [initialValues, setinitialValues] = useState({
    name: '',
    english_name: '',
    last_name: '',
    english_last_name: '',
    father_name: '',
    english_father_name: '',
    grandfather_name: '',
    year_of_birth: '',
    month_of_birth: '',
    day_of_birth: '',
    place_of_birth: '',
    phone_number: '',
    email: '',
    gender: [],
    tazkiraNo: '',
    idCardPageNo: '',
    sabtNo: '',
    idCardJoldNo: '',
    tazkiraType: tazkiraOptions[0],
    sokokNo: '',
    grade: [],
    step: [],
    current_district: [],
    current_province: [],
    main_province: [],
    main_district: [],
    current_village: [],
    main_village: [],
    status: [],
  });

  const forms = [createRef(null), createRef(null), createRef(null)];
  const history = useHistory();
  const { teacherId } = useParams();

  // if teacher id is present, then it is an update form
  if (teacherId) {
    useEffect(() => {
      setIsUpdateForm(true);
      async function fetchTeacher() {
        setIsLoading(true);
        const { data } = await callApi(`teachers/${teacherId}`, '', null);
        const initialUpdateValues = data;

        initialUpdateValues.tazkira_type = tazkiraOptions.find(
          (option) => option.value === data.tazkira_type
        );

        dateOfBirthOptoions.map((teacherBirth) => {
          if (teacherBirth.value === data.year_of_birth) {
            initialUpdateValues.year_of_birth = teacherBirth;
          }
        });

        gradeOptions.forEach((teacherGrade) => {
          if (teacherGrade.value === data.grade) {
            initialUpdateValues.grade = teacherGrade;
          }
        });
        genderOptions.forEach((teacherGender) => {
          if (teacherGender.value === data.gender) {
            initialUpdateValues.gender = teacherGender;
          }
        });

        teacherCurrentStatusOptions.forEach((teacherStatus) => {
          if (teacherStatus.value == data.status) {
            initialUpdateValues.status = teacherStatus;
          }
        });

        provinces.forEach((province) => {
          if (province.value == data.current_province) {
            initialUpdateValues.current_province = province;
          }
        });
        provinces.forEach((province) => {
          if (province.value == data.main_province) {
            initialUpdateValues.main_province = province;
          }
        });

        districts.forEach((district) => {
          if (district.value == data.main_district) {
            initialUpdateValues.main_district = district;
          }
        });
        districts.forEach((district) => {
          if (district.value == data.current_district) {
            initialUpdateValues.current_district = district;
          }
        });

        stepOptions.forEach((teacherStep) => {
          if (teacherStep.value == data.step) {
            initialUpdateValues.step = teacherStep;
          }
        });

        setinitialValues(initialUpdateValues);
        setIsLoading(false);
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
    // setIsLoading(true);
    let apiParams = {
      endPoint: 'teachers/',
      method: 'POST',
    };

    if (isUpdateForm && teacherId) {
      apiParams.endPoint = `teachers/${teacherId}/`;
      apiParams.method = 'PATCH';
    }

    let data = {};
    console.log('newFields: ', newFields);
    // if object and not empty, get value,
    for (const key in newFields) {
      if (typeof newFields[key] === 'object' && newFields[key] !== null) {
        data[key] = newFields[key].value;
      } else {
        data[key] = newFields[key];
      }
    }

    data = {
      ...data,
      cover_number: newFields.idCardJoldNo || undefined,
      page_number: newFields.idCardPageNo || undefined,
      sabt_number: newFields.sabtNo || undefined,
      tazkira_type: newFields.tazkiraType.value,
      registration_number: newFields.tazkiraNo || null,
      sokok_number: newFields.sokokNo || undefined,
    };

    // remove all key-value pairs where value is undefined
    if (isUpdateForm && teacherId) {
      Object.keys(data).forEach(
        (key) => data[key] === undefined && delete data[key]
      );
    }

    console.log('teacher data: ', data);
    try {
      const response = await callApi(
        apiParams.endPoint,
        apiParams.method,
        data
      );
      message.success('استاد ثبت شو');
      // nagivate back to teacher profile
      history.push(`/app/teachers/teacher/${response.data.id}`);
    } catch (error) {
      if (error?.response) {
        // set field error which is send from server
        Object.keys(error.response.data).forEach((key) => {
          forms[0].current.setFieldError(key, error.response.data[key]);
        });
      }
      message.error('استاد ثبت نشو/استاد ثبت نشد');
      return true;
    } finally {
      // setIsLoading(false);
      // return false;
    }
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
            disabled={isLoading}
            initialValues={initialValues}
            validateOnMount
            validationSchema={teacherRegisterFormStep_1}
            onSubmit={RegisterTeacher}
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
                        <IntlMessages id="forms.teacherName" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field className="form-control fieldStyle" name="name" />
                      {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.name}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* last_name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.lastName" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="last_name"
                      />
                      {errors.last_name && touched.last_name ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.last_name}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Father Name */}
                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="forms.StdFatherName" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="father_name"
                      />
                      {errors.father_name && touched.father_name ? (
                        <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                          {errors.father_name}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Tazkira Type */}
                    <FormGroup className="form-group has-float-label error-l-100">
                      <Label>
                        <IntlMessages id="forms.TazkiraType" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>

                      <FormikReactSelect
                        name="tazkiraType"
                        id="tazkiraType"
                        value={values.tazkiraType}
                        // defaultValue={}
                        options={tazkiraOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        isSearchable={false}
                      />
                      {errors.tazkiraType && touched.tazkiraType ? (
                        <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                          {errors.tazkiraType}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* Tazkira Number */}
                    {values.tazkiraType?.value === 'electronic' && (
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label>
                          نمبر تذکره الکترونی
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="tazkiraNo"
                          type="text"
                          maxLength="14"
                          minLength="12"
                        />
                        {errors.tazkiraNo && touched.tazkiraNo ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.tazkiraNo}
                          </div>
                        ) : null}
                      </FormGroup>
                    )}

                    {values.tazkiraType?.value === 'paper' ? (
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
                        <div>
                          {/* Sabt */}
                          <div>
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>شماره ثبت</Label>
                              <Field
                                className="form-control fieldStyle"
                                name="sabtNo"
                                type="number"
                              />
                              {errors.sabtNo && touched.sabtNo ? (
                                <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                  {errors.sabtNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                        <div>
                          <div>
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>شماره صکوک</Label>
                              <Field
                                className="form-control fieldStyle"
                                name="sokokNo"
                                type="number"
                              />
                              {errors.sokokNo && touched.sokokNo ? (
                                <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                  {errors.sokokNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <FormGroup className="form-group has-float-label error-l-100 ">
                      <Label>
                        <IntlMessages id="label.yearOfBirth" />

                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="year_of_birth"
                        type="number"
                        min={1300}
                        max={1450}
                      />
                      {errors.year_of_birth && touched.year_of_birth ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.year_of_birth}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label error-l-100 ">
                      <Label>
                        <IntlMessages id="label.monthOfBirth" />
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="month_of_birth"
                        type="number"
                        min={1}
                        max={12}
                        required={false}
                      />
                      {errors.month_of_birth && touched.month_of_birth ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.month_of_birth}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label error-l-100 ">
                      <Label>
                        <IntlMessages id="label.dayOfBirth" />
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="day_of_birth"
                        type="number"
                        min={1}
                        max={31}
                        required={false}
                      />
                      {errors.day_of_birth && touched.day_of_birth ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.day_of_birth}
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
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="english_name"
                      />
                      {errors.english_name && touched.english_name ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.english_name}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* english_last_name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.lastNameEng" />
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="english_last_name"
                      />
                      {errors.english_last_name && touched.english_last_name ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.english_last_name}
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
                        name="english_father_name"
                      />
                      {errors.english_father_name &&
                      touched.english_father_name ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.english_father_name}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* Grand Father Name */}
                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="forms.grandFatherName" />
                        <span style={{ color: 'red' }}>*</span>
                      </Label>
                      <Field
                        className="form-control fieldStyle"
                        name="grandfather_name"
                      />
                      {errors.grandfather_name && touched.grandfather_name ? (
                        <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                          {errors.grandfather_name}
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
                        name="phone_number"
                      />
                      {errors.phone_number && touched.phone_number ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.phone_number}
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
                        name="place_of_birth"
                      />
                      {errors.place_of_birth && touched.place_of_birth ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.place_of_birth}
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
                          name="main_province"
                          id="main_province"
                          value={values.main_province}
                          options={provinces}
                          onChange={(name, value) => {
                            setFieldValue('main_district', '');
                            setFieldValue(name, value);
                          }}
                          onBlur={setFieldTouched}
                        />
                        {errors.main_province && touched.main_province ? (
                          <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                            {errors.main_province}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* District  permanent*/}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          <IntlMessages id="forms.DistrictLabel" />
                        </Label>
                        <FormikReactSelect
                          name="main_district"
                          id="main_district"
                          value={values.main_district}
                          options={districts?.filter(
                            (district) =>
                              district.province === values.main_province.value
                          )}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.main_district && touched.main_district ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.main_district}
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
                          name="main_village"
                        />
                        {errors.english_name && touched.english_name ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.english_name}
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
                          name="current_province"
                          id="current_province"
                          value={values.current_province}
                          options={provinces}
                          onChange={(name, value) => {
                            setFieldValue('current_district', '');
                            setFieldValue(name, value);
                          }}
                          onBlur={setFieldTouched}
                        />
                        {errors.current_province && touched.current_province ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.current_province}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Current District */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          <IntlMessages id="forms.DistrictLabel" />
                        </Label>
                        <FormikReactSelect
                          name="current_district"
                          id="current_district"
                          value={values.current_district}
                          options={districts.filter(
                            (district) =>
                              district.province ===
                              values.current_province.value
                          )}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.current_district && touched.current_district ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.current_district}
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
                          name="current_village"
                        />
                        {errors.english_name && touched.english_name ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.english_name}
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
                    ثبت
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
export default injectIntl(TeacherRegister);
