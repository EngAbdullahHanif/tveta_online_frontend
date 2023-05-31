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
  const { kankorId } = useParams();
  const [isNext, setIsNext] = useState(true);
  const [student, setStudent] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); //classs is used because class is a reserved word
  const [kankorStudent, setKankorStudent] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //load data of student from database
  useEffect(() => {
    console.log('id', kankorId);
    async function fetchData() {
      const response = await callApi(
        `api/kankorResults/?id=${kankorId}`,
        'GET',
        null
      );
      if (response.data && response.status === 200) {
        setKankorStudent(response.data);
        console.log('RespOnseData', response.data);
        setSelectedItems([]);
        // setTotalItemCount(data);
      } else {
        console.log('Kankor students error');
      }
    }
    fetchData();
  }, []);

  console.log('KankorStudent', kankorStudent[0]);
  // Destructuring the kankor student field, institute, and department names.
  let field_name, institute_name, department_name;
  if (kankorStudent[0]) {
    const { name: fieldName } = kankorStudent[0].field_id;
    const { name: instituteName } = kankorStudent[0].Institute;
    const { name: departmentName } = kankorStudent[0].department_id;
    field_name = fieldName;
    institute_name = instituteName;
    department_name = departmentName;
  }

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
      <>
        {kankorStudent.length > 0 ? (
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
                    <h2>{kankorStudent[0].name}</h2>
                    <Label className="data-style">
                      <IntlMessages id="teacher.FatherNameLabel" />
                    </Label>
                    <h2>{kankorStudent[0].father_name}</h2>

                    <Label className="data-style">
                      <IntlMessages id="dash.teacherGender" />
                    </Label>
                    {kankorStudent[0].gender === '1' ? (
                      <h2>
                        {' '}
                        <IntlMessages id="institute.totalStudentsMale" />
                      </h2>
                    ) : (
                      <IntlMessages id="institute.totalStudentsFemale" />
                    )}
                    <Label className="data-style">
                      <IntlMessages id="forms.KankorMarksLabel" />
                    </Label>
                    <h2>{kankorStudent[0].score}</h2>

                    <Label className="data-style">
                      <IntlMessages id="forms.InstituteLabel" />
                    </Label>
                    <h2>{institute_name}</h2>

                    <Label className="data-style">
                      <IntlMessages id="department.field" />
                    </Label>
                    <h2>{field_name}</h2>

                    <br />
                    <br />
                  </Colxx>
                  <Colxx style={{ paddingInline: '4%' }}>
                    <Label className="data-style">
                      <IntlMessages id="curriculum.eduactionalYearLabel" />
                    </Label>
                    <h2>{kankorStudent[0].educational_year}</h2>
                    <Label className="data-style">
                      <IntlMessages id="forms.StudyTimeLabel" />
                    </Label>
                    {kankorStudent[0].shift === '1' ? (
                      <h2>
                        {' '}
                        <IntlMessages id="forms.StudyTimeOption_1" />{' '}
                      </h2>
                    ) : (
                      <h2>
                        {' '}
                        <IntlMessages id="forms.StudyTimeOption_2" />{' '}
                      </h2>
                    )}
                    <Label className="data-style">
                      <IntlMessages id="forms.studyDepartment" />
                    </Label>
                    <h2>{department_name}</h2>
                    <Label className="data-style">
                      <IntlMessages id="forms.ProvinceLabel" />
                    </Label>
                    <h2>{kankorStudent[0].provence} </h2>
                    <Label className="data-style">
                      <IntlMessages id="forms.DistrictLabel" />
                    </Label>
                    <h2>{kankorStudent[0].district}</h2>
                    <br />
                    <br />
                  </Colxx>
                </Row>
              </div>
            </CardBody>
          </Card>
        ) : (
          'No Data Available'
        )}
      </>
    </>
  );
};

export default StudentProfile;
