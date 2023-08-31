import React, { useState } from 'react';
import './../dorms/dorm-register.css';
import './provincail-dashboard.css';
import Calendar from 'containers/dashboards/Calendar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink } from 'react-router-dom';
import { adminRoot } from 'constants/defaultValues';
import {
  DoughnutChart,
  PolarAreaChart,
} from 'components/charts';
import {
  polarAreaChartData,
  polarAreaChartData1,
  doughnutChartData,
  doughnutChartData1,
} from 'data/charts';

import {
  Row,
  Card,
  CardBody,
  Table,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { comments } from 'data/comments';
import Rating from 'components/common/Rating';

const ProvincailDashboard = (
  values,
  { className = '', displayRate = false }
) => {
  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  const [loaded, setLoaded] = useState(true);

  return (
    <>
      <h1 className="mt-5 m-1">{<IntlMessages id="dashboard.national" />}</h1>
      <Separator className="mb-5" />

      <Row>
        {/* Teachers */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          <Card style={{ minHeight: '530px', marginBottom: '7% ' }} id="divId">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.totalNumberOfTeachers" />
              </CardTitle>
              <Separator />
              <br />
              {loaded ? (
                <Colxx>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>
                      <b>
                        {' '}
                        <IntlMessages id="institute.totalStudentsMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%' }}>90</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>
                      <b>
                        {' '}
                        <IntlMessages id="institute.totalStudentsFemale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%' }}>500</p>
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
                        <IntlMessages id="dash.bachelorMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%' }}>13</p>
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
                        <IntlMessages id="teacher.EvaluatedMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%' }}>13</p>
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
                  <br />
                  <br />
                </Colxx>
              ) : (
                <Row className="p-5 m-5">
                  <Colxx className="d-flex justify-content-center">
                    <CardTitle>
                      {' '}
                      <IntlMessages id="dash.loading" />
                    </CardTitle>
                  </Colxx>
                </Row>
              )}
            </CardBody>
          </Card>
        </Colxx>

        {/* Teachers chart */}
        <Colxx xxs="8" sm="4" md="8">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="charts.Teachers.chart" />
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="dash.teacherGender" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <DoughnutChart data={doughnutChartData} />
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="forms.EducationLevelLabel" />
                  </CardSubtitle>
                  <div className="chart-container">
                    <DoughnutChart data={doughnutChartData1} />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
            <br />
            <br />
            <br />
          </Card>
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
      </Row>

      <Row>
        {/* ّInstitute School and special eduaction statistic list. */}
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.institutesSchoolsandSpecialEducationStatistics" />
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
                      <IntlMessages id="inst.type" />
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="menu.instituteT" />
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="menu.SchoolsT" />
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="dash.specialEducationS" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.instituteComplex" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.instituteShahri" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.instituteRural" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.instituteColdArea" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.instituteWarmArea" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>

                  <tr>
                    <th scope="row">8</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.institutePublic" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.institutePrivate" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        {/* Based On sector */}
        <Colxx xxs="6">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.institutesSchoolsBasedOnSector" />
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
                      <IntlMessages id="dash.sector" />
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="menu.instituteT" />
                    </th>
                    <th>
                      {' '}
                      <IntlMessages id="menu.SchoolsT" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_1" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_2" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_3" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_4" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_5" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_6" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_7" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>

                  <tr>
                    <th scope="row">8</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_8" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      {' '}
                      <IntlMessages id="dash.sectorType_9" />
                    </td>
                    <td>58</td>
                    <td>58</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        {/* Based On Field */}
        <Colxx xxs="12" sm="4" md="8" className="mb-4">
          <Card className={className} style={{ minHeight: '900px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.insituteField" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '900px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <Table>
                    <thead>
                      <tr>
                        <th>
                          {' '}
                          <IntlMessages id="marks.No" />{' '}
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="menu.field" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="menu.instituteT" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="menu.SchoolsT" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_1" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_2" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_3" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_4" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_5" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_6" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_7" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">8</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_8" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">9</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_9" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">10</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_10" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">11</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_11" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">12</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_12" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">13</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_13" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">14</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_14" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">15</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_15" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">16</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_16" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">17</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_17" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">18</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_18" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">19</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_19" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">20</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_20" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">21</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_21" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">22</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_22" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">23</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_23" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">24</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_24" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">25</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_25" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">26</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_26" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">27</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_27" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">28</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_28" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">29</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_29" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">30</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_30" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">31</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_31" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">32</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_32" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">33</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_33" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">34</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_34" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">35</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_35" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">36</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_36" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">37</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_37" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">38</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_38" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">39</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_39" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">40</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_40" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">41</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_41" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">42</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_42" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">43</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_43" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">44</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_44" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">45</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_45" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">46</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_46" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">47</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_47" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">48</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_48" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">49</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_49" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">50</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_50" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">51</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_51" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">52</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_52" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">53</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_53" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">54</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_54" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">55</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_55" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">56</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_56" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">57</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_57" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">58</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_58" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">59</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_59" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">60</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_60" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">61</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_61" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">62</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_62" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">63</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_63" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">64</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_64" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                    </tbody>
                    <thead>
                      <tr>
                        <th>
                          {' '}
                          <IntlMessages id="marks.No" />{' '}
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="menu.field" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="menu.instituteT" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="menu.SchoolsT" />
                        </th>
                      </tr>
                    </thead>
                  </Table>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Institute List */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '900px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.instituteList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '900px' }}
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

        {/* Based On Based on Provinces */}
        <Colxx xxs="12" sm="4" md="12" className="mb-4">
          <Card className={className} style={{ minHeight: '900px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.statisticsBasedOnProvinces" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '900px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <Table>
                    <thead className="thead-dark ">
                      <tr>
                        <th colspan="6" className="border text-center"></th>
                        <th colspan="2" className="border text-center">
                          <IntlMessages id="menu.teacher" />
                        </th>
                        <th colspan="2" className="border text-center">
                          <IntlMessages id="dash.students" />
                        </th>
                      </tr>
                    </thead>
                    <thead>
                      <tr>
                        <th>
                          {' '}
                          <IntlMessages id="marks.No" />{' '}
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="forms.ProvinceLabel" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="dash.institute" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="dash.school" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="dash.Special Education" />
                        </th>

                        <th>
                          {' '}
                          <IntlMessages id="dash.field-1" />
                        </th>

                        <th>
                          {' '}
                          <IntlMessages id="dash.male" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="dash.female" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="dash.male" />
                        </th>
                        <th>
                          {' '}
                          <IntlMessages id="dash.female" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">5</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">6</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">7</th>
                        <td>Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">8</th>
                        <td>Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">9</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">10</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">11</th>
                        <td>Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">12</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">13</th>
                        <td>Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">14</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">15</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">16</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">17</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">18</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">19</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">20</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">21</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">22</th>
                        <td> Kabul</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>
                      <tr>
                        <th scope="row">23</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_23" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">24</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_24" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">25</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_25" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">26</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_26" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">27</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_27" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">28</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_28" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">29</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_29" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">30</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_30" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">31</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_31" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">32</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_32" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">33</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_33" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">34</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_34" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                      <tr>
                        <th scope="row">35</th>
                        <td>
                          {' '}
                          <IntlMessages id="dash.field_35" />
                        </td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                        <td>58</td>
                      </tr>{' '}
                    </tbody>
                  </Table>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Schools list */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '700px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.schoolsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '600px' }}
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
          <Card className={className} style={{ minHeight: '700px' }}>
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

        {/* Fields List */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '700px' }}>
            <CardBody>
              <CardTitle>
                <IntlMessages id="dash.fieldsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '600px' }}
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

        {/* Total statistics */}
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
                  <p style={{ marginRight: '10%' }}>5000</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfSchool" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>500</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfDorms" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
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
