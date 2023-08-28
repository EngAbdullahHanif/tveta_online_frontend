import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

import config from '../../../config';
import { AuthContext } from 'context/AuthContext';

const servicePath = config.API_URL;
const dormStudentsApiUrl = `${servicePath}/api/Num_stddorm/`;
const dormApiUrl = `${servicePath}/institute/dorms/`;

const DormProfile = (values) => {
  const { provinces, districts } = useContext(AuthContext);
  const [isNext, setIsNext] = useState(true);
  const { dormId } = useParams();
  const [dorm, setDorm] = useState({});
  const [dormStudents, setDormStudents] = useState([]);

  async function fetchDrom() {
    const response = await callApi(`institute/dorms/?id=${dormId}`, '', null);
    if (response.data && response.status === 200) {
      console.log('dorm response', response.data?.results[0]);
      setDorm(response?.data.results[0]);
    } else {
      console.log('dorm error');
    }
    const dormStudentresponse = await callApi(
      `students/Num_stddorm/?dorm_id=${dormId}`,
      '',
      null
    );
    if (dormStudentresponse.data && dormStudentresponse.status === 200) {
      console.log('dorm student response', dormStudentresponse);
      setDormStudents(dormStudentresponse.data);
    } else {
      console.log('dorm student error');
    }
  }
  useEffect(() => {
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
      {console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD', dorm)}
      <h2 className="mt-5 m-3">
        {<IntlMessages id="institute.detailsTitle" />}
      </h2>

      <Separator className="mb-5" />
      {dorm && (
        <>
          <h1>{dorm.name}</h1>
          <Row>
            <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
              <Card style={{ minHeight: '180px' }}>
                <CardBody className="">
                  <b>
                    <p>{dorm.name}</p>
                  </b>
                  <p>
                    {provinces.find((op) => op.value === dorm.province)?.label +
                      ' - ' +
                      districts.find((op) => op.value === dorm.district)?.label}
                  </p>

                  {dorm.building_ownership == 'governmental' ? (
                    <p>دولتی</p>
                  ) : (
                    <p>خصوصی</p>
                  )}
                  {dorm.building_type_option == 'tveta' ? (
                    <p>
                      د تخنیکی او مسکلی زده کړو اداره/ اداره تعلبمات تخنبکب و
                      مسلکی
                    </p>
                  ) : dorm.building_type_option == 'other_org' ? (
                    <p>بل ارګان/ ارگان دیگر</p>
                  ) : dorm.building_type_option == 'rent' ? (
                    <p>کرایی</p>
                  ) : (
                    <p>کمکی</p>
                  )}
                </CardBody>
              </Card>
            </Colxx>
            <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
              <Card style={{ minHeight: '180px' }}>
                <CardBody className="">
                  <p>
                    د ساختمانونو تعداد:
                    <b>&nbsp;&nbsp;&nbsp; {dorm.number_of_buildings}</b>
                  </p>
                  <p>
                    د اطاقونو تعداد:
                    <b>&nbsp;&nbsp;&nbsp; {dorm.number_of_rooms}</b>
                  </p>
                  <p>
                    د اشپزخانو تعداد:
                    <b>&nbsp;&nbsp;&nbsp; {dorm.number_of_kitchens}</b>
                  </p>
                  <p>
                    د تشنابونو تعداد:
                    <b>&nbsp;&nbsp;&nbsp; {dorm.number_of_toilets}</b>
                  </p>
                </CardBody>
              </Card>
            </Colxx>

            <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
              <Card style={{ minHeight: '180px' }}>
                <CardBody className="">
                  <p>
                    سهمیه کل:
                    <b>&nbsp;&nbsp;&nbsp; {dorm.quota}</b>
                  </p>
                  <p>
                    ظرفیت کل:
                    <b>&nbsp;&nbsp;&nbsp; {dorm.capacity}</b>
                  </p>
                  <p>
                    تعداد کل شاگردان:
                    <b>&nbsp;&nbsp;&nbsp; {dormStudents}</b>
                  </p>
                </CardBody>
              </Card>
            </Colxx>
          </Row>
        </>
      )}
    </>
  );
};

export default DormProfile;
