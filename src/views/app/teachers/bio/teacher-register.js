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
  Spinner,
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
    year_of_birth: [],
    place_of_birth: '',
    registration_number: '',
    phone_number: '',
    email: '',
    page_number: '',
    cover_number: '',
    gender: [],
    tazkira_type: [],
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
    setIsLoading(true);
    let apiParams = {
      endPoint: 'teachers/',
      method: 'POST',
    };

    if (isUpdateForm && teacherId) {
      apiParams.endPoint = `teachers/${teacherId}/`;
      apiParams.method = 'PATCH';
    }

    const data = {};
    console.log('newFields: ', newFields);
    for (const key in newFields) {
      if (typeof newFields[key] === 'object' && newFields[key] !== null) {
        data[key] = newFields[key].value;
      } else {
        data[key] = newFields[key];
      }
    }

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
      history.push(`/app/teachers/teacher/${teacherId}`);
    } catch (error) {
      message.error('استاد ثبت نشو/استاد ثبت نشد');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
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
            // disabled={isLoading}
            initialValues={initialValues}
            validateOnMount
            // validationSchema={teacherRegisterFormStep_1}
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

                      {/* last_name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.last_name" />
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
                          <IntlMessages id="teacher.father_nameLabel" />
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
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.tazkira_type" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>

                        <FormikReactSelect
                          name="tazkira_type"
                          id="tazkira_type"
                          value={values.tazkira_type}
                          options={tazkiraOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.tazkira_type && touched.tazkira_type ? (
                          <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                            {errors.tazkira_type}
                          </div>
                        ) : null}
                      </FormGroup>

                      {values?.tazkira_type?.value === 'paper' ? (
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

                      {/* 
                        Tazkira Number or sabt number: 
                        if tazkira is paper then sabt number is registration number
                      */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="teacher.TazkiraNoLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="registration_number"
                          type="number"
                        />
                        {errors.registration_number &&
                        touched.registration_number ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.registration_number}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label>
                          <IntlMessages id="teacher.DoBLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        {/* <Field
                          className="form-control fieldStyle"
                          type="number"
                          min={1300}
                          max={1400}
                          name="year_of_birth"
                          id="year_of_birth"
                          // value={values.year_of_birth}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        /> */}
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
                          <IntlMessages id="forms.last_nameEng" />
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="english_last_name"
                        />
                        {errors.english_last_name &&
                        touched.english_last_name ? (
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
                          <IntlMessages id="teacher.Grandfather_nameLabel" />
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
                          type="number"
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
                          <IntlMessages id="forms.place_of_birthLabel" />
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
                          {errors.current_province &&
                          touched.current_province ? (
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
                          {errors.current_district &&
                          touched.current_district ? (
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
