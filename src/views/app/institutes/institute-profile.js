import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
  Input,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import config from '../../../config';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const servicePath = config.API_URL;
const instituteApiUrl = `${servicePath}/institute/institute-teachers-students-statistics`;

const InstituteDetails = (values) => {
  const [isNext, setIsNext] = useState(true);
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState([]);
  const [instituteStatistics, setInstituteStatistics] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    if (!instituteId) {
      return;
    }
    const response = await callApi(
      `institute/institite-department/?institute=${instituteId}`,
      '',
      null
    );
    // console.log('response of department', response);
    if (response.data && response.status === 200) {
      console.log('instituteId', instituteId);
      console.log('response of department', response);
      setDepartments(response.data);
    } else {
      console.log('department error');
    }
  };
  useEffect(() => {
    async function fetchInstituteInformation() {
      const instituteResponse = await callApi(
        `institute/?institute=${instituteId}`,
        '',
        null
      );
      if (instituteResponse.data && instituteResponse.status === 200) {
        const instituteData = await instituteResponse.data;
        console.log('instituteData', instituteData);
        setInstitute(instituteData);
      }

      const instituteStatisticsResponse = await callApi(
        `institute/institute-teachers-students-statistics/?institute=${instituteId}`,
        '',
        null
      );
      if (
        instituteStatisticsResponse.data &&
        instituteStatisticsResponse.status === 200
      ) {
        const instituteStatisticsData = await instituteStatisticsResponse.data;
        console.log('instituteStatisticsData', instituteStatisticsData);
        setInstituteStatistics(instituteStatisticsData);
      }
    }

    fetchDepartments();
    fetchInstituteInformation();
  }, []);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  return (
    <>
      <h2 className="mt-5 m-3">
        {<IntlMessages id="institute.detailsTitle" />}
      </h2>

      <Separator className="mb-5" />
      {instituteStatistics.length > 0 && (
        <Row>
          <Colxx xxs="6" sm="4" md="3" className="mb-4">
            <Card>
              <CardBody className="text-center">
                <b>
                  <p>
                    <IntlMessages id="institute.totalStudents" />
                  </p>
                </b>
                <Row className="">
                  <Colxx>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                    <p>{instituteStatistics[0].total_male_students}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics[0].total_female_students}</p>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="6" sm="4" md="3" className="mb-4">
            <Card>
              <CardBody className="text-center">
                <b>
                  <p>
                    <IntlMessages id="institute.totalTeachers" />
                  </p>
                </b>
                <Row className="">
                  <Colxx>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                    <p>{instituteStatistics[0].male_teachers}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics[0].female_teachers}</p>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="6" sm="4" md="3" className="mb-4">
            <Card>
              <CardBody className="text-center">
                <b>
                  <p>
                    <IntlMessages id="institute.Greduated_12" />
                  </p>
                </b>
                <Row className="">
                  <Colxx>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                    <p>{instituteStatistics[0].male_students_12}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics[0].female_students_12}</p>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="6" sm="4" md="3" className="mb-4">
            <Card>
              <CardBody className="text-center">
                <b>
                  <p>
                    <IntlMessages id="institute.Greduated_14" />
                  </p>
                </b>
                <Row className="">
                  <Colxx>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                    <p>{instituteStatistics[0].male_students_14}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics[0].female_students_14}</p>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>

          <Colxx xxs="6" sm="4" md="3" className="mb-4">
            <Card>
              <CardBody className="text-center">
                <b>
                  <p>
                    <IntlMessages id="institute.totalDepartments" />
                  </p>
                </b>
                <Row className="d-block">
                  {departments &&
                    departments.map((item) => {
                      return (
                        <Colxx key={item.id}>{item.department.name}</Colxx>
                      );
                    })}
                  {/* // <Colxx>کمپیوتر ساینس</Colxx>

                  // <Colxx>برق</Colxx>
                  // <Colxx>میخانیک</Colxx> */}
                </Row>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default InstituteDetails;
