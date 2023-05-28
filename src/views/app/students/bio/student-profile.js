import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import callApi from 'helpers/callApi';

import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { NavLink } from 'react-router-dom';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import logo from './../../../../assets/logos/AdminLogo.png';
import profilePhoto from './../../../../assets/img/profiles/22.jpg';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import Classes from 'views/app/classes';

const servicePath = 'http://localhost:8000';
const studentApiUrl = `${servicePath}/api/`;

const StudentProfile = () => {
  const { studentId } = useParams();
  const [isNext, setIsNext] = useState(true);
  const [student, setStudent] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [classs, setClasss] = useState([]); //classs is used because class is a reserved word
  const [dorm, setDorm] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //load data of student from database
  useEffect(() => {
    async function fetchStudent() {
      // const response = await axios.get(
      //   `${studentApiUrl}?student_id=${studentId}`
      // );
      const response = await callApi(`api/?student_id=${studentId}`, '', null);
      const data = await response.data;
      setStudent(data.results);
      setIsLoaded(true);

      console.log('studentsdf', student);
      // const instituteResponse = await axios.get(
      //   `${studentApiUrl}student_institutes/?student_id=${studentId}`
      // );
      const instituteResponse = await callApi(
        `api/student_institutes/?student_id=${studentId}`,
        '',
        null
      );

      const instituteData = await instituteResponse.data;
      console.log('instituteData', instituteData);
      setInstitute(instituteData);

      //type =1 means current class or current continued class
      // const classResponse = await axios.get(
      //   `${studentApiUrl}student_class/?student_id=${studentId}&type=1`
      // );
      const classResponse = await callApi(
        `api/student_class/?student_id=${studentId}&type=1`,
        '',
        null
      );

      const classData = await classResponse.data;
      setClasss(classData);

      // const dormResponse = await axios.get(
      //   `${studentApiUrl}student_dorms/?student_id=${studentId}`
      // );
      const dormResponse = await callApi(
        `api/student_dorms/?student_id=${studentId}`,
        '',
        null
      );

      const dormData = await dormResponse.data;
      setDorm(dormData);

      // const marksResponse = await axios.get(
      //   `${studentApiUrl}TranscriptData/?student_id=${studentId}`
      // );
      const marksResponse = await callApi(
        `api/TranscriptData/?student_id=${studentId}`,
        '',
        null
      );

      console.log(`${studentApiUrl}TranscriptData/?student_id=${studentId}`);
      const marksData = await marksResponse.data;
      console.log('marksData', marksData);
      setMarks(marksData);
    }
    fetchStudent();
  }, []);

  console.log('marks', marks);

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
        <Colxx className="mt-5 m-5" xxs="8">
          <h3>{<IntlMessages id="student.Profile" />}</h3>
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
                {/* <img src={student.student_photo} alt="Photo" width={'10%'} />{' '} */}
                <NavLink
                  to={`?p=${student.student_id}`}
                  className="w-40 w-sm-100"
                >
                  <img
                    top
                    alt={student.name}
                    src={`${student[0].student_photo}`}
                    style={{
                      maxWidth: '12%',
                      maxHeight: '130%',
                      borderRadius: '5px',
                    }}
                  />
                </NavLink>
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
                <Button
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
                    <IntlMessages id="student.results" />
                  </span>
                </Button>{' '}
              </div>
            </Colxx>
          </Row>
        </div>
      )}

      {/* if student is loaded show it, if not show empty  */}
      {student.length > 0 && institute.length > 0 && classs.length > 0 && (
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
                          {' '}
                          <IntlMessages id="forms.personalInfo" />
                        </h2>
                      </Colxx>
                    </Row>
                    <Row className="justify-content-center   rounded ">
                      <Colxx style={{ paddingInline: '4%' }} xxs="">
                        <Label>
                          <IntlMessages id="teacher.NameLabel" />
                        </Label>
                        <h3>
                          {student[0].name + '  "' + student[0].last_name + '"'}
                        </h3>
                        <Label>
                          <IntlMessages id="forms.Eng_name" />
                        </Label>
                        <h3>
                          {student[0].english_name +
                            ' ' +
                            student[0].english_last_name}{' '}
                        </h3>
                        <Label>
                          <IntlMessages id="teacher.FatherNameLabel" />
                        </Label>
                        <h3>{student[0].father_name}</h3>

                        <Label>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                        </Label>
                        <h3>{student[0].english_father_name}</h3>

                        <Label>
                          <IntlMessages id="teacher.PhoneNoLabel" />
                        </Label>
                        <h3>{student[0].phone_number}</h3>
                        <Label>
                          <IntlMessages id="teacher.EmailLabel" />
                        </Label>
                        <h3>{student[0].email}</h3>
                        <Label>
                          <IntlMessages id="forms.StdTazkiraNoLabel" />
                        </Label>
                        <h3>{student[0].registration_number}</h3>
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {/* if person has paper-based ID card, not electronic */}
                        {student[0].cover_number && (
                          <>
                            <Label>
                              <IntlMessages id="forms.StdIdCardCoverLabel" />
                            </Label>
                            <h3>{student[0].cover_number}</h3>
                            <Label>
                              <IntlMessages id="forms.StdIdCardPageNoLabel" />
                            </Label>
                            <h3>{student[0].page_number}</h3>
                          </>
                        )}
                        <Label>
                          <IntlMessages id="forms.StdDoBLabel" />
                        </Label>
                        <h3>{student[0].birth_date}</h3>
                        <Label>
                          <IntlMessages id="forms.PlaceOfBirthLabel" />
                        </Label>
                        <h3>کابل</h3>
                        <Label>
                          <IntlMessages id="forms.StdFatherDutyLabel" />
                        </Label>
                        <h3>{student[0].fatherـprofession}</h3>
                        <Label>
                          <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                        </Label>
                        <h3>{student[0].fatherـplaceـofـduty}</h3>

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
                            <h3>{student[0].main_province}</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h3>{student[0].main_district}</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <h3>{student[0].main_village}</h3>
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
                            <h3>{student[0].current_province}</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h3>{student[0].current_district}</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <h3>{student[0].current_village}</h3>
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
                        <Label>
                          <IntlMessages id="forms.EducationLevelLabel" />
                        </Label>
                        <h3>{student[0].finished_grade}</h3>
                        <Label>
                          <IntlMessages id="forms.StdGraduationYearLabel" />
                        </Label>
                        <h3>{student[0].finished_grade_year}</h3>
                        <Label>
                          <IntlMessages id="forms.StPreShcoolLabel" />
                        </Label>
                        <h3>{student[0].school}</h3>

                        <Label>
                          <IntlMessages id="forms.StdSchoolProvinceLabel" />
                        </Label>
                        <h3>{student[0].schoolـprovince}</h3>

                        <Label>
                          <IntlMessages id="forms.StdInteranceTypeLabel" />
                        </Label>
                        {student[0].internse_type === '1' ? (
                          <h3>حکمی</h3>
                        ) : student[0].internse_type === '2' ? (
                          <h3>کانکور اختصاصی</h3>
                        ) : (
                          <h3>کانکور عمومی</h3>
                        )}
                        <Label>
                          <IntlMessages id="student.educationType" />
                        </Label>
                        {student[0].education_type === '1' ? (
                          <h3>پیوسته</h3>
                        ) : (
                          <h3>غیر پیوسته</h3>
                        )}
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        <Label>
                          <IntlMessages id="menu.institutes" />
                        </Label>
                        <h3>{institute[0].institute_id.name}</h3>
                        <Label>
                          <IntlMessages id="field.SemesterLabel" />
                        </Label>
                        <h3>{classs[0].class_id.semester}</h3>
                        <Label>
                          <IntlMessages id="curriculum.classLabel" />
                        </Label>
                        <h3>{classs[0].class_id.name}</h3>
                        <Label>
                          <IntlMessages id="field.SectionLabel" />
                        </Label>
                        <h3>{classs[0].class_id.section}</h3>
                        {dorm[0] && (
                          <>
                            <Label>
                              <IntlMessages id="menu.dorms" />
                            </Label>
                            <h3>{dorm[0].dorm_id.name}</h3>
                            <Label>نوعیت</Label>

                            {dorm[0].dorm_type == 1 ? (
                              <h3> بدل عاشه</h3>
                            ) : (
                              <h3> بدیل عاشه</h3>
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
                                <span>
                                  <IntlMessages id="forms.StdIdLabel" />
                                  <h6>{mark.student_id}</h6>
                                </span>
                              </Colxx>
                              <Colxx>
                                <span>
                                  <IntlMessages id="marks.ClassLabel" />
                                  <h6>{mark.class_name}</h6>
                                </span>
                              </Colxx>
                              <Colxx>
                                <span>
                                  <IntlMessages id="field.SemesterLabel" />
                                  <h6>{mark.semester}</h6>
                                </span>
                              </Colxx>
                            </div>
                            <Table bordered>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>
                                    <IntlMessages id="marks.SubjectLabel" />
                                  </th>
                                  {/* <th>
                                    {' '}
                                    <IntlMessages id="forms.SubjectCreditLabel" />
                                  </th>
                                  <th>
                                    {' '}
                                    <IntlMessages id="subject.type" />
                                  </th> */}
                                  <th>
                                    {' '}
                                    <IntlMessages id="marks.Marks" />
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {mark.children.map((child, index) => (
                                  <>
                                    <tr>
                                      <th scope="row">{index + 1}</th>
                                      <td>{child.subject_name}</td>
                                      {child.subject_credit > 1 && (
                                        <>
                                          <td>{child.subject_credit}</td>

                                          <td>{child.subject_type}</td>
                                        </>
                                      )}

                                      <td>{child.score}</td>
                                    </tr>
                                  </>
                                ))}
                              </tbody>
                            </Table>
                            <Row>
                              {' '}
                              <Colxx xxs="3">
                                {' '}
                                <h5> فیصدی سمستر: % {mark.total_percentage}</h5>
                              </Colxx>
                              {mark.total_gpa > 0 && (
                                <Colxx xxs="3">
                                  {' '}
                                  <h5>GPA: {mark.total_gpa} </h5>
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
