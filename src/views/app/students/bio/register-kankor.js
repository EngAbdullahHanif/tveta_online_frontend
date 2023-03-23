import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import { useParams } from 'react-router-dom';
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
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const KankorstudentAPI = `${servicePath}/api/kankorResults`;
//http://localhost:8000/api/kankorResults/?id=1

const studyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];
const InstituteOptions = [
  { value: 1, label: 'Tech Afg' },
  { value: 2, label: 'IT' },
];

const FieldOptions = [
  { value: '1', label: 'Option1' },
  { value: '2', label: 'Option2' },
  { value: '3', label: 'Option3' },
];

const genderOptions = [
  { value: '1', label: <IntlMessages id="institute.studentgenderOption_1" /> },
  { value: '2', label: <IntlMessages id="institute.studentgenderOption_2" /> },
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
  { value: '19', label: <IntlMessages id="forms.educationalYearOption_19" /> },
  { value: '20', label: <IntlMessages id="forms.educationalYearOption_20" /> },
  { value: '21', label: <IntlMessages id="forms.educationalYearOption_21" /> },
  { value: '22', label: <IntlMessages id="forms.educationalYearOption_22" /> },
  { value: '23', label: <IntlMessages id="forms.educationalYearOption_23" /> },
  { value: '24', label: <IntlMessages id="forms.educationalYearOption_24" /> },
  { value: '25', label: <IntlMessages id="forms.educationalYearOption_25" /> },
  { value: '26', label: <IntlMessages id="forms.educationalYearOption_26" /> },
  { value: '27', label: <IntlMessages id="forms.educationalYearOption_27" /> },
  { value: '28', label: <IntlMessages id="forms.educationalYearOption_28" /> },
  { value: '29', label: <IntlMessages id="forms.educationalYearOption_29" /> },
  { value: '30', label: <IntlMessages id="forms.educationalYearOption_30" /> },
  { value: '31', label: <IntlMessages id="forms.educationalYearOption_31" /> },
  { value: '31', label: <IntlMessages id="forms.educationalYearOption_32" /> },
  { value: '32', label: <IntlMessages id="forms.educationalYearOption_33" /> },
  { value: '33', label: <IntlMessages id="forms.educationalYearOption_34" /> },
  { value: '34', label: <IntlMessages id="forms.educationalYearOption_35" /> },
  { value: '35', label: <IntlMessages id="forms.educationalYearOption_36" /> },
  { value: '324', label: <IntlMessages id="forms.educationalYearOption_36" /> },
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
  {
    value: '234234',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
];

const StudentRegistraion = ({ history }) => {
  const ValidationSchema = Yup.object().shape({
    name1: Yup.string()
      .min(3, <IntlMessages id="min.minInputValue" />)
      .max(50, <IntlMessages id="max.maxInputValue" />)
      .required(<IntlMessages id="forms.StdKankorNameErr" />),

    fatherName: Yup.string()
      .min(3, <IntlMessages id="min.minInputValue" />)
      .max(50, <IntlMessages id="max.maxInputValue" />)
      .required(<IntlMessages id="teacher.FatherNameErr" />),

    interanceDate: Yup.date().required(
      <IntlMessages id="forms.KankorMarksErr" />
    ),

    // kankorId: Yup.string().required(<IntlMessages id="forms.StdKankorIdErr" />),

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

    district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  });

  const { kankorStudentId } = useParams();
  console.log(kankorStudentId);
  if (kankorStudentId) {
    useEffect(() => {
      async function fetchStudent() {
        const { data } = await axios.get(
          `${KankorstudentAPI}/?id=${kankorStudentId}`
        );
        console.log(data, 'kaknor student data');
        setInitialName(data[0].name);
        //setInitailKankorId(data[0].user_id);
        setInitialFatherName(data[0].father_name);
        setInitailInteranceDate('04/23/1995');
        setInitialDistrict(data[0].district);

        const educationYearsOptions = educationYears.map((year) => {
          if (year.value == data[0].educational_year) {
            setInitialEducationalYear(year);
          }
        });
        const provinceOptions = StdSchoolProvinceOptions.map((province) => {
          if (provifgtfgx4e5gg6htgftghyuhynce.value == data[0].provence) {
            setInitialProvince(province);
          }
        });

        setInitailDepartment([
          {
            value: data[0].department_id.id,
            label: data[0].department_id.name,
          },
        ]);
        setInitialGender([
          {
            value: data[0].department_id.id,
            label: data[0].department_id.name,
          },
        ]);
        setInitailField([
          {
            value: data[0].field_id.id,
            label: data[0].field_id.name,
          },
        ]);
        setInitialKankorMarks(data[0].score);
        setInitialstudyTime([{ value: 1, label: 'سهار' }]);
        setInitialInstitute([
          { value: data[0].Institute.id, label: data[0].Institute.name },
        ]);
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }

  const [intialName, setInitialName] = useState('');
  const [initialFatherName, setInitialFatherName] = useState('');
  const [initailInteranceDate, setInitailInteranceDate] = useState('');
  const [initialKankorMarks, setInitialKankorMarks] = useState('');
  const [initialField, setInitailField] = useState([]);
  const [initailDepartment, setInitailDepartment] = useState([]);
  const [initialstudyTime, setInitialstudyTime] = useState([]);
  const [initialInstitute, setInitialInstitute] = useState([]);

  const [initialGender, setInitialGender] = useState([]);
  const [initialEducationalYear, setInitialEducationalYear] = useState([]);
  const [initialProvince, setInitialProvince] = useState([]);
  const [initialDistrict, setInitialDistrict] = useState('');
  const initialValues = {
    name1: intialName,
    gender: initialGender,
    fatherName: initialFatherName,
    kankorMarks: initialKankorMarks,
    interanceDate: initailInteranceDate,
    studyTime: initialstudyTime,
    department: initailDepartment,
    field: initialField,
    institute: initialInstitute,
    educationalYear: initialEducationalYear,
    province: initialProvince,
    district: initialDistrict,
  };
  const [fields, setFields] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isNext, setIsNext] = useState(true);
  const [StudyTime, setStudyTIme] = useState('0');

  const fetchInstitutes = async () => {
    const response = await axios.get('http://localhost:8000/institute/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };
  const fetchFields = async () => {
    const response = await axios.get('http://localhost:8000/institute/field/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));

    setFields(updatedData);
  };
  const fetchDepartments = async () => {
    const response = await axios.get(
      'http://localhost:8000/institute/department/'
    );
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setDepartments(updatedData);
  };

  const updateMode = true;
  const onRegister = (values) => {
    console.log('values', values);
    setIsNext(false);

    const data = {
      name: values.name1,
      father_name: values.fatherName,
      Institute: values.institute[0].value,
      field_id: values.field[0].value,
      department_id: values.department[0].value,
      score: values.kankorMarks,
      educational_year: '2020',
      provence: 'kabul',
      district: 'kabul',
      gender: 1,
      user_id: 1,
      // date: values.StdInteranceDate,
      //uncomment this line to send data to the server
      // kankor_id: values.StdKankorId,
      // study_time: values.studyTime.value,
    };
    console.log('data', data);
    axios
      .post('http://localhost:8000/api/Create_kankorResults/', data)
      .then((response) => {
        console.log(response);
        setIsNext(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchInstitutes();
    fetchFields();
    fetchDepartments();
  }, []);

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="forms.Kankorformstitle" />}
        </h3>
        <CardBody>
          {isNext ? (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Row>
                    <Colxx xxs="6">
                      {/* Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
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
                        {touched.gender && errors.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.gender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Institutes */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.InstituteLabel" />
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institute}
                            {console.log(errors.institute, 'sdafhsakh')}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Study Time */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="studyTime"
                          id="studyTime"
                          value={values.studyTime}
                          placeholder="Select option"
                          options={studyTimeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.studyTime && touched.studyTime ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.studyTime}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.studyDepartment" />
                        </Label>
                        <FormikReactSelect
                          name="department"
                          id="department"
                          value={values.department}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.department && touched.department ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* District */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.DistrictLabel" />
                        </Label>
                        <Field className="form-control" name="district" />
                        {errors.district && touched.district ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.district}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="6">
                      {/*Father Name  */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StdFatherName" />
                        </Label>
                        <Field className="form-control" name="fatherName" />
                        {errors.fatherName && touched.fatherName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.fatherName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.StdKankorIdLabel" />
                        </Label>
                        <Field className="form-control" name="kankorId" />
                        {errors.kankorId && touched.kankorId ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.kankorId}
                          </div>
                        ) : null}
                      </FormGroup> */}

                      {/* Kankor Marks */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.KankorMarksLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="kankorMarks"
                          type="number"
                        />
                        {errors.kankorMarks && touched.kankorMarks ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.kankorMarks}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Field */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.FieldLabel" />
                        </Label>
                        <FormikReactSelect
                          name="field"
                          id="field"
                          value={values.field}
                          options={fields}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.field && touched.field ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.field}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Eduactional Year*/}
                      <FormGroup className="form-group has-float-label error-l-175 ">
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
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.educationalYear}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-175">
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
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/*           
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="forms.RegistrationDateLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="interanceDate"
                          type="date"
                        />
                        {errors.interanceDate && touched.interanceDate ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.interanceDate}
                          </div>
                        ) : null}
                      </FormGroup> */}
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right m-5"
                        size="lg"
                        type="submit"
                        // onClick={() => {
                        //   handleClick(false);
                        // }}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="forms.SubimssionButton" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="wizard-basic-step text-center pt-3">
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button
                  className="m-5 bg-primary"
                  // onClick={() => window.location.reload()}
                  onClick={() => setIsNext(true)}
                >
                  <IntlMessages id="button.back" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default StudentRegistraion;
