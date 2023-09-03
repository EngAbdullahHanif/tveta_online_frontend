import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import callApi from 'helpers/callApi';
import { useParams } from 'react-router-dom';
import { kankorRegisterValidationSchema } from '../../global-data/forms-validation';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { genderOptions } from '../../global-data/options';
import { educationalYearsOptions } from '../../global-data/options';
import { studyTimeOptions } from '../../global-data/options';
import { NotificationManager } from 'components/common/react-notifications';
import './../../.././../assets/css/global-style.css';

import config from '../../../../config';
import { AuthContext } from 'context/AuthContext';
import { inputLabel } from 'config/styling';
const servicePath = config.API_URL;
const KankorstudentAPI = `${servicePath}/api/kankorResults`;
const StudentRegistraion = ({ history }) => {
  const { kankorStudentId } = useParams();
  console.log('Kankor ID', kankorStudentId);
  if (kankorStudentId) {
    useEffect(() => {
      async function fetchStudent() {
        const { data } = await callApi(
          `api/kankorResults/?id=${kankorStudentId}`,
          '',
          null,
        );
        console.log('data of the kankor student', data[0]);
        setInitialName(data[0].name);
        setInitialFatherName(data[0].father_name);
        setInitialDistrict(data[0].district);
        const educationYearsOptions = educationalYearsOptions.map((year) => {
          if (year.value == data[0].educational_year) {
            setInitialEducationalYear(year);
          }
        });
        setInitialProvince({ value: '1', label: data[0].provence });
        setInitailDepartment([
          {
            value: data[0].department_id.id,
            label: data[0].department_id.name,
          },
        ]);
        const genderOption = genderOptions.map((gender) => {
          if (gender.value === data[0].gender) {
            setInitialGender(gender);
          }
        });
        setInitailField([
          {
            value: data[0].field_id.id,
            label: data[0].field_id.name,
          },
        ]);
        setInitialKankorMarks(data[0].score);
        const shiftOptions = studyTimeOptions.map((timeOptions) => {
          if (timeOptions.value === data[0].shift) {
            setInitialstudyTime(timeOptions);
          }
        });
        setInitialInstitute([
          { value: data[0].Institute.id, label: data[0].Institute.name },
        ]);
      }
      fetchStudent();
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
  const [initialDistrict, setInitialDistrict] = useState([]);

  const { provinces, districts, fields, institutes, departments } =
    useContext(AuthContext);

  const [selectedProvince, setSelectedProvince] = useState('');

  const initialValues = {
    studentName: intialName,
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

  const [isNext, setIsNext] = useState(false);
  const [StudyTime, setStudyTIme] = useState('0');

  const updateMode = true;

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'د کانکور شاگرد په بریالیتوب سره ثبت شو',
          'موفقیت',
          3000,
          null,
          null,
          cName,
        );
        break;
      case 'error':
        NotificationManager.error(
          'د کانکور شاگرد ثبت نه شو بیا کوشش وکری',
          'خطا',
          9000,
          () => {
            alert('callback');
          },
          null,
          cName,
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const onRegister = async (values) => {
    console.log('THis is  the inner comment');
    const data = {
      name: values.studentName,
      father_name: values.fatherName,
      institute: values.institute.value,
      field_of_study: values.field.value,
      department: values.department.value,
      marks: values.kankorMarks,
      educational_year: values.educationalYear.value,
      province: values.province.value,
      district: values.district.value,
      gender: values.gender.value,
      shift: values.studyTime.value,
    };
    console.log('data', data);

    const response = await callApi(
      'students/kankor-applicant-create/',
      'POST',
      data,
    );
    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 202
    ) {
      // setIsNext(false);
      setIsNext(true);
      createNotification('success', 'filled');
    } else {
      createNotification('error', 'filled');
      console.log('kankor result error');
    }
  };

  return (
    <>
      <Card>
        <div className="ml-5">
          <h3 className="mt-5 m-5 titleStyle">
            {<IntlMessages id="forms.Kankorformstitle" />}
          </h3>
        </div>
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
                <Form className="av-tooltip tooltip-label-right style">
                  <Row className="justify-content-center">
                    <Colxx xxs="5" className=" mt-5">
                      {/* Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.StdName" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="studentName"
                        />
                        {errors.studentName && touched.studentName ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studentName}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/*Father Name  */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
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

                      {/* Gender */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
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
                        />
                        {touched.gender && errors.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.gender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Institutes */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
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
                        />
                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.institute}
                            {console.log(errors.institute, 'sdafhsakh')}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.FieldDepLabel" />
                          <span style={{ color: 'red' }}>*</span>
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.department}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* province*/}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.ProvinceLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={(name, value) => {
                            setFieldValue('district', []);
                            setFieldValue(name, value);
                          }}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block   bg-danger text-white messageStyle">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* District */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.DistrictLabel" />
                        </Label>
                        <FormikReactSelect
                          name="district"
                          id="district"
                          value={values.district}
                          options={districts?.filter(
                            (district) =>
                              district.province === values.province.value,
                          )}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.district && touched.district ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.district}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="5" className=" mt-5">
                      {/* <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.KankorMarksLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control fieldStyle"
                          name="kankorMarks"
                          type="number"
                          min="0"
                          max="100"
                        />
                        {errors.kankorMarks && touched.kankorMarks ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.kankorMarks}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Field */}
                      {/* <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.FieldLabel" />
                          <span style={{ color: 'red' }}>*</span>
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.field}
                          </div>
                        ) : null}
                      </FormGroup> */}

                      {/* Eduactional Year*/}
                      <FormGroup className="form-group has-float-label error-l-175 ">
                        <Label style={inputLabel}>
                          <IntlMessages id="curriculum.eduactionalYearLabel" />
                          <span style={{ color: 'red' }}>*</span>
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
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.educationalYear}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Study Time */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
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
                        />
                        {errors.studyTime && touched.studyTime ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.studyTime}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right  buttonStyle"
                        size="lg"
                        type="submit"
                        style={{ margin: '7% 0% 8% 9%' }}
                      >
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
                  className="m-5 bg-primary "
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
