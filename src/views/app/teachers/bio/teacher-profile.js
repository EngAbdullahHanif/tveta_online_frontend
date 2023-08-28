import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field } from 'formik';
import { useParams } from 'react-router-dom';

import callApi from 'helpers/callApi';
import { AuthContext } from 'context/AuthContext';
import {
  Row,
  Card,
  CardBody,
  Label,
  Button,
  CardTitle,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

import {
  contractTypeOptions,
  dateOfBirthOptoions,
  degreeTypeOptions,
  evaluationTypeOptions,
  genderOptions,
  gradeOptions,
  hireTypeOptions,
  jobTypeOptions,
  langOptions,
  persianMonthOptions,
  stepOptions,
  teacherContractStatusOptions,
  teacherFeedbackOptions,
} from '../../global-data/options';
import logo from './../../../../assets/logos/AdminLogo.png';
import profilePhoto from './../../../../assets/img/profiles/user.png';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import config from '../../../../config';
import {
  teacherContractValidationSchema,
  teacherEducationValidationSchema,
  teacherHREvaluationValidationSchema,
} from 'views/app/global-data/forms-validation';
import {
  message,
  Col,
  InputNumber,
  Slider,
  Table as TB,
  Spin,
  Popconfirm,
} from 'antd';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { Spinner } from 'react-bootstrap';
import {
  teacherEvaluationValidationSchema,
  teacherIncentivesValidationSchema,
} from './../../global-data/forms-validation';
const servicePath = config.API_URL;
const teacherApiUrl = `${servicePath}/teachers/`;
const teacherEvaluationApiUrl = `${servicePath}/teachers/evaluation`;
const teacherHREvaluationApiUrl = `${servicePath}/teachers/hr-evaluation`;
const teacherTransferApiUrl = `${servicePath}/teachers/institute`;
// const { RangePicker } = DatePicker;

const TeacherProfile = () => {
  const {
    departments,
    classes,
    subjects,
    institutes,
    contextFields,
    provinces,
    districts,
  } = useContext(AuthContext);
  console.log('INSTITUTES: ', institutes);
  const [isNext, setIsNext] = useState(true);
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState([]);
  const [teacherEvaluation, setTeacherEvaluation] = useState([]);
  const [teacherHREvaluation, setTeacherHREvaluation] = useState([]);
  const [teacherTransfer, setTeacherTransfer] = useState([]);
  const [teacherEducation, setTeacherEducation] = useState([]);
  const [teacherContracts, setTeacherContracts] = useState([]);
  const [teacherIncentives, setTeacherIncentives] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [cvFile, setCVFile] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [score, setScore] = useState(1);
  const [evaluationDate, setEvaluationDate] = useState();
  const [contractAlert, setContractAlert] = useState(false);
  const [educationAlert, setEducationAlert] = useState(false);
  const [evaluationAlert, setEvaluationAlert] = useState(false);
  const [insentiveAlert, setInsentiveAlert] = useState(false);
  const [updatingRecord, setUpdatingRecord] = useState({});
  const [loading, setLoading] = useState(false);

  const resetUpdate = () => {
    setUpdatingRecord(null);
    recId = null;
    setStartDate(null);
    setEndDate(null);
    setScore(null);
    setEvaluationDate(null);
  };

  async function fetchTeacher() {
    const response = await callApi(`teachers/?id=${teacherId}`, '', null);
    const data = response.data;
    setTeacher(data);
    setIsLoaded(true);
  }
  async function fetchTeacherEvaluation() {
    const response = await callApi(
      `teachers/${teacherId}/evaluations/`,
      '',
      null
    );

    console.log(`${teacherEvaluationApiUrl}/?teacher_id=${teacherId}`);
    const data = response.data;
    console.log('TEACHER EVALUATIONS: ', data);

    setTeacherEvaluation(data);
  }
  async function fetchTeacherHREvaluation() {
    await callApi(`teachers/${teacherId}/hr-evaluations/`).then((response) => {
      const data = response.data;
      setTeacherHREvaluation(data);
      console.log('HR Evaluations: ', data);
    });
  }
  async function fetchTeacherTransfer() {
    try {
      const response = await callApi(
        `teachers/institute/?teacher_id=${teacherId}`,
        '',
        null
      );
      const data = response.data;
      console.log(`${teacherTransferApiUrl}/?teacher_id=${teacherId}`);
      setTeacherTransfer(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchTeacherEducation() {
    const response = await callApi(
      `teachers/${teacherId}/educations`,
      '',
      null
    );

    const data = response.data;
    console.log('Teacher Educations: ', data);
    setTeacherEducation(data);
  }
  async function fetchTeacherContracts() {
    const response = await callApi(
      `teachers/${teacherId}/contracts/`,
      '',
      null
    );

    const data = response.data;
    console.log('Teacher Contracts: ', data);
    setTeacherContracts(data);
  }
  async function fetchTeacherIncentives() {
    const response = await callApi(
      `teachers/${teacherId}/feedbacks/`,
      '',
      null
    );

    const data = response.data;
    console.log('Teacher Contracts: ', data);
    setTeacherIncentives(data);
  }
  let recId;
  const handleRecord = (item) => {
    console.log('ITEMMMMM: ', item);
    recId = item.id;
    setUpdatingRecord(item);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
    setScore(item.score);
    setEvaluationDate(item.evaluationDate);
  };
  useEffect(() => {
    fetchTeacher();
    fetchTeacherEvaluation();
    fetchTeacherHREvaluation();
    fetchTeacherTransfer();
    fetchTeacherEducation();
    fetchTeacherContracts();
    // fetchInstitutes();
    fetchTeacherIncentives();
    // fetchFields();
  }, []);

  const handleClick = (event) => {
    setIsNext(event);
  };

  const deleteContract = async (item) => {
    await callApi(`teachers/${teacherId}/contracts/${item}/`, 'DELETE').then(
      (response) => {
        console.log('Response in Contract Delete: ', response.data);
        fetchTeacherContracts();
      }
    );
  };
  const deleteEducation = async (item) => {
    await callApi(`teachers/${teacherId}/educations/${item}/`, 'DELETE').then(
      (response) => {
        console.log('Response in Education Delete: ', response.data);
        fetchTeacherEducation();
      }
    );
  };
  const deleteEvaluation = async (item) => {
    await callApi(`teachers/${teacherId}/evaluations/${item}/`, 'DELETE').then(
      (response) => {
        console.log('Response in Education Delete: ', response.data);
        fetchTeacherEvaluation();
      }
    );
  };
  const deleteHREvaluation = async (item) => {
    await callApi(
      `teachers/${teacherId}/hr-evaluations/${item}/`,
      'DELETE'
    ).then((response) => {
      console.log('Response in Education Delete: ', response.data);
      fetchTeacherHREvaluation();
    });
  };
  const deleteInsentive = async (item) => {
    await callApi(`teachers/${teacherId}/feedbacks/${item}/`, 'DELETE').then(
      (response) => {
        console.log('Response in Incentive Delete: ', response.data);
        fetchTeacherIncentives();
      }
    );
  };
  const addEducation = async (inputData) => {
    setLoading(true);
    let apiParams = {
      endPoint: `teachers/${teacherId}/educations/`,
      method: 'POST',
    };
    if (recId || updatingRecord.id) {
      apiParams.endPoint = `teachers/${teacherId}/educations/${updatingRecord.id}/`;
      apiParams.method = 'PATCH';
    }
    console.log('File: ', cvFile);
    console.log('Form Data in Teacher Education: ', inputData);
    const formData = new FormData();
    cvFile && formData.append('document', cvFile);
    formData.append('degree', inputData.degree?.value);
    formData.append('institution', inputData.institute);
    formData.append('field_of_study', inputData.field_of_study);
    formData.append('year_completed', inputData.year_of_completion?.value);
    formData.append('description', inputData.description);
    formData.append('teacher', teacherId);
    console.log('API PARAMS: ', apiParams);
    await callApi(apiParams.endPoint, apiParams.method, formData).then(
      (response) => {
        console.log('RESPONSE in teacher Education: ', response.data);
        if (response.status >= 200 && response.status <= 299) {
          setLoading(false);
          message.success('Education Added');
          fetchTeacherEducation();
          // window.location.reload();
          resetUpdate();
        } else {
          message.error('Data Not Saved Check your Payload');
        }
      }
    );
  };

  const addContract = async (inputData) => {
    setLoading(true);
    let apiParams = {
      endPoint: `teachers/${teacherId}/contracts/`,
      method: 'POST',
    };
    if (recId || updatingRecord.id) {
      apiParams.endPoint = `teachers/${teacherId}/contracts/${updatingRecord.id}/`;
      apiParams.method = 'PATCH';
    }
    console.log('File: ', cvFile);
    console.log('Form Data in Teacher Contract: ', inputData);
    const formData = new FormData();
    formData.append('document', cvFile);
    formData.append('job_type', inputData.jobType?.value);
    formData.append('grade', inputData.grade?.value);
    formData.append('step', inputData.step?.value);
    formData.append('teaching_language', inputData.teaching_language?.value);
    formData.append('contract_type', inputData.contract_type?.value);
    formData.append('hire_type', inputData.hireType?.value);
    formData.append('start_date', startDate);
    endDate && formData.append('end_date', endDate);
    formData.append('teacher', teacherId);
    formData.append('institute', inputData.institute?.value);
    formData.append('teaching_field', inputData.field?.value);
    formData.append('status', inputData.status?.value);

    for (const entry of formData.entries()) {
      console.log(entry);
      if (entry[1] === 'undefined') {
        formData.delete(entry[0]);
      }
    }
    await callApi(apiParams.endPoint, apiParams.method, formData).then(
      (response) => {
        console.log('RESPONSE in teacher Evaluation;: ', response.data);

        if (response.status >= 200 && response.status < 300) {
          setLoading(false);
          message.success('Data Saved Successfully');
          fetchTeacherContracts();
          // window.location.reload();
          resetUpdate();
        } else {
          message.error('Data Not Saved Check your Payload');
        }
      }
    );
  };

  const addEvaluation = async (inputData) => {
    setLoading(true);
    console.log('Form Data in Teacher HR Evaluation: ', inputData);
    let apiParams = {
      endPoint: `teachers/evaluation-create/`,
      method: 'POST',
    };
    if (recId || updatingRecord.id) {
      apiParams.endPoint = `teachers/${teacherId}/evaluations/${updatingRecord.id}/`;
      apiParams.method = 'PATCH';
    }
    const data = {
      topic: inputData.topic,
      evaluator_name: inputData.evaluator_name,
      evaluation_type: inputData.evaluation_type?.value,
      strong_points: inputData.strong_points,
      weak_points: inputData.weak_points,
      suggestions: inputData.suggestions,
      score,
      evaluation_date: evaluationDate,
      teacher: teacher[0].id,
      institute: inputData.institute?.value,
      department: inputData.department?.value,
      classs: inputData.classs?.value,
      subject: inputData.subject?.value,
    };
    console.log('Evaluation Date: ', data);
    await callApi(apiParams.endPoint, apiParams.method, data).then(
      (response) => {
        console.log('RESPONSE in teacher Contract;: ', response.data);

        if (response.status >= 200 && response.status < 300) {
          setLoading(false);
          message.success('Data Saved Successfully');
          fetchTeacherEvaluation();
          // window.location.reload();
          resetUpdate();
        } else {
          message.error('Data Not Saved Check your Payload');
        }
      }
    );
  };

  const addHREvaluation = async (inputData) => {
    setLoading(true);
    let apiParams = {
      endPoint: `teachers/${teacherId}/hr-evaluations/`,
      method: 'POST',
    };
    if (recId || updatingRecord.id) {
      apiParams.endPoint = `teachers/${teacherId}/hr-evaluations/${updatingRecord.id}/`;
      apiParams.method = 'PATCH';
    }
    const data = {
      evaluator_name: inputData.evaluator_name,
      score,
      evaluation_date: evaluationDate,
      teacher: teacher[0].id,
      institute: inputData.institute?.value,
      new_grade: inputData.grade?.value,
      new_step: inputData.step?.value,
    };
    console.log('HR Evaluation Data: ', data);
    await callApi(apiParams.endPoint, apiParams.method, data).then(
      (response) => {
        console.log('RESPONSE in teacher HR Evaluation;: ', response.data);

        if (response.status >= 200 && response.status < 300) {
          setLoading(false);
          message.success('Data Saved Successfully');
          fetchTeacherHREvaluation();
          // window.location.reload();
          resetUpdate();
        } else {
          message.error('Data Not Saved Check your Payload');
        }
      }
    );
  };
  console.log('ID: ', recId, updatingRecord);
  const addIncentive = async (inputData, { resetForm }) => {
    setLoading(true);
    let apiParams = {
      endPoint: `teachers/${teacherId}/feedbacks/`,
      method: 'POST',
    };
    if (recId || updatingRecord.id) {
      apiParams.endPoint = `teachers/${teacherId}/feedbacks/${updatingRecord.id}/`;
      apiParams.method = 'PATCH';
    }
    const data = {
      type: inputData.type?.value,
      teacher: teacher[0].id,
      institute: inputData.institute?.value,
      details: inputData.details,
    };
    console.log('Incentive Data Data: ', data);
    await callApi(apiParams.endPoint, apiParams.method, data).then(
      (response) => {
        console.log('RESPONSE in teacher Incentive Data: ', response.data);
        resetUpdate();
        if (response.status >= 200 && response.status < 300) {
          setLoading(false);
          message.success('Data Saved Successfully');
          fetchTeacherIncentives();
          resetForm();
          resetUpdate();
        } else {
          message.error('Data Not Saved Check your Payload');
        }
      }
    );
    setLoading(false);
  };

  return (
    <>
      <Row>
        <Colxx className="mt-5 m-5" xxs="8">
          <h3>{<IntlMessages id="teacher.Profile" />}</h3>
        </Colxx>
        <Colxx className="mt-4 max">
          <div className="d-flex align-items-center flex-column">
            <img src={logo} alt="Logo" width={'30%'} />
            <p>
              د تخنیکی او مسلکی زده کړو اداره
              <br />
              اداره تعلیمات تخنیکی و مسلکی
            </p>
          </div>
        </Colxx>
      </Row>
      {loading && <Spinner />}
      <Row>
        <Colxx xxs="1"></Colxx>
        <Colxx>
          <img
            src={teacher[0]?.photo || profilePhoto}
            alt="Photo"
            width={'10%'}
          />{' '}
        </Colxx>
      </Row>
      <Row>
        <Colxx
          className=" d-flex justify-content-center"
          style={{ marginRight: '2%' }}
        >
          {' '}
          <div className="d-inline-block">
            {/* <Button
              style={{ backgroundColor: !isNext ? 'blue' : '' }}
              size="lg"
              className="m-2"
              onClick={() => {
                handleClick(false);
              }}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="button.TeacherBackround" />
              </span>
            </Button> */}
            <Button
              style={{ backgroundColor: isNext ? 'blue' : '' }}
              size="lg"
              className="m-2"
              onClick={() => {
                handleClick(true);
              }}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="button.Teacherprofile" />
              </span>
            </Button>
          </div>
        </Colxx>
      </Row>
      {teacher.length > 0 && (
        <>
          {isNext ? (
            <>
              <Card className="rounded m-4">
                <CardBody>
                  <div>
                    <Row>
                      <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                        {' '}
                        <h2
                          className="bg-primary "
                          style={{
                            padding: '8px',
                            paddingInline: '30px',
                            borderRadius: '10px',
                          }}
                        >
                          <IntlMessages id="forms.personalInfo" />
                        </h2>
                      </Colxx>
                    </Row>
                    <Row className="justify-content-center   rounded ">
                      <Colxx style={{ paddingInline: '4%' }} xxs="">
                        <Label>
                          <IntlMessages id="teacher.NameLabel" />
                        </Label>
                        <h3>{teacher[0].name}</h3>
                        {/* <Label>
                          <IntlMessages id="forms.Eng_name" />
                        </Label>
                        <h3>Ahmad Samim</h3> */}
                        <Label>
                          <IntlMessages id="teacher.FatherNameLabel" />
                        </Label>
                        <h3>{teacher[0].father_name}</h3>
                        <Label>
                          <IntlMessages id="teacher.GrandFatherNameLabel" />
                        </Label>
                        <h3>{teacher[0].father_name}</h3>
                        {/* <Label>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                        </Label>
                        <h3>Muhammad Wali</h3> */}
                        <Label>
                          <IntlMessages id="gender.gender" />
                        </Label>
                        <h3>
                          {
                            genderOptions.find(
                              (op) => op.value === teacher[0].gender
                            )?.label
                          }
                        </h3>

                        <Label>
                          <IntlMessages id="teacher.PhoneNoLabel" />
                        </Label>
                        <h3>{teacher[0].phone_number}</h3>
                        <Label>
                          <IntlMessages id="teacher.EmailLabel" />
                        </Label>
                        <h3>{teacher[0].email}</h3>
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        <Label>
                          <IntlMessages id="forms.StdTazkiraNoLabel" />
                        </Label>
                        <h3>{teacher[0].registration_number}</h3>
                        <Label>
                          <IntlMessages id="forms.StdIdCardCoverLabel" />
                        </Label>
                        <h3>{teacher[0].cover_number}</h3>
                        <Label>
                          <IntlMessages id="forms.StdIdCardPageNoLabel" />
                        </Label>
                        <h3>{teacher[0].page_number}</h3>
                        <Label>
                          <IntlMessages id="forms.StdDoBLabel" />
                        </Label>
                        <h3>
                          {teacher[0].year_of_birth}-
                          {teacher[0].month_of_birth || 'میاشت'}-
                          {teacher[0].day_of_birth || 'ورځ'}
                        </h3>
                        <Label>
                          <IntlMessages id="forms.EducationLevelLabel" />
                        </Label>
                        <h3>ماستر</h3>
                        <Label>
                          <IntlMessages id="teacher.MajorLabel" />
                        </Label>
                        <h3>Mechannical Engineering</h3>
                        <br />
                        <br />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {' '}
                        <h3
                          className="bg-primary rounded "
                          style={{ padding: '1%', paddingInline: '3%' }}
                        >
                          {' '}
                          <IntlMessages id="forms.PermanentAddressLabel" />
                        </h3>
                        <Separator />
                        <br />
                        <Row>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <h3>
                              {provinces.map((pro) => {
                                if (teacher[0].main_province === pro.value)
                                  return pro.label;
                              })}
                            </h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h3>
                              {districts.map((pro) => {
                                if (teacher[0].main_district === pro.value)
                                  return pro.label;
                              })}
                            </h3>
                          </Colxx>
                        </Row>
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {' '}
                        <h3
                          className="bg-primary rounded "
                          style={{ padding: '1%', paddingInline: '3%' }}
                        >
                          {' '}
                          <IntlMessages id="forms.CurrentAddresslabel" />
                        </h3>
                        <Separator />
                        <br />
                        <Row>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <h3>
                              {provinces.map((pro) => {
                                if (teacher[0].current_province === pro.value)
                                  return pro.label;
                              })}
                            </h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h3>
                              {districts.map((pro) => {
                                if (teacher[0].current_district === pro.value)
                                  return pro.label;
                              })}
                            </h3>
                          </Colxx>
                        </Row>
                      </Colxx>
                    </Row>
                  </div>
                </CardBody>
              </Card>
              {/* Education Details Start */}
              <Card className="rounded m-4 mt-5">
                <CardBody>
                  <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                    {' '}
                    <h2
                      className="bg-primary "
                      style={{
                        padding: '8px',
                        paddingInline: '30px',
                        borderRadius: '10px',
                      }}
                    >
                      {' '}
                      <IntlMessages id="تحصیل" />
                    </h2>
                  </Colxx>

                  <Row className="justify-content-center   rounded ">
                    <Colxx style={{ paddingInline: '4%' }}>
                      <Modal
                        isOpen={educationAlert}
                        toggle={() => setEducationAlert(!educationAlert)}
                        style={{ marginTop: '10%' }}
                      >
                        <ModalHeader>
                          <IntlMessages id="modal.deletion-message-title" />
                        </ModalHeader>
                        <ModalBody className="text-center">
                          <IntlMessages id="modal.deletion-message-details" />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            onClick={() => setEducationAlert(false)}
                            style={{ marginLeft: '55%' }}
                          >
                            نه/ نخیر
                          </Button>
                          <Button
                            color="danger"
                            onClick={() => {
                              setEducationAlert(false);
                              deleteEducation(item.id);
                            }}
                            style={{ marginLeft: '5%' }}
                          >
                            هو / بلی
                          </Button>{' '}
                        </ModalFooter>
                      </Modal>
                      <table
                        className="table table-striped  table-lg"
                        style={{ fontSize: 18 }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">آیدی</th>
                            <th scope="col">پوهنتون/مرجع</th>
                            <th scope="col">درجه تحصیلی</th>
                            <th scope="col">رشته</th>
                            <th scope="col">د فراغت کال/سال فراغت</th>
                            <th scope="col">آسناد/ سی وی</th>
                            <th scope="col">توضیحات</th>
                            <th scope="col">ایدیت/دیلیت</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherEducation.map((item, index) => {
                            return (
                              <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.institution}</td>
                                <td>{item.degree}</td>
                                <td>{item.field_of_study}</td>
                                <td>{item.year_completed}</td>
                                <td>
                                  <a
                                    href={item.document}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Download
                                  </a>
                                </td>
                                <td>{item.description}</td>
                                <td>
                                  <BsPencilSquare
                                    color="green"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                    data-whatever="@getbootstrap"
                                    outline
                                    style={{ fontSize: '20px' }}
                                    id="updateIcon"
                                    onClick={() => handleRecord(item)}
                                  />

                                  <Popconfirm
                                    title="ډلیټ"
                                    icon={
                                      <BsTrashFill
                                        color="red"
                                        id="deleteIcon"
                                        outline
                                        style={{ fontSize: '20px' }}
                                      />
                                    }
                                    description={`مطمعین یاست چې  (${item.id})  ډیلیټ کړی. `}
                                    onConfirm={() => deleteEducation(item.id)}
                                    okText="ډیلیټ"
                                    okType="danger"
                                    cancelText="نه"
                                  >
                                    <BsTrashFill
                                      color="red"
                                      id="deleteIcon"
                                      outline
                                      style={{ fontSize: '20px' }}
                                    />
                                  </Popconfirm>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <br />
                      <br />
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        data-whatever="@getbootstrap"
                      >
                        اضافه نمودن تحصیل
                      </Button>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                ثبت تحصیل استاد
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={resetUpdate}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Formik
                                enableReinitialize={true}
                                initialValues={
                                  !updatingRecord
                                    ? {
                                        degree: [],
                                        institute: '',
                                        field_of_study: '',
                                        year_of_completion: [],
                                        description: '',
                                      }
                                    : {
                                        degree: degreeTypeOptions.filter(
                                          (inst) => {
                                            if (
                                              inst.value ===
                                              updatingRecord.degree
                                            )
                                              return inst;
                                          }
                                        ),
                                        institute: updatingRecord?.institution,

                                        field_of_study:
                                          updatingRecord.field_of_study,
                                        year_of_completion:
                                          dateOfBirthOptoions.filter((inst) => {
                                            if (
                                              inst.value ===
                                              updatingRecord.year_completed
                                            )
                                              return inst;
                                          }),
                                        description: updatingRecord.description,
                                      }
                                }
                                validationSchema={
                                  teacherEducationValidationSchema
                                }
                                onSubmit={(formData) => {
                                  addEducation(formData);
                                }}
                              >
                                {({
                                  errors,
                                  touched,
                                  values,
                                  setFieldTouched,
                                  setFieldValue,
                                  handleSubmit,
                                }) => (
                                  <>
                                    <form>
                                      <div className="form-group">
                                        <label
                                          for="degree"
                                          className="col-form-label"
                                        >
                                          دگری
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="degree"
                                          id="degree"
                                          value={values.degree}
                                          options={degreeTypeOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {touched.degree && errors.degree ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.degree}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="recipient-name"
                                          className="col-form-label"
                                        >
                                          پوهنتون/انستیتوت
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="institute"
                                        />
                                        {errors.institute &&
                                        touched.institute ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.institute}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="field_of_study"
                                          className="col-form-label"
                                        >
                                          رشته
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="field_of_study"
                                        />
                                        {errors.field_of_study &&
                                        touched.field_of_study ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.field_of_study}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="year_of_completion"
                                          className="col-form-label"
                                        >
                                          سال تکمیل
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>

                                        <FormikReactSelect
                                          name="year_of_completion"
                                          id="year_of_completion"
                                          defaultValue={
                                            values?.year_of_completion
                                          }
                                          options={dateOfBirthOptoions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.year_of_completion &&
                                        touched.year_of_completion ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.year_of_completion}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div className="form-group">
                                        <label
                                          for="description"
                                          className="col-form-label"
                                        >
                                          جزئیات
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="description"
                                        />
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="recipient-name"
                                          className="col-form-label"
                                        >
                                          Document
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className="form-control"
                                          type="file"
                                          id="formFile"
                                          onChange={(e) => {
                                            setCVFile(e.target.files[0]);
                                          }}
                                        />
                                      </div>
                                    </form>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={resetUpdate}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        // data-dismiss="modal"
                                        onClick={handleSubmit}
                                      >
                                        Add Education
                                      </button>
                                    </div>
                                  </>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
              {/* Education Details End */}
              {/* Contract Details Start */}
              <Card className="rounded m-4 mt-5">
                <CardBody>
                  <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                    {' '}
                    <h2
                      className="bg-primary "
                      style={{
                        padding: '8px',
                        paddingInline: '30px',
                        borderRadius: '10px',
                      }}
                    >
                      <IntlMessages id="قرارداد" />
                    </h2>
                  </Colxx>

                  <Row className="justify-content-center   rounded">
                    <Colxx style={{ paddingInline: '4%' }}>
                      <table
                        className="table table-striped table-lg"
                        style={{ fontSize: 18 }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">آیدی</th>
                            <th scope="col">نوع قرارداد/ قرارداد ډول</th>
                            <th scope="col">بست</th>
                            <th scope="col">قدم</th>
                            <th scope="col">نوع وظیفه</th>
                            <th scope="col">زبان</th>
                            <th scope="col">مدت قرارداد</th>
                            <th scope="col">آسناد</th>
                            <th scope="col">آیدیت/ دیلیت</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherContracts.map((item, index) => {
                            return (
                              <tr>
                                <th scope="row">{item.id}</th>
                                <td>
                                  {contractTypeOptions.map((inst) => {
                                    if (inst.value === item.contract_type)
                                      return (
                                        <IntlMessages
                                          id={inst.label.props.id}
                                        />
                                      );
                                  })}
                                </td>
                                <td>
                                  {gradeOptions.map((inst) => {
                                    if (inst.value === item.grade)
                                      return (
                                        <IntlMessages
                                          id={inst.label.props.id}
                                        />
                                      );
                                  })}
                                </td>
                                <td>
                                  {stepOptions.map((inst) => {
                                    if (inst.value === item.step)
                                      return (
                                        <IntlMessages
                                          id={inst.label.props.id}
                                        />
                                      );
                                  })}
                                </td>
                                <td>
                                  {jobTypeOptions.map((inst) => {
                                    if (inst.value === item.job_type)
                                      return inst.label;
                                  })}
                                </td>
                                <td>
                                  {langOptions.map((inst) => {
                                    if (inst.value === item.teaching_language)
                                      return (
                                        <IntlMessages
                                          id={inst.label.props.id}
                                        />
                                      );
                                  })}
                                </td>
                                <td>
                                  {item.start_date}-{item.end_date}
                                </td>
                                <td>
                                  <a
                                    href={item.document}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    ډاونلوډ
                                  </a>
                                </td>
                                <td>{item.description}</td>
                                <td>
                                  <BsPencilSquare
                                    color="green"
                                    data-toggle="modal"
                                    data-target="#contractModal"
                                    data-whatever="@getbootstrap"
                                    outline
                                    style={{ fontSize: '20px' }}
                                    id="updateIcon"
                                    onClick={() => handleRecord(item)}
                                  />

                                  <Popconfirm
                                    title="ډلیټ"
                                    icon={
                                      <BsTrashFill
                                        color="red"
                                        id="deleteIcon"
                                        outline
                                        style={{ fontSize: '20px' }}
                                      />
                                    }
                                    description={`مطمعین یاست چې  (${item.id})  ډیلیټ کړی. `}
                                    onConfirm={() => deleteContract(item.id)}
                                    okText="ډیلیټ"
                                    okType="danger"
                                    cancelText="نه"
                                  >
                                    <BsTrashFill
                                      color="red"
                                      id="deleteIcon"
                                      outline
                                      // onClick={() => setInsentiveAlert(true)}
                                      style={{ fontSize: '20px' }}
                                    />
                                  </Popconfirm>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <br />
                      <br />
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#contractModal"
                        data-whatever="@getbootstrap"
                      >
                        اضافه نمودن قرارداد
                      </Button>

                      <div
                        className="modal fade"
                        id="contractModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="contractModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="contractModalLabel"
                              >
                                ثبت قرارداد استاد
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                // onClick={resetUpdate}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Formik
                                enableReinitialize={true}
                                initialValues={
                                  !updatingRecord
                                    ? {
                                        jobType: [],
                                        grade: [],
                                        step: [],
                                        teaching_language: [],
                                        hireType: [],
                                        contract_type: [],
                                        institute: [],
                                        field: [],
                                        status: [],
                                      }
                                    : {
                                        jobType: jobTypeOptions.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.job_type
                                        ),
                                        grade: gradeOptions.find(
                                          (inst) =>
                                            inst.value === updatingRecord.grade
                                        ),
                                        step: stepOptions.find(
                                          (inst) =>
                                            inst.value === updatingRecord.step
                                        ),
                                        teaching_language: langOptions.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.teaching_language
                                        ),
                                        hireType: hireTypeOptions.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.hire_type
                                        ),
                                        contract_type: contractTypeOptions.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.contract_type
                                        ),
                                        institute: institutes.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.institute
                                        ),
                                        field: contextFields.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.teaching_field
                                        ),
                                        status:
                                          teacherContractStatusOptions.find(
                                            (inst) =>
                                              inst.value ===
                                              updatingRecord.status
                                          ),
                                        jobType: jobTypeOptions.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.job_type
                                        ),
                                      }
                                }
                                validationSchema={
                                  teacherContractValidationSchema
                                }
                                onSubmit={addContract}
                              >
                                {({
                                  errors,
                                  touched,
                                  values,
                                  setFieldTouched,
                                  setFieldValue,
                                  handleSubmit,
                                }) => (
                                  <>
                                    <form>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="institute"
                                            className="col-form-label"
                                          >
                                            Institute
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="institute"
                                            id="institute"
                                            value={values.institute}
                                            options={institutes}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.institute &&
                                          touched.institute ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.institute}
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className="form-group w-100">
                                          <label
                                            for="field"
                                            className="col-form-label"
                                          >
                                            Field
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="field"
                                            id="field"
                                            value={values.field}
                                            options={contextFields}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.field && touched.field ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.field}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label
                                          for="jobType"
                                          className="col-form-label"
                                        >
                                          job type
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="jobType"
                                          id="jobType"
                                          value={values.jobType}
                                          options={jobTypeOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.jobType && touched.jobType ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.jobType}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="grade"
                                            className="col-form-label"
                                          >
                                            Grade
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>

                                          <FormikReactSelect
                                            name="grade"
                                            id="grade"
                                            value={values.grade}
                                            options={gradeOptions}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.grade && touched.grade ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.grade}
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className="form-group w-100">
                                          <label
                                            for="step"
                                            className="col-form-label"
                                          >
                                            Step
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="step"
                                            id="step"
                                            value={values.step}
                                            options={stepOptions}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.step && touched.step ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.step}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label
                                          for="teaching_language"
                                          className="col-form-label"
                                        >
                                          Teaching Language
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="teaching_language"
                                          id="teaching_language"
                                          value={values.teaching_language}
                                          options={langOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.teaching_language &&
                                        touched.teaching_language ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.teaching_language}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="contractType"
                                          className="col-form-label"
                                        >
                                          Contract Type
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="contract_type"
                                          id="contract_type"
                                          value={values.contract_type}
                                          options={contractTypeOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.contract_type &&
                                        touched.contract_type ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.contract_type}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="hireType"
                                          className="col-form-label"
                                        >
                                          hireType
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="hireType"
                                          id="hireType"
                                          value={values.hireType}
                                          options={hireTypeOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.hireType && touched.hireType ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.hireType}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <div>
                                          <label
                                            for="year_of_completion"
                                            className="col-form-label"
                                          >
                                            Contract Start Date
                                          </label>
                                          <br />

                                          <DatePicker
                                            name="startDate"
                                            calendar={persian}
                                            locale={persian_fa}
                                            value={updatingRecord?.start_date}
                                            months={persianMonthOptions}
                                            onChange={(e) =>
                                              setStartDate(
                                                new Date(
                                                  e.toDate()
                                                ).getFullYear() +
                                                  '-' +
                                                  (new Date(
                                                    e.toDate()
                                                  ).getMonth() +
                                                    1) +
                                                  '-' +
                                                  new Date(e.toDate()).getDate()
                                              )
                                            }
                                          />
                                        </div>
                                        <div>
                                          <label
                                            for="year_of_completion"
                                            className="col-form-label"
                                          >
                                            Contract End Date
                                          </label>
                                          <br />

                                          <DatePicker
                                            name="endDate"
                                            calendar={persian}
                                            value={updatingRecord?.end_date}
                                            locale={persian_fa}
                                            months={persianMonthOptions}
                                            onChange={(e) => {
                                              if (!e) return;
                                              setEndDate(
                                                new Date(
                                                  e.toDate()
                                                ).getFullYear() +
                                                  '-' +
                                                  (new Date(
                                                    e.toDate()
                                                  ).getMonth() +
                                                    1) +
                                                  '-' +
                                                  new Date(e.toDate()).getDate()
                                              );
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div className="form-group w-100">
                                        <label
                                          for="institute"
                                          className="col-form-label"
                                        >
                                          حالت قرارداد
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="status"
                                          id="status"
                                          value={values.status}
                                          options={teacherContractStatusOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.status && touched.status ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.status}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div className="form-group">
                                        <label
                                          for="recipient-name"
                                          className="col-form-label"
                                        >
                                          Document
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <input
                                          className="form-control"
                                          type="file"
                                          id="formFile"
                                          onChange={(e) => {
                                            setCVFile(e.target.files[0]);
                                          }}
                                        />
                                      </div>
                                    </form>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={resetUpdate}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        // data-dismiss="modal"
                                        onClick={handleSubmit}
                                      >
                                        Add Contract
                                      </button>
                                    </div>{' '}
                                  </>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
              {/* Contract Details End */}
              {/* Evaluation Details Start */}
              <Card className="rounded m-4 mt-5">
                <CardBody>
                  <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                    {' '}
                    <h2
                      className="bg-primary "
                      style={{
                        padding: '8px',
                        paddingInline: '30px',
                        borderRadius: '10px',
                      }}
                    >
                      <IntlMessages id="ارزیابی" />
                    </h2>
                  </Colxx>

                  <Row className="justify-content-center   rounded">
                    <Colxx style={{ paddingInline: '4%' }}>
                      <table
                        className="table table-striped table-lg"
                        style={{ fontSize: 18 }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">آیدی</th>
                            <th scope="col">
                              د ارزوونکی نوم/ نام ارزیابی کننده
                            </th>
                            <th scope="col">د ارزونی ډول/ نوع ارزیابی</th>
                            <th scope="col">د ارزیابی نېټه/ تاریخ ارزیابی</th>
                            <th scope="col">انسستیوت</th>
                            <th scope="col">نمره</th>
                            <th scope="col">قوی نقطې/نقاط قوت</th>
                            <th scope="col">ضعیفې نقطې/ نقاط ضعف</th>
                            <th scope="col">توسعه</th>
                            <th scope="col">آیډیټ/ دیلیت</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherEvaluation.map((item, index) => {
                            return (
                              <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.evaluator_name}</td>
                                <td>{item.evaluation_type}</td>
                                <td>{item.evaluation_date}</td>
                                <td>{item.institute}</td>

                                <td>{item.score}</td>
                                <td>{item.strong_points}</td>
                                <td>{item.weak_points}</td>
                                <td>{item.suggestions}</td>
                                <td>
                                  {/* <a
                                    data-toggle="modal"
                                    data-target="#evaluationModal"
                                    data-whatever="@getbootstrap"
                                  >
                                    Edit
                                  </a>
                                  /<a>Delete</a> */}
                                  <BsPencilSquare
                                    color="green"
                                    data-toggle="modal"
                                    data-target="#evaluationModal"
                                    data-whatever="@getbootstrap"
                                    outline
                                    style={{ fontSize: '20px' }}
                                    id="updateIcon"
                                    onClick={() => handleRecord(item)}
                                  />

                                  <Popconfirm
                                    title="ډلیټ"
                                    icon={
                                      <BsTrashFill
                                        color="red"
                                        id="deleteIcon"
                                        outline
                                        style={{ fontSize: '20px' }}
                                      />
                                    }
                                    description={`مطمعین یاست چې  (${item.id})  ډیلیټ کړی. `}
                                    onConfirm={() => deleteEvaluation(item.id)}
                                    okText="ډیلیټ"
                                    okType="danger"
                                    cancelText="نه"
                                  >
                                    <BsTrashFill
                                      color="red"
                                      id="deleteIcon"
                                      outline
                                      // onClick={() => setInsentiveAlert(true)}
                                      style={{ fontSize: '20px' }}
                                    />
                                  </Popconfirm>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <br />
                      <br />
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#evaluationModal"
                        data-whatever="@getbootstrap"
                      >
                        اضافه نمودن ارزیابی
                      </Button>

                      <div
                        className="modal fade"
                        id="evaluationModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="evaluationModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="evaluationModalLabel"
                              >
                                ثبت ارزیابی
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Formik
                                enableReinitialize={true}
                                initialValues={
                                  !updatingRecord
                                    ? {
                                        topic: '',
                                        evaluator_name: '',
                                        evaluation_type: [],
                                        strong_points: '',
                                        weak_points: '',
                                        suggestions: '',
                                        evaluation_date: '',
                                        institute: [],
                                        department: [],
                                        classs: [],
                                        subject: [],
                                      }
                                    : {
                                        topic: updatingRecord.topic,
                                        evaluator_name:
                                          updatingRecord.evaluator_name,
                                        evaluation_type:
                                          evaluationTypeOptions.find(
                                            (inst) =>
                                              inst.value ===
                                              updatingRecord.evaluation_type
                                          ),
                                        strong_points:
                                          updatingRecord.strong_points,
                                        weak_points: updatingRecord.weak_points,
                                        suggestions: updatingRecord.suggestions,
                                        evaluation_date:
                                          updatingRecord.evaluation_date,
                                        institute: institutes.find(
                                          (inst) =>
                                            inst.value ===
                                            updatingRecord.institute
                                        ),
                                        department: departments.find(
                                          (dep) =>
                                            dep.value ===
                                            updatingRecord.department
                                        ),
                                        classs: classes.find(
                                          (dep) =>
                                            dep.value === updatingRecord.classs
                                        ),
                                        subject: subjects.find(
                                          (dep) =>
                                            dep.value === updatingRecord.subject
                                        ),
                                      }
                                }
                                validationSchema={
                                  teacherEvaluationValidationSchema
                                }
                                onSubmit={(formData) => {
                                  addEvaluation(formData);
                                }}
                              >
                                {({
                                  errors,
                                  touched,
                                  values,
                                  setFieldTouched,
                                  setFieldValue,
                                  handleSubmit,
                                }) => (
                                  <>
                                    <form>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="evaluator_name"
                                            className="col-form-label"
                                          >
                                            Evaluator
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <Field
                                            className="form-control fieldStyle"
                                            name="evaluator_name"
                                          />
                                          {errors.evaluator_name &&
                                          touched.evaluator_name ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.evaluator_name}
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className="form-group w-100">
                                          <label
                                            for="evaluation_type"
                                            className="col-form-label"
                                          >
                                            Evaluation Type
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="evaluation_type"
                                            id="evaluation_type"
                                            value={values.evaluation_type}
                                            options={evaluationTypeOptions}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.evaluation_type &&
                                          touched.evaluation_type ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.evaluation_type}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>

                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="institute"
                                            className="col-form-label"
                                          >
                                            institute
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="institute"
                                            id="institute"
                                            value={values.institute}
                                            options={institutes}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.institute &&
                                          touched.institute ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.institute}
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className="form-group w-100">
                                          <label
                                            for="department"
                                            className="col-form-label"
                                          >
                                            department
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="department"
                                            id="department"
                                            value={values.department}
                                            options={departments}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.department &&
                                          touched.department ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.department}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="classs"
                                          className="col-form-label"
                                        >
                                          Class
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="classs"
                                          id="classs"
                                          value={values.classs}
                                          options={classes}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.classs && touched.classs ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.classs}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="subject"
                                            className="col-form-label"
                                          >
                                            subject
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>

                                          <FormikReactSelect
                                            name="subject"
                                            id="subject"
                                            value={values.subject}
                                            options={subjects}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.subject && touched.subject ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.subject}
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className="">
                                          <label
                                            for="year_of_completion"
                                            className="col-form-label"
                                          >
                                            Evaluation Date
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <br />

                                          <DatePicker
                                            style={{
                                              width: '100%',
                                              height: 38,
                                              borderRadius: 0,
                                            }}
                                            name="evaluation_date"
                                            calendar={persian}
                                            locale={persian_fa}
                                            value={
                                              updatingRecord?.evaluation_date
                                            }
                                            months={persianMonthOptions}
                                            onChange={(e) =>
                                              setEvaluationDate(
                                                new Date(
                                                  e.toDate()
                                                ).getFullYear() +
                                                  '-' +
                                                  (new Date(
                                                    e.toDate()
                                                  ).getMonth() +
                                                    1) +
                                                  '-' +
                                                  new Date(e.toDate()).getDate()
                                              )
                                            }
                                          />
                                        </div>
                                      </div>

                                      <div className="form-group">
                                        <label
                                          for="topic"
                                          className="col-form-label"
                                        >
                                          Topic
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="topic"
                                        />
                                        {errors.topic && touched.topic ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.topic}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="strong_points"
                                          className="col-form-label"
                                        >
                                          Strong Points
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="strong_points"
                                        />
                                        {errors.strong_points &&
                                        touched.strong_points ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.strong_points}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="weak_points"
                                          className="col-form-label"
                                        >
                                          Weak Points
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="weak_points"
                                        />
                                        {errors.weak_points &&
                                        touched.weak_points ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.weak_points}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div className="form-group">
                                        <label
                                          for="suggestions"
                                          className="col-form-label"
                                        >
                                          Suggestions
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="suggestions"
                                        />
                                        {errors.suggestions &&
                                        touched.suggestions ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.suggestions}
                                          </div>
                                        ) : null}
                                      </div>
                                      <label
                                        for="score"
                                        className="col-form-label"
                                      >
                                        Score
                                        <span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <Col span={4}>
                                          <InputNumber
                                            min={1}
                                            max={10}
                                            style={{ margin: '0 16px' }}
                                            value={score}
                                            onChange={(val) => setScore(val)}
                                          />
                                        </Col>
                                        <Col span={17}>
                                          <Slider
                                            min={1}
                                            max={10}
                                            onChange={(val) => setScore(val)}
                                            value={
                                              typeof score === 'number'
                                                ? score
                                                : 0
                                            }
                                          />
                                        </Col>
                                      </div>
                                    </form>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={resetUpdate}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        // data-dismiss="modal"
                                        onClick={handleSubmit}
                                      >
                                        Add Contract
                                      </button>
                                    </div>{' '}
                                  </>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Colxx>
                  </Row>

                  {/* HR Evaluation */}
                  <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                    {' '}
                    <h2
                      className="bg-primary "
                      style={{
                        padding: '8px',
                        paddingInline: '30px',
                        borderRadius: '10px',
                      }}
                    >
                      <IntlMessages id="ارزیابی منابع بشری" />
                    </h2>
                  </Colxx>

                  <Row className="justify-content-center   rounded">
                    <Colxx style={{ paddingInline: '4%' }}>
                      <table
                        className="table table-striped table-lg"
                        style={{ fontSize: 18 }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">آیدی</th>
                            <th scope="col">اسم ارزیابی کننده</th>
                            <th scope="col">تاریخ ارزیابی نېټه</th>
                            <th scope="col">انسستتیوت</th>
                            <th scope="col">نمره</th>
                            <th scope="col">بست فعلی</th>
                            <th scope="col">بست جدید</th>
                            <th scope="col">حالت</th>
                            <th scope="col">ایډیټ/ډیلیټ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherHREvaluation.map((item, index) => {
                            return (
                              <tr>
                                <th scope="row">{item.id}</th>
                                <td>{item.evaluator_name}</td>
                                <td>{item.evaluation_date}</td>
                                <td>{item.institute}</td>

                                <td>{item.score}</td>
                                <td>{item.current_grade}</td>
                                <td>{item.new_grade}</td>
                                <td>{item.review_status}</td>
                                <td>
                                  <BsPencilSquare
                                    color="green"
                                    data-toggle="modal"
                                    data-target="#hrEvaluationModal"
                                    data-whatever="@getbootstrap"
                                    outline
                                    style={{ fontSize: '20px' }}
                                    id="updateIcon"
                                    onClick={() => handleRecord(item)}
                                  />

                                  <Popconfirm
                                    title="ډلیټ"
                                    icon={
                                      <BsTrashFill
                                        color="red"
                                        id="deleteIcon"
                                        outline
                                        style={{ fontSize: '20px' }}
                                      />
                                    }
                                    description={`مطمعین یاست چې  (${item.id})  ډیلیټ کړی. `}
                                    onConfirm={() =>
                                      deleteHREvaluation(item.id)
                                    }
                                    okText="ډیلیټ"
                                    okType="danger"
                                    cancelText="نه"
                                  >
                                    <BsTrashFill
                                      color="red"
                                      id="deleteIcon"
                                      outline
                                      // onClick={() => setInsentiveAlert(true)}
                                      style={{ fontSize: '20px' }}
                                    />
                                  </Popconfirm>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <br />
                      <br />
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#hrEvaluationModal"
                        data-whatever="@getbootstrap"
                      >
                        اضافه نمودن ارزیابی منابع بشری
                      </Button>

                      <div
                        className="modal fade"
                        id="hrEvaluationModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="hrEvaluationModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="hrEvaluationModalLabel"
                              >
                                ثبت ارزیابی
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Formik
                                enableReinitialize={true}
                                initialValues={
                                  !updatingRecord
                                    ? {
                                        evaluator_name: '',
                                        evaluation_date: '',
                                        institute: [],
                                        grade: [],
                                        step: [],
                                      }
                                    : {
                                        evaluator_name:
                                          updatingRecord.evaluator_name,
                                        evaluation_date:
                                          updatingRecord.evaluation_date,
                                        institute: institutes.filter((inst) => {
                                          if (
                                            inst.value ===
                                            updatingRecord.institute
                                          )
                                            return inst;
                                        }),
                                        grade: gradeOptions.filter((inst) => {
                                          if (
                                            inst.value ===
                                            updatingRecord.new_grade
                                          )
                                            return inst;
                                        }),
                                        step: stepOptions.filter((inst) => {
                                          if (
                                            inst.value ===
                                            updatingRecord.new_step
                                          )
                                            return inst;
                                        }),
                                      }
                                }
                                validationSchema={
                                  teacherHREvaluationValidationSchema
                                }
                                onSubmit={(formData) => {
                                  addHREvaluation(formData);
                                }}
                              >
                                {({
                                  errors,
                                  touched,
                                  values,
                                  setFieldTouched,
                                  setFieldValue,
                                  handleSubmit,
                                }) => (
                                  <>
                                    <form>
                                      <div className="form-group w-100">
                                        <label
                                          for="evaluator_name"
                                          className="col-form-label"
                                        >
                                          Evaluator
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="evaluator_name"
                                        />
                                        {errors.evaluator_name &&
                                        touched.evaluator_name ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.evaluator_name}
                                          </div>
                                        ) : null}
                                      </div>

                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="institute"
                                            className="col-form-label"
                                          >
                                            institute
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="institute"
                                            id="institute"
                                            value={values.institute}
                                            options={institutes}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.institute &&
                                          touched.institute ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.institute}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="form-group w-100">
                                          <label
                                            for="grade"
                                            className="col-form-label"
                                          >
                                            Grade
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>

                                          <FormikReactSelect
                                            name="grade"
                                            id="grade"
                                            value={values.grade}
                                            options={gradeOptions}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.grade && touched.grade ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.grade}
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className="form-group w-100">
                                          <label
                                            for="step"
                                            className="col-form-label"
                                          >
                                            Step
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <FormikReactSelect
                                            name="step"
                                            id="step"
                                            value={values.step}
                                            options={stepOptions}
                                            onChange={setFieldValue}
                                            onBlur={setFieldTouched}
                                            required
                                          />
                                          {errors.step && touched.step ? (
                                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                              {errors.step}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>

                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                        }}
                                      >
                                        <div className="">
                                          <label
                                            for="year_of_completion"
                                            className="col-form-label"
                                          >
                                            Evaluation Date
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </label>
                                          <br />

                                          <DatePicker
                                            placeholder="Date"
                                            style={{
                                              width: '100%',
                                              height: 38,
                                              borderRadius: 0,
                                            }}
                                            name="evaluation_date"
                                            calendar={persian}
                                            locale={persian_fa}
                                            value={
                                              updatingRecord?.evaluation_date
                                            }
                                            months={persianMonthOptions}
                                            onChange={(e) =>
                                              setEvaluationDate(
                                                new Date(
                                                  e.toDate()
                                                ).getFullYear() +
                                                  '-' +
                                                  (new Date(
                                                    e.toDate()
                                                  ).getMonth() +
                                                    1) +
                                                  '-' +
                                                  new Date(e.toDate()).getDate()
                                              )
                                            }
                                          />
                                        </div>
                                      </div>

                                      <label
                                        for="score"
                                        className="col-form-label"
                                      >
                                        Score
                                        <span style={{ color: 'red' }}>*</span>
                                      </label>
                                      <div
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'space-between',
                                        }}
                                      >
                                        <Col span={4}>
                                          <InputNumber
                                            min={1}
                                            max={10}
                                            style={{ margin: '0 16px' }}
                                            value={score}
                                            onChange={(val) => setScore(val)}
                                          />
                                        </Col>
                                        <Col span={17}>
                                          <Slider
                                            min={1}
                                            max={10}
                                            onChange={(val) => setScore(val)}
                                            value={
                                              typeof score === 'number'
                                                ? score
                                                : 0
                                            }
                                          />
                                        </Col>
                                      </div>
                                    </form>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={resetUpdate}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        // data-dismiss="modal"
                                        onClick={handleSubmit}
                                      >
                                        Add HR Evaluation
                                      </button>
                                    </div>{' '}
                                  </>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                  {/* HR Evaluation End */}
                </CardBody>
              </Card>
              {/* Evaluation Details End */}
              {/* Insentives Start */}
              <Card className="rounded m-4 mt-5">
                <CardBody>
                  <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                    {' '}
                    <h2
                      className="bg-primary "
                      style={{
                        padding: '8px',
                        paddingInline: '30px',
                        borderRadius: '10px',
                      }}
                    >
                      <IntlMessages id="Insentives" />
                    </h2>
                  </Colxx>

                  <Row className="justify-content-center   rounded">
                    <Colxx style={{ paddingInline: '4%' }}>
                      <table
                        className="table table-striped table-lg"
                        style={{ fontSize: 18 }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">آیدی</th>
                            <th scope="col">استاد/معلم</th>
                            <th scope="col">انستتیوت</th>
                            <th scope="col">نوع</th>
                            <th scope="col">توضیحات</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherIncentives.map((item, index) => {
                            return (
                              <tr key={item.id}>
                                <th scope="row">{item.id}</th>
                                <td>{item.teacher}</td>
                                <td>{item.institute}</td>
                                <td>{item.type}</td>
                                <td>{item.details}</td>
                                <td>
                                  <BsPencilSquare
                                    color="green"
                                    data-toggle="modal"
                                    data-target="#incentiveModal"
                                    data-whatever="@getbootstrap"
                                    outline
                                    style={{ fontSize: '20px' }}
                                    id="updateIcon"
                                    onClick={() => handleRecord(item)}
                                  />
                                  <Popconfirm
                                    title="ډلیټ"
                                    icon={
                                      <BsTrashFill
                                        color="red"
                                        id="deleteIcon"
                                        outline
                                        style={{ fontSize: '20px' }}
                                      />
                                    }
                                    description={`مطمعین یاست چې  (${item.id})  ډیلیټ کړی. `}
                                    onConfirm={() => deleteInsentive(item.id)}
                                    okText="ډیلیټ"
                                    okType="danger"
                                    cancelText="نه"
                                  >
                                    <BsTrashFill
                                      color="red"
                                      id="deleteIcon"
                                      outline
                                      // onClick={() => setInsentiveAlert(true)}
                                      style={{ fontSize: '20px' }}
                                    />
                                  </Popconfirm>
                                </td>
                                <Modal
                                  isOpen={insentiveAlert}
                                  toggle={() =>
                                    setInsentiveAlert(!insentiveAlert)
                                  }
                                  style={{ marginTop: '10%' }}
                                >
                                  <ModalHeader>
                                    <IntlMessages id="modal.deletion-message-title" />
                                  </ModalHeader>
                                  <ModalBody className="text-center">
                                    <IntlMessages id="modal.deletion-message-details" />
                                  </ModalBody>
                                  <ModalFooter>
                                    <Button
                                      onClick={() => setInsentiveAlert(false)}
                                      style={{ marginLeft: '55%' }}
                                    >
                                      نه/ نخیر
                                    </Button>
                                    <Button
                                      color="danger"
                                      onClick={() => {
                                        setInsentiveAlert(false);
                                        deleteInsentive(item.id);
                                      }}
                                      style={{ marginLeft: '5%' }}
                                    >
                                      هو / بلی
                                    </Button>
                                  </ModalFooter>
                                </Modal>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <br />
                      <br />
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#incentiveModal"
                        data-whatever="@getbootstrap"
                      >
                        Save Incentive
                      </Button>

                      <div
                        className="modal fade"
                        id="incentiveModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="incentiveModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="incentiveModalLabel"
                              ></h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={resetUpdate}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Formik
                                enableReinitialize={true}
                                initialValues={
                                  !updatingRecord
                                    ? {
                                        institute: [],
                                        type: [],
                                        details: '',
                                      }
                                    : {
                                        institute: institutes.filter((inst) => {
                                          if (
                                            inst.value ===
                                            updatingRecord.institute
                                          )
                                            return inst;
                                        }),
                                        type: teacherFeedbackOptions.filter(
                                          (inst) => {
                                            if (
                                              inst.value === updatingRecord.type
                                            )
                                              return inst;
                                          }
                                        ),
                                        details: updatingRecord.details,
                                      }
                                }
                                validationSchema={
                                  teacherIncentivesValidationSchema
                                }
                                onSubmit={addIncentive}
                              >
                                {({
                                  errors,
                                  touched,
                                  values,
                                  setFieldTouched,
                                  setFieldValue,
                                  handleSubmit,
                                }) => (
                                  <>
                                    <form>
                                      <div className="form-group w-100">
                                        <label
                                          for="type"
                                          className="col-form-label"
                                        >
                                          Type
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="type"
                                          id="type"
                                          value={values.type}
                                          options={teacherFeedbackOptions}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.type && touched.type ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.type}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group w-100">
                                        <label
                                          for="institute"
                                          className="col-form-label"
                                        >
                                          institute
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <FormikReactSelect
                                          name="institute"
                                          id="institute"
                                          value={values.institute}
                                          options={institutes}
                                          onChange={setFieldValue}
                                          onBlur={setFieldTouched}
                                          required
                                        />
                                        {errors.institute &&
                                        touched.institute ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.institute}
                                          </div>
                                        ) : null}
                                      </div>
                                      <div className="form-group">
                                        <label
                                          for="recipient-name"
                                          className="col-form-label"
                                        >
                                          Description
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          className="form-control fieldStyle"
                                          name="details"
                                        />
                                        {errors.details && touched.details ? (
                                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                            {errors.details}
                                          </div>
                                        ) : null}
                                      </div>
                                    </form>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-dismiss="modal"
                                        onClick={resetUpdate}
                                      >
                                        Close
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        // data-dismiss="modal"
                                        onClick={handleSubmit}
                                      >
                                        Add Insentive
                                        {loading && <Spin />}
                                      </button>
                                    </div>
                                  </>
                                )}
                              </Formik>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
              {/* Insentives End */}
              <Card className="rounded m-4 mt-5">
                <CardBody>
                  <div>
                    <Row>
                      <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                        {' '}
                        <h2
                          className="bg-primary "
                          style={{
                            padding: '8px',
                            paddingInline: '30px',
                            borderRadius: '10px',
                          }}
                        >
                          <IntlMessages id="teacher.JobDeteilsLabel" />
                        </h2>
                      </Colxx>
                    </Row>
                    <Row className="justify-content-center   rounded ">
                      <Colxx style={{ paddingInline: '4%' }} xxs="">
                        <Label>
                          <IntlMessages id="teacher.ProfessionalRanksLabel" />
                        </Label>
                        <h3>مسلک پوه</h3>
                        <Label>
                          <IntlMessages id="teacher.StatusLabel" />
                        </Label>
                        <h3>فعال</h3>

                        <Label>
                          <IntlMessages id="teacher.GradeLabel" />
                        </Label>
                        <h3>پنجم / پنځم</h3>
                        <Label>
                          <IntlMessages id="teacher.StepLabel" />
                        </Label>
                        <h3>لومړی/ اول</h3>

                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        <Label>
                          <IntlMessages id="teacher.jobLocationLabel" />
                        </Label>
                        <h3>انستیتوت زراعت و وترنری کابل</h3>
                        <Label>
                          <IntlMessages id="teacher.teachingFieldLabel" />
                        </Label>
                        <h3>هارتیکلچر</h3>
                        <Label>
                          <IntlMessages id="teacher.appointmentTypeLabel" />
                        </Label>
                        <h3>رسمی</h3>

                        <Label>
                          <IntlMessages id="teacher.contractTypeLabel" />
                        </Label>
                        <h3>داخل د تشکیل</h3>

                        <br />
                        <br />
                      </Colxx>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </>
          ) : (
            <div className="p-2">
              <Row className="justify-content-center pt-5 rounded">
                <Colxx xxs="10">
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="teacher.EvalautionHrTitle1" />
                      </CardTitle>

                      <Table striped>
                        <thead>
                          <tr>
                            <th># </th>
                            <th>
                              <IntlMessages id="forms.InstituteLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="teacher.curretGradeLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="teacher.currentStepLabel" />
                            </th>
                            <th>
                              <IntlMessages id="teacher.newGradeLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="teacher.newStepLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="marks.Marks" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="teacher.evaluationDateLabel" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherHREvaluation.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item?.institute_id?.name}</td>
                              <td>{item?.current_grade}</td>
                              <td>{item?.current_step}</td>
                              <td>{item?.new_grade}</td>
                              <td>{item?.new_step}</td>
                              <td>{item?.score}</td>
                              <td>{item?.evaluation_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>

              <Row className="justify-content-center pt-5 rounded">
                <Colxx xxs="10">
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="teacher.EvalautionTitle1" />
                      </CardTitle>

                      <Table striped>
                        <thead>
                          {/* <tr>
                                <th># </th>
                                <th>
                                  <IntlMessages id="forms.InstituteLabel" />
                                </th>
                                <th>
                                  {' '}
                                  <IntlMessages id="teacher.curretGradeLabel" />
                                </th>
                                <th>
                                  {' '}
                                  <IntlMessages id="teacher.currentStepLabel" />
                                </th>
                                <th>
                                  <IntlMessages id="teacher.newGradeLabel" />
                                </th>

                                <th>
                                  {' '}
                                  <IntlMessages id="marks.Marks" />
                                </th>
                                <th>
                                  {' '}
                                  <IntlMessages id="teacher.evaluationDateLabel" />
                                </th>
                              </tr> */}
                          <tr>
                            <th># </th>
                            <th>
                              <IntlMessages id="forms.InstituteLabel" />
                            </th>
                            <th> دیپارتمنت</th>
                            <th> صنف - سمستر</th>
                            <th>مضمون</th>

                            <th>
                              {' '}
                              <IntlMessages id="marks.Marks" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="teacher.evaluationDateLabel" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {teacherEvaluation.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item?.institute_id?.name}</td>
                              <td>{item?.department_id?.name}</td>
                              <td>
                                {item?.class_id?.name +
                                  ' - ' +
                                  item?.class_id?.semester}
                              </td>
                              <td>{item?.topic}</td>
                              <td>{item?.score}</td>
                              <td>{item?.evaluation_date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>

              <Row className="justify-content-center pt-5 rounded">
                <Colxx xxs="10">
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>
                        <IntlMessages id="teacher.Transfer" />
                      </CardTitle>

                      <Table striped>
                        <thead>
                          {/* <tr>
                                <th># </th>
                                <th>
                                  <IntlMessages id="forms.InstituteLabel" />
                                </th>
                                <th>
                                  {' '}
                                  <IntlMessages id="teacher.curretGradeLabel" />
                                </th>
                                <th>
                                  {' '}
                                  <IntlMessages id="teacher.currentStepLabel" />
                                </th>
                              </tr> */}
                          <tr>
                            <th># </th>
                            <th>
                              <IntlMessages id="forms.InstituteLabel" />
                            </th>
                            <th> ولایت</th>
                            <th> د مقرری تاریخ</th>
                            {/* <th>
                                  <IntlMessages id="teacher.newGradeLabel" />
                                </th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {teacherTransfer.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.institute_id.name}</td>
                              <td>{item.institute_id.province}</td>
                              <td>{item.hire_date}</td>
                            </tr>
                          ))}

                          {/*                           
                              <tr>
                                <th scope="row">2</th>

                                <td>شریفی</td>
                                <td>@hsn_shrf548</td>
                                <td>حسن</td>
                                <td>شریفی</td>
                              </tr> */}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>

              <Card className="rounded">
                <CardBody>
                  <Row
                    className="  p-2"
                    style={{ borderRadius: '5px', minHeight: '200px' }}
                  >
                    <Colxx className="m-3 border">
                      {' '}
                      <h1 className="p-2">مکافات</h1>
                      <div className="p-2" style={{ minHeight: '150px' }}>
                        یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری
                        که انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار
                        نباشد روش ها و تکنیک های دیگر برای تبدیل شدن به استاد
                        خوب موثر واقع نخواهد شد. استاد باید دروسی را تدریس کند
                        که خودش به آن درس ها علاقه دارد و بر آن دروس مسلط است.
                        اساتید عالی معمولا همواره در حال یادگیری هستند و تونایی
                        های خودشان را به صورت مداوم افزایش می دهند. این اساتید
                        در کلاس درس به دانشجو احترام می گذارند و سعی می کنند
                        مطالب را از دید دانشجو ببینند و به ساده ترین زبان ممکن
                        مطالب را توضیح می دهند. در کلاس های دانشگاه بسیار خوب
                        است کلاس به صورت دوطرفه و تعاملی برگزار گردد. اساتید خوب
                        که دانشجویان راضی و موفقی دارند اینطور نیست که در کلاس
                        فقط خودشان حرف بزنند و متکلم وحده باشند. به هر میزان
                        دانشجویان در کلاس مشارکت بیشتری داشته باشند در نهایت
                        بازدهی کلاس بالاتر خواهد بود. اساتید خوب با پرسیدن
                        سوالات مناسب حین تدریس سطح سواد دانشجویان را مورد
                        ارزیابی قرار می دهند و متناسب با آن تدریس می کنند. این
                        اساتید جو راحت و آزادی را در کلاس ایجاد می نمایند به
                        گونه ای که دانشجویان در عین حال که به استاد و کلاس
                        احترام می گذارند سوالات خودشان را هم راحت می پرسند و
                        اظهار نظر می کنند. در ادامه با استناد به مقالات معتبر
                        علمی در رابطه با ویژگی های استاد خوب توضیح داده می شود.
                      </div>
                    </Colxx>

                    <Colxx className="m-3 border">
                      {' '}
                      <h1 className="p-2">مجازات</h1>
                      <div className="p-2" style={{ minHeight: '150px' }}>
                        یک استاد (یا معلم خصوصی) خوب در مرحله اول باید به کاری
                        که انجام می دهد علاقه داشته باشد. اگر علاقه ای در کار
                        نباشد روش ها و تکنیک های دیگر برای تبدیل شدن به استاد
                        خوب موثر واقع نخواهد شد. استاد باید دروسی را تدریس کند
                        که خودش به آن درس ها علاقه دارد و بر آن دروس مسلط است.
                        اساتید عالی معمولا همواره در حال یادگیری هستند و تونایی
                        های خودشان را به صورت مداوم افزایش می دهند. این اساتید
                        در کلاس درس به دانشجو احترام می گذارند و سعی می کنند
                        مطالب را از دید دانشجو ببینند و به ساده ترین زبان ممکن
                        مطالب را توضیح می دهند.
                      </div>
                    </Colxx>
                  </Row>
                </CardBody>
              </Card>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TeacherProfile;
