import * as Yup from 'yup';
import IntlMessages from 'helpers/IntlMessages';
import { EDUCATIONAL_YEAR_VALIDATOR } from '../ui/forms/validations';

// Student Registrations form step one
export const studentRegisterFormStep_1 = Yup.object().shape({
  // maktoobNumber: Yup.string().required('مکتوب نمبر الزامی است'),
  // maktoobDate: Yup.string().required('مکتوب تاریخ الزامی است'),
  name1: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  fatherName: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  lastName: Yup.string()
    .nullable()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  lastNameEng: Yup.string()
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
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  fatherEngName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  fatherDutyLocation: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),
  placeOfBirth: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  tazkiraNo: Yup.string().when('tazkiraType.value', {
    is: 'electronic',
    then: Yup.string().required(
      'نمبر تذکره الکترونی الزامی است وقتی نوع تذکره الکترونی باشد',
    ),
    otherwise: Yup.string(),
  }),

  //Step 2
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
  graduationYear: EDUCATIONAL_YEAR_VALIDATOR,
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
  C_District: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
  district: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
  village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),

  //Step 3
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  disability: Yup.object().when('institute.rest.type', {
    is: 'special_education',
    then: Yup.string().required(
      'وقتی که انستتیوت تعلیمات خاص باشد، اضافه کردن معلولیت/معیوبیت الزامی است.',
    ),
    otherwise: Yup.object().nullable(),
  }),

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

  educationalYear: EDUCATIONAL_YEAR_VALIDATOR,
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
  // kankorId: Yup.string().required('ایدی کانکور الزامی است'),
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
  studentId: Yup.number().required(<IntlMessages id="student.studentIdErr" />),

  DoB: Yup.number()
    .min(1350, 'سال تولد درست نیست/د تولد کال سم ندی')
    .max(1420, 'سال تولد درست نیست/د تولد کال سم ندی')
    .nullable()
    .required(<IntlMessages id="forms.StdDoBErr" />),
  monthOfBirth: Yup.number()
    .min(1, 'ماه تولد درست نیست / د تولد میاشت سم ندی')
    .max(12, 'ماه تولد درست نیست / د تولد میاشت سم ندی')
    .nullable(),
  dayOfBirth: Yup.number()
    .min(1, ' روز تولد درست نیست / د تولد ورځ سم ندی')
    .max(31, ' روز تولد درست نیست / د تولد ورځ سم ندی')
    .nullable(),

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

  idCardJoldNo: Yup.string().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.string().required(
      'شماره جلد الزامی است وقتی نوع تذکره کاغذی است',
    ),
    otherwise: Yup.string(),
  }),

  idCardPageNo: Yup.number().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.number().required('صفحه الزامی است وقتی نوع تذکره کاغذی است'),
    otherwise: Yup.number(),
  }),

  sabtNo: Yup.number().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.number().required(
      'شماره ثبت الزامی است وقتی نوع تذکره کاغذی است',
    ),
    otherwise: Yup.number(),
  }),

  sokokNo: Yup.string().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.string().required(
      'شماره صکوک الزامی است وقتی نوع تذکره کاغذی است',
    ),
    otherwise: Yup.string(),
  }),
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
  graduationYear: EDUCATIONAL_YEAR_VALIDATOR,
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
  C_District: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
  district: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
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

  disability: Yup.object().when('institute.rest.type', {
    is: 'special_education',
    then: Yup.string().required(
      'وقتی که انستتیوت تعلیمات خاص باشد، اضافه کردن معلولیت/معیوبیت الزامی است.',
    ),
    otherwise: Yup.object().nullable(),
  }),

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

  educationalYear: EDUCATIONAL_YEAR_VALIDATOR,
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

  // batch: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="forms.batchErr" />),
  studentId: Yup.number().required(<IntlMessages id="student.studentIdErr" />),

  // field: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="forms.fieldErr" />),

  // sector: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="forms.sectorErr" />),
  // student_image: Yup.mixed().required(<IntlMessages id="student.photoErr" />),
});

////////////////////////////////

//Teacher Registration form validation step one
export const teacherRegisterFormStep_1 = Yup.object().shape({
  name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="teacher.NameErr" />),

  father_name: Yup.string()
    .required(<IntlMessages id="teacher.FatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  last_name: Yup.string()
    .required(<IntlMessages id="forms.lastNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  english_last_name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  grandfather_name: Yup.string()
    .required(<IntlMessages id="forms.grandFatherNameErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  english_name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  english_father_name: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  place_of_birth: Yup.string()
    .required(<IntlMessages id="forms.StdPlaceOfBirthErr" />)
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />),

  tazkiraNo: Yup.string().when('tazkiraType.value', {
    is: 'electronic',
    then: Yup.string().required(
      'نمبر تذکره الکترونی الزامی است وقتی نوع تذکره الکترونی باشد',
    ),
    otherwise: Yup.string(),
  }),

  // DoB: Yup.string().required(<IntlMessages id="forms.StdDoBErr" />),
  year_of_birth: Yup.number()
    .min(1300, 'سال تولد درست نیست/د تولد کال سم ندی')
    .max(1420, 'سال تولد درست نیست/د تولد کال سم ندی')
    .nullable()
    .required(<IntlMessages id="forms.StdDoBErr" />),
  month_of_birth: Yup.number()
    .min(1, 'ماه تولد درست نیست / د تولد میاشت سم ندی')
    .max(12, 'ماه تولد درست نیست / د تولد میاشت سم ندی')
    // .shape({
    //   value: Yup.string().required(),
    // })
    .nullable(),
  day_of_birth: Yup.number()
    .min(1, ' روز تولد درست نیست / د تولد ورځ سم ندی')
    .max(31, ' روز تولد درست نیست / د تولد ورځ سم ندی')
    // .shape({
    //   value: Yup.string().required(),
    // })
    .nullable(),

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

  phone_number: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),
  idCardJoldNo: Yup.string().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.string().required(
      'شماره جلد الزامی است وقتی نوع تذکره کاغذی است',
    ),
    otherwise: Yup.string(),
  }),

  idCardPageNo: Yup.number().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.number().required('صفحه الزامی است وقتی نوع تذکره کاغذی است'),
    otherwise: Yup.number(),
  }),

  sabtNo: Yup.number().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.number().required(
      'شماره ثبت الزامی است وقتی نوع تذکره کاغذی است',
    ),
    otherwise: Yup.number(),
  }),

  sokokNo: Yup.string().when('tazkiraType.value', {
    is: 'paper',
    then: Yup.string().required(
      'شماره صکوک الزامی است وقتی نوع تذکره کاغذی است',
    ),
    otherwise: Yup.string(),
  }),
  grade: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.GradeErr" />),
  step: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="teacher.stepErr" />),
  main_province: Yup.object()
    .shape({
      value: Yup.string().required(<IntlMessages id="forms.ProvinceErr" />),
    })
    .nullable()
    .required(<IntlMessages id="forms.ProvinceErr" />),
  current_province: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),
  current_district: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
  main_district: Yup.object()
    .shape({ value: Yup.string().required() })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
  main_village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  current_village: Yup.string().required(
    <IntlMessages id="forms.VillageErr" />,
  ),
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
  // id: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="teacher.IdErr" />),

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
    <IntlMessages id="teacher.strengthPointsErr" />,
  ),

  marks: Yup.string().required(<IntlMessages id="teacher.marksErr" />),
  evaluationDate: Yup.string().required(
    <IntlMessages id="teacher.evaluationDateErr" />,
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
    <IntlMessages id="teacher.weaknessPointsErr" />,
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
    <IntlMessages id="forms.KankorMarksErr" />,
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
  // field: Yup.object()
  //   .shape({
  //     value: Yup.string().required(),
  //   })
  //   .nullable()
  //   .required(<IntlMessages id="forms.FieldErr" />),
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
      label: Yup.string().required(),
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
    <IntlMessages id="teacher.transferDateErr" />,
  ),

  language: Yup.string().required(
    <IntlMessages id="forms.mediumOfInstructionErr" />,
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
    <IntlMessages id="student.dissmissalDateErr" />,
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
    <IntlMessages id="teacher.transferDateErr" />,
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
