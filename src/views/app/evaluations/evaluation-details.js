import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

// Year  and SHift

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
import userEvent from '@testing-library/user-event';

const LevelOfEdcationOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];

const EvaluationDetails = () => {
  return (
    <>
      <h1 className="mt-5 m-5">
        {<IntlMessages id="evaluation.evaluationDetails" />}
      </h1>
      <Separator className="mb-5" />{' '}
      <Row className="justify-content-center">
        <Colxx xxs="6" sm="4" md="3" className="mb-4 ">
          <Card className="mb-4 border rounded " style={{ minHeight: '150px' }}>
            <CardBody className="text-center">
              <b>
                <p>
                  <IntlMessages id="teacher.evaluatorLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx>
                  <h3>محمد هلال</h3>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="4" md="3" className="mb-4   ">
          <Card className="mb-4 border rounded " style={{ minHeight: '150px' }}>
            <CardBody className="text-center">
              <b>
                <p>
                  <IntlMessages id="teacher.evaluationTypeLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx>
                  <h3> فعالیت محور</h3>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row className="justify-content-center">
        <Colxx xxs="6" sm="4" md="5" className="mb-4">
          <Card style={{ minHeight: '200px' }} className="mb-4  border rounded">
            <CardBody className="text-center">
              <b>
                <p>
                  <IntlMessages id="teacher.strengthPointsLabel" />
                </p>
              </b>
              <Row className="m-2">
                <Colxx> پر تلاش کار کن با اراده و قوی</Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="6" sm="4" md="5" className="mb-4  ">
          <Card style={{ minHeight: '200px' }} className="mb-4  border rounded">
            <CardBody className="text-center">
              <b>
                <h3>
                  <IntlMessages id="teacher.weaknessPointsLabel" />
                </h3>
              </b>
              <Row className="m-2">
                <Colxx>
                  د تخنیکی او مسلکی تعلیماتو اداره/ اداره تعلیمات تخنیکی و مسلکی
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row className="justify-content-center">
        <Colxx xxs="6" sm="4" md="10" className="mb-4  ">
          <Card style={{ minHeight: '200px' }} className="mb-4  border rounded">
            <CardBody className="text-center">
              <b>
                <h3>
                  <IntlMessages id="teacher.suggestionLabel" />
                </h3>
              </b>
              <Row className="m-2">
                <Colxx>
                  <p>
                    در اصطلاح کنونی معلمین مدارس عالیه را به سه قسمت تقسیم کنند:
                    استاد (بالاترین درجه )، دانشیار، دبیر. || مأمور وصول مالیات
                    : بمن [ ابومحمد کاتب ] چنین رسانیدند از بعضی از ایشان [ مردم
                    قم ] که شاخهای کوچک تر از درخت می گرفتندو پسران خُرد خود را
                    به روی درمی انداختند، و بدان چوبها ایشان را می زدند، و در
                    زبان ایشان می نهادند که بگوئید: اﷲ اﷲ ایها الاستاذ تأمّل
                    حالی ، فقد وقع الیرقان علی غلّتی فأفسدها، و وقع الدّود علی
                    قطنی فأکله و احتاج (و اجتاح ؟) الجراد و القمل سائر مابقی ؛
                    یعنی اﷲ اﷲ ای استاد اندیشه کن در حال من بحقیقت که زنگار در
                    غلّه ٔ من افتاد و آنرا تباه گردانید و کرم واقع شد در پنبه
                    زار من و آنرا بخورد و آنچه باقی ماند ملخ بکلی بخورد...
                    (تاریخ قم ). رجوع به امثال و حکم «میخ قمی » ص 1772 شود. ||
                    دلاّک (در تداول عوام ). - استاد برَسان کردن ؛ تعبیری مثلی
                    است و معنی آن ، با کمی و نارسائی پارچه وقماش ، بسختی و صعوبت
                    از آن جامه ای کردن . رجوع به استاذ شود.
                  </p>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default EvaluationDetails;
