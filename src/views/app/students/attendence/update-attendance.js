import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

import config from '../../../../config';
const servicePath = config.API_URL;
const StudentAttendanceAPI = `${servicePath}/api/stdatten`;
const UpdateStudentAttendanceAPI =
  'http://localhost:8000/api/update_student_atten';
//http://localhost:8000/api/update_student_atten/1//
//http://localhost:8000/api/stdatten/?id=1

const ValidationSchema = Yup.object().shape({
  studentName: Yup.string().required(<IntlMessages id="studentNameErr" />),
  present: Yup.number()
    .min(0)
    .max(300)
    .required(<IntlMessages id="presentErr" />),
  absent: Yup.number()
    .min(0)
    .max(300)
    .required(<IntlMessages id="absentErr" />),
  holidays: Yup.number()
    .min(0)
    .max(100)
    .required(<IntlMessages id="holidaysErr" />),
  sickness: Yup.number()
    .min(0)
    .max(100)
    .required(<IntlMessages id="sicknessErr" />),
  educationalDays: Yup.number().required(
    <IntlMessages id="educationalDaysErr" />,
  ),
});

const UpdateStudentAttendance = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [present, setPresentDays] = useState();
  const [absent, setAbsentDays] = useState();
  const [holidays, setHolidays] = useState();
  const [educationalDays, setEducationalDays] = useState();
  const [attendanceRecord, setAttendanceRecord] = useState({});
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
      `${StudentAttendanceAPI}/?id=${attendance_id}`,
    );
    setAttendanceRecord(data[0]);
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
    console.log('old attendance data', attendanceRecord);

    const data = {
      id: attendanceRecord.id,
      Present_days: values.present,
      appsent_days: values.absent,
      holy_days: values.holidays,
      sikness_days: values.sickness,
      educational_days: values.educationalDays,
      type: attendanceRecord.type,
      educational_year: attendanceRecord.educational_year,
      created_date: attendanceRecord.created_date,
      updated_date: attendanceRecord.updated_date,
      is_deleted: attendanceRecord.is_deleted,
      institute_id: attendanceRecord.institute_id.id,
      department_id: attendanceRecord.department_id.id,
      student_id: attendanceRecord.student_id.student_id,
      class_id: attendanceRecord.class_id.id,
      user_id: attendanceRecord.user_id,
    };

    // post the updated data to the server
    axios
      .put(`${UpdateStudentAttendanceAPI}/${data.id}/`, data)
      .then((res) => {
        console.log('success message', res);
      })
      .catch((err) => {
        console.log('error message here', err);
      });
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
