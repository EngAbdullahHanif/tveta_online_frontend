import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import './provincail-dashboard.css';
import Calendar from 'containers/dashboards/Calendar';

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
import { useEffect } from 'react';

const ProvincailDashboard = (values) => {
  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  return (
    <>
      <h1 className="mt-5 m-1">{<IntlMessages id="dashboard.provincail" />}</h1>
      <Separator className="mb-5" />

      <Row>
        <Colxx xxs="12" sm="4" md="3" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '10%' }} id="divId">
            <CardBody className="text-center">
              <CardTitle>
                <IntlMessages id="dash.totalStatistics" />
              </CardTitle>
              <Colxx>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfInstitute" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>5000</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfSchool" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>500</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfDorms" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>13</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.totalNumberOfTeachers" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>90</p>
                </div>
              </Colxx>
            </CardBody>
          </Card>
          <Card style={{ minHeight: '180px' }} id="divId">
            <CardBody className="text-center">
              <CardTitle>
                <IntlMessages id="dash.totalStudentsInst" />
              </CardTitle>
              <Row className="m-2 ">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>5000</p>
                </Colxx>
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>5000</p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="12" sm="4" md="3" className="mb-4  ">
          <Card style={{ minHeight: '180px', marginBottom: '10%' }} id="divId">
            <CardBody className="text-center">
              <CardTitle>
                <IntlMessages id="dash.totalStudentsDorm" />
              </CardTitle>

              <Colxx style={{ marginRight: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>5000</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>500</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_1" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>3200</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="dash.DormStudentType_2" />
                    </b>
                  </p>
                  <p style={{ marginRight: '10%' }}>1800</p>
                </div>
              </Colxx>
            </CardBody>
          </Card>
          <Card style={{ minHeight: '180px' }} id="divId">
            <CardBody className="text-center">
              <CardTitle>
                {' '}
                <IntlMessages id="dash.totalStudentsScool" />
              </CardTitle>

              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                ></p>
              </b>
              <Row className="m-2 ">
                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsMale" />
                    </b>
                  </p>
                  <p>5000</p>
                </Colxx>

                <Colxx>
                  <p>
                    <b>
                      {' '}
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                  </p>
                  <p>5000</p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar />
        </Colxx>
      </Row>

      <Row>
        <Colxx xl="3" lg="12" className="mb-4">
          <h3>Institute list</h3>
          <Calendar />
        </Colxx>
        <Colxx xl="3" lg="12" className="mb-4">
          <h3>Schools list</h3>
          <Calendar />
        </Colxx>
        <Colxx xl="3" lg="12" className="mb-4">
          <h3>Dorms List</h3>
          <Calendar />
        </Colxx>
        <Colxx xl="3" lg="12" className="mb-4">
          <h3>Fields List</h3>
          <Calendar />
        </Colxx>
      </Row>
    </>
  );
};

export default ProvincailDashboard;
