import React, { useState, useContext, useEffect } from 'react';
import './../dorms/dorm-register.css';
import './provincail-dashboard.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { AuthContext } from 'context/AuthContext';

import CustomePieChart from 'components/charts/custom-pie-chart';
import CustomeBarChart from 'components/charts/custom-bar-chart';

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
import callApi from 'helpers/callApi';

const Admin = (values, { className = '', displayRate = false }) => {
  const { user, institutes, contextFields, settings, sectors } =
    useContext(AuthContext);
  const [isNext, setIsNext] = useState(true);
  const [studentsRaport, setStudentsReport] = useState();
  const [dorms, setDorms] = useState();
  const [teachers, setTeachers] = useState();
  const [instituteReports, setInstituteReport] = useState();
  const [fieldReport, setFieldReport] = useState();
  const [sectorReport, setSectorReport] = useState();

  const handleClick = (event) => {
    setIsNext(event);
  };
  const fetchReportData = async () => {
    await callApi('reports/students/national/all/').then((response) => {
      console.log('Students National Report: ', response.data[0]);
      setStudentsReport(response.data[0]);
    });
  };
  const fetchDorms = async () => {
    await callApi('institute/dorms/').then((response) => {
      console.log('Dorms: ', response.data);
      setDorms(response.data);
    });
  };
  const fetchTeachers = async () => {
    await callApi(
      `reports/teachers/national/all/?year=${settings?.current_educational_year}`
    ).then((response) => {
      console.log('Teachers: ', response.data);
      setTeachers(response.data[0]);
    });
  };

  const fetchInstitutesReport = async () => {
    await callApi(`reports/institutes/national/`).then((response) => {
      console.log('fetchInstitutesReport: ', response.data);
      setInstituteReport(response.data);
    });
  };

  const fetchFieldReport = async () => {
    await callApi(`reports/institutes/national/fields/`).then((response) => {
      console.log('fetchFieldReport: ', response.data);
      setFieldReport(response.data);
    });
  };

  const fetchSectorReport = async () => {
    await callApi(`reports/institutes/national/sectors/`).then((response) => {
      console.log('fetchSectorReport: ', response.data);
      setSectorReport(response.data);
    });
  };
  useEffect(() => {
    fetchReportData();
    fetchDorms();
    fetchTeachers();
    fetchInstitutesReport();
    fetchFieldReport();
    fetchSectorReport();
    console.log('Auth User in Dashboard: ', user);
    console.log(
      'Auth User in Dashboard Local Storage: ',
      JSON.parse(localStorage.getItem('user'))
    );
  }, []);
  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  const [loaded, setLoaded] = useState(true);

  return (
    <>
      <h1 style={{ fontSize: 50 }} className="mt-5 m-1">
        {<IntlMessages id="dashboard.national" />}
      </h1>
      <Separator className="mb-5" />

      <Row>
        {/* Teachers */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          {/* <Card style={{ minHeight: '530px', marginBottom: '7% ' }} id="divId"> */}{' '}
          {/* we commented this line because we wanna stop howering*/}{' '}
          <Card style={{ minHeight: 'auto', marginBottom: '7% ' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 35 }}>
                <IntlMessages id="dash.totalNumberOfTeachers" />
              </CardTitle>
              <Separator />
              <br />
              {loaded ? (
                <Colxx>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="institute.totalStudentsMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.male_teachers}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="institute.totalStudentsFemale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.female_teachers}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="dash.14YearsGreduatedMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.education[0].male}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="dash.14YearsGreduatedFemale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.education[0].female}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="dash.bachelorMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.education[1].male}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="dash.bachelorFemale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.education[1].female}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="dash.phdMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.education[3].male}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="dash.phdFemale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.education[3].female}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="teacher.EvaluatedMale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.evaluations.male}
                    </p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ fontSize: 20 }}>
                      <b>
                        {' '}
                        <IntlMessages id="teacher.EvaluatedFemale" />
                      </b>
                    </p>
                    <p style={{ marginRight: '10%', fontSize: 20 }}>
                      {teachers?.evaluations.female}
                    </p>
                  </div>
                  <br />
                  <br />
                </Colxx>
              ) : (
                <Row className="p-5 m-5">
                  <Colxx className="d-flex justify-content-center">
                    <CardTitle style={{ fontSize: 35 }}>
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
              <CardTitle style={{ fontSize: 35 }}>
                <IntlMessages id="charts.Teachers.chart" />
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <IntlMessages id="dash.teacherlocation_type" />
                  </CardSubtitle>

                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {teachers && (
                      <CustomePieChart
                        data={[
                          teachers?.male_teachers,
                          teachers?.female_teachers,
                        ]}
                        labels={['ذکور', 'اناث']}
                        backgroundColor={['#FF6384', '#36A2EB']}
                      />
                    )}
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle style={{ fontSize: 20, fontWeight: 'bold' }}>
                    <IntlMessages id="forms.EducationLevelLabel" />
                  </CardSubtitle>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {teachers && (
                      <CustomeBarChart
                        data={[
                          teachers?.education[0].count,
                          teachers?.education[1].count,
                          teachers?.education[2].count,
                          teachers?.education[3].count,
                        ]}
                        labels={['چهارده پاس', 'لیسانس', 'ماستر', 'دوکتور']}
                        backgroundColor={[
                          '#FF6384',
                          '#36A2EB',
                          '#FFCE56',
                          '#FF6333',
                        ]}
                      />
                    )}
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
          {/* <Card style={{ minHeight: '180px' }} id="divId"> */}{' '}
          {/* commented because of stoping hower*/}
          <Card style={{ minHeight: 'auto' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.totalStudentsInst" />
              </CardTitle>
              <Separator />
              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.total_institute_students}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.male_institute_students}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.female_institute_students}
                  </p>
                  <br />
                </Colxx>
              </Row>

              <CardTitle style={{ fontSize: 26 }}>
                <IntlMessages id="dash.specialEducationStudents" />
              </CardTitle>
              <Separator />
              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.total_sp_school_students}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.male_sp_school_students}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.female_sp_school_students}
                  </p>
                  <br />
                </Colxx>
              </Row>

              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.totalStudentsScool" />
              </CardTitle>
              <Separator />

              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalStudents" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.total_schoole_students}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.male_schoole_students}
                  </p>
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.female_schoole_students}
                  </p>
                  <br />
                </Colxx>
              </Row>

              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.totalStudentsDorm" />
              </CardTitle>
              <Separator />
              <Row className="mt-3 mb-2 m-1">
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.male_dorm_students}
                  </p>
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.female_dorm_students}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_1" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.dorm_student_badalasha}
                  </p>
                  <br />
                </Colxx>
                <Colxx>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_2" />
                    </b>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    {studentsRaport?.dorm_student_badeelasha}
                  </p>
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
              <CardTitle style={{ fontSize: 30, fontWeight: 'bold' }}>
                <IntlMessages id="charts.studentChart" />
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle style={{ fontSize: 25, fontWeight: 'bold' }}>
                    <IntlMessages id="charts.ّInstituteStudentGenderChart" />
                  </CardSubtitle>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {studentsRaport && (
                      <CustomePieChart
                        data={[
                          studentsRaport?.male_institute_students,
                          studentsRaport?.female_institute_students,
                        ]}
                        labels={['ذکور', 'اناث']}
                        backgroundColor={['#FF6384', '#36A2EB']}
                      />
                    )}
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle style={{ fontSize: 25, fontWeight: 'bold' }}>
                    <IntlMessages id="dash.totalStudentsDorm" />
                  </CardSubtitle>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {studentsRaport && (
                      <CustomePieChart
                        data={[
                          studentsRaport?.male_dorm_students,
                          studentsRaport?.female_dorm_students,
                        ]}
                        labels={['ذکور', 'اناث']}
                        backgroundColor={['#FFCE56', '#FF6333']}
                      />
                    )}
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle style={{ fontSize: 25, fontWeight: 'bold' }}>
                    <IntlMessages id="charts.schoolStudentGenderChart" />
                  </CardSubtitle>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {studentsRaport && (
                      <CustomePieChart
                        data={[
                          studentsRaport?.male_schoole_students,
                          studentsRaport?.female_schoole_students,
                        ]}
                        labels={['ذکور', 'اناث']}
                        backgroundColor={['#f062ba', '#34eb77']}
                      />
                    )}
                  </div>
                </Colxx>
                <Colxx xxs="12" lg="6" className="mb-5">
                  <CardSubtitle style={{ fontSize: 25, fontWeight: 'bold' }}>
                    {/* <IntlMessages id="charts.schoolStudentGenderChart" /> */}
                    د ځانګړو زده کړو زده کوونکي/ شاگردان تعلیمات خاص
                  </CardSubtitle>
                  <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {studentsRaport && (
                      <CustomePieChart
                        data={[
                          studentsRaport?.male_sp_school_students,
                          studentsRaport?.female_sp_school_students,
                        ]}
                        labels={['ذکور', 'اناث']}
                        backgroundColor={['#f0e80c', '#FF6333']}
                      />
                    )}
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
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.institutesSchoolsandSpecialEducationStatistics" />
              </CardTitle>

              <Table striped>
                <thead>
                  <tr style={{ fontSize: 20 }}>
                    <th>
                      <IntlMessages id="marks.No" />
                    </th>
                    <th>
                      <IntlMessages id="inst.type" />
                    </th>
                    <th>
                      <IntlMessages id="menu.instituteT" />
                    </th>
                    <th>
                      <IntlMessages id="menu.SchoolsT" />
                    </th>
                    <th>
                      <IntlMessages id="dash.specialEducationS" />
                    </th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: 20 }}>
                  <tr>
                    <th scope="row">1</th>
                    <td>
                      <IntlMessages id="institute.totalStudentsMale" />
                    </td>
                    <td>{instituteReports?.gender[0].institutes}</td>
                    <td>{instituteReports?.gender[0].schools}</td>
                    <td>{instituteReports?.gender[0].special_educations}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </td>
                    <td>{instituteReports?.gender[1].institutes}</td>
                    <td>{instituteReports?.gender[1].schools}</td>
                    <td>{instituteReports?.gender[1].special_educations}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>
                      <IntlMessages id="dash.instituteComplex" />
                    </td>
                    <td>{instituteReports?.gender[2].institutes}</td>
                    <td>{instituteReports?.gender[2].schools}</td>
                    <td>{instituteReports?.gender[2].special_educations}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>
                      <IntlMessages id="dash.instituteShahri" />
                    </td>
                    <td>{instituteReports?.location_type[0].institutes}</td>
                    <td>{instituteReports?.location_type[0].schools}</td>
                    <td>
                      {instituteReports?.location_type[0].special_educations}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>
                      <IntlMessages id="dash.instituteRural" />
                    </td>
                    <td>{instituteReports?.location_type[1].institutes}</td>
                    <td>{instituteReports?.location_type[1].schools}</td>
                    <td>
                      {instituteReports?.location_type[1].special_educations}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>
                      <IntlMessages id="dash.instituteColdArea" />
                    </td>
                    <td>{instituteReports?.climate[0].institutes}</td>
                    <td>{instituteReports?.climate[0].schools}</td>
                    <td>{instituteReports?.climate[0].special_educations}</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>
                      <IntlMessages id="dash.instituteWarmArea" />
                    </td>
                    <td>{instituteReports?.climate[1].institutes}</td>
                    <td>{instituteReports?.climate[1].schools}</td>
                    <td>{instituteReports?.climate[1].special_educations}</td>
                  </tr>

                  <tr>
                    <th scope="row">8</th>
                    <td>
                      <IntlMessages id="dash.institutePublic" />
                    </td>
                    <td>{instituteReports?.ownership[0].institutes}</td>
                    <td>{instituteReports?.ownership[0].schools}</td>
                    <td>{instituteReports?.ownership[0].special_educations}</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>
                      <IntlMessages id="dash.institutePrivate" />
                    </td>
                    <td>{instituteReports?.ownership[1].institutes}</td>
                    <td>{instituteReports?.ownership[1].schools}</td>
                    <td>{instituteReports?.ownership[1].special_educations}</td>
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
              <CardTitle style={{ fontSize: 28 }}>
                <IntlMessages id="dash.institutesSchoolsBasedOnSector" />
              </CardTitle>

              <Table striped style={{ fontSize: 20 }}>
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
                  {console.log('SECTORS', sectors)}
                  {sectorReport?.map((report, index) => {
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>
                          {sectors.find((f) => f.value === report.sector).label}
                        </td>
                        <td>{report.total_institutes}</td>
                        <td>{report.total_schools}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>

        {/* Based On Field */}
        <Colxx xxs="12" sm="4" md="8" className="mb-4">
          <Card className={className} style={{ minHeight: 'auto' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.insituteField" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: 'auto' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <Table style={{ fontSize: 20 }}>
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
                      {fieldReport?.map((report, index) => {
                        return (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td>
                              {
                                contextFields.find(
                                  (f) => f.value === report.field_of_study
                                ).label
                              }
                            </td>
                            <td>{report.total_institutes}</td>
                            <td>{report.total_schools}</td>
                          </tr>
                        );
                      })}
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
          <Card className={className} style={{ minHeight: 'auto' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.instituteList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: 'auto' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol style={{ fontSize: 20 }}>
                    {institutes?.map((inst) => {
                      return <li>{inst.label}</li>;
                    })}
                    {/* <li>Nima</li>
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
                    <li>نابینایان</li> */}
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Based On Based on Provinces */}
        {/* <Colxx xxs="12" sm="4" md="12" className="mb-4">
          <Card className={className} style={{ minHeight: '900px' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.statisticsBasedOnProvinces" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '900px' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <Table style={{ fontSize: 20 }}>
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
                        <td>567</td>
                        <td>345</td>
                        <td>57</td>
                        <td>234</td>
                        <td>78</td>
                        <td>234</td>
                        <td>5677</td>
                        <td>234</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Kabul</td>
                        <td>657</td>
                        <td>234</td>
                        <td>123</td>
                        <td>546</td>
                        <td>345</td>
                        <td>67</td>
                        <td>345</td>
                        <td>234</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Kabul</td>
                        <td>346</td>
                        <td>67</td>
                        <td>23</td>
                        <td>456</td>
                        <td>657</td>
                        <td>456</td>
                        <td>234</td>
                        <td>234</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td> Kabul</td>
                        <td>67</td>
                        <td>234</td>
                        <td>234</td>
                        <td>67</td>
                        <td>234</td>
                        <td>657</td>
                        <td>324</td>
                        <td>243</td>
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
        </Colxx> */}

        {/* Schools list */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: 'auto' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.schoolsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: 'auto' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol style={{ fontSize: 20 }}>
                    {institutes?.map((school) => {
                      if (school?.rest.institute_type === 'high_school')
                        return <li>{school.label}</li>;
                    })}
                    {/* <li>Nima</li>
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
                    <li>نابینایان</li> */}
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Dorms list */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: 'auto' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.dormsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: 'auto' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol style={{ fontSize: 20 }}>
                    {dorms?.map((dorm) => {
                      return <li>{dorm?.name}</li>;
                    })}
                    {/* <li>Nima</li>
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
                    <li>نابینایان</li> */}
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Fields List */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: 'auto' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.fieldsList" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: 'auto' }}
              >
                <PerfectScrollbar
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <ol style={{ fontSize: 20 }}>
                    {contextFields?.map((field) => {
                      return <li>{field.label}</li>;
                    })}
                    {/* <li>Nima</li>
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
                    <li>نابینایان</li> */}
                  </ol>
                </PerfectScrollbar>
              </div>
            </CardBody>
          </Card>
        </Colxx>

        {/* Notification */}
        {/* <Colxx xxs="12" sm="4" md="4" className="mb-4">
          <Card className={className} style={{ minHeight: '600px' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.notifcation" />
              </CardTitle>
              <div
                className="dashboard-list-with-user"
                style={{ minHeight: '500px', fontSize: 20 }}
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

                        <div style={{ fontSize: 20 }} className="pl-3 pr-2">
                          <NavLink to={`${adminRoot}/pages/product/details`}>
                            <p
                              style={{ fontSize: 20 }}
                              className="font-weight-medium mb-0"
                            >
                              {item.title}
                            </p>
                            <p
                              style={{ fontSize: 15 }}
                              className="text-muted mb-0 text-small"
                            >
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
        </Colxx> */}

        {/* Total statistics */}
        <Colxx xxs="12" sm="4" md="4" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '7%' }}>
            <CardBody>
              <CardTitle style={{ fontSize: 30 }}>
                <IntlMessages id="dash.totalStatistics" />
              </CardTitle>
              <Separator />
              <br />
              <Colxx>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfInstitute" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%', fontSize: 20 }}>
                    {institutes?.length}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfSchool" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%', fontSize: 20 }}>
                    {
                      institutes?.filter(
                        (inst) => inst.rest.institute_type === 'high_school'
                      )?.length
                    }
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfDorms" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%', fontSize: 20 }}>
                    {dorms?.length}
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p style={{ fontSize: 20 }}>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfTeachers" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%', fontSize: 20 }}>
                    {teachers?.total_teachers}
                  </p>
                </div>
              </Colxx>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Admin;
