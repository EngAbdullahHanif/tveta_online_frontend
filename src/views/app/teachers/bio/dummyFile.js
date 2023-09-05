// /* eslint-disable no-param-reassign */
// import React, { createRef, useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import callApi from 'helpers/callApi';
// import {
//   provinceOptions,
//   langOptions,
//   stepOptions,
//   gradeOptions,
//   contractTypeOptions,
//   genderOptions,
//   appointmentTypeOptions,
//   tazkiraOptions,
//   levelOfEdcationOptions,
//   teacherCurrentStatusOptions,
//   dateOfBirthOptoions,
// } from '../../global-data/options';

// import { NavLink } from 'react-router-dom';
// import './../../../../assets/css/global-style.css';
// import {
//   Row,
//   Card,
//   CardBody,
//   FormGroup,
//   Label,
//   Spinner,
//   Button,
// } from 'reactstrap';
// import { Wizard, Steps, Step } from 'react-albus';
// import { FormikReactSelect } from 'containers/form-validations/FormikFields';
// import { injectIntl } from 'react-intl';
// import { Formik, Form, Field } from 'formik';
// import IntlMessages from 'helpers/IntlMessages';
// import BottomNavigation from 'components/wizard/BottomNavigation';
// import { NotificationManager } from 'components/common/react-notifications';
// import { Colxx } from 'components/common/CustomBootstrap';

// import config from '../../../../config';
// const servicePath = config.API_URL;
// const teacherResitgerAPIUrl = `${servicePath}/teachers/create_teachers/`;
// const gettingSingleTeacherAPI = `${servicePath}/teachers/institute`;
// // http://localhost:8000/teachers/?id=1

// const dutyLocationOptions = [
//   { value: '1', label: 'انستیتوت نیما' },
//   { value: '2', label: 'لیسه مسلکی نابینایان' },
// ];

// const majorOptions = [
//   { value: '1', label: 'ingrate from backend' },
//   { value: '2', label: 'integrate from backend' },
//   { value: '3', label: 'BBA' },
//   { value: '4', label: 'Mechenical Engineering' },
// ];
// const TeacherRegister = ({ intl }, values) => {
//   const [initialName, setInitialName] = useState('');
//   const [initialLastName, setInitialLastName] = useState('');
//   const [initialEnglishName, setInitialEnglishName] = useState('');
//   const [initialEnglishLastName, setInitialEnglishLastName] = useState('');
//   const [initialEnglishFatherName, setInitialEnglishFatherName] = useState('');
//   const [initialFatherName, setInitialFatherName] = useState('');
//   const [initialGender, setInitialGender] = useState([]);
//   const [initialGrandFatherName, setInitialGrandFatherName] = useState('');
//   const [initialregistrationNumber, setInitialregistrationNumber] =
//     useState('');
//   const [initialPhoneNumber, setInitialPhoneNumber] = useState('');
//   const [yearOfBirth, setYearOfBirth] = useState([]);
//   const [initialPlaceOfBirth, setInitialPlaceOfBirth] = useState('');
//   const [initialEmail, setInitialEmail] = useState('');
//   const [initialpageNumber, setInitialpageNumber] = useState('');
//   const [initialTazkiraType, setInitialTazkiraType] = useState([]);
//   const [initialLevelOfEducation, setInitialLevelOfEducation] = useState([]);
//   const [initialMajor, setInitialMajor] = useState('');
//   const [initialYearCompleted, setInitialYearCompleted] = useState([]);
//   const [initialInstitution, setInitialInstitution] = useState('');
//   const [initialcoverNumber, setInitialcoverNumber] = useState('');
//   const [initialStatus, setinitialStatus] = useState([]);
//   const [initialGrade, setIntialGrade] = useState([]);
//   const [initialTeachingField, setInitialTeachingField] = useState([]);
//   const [initialAppointmentType, setInitialAppointmentType] = useState([]);
//   const [initialJobLocation, setInitialJobLocation] = useState([]);
//   const [initialTeachingLang, setInitialTeachingLang] = useState([]);
//   const [initialStep, setInitialStep] = useState([]);
//   const [initialContractType, setInitialContractType] = useState([]);
//   const [initialCurrentProvince, setInitialCurrentProvince] = useState([]);
//   const [initialCurrentDistrict, setInitialCurrentDistrict] = useState([]);
//   const [initialCurrentVillage, setInitialCurrentVillage] = useState('');
//   const [initialMainProvince, setInitialMainProvince] = useState([]);
//   const [initialMainDistrict, setInitialMainDistrict] = useState([]);
//   const [initialMainVillage, setInitialMainVillage] = useState('');

//   const [provinces, setProvinces] = useState([]);
//   const [mainDistricts, setMainDistricts] = useState([]);
//   const [currentDistricts, setCurrentDistricts] = useState([]);
//   const [selectedMainProvince, setSelectedMainProvince] = useState('');
//   const [selectedCurrentProvince, setSelectedCurrentProvince] = useState('');
//   const [institutes, setInstitutes] = useState([]);
//   const [fieldsOfStudy, setFieldsOfStudy] = useState([]);
//   const forms = [createRef(null), createRef(null), createRef(null)];
//   const [bottomNavHidden, setBottomNavHidden] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [fields, setFields] = useState({});
//   const { teacherId } = useParams();

//   if (teacherId) {
//     useEffect(() => {
//       async function fetchStudent() {
//         // const { data } = await axios.get(
//         //   `${gettingSingleTeacherAPI}/?teacher_id=${teacherId}`
//         // );
//         const { data } = await callApi(
//           `teachers/institute/?teacher_id=${teacherId}`,
//           '',
//           null,
//         );
//         setInitialName(data[0].teacher_id.name);
//         setInitialFatherName(data[0].teacher_id.father_name);
//         setInitialGrandFatherName(data[0].teacher_id.grand_father_name);
//         setInitialregistrationNumber(data[0].teacher_id.sukuk_number);
//         if (data[0].teacher_id.sukuk_number)
//           setInitialTazkiraType(tazkiraOptions[1]);
//         else setInitialTazkiraType(tazkiraOptions[0]);
//         setInitialPhoneNumber(data[0].teacher_id.phone_number);
//         yearOfBirth('2022');
//         setInitialpageNumber(data[0].teacher_id.page_number);
//         setInitialEmail(data[0].teacher_id.email);
//         const teacherFieldOptions = majorOptions.map((teacherField) => {
//           if (teacherField.value === data[0].teacher_id.education_degree) {
//             setInitialMajor(teacherField);
//           }
//         });
//         const teahcerGenderOptions = genderOptions.map((teacherGender) => {
//           if (teacherGender.value === data[0].teacher_id.gender) {
//             setInitialGender(teacherGender);
//           }
//         });
//         setInitialcoverNumber(data[0].teacher_id.cover_number);

//         const teacherLevelOfEducationOptions = levelOfEdcationOptions.map(
//           (teacherLevelOfEducation) => {
//             if (
//               teacherLevelOfEducation.value ===
//               data[0].teacher_id.education_degree
//             ) {
//               setInitialLevelOfEducation(teacherLevelOfEducation);
//             }
//           },
//         );
//         const teacherMainProvince = provinceOptions.map((province) => {
//           if (province.value == data[0].teacher_id.main_province) {
//             setInitialProvince(province);
//           }
//         });
//         const teacherCurrentProvince = provinceOptions.map((province) => {
//           if (province.value == data[0].teacher_id.current_province) {
//             setInitialCurrentProvince(province);
//           }
//         });
//         const teachingLangugaeOptions = langOptions.map((teachingLangugage) => {
//           if (teachingLangugage.value == data[0].institute_id.language) {
//             setInitialTeachingLang(teachingLangugage);
//           }
//         });
//         const teacherStatusOptions = teacherCurrentStatusOptions.map(
//           (teacherStatus) => {
//             if (teacherStatus.value == data[0].teacher_id.status_type) {
//               setinitialStatus(teacherStatus);
//             }
//           },
//         );
//         const teacherAppointingOptions = appointmentTypeOptions.map(
//           (appointingType) => {
//             if (appointingType.value == data[0].job_type) {
//               setInitialAppointmentType(appointingType);
//             }
//           },
//         );
//         const teachingFieldOptions = teacherteachingfieldOptions.map(
//           (teachingField) => {
//             if (teachingField.value == data[0].teacher_id.education_degree) {
//               setInitialTeachingField(teachingField);
//             }
//           },
//         );
//         const teacherGradeOptions = gradeOptions.map((teacherGrade) => {
//           if (teacherGrade.value == data[0].teacher_id.status_type) {
//             setIntialGrade(teacherGrade);
//           }
//         });

//         setInitialCurrentDistrict(data[0].teacher_id.current_district);
//         setInitialCurrentVillage(data[0].teacher_id.current_village);
//         setInitialDistrict(data[0].teacher_id.main_district);
//         setInitialVillage(data[0].teacher_id.main_village);
//         setInitialJobLocation([
//           {
//             value: data[0].institute_id.id,
//             label: data[0].institute_id.name,
//           },
//         ]);

//         const teacherStepOptions = stepOptions.map((teacherStep) => {
//           if (teacherStep.value == data[0].teacher_id.step) {
//             setInitialStep(teacherStep);
//           }
//         });

//         const contractTypeOptionss = contractTypeOptions.map(
//           (teacherContractType) => {
//             if (teacherContractType.value == data[0].contract_type) {
//               setInitialContractType(teacherContractType);
//             }
//           },
//         );
//       }
//       fetchStudent();
//       //setUpdateMode(true);
//     }, []);
//   }

//   const createNotification = (type, className) => {
//     const cName = className || '';
//     switch (type) {
//       case 'success':
//         NotificationManager.success(
//           'استاد موفقانه رجستر شو',
//           'موفقیت',
//           3000,
//           null,
//           null,
//           cName,
//         );
//         break;
//       case 'error':
//         NotificationManager.error(
//           'استاد ثبت نشو،لطفا معلومات دقیق دننه کی',
//           'خطا',
//           5000,
//           () => {
//             alert('callback');
//           },
//           null,
//           cName,
//         );
//         break;
//       default:
//         NotificationManager.info('Info message');
//         break;
//     }
//   };

//   const fetchProvinces = async () => {
//     const response = await callApi('core/provinces/', 'GET', null);
//     if (response.data && response.status === 200) {
//       const updatedData = await response.data.map((item) => ({
//         value: item.id,
//         label: item.native_name,
//       }));

//       setProvinces(updatedData);
//     } else {
//       console.log('province error');
//     }
//   };
//   const fetchDistricts = async (provinceId) => {
//     console.log('provinceId', provinceId);
//     const response = await callApi(
//       `core/districts/?province=${provinceId}`,
//       'GET',
//       null,
//     );
//     if (response.data && response.status === 200) {
//       const updatedData = await response.data.map((item) => ({
//         value: item.id,
//         label: item.native_name,
//       }));
//       setMainDistricts(updatedData);
//     } else {
//       console.log('district error');
//     }
//   };

//   const fetchCurrentDistricts = async (provinceId) => {
//     console.log('provinceId', provinceId);
//     const response = await callApi(
//       `core/districts/?province=${provinceId}`,
//       'GET',
//       null,
//     );
//     if (response.data && response.status === 200) {
//       const updatedData = await response.data.map((item) => ({
//         value: item.id,
//         label: item.name,
//       }));
//       setCurrentDistricts(updatedData);
//     } else {
//       console.log('district error');
//     }
//   };
//   const fetchInstitutes = async () => {
//     const response = await callApi('institute/', '', null);
//     console.warn('Reponse Institutes: ', response);
//     if (response.data && response.status === 200) {
//       const updatedData = await response.data.map((item) => ({
//         value: item.id,
//         label: item.name,
//       }));
//       console.warn('Updated Institutes: ', updatedData);
//       setInstitutes(updatedData);
//     } else {
//       console.log('institute error');
//     }
//   };
//   const fetchFields = async () => {
//     const response = await callApi('institute/field/', '', null);
//     if (response.data && response.status === 200) {
//       console.log('fields', response.data);
//       const updatedData = await response.data.map((item) => ({
//         value: item.id,
//         label: item.name,
//       }));
//       setFieldsOfStudy(updatedData);
//     } else {
//       console.log('field error');
//     }
//   };

//   useEffect(() => {
//     fetchProvinces();
//     fetchInstitutes();
//     fetchFields();
//   }, []);

//   useEffect(() => {
//     console.log('selectedmainProvince', selectedMainProvince);
//     if (selectedMainProvince) {
//       fetchDistricts(selectedMainProvince);
//     }
//   }, [selectedMainProvince]);

//   useEffect(() => {
//     console.log('selectedProvince', selectedCurrentProvince);
//     if (selectedCurrentProvince) {
//       fetchCurrentDistricts(selectedCurrentProvince);
//     }
//   }, [selectedCurrentProvince]);

//   const postTeacherRecord = async (data) => {
//     console.log('data of post record', data);
//     const response = await callApi(
//       'teachers/teacher-contract/create/',
//       'POST',
//       data,
//     );
//     if (response.status >= 200 && response.status < 300) {
//       createNotification('success', 'filled');
//       console.log('success message', response.data);
//     } else {
//       createNotification('error', 'filled');
//       console.log('teacher error');
//     }
//   };

//   const onClickNext = (goToNext, steps, step, values) => {
//     if (steps.length - 1 <= steps.indexOf(step)) {
//       return;
//     }
//     const formIndex = steps.indexOf(step);
//     const form = forms[formIndex].current;
//     console.log(step.id, 'stepoId');
//     console.log('First Step (Form) Values', form.values);
//     form.submitForm().then(() => {
//       if (!form.isDirty && form.isValid) {
//         const newFields = { ...fields, ...form.values };
//         setFields(newFields);
//         const data = {
//           contract_type: newFields.appointmentType?.value,
//           cover_number: newFields.coverNumber,
//           current_district: newFields.currentDistrict?.value,
//           current_province: newFields.currentProvince?.value,
//           current_village: newFields.currentVillage,
//           email: newFields.email,
//           english_father_name: newFields.englishFatherName,
//           english_last_name: newFields.englishLastName,
//           english_name: newFields.englishName,
//           father_name: newFields.fatherName,
//           gender: newFields.gender?.value,
//           grade: newFields.grade?.value,
//           grandfather_name: newFields.grandFatherName,
//           hire_date: newFields.hireDate,
//           institution: newFields.institution,
//           institute: newFields.jobLocation?.value,
//           last_name: newFields.lastName,
//           degree: newFields.levelOfEducation?.value,
//           main_district: newFields.mainDistrict?.value,
//           main_province: newFields.mainProvince?.value,
//           main_village: newFields.mainVillage,
//           field_of_study: newFields.major,
//           name: newFields.name,
//           page_number: newFields.pageNumber,
//           phone_number: newFields.phoneNumber,
//           place_of_birth: newFields.placeOfBirth,
//           registration_number: newFields.registrationNumber,
//           step: newFields.step?.value,
//           teaching_field: newFields.teachingField?.value,
//           teaching_language: newFields.teachingLang?.value,
//           year_completed: newFields.yearCompleted?.value,
//           year_of_birth: newFields.yearOfBirth?.value,
//         };

//         console.log('data', data);
//         console.log('form data all here', newFields);
//         if (steps.length - 2 <= steps.indexOf(step)) {
//           setBottomNavHidden(true);
//           setLoading(true);
//           console.log('Final Values', newFields);
//           postTeacherRecord(data);
//           setTimeout(() => {
//             setLoading(false);
//           }, 0);
//         }
//         goToNext();
//         step.isDone = true;
//       }
//     });
//   };
//   const onClickPrev = (goToPrev, steps, step) => {
//     if (steps.indexOf(step) <= 0) {
//       return;
//     }
//     goToPrev();
//   };

//   const { messages } = intl;

//   return (
//     <Card>
//       <div className="mt-4 ml-5">
//         <h2 className="mt-5 m-5 titleStyle">
//           {<IntlMessages id="teacher.RegisterTitle" />}
//         </h2>
//       </div>
//       <CardBody className="wizard wizard-default">
//         <Wizard>
//           <Steps>
//             <Step
//               id="step1"
//               name={messages['wizard.step-name-1']}
//               desc={messages['wizard.step-desc-1']}
//             >
//               <div className="wizard-basic-step">
//                 <Formik
//                   enableReinitialize={true}
//                   innerRef={forms[0]}
//                   initialValues={{
//                     name: initialName,
//                     englishName: initialEnglishName,
//                     lastName: initialLastName,
//                     englishLastName: initialEnglishLastName,
//                     fatherName: initialFatherName,
//                     englishFatherName: initialEnglishFatherName,
//                     grandFatherName: initialGrandFatherName,
//                     yearOfBirth: yearOfBirth,
//                     placeOfBirth: initialPlaceOfBirth,
//                     registrationNumber: initialregistrationNumber,
//                     phoneNumber: initialPhoneNumber,
//                     email: initialEmail,
//                     pageNumber: initialpageNumber,
//                     coverNumber: initialcoverNumber,
//                     gender: initialGender,
//                     tazkiraType: initialTazkiraType,
//                     major: initialMajor,
//                     levelOfEducation: initialLevelOfEducation,
//                     yearCompleted: initialYearCompleted,
//                     institution: initialInstitution,
//                   }}
//                   validateOnMount
//                   // validationSchema={teacherRegisterFormStep_1}
//                   onSubmit={() => {}}
//                 >
//                   {({
//                     errors,
//                     touched,
//                     values,
//                     setFieldTouched,
//                     setFieldValue,
//                     isSubmitting,
//                   }) => (
//                     <Form className="av-tooltip tooltip-label-right style">
//                       <Row className="justify-content-center">
//                         <Colxx xxs="5" className="ml-5">
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.NameLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="name"
//                             />
//                             {errors.name && touched.name ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.name}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* lastname */}
//                           <FormGroup className="form-group has-float-label">
//                             <Label>
//                               <IntlMessages id="forms.lastName" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="lastName"
//                             />
//                             {errors.lastName && touched.lastName ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.lastName}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* Father Name */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.FatherNameLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="fatherName"
//                             />
//                             {errors.fatherName && touched.fatherName ? (
//                               <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                 {errors.fatherName}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {/* Tazkira Type */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="forms.TazkiraType" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>

//                             <FormikReactSelect
//                               name="tazkiraType"
//                               id="tazkiraType"
//                               value={values.tazkiraType}
//                               options={tazkiraOptions}
//                               onChange={setFieldValue}
//                               onBlur={setFieldTouched}
//                             />
//                             {errors.tazkiraType && touched.tazkiraType ? (
//                               <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
//                                 {errors.tazkiraType}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {values.tazkiraType.value === 'Paper' ? (
//                             <div>
//                               {/* Safha */}
//                               <div>
//                                 <FormGroup className="form-group has-float-label error-l-175">
//                                   <Label>
//                                     <IntlMessages id="teacher.IdcardPageNoLabel" />
//                                   </Label>
//                                   <Field
//                                     className="form-control fieldStyle"
//                                     name="pageNumber"
//                                     type="number"
//                                   />
//                                   {errors.pageNumber && touched.pageNumber ? (
//                                     <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                       {errors.pageNumber}
//                                     </div>
//                                   ) : null}
//                                 </FormGroup>
//                               </div>
//                             </div>
//                           ) : (
//                             <div></div>
//                           )}

//                           <FormGroup className="form-group has-float-label error-l-100 ">
//                             <Label>
//                               <IntlMessages id="teacher.DoBLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <FormikReactSelect
//                               name="yearOfBirth"
//                               id="yearOfBirth"
//                               value={values.yearOfBirth}
//                               options={dateOfBirthOptoions}
//                               onChange={setFieldValue}
//                               onBlur={setFieldTouched}
//                               required
//                             />
//                             {errors.yearOfBirth && touched.yearOfBirth ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.yearOfBirth}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* Major */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.MajorLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="major"
//                             />
//                             {errors.major && touched.major ? (
//                               <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                 {errors.major}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {/* Education */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.LevelOfEducationLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <FormikReactSelect
//                               name="levelOfEducation"
//                               id="levelOfEducation"
//                               value={values.levelOfEducation}
//                               options={levelOfEdcationOptions}
//                               onChange={setFieldValue}
//                               onBlur={setFieldTouched}
//                               required
//                             />
//                             {errors.levelOfEducation &&
//                             touched.levelOfEducation ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.levelOfEducation}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* Graduation Year */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               {/* <IntlMessages id="teacher.LevelOfEducationLabel" /> */}
//                               graduation year
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <FormikReactSelect
//                               name="yearCompleted"
//                               id="yearCompleted"
//                               value={values.yearCompleted}
//                               options={dateOfBirthOptoions}
//                               onChange={setFieldValue}
//                               onBlur={setFieldTouched}
//                               required
//                             />
//                             {errors.yearCompleted && touched.yearCompleted ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.yearCompleted}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* institution */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               {/* <IntlMessages id="teacher.LevelOfEducationLabel" /> */}
//                               University name
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="institution"
//                             />
//                             {errors.institution && touched.institution ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.institution}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                         </Colxx>
//                         <Colxx xxs="5" className="mr-5">
//                           {/* Teacher English Name */}
//                           <FormGroup className="form-group has-float-label error-l-100">
//                             <Label>
//                               <IntlMessages id="forms.Eng_name" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="englishName"
//                             />
//                             {errors.englishName && touched.englishName ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.englishName}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* englishLastname */}
//                           <FormGroup className="form-group has-float-label">
//                             <Label>
//                               <IntlMessages id="forms.lastNameEng" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="englishLastName"
//                             />
//                             {errors.englishLastName &&
//                             touched.englishLastName ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.englishLastName}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* Teacher Father English Name */}
//                           <FormGroup className="form-group has-float-label error-l-100">
//                             <Label>
//                               <IntlMessages id="forms.Std_father_Eng_Name" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="englishFatherName"
//                             />
//                             {errors.englishFatherName &&
//                             touched.englishFatherName ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.englishFatherName}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {/* Grand Father Name */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.GrandFatherNameLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="grandFatherName"
//                             />
//                             {errors.grandFatherName &&
//                             touched.grandFatherName ? (
//                               <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                 {errors.grandFatherName}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {/* Gender */}

//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="gender.gender" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <FormikReactSelect
//                               name="gender"
//                               id="gender"
//                               value={values.gender}
//                               options={genderOptions}
//                               onChange={setFieldValue}
//                               onBlur={setFieldTouched}
//                             />
//                             {touched.gender && errors.gender ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.gender}
//                               </div>
//                             ) : null}
//                           </FormGroup>

//                           {/* Tazkira Number */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.TazkiraNoLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="registrationNumber"
//                               type="number"
//                             />
//                             {errors.registrationNumber &&
//                             touched.registrationNumber ? (
//                               <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                 {errors.registrationNumber}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {values.tazkiraType.value === 'Paper' ? (
//                             <div>
//                               {/* Jold Number */}
//                               <div>
//                                 <FormGroup className="form-group has-float-label error-l-175">
//                                   <Label>
//                                     <IntlMessages id="teacher.IdCardJoldNoLabel" />
//                                   </Label>
//                                   <Field
//                                     className="form-control fieldStyle"
//                                     name="coverNumber"
//                                     type="number"
//                                   />
//                                   {errors.coverNumber && touched.coverNumber ? (
//                                     <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                       {errors.coverNumber}
//                                     </div>
//                                   ) : null}
//                                 </FormGroup>
//                               </div>
//                             </div>
//                           ) : (
//                             <div></div>
//                           )}
//                           {/* Contact No */}
//                           <FormGroup className="form-group has-float-label error-l-175 ">
//                             <Label>
//                               <IntlMessages id="teacher.PhoneNoLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="phoneNumber"
//                               type="number"
//                             />
//                             {errors.phoneNumber && touched.phoneNumber ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.phoneNumber}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {/* Email Address */}
//                           <FormGroup className="form-group has-float-label error-l-175">
//                             <Label>
//                               <IntlMessages id="teacher.EmailLabel" />
//                               {/* <span style={{ color: 'red' }}>*</span> */}
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="email"
//                               type="email"
//                             />
//                             {errors.email && touched.email ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.email}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                           {/* Place of birth */}
//                           <FormGroup className="form-group has-float-label error-l-100">
//                             <Label>
//                               <IntlMessages id="forms.PlaceOfBirthLabel" />
//                               <span style={{ color: 'red' }}>*</span>
//                             </Label>
//                             <Field
//                               className="form-control fieldStyle"
//                               name="placeOfBirth"
//                             />
//                             {errors.placeOfBirth && touched.placeOfBirth ? (
//                               <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                 {errors.placeOfBirth}
//                               </div>
//                             ) : null}
//                           </FormGroup>
//                         </Colxx>
//                       </Row>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </Step>

//             <Step
//               id="step2"
//               name={messages['wizard.step-name-2']}
//               desc={messages['wizard.step-desc-2']}
//             >
//               <div className="wizard-basic-step">
//                 <Formik
//                   innerRef={forms[1]}
//                   initialValues={{
//                     status: initialStatus,
//                     teachingField: initialTeachingField,
//                     grade: initialGrade,
//                     appointmentType: initialAppointmentType,
//                     jobLocation: initialJobLocation,
//                     teachingLang: initialTeachingLang,
//                     step: initialStep,
//                     contractType: initialContractType,
//                     mainProvince: initialMainProvince,
//                     mainDistrict: initialMainDistrict,
//                     mainVillage: initialMainVillage,
//                     currentProvince: initialCurrentProvince,
//                     currentDistrict: initialCurrentDistrict,
//                     currentVillage: initialCurrentVillage,
//                   }}
//                   onSubmit={() => {}}
//                   // validationSchema={teacherRegisterFormStep_2}
//                   validateOnMount
//                 >
//                   {({
//                     errors,
//                     touched,
//                     values,
//                     onBlur,
//                     setFieldTouched,
//                     setFieldValue,
//                   }) => (
//                     <Form className="av-tooltip tooltip-label-right style">
//                       <>
//                         <Row className="justify-content-center ">
//                           <Colxx xxs="5">
//                             <div className="square p-1 ">
//                               <h1>
//                                 {' '}
//                                 {<IntlMessages id="teacher.JobDeteilsLabel" />}
//                               </h1>
//                             </div>
//                           </Colxx>
//                           <Colxx xxs="5">
//                             <div className="square p-1 "></div>
//                           </Colxx>
//                         </Row>
//                         <Row className="justify-content-center">
//                           <Colxx xxs="5">
//                             <div>
//                               {' '}
//                               {/* Status */}
//                               {/* <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.StatusLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="status"
//                                   id="status"
//                                   value={values.status}
//                                   options={majorOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   required
//                                 />
//                                 {errors.status && touched.status ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.status}
//                                   </div>
//                                 ) : null}
//                               </FormGroup> */}
//                               {/* hire date */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.HireDateLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <Field
//                                   className="form-control fieldStyle"
//                                   name="hireDate"
//                                   type="date"
//                                 />
//                                 {errors.hireDate && touched.hireDate ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.hireDate}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                               {/* Grade */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.teachingFieldLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="teachingField"
//                                   id="teachingField"
//                                   value={values.teachingField}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   options={fieldsOfStudy}
//                                   required
//                                 />
//                                 {errors.teachingField &&
//                                 touched.teachingField ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.teachingField}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                               {/* Grade */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.GradeLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="grade"
//                                   id="grade"
//                                   value={values.grade}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   options={gradeOptions}
//                                   required
//                                 />
//                                 {errors.grade && touched.grade ? (
//                                   <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
//                                     {errors.grade}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                               {/* Contract type */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.appointmentTypeLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="appointmentType"
//                                   id="appointmentType"
//                                   value={values.appointmentType}
//                                   options={appointmentTypeOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   required
//                                 />
//                                 {errors.appointmentType &&
//                                 touched.appointmentType ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle ">
//                                     {errors.appointmentType}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                             </div>
//                           </Colxx>
//                           <Colxx xxs="5">
//                             <div>
//                               {/* Job location*/}
//                               {/* <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.jobLocationLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="jobLocation"
//                                   id="jobLocation"
//                                   value={values.jobLocation}
//                                   options={dutyLocationOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   required
//                                 />
//                                 {errors.jobLocation && touched.jobLocation ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.jobLocation}
//                                   </div>
//                                 ) : null}
//                               </FormGroup> */}

//                               <FormGroup className="form-group has-float-label error-l-150 ">
//                                 <Label>
//                                   <IntlMessages id="forms.InstituteLabel" />
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="jobLocation"
//                                   id="jobLocation"
//                                   // value={values.jobLocation}
//                                   options={institutes}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                 />

//                                 {errors.jobLocation && touched.jobLocation ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white ">
//                                     {errors.jobLocation}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                               {/* Meduim of instruction*/}
//                               {/* <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.teachingLang" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="teachingLang"
//                                   id="teachingLang"
//                                   value={values.teachingLang}
//                                   isMulti
//                                   options={langOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   required
//                                 />
//                                 {errors.teachingLang && touched.teachingLang ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.teachingLang}
//                                   </div>
//                                 ) : null}
//                               </FormGroup> */}

//                               {/* institute language  */}
//                               <FormGroup className="form-group has-float-label">
//                                 <Label
//                                   style={{ fontSize: 18, fontWeight: 'bold' }}
//                                 >
//                                   <IntlMessages id="teacher.teachingLang" />
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="teachingLang"
//                                   id="teachingLang"
//                                   value={values.teachingLang}
//                                   options={langOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                 />
//                                 {errors.teachingLang && touched.teachingLang ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white">
//                                     {errors.teachingLang}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.StepLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="step"
//                                   id="step"
//                                   value={values.step}
//                                   options={stepOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   required
//                                 />
//                                 {errors.step && touched.step ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.step}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                               {/* Contract type */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="teacher.contractTypeLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="contractType"
//                                   id="contractType"
//                                   value={values.contractType}
//                                   options={contractTypeOptions}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   required
//                                 />
//                                 {errors.contractType && touched.contractType ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.contractType}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                             </div>
//                           </Colxx>
//                         </Row>

//                         <Row className="justify-content-center">
//                           <Colxx xxs="5">
//                             <div className="pt-5">
//                               <h1 className=" mb-4">
//                                 {
//                                   <IntlMessages id="forms.PermanentAddressLabel" />
//                                 }
//                               </h1>

//                               {/* province permanent*/}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="forms.ProvinceLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="mainProvince"
//                                   id="mainProvince"
//                                   // value={values.mainProvince}
//                                   options={provinces}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   onClick={setSelectedMainProvince(
//                                     values.mainProvince.value,
//                                   )}
//                                 />
//                                 {errors.mainProvince && touched.mainProvince ? (
//                                   <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
//                                     {errors.mainProvince}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>

//                               {/* District  permanent*/}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label
//                                   style={{ fontSize: 18, fontWeight: 'bold' }}
//                                 >
//                                   <IntlMessages id="forms.DistrictLabel" />
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="mainDistrict"
//                                   id="mainDistrict"
//                                   value={values.mainDistrict.value}
//                                   options={mainDistricts}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                 />
//                                 {errors.mainDistrict && touched.mainDistrict ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white">
//                                     {errors.mainDistrict}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>

//                               {/* mainVillage permanent */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="forms.VillageLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <Field
//                                   className="form-control fieldStyle"
//                                   name="mainVillage"
//                                 />
//                                 {errors.mainVillage && touched.mainVillage ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.mainVillage}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                             </div>
//                           </Colxx>

//                           <Colxx xxs="5">
//                             <div className="pt-5">
//                               <h1 className=" mb-4">
//                                 {' '}
//                                 {
//                                   <IntlMessages id="forms.CurrentAddresslabel" />
//                                 }
//                               </h1>

//                               {/* Current Address */}
//                               {/* province Current */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="forms.ProvinceLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="currentProvince"
//                                   id="currentProvince"
//                                   value={values.currentProvince}
//                                   options={provinces}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                   onClick={setSelectedCurrentProvince(
//                                     values.currentProvince.value,
//                                   )}
//                                 />
//                                 {errors.currentProvince &&
//                                 touched.currentProvince ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.currentProvince}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>

//                               {/* Current District */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label
//                                   style={{ fontSize: 18, fontWeight: 'bold' }}
//                                 >
//                                   <IntlMessages id="forms.DistrictLabel" />
//                                 </Label>
//                                 <FormikReactSelect
//                                   name="currentDistrict"
//                                   id="currentDistrict"
//                                   value={values.currentDistrict.value}
//                                   options={currentDistricts}
//                                   onChange={setFieldValue}
//                                   onBlur={setFieldTouched}
//                                 />
//                                 {errors.currentDistrict &&
//                                 touched.currentDistrict ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white">
//                                     {errors.currentDistrict}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>

//                               {/* village */}
//                               <FormGroup className="form-group has-float-label error-l-175">
//                                 <Label>
//                                   <IntlMessages id="forms.VillageLabel" />
//                                   <span style={{ color: 'red' }}>*</span>
//                                 </Label>
//                                 <Field
//                                   className="form-control fieldStyle"
//                                   name="currentVillage"
//                                 />
//                                 {errors.currentVillage &&
//                                 touched.currentVillage ? (
//                                   <div className="invalid-feedback d-block bg-danger text-white messageStyle">
//                                     {errors.currentVillage}
//                                   </div>
//                                 ) : null}
//                               </FormGroup>
//                             </div>
//                           </Colxx>
//                         </Row>
//                       </>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </Step>
//             <Step id="step3" hideTopNav>
//               <div className="wizard-basic-step text-center pt-3">
//                 {loading ? (
//                   <div>
//                     <Spinner color="primary" className="mb-1" />
//                     <p>
//                       <IntlMessages id="submit.waitmessage" />
//                     </p>
//                   </div>
//                 ) : (
//                   <div>
//                     <h1 className="mb-2">
//                       <IntlMessages id="wizard.content-thanks" />
//                     </h1>
//                     <h3>
//                       <IntlMessages id="wizard.registered" />
//                     </h3>
//                     <NavLink
//                       to={{
//                         pathname: '/app/teachers/register-1',
//                         state: { data: 'TEACHER' },
//                       }}
//                     >
//                       <Button className="mt-5 bg-primary">
//                         <IntlMessages id="button.back" />
//                       </Button>
//                     </NavLink>
//                   </div>
//                 )}
//               </div>
//             </Step>
//           </Steps>
//           <div style={{ marginInline: '5%' }}>
//             <BottomNavigation
//               onClickNext={onClickNext}
//               onClickPrev={onClickPrev}
//               className={` m-5  ${bottomNavHidden && 'invisible'}`}
//               prevLabel={messages['wizard.prev']}
//               nextLabel={messages['wizard.next']}
//             />
//           </div>
//         </Wizard>
//       </CardBody>
//     </Card>
//   );
// };
// export default injectIntl(TeacherRegister);
