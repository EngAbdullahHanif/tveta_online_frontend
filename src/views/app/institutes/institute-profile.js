import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import './../dorms/dorm-register.css';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';

import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import config from '../../../config';

import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { message } from 'antd';

const servicePath = config.API_URL;
const instituteApiUrl = `${servicePath}/institute/institute-teachers-students-statistics`;

const InstituteDetails = (values) => {
  const { departments, classes: classs } = useContext(AuthContext);
  const [isNext, setIsNext] = useState(true);
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState([]);
  const [instituteStatistics, setInstituteStatistics] = useState([]);
  // const [departments, setDepartments] = useState([]);
  const [instDepartments, setInstDepartments] = useState([]);
  const [InstDepClasses, setInstDepClasses] = useState([]);

  const schemaValidation = Yup.object().shape({
    class: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="marks.ClassErr" />),

    department: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="teacher.departmentIdErr" />),
  });
  const fetchInstDepts = () => {
    callApi(`institute/${instituteId}/departments/`).then((inst) => {
      console.log('Institutes Departments: ', inst.data);
      const newOptions = departments.filter((dep) => {
        // if department id is in data.department
        let department_ids = inst.data.reduce(
          (acc, cur, i) => acc.add(cur.department),
          new Set(),
        );
        console.log(department_ids);
        return department_ids.has(dep.value);
      });
      const new2Options = newOptions.map((op) => {
        op.instDeps = inst.data.filter(
          (instdep) => instdep.department === op.value,
        )[0];
        return op;
      });
      setInstDepClasses(inst.data);
      console.log('new2Options', new2Options);
      setInstDepartments(new2Options);
    });
  };

  const fetchDepartments = async () => {
    if (!instituteId) {
      return;
    }
    const response = await callApi(
      `institute/institite-department/?institute=${instituteId}`,
      '',
      null,
    );
    // console.log('response of department', response);
    if (response.data && response.status === 200) {
      console.log('instituteId', instituteId);
      console.log('response of department', response);
      // setDepartments(response.data);
    } else {
      console.log('department error');
    }
  };
  async function fetchInstituteInformation() {
    const instituteResponse = await callApi(
      `institute/?institute=${instituteId}`,
      '',
      null,
    );
    if (instituteResponse.data && instituteResponse.status === 200) {
      const instituteData = await instituteResponse.data;
      console.log('instituteData', instituteData);
      setInstitute(instituteData);
    }

    const instituteStatisticsResponse = await callApi(
      `reports/institutes/${instituteId}/teacher-students/`,
      '',
      null,
    );
    if (
      instituteStatisticsResponse.data &&
      instituteStatisticsResponse.status === 200
    ) {
      const instituteStatisticsData = await instituteStatisticsResponse.data;
      console.log('INSTTTTTTTTTTTTTTTTTTTT', instituteStatisticsData);
      console.log('instituteStatisticsData', instituteStatisticsData);
      setInstituteStatistics(instituteStatisticsData);
    }
  }
  useEffect(() => {
    // fetchDepartments();
    fetchInstDepts();
    fetchInstituteInformation();
  }, []);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const addClass = async (values) => {
    const data = {
      educational_year: 1390,
      classs: values.class?.value,
      institute_department: values.department?.instDeps.id,
    };
    await callApi(`institute/departments/classes/`, 'post', data)
      .then((response) => {
        console.log('Response Class Add: ', response.data);
        fetchInstDepts();
      })
      .catch((err) => {
        message.error('Error in adding class');
      });
  };

  return (
    <>
      <h2 className="mt-5 m-3">
        {<IntlMessages id="institute.detailsTitle" />}
      </h2>

      <Separator className="mb-5" />
      {instituteStatistics && (
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
                    <p>
                      {instituteStatistics.male_students_12 +
                        instituteStatistics.male_students_14}
                    </p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>
                      {instituteStatistics.female_students_12 +
                        instituteStatistics.female_students_14}
                    </p>
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
                    <p>{instituteStatistics.male_teachers}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics.female_teachers}</p>
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
                    <p>{instituteStatistics.male_students_12}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics.female_students_12}</p>
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
                    <p>{instituteStatistics.male_students_14}</p>
                  </Colxx>
                  <Colxx>
                    <b>
                      <IntlMessages id="institute.totalStudentsFemale" />
                    </b>
                    <p>{instituteStatistics.female_students_14}</p>
                  </Colxx>
                </Row>
              </CardBody>
            </Card>
          </Colxx>

          <Colxx xxs="6" sm="4" md="3" className="col-md-12">
            <Card>
              <CardBody className="text-center">
                <b>
                  <p>
                    <IntlMessages id="institute.totalDepartments" />
                  </p>
                </b>
                <Row className="d-block">
                  {console.log('DEPTS', instDepartments)}
                  {departments &&
                    instDepartments?.map((item) => {
                      return (
                        <Colxx key={item.value}>
                          {item?.label}

                          {item.instDeps.classes.map((cl) => {
                            return (
                              <li key={cl.classs}>
                                {
                                  classs.find((cls) => cls.value === cl.classs)
                                    ?.label
                                }
                              </li>
                            );
                          })}
                        </Colxx>
                      );
                    })}
                </Row>
              </CardBody>
            </Card>

            <br />
            <Card
              style={{
                padding: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Formik
                enableReinitialize={true}
                initialValues={{ class: [], department: [] }}
                onSubmit={addClass}
                validationSchema={schemaValidation}
              >
                {({
                  errors,
                  touched,
                  values,
                  setFieldTouched,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <Form className="av-tooltip tooltip-label-right error-l-100 style w-100">
                    <>
                      <Row style={{ marginInline: '2%' }}>
                        {' '}
                        <Colxx>
                          <div>
                            <h2>
                              ډیپارټمنټ ته د ټولګي زیاتول / اضافه کردن صنف به
                              دیپارتمنت
                            </h2>
                            <FormGroup className="form-group has-float-label w-100">
                              <Label>
                                <IntlMessages id="forms.studyDepartment" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="department"
                                id="department"
                                value={values.department}
                                options={instDepartments}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                isSearchable={false}
                                required
                              />
                              {errors.department && touched.department ? (
                                <p style={{ color: 'red' }}>
                                  {errors.department}
                                </p>
                              ) : null}
                            </FormGroup>
                          </div>
                          <div>
                            <FormGroup className="form-group has-float-label w-100">
                              <Label>
                                <IntlMessages id="marks.ClassLabel" />
                                <span style={{ color: 'red' }}>*</span>
                              </Label>
                              <FormikReactSelect
                                name="class"
                                id="class"
                                value={values.class}
                                options={classs}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                isSearchable={false}
                                required
                              />
                              {errors.class && touched.class ? (
                                <p style={{ color: 'red' }}>{errors.class}</p>
                              ) : null}
                            </FormGroup>
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                          >
                            ثبت صنف
                          </button>
                        </Colxx>
                      </Row>
                    </>
                  </Form>
                )}
              </Formik>
            </Card>
          </Colxx>
        </Row>
      )}
    </>
  );
};

export default InstituteDetails;
