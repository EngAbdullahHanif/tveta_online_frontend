import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import CustomSelectInput from 'components/common/CustomSelectInput';
import './dorm-register.css';
import profilePhoto from './../../../assets/img/profiles/22.jpg';
import { NotificationManager } from 'components/common/react-notifications';

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
import callApi from 'helpers/callApi';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { useEffect } from 'react';

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
  District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

const servicePath = 'http://localhost:8000';
const studentAPIUrl = `${servicePath}/api/`;
const dormsApiUrl = `${servicePath}/institute/dorms/`;
const studentDormsApiUrl = `${servicePath}/api/student_dorms_create/`;
const dormTypeOptions = [
  { value: '1', label: 'بدل عاشه' },
  { value: '2', label: 'بدیل عاشه' },
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
    const response = await axios.get(dormsApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setDorms(updatedData);
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

  const handleSearch = async () => {
    //search student by student id in database
    console.log(`${studentAPIUrl}?student_id=${data}`);
    axios.get(`${studentAPIUrl}?student_id=${data}`).then((res) => {
      setStudent(res.data);
    });
    const instituteResponse = await axios.get(
      `${studentAPIUrl}student_institutes/?student_id=${data}`
    );
    const instituteData = await instituteResponse.data;
    setInstitute(instituteData);

    const departmentResponse = await axios.get(
      `${studentAPIUrl}student_Departments/?student_id=${data}`
    );
    const departmentData = await departmentResponse.data;
    setDepartment(departmentData);

    //type =1 means current class or current continued class
    const classResponse = await axios.get(
      `${studentAPIUrl}student_class/?student_id=${data}&type=1`
    );
    const classData = await classResponse.data;
    setClasss(classData);
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

  // post student record to server
  const postStudentRecord = async (data) => {
    const response = await callApi('api/student_dorms_create/', 'POST', data);
    if (response) {
      createNotification('success', 'filled');
      setSuccessMessage(true);
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const handleRegister = (values) => {
    //REMOVE USER FROM HERE LATTER, IT'S JUST FOR TESTING PURPOSE
    const data = {
      dorm_id: values.dorm.value,
      student_id: student[0].student_id,
      dorm_type: values.dormType.value,
      educational_year: values.educationalYear,
      user_id: 1,
    };
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
                                          {student[0].main_province +
                                            ' - ' +
                                            student[0].main_district +
                                            ' - ' +
                                            student[0].main_village}
                                        </h3>
                                        <Label>
                                          {/* <IntlMessages id="teacher.EmailLabel" /> */}
                                          اوسنی ادرس / ادرس فعلی
                                        </Label>
                                        <h3>
                                          {student[0].main_province +
                                            ' - ' +
                                            student[0].main_district +
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
                                              {department[0].department_id.name}
                                            </h3>
                                            <Label>
                                              <IntlMessages id="marks.ClassLabel" />
                                            </Label>
                                            <h3>{classs[0].class_id.name}</h3>
                                            <Label>
                                              <IntlMessages id="field.SemesterLabel" />
                                            </Label>
                                            <h3>
                                              {classs[0].class_id.semester}
                                            </h3>
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
                              <Field
                                type="number"
                                className="form-control"
                                name="educationalYear"
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
                  onClick={() => setSuccessMessage(false)}
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
