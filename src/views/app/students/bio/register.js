/* eslint-disable no-param-reassign */
import React, {
  createRef,
  useState,
  Controller,
  useEffect,
  useRef,
} from 'react';
import { NavLink } from 'react-router-dom';
import { FormControl, FormLabel } from 'react-bootstrap';
import './../../.././../assets/css/global-style.css';

import { fetchProvinces, fetchDistricts } from '../../global-data/options';

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
  disabilityOptions,
} from '../../global-data/options';
import {
  studentRegisterFormStep_1,
  studentRegisterFormStep_2,
  studentRegisterFormStep_3,
} from '../../global-data/forms-validation';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
  useFormik,
} from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import { NotificationManager } from 'components/common/react-notifications';
import { useParams } from 'react-router-dom';

import * as Yup from 'yup';

import { Colxx } from 'components/common/CustomBootstrap';
import callApi from 'helpers/callApi';
import currentUser from 'helpers/currentUser';

const StudentRegistration = ({ intl }, values) => {
  const { studentId } = useParams();

  // if student id is provided, fetch student data from backend
  // if (studentId) {
  //   useEffect(() => {
  //     async function fetchStudent() {
  //       // const { data } = await axios.get(
  //       //   `api/?student_id=${updateStudentId}`
  //       // );
  //       const { data } = await callApi(
  //         `api/?student_id=${studentId}`,
  //         '',
  //         null
  //       );
  //       console.log('the backend server data', data.results[0]);

  //       // get already existing student data from backend
  //       setInitialname1(data.results[0].name);
  //       setInitialLastName(data.results[0].last_name);
  //       setInitialFatherName(data.results[0].father_name);
  //       setInitialGrandFatherName(data.results[0].grand_father_name);
  //       setInitialFatherDuty(data.results[0].fatherـprofession);
  //       setInitialLastNameEng(data.results[0].english_last_name);
  //       const instGender = genderOptions.map((studentGender) => {
  //         if (studentGender.value === data.results[0].gender) {
  //           setInitialGender(studentGender);
  //         }
  //       });
  //       const dateOfBirthOptions = dateOfBirthOptoions.map((yearOptions) => {
  //         if (yearOptions.value === data.results[0].birth_date) {
  //           setInitialDoB(yearOptions);
  //         }
  //       });
  //       const graduationYear = educationalYearsOptions.map((yearOptions) => {
  //         if (yearOptions.value === data.results[0].finished_grade_year) {
  //           setInitialGraduationYear(yearOptions);
  //         }
  //       });
  //       setInitialEnglishName(data.results[0].english_name);
  //       setInitialPhoneNo(data.results[0].phone_number);
  //       setInitialFatherDutyLocation(data.results[0].fatherـplaceـofـduty);
  //       if (data.results[0].sukuk_number)
  //         setInitialTazkiraType(tazkiraOptions[1]);
  //       else setInitialTazkiraType(tazkiraOptions[0]);
  //       setInitialFatherEngName(data.results[0].english_father_name);
  //       setInitialPlaceOfBirth(data.results[0].main_province);
  //       setInitialTazkiraNo(data.results[0].registration_number);
  //       setInitialEmail(data.results[0].email);
  //       setInitialIdCardPageNo(data.results[0].page_number);
  //       setInitialStudentId(data.results[0].cover_number);
  //       setInitialPreSchool(data.results[0].school);
  //       const studentFinishGrade = educationLevelOptions.map(
  //         (finishedGrade) => {
  //           if (finishedGrade.value === data.results[0].finished_grade) {
  //             setInitialLevelOfEducation(finishedGrade);
  //           }
  //         }
  //       );
  //       const studentMainProvincee = provinceOptions.map((studentProvince) => {
  //         if (studentProvince.value === data.results[0].main_province) {
  //           setInitialProvince(studentProvince);
  //         }
  //       });
  //       const studentCurrentProvince = provinceOptions.map(
  //         (studentProvince) => {
  //           if (studentProvince.value === data.results[0].current_province) {
  //             setInitialC_Province(studentProvince);
  //           }
  //         }
  //       );
  //       const studentSchoolProvince = provinceOptions.map((studentProvince) => {
  //         if (studentProvince.value === data.results[0].schoolـprovince) {
  //           setInitialSchoolProvince(studentProvince);
  //         }
  //       });
  //       setInitialDistrict(data.results[0].main_district);
  //       setInitialVillage(data.results[0].main_village);
  //       setInitialC_District(data.results[0].current_district);
  //       setInitialC_Village(data.results[0].current_village);
  //       setInitialIdCardPageNo(data.results[0].page_number);
  //       setInitialIdCardJoldNo(data.results[0].cover_number);
  //       // setInitialInstitute(data[0].school);
  //       // setInitialEducationalYear(data[0].finished_grade_year);
  //       // setInitialKankorId(data[0].kankor_id);
  //       // setInitialStudentId(data[0].student_id);
  //       // setInitialClass(data[0].graduat_12_types);
  //       // setInitialInteranceType(data[0].internse_type);
  //       // setInitialDepartment(data[0].kankor_id);
  //       // setInitialBatch(data[0].kankor_id);
  //       // setInitialMediumOfInstruction(data[0].kankor_id);
  //       // setInitialStudyTime(data[0].kankor_id);
  //       // setInitialStudentType(data[0].student_type);
  //       // setInitialField(data[0].field);
  //       // setInitialSector(data[0].sector);
  //       // setInitialphoto(data[0].photo);
  //     }
  //     async function fetchStudentDepartment() {
  //       const { data } = await callApi(
  //         `api/student_institutes/?student_id=${studentId}`,
  //         '',
  //         null
  //       );
  //       console.log('student department data', data);
  //     }
  //     fetchStudent();
  //     fetchStudentDepartment();
  //     //setUpdateMode(true);
  //   }, []);
  // }

  const [isNext, setIsNext] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [fieldList, setFieldList] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classs, setClasss] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fields, setFields] = useState({
    name1: '',
    fatherName: '',
    lastName: '',
    lastNameEng: '',
    fatherDuty: '',
    englishName: '',
    fatherEngName: '',
    grandFatherName: '',
    fatherDutyLocation: '',
    placeOfBirth: '',
    DoB: '',
    gender: '',
    tazkiraNo: '',
    phoneNo: '',
    email: '',
    idCardPageNo: '',
    idCardJoldNo: '',
    tazkiraType: '',
    levelOfEducation: '',
    preSchool: '',
    graduationYear: '',
    schoolProvince: '',
    province: '',
    C_Province: '',
    C_District: '',
    district: '',
    village: '',
    C_Village: '',
    institute: '',
    class: '',
    educationalYear: '',
    department: '',
    mediumOfInstruction: '',
    // kankorId: initialKankorId,
    studentId: '',
    studyTime: '',
    interanceType: '',
    studentType: '',
    batch: '',
    field: '',
    sector: '',
    file: '',
  });
  const [stepOneData, setStepOneData] = useState({});

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [currentProvince, setCurrentProvince] = useState('');
  const [mainProvince, setMainProvince] = useState('');

  const [mainDistrictOptions, setMainDistrictOptions] = useState([]);
  const [currentDistrictOptions, setCurrentDistrictOptions] = useState([]);

  const [initialValues, setInitialValues] = useState([
    {
      name1: '',
      englishName: '',
      lastName: '',
      lastNameEng: '',
      fatherName: '',
      fatherDuty: '',
      fatherEngName: '',
      grandFatherName: '',
      fatherDutyLocation: '',
      DoB: [],
      gender: [],
      tazkiraNo: '',
      idCardPageNo: '',
      idCardJoldNo: '',
      tazkiraType: [],
      phoneNo: '',
      email: '',
      placeOfBirth: '',
    },
    {
      levelOfEducation: '',
      preSchool: '',
      graduationYear: '',
      schoolProvince: '',
      province: '',
      C_Province: '',
      C_District: '',
      district: '',
      village: '',
      C_Village: '',
    },
    {
      institute: [],
      class: [],
      educationalYear: [],
      department: [],
      mediumOfInstruction: [],
      // kankorId: initialKankorId,
      studentId: '',
      studyTime: '',
      interanceType: [],
      studentType: [],
      batch: '',
      field: [],
      sector: [],
      file: '',
    },
  ]);

  const forms = [createRef(null), createRef(null), createRef(null)];

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);
  };

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const institutes = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(institutes);
    } else {
      console.log('Could not fetch list of institutes from server');
    }
  };

  const fetchFields = async () => {
    const response = await callApi('institute/field/', 'GET', null);
    if (response.data && response.status === 200) {
      const fields = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setFieldList(fields);
    } else {
      console.log('Could not fetch field of studies from server');
    }
  };

  const fetchDepartments = async () => {
    const response = await callApi('institute/department/', 'GET', null);
    if (response.data && response.status === 200) {
      const departments = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(departments);
    } else {
      console.log('Could not fetch departments from server');
    }
  };

  const fetchClasses = async () => {
    const response = await callApi('institute/classs/', 'GET', null);
    console.log('class repspossdfsde', response);
    if (response.data && response.status === 200) {
      const listOfClasses = await response.data.map((item) => ({
        value: item.id,
        label: item.name + ' - ' + item.semester + ' - ' + item.section,
      }));
      setClasss(listOfClasses);
    } else {
      console.log('Could not fetch list of classes from server');
    }
  };

  const fetchSectors = async () => {
    const response = await callApi('institute/sectors/', 'GET', null);
    if (response.data && response.status === 200) {
      const sectors = await response.data.map((item) => ({
        value: item.id,
        label: item.sector,
      }));
      setSectors(sectors);
    } else {
      console.log('Could not fetch list of sectors from server');
    }
  };

  const fetchProvincesList = async () => {
    const provinces = await fetchProvinces();
    setProvinceOptions(provinces);
  };

  // fetch the following when the component is first loaded
  useEffect(async () => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
    fetchClasses();
    fetchSectors();
    fetchProvincesList();
  }, []);

  const handleProvinceChange = async (name, value, setFieldValue) => {
    console.log('name is ', name);
    console.log('value is ', value);
    const districts = await fetchDistricts(value.value);
    if (name === 'C_Province') {
      setCurrentDistrictOptions(districts);
      setFieldValue('C_District', '');
    } else {
      setMainDistrictOptions(districts);
      setFieldValue('district', '');
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
    // const response = await callApi('api/student_create', 'POST', data);
    const response = await callApi('students/register', 'POST', data);
    // console.log('response of call api', response);
    if (response.status >= 200 && response.status < 300) {
      createNotification('success', 'filled');
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInitialValues = (steps, step) => {
    console.log('steps is ', steps);
    const formIndex = steps.indexOf(step);
    if (formIndex > 2) return;
    const form = forms[formIndex].current;

    console.log('step is ', step);
    const initialValuesCopy = [
      { ...initialValues[0] },
      { ...initialValues[1] },
      { ...initialValues[2] },
    ];
    initialValuesCopy[steps.indexOf(step)] = form.values;
    setInitialValues(initialValuesCopy);
  };

  // handle when user clicks on next button
  const onClickNext = (goToNext, steps, step, values) => {
    console.log('inside goToNext function');
    // if last step, do nothing
    const isLastStep = steps.length - 1 <= steps.indexOf(step);
    if (isLastStep) {
      console.log('last step, do nothing');
      return;
    }

    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;
    console.log('ref form value: ', form);
    console.log('form values of index ${formIndex}: ', form.values);
    // submitForm() only triggers formik validation
    form.submitForm().then(() => {
      if (!form.isDirty && form.isValid) {
        // add step's data into fields state
        // add fields of this step to the fields state
        console.log('form values: ', form.values);
        const newFields = { ...fields, ...form.values };
        handleInitialValues(steps, step);
        setFields(newFields);
        // if last step, submit the form
        // if next on last step is clicked, call the api to register student
        if (steps.length - 2 <= steps.indexOf(step)) {
          // setBottomNavHidden(true);
          setLoading(true);
          console.log('new fields', newFields);

          const data = {
            //personal info,
            name: newFields.name1,
            student_id: newFields.studentId,
            kankor_id: newFields.kankorId,
            previous_grade_year: newFields.graduationYear.label,
            previous_grade_school_name: newFields.preSchool,
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
            cover_number: newFields.idCardJoldNo,
            page_number: newFields.idCardPageNo,
            registration_number: newFields.tazkiraNo,
            sukuk_number: newFields.tazkiraNo,
            main_province: newFields.province.value,
            main_district: newFields.district.value,
            main_village: newFields.village,
            current_province: newFields.C_Province.value,
            current_district: newFields.C_District.value,
            current_village: newFields.C_Village,
            year_of_birth: newFields.DoB.label,
            father_profession: newFields.fatherDuty,
            father_place_of_duty: newFields.fatherDutyLocation,
            admission_method: newFields.interanceType.value,
            // students_status: 'active',
            gender: newFields.gender.value,
            institute: newFields.institute.value,
            educational_year: newFields.educationalYear.label,
            student_type: 'continuous',
            teaching_language: newFields.mediumOfInstruction.value,
            shift: newFields.studyTime.value,

            // fields info
            department: newFields.department.value,
            field_of_study: newFields.field.value,

            // sector:
            sector: newFields.sector.value,
            batch: newFields.batch.value,

            // class info,
            classs: newFields.class.value,
            place_of_birth: newFields.placeOfBirth,
          };
          if (selectedFile) {
            data['photo'] = selectedFile;
          }
          if (newFields.disability) {
            data['disability'] = newFields.disability.value;
          }

          const formData2 = new FormData();
          for (let key in data) {
            formData2.append(key, data[key]);
          }

          console.log('formdata', formData2.entries());

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

  // handle when user clicks on previous button
  const onClickPrev = (goToPrev, steps, step) => {
    handleInitialValues(steps, step);
    console.log('initialValues: ', initialValues);
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
                  initialValues={initialValues[0]}
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
                                // defaultValue={tazkiraOptions[0]}
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
                            {values.tazkiraType.value === 'paper' ? (
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

                            {values.tazkiraType.value === 'paper' ? (
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
                                isSearchable={false}
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
                                isSearchable={false}
                              />
                              {errors.gender && touched.gender ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.gender}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup className="form-group has-float-label error-l-100 ">
                              <Label>disability</Label>
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

                            {/* Contact No */}
                            <FormGroup className="form-group has-float-label error-l-100 ">
                              <Label>
                                <IntlMessages id="teacher.PhoneNoLabel" />
                                {/* <span style={{ color: 'red' }}>*</span> */}
                              </Label>
                              <Field
                                className="form-control fieldStyle"
                                name="phoneNo"
                                type="number"
                              />
                              {errors.phoneNo && touched.phoneNo ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.phoneNo}
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
                  enableReinitialize={true}
                  initialValues={initialValues[1]}
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
                                  onChange={(name, value) => {
                                    handleProvinceChange(
                                      name,
                                      value,
                                      setFieldValue
                                    );
                                    setFieldValue(name, value);
                                  }}
                                  isSearchable={false}
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
                                <FormikReactSelect
                                  name="district"
                                  id="district"
                                  value={values.district}
                                  options={mainDistrictOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  isSearchable={false}
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
                                  isSearchable={false}
                                  onChange={(name, value) => {
                                    handleProvinceChange(
                                      name,
                                      value,
                                      setFieldValue
                                    );
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
                                <Label>
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
                                  isSearchable={false}
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
                                  isSearchable={false}
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
                                  isSearchable={false}
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
                                  isSearchable={false}
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
                  enableReinitialize={true}
                  initialValues={initialValues[2]}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
                                isSearchable={false}
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
      <button type="submit" onClick={postStudentRecord}>
        Admit Student
      </button>
    </Card>
  );
};
export default injectIntl(StudentRegistration);
