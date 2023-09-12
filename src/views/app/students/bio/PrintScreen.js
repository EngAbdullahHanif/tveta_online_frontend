import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';

import './../../.././../assets/css/global-style.css';
import './../../.././../assets/css/print.css';
import profilePhoto from './../../../../assets/img/profiles/user.png';

import {
  Label,
  Badge,
  // NavLink,
} from 'reactstrap';
import logo from './../../../../assets/logos/AdminLogo.png';

import IntlMessages from 'helpers/IntlMessages';
import { Separator } from 'components/common/CustomBootstrap';
import config from '../../../../config';

import { AuthContext } from 'context/AuthContext';
import {
  studentStatusOptions,
  studyTimeOptions,
} from 'views/app/global-data/options';
// import { BsPencilSquare } from 'react-icons/bs';

const servicePath = config.API_URL;
const studentApiUrl = `${servicePath}/api/`;

const PrintScreen = () => {
  const { institutes, provinces, districts, departments, classes } =
    useContext(AuthContext);
  const { studentId } = useParams();
  const [isNext, setIsNext] = useState(true);
  const [student, setStudent] = useState([]);
  const [dorm, setDorm] = useState([]);
  const [marks, setMarks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);

  async function fetchStudentEnrollment() {
    const { data } = await callApi(
      `students/${studentId}/institute/`,
      '',
      null,
    );
    setStudentEnrollmentData(data);
    window.print();
  }

  const provincesList = {};
  const districtsList = {};

  provinces.forEach((province) => {
    provincesList[province.value] = province.label;
  });

  districts.forEach((districts) => {
    districtsList[districts.value] = districts.label;
  });

  let recId;

  async function fetchStudent() {
    try {
      const response = await callApi(`students/${studentId}/`, '', null);

      if (response.data && response.status === 200) {
        const data = await response.data;
        setStudent([data]);
        fetchStudentEnrollment();
        setIsLoaded(true);
      }

      const dormResponse = await callApi(
        `students/student_dorms/?student=${studentId}`,
        '',
        null,
      );
      if (dormResponse.data && dormResponse.status === 200) {
        const dormData = await dormResponse.data;
        setDorm(dormData);
      }

      const marksResponse = await callApi(
        `students/TranscriptData/?student=${studentId}`,
        '',
        null,
      );
      if (marksResponse.data && marksResponse.status === 200) {
        const marksData = await marksResponse.data;
        setMarks(marksData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStudent();
  }, []);

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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className=" ml-5">
          <h2 className=" mt-3 titleStyle">
            {<IntlMessages id="student.Profile" />}
          </h2>
        </div>
        <div className=" align-items-center flex-column ">
          <img src={logo} alt="Logo" width={'30%'} />
          <p>
            د تخنیکی او مسلکی زده کړو اداره
            <br />
            اداره تعلیمات تخنیکی و مسلکی
          </p>
        </div>
      </div>
      {!isLoaded ? (
        <div className="loading" />
      ) : (
        <div>
          {student.length > 0 && (
            <a
              href={student[0].photo}
              className="w-40 w-sm-100"
              target="_blank"
              rel="noreferrer"
            >
              <img
                top
                alt={student[0].name}
                src={student[0].photo || profilePhoto}
                style={{
                  maxWidth: '12%',
                  maxHeight: '130%',
                  borderRadius: '5px',
                }}
              />
            </a>
          )}
        </div>
      )}
      {/* if student is loaded show it, if not show empty  */}
      {student?.length > 0 && (
        <>
          <div id="student-info">
            <h2
              className="bg-primary data-style "
              style={{
                padding: '8px',
                paddingInline: '30px',
                borderRadius: '10px',
              }}
            >
              <IntlMessages id="forms.personalInfo" />
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Label className="data-style">"ایدی"</Label>
                <h2>
                  {student[0].student_id}{' '}
                  {
                    <Badge
                      color={
                        student[0].status == 'dismissed'
                          ? 'danger'
                          : student[0].status == 'inprogress'
                          ? 'success'
                          : student[0].status == 'active'
                          ? 'success'
                          : student[0].status == 'freeze'
                          ? 'secondary'
                          : 'warning'
                      }
                      pill
                    >
                      {
                        studentStatusOptions.find(
                          (op) => op.value === student[0].status,
                        )?.label
                      }
                    </Badge>
                  }
                </h2>
                <Label className="data-style">
                  <IntlMessages id="teacher.NameLabel" />
                </Label>
                <h2>
                  {student[0].name + '"' + ' ' + student[0].last_name + '"'}
                </h2>
                <Label className="data-style">
                  <IntlMessages id="forms.Eng_name" />
                </Label>
                <h2>
                  {`${student[0].english_name || '-'} ${
                    student[0].english_last_name || '-'
                  }`}
                </h2>
                <Label className="data-style">
                  <IntlMessages id="teacher.FatherNameLabel" />
                </Label>
                <h2>{student[0].father_name}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.Std_father_Eng_Name" />
                </Label>
                <h2>{student[0].english_father_name || '-'}</h2>
                <Label className="data-style">
                  <IntlMessages id="teacher.PhoneNoLabel" />
                </Label>
                <h2>{student[0].phone_number}</h2>
                <Label className="data-style">
                  <IntlMessages id="teacher.EmailLabel" />
                </Label>
                <h2>{student[0].email || '-'}</h2>
                {student[0].tazkira_type === 'electronic' && (
                  <>
                    <Label className="data-style">
                      <IntlMessages id="forms.electronicTazkiraLabel" />
                    </Label>
                    <h2>{student[0].registration_number}</h2>
                  </>
                )}
              </div>

              <div>
                <Label className="data-style">ایدی کانکور</Label>
                <h2>{student[0].kankor_id}</h2>
                {/* if person has paper-based ID card, not electronic */}
                {student[0].tazkira_type === 'paper' && (
                  <>
                    <Label className="data-style">
                      <IntlMessages id="forms.StdIdCardCoverLabel" />
                    </Label>
                    <h2>{student[0].cover_number}</h2>
                    <Label className="data-style">
                      <IntlMessages id="forms.StdIdCardPageNoLabel" />
                    </Label>
                    <h2>{student[0].page_number}</h2>
                    <Label className="data-style">
                      <IntlMessages id="forms.tazkiraSabt" />
                    </Label>
                    <h2>{student[0].sabt_number}</h2>
                    <Label className="data-style">
                      <IntlMessages id="forms.StdIdCardSakukNoLabel" />
                    </Label>
                    <h2>{student[0].sokok_number}</h2>
                  </>
                )}
                <Label className="data-style">
                  <IntlMessages id="forms.StdDoBLabel" />
                </Label>
                <h2>{student[0].year_of_birth}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.PlaceOfBirthLabel" />
                </Label>
                <h2>{student[0].place_of_birth}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.StdFatherDutyLabel" />
                </Label>
                <h2>{student[0].father_profession}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                </Label>
                <h2>{student[0].father_place_of_duty}</h2>
                <br />
                <br />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <h2
                  className="bg-primary "
                  style={{
                    padding: '8px',
                    paddingInline: '30px',
                    borderRadius: '10px',
                  }}
                >
                  <IntlMessages id="forms.PermanentAddressLabel" />
                </h2>
                <br />
                <Label className="data-style">
                  <IntlMessages id="forms.ProvinceLabel" />
                </Label>
                <h2>{provincesList[student[0].main_province]}</h2>{' '}
                <Label className="data-style">
                  <IntlMessages id="forms.DistrictLabel" />
                </Label>
                <h2>{districtsList[student[0].main_district]}</h2>{' '}
                <Label className="data-style">
                  <IntlMessages id="forms.VillageLabel" />
                </Label>
                <h2>{student[0].main_village}</h2>{' '}
              </div>
              <div>
                <h2
                  className="bg-primary "
                  style={{
                    padding: '8px',
                    paddingInline: '30px',
                    borderRadius: '10px',
                  }}
                >
                  {' '}
                  <IntlMessages id="forms.CurrentAddresslabel" />
                </h2>
                <Separator />
                <br />
                <Label className="data-style">
                  <IntlMessages id="forms.ProvinceLabel" />
                </Label>
                <h2>{provincesList[student[0].current_province]}</h2>{' '}
                <Label className="data-style">
                  <IntlMessages id="forms.DistrictLabel" />
                </Label>
                <h2>{districtsList[student[0].current_district]}</h2>{' '}
                <Label className="data-style">
                  <IntlMessages id="forms.VillageLabel" />
                </Label>
                <h2>{student[0].current_village}</h2>
              </div>
            </div>
            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <h2
                  className="bg-primary "
                  style={{
                    padding: '8px',
                    paddingInline: '30px',
                    borderRadius: '10px',
                  }}
                >
                  شمولیت معلومات
                </h2>

                <Label className="data-style">شمولیت کال</Label>
                <h2>{studentEnrollmentData.educational_year}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.StdInteranceTypeLabel" />
                </Label>
                {student.admission_method === 'decree' ? (
                  <h2>حکمی</h2>
                ) : student.internse_type === 'general_kankor' ? (
                  <h2>کانکور اختصاصی</h2>
                ) : (
                  <h2>کانکور عمومی</h2>
                )}
                <Label className="data-style">
                  <IntlMessages id="student.educationType" />
                </Label>
                {student.student_type === 'continuous' ? (
                  <h2>پیوسته</h2>
                ) : (
                  <h2>غیر پیوسته</h2>
                )}
                <br />
                <br />

                <Label className="data-style">
                  <IntlMessages id="menu.institutes" />
                </Label>
                <h2>
                  {
                    institutes.find(
                      (ins) => ins.value === studentEnrollmentData.institute,
                    )?.label
                  }
                </h2>
                <Label className="data-style">رشته</Label>
                <h2>
                  {
                    departments.find(
                      (d) => d.value === studentEnrollmentData.department,
                    )?.label
                  }
                </h2>
                <Label className="data-style">شفت/وخت</Label>
                <h2>
                  {
                    studyTimeOptions.find(
                      (d) => d.value === studentEnrollmentData.shift,
                    )?.label
                  }
                </h2>
                {/* <Label className="data-style">
                          <IntlMessages id="field.SemesterLabel" />
                        </Label>
                        <h2>{classs[0].classs.semester}</h2> */}
                <Label className="data-style">
                  <IntlMessages id="curriculum.classLabel" />
                </Label>
                <h2>
                  {
                    classes.find(
                      (c) => c.value === studentEnrollmentData.classs,
                    )?.label
                  }
                </h2>
                {dorm.length > 0 && (
                  <>
                    <Label className="data-style">
                      <IntlMessages id="menu.dorms" />
                    </Label>
                    <h2>{dorm[0].dorm.name}</h2>
                    <Label>نوعیت</Label>

                    {dorm.dorm_type == 1 ? (
                      <h2> بدل عاشه</h2>
                    ) : (
                      <h2> بدیل عاشه</h2>
                    )}
                  </>
                )}

                <br />
                <br />
              </div>

              <div>
                <h2
                  className="bg-primary "
                  style={{
                    padding: '8px',
                    paddingInline: '30px',
                    borderRadius: '10px',
                  }}
                >
                  {' '}
                  سوابق تعلیمی
                </h2>

                <Label className="data-style">
                  <IntlMessages id="forms.EducationLevelLabel" />
                </Label>
                <h2>{student[0].previous_grade}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.StdGraduationYearLabel" />
                </Label>
                <h2>{student[0].previous_grade_year}</h2>
                <Label className="data-style">
                  <IntlMessages id="forms.StPreShcoolLabel" />
                </Label>
                <h2>{student[0].previous_school_name || '-'}</h2>

                <Label className="data-style">
                  <IntlMessages id="students.previousProvince" />
                </Label>
                <h2>{provincesList[student[0].previous_school_province]}</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PrintScreen;
