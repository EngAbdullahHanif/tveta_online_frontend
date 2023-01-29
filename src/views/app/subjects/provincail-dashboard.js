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
      <div id="containerr" >
        <h1 className="mt-5 m-3">
          {<IntlMessages id="dashboard.provincail" />}
        </h1>

        <div class="container">
          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div class="rain">
            <div class="drop"></div>
            <div class="waves">
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="splash"></div>
            <div class="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="mb-5" />
      <Row className="mt-3">
        <Colxx xxs="6" sm="4" md="3" className="mb-4  ">
          <Card style={{ minHeight: '180px' }} id="divId">
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
          <Card style={{ minHeight: '180px' }} id="divId">
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
          <Card style={{ minHeight: '180px' }} id="divId">
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
          <Card style={{ minHeight: '180px' }} id="divId">
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
          <Card style={{ minHeight: '180px' }} id="divId">
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
          <Card style={{ minHeight: '180px' }} id="divId">
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
          <Card style={{ minHeight: '180px' }} id="divId">
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
      <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar />
        </Colxx>
      </Row>
    </>
  );
};

export default ProvincailDashboard;
