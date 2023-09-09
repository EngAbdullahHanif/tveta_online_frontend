import React, { createRef, useState, useContext } from 'react';
// import { NavLink } from 'react-router-dom';
import { FormControl } from 'react-bootstrap';
import './../../.././../assets/css/global-style.css';
import { InputMask } from 'primereact/inputmask';
import {
  fetchDistricts,
  genderOptions,
  mediumOfInstructionOptions,
  StdInteranceOptions,
  StudentTypeOptions,
  studyTimeOptions,
  tazkiraOptions,
  educationLevelOptions,
  disabilityOptions,
} from '../../global-data/options';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  Row,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Label,
  // Spinner,
  Button,
  InputGroupAddon,
} from 'reactstrap';
// import { Wizard, Steps, Step } from 'react-albus';

import {
  studentRegisterFormStep_1,
  // studentRegisterFormStep_2,
  // studentRegisterFormStep_3,
} from '../../global-data/forms-validation';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
// import BottomNavigation from 'components/wizard/BottomNavigation';
import { NotificationManager } from 'components/common/react-notifications';

import { Colxx } from 'components/common/CustomBootstrap';
import callApi from 'helpers/callApi';
import { AuthContext } from 'context/AuthContext';
import { message } from 'antd';
import { inputLabel } from 'config/styling';
import {
  MyErrorLabel,
  MyFormGroup,
  MyLabel,
  RequiredHash,
} from 'components/form_components/form_components';

import { scrollToTop } from 'helpers/Utils';

const StudentRegistration = ({ intl }, values) => {
  const {
    provinces,
    districts,
    institutes,
    classes: classs,
    contextFields: fieldList,
    sectors,
    departments,
  } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState(null);

  const [instituteDeps, setInstituteDeps] = useState([]);
  const history = useHistory();
  // const [fields, setFields] = useState({
  //   name1: '',
  //   fatherName: '',
  //   lastName: '',
  //   lastNameEng: '',
  //   fatherDuty: '',
  //   englishName: '',
  //   fatherEngName: '',
  //   grandFatherName: '',
  //   fatherDutyLocation: '',
  //   placeOfBirth: '',
  //   DoB: '',
  //   monthOfBirth: '',
  //   dayOfBirth: '',
  //   gender: '',
  //   tazkiraNo: '',
  //   phoneNo: '',
  //   email: '',
  //   idCardPageNo: '',
  //   sabtNo: '',
  //   sokokNo: '',
  //   idCardJoldNo: '',
  //   tazkiraType: tazkiraOptions[0],
  //   levelOfEducation: '',
  //   preSchool: '',
  //   graduationYear: '',
  //   schoolProvince: '',
  //   province: '',
  //   C_Province: '',
  //   C_District: '',
  //   district: '',
  //   village: '',
  //   C_Village: '',
  //   institute: '',
  //   class: '',
  //   educationalYear: '',
  //   department: '',
  //   mediumOfInstruction: '',
  //   // kankorId: initialKankorId,
  //   studentId: '',
  //   studyTime: '',
  //   interanceType: '',
  //   studentType: '',
  //   batch: '',
  //   field: '',
  //   sector: '',
  //   file: '',
  // });

  const [mainDistrictOptions, setMainDistrictOptions] = useState([]);
  const [currentDistrictOptions, setCurrentDistrictOptions] = useState([]);

  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [instDepartmentOptions, setInstDepartmentOptions] = useState([]);
  // get data of each step from localstorage
  const formValues = JSON.parse(localStorage.getItem('formData'));
  // used arrays as intial values because other things will throw error
  const [initialValues, setInitialValues] = useState({
    kankorId: formValues?.kankorId || '',
    name1: formValues?.name1 || '',
    englishName: formValues?.englishName || '',
    lastName: formValues?.lastName || '',
    lastNameEng: formValues?.lastNameEng || '',
    fatherName: formValues?.fatherName || '',
    fatherDuty: formValues?.fatherDuty || '',
    fatherEngName: formValues?.fatherEngName || '',
    grandFatherName: formValues?.grandFatherName || '',
    fatherDutyLocation: formValues?.fatherDutyLocation || '',
    DoB: formValues?.DoB || '',
    monthOfBirth: formValues?.monthOfBirth || '',
    dayOfBirth: formValues?.dayOfBirth || '',
    gender:
      genderOptions.find((op) => op.value == formValues?.gender?.value) || [],
    tazkiraNo: formValues?.tazkiraNo || '',
    sokokNo: formValues?.sokokNo || '',
    idCardPageNo: formValues?.idCardPageNo || '',
    idCardJoldNo: formValues?.idCardJoldNo || '',
    sabtNo: formValues?.sabtNo || '',
    tazkiraType:
      tazkiraOptions.find(
        (op) => op.value === formValues?.tazkiraType?.value,
      ) || tazkiraOptions[0],
    phoneNo: formValues?.phoneNo || '',
    email: formValues?.email || '',
    placeOfBirth: formValues?.placeOfBirth || '',

    levelOfEducation:
      educationLevelOptions.find(
        (op) => op.value === formValues?.levelOfEducation?.value,
      ) || [],
    preSchool: formValues?.preSchool || '',
    graduationYear: formValues?.graduationYear || '',
    schoolProvince:
      provinces.find((op) => op.value === formValues?.schoolProvince?.value) ||
      [],
    province:
      provinces.find((op) => op.value === formValues?.province?.value) || [],
    C_Province:
      provinces.find((op) => op.value === formValues?.C_Province?.value) || [],
    C_District:
      districts.find((op) => op.value === formValues?.C_District?.value) || [],
    district:
      districts.find((op) => op.value === formValues?.district?.value) || [],
    village: formValues?.village || '',
    C_Village: formValues?.C_Village || '',

    institute:
      institutes.find((op) => op.value === formValues?.institute?.value) || [],

    class: classs.find((op) => op.value === formValues?.class?.value) || [],

    educationalYear: formValues?.educationalYear || '',
    department:
      departments.find((op) => op.value === formValues?.department?.value) ||
      [],

    mediumOfInstruction:
      mediumOfInstructionOptions.find(
        (op) => op.value === formValues?.mediumOfInstruction?.value,
      ) || [],

    studentId: '',
    studyTime:
      studyTimeOptions.find(
        (op) => op.value === formValues?.studyTime?.value,
      ) || [],

    interanceType:
      StdInteranceOptions.find(
        (op) => op.value === formValues?.interanceType?.value,
      ) || [],

    studentType:
      StudentTypeOptions.find(
        (op) => op.value === formValues?.studentType?.value,
      ) || [],
    // batch: [],
    // field: [],
    sector: sectors.find((op) => op.value === formValues?.sector?.value) || [],
    file: [],
    disability:
      disabilityOptions.find(
        (op) => op.value === formValues?.disability?.value,
      ) || [],
  });

  const fetchInstDepts = (inst) => {
    const instId = inst.value;
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
    });
  };

  const forms = [createRef(null), createRef(null), createRef(null)];

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);
  };

  const handleProvinceChange = async (name, value, setFieldValue) => {
    console.log('name is ', name);
    console.log('value is ', value);
    const districts = await fetchDistricts(value.value);
    console.log('Filtered Districts: ', districts);
    if (name === 'C_Province') {
      setCurrentDistrictOptions(districts);
      setFieldValue('C_District', []);
    } else {
      setMainDistrictOptions(districts);
      setFieldValue('district', []);
    }
  };

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
          cName,
        );
        break;
      case 'error':
        NotificationManager.error(
          'شاگرد ثبت نشو، بیا کوشش وکری',
          'خطا',
          9000,
          () => {
            // alert('callback');
          },
          null,
          cName,
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const storeDataToLocalStorage = (data) => {
    localStorage.setItem('formData', JSON.stringify(data));
  };
  // post student record to server
  const postStudentRecord = async (newFields, { setFieldError }) => {
    // localStorage.setItem('formData', JSON.stringify(newFields));
    const localStorageData = {
      interanceType: newFields.interanceType,
      institute: newFields.institute,
      educationalYear: newFields.educationalYear,
      mediumOfInstruction: newFields.mediumOfInstruction,
      studyTime: newFields.studyTime,
      department: newFields.department,
      class: newFields.class,
      studentType: newFields.studentType,
    };
    console.log('localStorageData', localStorageData);
    storeDataToLocalStorage(localStorageData);
    const data = {
      //personal info,
      name: newFields.name1,
      student_id: newFields.studentId,
      kankor_id: newFields.kankorId,
      previous_grade_year: newFields.graduationYear.label,
      previous_school_name: newFields.preSchool,
      previous_school_province: newFields.schoolProvince.value,
      previous_grade: newFields.levelOfEducation.value,
      student_type: newFields.studentType.value,
      english_name: newFields.englishName,
      last_name: newFields.lastName,
      english_last_name: newFields.lastNameEng,
      father_name: newFields.fatherName,
      english_father_name: newFields.fatherEngName,
      phone_number: newFields.phoneNo,
      email: newFields.email,
      grandfather_name: newFields.grandFatherName,
      cover_number: newFields.idCardJoldNo || null,
      page_number: newFields.idCardPageNo || null,
      sabt_number: newFields.sabtNo || null,
      tazkira_type: newFields.tazkiraType.value,
      registration_number: newFields.tazkiraNo,
      sokok_number: newFields.sokokNo || null,
      main_province: newFields.province.value,
      main_district: newFields.district.value,
      main_village: newFields.village,
      current_province: newFields.C_Province.value,
      current_district: newFields.C_District.value,
      current_village: newFields.C_Village,
      year_of_birth: newFields.DoB,
      month_of_birth: newFields.monthOfBirth || null,
      day_of_birth: newFields.dayOfBirth || null,
      father_profession: newFields.fatherDuty,
      father_place_of_duty: newFields.fatherDutyLocation,
      admission_method: newFields.interanceType.value,
      // students_status: 'active',
      gender: newFields.gender.value,
      institute: newFields.institute.value,
      educational_year: newFields.educationalYear,
      teaching_language: newFields.mediumOfInstruction.value,
      shift: newFields.studyTime.value,

      // fields info
      department: newFields.department.value,
      // field_of_study: newFields.field.value,

      // sector:
      sector: newFields?.sector.value, //not included in form
      // batch: newFields.batch.value, // not included in form

      // class info,
      classs: newFields.class.value,
      place_of_birth: newFields.placeOfBirth,
    };
    setLoading(true);
    try {
      const response = await callApi('students/register/', 'POST', data);
      createNotification('success', 'filled');

      // const stdId = response?.data.id;
      // history.push(`/app/students/student/${stdId}`);
      setIsSuccess(true);
    } catch (error) {
      console.log('error.response', error.response);
      if (error?.response?.data?.errors?.registration_number) {
        setFieldError('tazkiraNo', 'شاگرد به ای تذکره نمبر وجود دارد');
        scrollToTop();
      }
      if (error?.response?.data?.errors?.student_id) {
        setFieldError('studentId', 'شاگرد به ای شماره اساس وجود دارد');
        scrollToTop();
      }
      setIsSuccess(false);
      createNotification('error', 'filled');
    }
    setLoading(false);
    scrollToTop();
  };

  const resetformFields = () => {
    if (localStorage.getItem('formData')) {
      localStorage.removeItem('formData');
      window.location.reload();
    } else message.warning('فورم پاک هست');
  };

  // const handleInitialValues = (steps, step) => {
  //   console.log('steps is ', steps);
  //   const formIndex = steps.indexOf(step);
  //   if (formIndex > 2) return;
  //   const form = forms[formIndex].current;

  //   console.log('step is ', step);
  //   const initialValuesCopy = [
  //     { ...initialValues[0] },
  //     { ...initialValues[1] },
  //     { ...initialValues[2] },
  //   ];
  //   initialValuesCopy[steps.indexOf(step)] = form.values;
  //   setInitialValues(initialValuesCopy);
  // };

  // handle when user clicks on next button
  // const onClickNext = (goToNext, steps, step, values) => {
  //   console.log('inside goToNext function');
  //   // if last step, do nothing
  //   const isLastStep = steps.length - 1 <= steps.indexOf(step);
  //   if (isLastStep) {
  //     console.log('last step, do nothing');
  //     return;
  //   }

  //   const formIndex = steps.indexOf(step);
  //   const form = forms[formIndex].current;
  //   console.log('ref form value: ', form);
  //   console.log('form values of index ${formIndex}: ', form.values);
  //   // submitForm() only triggers formik validation
  //   form.submitForm().then(() => {
  //     if (!form.isDirty && form.isValid) {
  //       // add step's data into fields state
  //       // add fields of this step to the fields state
  //       console.log('form values: ', form.values);
  //       const newFields = { ...fields, ...form.values };
  //       handleInitialValues(steps, step);
  //       setFields(newFields);
  //       // store data in localstorage data loss prevention
  //       localStorage.setItem('step' + formIndex, JSON.stringify(form.values));

  //       // if last step, submit the form
  //       // if next on last step is clicked, call the api to register student
  //       if (steps.length - 2 <= steps.indexOf(step)) {
  //         // setBottomNavHidden(true);
  //         console.log('new fields', newFields);

  //         const data = {
  //           //personal info,
  //           name: newFields.name1,
  //           student_id: newFields.studentId,
  //           kankor_id: newFields.kankorId,
  //           previous_grade_year: newFields.graduationYear.label,
  //           previous_school_name: newFields.preSchool,
  //           previous_school_province: newFields.schoolProvince.value,
  //           previous_grade: newFields.levelOfEducation.value,
  //           student_type: newFields.studentType.value,
  //           english_name: newFields.englishName,
  //           last_name: newFields.lastName,
  //           english_last_name: newFields.lastNameEng,
  //           father_name: newFields.fatherName,
  //           english_father_name: newFields.fatherEngName,
  //           phone_number: newFields.phoneNo,
  //           email: newFields.email,
  //           grandfather_name: newFields.grandFatherName,
  //           cover_number: newFields.idCardJoldNo,
  //           page_number: newFields.idCardPageNo,
  //           sabt_number: newFields.sabtNo,
  //           tazkira_type: newFields.tazkiraType.value,
  //           registration_number: newFields.tazkiraNo,
  //           sokok_number: newFields.sokokNo,
  //           main_province: newFields.province.value,
  //           main_district: newFields.district.value,
  //           main_village: newFields.village,
  //           current_province: newFields.C_Province.value,
  //           current_district: newFields.C_District.value,
  //           current_village: newFields.C_Village,
  //           year_of_birth: newFields.DoB,
  //           month_of_birth: newFields.monthOfBirth,
  //           day_of_birth: newFields.dayOfBirth,
  //           father_profession: newFields.fatherDuty,
  //           father_place_of_duty: newFields.fatherDutyLocation,
  //           admission_method: newFields.interanceType.value,
  //           // students_status: 'active',
  //           gender: newFields.gender.value,
  //           institute: newFields.institute.value,
  //           educational_year: newFields.educationalYear,
  //           teaching_language: newFields.mediumOfInstruction.value,
  //           shift: newFields.studyTime.value,

  //           // fields info
  //           department: newFields.department.value,
  //           field_of_study: newFields.field.value,

  //           // sector:
  //           sector: newFields.sector.value,
  //           batch: newFields.batch.value,

  //           // class info,
  //           classs: newFields.class.value,
  //           place_of_birth: newFields.placeOfBirth,
  //         };

  //         // check if a file is selected
  //         if (selectedFile) {
  //           console.log(selectedFile);
  //           data['photo'] = selectedFile;
  //         }
  //         if (newFields.disability) {
  //           data['disability'] = newFields.disability.value;
  //         }

  //         const formValues2 = new formValues();
  //         for (let key in data) {
  //           // remove undefined values from data that's being sent to the server
  //           if (data[key]) {
  //             formValues2.append(key, data[key]);
  //           }
  //         }

  //         console.log('formValues: ', formValues2.entries());

  //         for (const entry of formValues2.entries()) {
  //           console.log(entry);
  //         }

  //         // posting data to the server
  //         postStudentRecord(formValues2);
  //       }
  //       scrollToTop();
  //       goToNext();
  //       step.isDone = true;
  //     }
  //   });
  // };

  // handle when user clicks on previous button
  // const onClickPrev = (goToPrev, steps, step) => {
  //   handleInitialValues(steps, step);
  //   console.log('initialValues: ', initialValues);
  //   if (steps.indexOf(step) <= 0) {
  //     return;
  //   }
  //   scrollToTop();
  //   goToPrev();
  // };

  const [classOptions, setClassOptions] = useState([]);

  return (
    <Card>
      <CardHeader className="px-4">
        <h2 className="mt-5  titleStyle">
          {<IntlMessages id="forms.studentRegisterTitle" />}
        </h2>
      </CardHeader>

      <CardBody className="wizard wizard-default">
        <div
          style={{
            width: '90%',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button onClick={() => resetformFields()}>پاک کردن فورم</Button>
        </div>
        {/* <Wizard>
          <Steps>
            <Step id="step1"> */}
        <div>
          <h3>معلومات شخصی</h3>
          <hr />
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={studentRegisterFormStep_1}
            onSubmit={postStudentRecord}
          >
            {({
              errors,
              touched,
              values,
              handleSubmit,
              setFieldTouched,
              setFieldValue,
              setFieldError,
            }) => (
              <Form className="av-tooltip tooltip-label-right has-float-label error-l-100 style ">
                <Row>
                  <Colxx xxs="12">
                    <div className="p-3 w-50">
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
                            // get selected department
                            const dep = instituteDeps?.find(
                              (d) => d.department === value.value,
                            );

                            console.log('departments: ', departments);
                            // get classes array from department
                            const class_ids = dep?.classes.map((c) => c.classs);
                            console.log('class_ids', class_ids);

                            // filter classes options from context
                            setClassOptions(
                              classs.filter((c) => class_ids.includes(c.value)),
                            );
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
                          <IntlMessages id="marks.ClassLabel" />
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

                      {/* Eduactional Year*/}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
                          <IntlMessages id="curriculum.eduactionalYearLabel" />
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
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                          isSearchable={false}
                        />
                        {errors.interanceType && touched.interanceType ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.interanceType}
                          </div>
                        ) : null}
                      </FormGroup>

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

                      {/*Student Type*/}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                          isSearchable={false}
                        />
                        {errors.studentType && touched.studentType ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studentType}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>

                    <hr />
                    <div className="p-3 w-50">
                      {/* Name */}
                      {/* test it for some time, if successed, use this approach in all forms */}
                      <MyFormGroup>
                        <MyLabel required>
                          <IntlMessages id="forms.StdName" />
                        </MyLabel>
                        <Field
                          className="form-control fieldStyle"
                          name="name1"
                        />
                        <MyErrorLabel hide={!errors.name1 || !touched.name1}>
                          {errors.name1}
                        </MyErrorLabel>
                      </MyFormGroup>

                      {/* Father Name */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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

                      {/* grandFatherName */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.grandFatherName" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="grandFatherName"
                        />
                        {errors.grandFatherName && touched.grandFatherName ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.grandFatherName}
                          </div>
                        ) : null}
                      </FormGroup>
                      {values.interanceType.value === 'general_kankor' && (
                        <FormGroup className="form-group has-float-label error-l-100">
                          <Label style={inputLabel}>
                            کانکورایدی
                            {/* <span style={{ color: 'red' }}>*</span> */}
                          </Label>
                          <Field
                            className="form-control fieldStyle"
                            name="kankorId"
                          />
                          {errors.kankorId && touched.kankorId ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.kankorId}
                            </div>
                          ) : null}
                        </FormGroup>
                      )}

                      {/* Gender */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                          isSearchable={false}
                        />
                        {errors.gender && touched.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.gender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Tazkira Type */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                          isSearchable={false}
                        />
                        {errors.tazkiraType && touched.tazkiraType ? (
                          <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                            {errors.tazkiraType}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Tazkira Number */}
                      {values.tazkiraType.value === 'electronic' && (
                        <FormGroup className="form-group has-float-label error-l-100">
                          <Label style={inputLabel}>
                            نمبر تذکره الکترونی
                            <span style={{ color: 'red' }}>*</span>
                          </Label>
                          {/* <Field
                            className="form-control fieldStyle"
                            name="tazkiraNo"
                            type="text"
                            maxLength="14"
                            minLength="12"
                          /> */}
                          <InputMask
                            style={{ width: '100%' }}
                            name="tazkiraNo"
                            value={values.tazkiraNo}
                            id="ssn"
                            mask="9999-9999-99999"
                            placeholder="9999-9999-99999"
                            onChange={(e) =>
                              setFieldValue('tazkiraNo', e.target.value)
                            }
                          />
                          {errors.tazkiraNo && touched.tazkiraNo ? (
                            <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                              {errors.tazkiraNo}
                            </div>
                          ) : null}
                        </FormGroup>
                      )}

                      {values.tazkiraType.value === 'paper' ? (
                        <>
                          <div>
                            {/* Jold Number */}
                            <div>
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label style={inputLabel}>
                                  <IntlMessages id="teacher.IdCardJoldNoLabel" />
                                  <RequiredHash />
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
                                <Label style={inputLabel}>
                                  <IntlMessages id="teacher.IdCardPageNoLabel" />
                                  <RequiredHash />
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
                                <Label style={inputLabel}>
                                  شماره ثبت
                                  <RequiredHash />
                                </Label>
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
                                <Label style={inputLabel}>
                                  شماره صکوک
                                  <RequiredHash />
                                </Label>
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
                      {/* Father Duty */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
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

                      {/* year, month and day of birth */}
                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label style={inputLabel}>
                          <IntlMessages id="label.yearOfBirth" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="DoB"
                          type="number"
                          min={1300}
                          max={1450}
                        />
                        {errors.DoB && touched.DoB ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.DoB}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label style={inputLabel}>
                          <IntlMessages id="label.monthOfBirth" />
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="monthOfBirth"
                          type="number"
                          min={1}
                          max={12}
                          required={false}
                        />
                        {errors.monthOfBirth && touched.monthOfBirth ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.monthOfBirth}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label style={inputLabel}>
                          <IntlMessages id="label.dayOfBirth" />
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="dayOfBirth"
                          type="number"
                          min={1}
                          max={31}
                          required={false}
                        />
                        {errors.dayOfBirth && touched.dayOfBirth ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.dayOfBirth}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Place of birth */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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

                      {/* lastname */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.lastName" />
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
                      {/* Student English Name */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.lastNameEng" />
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
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
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

                      {/* Contact No */}
                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label style={inputLabel}>
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

                      {/* Email Address */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                      <h6 className=" mb-4">
                        {<IntlMessages id="forms.PermanentAddressLabel" />}
                      </h6>

                      {/* province permanent*/}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.ProvinceLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={(name, value) => {
                            handleProvinceChange(name, value, setFieldValue);
                            setFieldValue(name, value);
                          }}
                          isSearchable={true}
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
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.DistrictLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="district"
                          id="district"
                          value={values.district}
                          options={mainDistrictOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={true}
                        />
                        {errors.district && touched.district ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.district}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* village permanent */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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

                      <h6 className=" mb-4">
                        {<IntlMessages id="forms.CurrentAddresslabel" />}
                      </h6>

                      {/* Current Address */}
                      {/* province Current */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.ProvinceLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="C_Province"
                          id="C_Province"
                          value={values.C_Province}
                          options={provinces}
                          isSearchable={true}
                          onChange={(name, value) => {
                            handleProvinceChange(name, value, setFieldValue);
                            setFieldValue(name, value);
                          }}
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
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.DistrictLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="C_District"
                          id="C_District"
                          value={values.C_District}
                          options={currentDistrictOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={true}
                        />
                        {errors.C_District && touched.C_District ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.C_District}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* village */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                      {/* Education */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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
                          isSearchable={false}
                        />
                        {errors.levelOfEducation && touched.levelOfEducation ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.levelOfEducation}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.StdGraduationYearLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        {/* <FormikReactSelect
                                  name="graduationYear"
                                  id="graduationYear"
                                  value={values.graduationYear}
                                  options={educationalYearsOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  isSearchable={false}
                                  required
                                /> */}
                        <Field
                          className="form-control fieldStyle"
                          name="graduationYear"
                          type="number"
                        />
                        {errors.graduationYear && touched.graduationYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.graduationYear}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* Student Maktab*/}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
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

                      {/*School province*/}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.StdSchoolProvinceLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="schoolProvince"
                          id="schoolProvince"
                          value={values.schoolProvince}
                          options={provinces}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={true}
                        />
                        {errors.schoolProvince && touched.schoolProvince ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.schoolProvince}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-100 ">
                        <Label style={inputLabel}>معلولیت/معیوبیت</Label>
                        <FormikReactSelect
                          name="disability"
                          id="disability"
                          value={values.disability}
                          options={disabilityOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          isSearchable={false}
                          isClearable={true}
                          // style={{ fontSize: '100%' }}
                        />
                        {errors.disability && touched.disability ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.disability}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Student Id */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="student.studentId" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="studentId"
                          type="number"
                        />
                        {errors.studentId && touched.studentId ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studentId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Upload Photo */}
                      <FormGroup className="form-group has-float-label error-l-100">
                        <InputGroupAddon addonType="prepend">
                          <IntlMessages id="student.uploadPhoto" />
                        </InputGroupAddon>
                        <FormControl
                          name="file"
                          type="file"
                          className="form-control fieldStyle"
                          onChange={handleFileChange}
                        />
                        {errors.file && touched.file ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.file}
                          </div>
                        ) : null}
                      </FormGroup>
                    </div>
                  </Colxx>
                </Row>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
        {/* </Step>
          </Steps>
        </Wizard> */}
      </CardBody>
    </Card>
  );
};
export default injectIntl(StudentRegistration);
