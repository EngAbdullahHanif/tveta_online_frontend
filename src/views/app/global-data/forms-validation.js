import * as Yup from 'yup';
import IntlMessages from 'helpers/IntlMessages';

// Student Registrations form step one
export const studentRegisterFormStep_1 = Yup.object().shape({
  name1: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),
  // idCardJoldNo: Yup.string()
  //   .min(3, <IntlMessages id="min.minInputValue" />)
  //   .max(50, <IntlMessages id="max.maxInputValue" />)
  //   .required(<IntlMessages id="teacher.NameErr" />),

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

  // DoB: Yup.string().required(<IntlMessages id="forms.StdDoBErr" />),
  DoB: Yup.number()
    .min(1350, 'د تولد کال سم ندی')
    .max(1420, 'د تولد کال سم ندی')
    // .shape({
    //   value: Yup.string().required(),
    // })
    .nullable()
    .required(<IntlMessages id="forms.StdDoBErr" />),

  tazkiraType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdTazkiraTypeErr" />),

  gender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.genderErr" />),

  email: Yup.string().email(<IntlMessages id="teacher.EmailRequiredErr" />),
  disability: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable(),

  phoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
});

//  Student Registration form validation step two
export const studentRegisterFormStep_2 = Yup.object().shape({
  levelOfEducation: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  preSchool: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StPreShcoolErr" />),

  schoolProvince: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdInteranceTypeErr" />),

  // graduationYear: Yup.date().required(
  //   <IntlMessages id="forms.StdGraduationYearErr" />
  // ),
  graduationYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdGraduationYearErr" />),

  province: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),
  C_Province: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),
  C_District: Yup.object().required(<IntlMessages id="forms.DistrictErr" />),
  district: Yup.object().required(<IntlMessages id="forms.DistrictErr" />),
  village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

// Student Registration form validation step three
export const studentRegisterFormStep_3 = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  studyTime: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudyTimeErr" />),
  class: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.ClassErr" />),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.educationYearErr" />),

  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.departmentIdErr" />),
  interanceType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdInteranceTypeErr" />),
  studentType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudentTypeErr" />),

  mediumOfInstruction: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.mediumOfInstructionErr" />),

  batch: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.batchErr" />),
  studentId: Yup.number().required(<IntlMessages id="student.studentIdErr" />),

  field: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.fieldErr" />),

  sector: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.sectorErr" />),
  // student_image: Yup.mixed().required(<IntlMessages id="student.photoErr" />),
});

////////////////////////////////

//Teacher Registration form validation step one
export const teacherRegisterFormStep_1 = Yup.object().shape({
  name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  lastName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required('last name is required'),

  englishName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  englishLastName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  fatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  englishFatherName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  gender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.genderErr" />),

  grandFatherName: Yup.string()
    .required(<IntlMessages id="teacher.GrandFatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  registrationNumber: Yup.string().required(
    <IntlMessages id="teacher.TazkiraNoErr" />
  ),
  phoneNumber: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  yearOfBirth: Yup.number()
    .nullable()
    .min(
      1300,
      'د زوکړې کال باید له ۱۳۰۰ نه لوړ وي/ سال تولد باید از ۱۳۰۰ بزرگتر باشد'
    )
    .max(
      1400,
      'د زوکړې کال باید له ۱۴۰۰ نه کوچنی وي/ سال تولد باید از ۱۴۰۰ کوچکتر باشد'
    )
    .required(<IntlMessages id="forms.StdDoBErr" />),

  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.GradeErr" />),

  tazkiraType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdTazkiraTypeErr" />),

  email: Yup.string().email(<IntlMessages id="teacher.EmailRequiredErr" />),
  // .required(<IntlMessages id="teacher.EmailErr" />),
  placeOfBirth: Yup.string().required('place of birth is required'),
});

//   teacher  form validation step Two
export const teacherRegisterFormStep_2 = Yup.object().shape({
  status: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.StatusErr" />),

  teachingField: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.teachingFieldErr" />),

  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.GradeErr" />),

  appointmentType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.appointmentTypeErr" />),

  jobLocation: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.jobLocationErr" />),

  step: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="teacher.StepErr" />),

  contractType: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="teacher.contractTypeErr" />),

  teachingLang: Yup.array()
    .min(1, <IntlMessages id="teacher.teachingLangErr" />)
    .nullable()
    .required(<IntlMessages id="teacher.teachingLangErr" />),
  mainProvince: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),
  mainDistrict: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
  mainVillage: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  currentProvince: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),
  currentDistrict: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),

  currentVillage: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

//   Teacher Evaluation ValiationSchema
export const teacherEvalautionSchema = Yup.object().shape({
  id: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.IdErr" />),

  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.departmentIdErr" />),

  subject: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.SubjectErr" />),

  evaluator: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.evaluatorErr" />),

  strengthPoints: Yup.string().required(
    <IntlMessages id="teacher.strengthPointsErr" />
  ),

  marks: Yup.string().required(<IntlMessages id="teacher.marksErr" />),
  evaluationDate: Yup.string().required(
    <IntlMessages id="teacher.evaluationDateErr" />
  ),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  class: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.ClassErr" />),

  topic: Yup.string().required(<IntlMessages id="teacher.topicErr" />),

  evaluationType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.evaluationTypeErr" />),

  weaknessPoints: Yup.string().required(
    <IntlMessages id="teacher.weaknessPointsErr" />
  ),
});

// Kankor Registration
export const kankorRegisterValidationSchema = Yup.object().shape({
  studentName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="forms.StdKankorNameErr" />),

  fatherName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.FatherNameErr" />),
  kankorMarks: Yup.string().required(
    <IntlMessages id="forms.KankorMarksErr" />
  ),

  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.departmentIdErr" />),
  gender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.genderErr" />),
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),
  field: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.FieldErr" />),
  studyTime: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudyTimeErr" />),
  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.educationYearErr" />),

  province: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  district: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
});

export const teacherTransferValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),
  major: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  transferDate: Yup.string().required(
    <IntlMessages id="teacher.transferDateErr" />
  ),

  language: Yup.string().required(
    <IntlMessages id="forms.mediumOfInstructionErr" />
  ),

  appointmentType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.appointmentTypeErr" />),

  contractType: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="teacher.contractTypeErr" />),

  transferDoc: Yup.mixed()
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value) {
        const supportedFormats = ['application/pdf', 'image/jpeg', 'image/png'];
        return supportedFormats.includes(value.type);
      }
      return true; // allows undefined values
    })
    .test('fileSize', 'File too large', (value) => {
      if (value) {
        const maxSize = 1048576; // 1MB
        return value.size <= maxSize;
      }
      return true; // allows undefined values
    })
    .required(<IntlMessages id="teacher.transferDocumentLabel" />),
});

export const studentdismissalvalidationSchema = Yup.object().shape({
  dismissalDate: Yup.string().required(
    <IntlMessages id="student.dissmissalDateErr" />
  ),
  dismissalDocument: Yup.mixed()
    .test('fileType', 'Unsupported File Format', (value) => {
      if (value) {
        const supportedFormats = ['application/pdf', 'image/jpeg', 'image/png'];
        return supportedFormats.includes(value.type);
      }
      return true; // allows undefined values
    })
    .test('fileSize', 'File too large', (value) => {
      if (value) {
        const maxSize = 1048576; // 1MB
        return value.size <= maxSize;
      }
      return true; // allows undefined values
    })
    .required(<IntlMessages id="student.dissmissaldocErr" />),
});

export const studentTransferValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  transferDate: Yup.string().required(
    <IntlMessages id="teacher.transferDateErr" />
  ),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.educationYearErr" />),

  mediumOfInstruction: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.mediumOfInstructionErr" />),

  studyTime: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StudyTimeErr" />),

  // transferDocument: Yup.string().required(
  //   <IntlMessages id="student.dissmissalDocumentErr" />
  // ),
});

export const departmentChangeValidationSchema = Yup.object().shape({
  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="department.nameErr" />),
});

export const classChangeValidationSchema = Yup.object().shape({
  class: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="marks.ClassErr" />),
});

export const teacherEducationValidationSchema = Yup.object().shape({
  degree: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="Degree is Required Field" />),

  description: Yup.string(),

  institute: Yup.string().required('Institute is Required Field'),

  field_of_study: Yup.string().required('Field of Study is Required Field'),

  year_of_completion: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdGraduationYearErr" />),
  description: Yup.string(),
});

export const teacherContractValidationSchema = Yup.object().shape({
  jobType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Job Type is Required Field'),

  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Please Select a Grade'),

  step: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Step is Required Field'),

  teaching_language: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Teaching Language is Required Field'),

  hireType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Hire Type is Required Field'),

  contract_type: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Contract Type is Required'),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Institute is Required Field'),

  field: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Please Select a Grade'),

  status: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Status is Required'),
});

export const teacherEvaluationValidationSchema = Yup.object().shape({
  topic: Yup.string().required('Topic is Required Field'),
  evaluator_name: Yup.string().required('Evaluator name is required'),
  strong_points: Yup.string().required('Strong Point Required'),

  weak_points: Yup.string().required('Weak Point Required'),
  suggestions: Yup.string().required('Suggestion Required'),
  evaluation_type: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Evaluation Type is Required Field'),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Institute is Required Field'),

  department: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Department is Required Field'),

  classs: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Class is Required'),

  subject: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Subject is Required Field'),
});

export const teacherHREvaluationValidationSchema = Yup.object().shape({
  evaluator_name: Yup.string().required('Evaluator name is Required Field'),

  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Grade is Required Field'),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Institute is Required Field'),

  step: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Step is Required Field'),
});

export const teacherIncentivesValidationSchema = Yup.object().shape({
  details: Yup.string().required('Details is Required Field'),

  type: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Type is Required Field'),

  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required('Institute is Required Field'),
});
