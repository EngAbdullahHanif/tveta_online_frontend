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

const DormDetails = (values) => {
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
        <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.PublicBuildingOwnerLabel" />
                </p>
              </b>
              <Row className="m-2 ">
                <Colxx className="pt-3">
                  د تخنیکی او مسلکی تعلیماتو اداره/ اداره تعلیمات تخنیکی و مسلکی
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6" sm="4" md="3" className="mb-4">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded "
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.PrivateBuildingTypeLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx className="pt-3"> کرایی</Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6" sm="4" md="3" className="mb-4">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded  "
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.TotalBuildingNoLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx className="pt-3">
                  {' '}
                  <h2>8 </h2>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6" sm="4" md="3" className="mb-4">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.TotalRoomsLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx className="pt-3">
                  {' '}
                  <h2>48 </h2>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6" sm="4" md="3" className="mb-4">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.TotalKitchensLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx className="pt-3">
                  {' '}
                  <h2>8 </h2>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="6" sm="4" md="3" className="mb-4">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.ToiletLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx className="pt-3">
                  {' '}
                  <h2>14 </h2>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="4" md="6" className="mb-4">
          <Card style={{ minHeight: '180px' }}>
            <CardBody className="text-center">
              <b>
                <p
                  className="bg-primary rounded"
                  style={{ paddingInline: '10px' }}
                >
                  <IntlMessages id="dorm.ToiletLabel" />
                </p>
              </b>
              <Row>
                <Colxx>
                  {' '}
                  <Label>
                    <IntlMessages id="forms.ProvinceLabel" />
                  </Label>
                  <h3>کابل</h3>
                </Colxx>
                <Colxx>
                  {' '}
                  <Label>
                    <IntlMessages id="forms.DistrictLabel" />
                  </Label>
                  <h3>پغمان</h3>
                </Colxx>
                <Colxx>
                  {' '}
                  <Label>
                    <IntlMessages id="forms.VillageLabel" />
                  </Label>
                  <h3>چهلتن</h3>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default DormDetails;
