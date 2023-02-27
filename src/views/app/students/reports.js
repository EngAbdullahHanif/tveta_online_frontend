import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import { ThemeColors } from 'helpers/ThemeColors';
import CustomePieChart from './custom-pie-chart';
import CustomeBarChart from './custom-bar-chart';
import CustomGroupedBarChart from './custome-grouped-bar-chart';

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
  const [isLoaded, setIsLoaded] = useState(true);

  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsText, setStudentsText] = useState(
    'طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد </br> طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد </br></br> طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد</br></br> طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد</br></br> طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [teachersInstitute, setTeachersInstitute] = useState([]);
  const [teachersInstituteLoading, setTeachersInstituteLoading] =
    useState(false);
  const [teachersInstituteText, setTeachersInstituteText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [sectorsInstitutes, setSectorsInstitutes] = useState([]);
  const [sectorsInstitutesLoading, setSectorsInstitutesLoading] =
    useState(false);
  const [sectorsInstitutesText, setSectorsInstitutesText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [sectorsStudents, setSectorsStudents] = useState([]);
  const [sectorsStudentsLoading, setSectorsStudentsLoading] = useState(false);
  const [sectorsStudentsText, setSectorsStudentsText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [classStudents, setClassStudents] = useState([]);
  const [classStudentsLoading, setClassStudentsLoading] = useState(false);
  const [classStudentsText, setClassStudentsText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [newEnrolledStudents, setNewEnrolledStudents] = useState([]);
  const [newEnrolledStudentsLoading, setNewEnrolledStudentsLoading] =
    useState(false);
  const [newEnrolledStudentsText, setNewEnrolledStudentsText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [teachers, setTeachers] = useState([]);
  const [teachersLoading, setTeachersLoading] = useState(false);
  const [teachersText, setTeachersText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

  const [instituteBuilding, setInstituteBuilding] = useState([]);
  const [instituteBuildingLoading, setInstituteBuildingLoading] =
    useState(false);
  const [instituteBuildingText, setInstituteBuildingText] = useState(
    ' طوریکه در گراف شماره 1 نشان داده شده است ولایت پروان در مجموع دارای 10 ولسوالی میباشد که از این جمع در 7 ولسوالی و مرکز آن 10مرکز تعلیمات تخنیکی و مسلکی وجود دارد و 2 ولسوالی دیگر آن فاقد مراکز تعلیمات تخنیکی و مسلکی میباشد.از مجموع 10 مرکز تعلیمات تخنیکی و مسلکی موجود در این ولایت به تعداد 8 باب انستیتوت و 2 باب آن لیسه می باشد و این ولایت فاقد مراکز تعلیمات خاص میباشد'
  );

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
    console.log('updated Data', updatedData);
    setTeachers(updatedData);
    setTeachersLoading(true);
    console.log(updatedData);
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

  const studentsData = {
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
  const StudentSectorBarChartData = {
    labels: [
      'زراعت و علوم حیوانی',
      'کثیرالرشتوی',
      'اقتصاد مدیریت',
      'علوم تخنیکی',
      'انجینری نفت و گار',
      'تکنالوجی معلوماتی',
      'علوم طبیعی',
      'ریشته های دیگر',
    ],
    datasets: [
      {
        label: [],
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [
          teachers['school_count'],
          3,
          4,
          teachers['institute_count'],
          6,
          5,
          9,
          1,
        ],
        borderWidth: 2,
      },
    ],
  };

  const educationalCentersData = {
    labels: ['انستیوت', 'لیسه', 'تعلمات خاص'],
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
        data: [2, 8, 7],
      },
    ],
  };

  const educationalCentersBarChartData = {
    labels: [
      'زراعت و علوم حیوانی',
      'کثیرالرشتوی',
      'اقتصاد مدیریت',
      'علوم تخنیکی',
      'انجینری نفت و گار',
      'تکنالوجی معلوماتی',
      'علوم طبیعی',
      'ریشته های دیگر',
    ],
    datasets: [
      {
        label: [],
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [
          teachers['school_count'],
          3,
          4,
          teachers['institute_count'],
          6,
          5,
          9,
          1,
        ],
        borderWidth: 2,
      },
    ],
  };

  const classBarChartData = {
    labels: ['صنف ۹', 'صنف ۱۰', 'صنف ۱۱', 'صنف ۱۲', 'صنف ۱۳', 'صتف ۱۴'],
    datasets: [
      {
        label: [],
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [
          teachers['school_count'],
          3,
          4,
          teachers['institute_count'],
          6,
          5,
        ],
        borderWidth: 2,
      },
    ],
  };

  const newEnrolledStudentsBarChartData = {
    labels: ['صنف ۹', 'صنف ۱۰', 'صنف ۱۱', 'صنف ۱۲', 'صنف ۱۳', 'صتف ۱۴'],
    datasets: [
      {
        label: [],
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [
          teachers['school_count'],
          3,
          4,
          teachers['institute_count'],
          6,
          5,
        ],
        borderWidth: 2,
      },
    ],
  };

  const teachersInstituteData = {
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

  const sectorsInstitutesData = {
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

  const sectorsStudentsData = {
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

  const classStudentsData = {
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

  const newEnrolledStudentsData = {
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

  const teachersData = {
    labels: ['چهارده پاس', 'لیسانس', 'ماستر', 'دوکتور'],
    datasets: [
      {
        label: '',
        borderColor: [
          colors.themeColor,
          colors.themeColor3,
          colors.themeColor2,
          colors.themeColor1,
        ],
        backgroundColor: [
          colors.themeColor4_10,
          colors.themeColor3_10,
          colors.themeColor2_10,
          colors.themeColor1_10,
        ],
        borderWidth: 2,
        data: [
          teachers['14_teachers'],
          teachers['teachers_16'],
          teachers['master_teachers'],
          teachers['phd_teachers'],
        ],
      },
    ],
  };

  const teacherBarChartData = {
    labels: ['چهارده پاس', 'لیسانس', 'ماستر', 'دوکتور'],
    datasets: [
      {
        label: ['مجموع استادان', teachers['total_teachers']],
        borderColor: colors.themeColor1,
        backgroundColor: colors.themeColor1_10,
        data: [
          teachers['14_teachers'],
          teachers['teachers_16'],
          teachers['master_teachers'],
          teachers['phd_teachers'],
        ],
        borderWidth: 2,
      },
    ],
  };
  const instituteBuildingData = {
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

  const canvasOptions = {
    theme: 'ligth',
    animationEnabled: true,
    exportFileName: 'New Year Resolutions',
    // exportEnabled: true,
    // title: {
    //   text: "Top Categories of New Year's Resolution",
    // },
    data: [
      {
        type: 'pie',
        showInLegend: true,
        legendText: '{label}',
        toolTipContent: '{label}: <strong>{y}%</strong>',
        indexLabel: '{y}%',
        indexLabelPlacement: 'inside',
        dataPoints: [
          { y: 32, label: 'Health' },
          { y: 22, label: 'Finance' },
          { y: 15, label: 'Education' },
          { y: 19, label: 'Career' },
          { y: 5, label: 'Family' },
          { y: 7, label: 'Real Estate' },
        ],
      },
    ],
  };

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      {/* institutes */}
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle style={{ marginBottom: '2rem' }}>
                {/* <IntlMessages id="charts.doughnut" /> */}
                مراکز تعلمی در ولایت بغلان
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="">
                    <Row></Row>
                    <Row>
                      <Colxx xxs="12" lg="4" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۱: &nbsp; &nbsp; تعداد مراکز تعلمات تخنیکی و
                          مسلکی
                        </CardSubtitle>
                        <CustomePieChart
                          data={[30, 20, 40]}
                          labels={['انستیوت', 'لیسه', 'تعلمات خاص']}
                          backgroundColor={['#FF6384', '#36A2EB', '#FFCE56']}
                        />
                      </Colxx>
                      <Colxx xxs="12" lg="8" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف 2: &nbsp; &nbsp; تعداد مراکز تعلمات تخنیکی و
                          مسلکی به اساس سکتور
                        </CardSubtitle>

                        <CustomeBarChart
                          data={[30, 20, 40, 50]}
                          labels={[
                            'زراعت و علوم حیوانی',
                            'کثیرالرشتوی',
                            'اقتصاد مدیریت',
                            'علوم تخنیکی',
                            'انجینری نفت و گار',
                            'تکنالوجی معلوماتی',
                            'علوم طبیعی',
                            'ریشته های دیگر',
                          ]}
                          backgroundColor={[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6333',
                            '#FF87EA',
                            '#89CDEE',
                            '#23D3E3',
                            '#B23498',
                          ]}
                        />
                      </Colxx>
                    </Row>
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <ReactQuill
                    theme="snow"
                    value={studentsText}
                    onChange={(val) => setStudentsText(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      {/* students */}
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle style={{ marginBottom: '2rem' }}>
                شاگردان در ولایت بغلان
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="">
                    <Row></Row>
                    <Row>
                      <Colxx xxs="12" lg="4" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۳: &nbsp; &nbsp; تعداد شاگردان به اساس جنسیت
                        </CardSubtitle>
                        <CustomePieChart
                          data={[321, 229]}
                          labels={['ذکور', 'اناث']}
                          backgroundColor={['#FF6384', '#36A2EB']}
                        />
                      </Colxx>
                      <Colxx xxs="12" lg="8" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۴: &nbsp; &nbsp; تعداد شاگردان به اساس سکتور
                        </CardSubtitle>

                        <CustomeBarChart
                          data={[30, 20, 40, 50, 60, 70, 80, 90, 100]}
                          labels={[
                            'زراعت و علوم حیوانی',
                            'کثیرالرشتوی',
                            'اقتصاد مدیریت',
                            'علوم تخنیکی',
                            'انجینری نفت و گار',
                            'تکنالوجی معلوماتی',
                            'علوم طبیعی',
                            'ریشته های دیگر',
                          ]}
                          backgroundColor={[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6333',
                            '#FF87EA',
                            '#89CDEE',
                            '#23D3E3',
                            '#B23498',
                          ]}
                        />
                      </Colxx>
                    </Row>
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <ReactQuill
                    theme="snow"
                    value={studentsText}
                    onChange={(val) => setStudentsText(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      {/* Class & New Registerd Students */}
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle style={{ marginBottom: '2rem' }}>
                شاگردان در ولایت بغلان
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="">
                    <Row></Row>
                    <Row>
                      <Colxx xxs="12" lg="8" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف 6: &nbsp; &nbsp; تعداد شاگردان به اساس
                          جدیدالشمولان
                        </CardSubtitle>

                        <CustomeBarChart
                          data={[30, 20, 40, 50, 60]}
                          labels={[10, 11, 12, 13, 14]}
                          backgroundColor={[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6333',
                            '#FF87EA',
                          ]}
                        />
                      </Colxx>

                      <Colxx xxs="12" lg="8" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف 6: &nbsp; &nbsp; تعداد شاگردان به اساس
                          جدیدالشمولان
                        </CardSubtitle>

                        <CustomGroupedBarChart
                          firstDataSet={[30, 20, 40, 50, 40]}
                          secondDataSet={[90, 50, 60, 10, 89]}
                          labels={[10, 11, 12, 13, 14]}
                          backgroundColor={[
                            '#FF6384',
                            '#36A2EB',
                            '#FF6384',
                            '#36A2EB',
                          ]}
                        />
                      </Colxx>
                    </Row>
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <ReactQuill
                    theme="snow"
                    value={studentsText}
                    onChange={(val) => setStudentsText(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      {/* Teachers */}
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle style={{ marginBottom: '2rem' }}>
                استادان در ولایت بغلان
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="">
                    <Row></Row>
                    <Row>
                      <Colxx xxs="12" lg="4" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۷: &nbsp; &nbsp; تعداد استادان به اساس جنسیت
                        </CardSubtitle>
                        <CustomePieChart
                          data={[90, 50]}
                          labels={['ذکور', 'اناث']}
                          backgroundColor={['#FF6384', '#36A2EB']}
                        />
                      </Colxx>
                      <Colxx xxs="12" lg="8" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۸: &nbsp; &nbsp; تعداد شاگردان به اساس درجه تحصیل
                        </CardSubtitle>

                        <CustomeBarChart
                          data={[30, 20, 40, 50]}
                          labels={['چهارده پاس', 'لیسانس', 'ماستر', 'دوکتور']}
                          backgroundColor={[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6333',
                          ]}
                        />
                      </Colxx>
                    </Row>
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <ReactQuill
                    theme="snow"
                    value={studentsText}
                    onChange={(val) => setStudentsText(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>

      {/* Buildings */}
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle style={{ marginBottom: '2rem' }}>
                تعمیر مراکز تعلمات تخنیکی و مسلکی در ولایت بغلان
              </CardTitle>
              <Row>
                <Colxx xxs="12" lg="12" className="mb-5">
                  <div className="">
                    <Row></Row>
                    <Row>
                      <Colxx xxs="12" lg="4" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۹: &nbsp; &nbsp; مراکز تخنیکی به اساس تعمیر
                        </CardSubtitle>
                        <CustomePieChart
                          data={[90, 50]}
                          labels={['تعمیر دارد', 'ندارد']}
                          backgroundColor={['#FF6384', '#36A2EB']}
                        />
                      </Colxx>
                      <Colxx xxs="12" lg="8" className="mb-5">
                        <CardSubtitle
                          style={{ fontWeight: 'bolder', fontSize: '18px' }}
                        >
                          گراف ۱۰: &nbsp; &nbsp; تعداد مراکز تخنیکی به تفکیک
                          وضعیت تعمیر
                        </CardSubtitle>

                        <CustomeBarChart
                          data={[30, 20, 40, 50, 0, 0, 0]}
                          labels={[
                            'ملکیت تعلمات تخنیکی',
                            'مشترک تعلمات تخنیکی',
                            'تعلمات عمومی',
                            'تعلمات اسلامی',
                            'کرایی',
                            'کمک اداره های دولتی',
                          ]}
                          backgroundColor={[
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#FF6333',
                            '#FF87EA',
                            '#89CDEE',
                          ]}
                        />
                      </Colxx>
                    </Row>
                  </div>
                </Colxx>
                <Colxx xxs="12">
                  <ReactQuill
                    theme="snow"
                    value={studentsText}
                    onChange={(val) => setStudentsText(val)}
                    modules={quillModules}
                    formats={quillFormats}
                  />
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default Reports;
