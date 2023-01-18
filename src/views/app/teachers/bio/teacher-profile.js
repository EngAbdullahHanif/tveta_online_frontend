import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';

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
const teacherApiUrl = `${servicePath}/teachers/`;
const teacherEvaluationApiUrl = `${servicePath}/teachers/evaluation`;
const teacherHREvaluationApiUrl = `${servicePath}/teachers/hr-evaluation`;
const teacherTransferApiUrl = `${servicePath}/teachers/institute`;

const TeacherProfile = () => {
  const [isNext, setIsNext] = useState(true);
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [teacherEvaluation, setTeacherEvaluation] = useState([]);
  const [teacherHREvaluation, setTeacherHREvaluation] = useState([]);
  const [teacherTransfer, setTeacherTransfer] = useState([]);

  useEffect(() => {
    async function fetchTeacher() {
      const response = await axios.get(`${teacherApiUrl}?id=${teacherId}`);
      const data = response.data;
      setTeacher(data);

      const instituteResponse = await axios.get(
        `${teacherApiUrl}institute/?teacher_id=${teacherId}`
      );
      const instituteData = await instituteResponse.data;
      setInstitute(instituteData);
    }
    async function fetchTeacherEvaluation() {
      console.log('data');
      const response = await axios.get(
        `${teacherEvaluationApiUrl}/?teacher_id=${teacherId}`
      );
      console.log(`${teacherEvaluationApiUrl}/?teacher_id=${teacherId}`);
      const data = response.data;
      setTeacherEvaluation(data);
    }
    async function fetchTeacherHREvaluation() {
      const response = await axios.get(
        `${teacherHREvaluationApiUrl}/?teacher_id=${teacherId}`
      );
      const data = response.data;
      setTeacherHREvaluation(data);
    }
    async function fetchTeacherTransfer() {
      const response = await axios.get(
        `${teacherTransferApiUrl}/?teacher_id=${teacherId}`
      );
      const data = response.data;
      console.log(`${teacherTransferApiUrl}/?teacher_id=${teacherId}`);
      setTeacherTransfer(data);
    }
    fetchTeacher();
    fetchTeacherEvaluation();
    fetchTeacherHREvaluation();
    fetchTeacherTransfer();
  }, []);

  console.log('teacher', teacher);
  console.log('teacherEvaluation', teacherEvaluation);
  console.log('teacherHREvaluation', teacherHREvaluation);
  console.log('teacherTransfer', teacherTransfer);

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

      <Row>
        <Colxx xxs="1"></Colxx>
        <Colxx>
          <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
        </Colxx>
      </Row>
      <Row>
        <Colxx
          className=" d-flex justify-content-center"
          style={{ marginRight: '2%' }}
        >
          {' '}
          <div className="d-inline-block">
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
                <IntlMessages id="button.TeacherBackround" />
              </span>
            </Button>{' '}
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
      <Card>
        <CardBody>
          {teacher.length > 0 && institute.length > 0 && (
            <>
              {isNext ? (
                <Row className="justify-content-center border border-primary  m-5 ">
                  <Colxx className=" p-5  border ">
                    <h2
                      className="bg-primary rounded "
                      style={{ paddingInline: '10px' }}
                    >
                      hsds
                    </h2>
                    <Label>
                      <IntlMessages id="teacher.NameLabel" />
                    </Label>
                    <h3>{teacher[0].name}</h3>
                    <Label>
                      <IntlMessages id="teacher.FatherNameLabel" />
                    </Label>
                    <h3>{teacher[0].father_name}</h3>
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
                    <h2
                      className="bg-primary rounded "
                      style={{ paddingInline: '10px' }}
                    >
                      {' '}
                      <IntlMessages id="teacher.LevelOfEducationLabel" />
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
                  <Colxx className="p-5 border">
                    <h2
                      className="bg-primary rounded "
                      style={{ paddingInline: '10px' }}
                    >
                      hsds
                    </h2>
                    <Label>
                      <IntlMessages id="teacher.StatusLabel" />
                    </Label>
                    {teacher[0].status_type === '1' ? (
                      <h3>فعال</h3>
                    ) : (
                      <h3>غیر فعال</h3>
                    )}
                    <Label>
                      <IntlMessages id="forms.InstituteLabel" />
                    </Label>
                    <h3>{institute[0].institute_id.name}</h3>
                    <Label>
                      <IntlMessages id="teacher.GradeLabel" />
                    </Label>
                    <h3>{teacher[0].grade}</h3>
                    <Label>
                      <IntlMessages id="teacher.StepLabel" />
                    </Label>
                    <h3>{teacher[0].step}</h3>
                    <br />
                    <br />
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

                    <br />
                    <br />
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
              ) : (
                <div className="p-2">
                  <Row className="justify-content-center pt-5">
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
                                  <td>{item.institute_id.name}</td>
                                  <td>{item.current_grade}</td>
                                  <td>{item.current_step}</td>
                                  <td>{item.new_grade}</td>
                                  <td>{item.new_step}</td>
                                  <td>{item.score}</td>
                                  <td>{item.evaluation_date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>

                  <Row className="justify-content-center pt-5">
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
                                  <td>{item.institute_id.name}</td>
                                  <td>{item.department_id.name}</td>
                                  <td>
                                    {item.class_id.name +
                                      ' - ' +
                                      item.class_id.semester}
                                  </td>
                                  <td>{item.topic}</td>
                                  <td>{item.score}</td>
                                  <td>{item.evaluation_date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>

                  <Row className="justify-content-center pt-5">
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
                  <FormGroup className="form-group has-float-label m-5">
                    <Label>مکافات / مجازات</Label>
                    <Row
                      className="border border-primary  p-2"
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
                          اساتید عالی معمولا همواره در حال یادگیری هستند و
                          تونایی های خودشان را به صورت مداوم افزایش می دهند. این
                          اساتید در کلاس درس به دانشجو احترام می گذارند و سعی می
                          کنند مطالب را از دید دانشجو ببینند و به ساده ترین زبان
                          ممکن مطالب را توضیح می دهند. در کلاس های دانشگاه بسیار
                          خوب است کلاس به صورت دوطرفه و تعاملی برگزار گردد.
                          اساتید خوب که دانشجویان راضی و موفقی دارند اینطور نیست
                          که در کلاس فقط خودشان حرف بزنند و متکلم وحده باشند. به
                          هر میزان دانشجویان در کلاس مشارکت بیشتری داشته باشند
                          در نهایت بازدهی کلاس بالاتر خواهد بود. اساتید خوب با
                          پرسیدن سوالات مناسب حین تدریس سطح سواد دانشجویان را
                          مورد ارزیابی قرار می دهند و متناسب با آن تدریس می
                          کنند. این اساتید جو راحت و آزادی را در کلاس ایجاد می
                          نمایند به گونه ای که دانشجویان در عین حال که به استاد
                          و کلاس احترام می گذارند سوالات خودشان را هم راحت می
                          پرسند و اظهار نظر می کنند. در ادامه با استناد به
                          مقالات معتبر علمی در رابطه با ویژگی های استاد خوب
                          توضیح داده می شود.
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
                          اساتید عالی معمولا همواره در حال یادگیری هستند و
                          تونایی های خودشان را به صورت مداوم افزایش می دهند. این
                          اساتید در کلاس درس به دانشجو احترام می گذارند و سعی می
                          کنند مطالب را از دید دانشجو ببینند و به ساده ترین زبان
                          ممکن مطالب را توضیح می دهند.
                        </div>
                      </Colxx>
                    </Row>
                  </FormGroup>
                </div>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherProfile;
