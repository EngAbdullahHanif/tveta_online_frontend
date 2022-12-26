import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from '../../../../containers/form-validations/FormikFields';

const RegisterSchema = Yup.object().shape({
  StdName: Yup.string()
    // .min(3, <IntlMessages id="forms.nameChar" />)
    .required(<IntlMessages id="forms.nameerror" />),

  StdEngName: Yup.string()
    // .min('ستاسو انګریزی نوم سم ندی/ نام انگلسی شما اشتبا است')
    .required(<IntlMessages id="forms.englishNameError" />),

  StdFatherName: Yup.string()
    // .min('ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.StdFatherNameError" />),

  StdFatherEngName: Yup.string()
    // .min('ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.FatherEnglishNameErr" />),

  StdFatherDuty: Yup.string()
    // .min('ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.StdFatherDutyErr" />),

  StdFatherDutyLocation: Yup.string().required(
    <IntlMessages id="forms.StdFatherDutyLocationErr" />
  ),

  StdDoB: Yup.date().required(<IntlMessages id="forms.StdDoBErr" />),

  StdTazkiraNo: Yup.string().required(
    <IntlMessages id="forms.StdTazkiraNoErr" />
  ),

  StdIdCardPageNo: Yup.string().required(
    <IntlMessages id="forms.StdIdCardPageNoErr" />
  ),

  StdIdCardCover: Yup.string().required(
    <IntlMessages id="forms.StdIdCardCoverErr" />
  ),

  StdIdCardSakukNo: Yup.string().required(
    <IntlMessages id="forms.StdIdCardSakukNoErr" />
  ),

  // Province: Yup.string().required(<IntlMessages id="forms.ProvinceErr" />),

  District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),

  // C_Province: Yup.string().required(<IntlMessages id="forms.ProvinceErr" />),

  C_District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  C_Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
  StdPlaceOfBirth: Yup.string().required(
    <IntlMessages id="forms.StdPlaceOfBirthErr" />
  ),

  StPreShcool: Yup.string().required(
    <IntlMessages id="forms.StPreShcoolErr" />
  ),

  // StudentType: Yup.string().required(
  //   <IntlMessages id="forms.StudentTypeErr" />
  // ),

  StudyType: Yup.string().required(<IntlMessages id="forms.StudyTypeErr" />),

  // StdInteranceType: Yup.string().required(
  //   <IntlMessages id="forms.StdInteranceTypeErr" />
  // ),

  // StdGraduationYear: Yup.string().required(
  //   <IntlMessages id="forms.StdGraduationYearErr" />
  // ),
});

const options = [
  {
    value: 'Electronic',
    label: <IntlMessages id="forms.StdTazkiraElectronic" />,
  },
  { value: 'paper', label: <IntlMessages id="forms.StdTazkiraPaper" /> },
];

const EducationLevelOptions = [
  { value: '9th', label: <IntlMessages id="forms.EducationalLevel_9th" /> },
  { value: '10th', label: <IntlMessages id="forms.EducationalLevel_10th" /> },
  { value: '11th', label: <IntlMessages id="forms.EducationalLevel_11th" /> },
  { value: '12th', label: <IntlMessages id="forms.EducationalLevel_12th" /> },
  { value: '13th', label: <IntlMessages id="forms.EducationalLevel_13th" /> },
  { value: '14th', label: <IntlMessages id="forms.EducationalLevel_14th" /> },
];
const StudentTypeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudentTypeContiniues" /> },
  { value: '2', label: <IntlMessages id="forms.StudentTypeNonContiniues" /> },
];

const StudyTypeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTypeGraduated" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTypeInrolled" /> },
  { value: '3', label: <IntlMessages id="forms.StudyTypeDismissed" /> },
];

const StdInteranceOptions = [
  { value: '1', label: <IntlMessages id="forms.StdInteranceOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdInteranceOption_2" /> },
  { value: '3', label: <IntlMessages id="forms.StdInteranceOption_3" /> },
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

const initialValues = {
  state: {
    value: '',
    label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
  },
  EducationLevel: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
  StudentType: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
  StudyType: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
  StdInteranceType: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
  StdSchoolProvince: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
  Province: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
  C_Province: {
    value: '',
    label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
  },
};

const StudentRegistraion = (values) => {
  const [isNext, setIsNext] = useState(false);
  const [IdCard, setIdCard] = useState(null);
  // console.log('values', values);

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
      name: values.StdName,
      Eng_name: values.StdEngName,
      father_name: values.StdFatherName,
      Eng_father_name: values.StdFatherEngName,
      cover_number: values.StdIdCardCover,
      page_number: values.StdIdCardPageNo,
      registration_number: values.StdTazkiraNo,
      Sukuk_number: values.StdIdCardSakukNo,
      main_province: values.Province.value,
      main_district: values.District,
      main_village: values.Village,
      current_province: values.C_Province.value,
      current_district: values.C_District,
      current_village: values.C_Village,
      birth_date: values.StdDoB,
      fatherـprofession: values.StdFatherDuty,
      fatherـplaceـofـduty: values.StdFatherDutyLocation,
      finished_grade: values.EducationLevel.value,
      // finished_grade_year: values.StdGraduationYear,
      finished_grade_year: 2022,
      school: values.StPreShcool,
      schoolـprovince: values.StdSchoolProvince.value,
      study_types: 1,
      // study_types: add study types (فارغ، جاری، منفک)
      student_type: values.StudentType.value,
      internse_type: values.StdInteranceType.value,
      // std_photo: 'images/1.jpg',
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

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">{<IntlMessages id="forms.title" />}</h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            // validationSchema={InstituteRegistgerSchema}
          >
            {({
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                {!isNext ? (
                  <Row className="mb-4">
                    <Colxx xxs="6">
                      {/* Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdName" />
                        </Label>
                        <Field className="form-control" name="StdName" />
                        {errors.StdName && touched.StdName ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Father Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdFatherName" />
                        </Label>
                        <Field className="form-control" name="StdFatherName" />
                        {errors.StdFatherName && touched.StdFatherName ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdFatherName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Father Duty */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdFatherDutyLabel" />
                        </Label>
                        <Field className="form-control" name="StdFatherDuty" />
                        {errors.StdFatherDuty && touched.StdFatherDuty ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdFatherDuty}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* DOB */}
                      <FormGroup className="form-group has-float-label">
                        <Label className="d-block">
                          <IntlMessages id="forms.StdDoBLabel" />
                        </Label>
                        <FormikDatePicker
                          name="StdDoB"
                          value={values.StdDoB}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.StdDoB && touched.StdDoB ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdDoB}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*Tazkira Type  */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.TazkiraType" />
                        </Label>
                        <FormikReactSelect
                          name="state"
                          id="state"
                          value={values.state}
                          options={options}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />

                        {errors.state && touched.state ? (
                          <div className="invalid-feedback d-block">
                            {errors.state}
                          </div>
                        ) : null}
                      </FormGroup>

                      {values.state.value === 'paper' ? (
                        <div>
                          {/* Safha */}
                          <div>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.StdIdCardPageNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="StdIdCardPageNo"
                              />
                              {errors.StdIdCardPageNo &&
                              touched.StdIdCardPageNo ? (
                                <div className="invalid-feedback d-block">
                                  {errors.StdIdCardPageNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      <div className="square border border-dark p-3 ">
                        <h6 className=" mb-4">
                          {' '}
                          {<IntlMessages id="forms.CurrentAddresslabel" />}
                        </h6>

                        {/* Current Address */}
                        {/* province Current */}
                        <FormGroup className="form-group has-float-label">
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
                          {errors.C_Province && touched.C_Province ? (
                            <div className="invalid-feedback d-block">
                              {errors.C_Province}
                            </div>
                          ) : null}
                        </FormGroup>

                        {/* District */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="forms.DistrictLabel" />
                          </Label>
                          <Field className="form-control" name="C_District" />
                          {errors.C_District && touched.C_District ? (
                            <div className="invalid-feedback d-block">
                              {errors.C_District}
                            </div>
                          ) : null}
                        </FormGroup>

                        {/* village */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="forms.VillageLabel" />
                          </Label>
                          <Field className="form-control" name="C_Village" />
                          {errors.C_Village && touched.C_Village ? (
                            <div className="invalid-feedback d-block">
                              {errors.C_Village}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    </Colxx>

                    <Colxx xxs="6">
                      <div>
                        {/* Student English Name */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="forms.Eng_name" />
                          </Label>
                          <Field className="form-control" name="StdEngName" />
                          {errors.StdEngName && touched.StdEngName ? (
                            <div className="invalid-feedback d-block">
                              {errors.StdEngName}
                            </div>
                          ) : null}
                        </FormGroup>

                        {/*Students Father English Name */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="forms.Std_father_Eng_Name" />
                          </Label>
                          <Field
                            className="form-control"
                            name="StdFatherEngName"
                          />
                          {errors.StdFatherEngName &&
                          touched.StdFatherEngName ? (
                            <div className="invalid-feedback d-block">
                              {errors.StdFatherEngName}
                            </div>
                          ) : null}
                        </FormGroup>

                        {/* Father duty place */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                          </Label>
                          <Field
                            className="form-control"
                            name="StdFatherDutyLocation"
                          />
                          {errors.StdFatherDutyLocation &&
                          touched.StdFatherDutyLocation ? (
                            <div className="invalid-feedback d-block">
                              {errors.StdFatherDutyLocation}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="forms.PlaceOfBirthLabel" />
                          </Label>
                          <Field
                            className="form-control"
                            name="StdPlaceOfBirth"
                          />
                          {errors.StdPlaceOfBirth ? (
                            <div className="invalid-feedback d-block">
                              {errors.StdPlaceOfBirth}
                            </div>
                          ) : null}
                        </FormGroup>

                        {values.state.value === 'paper' ? (
                          <div>
                            {/* // Tazkira number */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.StdTazkiraNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="StdTazkiraNo"
                              />
                              {errors.StdTazkiraNo && touched.StdTazkiraNo ? (
                                <div className="invalid-feedback d-block">
                                  {errors.StdTazkiraNo}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Jold */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.StdIdCardCoverLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="StdIdCardCover"
                              />
                              {errors.StdIdCardCover &&
                              touched.StdIdCardCover ? (
                                <div className="invalid-feedback d-block">
                                  {errors.StdIdCardCover}
                                </div>
                              ) : null}
                            </FormGroup>

                            {/* Sakuk Number */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.StdIdCardSakukNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="StdIdCardSakukNo"
                              />
                              {errors.StdIdCardSakukNo &&
                              touched.StdIdCardSakukNo ? (
                                <div className="invalid-feedback d-block">
                                  {errors.StdIdCardSakukNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        ) : (
                          <div>
                            {/* // Tazkira number */}
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.StdTazkiraNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="StdTazkiraNo"
                              />
                              {errors.StdTazkiraNo && touched.StdTazkiraNo ? (
                                <div className="invalid-feedback d-block">
                                  {errors.StdTazkiraNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        )}

                        <div className="square border border-dark p-3">
                          <h6 className=" mb-4">
                            {<IntlMessages id="forms.PermanentAddressLabel" />}
                          </h6>

                          {/* province permanent*/}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <FormikReactSelect
                              name="Province"
                              id="Province"
                              value={values.Province}
                              options={StdSchoolProvinceOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.Province && touched.Province ? (
                              <div className="invalid-feedback d-block">
                                {errors.Province}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* District  permanent*/}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <Field className="form-control" name="District" />
                            {errors.District && touched.District ? (
                              <div className="invalid-feedback d-block">
                                {errors.District}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* village permanent */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <Field className="form-control" name="Village" />
                            {errors.Village && touched.Village ? (
                              <div className="invalid-feedback d-block">
                                {errors.Village}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleClick(true)}
                        className="float-right mt-5 "
                      >
                        مخته / بعدی
                      </Button>
                    </Colxx>
                  </Row>
                ) : (
                  <Row>
                    <Colxx xxs="6">
                      {/* درجه تحصیل*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.EducationLevelLabel" />
                        </Label>
                        <FormikReactSelect
                          name="EducationLevel"
                          id="EducationLevel"
                          value={values.EducationLevel}
                          options={EducationLevelOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />

                        {errors.EducationLevel && touched.EducationLevel ? (
                          <div className="invalid-feedback d-block">
                            {errors.EducationLevel}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Student Maktab*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StPreShcoolLabel" />
                        </Label>
                        <Field className="form-control" name="StPreShcool" />
                        {errors.StPreShcool && touched.StPreShcool ? (
                          <div className="invalid-feedback d-block">
                            {errors.StPreShcool}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Study type */}
                      {/* <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StudyTypeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="StudyType"
                          id="StudyType"
                          value={values.StudyType}
                          options={StudyTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />

                        {errors.StudyType && touched.StudyType ? (
                          <div className="invalid-feedback d-block">
                            {errors.StudyType}
                          </div>
                        ) : null}
                      </FormGroup> */}

                      {/* internse type*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdInteranceTypeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="StdInteranceType"
                          id="StdInteranceType"
                          value={values.StdInteranceType}
                          options={StdInteranceOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />

                        {errors.StdInteranceType && touched.StdInteranceType ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdInteranceType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Documents Upload  */}
                      {/*
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup> */}

                      <Button
                        onClick={() => handleClick(false)}
                        className="m-2"
                      >
                        شاته/ عقب
                      </Button>
                    </Colxx>
                    <Colxx xxs="6">
                      {/* سال فراغت */}
                      <FormGroup className="form-group has-float-label">
                        <Label className="d-block">
                          <IntlMessages id="forms.StdGraduationYearLabel" />
                        </Label>
                        <FormikDatePicker
                          name="StdGraduationYear"
                          id="date"
                          value={values.date}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.StdGraduationYear &&
                        touched.StdGraduationYear ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdGraduationYear}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*School province*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StdSchoolProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="StdSchoolProvince"
                          id="StdSchoolProvince"
                          value={values.StdSchoolProvince}
                          options={StdSchoolProvinceOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.StdSchoolProvince &&
                        touched.StdSchoolProvince ? (
                          <div className="invalid-feedback d-block">
                            {errors.StdSchoolProvince}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*Student Type*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.StudentTypeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="StudentType"
                          id="StudentType"
                          value={values.StudentType}
                          options={StudentTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.StudentType && touched.StudentType ? (
                          <div className="invalid-feedback d-block">
                            {errors.StudentType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Student photo* Is Remainin*/}
                      {/* 
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup> */}

                      <Button
                        className="float-right m-2 mt-5"
                        type="submit"
                        // onSubmit={handleSubmit}
                        // onClick={}
                      >
                        {<IntlMessages id="forms.SubimssionButton" />}
                      </Button>
                    </Colxx>
                  </Row>
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default StudentRegistraion;
