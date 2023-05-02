import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import callApi from 'helpers/callApi';
import { useParams } from 'react-router-dom';
import { kankorRegisterValidationSchema } from '../../global-data/forms-validation';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { genderOptions } from '../../global-data/options';
import { provinceOptions } from '../../global-data/options';
import { educationalYearsOptions } from '../../global-data/options';
import { studyTimeOptions } from '../../global-data/options';
const servicePath = 'http://localhost:8000';
const KankorstudentAPI = `${servicePath}/api/kankorResults`;
const StudentRegistraion = ({ history }) => {
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

        const educationYearsOptions = educationalYearsOptions.map((year) => {
          if (year.value == data[0].educational_year) {
            setInitialEducationalYear(year);
          }
        });
        const provinceOptions = provinceOptions.map((province) => {
          if (province.value == data[0].provence) {
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
  const [isNext, setIsNext] = useState(false);
  const [StudyTime, setStudyTIme] = useState('0');

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };
  const fetchFields = async () => {
    const response = await callApi('institute/field/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setFields(updatedData);
    } else {
      console.log('field error');
    }
  };
  const fetchDepartments = async () => {
    const response = await callApi('institute/department/', '', null);
    console.log('response of department', response);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDepartments(updatedData);
    } else {
      console.log('department error');
    }
  };
  const updateMode = true;
  const onRegister = (values) => {
    setIsNext(true);
    console.log('THis is  the inner comment');
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
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={kankorRegisterValidationSchema}
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
                      <FormGroup className="form-group has-float-label error-l-175">
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
                          options={educationalYearsOptions}
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
                          options={provinceOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right m-5"
                        size="lg"
                        type="submit"
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
                  onClick={() => setIsNext(false)}
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
