import React, { useState } from 'react';
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

console.log(logo);

const TeacherProfile = () => {
  const [isNext, setIsNext] = useState(true);

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
          {isNext ? (
            <div>
              <Row className="justify-content-center border border-primary rounded m-5">
                <Colxx className=" p-5  border rounded" xxs="">
                  <Label>
                    <IntlMessages id="teacher.NameLabel" />
                  </Label>
                  <h3>احمد شبیر</h3>
                  <Label>
                    <IntlMessages id="teacher.FatherNameLabel" />
                  </Label>
                  <h3>عبدالرحیم</h3>
                  <Label>
                    <IntlMessages id="teacher.PhoneNoLabel" />
                  </Label>
                  <h3>077000000000</h3>
                  <Label>
                    <IntlMessages id="teacher.EmailLabel" />
                  </Label>
                  <h3>ahamd12@gmail.com</h3>

                  <Label>
                    <IntlMessages id="forms.InstituteLabel" />
                  </Label>
                  <h3>نیما</h3>
                  <Label>
                    <IntlMessages id="marks.ClassLabel" />
                  </Label>
                  <h3>دیارلسم/ سیزدهم</h3>
                </Colxx>
                <Colxx className="p-5 border rounded">
                  <Label>
                    <IntlMessages id="field.SemesterLabel" />
                  </Label>
                  <h3>دوهم</h3>
                </Colxx>
              </Row>
            </div>
          ) : (
            <>
              <div className="p-2">
                <FormGroup className="form-group has-float-label m-5">
                  <Label>سمستر ریکارد</Label>
                  <Row
                    className="border border-primary  p-2 d-block"
                    style={{ borderRadius: '5px', minHeight: '200px' }}
                  >
                    <Colxx>
                      <Card className="mb-4">
                        <CardBody>
                          <div style={{ display: 'inline-flex', width: '50%' }}>
                            <Colxx>
                              <span>
                                <IntlMessages id="forms.StdIdLabel" />
                                <h6>Fa12-26</h6>
                              </span>
                            </Colxx>
                            <Colxx>
                              <span>
                                <IntlMessages id="marks.ClassLabel" />
                                <h6>دیارلسم/ سیزدهم</h6>
                              </span>
                            </Colxx>
                            <Colxx>
                              <span>
                                <IntlMessages id="field.SemesterLabel" />
                                <h6>لومړی/ اول</h6>
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
                                <h5>2.9</h5>
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
                    style={{ borderRadius: '5px', minHeight: '200px' }}
                  >
                    <Colxx>
                      <Card className="mb-4">
                        <CardBody>
                          <div style={{ display: 'inline-flex', width: '50%' }}>
                            <Colxx>
                              <span>
                                <IntlMessages id="forms.StdIdLabel" />
                                <h6>Fa12-26</h6>
                              </span>
                            </Colxx>
                            <Colxx>
                              <span>
                                <IntlMessages id="marks.ClassLabel" />
                                <h6>دیارلسم/ سیزدهم</h6>
                              </span>
                            </Colxx>
                            <Colxx>
                              <span>
                                <IntlMessages id="field.SemesterLabel" />
                                <h6>دوهم/ دوم</h6>
                              </span>
                            </Colxx>
                          </div>
                          <Table bordered>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>
                                  {' '}
                                  <IntlMessages id="marks.SubjectLabel" />
                                </th>
                                <th>
                                  {' '}
                                  <IntlMessages id="forms.SubjectCreditLabel" />
                                  subject.type
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
                                <td>فرعی</td>
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
                                <h5>2.9</h5>
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
                    style={{ borderRadius: '5px', minHeight: '200px' }}
                  >
                    <Colxx>
                      <Card className="mb-4">
                        <CardBody>
                          <div style={{ display: 'inline-flex', width: '50%' }}>
                            <Colxx>
                              <span>
                                <IntlMessages id="forms.StdIdLabel" />
                                <h6>Fa12-26</h6>
                              </span>
                            </Colxx>
                            <Colxx>
                              <span>
                                <IntlMessages id="marks.ClassLabel" />
                                <h6>څورلسم/ چهاردهم</h6>
                              </span>
                            </Colxx>
                            <Colxx>
                              <span>
                                <IntlMessages id="field.SemesterLabel" />
                                <h6>لومړی/ اول</h6>
                              </span>
                            </Colxx>
                          </div>
                          <Table bordered>
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>
                                  {' '}
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
                                <td>فریک</td>
                                <td>3</td>
                                <td>اصلی</td>
                                <td>85</td>
                              </tr>
                              <tr>
                                <th scope="row">2</th>
                                <td>هندسه</td>
                                <td>3</td>
                                <td>فرعی</td>
                                <td>85</td>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>قرآن کریم</td>
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
                                <h5>2.9</h5>
                              </span>
                            </Colxx>
                          </Row>
                        </CardBody>
                      </Card>
                    </Colxx>
                  </Row>
                </FormGroup>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default TeacherProfile;
