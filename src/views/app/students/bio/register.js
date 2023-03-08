/* eslint-disable no-param-reassign */
import React, { createRef, useState, Controller, useEffect } from 'react';

import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Spinner,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import { Wizard, Steps, Step } from 'react-albus';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { injectIntl } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import BottomNavigation from 'components/wizard/BottomNavigation';
import { NotificationManager } from 'components/common/react-notifications';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import * as Yup from 'yup';

import { Colxx, Separator } from 'components/common/CustomBootstrap';

const servicePath = 'http://localhost:8000';
const studentApi = `${servicePath}/api`;
// http://localhost:8000/api/?student_id=1232

const tazkiraOptions = [
  { value: '1', label: 'الکترونیکی' },
  { value: '2', label: 'کاغذی' },
];

const EducationLevelOptions = [
  { value: '9th', label: 'نهم صنف / صنف نهم' },
  { value: '10th', label: 'لسم ټولګی/ صنف دهم' },
  { value: '11th', label: 'یوولسم ټولګی / صنف یازدهم' },
  { value: '12th', label: 'دولسم ټولګی/ صنف دوازدهم' },
  { value: '13th', label: 'دیارلسم ټولګی صنف سیزدهم' },
  { value: '14th', label: 'kjlkjk' },
];

const StdInteranceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdInteranceOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdInteranceOption_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdInteranceOption_3" /> },
];

const StudyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];

const mediumOfInstructionOptions = [
  {
    value: '1',
    label: <IntlMessages id="forms.mediumOfInstructionOption_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="forms.mediumOfInstructionOption_2" />,
  },
  {
    value: '3',
    label: <IntlMessages id="forms.mediumOfInstructionOption_3" />,
  },
  {
    value: '4',
    label: <IntlMessages id="forms.mediumOfInstructionOption_4" />,
  },
];

const educationYears = [
  { value: '1', label: <IntlMessages id="forms.educationalYearOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.educationalYearOption_2" /> },
  { value: '3', label: <IntlMessages id="forms.educationalYearOption_3" /> },
  { value: '4', label: <IntlMessages id="forms.educationalYearOption_4" /> },
  { value: '5', label: <IntlMessages id="forms.educationalYearOption_5" /> },
  { value: '6', label: <IntlMessages id="forms.educationalYearOption_6" /> },
  { value: '7', label: <IntlMessages id="forms.educationalYearOption_7" /> },
  { value: '8', label: <IntlMessages id="forms.educationalYearOption_8" /> },
  { value: '9', label: <IntlMessages id="forms.educationalYearOption_9" /> },
  { value: '10', label: <IntlMessages id="forms.educationalYearOption_10" /> },
  { value: '11', label: <IntlMessages id="forms.educationalYearOption_11" /> },
  { value: '12', label: <IntlMessages id="forms.educationalYearOption_12" /> },
  { value: '13', label: <IntlMessages id="forms.educationalYearOption_13" /> },
  { value: '14', label: <IntlMessages id="forms.educationalYearOption_14" /> },
  { value: '15', label: <IntlMessages id="forms.educationalYearOption_15" /> },
  { value: '16', label: <IntlMessages id="forms.educationalYearOption_16" /> },
  { value: '17', label: <IntlMessages id="forms.educationalYearOption_17" /> },
  { value: '18', label: <IntlMessages id="forms.educationalYearOption_18" /> },
];

const genderOptions = [
  { value: '1', label: 'نارینه/مذکر' },
  { value: '2', label: 'ښڅینه/مونث' },
];

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
const StdSchoolProvinceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" /> },
  { value: '4', label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" /> },
  { value: '5', label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" /> },
  { value: '6', label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" /> },
  { value: '7', label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" /> },
  { value: '8', label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" /> },
  { value: '9', label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" /> },
  {
    value: '10',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    value: '11',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    value: '12',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    value: '13',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    value: '14',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    value: '15',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    value: '16',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    value: '17',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    value: '18',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    value: '19',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    value: '20',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: '21',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    value: '22',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    value: '23',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    value: '24',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    value: '25',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    value: '26',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    value: '27',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    value: '28',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    value: '29',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: '30',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    value: '31',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    value: '32',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    value: '33',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    value: '34',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
];

const StudentTypeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudentTypeContiniues" /> },
  { value: '2', label: <IntlMessages id="forms.StudentTypeNonContiniues" /> },
];

const ValidationStepOne = Yup.object().shape({
  name1: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),
  idCardJoldNo: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  fatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  lastName: Yup.string()
    .required(<IntlMessages id="forms.lastNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  lastNameEng: Yup.string()
    .required(<IntlMessages id="forms.lastNameEngErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  grandFatherName: Yup.string()
    .required(<IntlMessages id="forms.grandFatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  fatherDuty: Yup.string()
    .required(<IntlMessages id="forms.StdFatherDutyErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  englishName: Yup.string()
    .required(<IntlMessages id="forms.englishNameError" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  fatherEngName: Yup.string()
    .required(<IntlMessages id="forms.FatherEnglishNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  fatherDutyLocation: Yup.string()
    .required(<IntlMessages id="forms.StdFatherDutyLocationErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),
  placeOfBirth: Yup.string()
    .required(<IntlMessages id="forms.StdPlaceOfBirthErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  tazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),
  phoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  DoB: Yup.date().required(<IntlMessages id="forms.StdDoBErr" />),

  tazkiraType: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StdTazkiraTypeErr" />)
    : null,

  gender: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.genderErr" />)
    : null,

  email: Yup.string()
    .email(<IntlMessages id="teacher.EmailRequiredErr" />)
    .required(<IntlMessages id="teacher.EmailErr" />),
});

const ValidationStepTwo = Yup.object().shape({
  levelOfEducation: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="teacher.LevelOfEducationErr" />)
    : null,

  preSchool: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StPreShcoolErr" />),

  schoolProvince: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StdInteranceTypeErr" />)
    : null,

  graduationYear: Yup.date().required(
    <IntlMessages id="forms.StdGraduationYearErr" />
  ),
  province: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
    : null,

  C_Province: updateMode
    ? Yup.object()
        .shape({ value: Yup.string().required() })
        .nullable()
        .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
    : null,

  C_District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

const ValidationStepThree = Yup.object().shape({
  institute: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.InstituteErr" />)
    : null,

  studyTime: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StudyTimeErr" />)
    : null,

  class: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="marks.ClassErr" />)
    : null,

  educationalYear: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.educationYearErr" />)
    : null,

  department: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="teacher.departmentIdErr" />)
    : null,

  interanceType: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StdInteranceTypeErr" />)
    : null,

  studentType: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StudentTypeErr" />)
    : null,

  mediumOfInstruction: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.mediumOfInstructionErr" />)
    : null,

  batch: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.batchErr" />)
    : null,

  kankorId: Yup.string().required(<IntlMessages id="forms.kankorIdErr" />),
});

const updateMode = true;
const StudentRegistration = ({ intl }, values) => {
  const { studentId } = useParams();
  console.log('studentID', studentId);

  if (studentId) {
    useEffect(() => {
      async function fetchStudent() {
        const { data } = await axios.get(
          `${studentApi}/?student_id=${studentId}`
        );
        //  console.log(data[0].name, 'object of the data');
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
        setInitialLevelOfEducation(EducationLevelOptions[1]);

        // const studentFinishGrade = EducationLevelOptions.map(
        //   (finishedGrade) => {
        //     if (EducationLevelOptions.label === data[0].finished_grade) {
        //       setInitialLevelOfEducation(EducationLevelOptions[1]);
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
        setInitialKankorId(data[0].kankor_id);
        setInitialClass(data[0].graduat_12_types);
        setInitialInteranceType(data[0].internse_type);
        setInitialDepartment(data[0].kankor_id);
        setInitialBatch(data[0].kankor_id);
        setInitialMediumOfInstruction(data[0].kankor_id);
        setInitialStudyTime(data[0].kankor_id);
        setInitialStudentType(data[0].student_type);
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }

  const TestData = {
    name1: 'Hamid',
    LastName: 'Ahmad',
    FatherName: 'Rabi',
    GrandFatherName: 'Malik',
    FatherDuty: 'Teacher',
    LastNameEng: 'Samimn',
    PhoneNo: '12321',
    EnglishName: 'Mohammad',
    FatherEngName: 'Mahdi',
    Gender: 'Male',
    FatherDutyLocation: 'Logar',
    PlaceOfBirth: 'Logar',
    TazkiraNo: '3423423',
    DoB: '2022-08-12',
    TazkiraType: 'Elctornic',
    Email: '123@gmail.com',
    IdCardPageNo: '35443',
    IdCardJoldNo: '34',
    Status: 'Active',
    LevelOfEducation: 'bachelor',
    PreSchool: 'Ghazi',
    GraduationYear: '2022-08-12',
    SchoolProvince: '321243sd',
    Province: 'Kabul',
    C_Province: 'Kabul',
    District: 'Jabul Saraj',
    C_District: 'C-Jabul Saraj',
    Village: 'Karti Char',
    C_Village: 'C-Karti Char',

    Institute: 'Nima',
    Class: '12th',
    EducationalYear: '1201',
    KankorId: '12-f12',
    InteranceType: 'Kankor',
    Department: 'biology',
    Batch: '12',
    MediumOfInstruction: 'Dari',
    StudyTime: 'morning',
    StudentType: 'morning',
  };

  const [initialname1, setInitialname1] = useState('');
  const [initialLastName, setInitialLastName] = useState('');
  const [initialFatherName, setInitialFatherName] = useState('');

  const [initialGrandFatherName, setInitialGrandFatherName] = useState('');
  const [initialFatherDuty, setInitialFatherDuty] = useState('');
  const [initialLastNameEng, setInitialLastNameEng] = useState();
  const [initialGender, setInitialGender] = useState('');
  const [initialEnglishName, setInitialEnglishName] = useState('');
  const [initialPhoneNo, setInitialPhoneNo] = useState();
  const [initialDoB, setInitialDoB] = useState();
  const [initialFatherDutyLocation, setInitialFatherDutyLocation] =
    useState('');
  const [initialTazkiraType, setInitialTazkiraType] = useState([]);
  const [initialFatherEngName, setInitialFatherEngName] = useState('');
  const [initialPlaceOfBirth, setInitialPlaceOfBirth] = useState('');
  const [initialTazkiraNo, setInitialTazkiraNo] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [initialIdCardPageNo, setInitialIdCardPageNo] = useState('');
  const [initialIdCardJoldNo, setInitialIdCardJoldNo] = useState('456');
  const [initialLevelOfEducation, setInitialLevelOfEducation] = useState([]);
  const [initialPreSchool, setInitialPreSchool] = useState('');
  const [initialGraduationYear, setInitialGraduationYear] = useState('');
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
  const [initialKankorId, setInitialKankorId] = useState('');
  const [initialInteranceType, setInitialInteranceType] = useState([]);
  const [initialDepartment, setInitialDepartment] = useState([]);
  const [initialBatch, setInitialBatch] = useState([]);
  const [initialMediumOfInstruction, setInitialMediumOfInstruction] = useState(
    []
  );
  const [initialStudyTime, setInitialStudyTime] = useState([]);
  const [initialStudentType, setInitialStudentType] = useState([]);

  const [isNext, setIsNext] = useState(false);
  const handleClick = (event) => {
    setIsNext(event);
  };
  const onRegister = (values) => {
    // if (!values) {
    //   return;
    // }
    //send data to server
    const data = {
      std_id: '1',
      name: values.name1,
      Eng_name: values.englishName,
      father_name: values.fatherName,
      Eng_father_name: values.fatherEngName,
      cover_number: values.idCardCover,
      page_number: values.idCardPageNo,
      registration_number: values.tazkiraNo,
      Sukuk_number: values.idCardSakukNo,
      main_province: values.province.value,
      main_district: values.district,
      main_village: values.dillage,
      current_province: values.C_Province.value,
      current_district: values.C_District,
      current_village: values.C_Village,
      birth_date: values.DoB,
      fatherـprofession: values.fatherDuty,
      fatherـplaceـofـduty: values.fatherDutyLocation,
      finished_grade: values.educationLevel.value,
      // finished_grade_year: values.StdGraduationYear,
      finished_grade_year: 2022,
      school: values.preShcool,
      schoolـprovince: values.schoolProvince.value,
      study_types: 1,
      // study_types: add study types (فارغ، جاری، منفک)
      student_type: values.studentType.value,
      internse_type: values.interanceType.value,
      // std_photo: values,
      // Documents: 'images/2.jpg',

      //add student photo

      //add more documents
    };
    console.log('data', data);

    axios
      .post('http://localhost:8000/api/', data)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({});
  const [LevelOfEducation, setLevelOfEducation] = useState('');
  const [TazkiraType, setTazkiraType] = useState('0');
  const [Province, setProvince] = useState('0');
  const [CurrentProvince, setCurrentProvince] = useState('0');
  const [InteranceType, setInteranceType] = useState('0');
  const [SchoolProvince, setSchoolProvince] = useState('0');
  const [StudentType, setStudentType] = useState('0');
  const [Gender, setGender] = useState('0');

  const onClickNext = (goToNext, steps, step, values) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    if (step.id === 'step1') {
      setTazkiraType(form.values.tazkiraType.value);
      setGender(form.values.gender.value);
    }
    if (step.id === 'step2') {
      //
      setLevelOfEducation(form.values.levelOfEducation.value);
      setSchoolProvince(form.values.schoolProvince.value);
      //
      setProvince(form.values.province.value);
      setCurrentProvince(form.values.C_Province.value);
    }

    if (step.id === 'step3') {
      setInteranceType(form.values.interanceType.value);
      setStudentType(form.values.studentType.value);
    }
    console.log(step.id, 'stepoId');
    console.log('First Step (Form) Values', form.values);
    form.submitForm().then(() => {
      if (!form.isDirty && form.isValid) {
        const newFields = { ...fields, ...form.values };
        setFields(newFields);
        if (steps.length - 2 <= steps.indexOf(step)) {
          setBottomNavHidden(true);
          setLoading(true);
          console.log(newFields, 'Final Values');
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
      <h3 className="mt-5 m-5">
        {<IntlMessages id="forms.studentRegisterTitle" />}
      </h3>
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
                  }}
                  validateOnMount
                  validationSchema={ValidationStepOne}
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
                      className="av-tooltip tooltip-label-right has-float-label error-l-100 "
                      style={{ paddingInline: '3%' }}
                    >
                      <Row>
                        <Colxx xxs="6">
                          <div className="p-3">
                            {/* Name */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdName" />
                              </Label>
                              <Field className="form-control" name="name1" />
                              {errors.name1 && touched.name1 ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.name1}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* lastname */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.lastName" />
                              </Label>
                              <Field className="form-control" name="lastName" />
                              {errors.lastName && touched.lastName ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.lastName}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Father Name */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdFatherName" />
                              </Label>
                              <Field
                                className="form-control"
                                name="fatherName"
                              />
                              {errors.fatherName && touched.fatherName ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.fatherName}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* grandFatherName */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.grandFatherName" />
                              </Label>
                              <Field
                                className="form-control"
                                name="grandFatherName"
                              />
                              {errors.grandFatherName &&
                              touched.grandFatherName ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.grandFatherName}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Father Duty */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdFatherDutyLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="fatherDuty"
                              />
                              {errors.fatherDuty && touched.fatherDuty ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.fatherDuty}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Tazkira Type */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.TazkiraType" />
                              </Label>

                              <FormikReactSelect
                                name="tazkiraType"
                                id="tazkiraType"
                                value={values.tazkiraType}
                                options={tazkiraOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.tazkiraType && !TazkiraType ? (
                                <div className="invalid-feedback d-block   bg-danger text-white">
                                  {errors.tazkiraType}
                                </div>
                              ) : null}
                            </FormGroup>

                            {values.tazkiraType.value === '2' ? (
                              <div>
                                {/* Safha */}
                                <div>
                                  <FormGroup className="form-group has-float-label error-l-100">
                                    <Label>
                                      <IntlMessages id="teacher.IdCardPageNoLabel" />
                                    </Label>
                                    <Field
                                      className="form-control"
                                      name="idCardPageNo"
                                      type="number"
                                    />
                                    {errors.idCardPageNo &&
                                    touched.idCardPageNo ? (
                                      <div className="invalid-feedback d-block  bg-danger text-white">
                                        {errors.idCardPageNo}
                                      </div>
                                    ) : null}
                                  </FormGroup>
                                </div>
                              </div>
                            ) : (
                              <div></div>
                            )}

                            {/* Date Of Birth */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="teacher.DoBLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="DoB"
                                type="date"
                              />
                              {errors.DoB && touched.DoB ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.DoB}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Contact No */}
                            <FormGroup className="form-group has-float-label error-l-100 ">
                              <Label>
                                <IntlMessages id="teacher.PhoneNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="phoneNo"
                                type="number"
                              />
                              {errors.phoneNo && touched.phoneNo ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.phoneNo}
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
                              </Label>
                              <Field
                                className="form-control"
                                name="englishName"
                              />
                              {errors.englishName && touched.englishName ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
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
                                className="form-control"
                                name="lastNameEng"
                              />
                              {errors.lastNameEng && touched.lastNameEng ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.lastNameEng}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/*Students Father English Name */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.Std_father_Eng_Name" />
                              </Label>
                              <Field
                                className="form-control"
                                name="fatherEngName"
                              />
                              {errors.fatherEngName && touched.fatherEngName ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.fatherEngName}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Gender */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="gender.gender" />
                              </Label>
                              <FormikReactSelect
                                name="gender"
                                id="gender"
                                value={values.gender}
                                options={genderOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {!Gender && errors.gender ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.gender}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Father duty place */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="fatherDutyLocation"
                              />
                              {errors.fatherDutyLocation &&
                              touched.fatherDutyLocation ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.fatherDutyLocation}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Tazkira Number */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="teacher.TazkiraNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="tazkiraNo"
                                type="number"
                              />
                              {errors.tazkiraNo && touched.tazkiraNo ? (
                                <div className="invalid-feedback d-block  bg-danger text-white">
                                  {errors.tazkiraNo}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Place of birth */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.PlaceOfBirthLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="placeOfBirth"
                              />
                              {errors.placeOfBirth && touched.placeOfBirth ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.placeOfBirth}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* {values.tazkiraType.value === '' ? (

                            ) : (
                              <div></div>
                            )} */}
                            <div>
                              {/* Jold Number */}
                              <div>
                                <FormGroup className="form-group has-float-label error-l-100">
                                  <Label>
                                    <IntlMessages id="teacher.IdCardJoldNoLabel" />
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="idCardJoldNo"
                                    type="string"
                                  />
                                  {errors.idCardJoldNo &&
                                  touched.idCardJoldNo ? (
                                    <div className="invalid-feedback d-block  bg-danger text-white">
                                      {errors.idCardJoldNo}
                                    </div>
                                  ) : null}
                                </FormGroup>
                              </div>
                            </div>
                            {/* Email Address */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="teacher.EmailLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="email"
                                type="email"
                              />
                              {errors.email && touched.email ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
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
                  initialValues={{
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
                  }}
                  onSubmit={() => {}}
                  validationSchema={ValidationStepTwo}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right">
                      <>
                        <Row style={{ marginInline: '2%' }}>
                          {' '}
                          <Colxx xxs="6" className="pt-3">
                            <div className="p-3">
                              {/* Education */}
                              <FormGroup className="form-group has-float-label error-l-100 ">
                                <Label>
                                  <IntlMessages id="teacher.LevelOfEducationLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="levelOfEducation"
                                  id="levelOfEducation"
                                  value={values.levelOfEducation}
                                  options={EducationLevelOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                  required
                                />
                                {errors.levelOfEducation &&
                                !LevelOfEducation ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.levelOfEducation}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/* Student Maktab*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.StPreShcoolLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="preSchool"
                                />
                                {errors.preSchool && touched.preSchool ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.preSchool}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                          <Colxx xxs="6" className="pt-3">
                            <div className="square p-3 ">
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.StdGraduationYearLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="graduationYear"
                                  type="date"
                                />
                                {errors.graduationYear &&
                                touched.graduationYear ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.graduationYear}
                                  </div>
                                ) : null}
                              </FormGroup>
                              {/*School province*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.StdSchoolProvinceLabel" />
                                </Label>
                                <FormikReactSelect
                                  name="schoolProvince"
                                  id="schoolProvince"
                                  value={values.schoolProvince}
                                  options={StdSchoolProvinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.schoolProvince && !SchoolProvince ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.schoolProvince}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </div>
                          </Colxx>
                        </Row>

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
                                </Label>
                                <FormikReactSelect
                                  name="province"
                                  id="province"
                                  value={values.province}
                                  options={StdSchoolProvinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.province && !Province ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District  permanent*/}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="district"
                                />
                                {errors.district && touched.district ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.district}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village permanent */}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="village"
                                />
                                {errors.village && touched.village ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
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
                                </Label>
                                <FormikReactSelect
                                  name="C_Province"
                                  id="C_Province"
                                  value={values.C_Province}
                                  options={StdSchoolProvinceOptions}
                                  onChange={setFieldValue}
                                  onBlur={setFieldTouched}
                                />
                                {errors.C_Province && !CurrentProvince ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.C_Province}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* District */}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.DistrictLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="C_District"
                                />
                                {errors.C_District && touched.C_District ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.C_District}
                                  </div>
                                ) : null}
                              </FormGroup>

                              {/* village */}
                              <FormGroup className="form-group has-float-label error-l-100">
                                <Label>
                                  <IntlMessages id="forms.VillageLabel" />
                                </Label>
                                <Field
                                  className="form-control"
                                  name="C_Village"
                                />
                                {errors.C_Village && touched.C_Village ? (
                                  <div className="invalid-feedback d-block bg-danger text-white">
                                    {errors.C_Village}
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
                    institute: initialInstitute,
                    class: initialClass,
                    educationalYear: initialEducationalYear,
                    department: initialDepartment,
                    mediumOfInstruction: initialMediumOfInstruction,
                    kankorId: initialKankorId,
                    studyTime: initialStudyTime,
                    interanceType: initialInteranceType,
                    studentType: initialStudentType,
                    batch: initialBatch,
                  }}
                  onSubmit={() => {}}
                  validationSchema={ValidationStepThree}
                  validateOnMount
                >
                  {({
                    errors,
                    touched,
                    values,
                    setFieldTouched,
                    setFieldValue,
                  }) => (
                    <Form className="av-tooltip tooltip-label-right error-l-100">
                      <>
                        <Row style={{ marginInline: '2%' }}>
                          {' '}
                          <Colxx xxs="6">
                            {/* Institute Name*/}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.InstituteLabel" />
                              </Label>

                              <FormikReactSelect
                                name="institute"
                                id="institute"
                                value={values.institute}
                                options={StdInteranceOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.institute && touched.institute ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.institute}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/*  Class Id  */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="marks.ClassLabel" />
                              </Label>
                              <FormikReactSelect
                                name="class"
                                id="class"
                                value={values.class}
                                options={StdInteranceOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.class && touched.class ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.class}
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
                                options={educationYears}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.educationalYear &&
                              touched.educationalYear ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.educationalYear}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* kankor Id */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.kankorId" />
                              </Label>
                              <Field className="form-control" name="kankorId" />
                              {errors.kankorId && touched.kankorId ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.kankorId}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* internse type*/}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StdInteranceTypeLabel" />
                              </Label>
                              <FormikReactSelect
                                name="interanceType"
                                id="interanceType"
                                value={values.interanceType}
                                options={StdInteranceOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.interanceType && !InteranceType ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.interanceType}
                                </div>
                              ) : null}
                            </FormGroup>
                          </Colxx>
                          <Colxx xxs="6">
                            {/* Departement  */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.studyDepartment" />
                              </Label>
                              <FormikReactSelect
                                name="department"
                                id="department"
                                value={values.department}
                                options={StdInteranceOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.department && touched.department ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.department}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Batch */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.batch" />
                              </Label>
                              <FormikReactSelect
                                name="batch"
                                id="batch"
                                value={values.batch}
                                options={StdInteranceOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.batch && touched.batch ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.batch}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* medium OfInstruction (Teaching Language) */}
                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                <IntlMessages id="forms.mediumOfInstruction" />
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
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.mediumOfInstruction}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Study Time */}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StudyTimeLabel" />
                              </Label>
                              <FormikReactSelect
                                name="studyTime"
                                id="studyTime"
                                value={values.studyTime}
                                options={StudyTimeOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.studyTime && touched.studyTime ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
                                  {errors.studyTime}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/*Student Type*/}
                            <FormGroup className="form-group has-float-label error-l-100">
                              <Label>
                                <IntlMessages id="forms.StudentTypeLabel" />
                              </Label>
                              <FormikReactSelect
                                name="studentType"
                                id="studentType"
                                value={values.studentType}
                                options={StudentTypeOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                              />
                              {errors.studentType && !StudentType ? (
                                <div className="invalid-feedback d-block bg-danger text-white">
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
                    <Button
                      className="mt-5 bg-primary"
                      onClick={() => window.location.reload()}
                    >
                      <IntlMessages id="button.back" />
                    </Button>
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
