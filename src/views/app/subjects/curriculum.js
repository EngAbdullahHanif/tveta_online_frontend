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
import { Colxx } from 'components/common/CustomBootstrap';

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { useEffect } from 'react';

const Options = [
  {
    value: '1',
    label: 'option -1',
  },
  {
    value: '2',
    label: 'option-2',
  },
];

const SignupSchema = Yup.object().shape({
  Name: Yup.string().required(<IntlMessages id="dorm.NameErr" />),

  Capicity: Yup.string().required(<IntlMessages id="dorm.CapicityErr" />),

  TotalBuildingNo: Yup.string().required(
    <IntlMessages id="dorm.TotalBuildingNoErr" />
  ),
  TotalRooms: Yup.string().required(<IntlMessages id="dorm.TotalRoomsErr" />),
  TotalKitchens: Yup.string().required(
    <IntlMessages id="dorm.TotalKitchensErr" />
  ),
  Toilet: Yup.string().required(<IntlMessages id="dorm.ToiletErr" />),
});

const Curriculum = (values) => {
  const initialValues = {
    departmentId: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    subject: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    class: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    educationalYear: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
  };

  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="curriculum.curriculumTittle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row className="justify-content-center inlineBlock">
                  <Colxx xxs="11">
                    {/* Department Id */}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="curriculum.departmentIdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="departmentId"
                        id="departmentId"
                        value={values.departmentId}
                        options={Options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.departmentId && touched.departmentId ? (
                        <div className="invalid-feedback d-block">
                          {errors.departmentId}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Subject */}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="curriculum.subjectdLabel" />
                      </Label>
                      <FormikReactSelect
                        name="subject"
                        id="subject"
                        value={values.subject}
                        options={Options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.subject && touched.subject ? (
                        <div className="invalid-feedback d-block">
                          {errors.subject}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Class */}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="curriculum.classLabel" />
                      </Label>
                      <FormikReactSelect
                        name="class"
                        id="class"
                        value={values.class}
                        options={Options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.class && touched.class ? (
                        <div className="invalid-feedback d-block">
                          {errors.class}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Eduactional Year*/}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="curriculum.eduactionalYearLabel" />
                      </Label>
                      <FormikReactSelect
                        name="educationalYear"
                        id="educationalYear"
                        value={values.educationalYear}
                        options={Options}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.educationalYear && touched.educationalYear ? (
                        <div className="invalid-feedback d-block">
                          {errors.educationalYear}
                        </div>
                      ) : null}
                    </FormGroup>
                    <Button className="float-right m-4 ">
                      <IntlMessages id="forms.SubimssionButton" />
                    </Button>
                  </Colxx>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default Curriculum;
