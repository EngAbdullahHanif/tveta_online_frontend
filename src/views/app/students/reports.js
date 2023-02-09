import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import { ThemeColors } from 'helpers/ThemeColors';

import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Collapse,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

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

const colors = ThemeColors();

const servicePath = 'http://localhost:8000';
const teachersInstituteApiUrl = `${servicePath}/teachers/schoole_teachers_province/`;
const studentsApiUrl = `${servicePath}/api/province_student_statistics/`;
const sectorsInstitutesApiUrl = `${servicePath}/institutes/sectors-institutes`; //api not developed
const sectorsStudentsApiUrl = `${servicePath}/api/sectors-students`; //api not developed
const classStudentsApiUrl = `${servicePath}/api/class-students`; //api not developed
const newEnrolledStudentsApiUrl = `${servicePath}/api/new-enrolled-students`; //api not developed
const teachersApiUrl = `${servicePath}/teachers/province_teacher_count`;
const instituteBuildingApiUrl = `${servicePath}/institutes/institute_building_count`; //api not developed

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

const quillFormats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
];

const Reports = () => {
  const [textQuillStandart, setTextQuillStandart] = useState('اینجا کابل هست');
  const [isLoaded, setIsLoaded] = useState(false);

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const [teachersInstitute, setTeachersInstitute] = useState([]);
  const [teachersInstituteLoading, setTeachersInstituteLoading] =
    useState(false);

  const [sectorsInstitutes, setSectorsInstitutes] = useState([]);
  const [sectorsInstitutesLoading, setSectorsInstitutesLoading] =
    useState(false);

  const [sectorsStudents, setSectorsStudents] = useState([]);
  const [sectorsStudentsLoading, setSectorsStudentsLoading] = useState(false);

  const [classStudents, setClassStudents] = useState([]);
  const [classStudentsLoading, setClassStudentsLoading] = useState(false);

  const [newEnrolledStudents, setNewEnrolledStudents] = useState([]);
  const [newEnrolledStudentsLoading, setNewEnrolledStudentsLoading] =
    useState(false);

  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);

  const [instituteBuilding, setInstituteBuilding] = useState([]);
  const [instituteBuildingLoading, setInstituteBuildingLoading] =
    useState(false);

  const fetchStudents = async () => {
    const response = await axios.get(studentsApiUrl);
    const updatedData = await response.data;
    setStudents(updatedData);
    setStudentsLoading(true);
  };

  const fetchTeachersInstitute = async () => {
    const response = await axios.get(teachersInstituteApiUrl);
    const updatedData = await response.data;
    setTeachersInstitute(updatedData);
    setTeachersInstituteLoading(true);
  };

  const fetchSectorsInstitute = async () => {
    const response = await axios.get(sectorsInstitutesApiUrl);
    const updatedData = await response.data;
    setSectorsInstitutes(updatedData);
    setSectorsInstitutesLoading(true);
  };

  const fetchsectorStudents = async () => {
    const response = await axios.get(sectorsStudentsApiUrl);
    const updatedData = await response.data;
    setSectorsStudents(updatedData);
    setSectorsStudentsLoading(true);
  };

  const fetchClassStudents = async () => {
    const response = await axios.get(classStudentsApiUrl);
    const updatedData = await response.data;
    setClassStudents(updatedData);
    setClassStudentsLoading(true);
  };

  const fetchNewEnrolledStudents = async () => {
    const response = await axios.get(newEnrolledStudentsApiUrl);
    const updatedData = await response.data;
    setNewEnrolledStudents(updatedData);
    setNewEnrolledStudentsLoading(true);
  };

  const fetchTeachers = async () => {
    const response = await axios.get(teachersApiUrl);
    const updatedData = await response.data;
    setTeachers(updatedData);
    setTeachersLoading(true);
  };

  const fetchInstituteBuilding = async () => {
    const response = await axios.get(instituteBuildingApiUrl);
    const updatedData = await response.data;
    setInstituteBuilding(updatedData);
    setInstituteBuildingLoading(true);
  };

  useEffect(() => {
    fetchStudents();
    fetchTeachersInstitute();
    fetchSectorsInstitute();
    fetchsectorStudents();
    fetchClassStudents();
    fetchNewEnrolledStudents();
    fetchTeachers();
    fetchInstituteBuilding();
    setIsLoaded(true);
  }, []);

  const studentsReportChartData = {
    labels: ['ذکور', 'اناث'],
    datasets: [
      {
        label: '',
        borderColor: [
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
        ],
        backgroundColor: [
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
        ],
        borderWidth: 2,
        data: [students['male_students'], students['female_students']],
      },
    ],
  };
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  {/* <IntlMessages id="charts.doughnut" /> */}
                  Gender Based Chart
                </CardTitle>
                <Row>
                  <Colxx xxs="12" lg="12" className="mb-5">
                    <CardSubtitle>
                      {/* <IntlMessages id="charts.shadow" /> */}
                      Gender Based Chart
                    </CardSubtitle>
                    <div className="chart-container">
                      <DoughnutChart data={studentsReportChartData} />
                    </div>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="editors.quill-standart" />
                </CardTitle>
                <ReactQuill
                  theme="snow"
                  value={textQuillStandart}
                  onChange={(val) => setTextQuillStandart(val)}
                  modules={quillModules}
                  formats={quillFormats}
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
};

export default Reports;
