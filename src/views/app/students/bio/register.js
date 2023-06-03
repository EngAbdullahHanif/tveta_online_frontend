/* eslint-disable no-param-reassign */
import React, { createRef, useState, Controller, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FormControl, FormLabel } from 'react-bootstrap';
import './../../.././../assets/css/global-style.css';

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Spinner,
  Button,
  InputGroupAddon,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import {
  provinceOptions,
  educationalYearsOptions,
  dateOfBirthOptoions,
  batchOptions,
  genderOptions,
  mediumOfInstructionOptions,
  StdInteranceOptions,
  StudentTypeOptions,
  studyTimeOptions,
  tazkiraOptions,
  educationLevelOptions,
} from '../../global-data/options';
import {
  studentRegisterFormStep_1,
  studentRegisterFormStep_2,
  studentRegisterFormStep_3,
} from '../../global-data/forms-validation';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import { NotificationManager } from 'components/common/react-notifications';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';

import { Colxx } from 'components/common/CustomBootstrap';
import callApi from 'helpers/callApi';
import currentUser from 'helpers/currentUser';

//import { Controller } from 'react';
const servicePath = 'http://localhost:8000';
const studentApi = `${servicePath}/api`;
// http://localhost:8000/api/?student_id=1232

//http://localhost:8000/api/student_create

const studentProvince = [
  {
    value: 1,
    label: 'Nanagarhar',
  },
  {
    value: 2,
    label: 'Kabul',
  },
  ,
  {
    value: 3,
    label: 'kjlkjkjlkj',
  },
];

const StudentRegistration = ({ intl }, values) => {
  const { updateStudentId } = useParams();
  console.log('student_id', updateStudentId);
  if (updateStudentId) {
    useEffect(() => {
      async function fetchStudent() {
        // const { data } = await axios.get(
        //   `api/?student_id=${updateStudentId}`
        // );
        const { data } = await callApi(
          `api/?student_id=${updateStudentId}`,
          '',
          null
        );
        console.log('responsasdfsadfe', data);
        setInitialname1(data[0].name);
        setInitialLastName(data[0].last_name);
        setInitialFatherName(data[0].father_name);
        setInitialGrandFatherName(data[0].grand_father_name);
        setInitialFatherDuty(data[0].fatherـprofession);
        setInitialLastNameEng(data[0].english_last_name);

        const instGender = genderOptions.map((studentGender) => {
          if (studentGender.value === data[0].gender) {
            setInitialGender(studentGender);
          }
        });

        setInitialEnglishName(data[0].english_name);
        setInitialPhoneNo(data[0].phone_number);
        setInitialDoB(data[0].birth_date);
        setInitialFatherDutyLocation(data[0].fatherـplaceـofـduty);
        if (data[0].sukuk_number) setInitialTazkiraType(tazkiraOptions[1]);
        else setInitialTazkiraType(tazkiraOptions[0]);
        setInitialFatherEngName(data[0].english_father_name);
        setInitialPlaceOfBirth(data[0].main_province);
        setInitialTazkiraNo(data[0].sukuk_number);
        setInitialEmail(data[0].email);
        setInitialIdCardPageNo(data[0].page_number);
        setInitialIdCardJoldNo(data[0].cover_number);
        setInitialPreSchool(data[0].school);
        setInitialGraduationYear(data[0].finished_grade_year);
        setInitialLevelOfEducation(educationLevelOptions[0]);

        // const studentFinishGrade = educationLevelOptions.map(
        //   (finishedGrade) => {
        //     if (educationLevelOptions.label === data[0].finished_grade) {
        //       setInitialLevelOfEducation(educationLevelOptions[1]);
        //     }
        //   }
        // );
        const studentMainProvincee = studentProvince.map((studentProvince) => {
          if (studentProvince.label === data[0].main_province) {
            setInitialProvince(studentProvince);
          }
        });

        const studentCurrentProvince = studentProvince.map(
          (studentProvince) => {
            if (studentProvince.label === data[0].current_province) {
              setInitialC_Province(studentProvince);
            }
          }
        );

        const studentSchoolProvince = studentProvince.map((studentProvince) => {
          if (studentProvince.label === data[0].schoolـprovince) {
            setInitialSchoolProvince(studentProvince);
          }
        });

        setInitialDistrict(data[0].main_district);
        setInitialVillage(data[0].main_village);
        setInitialC_District(data[0].current_district);
        setInitialC_Village(data[0].current_village);
        setInitialInstitute(data[0].school);
        setInitialEducationalYear(data[0].finished_grade_year);
        // setInitialKankorId(data[0].kankor_id);
        setInitialStudentId(data[0].student_id);
        setInitialClass(data[0].graduat_12_types);
        setInitialInteranceType(data[0].internse_type);
        setInitialDepartment(data[0].kankor_id);
        setInitialBatch(data[0].kankor_id);
        setInitialMediumOfInstruction(data[0].kankor_id);
        setInitialStudyTime(data[0].kankor_id);
        setInitialStudentType(data[0].student_type);
        setInitialField(data[0].field);
        setInitialSector(data[0].sector);
        setInitialphoto(data[0].photo);
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }
  const [initialname1, setInitialname1] = useState('');
  const [initialLastName, setInitialLastName] = useState('');
  const [initialFatherName, setInitialFatherName] = useState('');
  const [DoB, setDoB] = useState();
  const [initialGrandFatherName, setInitialGrandFatherName] = useState('');
  const [initialFatherDuty, setInitialFatherDuty] = useState('');
  const [initialLastNameEng, setInitialLastNameEng] = useState();
  const [initialGender, setInitialGender] = useState([]);
  const [initialEnglishName, setInitialEnglishName] = useState('');
  const [initialPhoneNo, setInitialPhoneNo] = useState('');
  const [initialDoB, setInitialDoB] = useState([]);
  const [initialFatherDutyLocation, setInitialFatherDutyLocation] =
    useState('');
  const [initialTazkiraType, setInitialTazkiraType] = useState([]);
  const [initialFatherEngName, setInitialFatherEngName] = useState('');
  const [initialPlaceOfBirth, setInitialPlaceOfBirth] = useState('');
  const [initialTazkiraNo, setInitialTazkiraNo] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialIdCardPageNo, setInitialIdCardPageNo] = useState('');
  const [initialIdCardJoldNo, setInitialIdCardJoldNo] = useState('');
  const [initialLevelOfEducation, setInitialLevelOfEducation] = useState([]);
  const [initialPreSchool, setInitialPreSchool] = useState('');
  const [initialGraduationYear, setInitialGraduationYear] = useState([]);
  const [initialSchoolProvince, setInitialSchoolProvince] = useState([]);
  const [initialProvince, setInitialProvince] = useState([]);
  const [initialC_Province, setInitialC_Province] = useState([]);
  const [initialDistrict, setInitialDistrict] = useState();
  const [initialVillage, setInitialVillage] = useState();
  const [initialC_District, setInitialC_District] = useState('');
  const [initialC_Village, setInitialC_Village] = useState('');
  const [initialInstitute, setInitialInstitute] = useState([]);
  const [initialClass, setInitialClass] = useState([]);
  const [initialEducationalYear, setInitialEducationalYear] = useState([]);
  // const [initialKankorId, setInitialKankorId] = useState('');
  const [initialStudentId, setInitialStudentId] = useState('');
  const [initialInteranceType, setInitialInteranceType] = useState([]);
  const [initialDepartment, setInitialDepartment] = useState([]);
  const [initialBatch, setInitialBatch] = useState([]);
  const [initialMediumOfInstruction, setInitialMediumOfInstruction] = useState(
    []
  );
  const [initialStudyTime, setInitialStudyTime] = useState([]);
  const [initialStudentType, setInitialStudentType] = useState([]);
  const [initialField, setInitialField] = useState([]);
  const [initialSector, setInitialSector] = useState([]);
  const [initialphoto, setInitialphoto] = useState('');
  const [isNext, setIsNext] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [fieldList, setFieldList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classs, setClasss] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };

  const fetchFields = async () => {
    const response = await callApi('institute/field/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setFieldList(updatedData);
    } else {
      console.log('field error');
    }
  };

  const fetchDepartments = async () => {
    const response = await callApi('institute/department/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(updatedData);
    } else {
      console.log('department error');
    }
  };

  const fetchClasses = async () => {
    const response = await callApi('institute/classs/', 'GET', null);
    console.log('class repspossdfsde', response);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + ' - ' + item.semester + ' - ' + item.section,
      }));
      setClasss(updatedData);
    } else {
      console.log('class error');
    }
  };

  const fetchSectors = async () => {
    const response = await callApi('institute/sectors/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.sector,
      }));
      setSectors(updatedData);
    } else {
      console.log('class error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
    fetchClasses();
    fetchSectors();
  }, []);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'شاگرد په بریالیتوب ثبت شو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'شاگرد ثبت نشو، بیا کوشش وکری',
          'خطا',
          9000,
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

  // post student record to server
  const postStudentRecord = async (data) => {
    const response = await callApi('api/student_create', 'POST', data);
    console.log('response of call api', response);
    if (response) {
      createNotification('success', 'filled');
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    name1: initialname1,
    fatherName: initialFatherName,
    lastName: initialLastName,
    lastNameEng: initialLastNameEng,
    fatherDuty: initialFatherDuty,
    englishName: initialEnglishName,
    fatherEngName: initialFatherEngName,
    grandFatherName: initialGrandFatherName,
    fatherDutyLocation: initialFatherDutyLocation,
    placeOfBirth: initialPlaceOfBirth,
    DoB: initialDoB,
    gender: initialGender,
    tazkiraNo: initialTazkiraNo,
    phoneNo: initialPhoneNo,
    email: initialEmail,
    idCardPageNo: initialIdCardPageNo,
    idCardJoldNo: initialIdCardJoldNo,
    tazkiraType: initialTazkiraType,
    levelOfEducation: initialLevelOfEducation,
    preSchool: initialPreSchool,
    graduationYear: initialGraduationYear,
    schoolProvince: initialSchoolProvince,
    province: initialProvince,
    C_Province: initialC_Province,
    C_District: initialC_District,
    district: initialDistrict,
    village: initialVillage,
    C_Village: initialC_Village,
    institute: initialInstitute,
    class: initialClass,
    educationalYear: initialEducationalYear,
    department: initialDepartment,
    mediumOfInstruction: initialMediumOfInstruction,
    // kankorId: initialKankorId,
    studentId: initialStudentId,
    studyTime: initialStudyTime,
    interanceType: initialInteranceType,
    studentType: initialStudentType,
    batch: initialBatch,
    field: initialField,
    sector: initialSector,
    file: initialphoto,
  });

  const onClickNext = (goToNext, steps, step, values) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    form.submitForm().then(() => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...fields, ...form.values };
        setFields(newFields);
        if (steps.length - 2 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
          setLoading(true);

          const formData = { ...newFields };
          console.log('FormData', formData);
          const imageData = new FormData();
          imageData.append('file', formData.image);

          const data = {
            //personal info,
            name: formData.name1,
            student_id: formData.studentId,
            kankor_id: formData.kankorId,
            finished_grade_year: formData.graduationYear.label,
            school: formData.preSchool,
            schoolـprovince: formData.schoolProvince.value,
            finished_grade: formData.levelOfEducation.value,
            student_type: formData.studentType.value,
            english_name: formData.englishName,
            last_name: formData.lastName,
            english_last_name: formData.lastNameEng,
            father_name: formData.fatherName,
            english_father_name: formData.fatherEngName,
            phone_number: formData.phoneNo,
            email: formData.email,
            grand_father_name: formData.grandFatherName,
            cover_number: formData.idCardJoldNo,
            page_number: formData.idCardPageNo,
            registration_number: formData.tazkiraNo,
            // sukuk_number: formData.tazkiraNo,
            main_province: formData.province.value,
            main_district: formData.district,
            main_village: formData.village,
            current_province: formData.C_Province.value,
            current_district: formData.C_District,
            current_village: formData.C_Village,
            birth_date: formData.DoB.label,
            fatherـprofession: formData.fatherDuty,
            fatherـplaceـofـduty: formData.fatherDutyLocation,
            internse_type: formData.interanceType.value,
            students_status: '2',
            gender: formData.gender.value,
            institute: formData.institute.value,
            educational_year: formData.educationalYear.label,
            type: '1',
            language: formData.mediumOfInstruction.value,
            time: formData.studyTime.value,

            // fields info
            department_id: formData.department.value,
            field: formData.field.value,

            // sector:
            sector: formData.sector.value,
            batch: formData.batch.value,

            // class info,
            class_id: formData.class.value,
            place_of_birth: formData.placeOfBirth,

            // student_photo: imageData.file,
          };

          const formData2 = new FormData();
          for (let key in data) {
            formData2.append(key, data[key]);
          }
          //if image is selected
          if (formData.image) {
            formData2.append('student_photo', formData.image);
          } else {
            formData2.append('student_photo', '');
          }

          console.log('the form data is converted to object', data);

          // posting data to the server
          postStudentRecord(formData2);

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
      <div className="mt-4 ml-5">
        <h2 className="mt-5 m-5 titleStyle">
          {<IntlMessages id="forms.studentRegisterTitle" />}
        </h2>
      </div>
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
                  enableReinitialize={true}
                  initialValues={{
                    name1: fields.name1,
                    fatherName: fields.fatherName,
                    lastName: fields.lastName,
                    lastNameEng: fields.lastNameEng,
                    fatherDuty: fields.fatherDuty,
                    englishName: fields.englishName,
                    fatherEngName: fields.fatherEngName,
                    grandFatherName: fields.grandFatherName,
                    fatherDutyLocation: fields.fatherDutyLocation,
                    placeOfBirth: fields.placeOfBirth,
                    DoB: fields.DoB,
                    gender: fields.gender,
                    tazkiraNo: fields.tazkiraNo,
                    phoneNo: fields.phoneNo,
                    email: fields.email,
                    idCardPageNo: fields.idCardPageNo,
                    idCardJoldNo: fields.idCardJoldNo,
                    tazkiraType: fields.tazkiraType,
                  }}
                  validateOnMount
                  validationSchema={studentRegisterFormStep_1}
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
                    <Form
                      className="av-tooltip tooltip-label-right has-float-label error-l-100 style "
                      style={{ paddingInline: '3%' }}
                    >
                      <Row>
                        <Colxx xxs="6">
                          <div className="p-3">
                            {/* Name */}
                            <FormGroup className="form-group has-float-label error-l-100 ">
                              <Label>
                                <IntlMessages id="forms.StdName" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="name1"
                                // style={{ fontSize: '100%' }}
                              />
                              {errors.name1 && touched.name1 ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.name1}
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
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdFatherName" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="fatherName"
                              />
                              {errors.fatherName && touched.fatherName ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.fatherName}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Father Duty */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdFatherDutyLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="fatherDuty"
                              />
                              {errors.fatherDuty && touched.fatherDuty ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.fatherDuty}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Father duty place */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="fatherDutyLocation"
                              />
                              {errors.fatherDutyLocation &&
                              touched.fatherDutyLocation ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.fatherDutyLocation}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* grandFatherName */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.grandFatherName" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="grandFatherName"
                              />
                              {errors.grandFatherName &&
                              touched.grandFatherName ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.grandFatherName}
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

                            {values.tazkiraType.value === 'Paper' ? (
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
                                    {errors.idCardJoldNo &&
                                    touched.idCardJoldNo ? (
                                      <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                        {errors.idCardJoldNo}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}

                            {values.tazkiraType.value === 'Paper' ? (
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
                                    {errors.idCardPageNo &&
                                    touched.idCardPageNo ? (
                                      <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                        {errors.idCardPageNo}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}

                            {/* Tazkira Number */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="teacher.TazkiraNoLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="tazkiraNo"
                                type="number"
                              />
                              {errors.tazkiraNo && touched.tazkiraNo ? (
                                <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                                  {errors.tazkiraNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </Colxx>
                        <Colxx xxs="6">
                          <div className="p-3">
                            {/* Student English Name */}
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
                                name="lastNameEng"
                              />
                              {errors.lastNameEng && touched.lastNameEng ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.lastNameEng}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/*Students Father English Name */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.Std_father_Eng_Name" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="fatherEngName"
                              />
                              {errors.fatherEngName && touched.fatherEngName ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.fatherEngName}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Date of Birth */}
                            <FormGroup className="form-group has-float-label error-l-100 ">
                              <Label>
                                <IntlMessages id="teacher.DoBLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="DoB"
                                id="DoB"
                                value={values.DoB}
                                options={dateOfBirthOptoions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.DoB && touched.DoB ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.DoB}
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

                            {/* Gender */}
                            <FormGroup className="form-group has-float-label error-l-100">
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
                              {errors.gender && touched.gender ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.gender}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Email Address */}
                            <FormGroup className="form-group has-float-label error-l-100">
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

                            {/* Contact No */}
                            <FormGroup className="form-group has-float-label error-l-100 ">
                              <Label>
                                <IntlMessages id="teacher.PhoneNoLabel" />
                                {/* <span style={{ color: 'red' }}>*</span> */}
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="phoneNo"
                                type="text"
                              />
                              {errors.phoneNo && touched.phoneNo ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.phoneNo}
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
                    levelOfEducation: fields.levelOfEducation,
                    preSchool: fields.preSchool,
                    graduationYear: fields.graduationYear,
                    schoolProvince: fields.schoolProvince,
                    province: fields.province,
                    C_Province: fields.C_Province,
                    C_District: fields.C_District,
                    district: fields.district,
                    village: fields.village,
                    C_Village: fields.C_Village,
                  }}
                  onSubmit={() => {}}
                  validationSchema={studentRegisterFormStep_2}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right style">
                      <>
                        {/* Address */}
                        <Row style={{ marginInline: '2%' }}>
                          <Colxx xxs="6">
                            <div className="square  p-3">
                              <h6 className=" mb-4">
                                {
                                  <IntlMessages id="forms.PermanentAddressLabel" />
                                }
                              </h6>

                              {/* province permanent*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.ProvinceLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <FormikReactSelect
                                  name="province"
                                  id="province"
                                  value={values.province}
                                  options={provinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.province && touched.province ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District  permanent*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="district"
                                />
                                {errors.district && touched.district ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.district}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village permanent */}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="village"
                                />
                                {errors.village && touched.village ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
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
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.ProvinceLabel" />
                                  <span style={{ color: 'red' }}>*</span>
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
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.C_Province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District */}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="C_District"
                                />
                                {errors.C_District && touched.C_District ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.C_District}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village */}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="C_Village"
                                />
                                {errors.C_Village && touched.C_Village ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.C_Village}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>

                        <Row style={{ marginInline: '2%' }}>
                          <Colxx xxs="6" className="pt-3">
                            <div className="square p-3 ">
                              <FormGroup className="form-group has-float-label error-l-100 ">
                                <Label>
                                  <IntlMessages id="forms.StdGraduationYearLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <FormikReactSelect
                                  name="graduationYear"
                                  id="graduationYear"
                                  value={values.graduationYear}
                                  options={educationalYearsOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.graduationYear &&
                                touched.graduationYear ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.graduationYear}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/*School province*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.StdSchoolProvinceLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <FormikReactSelect
                                  name="schoolProvince"
                                  id="schoolProvince"
                                  value={values.schoolProvince}
                                  options={provinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.schoolProvince &&
                                touched.schoolProvince ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.schoolProvince}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>{' '}
                          <Colxx xxs="6" className="pt-3">
                            <div className="p-3">
                              {/* Education */}
                              <FormGroup className="form-group has-float-label error-l-100 ">
                                <Label>
                                  <IntlMessages id="teacher.LevelOfEducationLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <FormikReactSelect
                                  name="levelOfEducation"
                                  id="levelOfEducation"
                                  value={values.levelOfEducation}
                                  options={educationLevelOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.levelOfEducation &&
                                touched.levelOfEducation ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.levelOfEducation}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* Student Maktab*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.StPreShcoolLabel" />
                                  <span style={{ color: 'red' }}>*</span>
                                </Label>
                                <Field
                                  className="form-control fieldStyle"
                                  name="preSchool"
                                />
                                {errors.preSchool && touched.preSchool ? (
                                  <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                    {errors.preSchool}
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
              <div className="wizard-basic-step">
                <Formik
                  innerRef={forms[2]}
                  initialValues={{
                    institute: fields.institute,
                    class: fields.class,
                    educationalYear: fields.educationalYear,
                    department: fields.department,
                    mediumOfInstruction: fields.mediumOfInstruction,
                    // kankorId: initialKankorId,
                    studentId: fields.studentId,
                    studyTime: fields.studyTime,
                    interanceType: fields.interanceType,
                    studentType: fields.studentType,
                    batch: fields.batch,
                    field: fields.field,
                    sector: fields.sector,
                    file: fields.file,
                  }}
                  onSubmit={() => {}}
                  validationSchema={studentRegisterFormStep_3}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right error-l-100 style">
                      <>
                        <Row style={{ marginInline: '2%' }}>
                          {' '}
                          <Colxx xxs="6">
                            {/* Institute Name*/}
                            <FormGroup className=" has-float-label ">
                              <Label className="fieldStule11">
                                <IntlMessages id="forms.InstituteLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="institute"
                                id="institute"
                                value={values.institute}
                                options={institutes}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.institute && touched.institute ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.institute}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/*  Class name  */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="marks.ClassLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="class"
                                id="class"
                                value={values.class}
                                options={classs}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.class && touched.class ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.class}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Student Id */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="student.studentId" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="studentId"
                              />
                              {errors.studentId && touched.studentId ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.studentId}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Eduactional Year*/}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="curriculum.eduactionalYearLabel" />
                              </Label>
                              <FormikReactSelect
                                name="educationalYear"
                                id="educationalYear"
                                value={values.educationalYear}
                                options={educationalYearsOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.educationalYear &&
                              touched.educationalYear ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.educationalYear}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Sector */}
                            <FormGroup className="form-group has-float-label ">
                              <span style={{ color: 'red' }}>*</span>
                              <Label>
                                <IntlMessages id="forms.sector" />
                              </Label>
                              <FormikReactSelect
                                name="sector"
                                id="sector"
                                value={values.sector}
                                options={sectors}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.sector && touched.sector ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.sector}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* kankor Id */}
                            {/* <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.kankorId" />
                              </Label>
                              <Field className="form-control" name="kankorId" />
                              {errors.kankorId && touched.kankorId ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.kankorId}
                                </div>
                              ) : null}
                            </FormGroup> */}

                            {/* internse type*/}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdInteranceTypeLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="interanceType"
                                id="interanceType"
                                value={values.interanceType}
                                options={StdInteranceOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.interanceType && touched.interanceType ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.interanceType}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Upload Photo */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <InputGroupAddon addonType="prepend">
                                <IntlMessages id="student.uploadPhoto" />
                                <span style={{ color: 'red' }}>*</span>
                              </InputGroupAddon>
                              <FormControl
                                name="file"
                                type="file"
                                className="form-control fieldStyle"
                                onChange={(event) => {
                                  setFieldValue(
                                    'file',
                                    event.currentTarget.files[0]
                                  );
                                }}
                              />
                              {errors.file && touched.file ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.file}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="6">
                            {/* Departement  */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.studyDepartment" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="department"
                                id="department"
                                value={values.department}
                                options={departments}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.department && touched.department ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.department}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* field  */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="dash.field-1" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="field"
                                id="field"
                                value={values.field}
                                options={fieldList}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.field && touched.field ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.field}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Batch */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.batch" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="batch"
                                id="batch"
                                value={values.batch}
                                options={batchOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.batch && touched.batch ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.batch}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* medium OfInstruction (Teaching Language) */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
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
                              <Label>
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
                              />
                              {errors.studyTime && touched.studyTime ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.studyTime}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/*Student Type*/}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StudentTypeLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="studentType"
                                id="studentType"
                                value={values.studentType}
                                options={StudentTypeOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.studentType && touched.studentType ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.studentType}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                        </Row>
                      </>
                    </Form>
                  )}
                </Formik>
              </div>
            </Step>
            <Step id="step4" hideTopNav>
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
                    <NavLink
                      to={{
                        pathname: '/app/students/register-1',
                        state: { data: 'STUDENT' },
                      }}
                    >
                      <Button className="mt-5 bg-primary">
                        <IntlMessages id="button.back" />
                      </Button>
                    </NavLink>
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
export default injectIntl(StudentRegistration);
