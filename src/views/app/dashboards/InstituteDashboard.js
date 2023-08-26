import React, { useState, useEffect } from 'react';
import './../dorms/dorm-register.css';
import './provincail-dashboard.css';

import {
  Row,
  Card,
  CardBody,
  Table,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';

import CustomePieChart from 'components/charts/custom-pie-chart';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import callApi from 'helpers/callApi';
const Provincail = (values, { className = '', displayRate = false }) => {
  const [instituteReports, setInstituteReports] = useState();

  const fetchInstituteReport = async () => {
    await callApi('reports/students/institute/')
      .then((report) => {
        console.log('Institute Report Dashboard: ', report.data);
        setInstituteReports(report.data);
      })
      .catch((error) => {
        console.log('Error in fetching Institute Report: ', error);
      });
  };
  useEffect(() => {
    fetchInstituteReport();
  }, []);

  return (
    <>
      <h1 className="mt-5 m-1">د انستتیوت دشبورډ/ دشبورډ انستتیوت</h1>
      <Separator className="mb-5" />

      {/* First Three columns */}
      <Row>
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
                    <td>{instituteReports?.total_teachers}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </td>
                    <td>{instituteReports?.male_teachers}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </td>
                    <td>{instituteReports?.female_teachers}</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card style={{ minHeight: '180px' }}>
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
                  <p>{instituteReports?.total_students}</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>
                    {instituteReports?.male_students_12 +
                      instituteReports?.male_students_14}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>
                    {instituteReports?.female_students_12 +
                      instituteReports?.female_students_14}
                  </p>
                  <br />
                </Colxx>
              </Row>
            </CardBody>
            <br />
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
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="dash.teacherGender" />
                  </CardSubtitle>
                  {instituteReports && (
                    <CustomePieChart
                      data={[
                        instituteReports?.male_teachers,
                        instituteReports?.female_teachers,
                      ]}
                      labels={['ذکور', 'اناث']}
                      backgroundColor={['#FF6384', '#36A2EB']}
                    />
                  )}
                </Colxx>

                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="charts.ّInstituteStudentGenderChart" />
                  </CardSubtitle>
                  {instituteReports && (
                    <CustomePieChart
                      data={[
                        instituteReports?.male_students_12 +
                          instituteReports?.male_students_14,
                        instituteReports?.female_students_12 +
                          instituteReports?.female_students_14,
                      ]}
                      labels={['ذکور', 'اناث']}
                      backgroundColor={['#FF6384', '#36A2EB']}
                    />
                  )}
                </Colxx>
              </Row>
            </CardBody>
            <br />
            <br />
            <br />
          </Card>
          <br />
          <br />
          {/* Teacher Evaluation Statistics */}
          {/* <Colxx xxs="13">
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
                      <td>456</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        {' '}
                        <IntlMessages id="dash.TeacherNotEvaluatedTotal" />
                      </td>
                      <td> 3456</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        {' '}
                        <IntlMessages id="teacher.EvaluatedMale" />
                      </td>
                      <td>6786</td>
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
          </Colxx> */}
        </Colxx>

        {/* Students */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4 ">
          <Card style={{ minHeight: '180px' }}>
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
                  <p>{instituteReports?.total_students}</p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>
                    {instituteReports?.male_students_12 +
                      instituteReports?.male_students_14}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>
                    {instituteReports?.female_students_12 +
                      instituteReports?.female_students_14}
                  </p>
                  <br />
                </Colxx>
              </Row>
            </CardBody>
            <br />
          </Card>
        </Colxx> */}

        {/* Students chart */}
        {/* <Colxx xxs="8" sm="4" md="8">
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
                  {instituteReports && (
                    <CustomePieChart
                      data={[
                        instituteReports?.male_students_12 +
                          instituteReports?.male_students_14,
                        instituteReports?.female_students_12 +
                          instituteReports?.female_students_14,
                      ]}
                      labels={['ذکور', 'اناث']}
                      backgroundColor={['#FF6384', '#36A2EB']}
                    />
                  )}
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="dash.totalStudentsDorm" />
                  </CardSubtitle>
                  <CustomePieChart
                    data={[467, 789]}
                    labels={['ذکور', 'اناث']}
                    backgroundColor={['#FFCE56', '#FF6333']}
                  />
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="charts.schoolStudentGenderChart" />
                  </CardSubtitle>
                  <CustomePieChart
                    data={[534, 876]}
                    labels={['ذکور', 'اناث']}
                    backgroundColor={['#f062ba', '#34eb77']}
                  />
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle>
                    <IntlMessages id="charts.schoolStudentGenderChart" />
                  </CardSubtitle>
                  <CustomePieChart
                    data={[376, 267]}
                    labels={['ذکور', 'اناث']}
                    backgroundColor={['#f0e80c', '#FF6333']}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx> */}

        {/* Institute List */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4">
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
        </Colxx> */}

        {/* Schools list */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4">
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
        </Colxx> */}

        {/* Dorms list */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4">
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
        </Colxx> */}

        {/* Fields List */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4">
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
        </Colxx> */}

        {/* Total Statistics */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '7%' }}>
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
                    5674
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
                    3245
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
                    345
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
        </Colxx> */}
      </Row>
    </>
  );
};

export default Provincail;
