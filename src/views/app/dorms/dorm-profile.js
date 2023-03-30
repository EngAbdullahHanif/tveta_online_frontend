import React, { useState, useEffect } from 'react';
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

const servicePath = 'http://localhost:8000';
const dormStudentsApiUrl = `${servicePath}/api/Num_stddorm/`;
const dormApiUrl = `${servicePath}/institute/dorms/`;

const DormProfile = (values) => {
  const [isNext, setIsNext] = useState(true);
  const { dormId } = useParams();
  const [dorm, setDorm] = useState({});
  const [dormStudents, setDormStudents] = useState([]);
  useEffect(() => {
    async function fetchDrom() {
      // const response = await axios.get(`${dormApiUrl}?id=${dormId}`);
      const response = await callApi(`institute/dorms/?id=${dormId}`, '', null);
      if (response.data && response.status === 200) {
        setDorm(response.data);
      } else {
        console.log('dorm error');
      }

      // const dormStudentresponse = await axios.get(
      //   `${dormStudentsApiUrl}?dorm_id=${dormId}`
      // );
      // const dormStudentdata = await dormStudentresponse.data;

      const dormStudentresponse = await callApi(
        `api/Num_stddorm/?dorm_id=${dormId}`,
        '',
        null
      );
      if (dormStudentresponse.data && dormStudentresponse.status === 200) {
        setDormStudents(dormStudentresponse.data);
      } else {
        console.log('dorm student error');
      }
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
      {dorm.length > 0 && (
        <Row>
          <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
            <Card style={{ minHeight: '180px' }}>
              <CardBody className="">
                <b>
                  <p>{dorm[0].name}</p>
                </b>
                <p>{dorm[0].provence + ' - ' + dorm[0].district}</p>

                {dorm[0].dorm_type == 1 ? <p>خصوصی</p> : <p>خصوصی</p>}
                <p>{dorm[0].dorm_type_option}</p>
              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
            <Card style={{ minHeight: '180px' }}>
              <CardBody className="">
                <p>
                  د ساختمانونو تعداد:
                  <b>&nbsp;&nbsp;&nbsp; {dorm[0].building_qty}</b>
                </p>
                <p>
                  د اطاقونو تعداد:
                  <b>&nbsp;&nbsp;&nbsp; {dorm[0].rooms_qty}</b>
                </p>
                <p>
                  د اشپزخانو تعداد:
                  <b>&nbsp;&nbsp;&nbsp; {dorm[0].kitchen_qty}</b>
                </p>
                <p>
                  د تشنابونو تعداد:
                  <b>&nbsp;&nbsp;&nbsp; {dorm[0].toilet_qty}</b>
                </p>
              </CardBody>
            </Card>
          </Colxx>

          <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
            <Card style={{ minHeight: '180px' }}>
              <CardBody className="">
                <p>
                  سهمیه کل:
                  <b>&nbsp;&nbsp;&nbsp; {dorm[0].dorm_quota}</b>
                </p>
                <p>
                  ظرفیت کل:
                  <b>&nbsp;&nbsp;&nbsp; {dorm[0].dorm_capacity}</b>
                </p>
                <p>
                  تعداد کل شاگردان:
                  <b>&nbsp;&nbsp;&nbsp; {dormStudents}</b>
                </p>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default DormProfile;
