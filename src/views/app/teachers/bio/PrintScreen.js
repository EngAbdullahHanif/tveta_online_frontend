import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import callApi from 'helpers/callApi';
import { AuthContext } from 'context/AuthContext';
import { Label } from 'reactstrap';

import {
  contractTypeOptions,
  genderOptions,
  gradeOptions,
  jobTypeOptions,
  langOptions,
  outcomeOptions,
  stepOptions,
} from '../../global-data/options';
import logo from './../../../../assets/logos/AdminLogo.png';
import profilePhoto from './../../../../assets/img/profiles/user.png';

import IntlMessages from 'helpers/IntlMessages';

import config from '../../../../config';

import { inputLabel } from 'config/styling';
const servicePath = config.API_URL;
const teacherEvaluationApiUrl = `${servicePath}/teachers/evaluation`;
const teacherTransferApiUrl = `${servicePath}/teachers/institute`;
// const { RangePicker } = DatePicker;

const PrintScreen = () => {
  const { institutes, provinces, districts } = useContext(AuthContext);
  console.log('INSTITUTES: ', institutes);
  const [isNext, setIsNext] = useState(true);
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState([]);
  const [teacherEvaluation, setTeacherEvaluation] = useState([]);
  const [teacherHREvaluation, setTeacherHREvaluation] = useState([]);
  const [teacherTransfer, setTeacherTransfer] = useState([]);
  const [teacherEducation, setTeacherEducation] = useState([]);
  const [teacherContracts, setTeacherContracts] = useState([]);
  const [teacherIncentives, setTeacherIncentives] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function fetchTeacher() {
    const response = await callApi(`teachers/${teacherId}`, '', null);
    const data = response.data;
    setTeacher(data);
    setIsLoaded(true);
  }
  async function fetchTeacherEvaluation() {
    setLoading(true);
    const response = await callApi(
      `evaluations/teaching-process/?teacher=${teacherId}`,
    );
    setLoading(false);
    if (response.data && response.status === 200) {
      setTeacherEvaluation(response?.data.results);
      setIsLoaded(true);
    } else {
      console.log('students error');
    }
  }
  async function fetchTeacherHREvaluation() {
    await callApi(`evaluations/public-service/?employee=${teacherId}`).then(
      (response) => {
        setTeacherHREvaluation(response?.data.results);
        console.log('HR Evaluations: ', response?.data.results);
      },
    );
  }
  async function fetchTeacherTransfer() {
    try {
      const response = await callApi(
        `teachers/institute/?teacher_id=${teacherId}`,
        '',
        null,
      );
      const data = response.data;
      console.log(`${teacherTransferApiUrl}/?teacher_id=${teacherId}`);
      setTeacherTransfer(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchTeacherEducation() {
    const response = await callApi(
      `teachers/${teacherId}/educations`,
      '',
      null,
    );

    const data = response.data;
    console.log('Teacher Educations: ', data);
    setTeacherEducation(data);
  }
  async function fetchTeacherContracts() {
    const response = await callApi(
      `teachers/${teacherId}/contracts/`,
      '',
      null,
    );

    const data = response.data;
    console.log('Teacher Contracts: ', data);
    setTeacherContracts(data);
  }
  async function fetchTeacherIncentives() {
    const response = await callApi(
      `teachers/${teacherId}/feedbacks/`,
      '',
      null,
    );

    const data = response.data;
    console.log('Teacher Contracts: ', data);
    setTeacherIncentives(data);
  }

  async function fetchData() {
    await fetchTeacher();
    await fetchTeacherEvaluation();
    await fetchTeacherHREvaluation();
    await fetchTeacherTransfer();
    await fetchTeacherEducation();
    await fetchTeacherContracts();
    await fetchTeacherIncentives();
    printScreen();
  }
  const printScreen = () => {
    window.print();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 className="titleStyle">
            {<IntlMessages id="student.Profile" />}
          </h2>
        </div>
        <div>
          <img src={logo} alt="Logo" width={'30%'} />
          <p>د تخنیکی او مسلکی زده کړو اداره اداره تعلیمات تخنیکی و مسلکی</p>
        </div>
      </div>

      <img src={teacher?.photo || profilePhoto} alt="Photo" width={'10%'} />

      {teacher && (
        <>
          {isNext ? (
            <>
              <h2
                className="bg-primary "
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
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.NameLabel" />
                  </Label>
                  <h2>{teacher.name}</h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.FatherNameLabel" />
                  </Label>
                  <h2>{teacher.father_name}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.GrandFatherNameLabel" />
                  </Label>
                  <h2>{teacher.father_name}</h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="gender.gender" />
                  </Label>
                  <h2>
                    {
                      genderOptions.find((op) => op.value === teacher.gender)
                        ?.label
                    }
                  </h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.PhoneNoLabel" />
                  </Label>
                  <h2>{teacher.phone_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.EmailLabel" />
                  </Label>
                  <h2>{teacher.email}</h2>
                </div>
                <div>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdTazkiraNoLabel" />
                  </Label>
                  <h2>{teacher.registration_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdIdCardCoverLabel" />
                  </Label>
                  <h2>{teacher.cover_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdIdCardPageNoLabel" />
                  </Label>
                  <h2>{teacher.page_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdDoBLabel" />
                  </Label>
                  <h2>
                    {teacher.year_of_birth}-{teacher.month_of_birth || 'میاشت'}-
                    {teacher.day_of_birth || 'ورځ'}
                  </h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.EducationLevelLabel" />
                  </Label>
                  <h2>ماستر</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.MajorLabel" />
                  </Label>
                  <h2>Mechannical Engineering</h2>
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

                  <Label style={inputLabel}>
                    <IntlMessages id="forms.ProvinceLabel" />
                  </Label>
                  <h2>
                    {provinces.map((pro) => {
                      if (teacher.main_province === pro.value) return pro.label;
                    })}
                  </h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="forms.DistrictLabel" />
                  </Label>
                  <h2>
                    {districts.map((pro) => {
                      if (teacher.main_district === pro.value) return pro.label;
                    })}
                  </h2>
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
                    <IntlMessages id="forms.CurrentAddresslabel" />
                  </h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="forms.ProvinceLabel" />
                  </Label>
                  <h2>
                    {provinces.map((pro) => {
                      if (teacher.current_province === pro.value)
                        return pro.label;
                    })}
                  </h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="forms.DistrictLabel" />
                  </Label>
                  <h2>
                    {districts.map((pro) => {
                      if (teacher.current_district === pro.value)
                        return pro.label;
                    })}
                  </h2>
                </div>
              </div>

              <h2
                className="bg-primary "
                style={{
                  padding: '8px',
                  paddingInline: '30px',
                  borderRadius: '10px',
                }}
              >
                تحصیلات
              </h2>
              {teacherEducation.length > 0 ? (
                <table
                  className="table table-striped  table-lg"
                  style={{ fontSize: 18 }}
                >
                  <thead>
                    <tr>
                      <th scope="col">آیدی</th>
                      <th scope="col">پوهنتون/مرجع</th>
                      <th scope="col">درجه تحصیلی</th>
                      <th scope="col">رشته</th>
                      <th scope="col">د فراغت کال/سال فراغت</th>
                      <th scope="col">آسناد/ سی وی</th>
                      <th scope="col">توضیحات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherEducation.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.institution}</td>
                          <td>{item.degree}</td>
                          <td>{item.field_of_study}</td>
                          <td>{item.year_completed}</td>
                          <td>
                            <a
                              href={item.document}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Download
                            </a>
                          </td>
                          <td>{item.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h2>تحصیل ندارد</h2>
              )}

              {/* Education Details End */}
              {/* Contract Details Start */}

              <h2
                className="bg-primary "
                style={{
                  padding: '8px',
                  paddingInline: '30px',
                  borderRadius: '10px',
                }}
              >
                <IntlMessages id="قرارداد" />
              </h2>
              {teacherContracts.length > 0 ? (
                <>
                  <table
                    className="table table-striped table-lg"
                    style={{ fontSize: 18 }}
                  >
                    <thead>
                      <tr>
                        <th scope="col">آیدی</th>
                        <th scope="col">نوع قرارداد/ قرارداد ډول</th>
                        <th scope="col">بست</th>
                        <th scope="col">قدم</th>
                        <th scope="col">نوع وظیفه</th>
                        <th scope="col">زبان</th>
                        <th scope="col">مدت قرارداد</th>
                        <th scope="col">آسناد</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teacherContracts.map((item, index) => {
                        return (
                          <tr>
                            <th scope="row">{item.id}</th>
                            <td>
                              {contractTypeOptions.map((inst) => {
                                if (inst.value === item.contract_type)
                                  return (
                                    <IntlMessages id={inst.label.props.id} />
                                  );
                              })}
                            </td>
                            <td>
                              {gradeOptions.map((inst) => {
                                if (inst.value === item.grade)
                                  return (
                                    <IntlMessages id={inst.label.props.id} />
                                  );
                              })}
                            </td>
                            <td>
                              {stepOptions.map((inst) => {
                                if (inst.value === item.step)
                                  return (
                                    <IntlMessages id={inst.label.props.id} />
                                  );
                              })}
                            </td>
                            <td>
                              {jobTypeOptions.map((inst) => {
                                if (inst.value === item.job_type)
                                  return inst.label;
                              })}
                            </td>
                            <td>
                              {langOptions.map((inst) => {
                                if (inst.value === item.teaching_language)
                                  return (
                                    <IntlMessages id={inst.label.props.id} />
                                  );
                              })}
                            </td>
                            <td>
                              {item.start_date}-{item.end_date}
                            </td>
                            <td>
                              <a
                                href={item.document}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                ډاونلوډ
                              </a>
                            </td>
                            <td>{item.description}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </>
              ) : (
                <h2>قرارداد ندارد</h2>
              )}

              <h2
                className="bg-primary "
                style={{
                  padding: '8px',
                  paddingInline: '30px',
                  borderRadius: '10px',
                }}
              >
                <IntlMessages id="ارزیابی" />
              </h2>
              {teacherEvaluation.length > 0 ? (
                <table
                  className="table table-striped table-lg"
                  style={{ fontSize: 18 }}
                >
                  <thead>
                    <tr>
                      <th scope="col">آیدی</th>
                      <th scope="col">ارزوونکی / ارزیابی کننده</th>
                      <th scope="col">نېټه/ تاریخ </th>
                      <th scope="col">انسستیوت</th>
                      <th scope="col">سمستر</th>
                      <th scope="col">مضمون</th>
                      <th scope="col">اعلی</th>
                      <th scope="col">عالی</th>
                      <th scope="col">خوب</th>
                      <th scope="col">متوسط</th>
                      <th scope="col">ضعیف</th>
                      <th scope="col">موجود نیست</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherEvaluation.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.evaluator_name}</td>
                          <td>{item.date}</td>
                          <td>
                            {
                              institutes.find(
                                (op) => op.value === item.institute,
                              )?.label
                            }
                          </td>
                          <td>{item.semester}</td>
                          <td>{item.subject}</td>
                          <td>{item.outstanding}</td>
                          <td>{item.excellent}</td>
                          <td>{item.good}</td>
                          <td>{item.average}</td>
                          <td>{item.weak}</td>
                          <td>{item.not_applicable}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h2>ارزیابی ندارد</h2>
              )}

              <h2
                className="bg-primary "
                style={{
                  padding: '8px',
                  paddingInline: '30px',
                  borderRadius: '10px',
                }}
              >
                <IntlMessages id="ارزیابی منابع بشری" />
              </h2>
              {teacherHREvaluation.length > 0 ? (
                <table
                  className="table table-striped table-lg"
                  style={{ fontSize: 18 }}
                >
                  <thead>
                    <tr>
                      <th scope="col">آیدی</th>
                      <th scope="col">عنوان</th>
                      <th scope="col">تاریخ ارزیابی نېټه</th>
                      <th scope="col">انسستتیوت</th>
                      <th scope="col">نمره خود</th>
                      <th scope="col">نمره امر </th>
                      <th scope="col">نمره امر مافوق</th>
                      <th scope="col"> ارزیابی نتیجه</th>
                      <th scope="col">بست</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherHREvaluation.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{item.id}</th>
                          <td>{item.title}</td>
                          <td>{item.evaluation_date}</td>
                          <td>
                            {
                              institutes.find(
                                (op) => op.value === item.institute,
                              )?.label
                            }
                          </td>
                          <td>{item.self_total_score}</td>
                          <td>{item.upper_director_score}</td>
                          <td>{item.director_total_score}</td>
                          <td>
                            {
                              outcomeOptions.find(
                                (op) => op.value === item.evaluation_outcome,
                              )?.label
                            }
                          </td>
                          <td>{item.step}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h2>ارزیابی منابع بشری ندارد</h2>
              )}

              <h2
                className="bg-primary "
                style={{
                  padding: '8px',
                  paddingInline: '30px',
                  borderRadius: '10px',
                }}
              >
                <IntlMessages id="مکافات" />
              </h2>
              {teacherIncentives.length > 0 ? (
                <table
                  className="table table-striped table-lg"
                  style={{ fontSize: 18 }}
                >
                  <thead>
                    <tr>
                      <th scope="col">آیدی</th>
                      <th scope="col">استاد/معلم</th>
                      <th scope="col">انستتیوت</th>
                      <th scope="col">نوع</th>
                      <th scope="col">توضیحات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacherIncentives.map((item, index) => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">{item.id}</th>
                          <td>{item.teacher}</td>
                          <td>{item.institute}</td>
                          <td>{item.type}</td>
                          <td>{item.details}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h2>مکافات ندارد</h2>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default PrintScreen;
