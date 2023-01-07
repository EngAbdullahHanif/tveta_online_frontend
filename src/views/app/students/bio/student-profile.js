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
import { Colxx } from 'components/common/CustomBootstrap';

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
        `${studentApiUrl}stdmarks_Results/?student_id=${studentId}`
      );
      const marksData = await marksResponse.data;
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
      <Card>
        <CardBody>
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
              style={{ marginRight: '21%' }}
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
                <div>
                  <Row className="justify-content-center border border-primary rounded m-5">
                    <Colxx className=" p-5  border rounded" xxs="">
                      <Label>
                        <IntlMessages id="teacher.NameLabel" />
                      </Label>
                      <h3>{student[0].name}</h3>
                      <Label>
                        <IntlMessages id="teacher.FatherNameLabel" />
                      </Label>
                      <h3>{student[0].father_name}</h3>
                      <Label>
                        <IntlMessages id="teacher.PhoneNoLabel" />
                      </Label>
                      <h3>{student[0].phone_number}</h3>
                      <Label>
                        <IntlMessages id="teacher.EmailLabel" />
                      </Label>
                      <h3>{student[0].email}</h3>

                      <Label>
                        <IntlMessages id="forms.InstituteLabel" />
                      </Label>
                      <h3>{institute[0].institute.name}</h3>
                      <Label>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <h3>{classs[0].class_id.name}</h3>
                    </Colxx>
                    <Colxx className="p-5 border rounded">
                      <Label>
                        <IntlMessages id="field.SemesterLabel" />
                      </Label>
                      <h3>{classs[0].class_id.semester}</h3>
                      <Label>
                        <IntlMessages id="field.SectionLabel" />
                      </Label>
                      <h3>{classs[0].class_id.section}</h3>
                    </Colxx>
                  </Row>
                </div>
              ) : (
                <>
                  {/* {marks.length == 0 && ( */}
                  <>
                    <div className="p-2">
                      <FormGroup className="form-group has-float-label m-5">
                        <Label>سمستر ریکارد</Label>
                        <Row
                          className="border border-primary  p-2 d-block"
                          style={{
                            borderRadius: '5px',
                            minHeight: '200px',
                          }}
                        >
                          <Colxx>
                            <Card className="mb-4">
                              <CardBody>
                                <div
                                  style={{
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
                      </FormGroup>
                    </div>
                    <div className="p-2">
                      <FormGroup className="form-group has-float-label m-5">
                        <Label>سمستر ریکارد</Label>
                        <Row
                          className="border border-primary  p-2 d-block"
                          style={{
                            borderRadius: '5px',
                            minHeight: '200px',
                          }}
                        >
                          <Colxx>
                            <Card className="mb-4">
                              <CardBody>
                                <div
                                  style={{
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
                      </FormGroup>
                    </div>
                    <div className="p-2">
                      <FormGroup className="form-group has-float-label m-5">
                        <Label>سمستر ریکارد</Label>
                        <Row
                          className="border border-primary  p-2 d-block"
                          style={{
                            borderRadius: '5px',
                            minHeight: '200px',
                          }}
                        >
                          <Colxx>
                            <Card className="mb-4">
                              <CardBody>
                                <div
                                  style={{
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
                      </FormGroup>
                    </div>
                    <div className="p-2">
                      <FormGroup className="form-group has-float-label m-5">
                        <Label>سمستر ریکارد</Label>
                        <Row
                          className="border border-primary  p-2 d-block"
                          style={{
                            borderRadius: '5px',
                            minHeight: '200px',
                          }}
                        >
                          <Colxx>
                            <Card className="mb-4">
                              <CardBody>
                                <div
                                  style={{
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
                      </FormGroup>
                    </div>
                    {/* {marks.map((mark, index) => (
                      <div className="p-2">
                        <FormGroup className="form-group has-float-label m-5">
                          <Label>سمستر ریکارد</Label>
                          <Row
                            className="border border-primary  p-2 d-block"
                            style={{
                              borderRadius: '5px',
                              minHeight: '200px',
                            }}
                          >
                            <Colxx>
                              <Card className="mb-4">
                                <CardBody>
                                  <div
                                    style={{
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
                                        <h6>{mark.class_id.name}</h6>
                                      </span>
                                    </Colxx>
                                    <Colxx>
                                      <span>
                                        <IntlMessages id="field.SemesterLabel" />
                                        <h6>{mark.class_id.semester}</h6>
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
                                        <h5>{mark.TotalPercentage}</h5>
                                      </span>
                                    </Colxx>
                                    <Colxx xxs="3">
                                      {' '}
                                      <span>
                                        GPA
                                        <h5>{mark.TotalGpa}</h5>
                                      </span>
                                    </Colxx>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Colxx>
                          </Row>
                        </FormGroup>
                      </div>
                    ))} */}
                  </>
                  {/* )} */}
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default StudentProfile;
