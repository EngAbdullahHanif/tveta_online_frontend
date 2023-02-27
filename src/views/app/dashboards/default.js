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
  Table,
  FormGroup,
  Label,
  Button,
  CardTitle,
  CardSubtitle,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import {
  DoughnutChart,
  LineChart,
  PolarAreaChart,
  AreaChart,
  ScatterChart,
  BarChart,
  RadarChart,
  PieChart,
} from 'components/charts';
import {
  lineChartData,
  polarAreaChartData,
  polarAreaChartData1,
  areaChartData,
  scatterChartData,
  barChartData,
  radarChartData,
  pieChartData,
  doughnutChartData,
  doughnutChartData1,
} from 'data/charts';

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
        console.log('Data01', res.data);
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
        {/* Teacher */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
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
        </Colxx> */}

        {/* Teacher Statistics */}
        <Colxx xxs="4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.teacherStatistics" />
              </CardTitle>

              <Table striped>
                <thead>
                  <tr>
                    <th>
                      {' '}
                      <IntlMessages id="marks.No" />{' '}
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfTeachers" />
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="dash.totalNo" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </td>
                    <td> {provinceTeachersCount['total_teachers']}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </td>
                    <td> {provinceTeachersCount['male_teachers']}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </td>
                    <td>{provinceTeachersCount['female_teachers']}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.14YearsGreduatedTotal" />
                    </td>
                    <td> {provinceTeachersCount['14_teachers']}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      <IntlMessages id="dash.14YearsGreduatedMale" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.14YearsGreduatedFemale" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.bachelorTotal" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.bachelorMale" />
                    </td>
                    <td>58</td>
                  </tr>

                  <tr>
                    <th scope="row">8</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.bachelorFemale" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.masterTotal" />
                    </td>
                    <td> {provinceTeachersCount['master_teachers']}</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.masterMale" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.masterFemale" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.phdTotal" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.phdMale" />
                    </td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.phdFemale" />
                    </td>
                    <td>58</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        {/* Teacher Chart */}
        <Colxx xxs="12" sm="4" md="8">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="charts.Teachers.chart" />
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="5" className="">
                  <CardSubtitle>
                    <IntlMessages id="dash.teacherGender" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <DoughnutChart data={doughnutChartData} />
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="7" className="">
                  <CardSubtitle>
                    <IntlMessages id="forms.EducationLevelLabel" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <DoughnutChart data={doughnutChartData1} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
          <br />
          <br />
          {/* Teacher Evaluation Statistics */}
          <Colxx xxs="13">
            <Card className="">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="dash.teacherEvaluationStatistics" />
                </CardTitle>

                <Table striped>
                  <thead>
                    <tr>
                      <th>
                        {' '}
                        <IntlMessages id="marks.No" />{' '}
                      </th>
                      <th>
                        {' '}
                        <IntlMessages id="dash.totalNumberOfTeachers" />
                      </th>
                      <th>
                        {' '}
                        <IntlMessages id="dash.totalNo" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        {' '}
                        <IntlMessages id="dash.TeacherEvaluatedTotal" />
                      </td>
                      <td>۵۵</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        {' '}
                        <IntlMessages id="dash.TeacherNotEvaluatedTotal" />
                      </td>
                      <td> ۱۰۰۰</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        {' '}
                        <IntlMessages id="teacher.EvaluatedMale" />
                      </td>
                      <td>w23</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>
                        {' '}
                        <IntlMessages id="teacher.EvaluatedFemale" />
                      </td>
                      <td>23423</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Colxx>
        </Colxx>

        {/* Students */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4 ">
          <Card style={{ minHeight: '180px' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalStudentsInst" />
              </CardTitle>
              <Separator />
              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>5000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>5000</p>
                  <br />
                </Colxx>
              </Row>

              <CardTitle>
                <IntlMessages id="dash.specialEducationStudents" />
              </CardTitle>
              <Separator />
              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
              </Row>

              <CardTitle>
                <IntlMessages id="dash.totalStudentsScool" />
              </CardTitle>
              <Separator />

              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>5000</p>
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>5000</p>
                  <br />
                </Colxx>
              </Row>
              <CardTitle>
                <IntlMessages id="dash.totalStudentsDorm" />
              </CardTitle>
              <Separator />
              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>‌10000</p>
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_1" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_2" />
                    </b>
                  </p>
                  <p>‌10000</p>
                  <br />
                </Colxx>
              </Row>
            </CardBody>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Card>
        </Colxx>

        {/* Students chart */}
        <Colxx xxs="8" sm="4" md="8">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="charts.studentChart" />
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="charts.ّInstituteStudentGenderChart" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <PolarAreaChart shadow data={polarAreaChartData} />
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="dash.totalStudentsDorm" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <PolarAreaChart shadow data={polarAreaChartData} />
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="charts.schoolStudentGenderChart" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <PolarAreaChart data={polarAreaChartData1} />
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="charts.schoolStudentGenderChart" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <PolarAreaChart data={polarAreaChartData1} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

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
        {/* Calender */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Calendar />
        </Colxx>

        {/* Total Statistics */}
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
        </Colxx>
      </Row>
    </>
  );
};

export default ProvincailDashboard;
