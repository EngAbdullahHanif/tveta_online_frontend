import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import './../../../../assets/css/global-style.css';
import { Row, Card, CardBody, Label, Input } from 'reactstrap';
import Select from 'react-select';
import logo from './../../../../assets/logos/AdminLogo.png';
import profilePhoto from './../../../../assets/img/profiles/22.jpg';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
const servicePath = 'http://localhost:8000';
const studentApiUrl = `${servicePath}/api/`;

const StudentProfile = () => {
  const { studentId } = useParams();
  const [isNext, setIsNext] = useState(true);
  const [student, setStudent] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [classs, setClasss] = useState([]); //classs is used because class is a reserved word
  const [dorm, setDorm] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //load data of student from database
  useEffect(() => {
    async function fetchStudent() {
      // const response = await axios.get(
      //   `${studentApiUrl}?student_id=${studentId}`
      // );
      const response = await callApi(`api/?student_id=${studentId}`, '', null);
      const data = await response.data;
      setStudent(data.results);
      setIsLoaded(true);

      console.log('studentsdf', student);
      // const instituteResponse = await axios.get(
      //   `${studentApiUrl}student_institutes/?student_id=${studentId}`
      // );
      const instituteResponse = await callApi(
        `api/student_institutes/?student_id=${studentId}`,
        '',
        null
      );

      const instituteData = await instituteResponse.data;
      console.log('instituteData', instituteData);
      setInstitute(instituteData);

      //type =1 means current class or current continued class
      // const classResponse = await axios.get(
      //   `${studentApiUrl}student_class/?student_id=${studentId}&type=1`
      // );
      const classResponse = await callApi(
        `api/student_class/?student_id=${studentId}&type=1`,
        '',
        null
      );

      const classData = await classResponse.data;
      setClasss(classData);

      // const dormResponse = await axios.get(
      //   `${studentApiUrl}student_dorms/?student_id=${studentId}`
      // );
      const dormResponse = await callApi(
        `api/student_dorms/?student_id=${studentId}`,
        '',
        null
      );

      const dormData = await dormResponse.data;
      setDorm(dormData);

      const marksResponse = await callApi(
        `api/TranscriptData/?student_id=${studentId}`,
        '',
        null
      );

      console.log(`${studentApiUrl}TranscriptData/?student_id=${studentId}`);
      const marksData = await marksResponse.data;
      console.log('marksData', marksData);
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
      <Row className="position-static">
        <Colxx className="mt-5 m-5" xxs="8">
          <h1>{<IntlMessages id="student.kankorProfile" />}</h1>
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
      {!isLoaded ? (
        <div className="loading" />
      ) : (
        <div>
          <Row>
            <Colxx xxs="1"></Colxx>
            {student.length > 0 && (
              <Colxx>
                <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
              </Colxx>
            )}
          </Row>
        </div>
      )}
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
                      paddingInline: '40px',
                      borderRadius: '10px',
                      fontSize: '250%',
                      fontWeight: 'bold',
                    }}
                  >
                    {' '}
                    <IntlMessages id="forms.kankorInfo" />
                  </h2>
                </Colxx>
              </Row>
              <Row className="justify-content-center   rounded ">
                <Colxx style={{ paddingInline: '4%' }} xxs="">
                  <Label className="data-style">
                    <IntlMessages id="teacher.NameLabel" />
                  </Label>
                  <h2>Arshad Rahman</h2>
                  <Label className="data-style">
                    <IntlMessages id="teacher.FatherNameLabel" />
                  </Label>
                  <h2> Abdul Wakil</h2>

                  <Label className="data-style">
                    <IntlMessages id="dash.teacherGender" />
                  </Label>
                  <h2> Male</h2>

                  <Label className="data-style">
                    <IntlMessages id="forms.KankorMarksLabel" />
                  </Label>
                  <h2>78</h2>

                  <Label className="data-style">
                    <IntlMessages id="forms.InstituteLabel" />
                  </Label>
                  <h2>ATVI</h2>

                  <Label className="data-style">
                    <IntlMessages id="department.field" />
                  </Label>
                  <h2>Coputer Science</h2>

                  <br />
                  <br />
                </Colxx>
                <Colxx style={{ paddingInline: '4%' }}>
                  <Label className="data-style">
                    <IntlMessages id="curriculum.eduactionalYearLabel" />
                  </Label>
                  <h2>1403</h2>
                  <Label className="data-style">
                    <IntlMessages id="forms.StudyTimeLabel" />
                  </Label>
                  <h2>Morning Shift</h2>
                  <Label className="data-style">
                    <IntlMessages id="forms.studyDepartment" />
                  </Label>
                  <h2>Database</h2>
                  <Label className="data-style">
                    <IntlMessages id="forms.ProvinceLabel" />
                  </Label>
                  <h2>کابل </h2>
                  <Label className="data-style">
                    <IntlMessages id="forms.DistrictLabel" />
                  </Label>
                  <h2>7th District</h2>
                  <br />
                  <br />
                </Colxx>
              </Row>
            </div>
          </CardBody>
        </Card>
      </>
    </>
  );
};

export default StudentProfile;
