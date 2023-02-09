import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import './provincail-dashboard.css';
import Calendar from 'containers/dashboards/Calendar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
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
  Input,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { comments } from 'data/comments';
import Rating from 'components/common/Rating';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const provinceTeachersCountApiUrl = `${servicePath}/teachers/province_teacher_count/`;
const provinceDormsCountApiUrl = `${servicePath}/api/province_dorm_statistics/`;
const provinceStuentsCountApiUrl = `${servicePath}/api/province_student_statistics/`;
const proviceDormslistApiUrl = `${servicePath}/api/each_dorm_students/`;

const ProvincailDashboard = (
  values,
  { className = '', displayRate = false }
) => {
  const [isNext, setIsNext] = useState(true);
  const [provinceTeachersCount, setProvinceTeachersCount] = useState([]);
  const [provinceDormsCount, setProvinceDormsCount] = useState([]);
  const [provinceStuentsCount, setProvinceStuentsCount] = useState([]);
  const [provinceDormsList, setProvinceDormsList] = useState([]);

  function fetchProvinceTeachersCount() {
    axios
      .get(provinceTeachersCountApiUrl)
      .then((res) => {
        setProvinceTeachersCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchProvinceDormsCount() {
    axios
      .get(provinceDormsCountApiUrl)
      .then((res) => {
        setProvinceDormsCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchProvinceInstituteCount() {
    axios
      .get(provinceStuentsCountApiUrl)
      .then((res) => {
        setProvinceStuentsCount(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchProvinceDormList() {
    axios
      .get(proviceDormslistApiUrl)
      .then((res) => {
        setProvinceDormsList(res.data);
        console.log('res.data', res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchProvinceTeachersCount();
    fetchProvinceDormsCount();
    fetchProvinceInstituteCount();
    fetchProvinceDormList();
  }, []);

  const handleClick = (event) => {
    setIsNext(event);
  };

  return (
    <>
      <h1 className="mt-5 m-1">{<IntlMessages id="dashboard.provincail" />}</h1>
      <Separator className="mb-5" />

      {/* First Three columns */}
      <Row>
        <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '7%' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalNumberOfTeachers" />
              </CardTitle>
              <Separator />
              <br />
              <Colxx>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="institute.totalStudentsMale" /> */}
                      total teachers
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['total_teachers']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['male_teachers']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['female_teachers']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="dash.14YearsGreduatedMale" /> */}
                      total teachers 14 years graduated
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['14_teachers']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.14YearsGreduatedMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.14YearsGreduatedFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="dash.bachelorMale" /> */}
                      total bachelor teachers
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {' '}
                    {provinceTeachersCount['teachers_16']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.bachelorMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="dash.bachelorFemale" /> */}
                      total master teachers
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {' '}
                    {provinceTeachersCount['master_teachers']}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.bachelorFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="dash.phdMale" /> */}
                      total phd teachers
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['phd_teachers']}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.phdMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.phdFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="teacher.EvaluatedMale" /> */}
                      total evaluated teachers
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['evaluated_teachers']}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="teacher.EvaluatedMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>45</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="teacher.EvaluatedFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="teacher.EvaluatedFemale" /> */}
                      not evaluated teachers
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {' '}
                    {provinceTeachersCount['not_evaluated_teachers']}
                  </p>
                </div>
              </Colxx>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '7%' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalStatistics" />
              </CardTitle>
              <Separator />
              <br />
              <Colxx>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfInstitute" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['institute_count']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfSchool" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceTeachersCount['school_count']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfDorms" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceDormsCount['total_dorms']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfTeachers" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>90</p>
                </div>
              </Colxx>
            </CardBody>
          </Card>
          <Card style={{ minHeight: '180px' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalStudentsInst" />
              </CardTitle>
              <Separator />
              <br />
              <Row className="m-2 ">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="institute.totalStudentsMale" /> */}
                      total institute students
                    </b>
                  </p>
                  <p>{provinceStuentsCount['total_institute_students']}</p>
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>{provinceStuentsCount['male_institute_students']}</p>
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>{provinceStuentsCount['female_institute_students']}</p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '7%' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalStudentsDorm" />
              </CardTitle>
              <Separator />
              <br />
              <Colxx style={{ marginRight: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="institute.totalStudentsMale" /> */}
                      total dorm students
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceDormsCount['total_dorm_students']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceDormsCount['male_dorm_students']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceDormsCount['female_dorm_students']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_1" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceDormsCount['badal_eyasha']}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_2" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>
                    {provinceDormsCount['badeel_eyasha']}
                  </p>
                </div>
              </Colxx>
            </CardBody>
          </Card>
          <Card style={{ minHeight: '180px' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalStudentsScool" />
              </CardTitle>
              <Separator />
              <br />
              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                ></p>
              </b>
              <Row className="m-2 ">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      {/* <IntlMessages id="institute.totalStudentsMale" /> */}
                      total school students
                    </b>
                  </p>
                  <p>{provinceStuentsCount['total_schoole_students']}</p>
                </Colxx>

                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>{provinceStuentsCount['male_schoole_students']}</p>
                </Colxx>

                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>{provinceStuentsCount['female_schoole_students']}</p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      <Row>
        {/* Institute List */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '600px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.instituteList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '500px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol>
                    <li>Nima</li>
                    <li>کثیر الرشتوی بغلان</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>Nima</li>
                    <li>کثیر الرشتوی بغلان</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>Nima</li>
                    <li>کثیر الرشتوی بغلان</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>نابینایان</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>نابینایان</li>
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Schools list */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '600px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.schoolsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '500px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol>
                    <li>Nima</li>
                    <li>کثیر الرشتوی بغلان</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>Nima</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>نابینایان</li>
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Dorms list */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '600px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.dormsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '500px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ul>
                    <span style={{ paddingLeft: '30px' }}> لیله</span>
                    <span style={{ paddingLeft: '30px' }}>مجموعی</span>
                    <span style={{ paddingLeft: '30px' }}>زکور</span>
                    <span style={{ paddingLeft: '30px' }}>اناث</span>
                  </ul>
                  <ol>
                    {provinceDormsList.map((dorm, index) => (
                      <li key={index}>
                        <span style={{ paddingLeft: '30px' }}>{dorm.dorm}</span>
                        <span style={{ paddingLeft: '30px' }}>
                          {dorm.total_students}
                        </span>
                        <span style={{ paddingLeft: '30px' }}>
                          {dorm.male_students}
                        </span>
                        <span style={{ paddingLeft: '30px' }}>
                          {dorm.female_students}
                        </span>
                      </li>
                    ))}
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Fields List */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '600px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.fieldsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '500px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol>
                    <li>Nima</li>
                    <li>کثیر الرشتوی بغلان</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>Nima</li>
                    <li>تکنالوژی بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>ورترنری بغلان</li>
                    <li>تکنالوژی ۰۱ بغلان</li>
                    <li>زراعت بغلان</li>
                    <li>نابینایان</li>
                    <li>نابینایان</li>
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Notification */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '600px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.notifcation" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '500px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  {comments.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex flex-row mb-3 pb-3 border-bottom"
                      >
                        <NavLink to={`${adminRoot}/pages/product/details`}>
                          <img
                            src={item.thumb}
                            alt={item.title}
                            className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                          />
                        </NavLink>

                        <div className="pl-3 pr-2">
                          <NavLink to={`${adminRoot}/pages/product/details`}>
                            <p className="font-weight-medium mb-0">
                              {item.title}
                            </p>
                            <p className="text-muted mb-0 text-small">
                              {item.detail}
                            </p>
                            {displayRate && (
                              <div className="form-group mb-1 mt-2">
                                <Rating
                                  total={5}
                                  rating={5}
                                  interactive={false}
                                />
                              </div>
                            )}
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Calendar />
        </Colxx>
      </Row>
    </>
  );
};

export default ProvincailDashboard;
