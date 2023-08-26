import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import callApi from 'helpers/callApi';

import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { NavLink } from 'react-router-dom';
import './../../.././../assets/css/global-style.css';
import profilePhoto from './../../../../assets/img/profiles/user.png';

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
import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  // Table,
  InputGroup,
  InputGroupAddon,
  Input,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Select from 'react-select';
import logo from './../../../../assets/logos/AdminLogo.png';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import config from '../../../../config';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import Classes from 'views/app/classes';
import { AuthContext } from 'context/AuthContext';
import { teacherFeedbackOptions } from 'views/app/global-data/options';

const servicePath = config.API_URL;
const studentApiUrl = `${servicePath}/api/`;

const StudentProfile = () => {
  const { institutes, provinces, districts } = useContext(AuthContext);
  const { studentId } = useParams();
  const [isNext, setIsNext] = useState(true);
  const [student, setStudent] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [classs, setClasss] = useState([]); //classs is used because class is a reserved word
  const [dorm, setDorm] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [insentiveAlert, setInsentiveAlert] = useState(false);
  const [updatingRecord, setUpdatingRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [studentInstitute, setStudentInstitutes] = useState();

  const provincesList = {};
  const districtsList = {};

  provinces.forEach((province) => {
    provincesList[province.value] = province.label;
  });

  districts.forEach((districts) => {
    districtsList[districts.value] = districts.label;
  });
  async function fetchStudentInstitutes() {
    const response = await callApi(
      `teachers/${teacherId}/feedbacks/`,
      '',
      null
    );

    const data = response.data;
    setStudentInstitutes(data);
  }
  let recId;
  const resetUpdate = () => {
    setUpdatingRecord(null);
    recId = null;
    setStartDate(null);
    setEndDate(null);
  };
  const handleRecord = (item) => {
    recId = item.id;
    setUpdatingRecord(item);
    setStartDate(item.startDate);
    setEndDate(item.endDate);
  };
  const deleteInsentive = async (item) => {
    await callApi(`students/${studentId}/feedbacks/${item}/`, 'DELETE').then(
      (response) => {
        fetchStudentInstitutes();
      }
    );
  };
  const addInstitute = async (inputData, { resetForm }) => {
    setLoading(true);
    let apiParams = {
      endPoint: `students/${studentId}/institute/`,
      method: 'POST',
    };
    if (recId || updatingRecord.id) {
      apiParams.endPoint = `students/${studentId}/institute/${updatingRecord.id}/`;
      apiParams.method = 'PATCH';
    }
    const data = {
      type: inputData.type?.value,
      teacher: teacher[0].id,
      institute: inputData.institute?.value,
      details: inputData.details,
    };
    await callApi(apiParams.endPoint, apiParams.method, data).then(
      (response) => {
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
  //load data of student from database
  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await callApi(`students/${studentId}/`, '', null);

        if (response.data && response.status === 200) {
          const data = await response.data;
          setStudent([data]);
          setIsLoaded(true);
        }

        const instituteResponse = await callApi(
          `students/student_institutes/?student__id=${studentId}`,
          '',
          null
        );

        if (instituteResponse.data && instituteResponse.status === 200) {
          const instituteData = await instituteResponse.data;
          setInstitute(instituteData?.results);
        }

        //type =1 means current class or current continued class
        const classResponse = await callApi(
          `students/student_class/?student=${studentId}&stauts=inprogress`,
          '',
          null
        );

        if (classResponse.data && classResponse.status === 200) {
          const classData = await classResponse.data;
          setClasss(classData);
        }

        const dormResponse = await callApi(
          `students/student_dorms/?student=${studentId}`,
          '',
          null
        );
        if (dormResponse.data && dormResponse.status === 200) {
          const dormData = await dormResponse.data;
          setDorm(dormData);
        }

        const marksResponse = await callApi(
          `students/TranscriptData/?student=${studentId}`,
          '',
          null
        );
        if (marksResponse.data && marksResponse.status === 200) {
          const marksData = await marksResponse.data;
          setMarks(marksData);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchStudent();
  }, []);

  const handleClick = (event) => {
    setIsNext(event);
  };

  const style2 = {
    padding: '',
  };
  const style1 = {
    backgroungColor: 'blue',
  };

  return (
    <>
      <Row className="position-static">
        <Colxx className="m-5" xxs="8">
          <div className=" ml-5">
            <h2 className=" mt-3 titleStyle">
              {<IntlMessages id="student.Profile" />}
            </h2>
          </div>
        </Colxx>
        <Colxx className="mt-4 " style={{ paddingRight: '10%' }}>
          <div className=" align-items-center flex-column ">
            <img src={logo} alt="Logo" width={'50%'} />
            <p>
              د تخنیکی او مسلکی زده کړو اداره
              <br />
              اداره تعلیمات تخنیکی و مسلکی
            </p>
          </div>
        </Colxx>
      </Row>
      {!isLoaded ? (
        <div className="loading" />
      ) : (
        <div>
          <Row>
            <Colxx xxs="1"></Colxx>
            {student.length > 0 && (
              <Colxx>
                <a
                  href={student[0].photo}
                  className="w-40 w-sm-100"
                  target="_blank"
                >
                  <img
                    top
                    alt={student[0].name}
                    src={student[0].photo || profilePhoto}
                    style={{
                      maxWidth: '12%',
                      maxHeight: '130%',
                      borderRadius: '5px',
                    }}
                  />
                </a>
              </Colxx>
            )}
          </Row>
          <Row>
            <Colxx
              className=" d-flex justify-content-center "
              style={{ marginBottom: '2%' }}
            >
              {' '}
              <div className="d-inline-block">
                <Button
                  style={{
                    backgroundColor: isNext ? 'blue' : '',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                  className="m-2"
                  onClick={() => {
                    handleClick(true);
                  }}
                >
                  <span className="label">
                    <IntlMessages id="button.Teacherprofile" />
                  </span>
                </Button>
                <Button
                  style={{
                    backgroundColor: !isNext ? 'blue' : '',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                  className="m-2 "
                  onClick={() => {
                    handleClick(false);
                  }}
                >
                  <IntlMessages id="student.results" />
                </Button>{' '}
              </div>
            </Colxx>
          </Row>
        </div>
      )}
      {/* if student is loaded show it, if not show empty  */}
      {student?.length > 0 && institute?.length > 0 && classs?.length > 0 && (
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
                          className="bg-primary data-style "
                          style={{
                            padding: '8px',
                            paddingInline: '30px',
                            borderRadius: '10px',
                          }}
                        >
                          {' '}
                          <IntlMessages id="forms.personalInfo" />
                        </h2>
                      </Colxx>
                    </Row>
                    <Row className="justify-content-center   rounded ">
                      <Colxx style={{ paddingInline: '4%' }} xxs="">
                        <Label className="data-style">
                          <IntlMessages id="ایدی" />
                        </Label>

                        <h2>
                          {student[0].student_id}{' '}
                          {
                            <Badge
                              color={
                                student[0].status == 'dismissed'
                                  ? 'danger'
                                  : student[0].status == 'inprogress'
                                  ? 'success'
                                  : student[0].status == 'active'
                                  ? 'success'
                                  : student[0].status == 'freeze'
                                  ? 'secondary'
                                  : 'warning'
                              }
                              pill
                            >
                              {student[0].status}
                            </Badge>
                          }
                        </h2>
                        <Label className="data-style">
                          <IntlMessages id="teacher.NameLabel" />
                        </Label>
                        <h2>
                          {student[0].name +
                            '"' +
                            ' ' +
                            student[0].last_name +
                            '"'}
                        </h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.Eng_name" />
                        </Label>
                        <h2>
                          {student[0].english_name +
                            ' ' +
                            student[0].english_last_name}
                        </h2>
                        <Label className="data-style">
                          <IntlMessages id="teacher.FatherNameLabel" />
                        </Label>
                        <h2>{student[0].father_name}</h2>

                        <Label className="data-style">
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                        </Label>
                        <h2>{student[0].english_father_name}</h2>

                        <Label className="data-style">
                          <IntlMessages id="teacher.PhoneNoLabel" />
                        </Label>
                        <h2>{student[0].phone_number}</h2>
                        <Label className="data-style">
                          <IntlMessages id="teacher.EmailLabel" />
                        </Label>
                        <h2>{student[0].email}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdTazkiraNoLabel" />
                        </Label>
                        <h2>{student[0].registration_number}</h2>
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {/* if person has paper-based ID card, not electronic */}
                        {student[0].cover_number && (
                          <>
                            <Label className="data-style">
                              <IntlMessages id="forms.StdIdCardCoverLabel" />
                            </Label>
                            <h2>{student[0].cover_number}</h2>
                            <Label className="data-style">
                              <IntlMessages id="forms.StdIdCardPageNoLabel" />
                            </Label>
                            <h2>{student[0].page_number}</h2>
                          </>
                        )}
                        <Label className="data-style">
                          <IntlMessages id="forms.StdDoBLabel" />
                        </Label>
                        <h2>{student[0].year_of_birth}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.PlaceOfBirthLabel" />
                        </Label>
                        <h2>{student[0].place_of_birth}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdFatherDutyLabel" />
                        </Label>
                        <h2>{student[0].father_profession}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                        </Label>
                        <h2>{student[0].father_place_of_duty}</h2>

                        <br />
                        <br />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {' '}
                        <h2
                          className="bg-primary rounded  data-style "
                          style={{ padding: '1%', paddingInline: '3%' }}
                        >
                          {' '}
                          <IntlMessages id="forms.PermanentAddressLabel" />
                        </h2>
                        <Separator />
                        <br />
                        <Row>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <h2>{provincesList[student[0].main_province]}</h2>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h2>{districtsList[student[0].main_district]}</h2>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <h2>{student[0].main_village}</h2>
                          </Colxx>
                        </Row>
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {' '}
                        <h2
                          className="bg-primary rounded data-style "
                          style={{ padding: '1%', paddingInline: '3%' }}
                        >
                          {' '}
                          <IntlMessages id="forms.CurrentAddresslabel" />
                        </h2>
                        <Separator />
                        <br />
                        <Row>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <h2>
                              {provincesList[student[0].current_province]}
                            </h2>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h2>
                              {districtsList[student[0].current_district]}
                            </h2>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <h2>{student[0].current_village}</h2>
                          </Colxx>
                        </Row>
                      </Colxx>
                    </Row>
                  </div>
                </CardBody>
              </Card>

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
                          {' '}
                          <IntlMessages id="teacher.LevelOfEducationLabel" />
                        </h2>
                      </Colxx>
                    </Row>
                    <Row className="justify-content-center   rounded ">
                      <Colxx style={{ paddingInline: '4%' }} xxs="">
                        <Label className="data-style">
                          <IntlMessages id="forms.EducationLevelLabel" />
                        </Label>
                        <h2>{student[0].previous_grade}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdGraduationYearLabel" />
                        </Label>
                        <h2>{student[0].previous_grade_year}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StPreShcoolLabel" />
                        </Label>
                        <h2>{student[0].previous_school_name}</h2>

                        <Label className="data-style">
                          <IntlMessages id="students.previousProvince" />
                        </Label>
                        <h2>
                          {provincesList[student[0].previous_school_province]}
                        </h2>

                        <Label className="data-style">
                          <IntlMessages id="forms.StdInteranceTypeLabel" />
                        </Label>
                        {student.admission_method === 'decree' ? (
                          <h2>حکمی</h2>
                        ) : student.internse_type === 'general_kankor' ? (
                          <h2>کانکور اختصاصی</h2>
                        ) : (
                          <h2>کانکور عمومی</h2>
                        )}
                        <Label className="data-style">
                          <IntlMessages id="student.educationType" />
                        </Label>
                        {student.student_type === 'continuous' ? (
                          <h2>پیوسته</h2>
                        ) : (
                          <h2>غیر پیوسته</h2>
                        )}
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        <Label className="data-style">
                          <IntlMessages id="menu.institutes" />
                        </Label>
                        <h2>{institute[0].institute.name}</h2>
                        <Label className="data-style">
                          <IntlMessages id="field.SemesterLabel" />
                        </Label>
                        <h2>{classs[0].classs.semester}</h2>
                        <Label className="data-style">
                          <IntlMessages id="curriculum.classLabel" />
                        </Label>
                        <h2>{classs[0].classs.name}</h2>
                        <Label className="data-style">
                          <IntlMessages id="field.SectionLabel" />
                        </Label>
                        <h2>{classs[0].classs.section}</h2>
                        {dorm.length > 0 && (
                          <>
                            <Label className="data-style">
                              <IntlMessages id="menu.dorms" />
                            </Label>
                            <h2>{dorm[0].dorm.name}</h2>
                            <Label>نوعیت</Label>

                            {dorm.dorm_type == 1 ? (
                              <h2> بدل عاشه</h2>
                            ) : (
                              <h2> بدیل عاشه</h2>
                            )}
                          </>
                        )}

                        <br />
                        <br />
                      </Colxx>
                    </Row>
                  </div>
                </CardBody>
              </Card>
              {/* <Card className="rounded m-4 mt-5">
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
                      <IntlMessages id="Student Institute" />
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
                            <th scope="col">ID</th>
                            <th scope="col">Teacher</th>
                            <th scope="col">Institute</th>
                            <th scope="col">Type</th>
                            <th scope="col">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: 123,
                              name: 'name',
                              institute: 'institute',
                              type: 'type',
                            },
                          ].map((item, index) => {
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
                                    data-target="#instituteModal"
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
                                    description={`مطمعین یاست چې   برای ${studentId} (${item.id})  ډیلیټ کړی. `}
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
                      <Button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#instituteModal"
                        data-whatever="@getbootstrap"
                      >
                        Save Institute
                      </Button>

                      <div
                        className="modal fade"
                        id="instituteModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="instituteModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="instituteModalLabel"
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
                                // validationSchema={
                                //   teacherInstitutesValidationSchema
                                // }
                                onSubmit={addInstitute}
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
                                        Add Institute
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
              </Card> */}
            </>
          ) : (
            <>
              {marks.length > 0 && (
                <>
                  {marks.map((mark, index) => (
                    <Row
                      className="rounded d-block"
                      style={{
                        padding: '20px',
                        paddingInline: '3%',

                        minHeight: '200px',
                      }}
                    >
                      <Colxx>
                        <Card className="mb-4">
                          <CardBody>
                            <div
                              style={{
                                padding: '10px',
                                display: 'inline-flex',
                                width: '50%',
                              }}
                            >
                              <Colxx>
                                <span className="data-style">
                                  <IntlMessages id="forms.studentIdLabel" />
                                  <h3 style={{ fontWeight: 'bold' }}>
                                    {mark.student}
                                  </h3>
                                </span>
                              </Colxx>
                              <Colxx>
                                <span className="data-style">
                                  <IntlMessages id="marks.ClassLabel" />
                                  <h3 style={{ fontWeight: 'bold' }}>
                                    {mark.class_name}
                                  </h3>
                                </span>
                              </Colxx>
                              <Colxx>
                                <span className="data-style">
                                  <IntlMessages id="field.SemesterLabel" />
                                  <h3 style={{ fontWeight: 'bold' }}>
                                    {mark.semester}
                                  </h3>
                                </span>
                              </Colxx>
                            </div>
                            <Separator />
                            <Separator />

                            <Table>
                              <thead className="data-style">
                                <tr>
                                  <th>
                                    {' '}
                                    <IntlMessages id="marks.No" />
                                  </th>
                                  <th>
                                    <IntlMessages id="marks.SubjectLabel" />
                                  </th>
                                  <th>
                                    {' '}
                                    <IntlMessages id="marks.Marks" />
                                  </th>
                                  <th>
                                    {' '}
                                    <IntlMessages id="forms.SubjectCreditLabel" />
                                  </th>
                                  <th>
                                    {' '}
                                    <IntlMessages id="subject.type" />
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="body-style">
                                {mark.children.map((child, index) => (
                                  <>
                                    <tr>
                                      <th scope="row">{index + 1}</th>
                                      <td>{child.subject_name}</td>

                                      <td>{child.score}</td>
                                      {child.subject_credit > 1 && (
                                        <>
                                          <td>{child.subject_credit}</td>

                                          <td>{child.subject_type}</td>
                                        </>
                                      )}
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </Table>
                            <Separator />
                            <Separator />
                            <br />
                            <Row>
                              <Colxx xxs="3">
                                <h3> فیصدی سمستر: % {mark.total_percentage}</h3>
                              </Colxx>
                              {mark.class_gpa > 0 && (
                                <Colxx xxs="3">
                                  <h3>GPA: {mark.class_gpa} </h3>
                                </Colxx>
                              )}
                            </Row>
                          </CardBody>
                        </Card>
                      </Colxx>
                    </Row>
                  ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default StudentProfile;
