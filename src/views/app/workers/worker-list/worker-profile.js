import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
//import CustomSelectInput from 'components/common/CustomSelectInput';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Table,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';
import Select from 'react-select';
//import logo from './../../../../assets/logos/AdminLogo.png';
import logo from '../../../../assets/logos/AdminLogo.png'
import profilePhoto from '../../../../assets/img/profiles/2.jpg';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import Classes from 'views/app/classes';
import { workerAppointedDate } from 'lang/locales/fa_IR';
const servicePath = 'http://localhost:8000';
const teacherApiUrl = `${servicePath}/teachers/`;
const teacherEvaluationApiUrl = `${servicePath}/teachers/evaluation`;
const teacherHREvaluationApiUrl = `${servicePath}/teachers/hr-evaluation`;
const teacherTransferApiUrl = `${servicePath}/teachers/institute`;
const roughInfo = 
{
  workerId : '1',
  workerName: "نعمان احمدی",
  workerProvince: 'ننگرهار',
  workerStep: '3',
  workerGrade: '4',
  workerGradeType: 'مامور',
  workerPosition: 'سیستم سازی',
  workerAppointedDate: '1401/3/6',
  workerStartDate: '1401/5/1',
  workerDateOfBirth: "1401/1/2",
  workerQualification: 'لسانس',
  workerField: 'سافتویز انجینری',
  workerGender: 'مرد',
  workerTazkera: '34534545',
  workerTashkilGrade: '3',
  workerAppointedType: 'حکمی'
 }
const TeacherProfile = () => {
  const [isNext, setIsNext] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState([]);
  const [institute, setInstitute] = useState([]);
  const [teacherEvaluation, setTeacherEvaluation] = useState([]);
  const [teacherHREvaluation, setTeacherHREvaluation] = useState([]);
  const [teacherTransfer, setTeacherTransfer] = useState([]);
  const [workerProfile, setWorkerProfile] = useState({}); 

  // here we are fetching data for the displaying the list
  useEffect(()=> {
   // const timeOut = setTimeout(SetRoughData, 3000);
   SetRoughData();
  },[]);

  function SetRoughData() {
    setWorkerProfile(roughInfo)
    setIsLoaded(false);
  }


  // useEffect(() => {
  //   async function fetchTeacher() {
  //     const response = await axios.get(`${teacherApiUrl}?id=${teacherId}`);
  //     const data = response.data;
  //     setTeacher(data);

  //     const instituteResponse = await axios.get(
  //       `${teacherApiUrl}institute/?teacher_id=${teacherId}`
  //     );
  //     const instituteData = await instituteResponse.data;
  //     setInstitute(instituteData);
  //   }
  //   async function fetchTeacherEvaluation() {
  //     console.log('data');
  //     const response = await axios.get(
  //       `${teacherEvaluationApiUrl}/?teacher_id=${teacherId}`
  //     );
  //     console.log(`${teacherEvaluationApiUrl}/?teacher_id=${teacherId}`);
  //     const data = response.data;
  //     setTeacherEvaluation(data);
  //   }
  //   async function fetchTeacherHREvaluation() {
  //     const response = await axios.get(
  //       `${teacherHREvaluationApiUrl}/?teacher_id=${teacherId}`
  //     );
  //     const data = response.data;
  //     setTeacherHREvaluation(data);
  //   }
  //   async function fetchTeacherTransfer() {
  //     const response = await axios.get(
  //       `${teacherTransferApiUrl}/?teacher_id=${teacherId}`
  //     );
  //     const data = response.data;
  //     console.log(`${teacherTransferApiUrl}/?teacher_id=${teacherId}`);
  //     setTeacherTransfer(data);
  //   }
  //   fetchTeacher();
  //   fetchTeacherEvaluation();
  //   fetchTeacherHREvaluation();
  //   fetchTeacherTransfer();
  // }, []);

  // console.log('teacher', teacher);
  // console.log('teacherEvaluation', teacherEvaluation);
  // console.log('teacherHREvaluation', teacherHREvaluation);
  // console.log('teacherTransfer', teacherTransfer);


  const handleClick = (event) => {
    setIsNext(event);
  };

  const style2 = {
    padding: '',
  };
  const style1 = {
    backgroungColor: 'blue',
  };

  return isLoaded ? (
    
      <div className="loading" />
    ) : (
      <>
      <Row>
        <Colxx className="mt-5 m-5" xxs="8">
          <h3>{<IntlMessages id="workerProfile" />}</h3>
        </Colxx>
        <Colxx className="mt-4 max">
          <div className="d-flex align-items-center flex-column">
            <img src={logo} alt="Logo" width={'30%'} />
            <p>
              د تخنیکی او مسلکی زده کړو اداره
              <br />
              اداره تعلیمات تخنیکی و مسلکی
            </p>
          </div>
        </Colxx>
      </Row>
{/* 
      <Row>
        <Colxx xxs="1"></Colxx>
        <Colxx>
          <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
        </Colxx>
      </Row> */}
      {workerProfile != null  ? (
      <div>
      <Row >
        <table className="table">
          <thead 
            className="pl-2 d-flex flex-grow-1  table-dark"
            style={{ maxHeight: '55px', marginRight: 2, width: '100%', marginBottom: 20 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="workerId" />
              </th>
              <th
                style={{
                  width: '14%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="workerName" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="workerAppointedType" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerQualification" />
              </th>
              <th
                style={{
                  width: '14%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerField" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerGender" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerTazkera" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerDateOfBirth" />
              </th>
            
            </tr>
          </thead>
          
               
        </table>
      </Row>
       <Row>
      <table className="table">
          <thead 
            className="pl-2 d-flex flex-grow-1  table-light"
            style={{ maxHeight: '55px', marginRight: 2, width: '100%', marginBottom: 20 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {workerProfile.workerId}
              </th>
              <th
                style={{
                  width: '14%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {workerProfile.workerName}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                 {workerProfile.workerGradeType}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerQualification}
              </th>
              <th
                style={{
                  width: '14%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerField}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerGender}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerTazkera}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerDateOfBirth}
              </th>
            
            </tr>
          </thead>
          
               
        </table>

      </Row>
      <Row >
        <table className="table">
          <thead 
            className="pl-2 d-flex flex-grow-1  table-dark"
            style={{ maxHeight: '55px', marginRight: 2, width: '100%', marginBottom: 20 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="workerPosition" />
              </th>
              <th
                style={{
                  width: '14%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="workerStep" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="workerGrade" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerTashkeilGrade" />
              </th>
              <th
                style={{
                  width: '14%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerGradeType" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerAppointedDate" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerStartDate" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="workerProvince" />
              </th>
            
            </tr>
          </thead>
          
               
        </table>
      </Row>
      <Row>
      <table className="table">
          <thead 
            className="pl-2 d-flex flex-grow-1  table-light"
            style={{ maxHeight: '55px', marginRight: 2, width: '100%', marginBottom: 20 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {workerProfile.workerPosition}
              </th>
              <th
                style={{
                  width: '14%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {workerProfile.workerStep}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                 {workerProfile.workerGrade}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerTashkilGrade}
              </th>
              <th
                style={{
                  width: '14%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerGradeType}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerAppointedDate}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerStartDate}
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                {workerProfile.workerProvince}
              </th>
            
            </tr>
          </thead>
          
               
        </table>
      </Row>
      </div>
      ) : <div>No data</div>
      }
      </>
    )
};

export default TeacherProfile;
