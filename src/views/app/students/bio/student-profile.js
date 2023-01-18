import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  const [marks, setMarks] = useState([]);

  //load data of student from database
  useEffect(() => {
    async function fetchStudent() {
      const response = await axios.get(`${studentApiUrl}?std_id=${studentId}`);
      const data = await response.data;
      setStudent(data);

      const instituteResponse = await axios.get(
        `${studentApiUrl}student_institutes/?student_id=${studentId}`
      );
      const instituteData = await instituteResponse.data;
      setInstitute(instituteData);

      //type =1 means current class or continued class
      const classResponse = await axios.get(
        `${studentApiUrl}student_class/?student_id=${studentId}&type=1`
      );
      const classData = await classResponse.data;
      setClasss(classData);

      const marksResponse = await axios.get(
        `${studentApiUrl}TranscriptData/?student_id=${studentId}`
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

      <Row>
        <Colxx xxs="1"></Colxx>
        <Colxx>
          <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
        </Colxx>
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
                        <h3>{student[0].name}</h3>
                        <Label>
                          <IntlMessages id="forms.Eng_name" />
                        </Label>
                        <h3>Ahmad Samim</h3>
                        <Label>
                          <IntlMessages id="teacher.FatherNameLabel" />
                        </Label>
                        <h3>{student[0].father_name}</h3>

                        <Label>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                        </Label>
                        <h3>Muhammad Wali</h3>

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
                        <h3>009234932434</h3>
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        <Label>
                          <IntlMessages id="forms.StdIdCardCoverLabel" />
                        </Label>
                        <h3>12</h3>
                        <Label>
                          <IntlMessages id="forms.StdIdCardPageNoLabel" />
                        </Label>
                        <h3>45</h3>
                        <Label>
                          <IntlMessages id="forms.StdDoBLabel" />
                        </Label>
                        <h3>2000-02-12</h3>
                        <Label>
                          <IntlMessages id="forms.PlaceOfBirthLabel" />
                        </Label>
                        <h3>کابل</h3>
                        <Label>
                          <IntlMessages id="forms.StdFatherDutyLabel" />
                        </Label>
                        <h3>استاد</h3>
                        <Label>
                          <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                        </Label>
                        <h3>د کابل پوهنتون</h3>

                        <br />
                        <br />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {' '}
                        <h2
                          className="bg-primary rounded "
                          style={{ paddingInline: '10px' }}
                        >
                          {' '}
                          <IntlMessages id="forms.PermanentAddressLabel" />
                        </h2>
                        <Separator />
                        <br />
                        <Row>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <h3>کابل</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h3>پغمان</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <h3>چهلتن</h3>
                          </Colxx>
                        </Row>
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        {' '}
                        <h2
                          className="bg-primary rounded "
                          style={{ paddingInline: '10px' }}
                        >
                          {' '}
                          <IntlMessages id="forms.CurrentAddresslabel" />
                        </h2>
                        <Separator />
                        <br />
                        <Row>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.ProvinceLabel" />
                            </Label>
                            <h3>کابل</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.DistrictLabel" />
                            </Label>
                            <h3>پغمان</h3>
                          </Colxx>
                          <Colxx>
                            {' '}
                            <Label>
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <h3>چهلتن</h3>
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
                        <h3>بکلوریا</h3>
                        <Label>
                          <IntlMessages id="forms.StdGraduationYearLabel" />
                        </Label>
                        <h3>1400</h3>
                        <Label>
                          <IntlMessages id="forms.StPreShcoolLabel" />
                        </Label>
                        <h3>استقلال</h3>

                        <Label>
                          <IntlMessages id="forms.StdSchoolProvinceLabel" />
                        </Label>
                        <h3>کابل</h3>

                        <Label>
                          <IntlMessages id="forms.StdInteranceTypeLabel" />
                        </Label>
                        <h3>اختصاصی کانکور/ کانکور اختصاصی</h3>
                        <Label>
                          <IntlMessages id="student.educationType" />
                        </Label>
                        <h3>پیوسته</h3>
                        <br />
                        <br />
                      </Colxx>
                      <Colxx style={{ paddingInline: '4%' }}>
                        <Label>
                          <IntlMessages id="menu.institutes" />
                        </Label>
                        <h3>نیما</h3>
                        <Label>
                          <IntlMessages id="field.SemesterLabel" />
                        </Label>
                        <h3>لومړی/اول</h3>
                        <Label>
                          <IntlMessages id="curriculum.classLabel" />
                        </Label>
                        <h3>2-12</h3>
                        <Label>
                          <IntlMessages id="field.SectionLabel" />
                        </Label>
                        <h3>الف-A</h3>
                        <Label>
                          <IntlMessages id="menu.dorms" />
                        </Label>
                        <h3>د کابل پوهنتون مرکزی لیله</h3>

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
                            <h6>{student[0].student_id}</h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="marks.ClassLabel" />
                            <h6>لسم صنف </h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="field.SemesterLabel" />
                            <h6>اول سمستر</h6>
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
                            <th>
                              {' '}
                              <IntlMessages id="forms.SubjectCreditLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="subject.type" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="marks.Marks" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>کمپیوتر</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>کمپیوتر</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>کمپیوتر</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Row>
                        {' '}
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            فیصدی سمستر
                            <h5>85%</h5>
                          </span>
                        </Colxx>
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            GPA
                            <h5>3.5</h5>
                          </span>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>

              <Row
                className=" rounded d-block"
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
                            <h6>{student[0].student_id}</h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="marks.ClassLabel" />
                            <h6>لسم صنف </h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="field.SemesterLabel" />
                            <h6>دوهم سمستر</h6>
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
                            <th>
                              {' '}
                              <IntlMessages id="forms.SubjectCreditLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="subject.type" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="marks.Marks" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>پشتو</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>دری</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>ریاضی</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Row>
                        {' '}
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            فیصدی سمستر
                            <h5>80%</h5>
                          </span>
                        </Colxx>
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            GPA
                            <h5>3.2</h5>
                          </span>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>

              <Row
                className=" rounded  d-block"
                style={{
                  borderRadius: '15px',
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
                            <h6>{student[0].student_id}</h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="marks.ClassLabel" />
                            <h6>یولسم صنف </h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="field.SemesterLabel" />
                            <h6>اول سمستر</h6>
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
                            <th>
                              {' '}
                              <IntlMessages id="forms.SubjectCreditLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="subject.type" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="marks.Marks" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>برنامه نویسی</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>ساینس</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>فزیک</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Row>
                        {' '}
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            فیصدی سمستر
                            <h5>90%</h5>
                          </span>
                        </Colxx>
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            GPA
                            <h5>3.8</h5>
                          </span>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>

              <Row
                className=" rounded  d-block"
                style={{
                  padding: '20px',
                  paddingInline: '3%',
                  borderRadius: '15px',
                  minHeight: '200px',
                }}
              >
                <Colxx>
                  <Card className="mb-4 ">
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
                            <h6>{student[0].student_id}</h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="marks.ClassLabel" />
                            <h6>یولسم صنف </h6>
                          </span>
                        </Colxx>
                        <Colxx>
                          <span>
                            <IntlMessages id="field.SemesterLabel" />
                            <h6>دوهم سمستر</h6>
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
                            <th>
                              {' '}
                              <IntlMessages id="forms.SubjectCreditLabel" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="subject.type" />
                            </th>
                            <th>
                              {' '}
                              <IntlMessages id="marks.Marks" />
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>ریاضی</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>کمیا</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>ثقافت</td>

                            <td>3</td>
                            <td>اصلی</td>
                            <td>85</td>
                          </tr>
                        </tbody>
                      </Table>
                      <Row>
                        {' '}
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            فیصدی سمستر
                            <h5>85%</h5>
                          </span>
                        </Colxx>
                        <Colxx xxs="3">
                          {' '}
                          <span>
                            GPA
                            <h5>3.5</h5>
                          </span>
                        </Colxx>
                      </Row>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StudentProfile;
