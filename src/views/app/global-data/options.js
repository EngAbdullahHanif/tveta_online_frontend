import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';

export const fetchProvinces = async () => {
  const response = await callApi('core/provinces');
  if (response) {
    if (response.status === 200) {
      return response.data.map((province) => ({
        value: province.id,
        label: province.native_name,
      }));
    } else {
      throw new Error(response.problem);
    }
  }
  console.log(response);
};
export const fetchDistricts = async (province_id) => {
  console.log('getting districts of province with id: ', province_id);
  let url = 'core/districts/';
  if (province_id) {
    url = url + `?province=${province_id}`;
  }
  const response = await callApi(url);

  if (response.status === 200) {
    return response.data.map((district) => ({
      value: district.id,
      label: district.native_name,
    }));
  } else {
    throw new Error(response.problem);
  }
};

export const provinceOptions = [
  {
    value: 'بدخشان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" />,
  },
  {
    value: 'بادغیس',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" />,
  },
  {
    value: 'بغلان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" />,
  },
  {
    value: 'بلخ',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" />,
  },
  {
    value: 'بامیان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" />,
  },
  {
    value: 'دایکندی',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" />,
  },
  {
    value: 'فراه',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" />,
  },
  {
    value: 'فاریاب',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" />,
  },
  {
    value: 'غزنی',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" />,
  },
  {
    value: 'غور',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    value: 'هلمند',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    value: 'هرات',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    value: 'جوزجان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    value: 'شهر کابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    value: 'کابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    value: 'کندهار',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    value: 'کاپیسا',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    value: 'خوست',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    value: 'کنر',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    value: 'کندز',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_20" />,
  },
  {
    value: 'لغمان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    value: 'لوگر',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    value: 'ننگرهار',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    value: 'نیمروز',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    value: 'نورستان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    value: 'پکتیا',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    value: 'پکتیکا',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    value: 'پنجشیر',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    value: 'پروان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    value: 'سمنگان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    value: 'سرپل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    value: 'تخار',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    value: 'اروزگان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    value: 'وردگ',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
  {
    value: 'زابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_35" />,
  },
  {
    value: 'Lahore',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_35" />,
  },
];

export const educationalYearsOptions = [
  { value: '1390', label: '1390' },
  { value: '1391', label: '1391' },
  { value: '1392', label: '1392' },
  { value: '1393', label: '1393' },
  { value: '1394', label: '1394' },
  { value: '1395', label: '1395' },
  { value: '1396', label: '1396' },
  { value: '1397', label: '1397' },
  { value: '1398', label: '1398' },
  { value: '1399', label: '1399' },
  { value: '1400', label: '1400' },
  { value: '1401', label: '1401' },
  { value: '1402', label: '1402' },
  { value: '1403', label: '1403' },
  { value: '1404', label: '1404' },
  { value: '1405', label: '1405' },
  { value: '1406', label: '1406' },
  { value: '1407', label: '1407' },
  { value: '1408', label: '1408' },
  { value: '1409', label: '1409' },
  { value: '1410', label: '1410' },
];

export const dateOfBirthOptoions = [
  { value: '1370', label: '1370' },
  { value: '1371', label: '1371' },
  { value: '1372', label: '1372' },
  { value: '1373', label: '1373' },
  { value: '1374', label: '1374' },
  { value: '1375', label: '1375' },
  { value: '1376', label: '1376' },
  { value: '1377', label: '1377' },
  { value: '1378', label: '1378' },
  { value: '1379', label: '1379' },
  { value: '1380', label: '1380' },
  { value: '1381', label: '1381' },
  { value: '1382', label: '1382' },
  { value: '1383', label: '1383' },
  { value: '1384', label: '1384' },
  { value: '1385', label: '1385' },
  { value: '1386', label: '1386' },
  { value: '1387', label: '1387' },
  { value: '1388', label: '1388' },
  { value: '1389', label: '1389' },
  { value: '1390', label: '1390' },
  { value: '2022', label: '2022' },
];

export const educationalYearsOptionsForList = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: '1390', label: '1390' },
  { value: '1391', label: '1391' },
  { value: '1392', label: '1392' },
  { value: '1393', label: '1393' },
  { value: '1394', label: '1394' },
  { value: '1395', label: '1395' },
  { value: '1396', label: '1396' },
  { value: '1397', label: '1397' },
  { value: '1398', label: '1398' },
  { value: '1399', label: '1399' },
  { value: '1400', label: '1400' },
  { value: '1401', label: '1401' },
  { value: '1402', label: '1402' },
  { value: '1403', label: '1403' },
  { value: '1404', label: '1404' },
  { value: '1405', label: '1405' },
  { value: '1406', label: '1406' },
  { value: '1407', label: '1407' },
  { value: '1408', label: '1408' },
  { value: '1409', label: '1409' },
  { value: '1410', label: '1410' },
];

export const batchOptions = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: '9',
  },
  {
    value: 10,
    label: '10',
  },
];

export const genderOptions = [
  {
    value: 'male',
    label: <IntlMessages id="institute.studentgenderOption_1" />,
  },
  {
    value: 'female',
    label: <IntlMessages id="institute.studentgenderOption_2" />,
  },
];

export const mediumOfInstructionOptions = [
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

export const StdInteranceOptions = [
  { value: 'decree', label: <IntlMessages id="forms.StdInteranceOption_1" /> },
  {
    value: 'institute_kankor',
    label: <IntlMessages id="forms.StdInteranceOption_2" />,
  },
  {
    value: 'general_kankor',
    label: <IntlMessages id="forms.StdInteranceOption_3" />,
  },
];

export const disabilityOptions = [
  {
    value: 'deaf',
    label: 'ناشنوا/کوڼ',
  },
  {
    value: 'blind',
    label: 'نابینا/ړوند',
  },
  {
    value: 'mute',
    label: 'گنگ/ګنګ',
  },
];

export const StudentTypeOptions = [
  {
    value: 'continuous',
    label: <IntlMessages id="forms.StudentTypeContiniues" />,
  },
  {
    value: 'noncontinuous',
    label: <IntlMessages id="forms.StudentTypeNonContiniues" />,
  },
];

export const InstituteShiftOptions = [
  { value: 'morning', label: <IntlMessages id="forms.morningShift" /> },
  { value: 'afternoon', label: <IntlMessages id="forms.afternoonShift" /> },
  { value: 'night', label: <IntlMessages id="forms.nightShift" /> },
  {
    value: 'morning_afternoon',
    label: <IntlMessages id="forms.morningAfternoonShift" />,
  },
  {
    value: 'morning_night',
    label: <IntlMessages id="forms.morningNightShift" />,
  },
  {
    value: 'afternoon_night',
    label: <IntlMessages id="forms.afternoonNightShift" />,
  },
  {
    value: 'morning_afternoon_night',
    label: <IntlMessages id="forms.allShifts" />,
  },
];

export const studyTimeOptions = [
  { value: 'morning', label: <IntlMessages id="forms.morningShift" /> },
  { value: 'afternoon', label: <IntlMessages id="forms.afternoonShift" /> },
  { value: 'night', label: <IntlMessages id="forms.nightShift" /> },
];

export const chanceOptions = [
  { value: 1, label: <IntlMessages id="marks.firstChance" /> },
  {
    value: 2,
    label: <IntlMessages id="marks.secondChance" />,
  },
];

export const studyTimeOptionsForList = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },

  { column: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { column: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];

export const provincesOptionsForList = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  {
    column: 'بدخشان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" />,
  },
  {
    column: 'بادغیس',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" />,
  },
  {
    column: 'بغلان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" />,
  },
  {
    column: 'بلخ',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" />,
  },
  {
    column: 'بامیان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" />,
  },
  {
    column: 'دایکندی',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" />,
  },
  {
    column: 'فراه',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" />,
  },
  {
    column: 'فاریاب',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" />,
  },
  {
    column: 'غزنی',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" />,
  },
  {
    column: 'غور',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    column: 'هلمند',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    column: 'هرات',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    column: 'جوزجان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    column: 'شهر کابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    column: 'کابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    column: 'کندهار',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    column: 'کاپیسا',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    column: 'خوست',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    column: 'کنر',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    column: 'کندز',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_20" />,
  },
  {
    column: 'لغمان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    column: 'لوگر',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    column: 'ننگرهار',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    column: 'نیمروز',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    column: 'نورستان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    column: 'پکتیا',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    column: 'پکتیکا',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    column: 'پنجشیر',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    column: 'پروان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    column: 'سمنگان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    column: 'سرپل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    column: 'تخار',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    column: 'اروزگان',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    column: 'وردگ',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
  {
    column: 'زابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_35" />,
  },
];

export const contractTypeOptions = [
  {
    value: '1',
    label: <IntlMessages id="teacher.contractTypeOptions_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="teacher.contractTypeOptions_2" />,
  },
];

export const gradeOptions = [
  { value: 3, label: <IntlMessages id="teacher.GradeOption_3" /> },
  { value: 4, label: <IntlMessages id="teacher.GradeOption_4" /> },
  { value: 5, label: <IntlMessages id="teacher.GradeOption_5" /> },
  { value: 6, label: <IntlMessages id="teacher.GradeOption_6" /> },
  { value: 7, label: <IntlMessages id="teacher.GradeOption_7" /> },
  { value: 8, label: <IntlMessages id="teacher.GradeOption_8" /> },
];

export const stepOptions = [
  { value: 1, label: <IntlMessages id="teacher.StepOption_1" /> },
  { value: 2, label: <IntlMessages id="teacher.StepOption_2" /> },
  { value: 3, label: <IntlMessages id="teacher.StepOption_3" /> },
  { value: 4, label: <IntlMessages id="teacher.StepOption_4" /> },
  { value: 5, label: <IntlMessages id="teacher.StepOption_5" /> },
  { value: 6, label: <IntlMessages id="teacher.StepOption_6" /> },
];

export const appointmentTypeOptions = [
  {
    value: 'outstructure_fixed_term',
    label: <IntlMessages id="teacher.appointmentTOptions_1" />,
  },
  {
    value: 'instructure_fixed_term',
    label: <IntlMessages id="teacher.appointmentTOptions_2" />,
  },
  {
    value: 'official',
    label: <IntlMessages id="teacher.appointmentTOptions_3" />,
  },
];

export const levelOfEdcationOptions = [
  {
    value: 'Associate',
    label: <IntlMessages id="teacher.EducationLevelOption_1" />,
  },
  {
    value: 'Bachelor',
    label: <IntlMessages id="teacher.EducationLevelOption_2" />,
  },
  {
    value: 'Master',
    label: <IntlMessages id="teacher.EducationLevelOption_3" />,
  },
  { value: 'PhD', label: <IntlMessages id="teacher.EducationLevelOption_4" /> },
  { value: 'other', label: 'Other' },
];

export const langOptions = [
  {
    value: 'pashto',
    label: <IntlMessages id="teacher.langOptions_1" />,
  },
  {
    value: 'dari',
    label: <IntlMessages id="teacher.langOptions_2" />,
  },
  {
    value: 'english',
    label: <IntlMessages id="teacher.langOptions_3" />,
  },
  {
    value: 'pashto_dari',
    label: <IntlMessages id="teacher.langOptions_4" />,
  },
];

export const workersGrade = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 6,
    label: '6',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 8,
    label: '8',
  },
  {
    value: 9,
    label: 'مافوق',
  },
];

export const publicBuildingOwnerOptions = [
  {
    value: 'tveta',
    label: <IntlMessages id="dorm.PublicBuildingOwnerLabelOption_1" />,
  },
  {
    value: 'other_org',
    label: <IntlMessages id="dorm.PublicBuildingOwnerLabelOption_2" />,
  },
];

export const privateBuildingTypeOptions = [
  {
    value: 'rent',
    label: <IntlMessages id="dorm.PrivateBuildingTypeOption_1" />,
  },
  {
    value: 'aid',
    label: <IntlMessages id="dorm.PrivateBuildingTypeOption_2" />,
  },
];
export const BuildingTypeOptions = [
  {
    value: 'governmental',
    label: <IntlMessages id="dorm.BuildingTypeOptions_1" />,
  },
  { value: 'private', label: <IntlMessages id="dorm.BuildingTypeOptions_2" /> },
];

export const dormGenderOptions = [
  { value: 'male', label: <IntlMessages id="dorm.GenderOptions_1" /> },
  { value: 'female', label: <IntlMessages id="dorm.GenderOptions_2" /> },
  { value: 'coed', label: <IntlMessages id="dorm.GenderOptions_3" /> },
];

export const evaluationTypeOptions = [
  { value: '1', label: <IntlMessages id="teacher.evaluationTypeOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.evaluationTypeOption_2" /> },
];

export const upgradeToOption = [
  { value: '1', label: <IntlMessages id="institute.upgradingOptions_1" /> },
  { value: '2', label: <IntlMessages id="institute.upgradingOptions_2" /> },
  { value: '3', label: <IntlMessages id="institute.upgradingOptions_3" /> },
];

export const levelOfEdcationForList = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  {
    value: '14th',
    label: <IntlMessages id="teacher.EducationLevelOption_1" />,
  },
  {
    value: 'bachelor',
    label: <IntlMessages id="teacher.EducationLevelOption_2" />,
  },
  {
    value: 'master',
    label: <IntlMessages id="teacher.EducationLevelOption_3" />,
  },
  {
    value: 'PHD',
    label: <IntlMessages id="teacher.EducationLevelOption_4" />,
  },
];

export const genderOptionsForList = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: '1', label: <IntlMessages id="institute.studentgenderOption_1" /> },
  { value: '2', label: <IntlMessages id="institute.studentgenderOption_2" /> },
];

export const subjectCreditOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: '1', label: <IntlMessages id="subject.creditOption_1" /> },
  { value: '2', label: <IntlMessages id="subject.creditOption_2" /> },
  { value: '3', label: <IntlMessages id="subject.creditOption_3" /> },
  { value: '4', label: <IntlMessages id="subject.creditOption_4" /> },
  { value: '5', label: <IntlMessages id="subject.creditOption_5" /> },
];

export const subjectTypeOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: '1', label: <IntlMessages id="subject.coreSubject" /> },
  { value: '2', label: <IntlMessages id="subject.nonCoreSubject" /> },
];

export const subjectSystemOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: '1', label: <IntlMessages id="subject.systemOption_1" /> },
  { value: '2', label: <IntlMessages id="subject.systemOption_2" /> },
  { value: '3', label: <IntlMessages id="subject.systemOption_3" /> },
  { value: '4', label: <IntlMessages id="subject.systemOption_4" /> },
];

export const semesterOptions = [
  { column: '1', label: <IntlMessages id="marks.SemesterOption_1" /> },
  { column: '2', label: <IntlMessages id="marks.SemesterOption_2" /> },
];

export const semesterValueOptions = [
  { value: '1', label: <IntlMessages id="marks.SemesterOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SemesterOption_2" /> },
];

export const classOptions = [
  { value: 10, label: 10 },
  { value: 11, label: 11 },
  { value: 12, label: 12 },
  { value: 13, label: 13 },
  { value: 14, label: 14 },
];

export const sectionValueOptions = [
  { value: 'a', label: 'a' },
  { value: 'b', label: 'b' },
  { value: 'c', label: 'c' },
  { value: 'd', label: 'd' },
  { value: 'e', label: 'e' },
];

export const verificationValueOptions = [
  { value: 'verified', label: 'تاید کول' },
  { value: 'rejected', label: 'رد کول' },
];

export const tazkiraOptions = [
  {
    value: 'ٍ electronic',
    label: <IntlMessages id="forms.StdTazkiraElectronic" />,
  },
  { value: 'paper', label: <IntlMessages id="forms.StdTazkiraPaper" /> },
];

export const educationLevelOptions = [
  { value: '9', label: <IntlMessages id="forms.EducationalLevel_9th" /> },
  { value: '10', label: <IntlMessages id="forms.EducationalLevel_10th" /> },
  { value: '11', label: <IntlMessages id="forms.EducationalLevel_11th" /> },
  { value: '12', label: <IntlMessages id="forms.EducationalLevel_12th" /> },
  { value: '13', label: <IntlMessages id="forms.EducationalLevel_13th" /> },
  { value: '14', label: <IntlMessages id="forms.EducationalLevel_14th" /> },
];

export const teacherCurrentStatusOptions = [
  { value: 'active', label: <IntlMessages id="teacher.StatusOption_1" /> },
  { value: 'dismissed', label: <IntlMessages id="teacher.StatusOption_1" /> },
];

export const studentType = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  {
    value: 'registered',
    label: <IntlMessages id="student.typeOption_1" />,
  },
  {
    value: 'graduated',
    label: <IntlMessages id="student.typeOption_2" />,
  },
  {
    value: 'dismissed',
    label: <IntlMessages id="student.typeOption_3" />,
  },
];
