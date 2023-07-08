import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';

import callApi from 'helpers/callApi';

import { educationalYearsOptions } from '../global-data/options';

import CustomSelectInput from 'components/common/CustomSelectInput';
import './dorm-register.css';
import profilePhoto from './../../../assets/img/profiles/22.jpg';
import { NotificationManager } from 'components/common/react-notifications';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const SignupSchema = Yup.object().shape({
  District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

const servicePath = 'http://localhost:8000';
const studentAPIUrl = `${servicePath}/api/`;
const dormsApiUrl = `${servicePath}/institute/dorms/`;
const studentDormsApiUrl = `${servicePath}/api/student_dorms_create/`;
const dormTypeOptions = [
  { value: 'in_dorm', label: 'بدل عاشه' },
  { value: 'cash', label: 'بدیل عاشه' },
];

const DormRegistration = (values) => {
  const initialValues = {
    Province: {
      value: '',
      label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    },
  };

  const [data, setData] = useState([]);
  const [student, setStudent] = useState('');
  const [institute, setInstitute] = useState([]);
  const [department, setDepartment] = useState([]);
  const [classs, setClasss] = useState([]); //classs is used because class is a reserved word
  const [dorms, setDorms] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [isNext, setIsNext] = useState(true);

  const fetchDorms = async () => {
    const response = await callApi(`institute/dorms/`, '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDorms(updatedData);
    } else {
      console.log('dorm  error');
    }
  };

  useEffect(() => {
    fetchDorms();
  }, []);

  const handleClick = (event) => {
    setIsNext(event);
  };

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleFinalClick = () => {
    setIsNext(false);
    setSuccessMessage(true);
  };

  const handleSearch = async () => {
    const response = await callApi(`api/?student_id=${data}`, '', null);
    if (response.data && response.status === 200) {
      console.log('student', response.data.results);
      setStudent(response.data.results);
    } else {
      console.log('student error');
    }

    const instituteResponse = await callApi(
      `api/student_institutes/?student_id=${data}`,
      '',
      null
    );
    if (instituteResponse.data && instituteResponse.status === 200) {
      setInstitute(instituteResponse.data);
    } else {
      console.log('student institute error');
    }

    const departmentResponse = await callApi(
      `api/student_Departments/?student_id=${data}`,
      '',
      null
    );
    if (departmentResponse.data && departmentResponse.status === 200) {
      setDepartment(departmentResponse.data);
    } else {
      console.log('student department error');
    }

    const classResponse = await callApi(
      `api/student_class/?student_id=${data}`,
      '',
      null
    );
    if (classResponse.data && classResponse.status === 200) {
      setClasss(classResponse.data);
    } else {
      console.log('student class error');
    }

    console.log('Institute', institute);
    console.log('deparment', classs);
  };
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'شاگرد موفقانه لیلی ته رجستر شو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'شاگرد ثبت نشو، بیا کوشش وکری',
          'خطا',
          5000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  // post dorm record to server
  const postStudentRecord = async (data) => {
    const response = await callApi('api/student_dorms_create/', 'POST', data);
    if (response) {
      createNotification('success', 'filled');
      setSuccessMessage(true);
      setStudent('');
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const handleRegister = (values) => {
    //REMOVE USER FROM HERE LATTER, IT'S JUST FOR TESTING PURPOSE
    const data = {
      dorm: values.dorm.value,
      student: student[0].student_id,
      dorm_type: values.dormType.value,
      educational_year: values.educationalYear.value,
    };
    console.log('data of dorm', data);
    postStudentRecord(data);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="dorm.StudentRegisterTitle" />}
        </h3>
        <CardBody>
          {!successMessage ? (
            <Formik
              initialValues={initialValues}
              onSubmit={handleRegister}
              // validationSchema={SignupSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  {isNext ? (
                    <div>
                      {' '}
                      <Row className="justify-content-center inlineBlock">
                        <Label>
                          <IntlMessages id="search.studentIdSearchLabel" />
                        </Label>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                              onClick={handleSearch}
                            >
                              <IntlMessages id="search.studentId" />
                            </button>
                          </div>
                          <input
                            type="text"
                            class="form-control"
                            placeholder=""
                            aria-label=""
                            aria-describedby="basic-addon1"
                            onChange={handleChange}
                          />
                        </div>

                        <Colxx style={{ paddingInline: '3%' }}>
                          {student.length > 0 ? (
                            <div className="border rounded">
                              <Label>
                                <h6 className="mt-5 m-5">
                                  {<IntlMessages id="dorm.SearchResult" />}
                                </h6>
                              </Label>{' '}
                              <Row>
                                <Colxx xxs="1"></Colxx>

                                <Colxx>
                                  <img
                                    src={profilePhoto}
                                    alt="Photo"
                                    width={'10%'}
                                  />{' '}
                                </Colxx>
                              </Row>
                              <Row>
                                <Colxx>
                                  <div>
                                    <Row className="justify-content-center border border-primary rounded m-5">
                                      <Colxx
                                        className=" p-5  border rounded"
                                        xxs=""
                                      >
                                        <Label>
                                          {/* <IntlMessages id="teacher.NameLabel" /> */}
                                          د شاگرد ایدی / ایدی شاگرد
                                        </Label>
                                        <h3>{student[0].student_id}</h3>
                                        <Label>
                                          <IntlMessages id="teacher.NameLabel" />
                                        </Label>
                                        <h3>
                                          {student[0].name +
                                            '  ' +
                                            student[0].last_name}
                                        </h3>
                                        <Label>
                                          <IntlMessages id="teacher.FatherNameLabel" />
                                        </Label>
                                        <h3>{student[0].father_name}</h3>
                                        <Label>
                                          <IntlMessages id="teacher.PhoneNoLabel" />
                                        </Label>
                                        <h3>{student[0].phone_number}</h3>
                                        <Label>
                                          {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                          دایمی ادرس / ادرس دایمی
                                        </Label>
                                        <h3>
                                          {student[0].main_province.name +
                                            ' - ' +
                                            student[0].main_district.name +
                                            ' - ' +
                                            student[0].main_village}
                                        </h3>
                                        <Label>
                                          {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                          اوسنی ادرس / ادرس فعلی
                                        </Label>
                                        <h3>
                                          {student[0].main_province.name +
                                            ' - ' +
                                            student[0].main_district.name +
                                            ' - ' +
                                            student[0].main_village}
                                        </h3>
                                      </Colxx>
                                      {institute.length > 0 &&
                                        classs.length > 0 &&
                                        department.length > 0 && (
                                          <Colxx className="p-5 border rounded">
                                            <Label>
                                              <IntlMessages id="forms.InstituteLabel" />
                                            </Label>
                                            <h3>
                                              {institute[0].institute.name}
                                            </h3>
                                            <Label>د انستیوت ادرس</Label>
                                            <h3>
                                              {institute[0].institute.province +
                                                ' - ' +
                                                institute[0].institute
                                                  .district +
                                                ' - ' +
                                                institute[0].institute.village}
                                            </h3>
                                            <Label>
                                              <IntlMessages id="forms.FieldLabel" />
                                            </Label>
                                            <h3>
                                              {department[0].department.name}
                                            </h3>
                                            <Label>
                                              <IntlMessages id="marks.ClassLabel" />
                                            </Label>
                                            <h3>{classs[0].classs.name}</h3>
                                            <Label>
                                              <IntlMessages id="field.SemesterLabel" />
                                            </Label>
                                            <h3>{classs[0].classs.semester}</h3>
                                          </Colxx>
                                        )}
                                    </Row>
                                    <Row>
                                      <Colxx>
                                        <Button
                                          onClick={() => handleClick(false)}
                                          className="float-right m-5  "
                                          style={{
                                            paddingInline: '30px',
                                          }}
                                        >
                                          <IntlMessages id="forms.ConfirmButton" />
                                        </Button>
                                      </Colxx>
                                    </Row>
                                  </div>
                                </Colxx>
                              </Row>
                            </div>
                          ) : (
                            <div>
                              <Label>
                                <h6 className="mt-5 m-5">
                                  {<IntlMessages id="dorm.SearchResult" />}
                                </h6>
                              </Label>
                              <Row className="justify-content-center mb-5">
                                <Colxx xxs="6">
                                  <h5 className="m-5">
                                    <IntlMessages id="forms.NoData" />
                                  </h5>
                                </Colxx>
                              </Row>
                            </div>
                          )}
                        </Colxx>
                      </Row>
                    </div>
                  ) : (
                    <div>
                      <Row className="mb-4 justify-content-center">
                        <Colxx xxs="8">
                          <div className="square border border-dark p-3">
                            <h6 className=" mb-4">
                              {
                                <IntlMessages id="forms.StudentResidentsPlace" />
                              }
                            </h6>

                            <FormGroup className="form-group has-float-label ">
                              <Label>
                                {/* <IntlMessages id="forms.InstituteLabel" /> */}
                                لیله
                              </Label>
                              <FormikReactSelect
                                name="dorm"
                                id="dorm"
                                value={values.dorm}
                                options={dorms}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />

                              {errors.dorm && touched.dorm ? (
                                <div className="invalid-feedback d-block">
                                  {errors.dorm}
                                </div>
                              ) : null}
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                {/* <IntlMessages id="dorm.BuildingTypeLabel" /> */}
                                نوع
                              </Label>
                              <FormikReactSelect
                                name="dormType"
                                id="dormType"
                                value={values.dormType}
                                options={dormTypeOptions}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.dormType && touched.dormType ? (
                                <div className="invalid-feedback d-block">
                                  {errors.dormType}
                                </div>
                              ) : null}
                            </FormGroup>

                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="forms.educationYear" />
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
                              {errors.educationalYear &&
                              touched.educationalYear ? (
                                <div className="invalid-feedback d-block">
                                  {errors.educationalYear}
                                </div>
                              ) : null}
                            </FormGroup>
                          </div>
                          <Button
                            onClick={() => handleClick(true)}
                            className="m-2 m-5"
                          >
                            شاته/ عقب
                          </Button>
                          <Button
                            style={{
                              paddingInline: '30px',
                            }}
                            className="float-right m-2 mt-5"
                            type="submit"
                            // onSubmit={handleSubmit}
                            // onClick={}
                          >
                            {<IntlMessages id="forms.SubimssionButton" />}
                          </Button>
                        </Colxx>
                      </Row>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          ) : (
            <div
              className="wizard-basic-step text-center pt-3 "
              style={{ minHeight: '400px' }}
            >
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button
                  className="m-5 bg-primary"
                  onClick={() => {
                    setSuccessMessage(false);
                    setIsNext(true);
                  }}
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

export default DormRegistration;
