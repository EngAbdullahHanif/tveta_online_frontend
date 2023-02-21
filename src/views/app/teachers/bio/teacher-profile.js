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
  const [isLoaded, setIsLoaded] = useState(false)
  

  useEffect(() => {
    async function fetchTeacher() {
      const response = await axios.get(`${teacherApiUrl}?id=${teacherId}`);
      const data = response.data;
      setTeacher(data);
      setIsLoaded(true)
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

      {teacher.length > 0 && institute.length > 0 && (
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
                        <h3>Mohammad Samim</h3>
                        {/* <Label>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                        </Label>
                        <h3>Muhammad Wali</h3> */}
                        <Label>
                          <IntlMessages id="gender.gender" />
                        </Label>
                        <h3>Male</h3>

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
                        <h3>009234932434</h3>
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
