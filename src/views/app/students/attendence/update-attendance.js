import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const servicePath = 'http://localhost:8000';
const StudentAttendanceAPI = `${servicePath}/api/stdatten`;
//http://localhost:8000/api/stdatten/?id=1

const ValidationSchema = Yup.object().shape({
  studentName: Yup.string().required(<IntlMessages id="studentNameErr" />),
  present: Yup.number().required(<IntlMessages id="presentErr" />),
  absent: Yup.number().required(<IntlMessages id="absentErr" />),
  holidays: Yup.number().required(<IntlMessages id="holidaysErr" />),
  sickness: Yup.number().required(<IntlMessages id="sicknessErr" />),
  educationalDays: Yup.number().required(
    <IntlMessages id="educationalDaysErr" />
  ),
});

const UpdateStudentAttendance = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [present, setPresentDays] = useState();
  const [absent, setAbsentDays] = useState();
  const [holidays, setHolidays] = useState();
  const [educationalDays, setEducationalDays] = useState();
  const [sickness, setSickness] = useState();
  const [inititalStudentName, setInititalStudentName] = useState('');
  const [initialPresent, setInitialPresent] = useState();
  const [initialAbsent, setInitialAbsent] = useState();
  const [initialHolidays, setInitialHolidays] = useState();
  const [initialEducationalDays, setInitialEducationalDays] = useState();
  const [initialSickness, setInitialSickness] = useState();
  const { attendance_id } = useParams();

  const initialValues = {
    studentName: inititalStudentName,
    present: initialPresent,
    absent: initialAbsent,
    holidays: initialHolidays,
    educationalDays: initialEducationalDays,
    sickness: initialSickness,
  };

  const fetchAttendance = async () => {
    const { data } = await axios.get(
      `${StudentAttendanceAPI}/?id=${attendance_id}`
    );
    setInititalStudentName(data[0].student_id.name);
    setInitialPresent(data[0].Present_days);
    setInitialAbsent(data[0].appsent_days);
    setInitialHolidays(data[0].holy_days);
    setInitialEducationalDays(data[0].educational_days);
    setInitialSickness(data[0].sikness_days);
    setIsLoaded(true);
  };

  useEffect(() => {
    if (attendance_id) {
      fetchAttendance();
    }
  }, []);

  const onSubmit = (values) => {
    const data = {
      studentName: values.studentName,
      present: values.present,
      absent: values.absent,
      holidays: values.holidays,
      sickness: values.sickness,
      educationalDays: values.educationalDays,
    };
    console.log('values on register', data);
  };
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <Card>
        <h3 className="m-5">{<IntlMessages id="د حاضری اپدیت" />}</h3>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ValidationSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right  ">
                <Row className="m-auto">
                  <Colxx xxs="6">
                    {/* student Name here */}
                    <FormGroup className="form-group has-float-label mt-5 error-l-150">
                      <Label>
                        <IntlMessages id="studentName" />
                      </Label>
                      <Field
                        type="string"
                        id="studentName"
                        className="form-control"
                        name="studentName"
                        onClick={setStudentName(values.studentName)}
                      />
                      {errors.studentName && touched.studentName ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.studentName}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* present days */}
                    <FormGroup className="form-group has-float-label mt-5 error-l-150">
                      <Label>
                        <IntlMessages id="presentDays" />
                      </Label>
                      <Field
                        type="number"
                        id="present"
                        className="form-control"
                        name="present"
                        onClick={setPresentDays(values.present)}
                      />
                      {errors.present && touched.present ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.present}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Absent Days */}
                    <FormGroup className="form-group has-float-label mt-5 error-l-150">
                      <Label>
                        <IntlMessages id="absentDays" />
                      </Label>
                      <Field
                        type="number"
                        id="absent"
                        className="form-control"
                        name="absent"
                        onClick={setAbsentDays(values.absent)}
                      />
                      {errors.absent && touched.absent ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.absent}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>

                  <Colxx xxs="6">
                    {/* Holidays */}
                    <FormGroup className="form-group has-float-label mt-5 error-l-150">
                      <Label>
                        <IntlMessages id="Holidays" />
                      </Label>
                      <Field
                        type="number"
                        id="holidays"
                        className="form-control"
                        name="holidays"
                        onClick={setHolidays(values.holidays)}
                      />
                      {errors.holidays && touched.holidays ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.holidays}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* sickness days */}
                    <FormGroup className="form-group has-float-label mt-5 error-l-150">
                      <Label>
                        <IntlMessages id="sickness days" />
                      </Label>
                      <Field
                        type="number"
                        id="sickness"
                        className="form-control"
                        name="sickness"
                        onClick={setSickness(values.sickness)}
                      />
                      {errors.sickness && touched.sickness ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.sickness}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Absent Days */}
                    <FormGroup className="form-group has-float-label mt-5 error-l-150">
                      <Label>
                        <IntlMessages id="educational days" />
                      </Label>
                      <Field
                        type="number"
                        id="educationalDays"
                        className="form-control"
                        name="educationalDays"
                        onClick={setEducationalDays(values.educationalDays)}
                      />
                      {errors.educationalDays && touched.educationalDays ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.educationalDays}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Button
                    className={`mt-3 btn-shadow btn-multiple-state`}
                    size="lg"
                    type="submit"
                    style={{ marginRight: '900px' }}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="button.SubmitButton" />
                    </span>
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default UpdateStudentAttendance;
