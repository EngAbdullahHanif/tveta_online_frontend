import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';

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

const InstituteDetails = (values) => {
  const [isNext, setIsNext] = useState(true);
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
                  <p>58 نفر</p>
                </Colxx>
                <Colxx>
                  <b>
                    <IntlMessages id="institute.totalStudentsFemale" />
                  </b>
                  <p>58 نفر</p>
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
                  <p>58 نفر</p>
                </Colxx>
                <Colxx>
                  <b>
                    <IntlMessages id="institute.totalStudentsFemale" />
                  </b>
                  <p>58 نفر</p>
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
                  <p>58 نفر</p>
                </Colxx>
                <Colxx>
                  <b>
                    <IntlMessages id="institute.totalStudentsFemale" />
                  </b>
                  <p>58 نفر</p>
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
                  <p>58 نفر</p>
                </Colxx>
                <Colxx>
                  <b>
                    <IntlMessages id="institute.totalStudentsFemale" />
                  </b>
                  <p>58 نفر</p>
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
    </>
  );
};

export default InstituteDetails;
