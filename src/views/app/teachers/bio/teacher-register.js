import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const TazkiraOptions = [
  { value: '1', label: <IntlMessages id="forms.StdTazkiraElectronic" /> },
  { value: '2', label: <IntlMessages id="forms.StdTazkiraPaper" /> },
];

const StatusOptions = [
  { value: '1', label: <IntlMessages id="teacher.StatusOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.StatusOption_2" /> },
];

const GradeOptions = [
  { value: '3', label: <IntlMessages id="teacher.GradeOption_3" /> },
  { value: '4', label: <IntlMessages id="teacher.GradeOption_4" /> },
  { value: '5', label: <IntlMessages id="teacher.GradeOption_5" /> },
  { value: '6', label: <IntlMessages id="teacher.GradeOption_6" /> },
  { value: '7', label: <IntlMessages id="teacher.GradeOption_7" /> },
  { value: '8', label: <IntlMessages id="teacher.GradeOption_8" /> },
];
const StepOptions = [
  { value: '1', label: <IntlMessages id="teacher.StepOption_1" /> },
  { value: '2', label: <IntlMessages id="teacher.StepOption_2" /> },
  { value: '3', label: <IntlMessages id="teacher.StepOption_3" /> },
  { value: '4', label: <IntlMessages id="teacher.StepOption_4" /> },
  { value: '5', label: <IntlMessages id="teacher.StepOption_5" /> },
  { value: '6', label: <IntlMessages id="teacher.StepOption_6" /> },
];

const LevelOfEdcationOptions = [
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
  { value: 'PHD', label: <IntlMessages id="teacher.EducationLevelOption_3" /> },
];

const MajorOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA' },
  { value: 'PHD', label: 'Mechenical Engineering' },
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

const SignupSchema = Yup.object().shape({
  Name: Yup.string().required(<IntlMessages id="teacher.NameErr" />),

  FatherName: Yup.string().required(
    <IntlMessages id="teacher.FatherNameErr" />
  ),

  EnglishName: Yup.string().required(
    <IntlMessages id="teacher.EnglishNameErr" />
  ),

  GrandFatherName: Yup.string().required(
    <IntlMessages id="teacher.GrandFatherNameErr" />
  ),

  TazkiraNo: Yup.string().required(<IntlMessages id="teacher.TazkiraNoErr" />),

  IdCardPageNo: Yup.string().required(
    <IntlMessages id="teacher.IdCardPageNoErr" />
  ),

  IdCardJoldNo: Yup.string().required(
    <IntlMessages id="teacher.IdCardJoldNoErr" />
  ),

  PhoneNo: Yup.string().required(<IntlMessages id="teacher.PhoneNoErr" />),

  Email: Yup.string()
    .email(<IntlMessages id="teacher.EmailRequiredErr" />)
    .required(<IntlMessages id="teacher.EmailErr" />),

  //  LevelOfEducation: Yup.string()
  // .required(<IntlMessages id="teacher.LevelOfEducationErr" />),

  //        Major: Yup.string()
  // .required(<IntlMessages id="teacher.MajorErr" />),
  //             DoB: Yup.string()
  // .required(<IntlMessages id="teacher.DoBErr" />),

  //                  Status: Yup.string()
  // .required(<IntlMessages id="teacher.StatusErr" />),
  //  Grade: Yup.string()
  // .required(<IntlMessages id="teacher.GradeErr" />),
});

const TeacherRegistration = () => {
  const [subjectType, setSubjectType] = useState({});
  const [systemType, setSystemType] = useState({});

  const initialValues = {
    TazkiraType: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    LevelOfEducation: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Status: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Grade: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Step: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Major: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    C_Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    IdCardPageNo: '0',
    IdCardJoldNo: '0',
  };

  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.RegisterTitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                {isNext ? (
                  <Row>
                    <Colxx xxs="6">
                      {/* Teacher Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.NameLabel" />
                        </Label>
                        <Field className="form-control" name="Name" />
                        {errors.Name && touched.Name ? (
                          <div className="invalid-feedback d-block">
                            {errors.Name}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Father Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.FatherNameLabel" />
                        </Label>
                        <Field className="form-control" name="FatherName" />
                        {errors.FatherName && touched.FatherName ? (
                          <div className="invalid-feedback d-block">
                            {errors.FatherName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Tazkira Type */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.TazkiraType" />
                        </Label>
                        <FormikReactSelect
                          name="TazkiraType"
                          id="TazkiraType"
                          value={values.TazkiraType}
                          options={TazkiraOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.TazkiraType && touched.TazkiraType ? (
                          <div className="invalid-feedback d-block">
                            {errors.TazkiraType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {values.TazkiraType.value === '2' ? (
                        <div>
                          {/* Safha */}
                          <div>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="teacher.IdCardPageNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="IdCardPageNo"
                                type="number"
                              />
                              {errors.IdCardPageNo && touched.IdCardPageNo ? (
                                <div className="invalid-feedback d-block">
                                  {errors.IdCardPageNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {/* Contact No */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.PhoneNoLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="PhoneNo"
                          type="number"
                        />
                        {errors.PhoneNo && touched.PhoneNo ? (
                          <div className="invalid-feedback d-block">
                            {errors.PhoneNo}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label className="d-block">
                          <IntlMessages id="teacher.DoBLabel" />
                        </Label>
                        <FormikDatePicker
                          name="DoB"
                          type="date"
                          value={values.DoB}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.DoB && touched.DoB ? (
                          <div className="invalid-feedback d-block">
                            {errors.DoB}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="6">
                      {/* Teacher English Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.EnglishNameLabel" />
                        </Label>
                        <Field className="form-control" name="EnglishName" />
                        {errors.EnglishName && touched.EnglishName ? (
                          <div className="invalid-feedback d-block">
                            {errors.EnglishName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Grand Father Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.GrandFatherNameLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="GrandFatherName"
                        />
                        {errors.GrandFatherName && touched.GrandFatherName ? (
                          <div className="invalid-feedback d-block">
                            {errors.GrandFatherName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Tazkira Number */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.TazkiraNoLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="TazkiraNo"
                          type="number"
                        />
                        {errors.TazkiraNo && touched.TazkiraNo ? (
                          <div className="invalid-feedback d-block">
                            {errors.TazkiraNo}
                          </div>
                        ) : null}
                      </FormGroup>

                      {values.TazkiraType.value === '2' ? (
                        <div>
                          {/* Jold Number */}
                          <div>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="teacher.IdCardJoldNoLabel" />
                              </Label>
                              <Field
                                className="form-control"
                                name="IdCardJoldNo"
                                type="number"
                              />
                              {errors.IdCardJoldNo && touched.IdCardJoldNo ? (
                                <div className="invalid-feedback d-block">
                                  {errors.IdCardJoldNo}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}

                      {/* Email Address */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.EmailLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="Email"
                          type="Email"
                        />
                        {errors.Email && touched.Email ? (
                          <div className="invalid-feedback d-block">
                            {errors.Email}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Education */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.LevelOfEducationLabel" />
                        </Label>
                        <FormikReactSelect
                          name="LevelOfEducation"
                          id="LevelOfEducation"
                          value={values.LevelOfEducation}
                          options={LevelOfEdcationOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.LevelOfEducation && touched.LevelOfEducation ? (
                          <div className="invalid-feedback d-block">
                            {errors.LevelOfEducation}
                          </div>
                        ) : null}
                      </FormGroup>

                      <Button
                        onClick={() => handleClick(false)}
                        className="float-right m-4 "
                      >
                        <IntlMessages id="button.Next" />
                      </Button>
                    </Colxx>
                  </Row>
                ) : (
                  <Row>
                    <Colxx xxs="6">
                      {/* Major */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.MajorLabel" />
                        </Label>
                        <FormikReactSelect
                          name="Major"
                          id="Major"
                          value={values.Major}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={MajorOptions}
                          required
                        />
                        {errors.Major && touched.Major ? (
                          <div className="invalid-feedback d-block">
                            {errors.Major}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Grade */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.GradeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="Grade"
                          id="Grade"
                          value={values.Grade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={GradeOptions}
                          required
                        />
                        {errors.Grade && touched.Grade ? (
                          <div className="invalid-feedback d-block">
                            {errors.Grade}
                          </div>
                        ) : null}
                      </FormGroup>
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

                      <Button onClick={() => handleClick(true)} className="m-4">
                        <IntlMessages id="button.Back" />
                      </Button>
                    </Colxx>

                    <Colxx xxs="6">
                      {/* Status */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.StatusLabel" />
                        </Label>
                        <FormikReactSelect
                          name="Status"
                          id="Status"
                          value={values.Status}
                          options={StatusOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.Status && touched.Status ? (
                          <div className="invalid-feedback d-block">
                            {errors.Status}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Step */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="teacher.StepLabel" />
                        </Label>
                        <FormikReactSelect
                          name="Step"
                          id="Step"
                          value={values.Step}
                          options={StepOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.Step && touched.Step ? (
                          <div className="invalid-feedback d-block">
                            {errors.Step}
                          </div>
                        ) : null}
                      </FormGroup>

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

                      <div className="d-flex justify-content-between align-items-center m-4 float-right">
                        <Button
                          className={`btn-shadow btn-multiple-state `}
                          size="lg"
                          type="submit"
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="SubmitButton" />
                          </span>
                        </Button>
                      </div>
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

export default TeacherRegistration;
