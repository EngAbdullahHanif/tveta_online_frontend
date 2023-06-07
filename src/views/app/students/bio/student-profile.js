import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import callApi from 'helpers/callApi';

import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { NavLink } from 'react-router-dom';
import './../../.././../assets/css/global-style.css';

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
                {console.log('here', `${student[0].student_photo}`)}
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
                          <IntlMessages id="teacher.NameLabel" />
                        </Label>
                        <h2>
                          {student[0].name + '  "' + student[0].last_name + '"'}
                        </h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.Eng_name" />
                        </Label>
                        <h2>
                          {student[0].english_name +
                            ' ' +
                            student[0].english_last_name}{' '}
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
                        <h2>{student[0].birth_date}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.PlaceOfBirthLabel" />
                        </Label>
                        <h2>کابل</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdFatherDutyLabel" />
                        </Label>
                        <h2>{student[0].fatherـprofession}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                        </Label>
                        <h2>{student[0].fatherـplaceـofـduty}</h2>

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
                            <h2>{student[0].main_province}</h2>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h2>{student[0].main_district}</h2>
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
                            <h2>{student[0].current_province}</h2>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label className="data-style">
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h2>{student[0].current_district}</h2>
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
                        <h2>{student[0].finished_grade}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StdGraduationYearLabel" />
                        </Label>
                        <h2>{student[0].finished_grade_year}</h2>
                        <Label className="data-style">
                          <IntlMessages id="forms.StPreShcoolLabel" />
                        </Label>
                        <h2>{student[0].school}</h2>

                        <Label className="data-style">
                          <IntlMessages id="forms.StdSchoolProvinceLabel" />
                        </Label>
                        <h2>{student[0].schoolـprovince}</h2>

                        <Label className="data-style">
                          <IntlMessages id="forms.StdInteranceTypeLabel" />
                        </Label>
                        {student[0].internse_type === '1' ? (
                          <h2>حکمی</h2>
                        ) : student[0].internse_type === '2' ? (
                          <h2>کانکور اختصاصی</h2>
                        ) : (
                          <h2>کانکور عمومی</h2>
                        )}
                        <Label className="data-style">
                          <IntlMessages id="student.educationType" />
                        </Label>
                        {student[0].education_type === '1' ? (
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
                        <h2>{institute[0].institute_id.name}</h2>
                        <Label className="data-style">
                          <IntlMessages id="field.SemesterLabel" />
                        </Label>
                        <h2>{classs[0].class_id.semester}</h2>
                        <Label className="data-style">
                          <IntlMessages id="curriculum.classLabel" />
                        </Label>
                        <h2>{classs[0].class_id.name}</h2>
                        <Label className="data-style">
                          <IntlMessages id="field.SectionLabel" />
                        </Label>
                        <h2>{classs[0].class_id.section}</h2>
                        {dorm[0] && (
                          <>
                            <Label className="data-style">
                              <IntlMessages id="menu.dorms" />
                            </Label>
                            <h2>{dorm[0].dorm_id.name}</h2>
                            <Label>نوعیت</Label>

                            {dorm[0].dorm_type == 1 ? (
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
                                    {mark.student_id}
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
                              {mark.total_gpa > 0 && (
                                <Colxx xxs="3">
                                  <h3>GPA: {mark.total_gpa} </h3>
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
