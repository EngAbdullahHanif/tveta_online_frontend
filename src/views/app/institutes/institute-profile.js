import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/institute-teachers-students-statistics`;

const InstituteDetails = (values) => {
  const [isNext, setIsNext] = useState(true);
  // const { instituteId } = useParams();
  const instituteId = 1;
  const [institute, setInstitute] = useState([]);
  const [instituteStatistics, setInstituteStatistics] = useState([]);

  useEffect(() => {
    async function fetchDrom() {
      const response = await axios.get(
        `${instituteApiUrl}?institute_id=${instituteId}`
      );
      const data = await response.data;
      setInstitute(data);

      const instituteStatistics = await axios.get(
        `${instituteApiUrl}?institute_id=${instituteId}`
      );
      const instituteStatisticsData = await instituteStatistics.data;
      setInstituteStatistics(instituteStatisticsData);
      console.log('institute', instituteStatisticsData);
    }
    fetchDrom();
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
                  <Colxx>کمپیوتر ساینس</Colxx>

                  <Colxx>برق</Colxx>
                  <Colxx>میخانیک</Colxx>
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
