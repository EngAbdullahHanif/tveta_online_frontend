import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import './../../.././../assets/css/global-style.css';
import { educationalYearsOptions } from './../../global-data/options';

// Year  and SHift
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import TransferedStudentList from './transfered-student-list/TransferedListMain';
import config from '../../../../config';
import { AuthContext } from 'context/AuthContext';
const servicePath = config.API_URL;
const studentApi = `${servicePath}/api`;
const transferedStudentsAPI = `${servicePath}/api/student_institutes`;
// http://localhost:8000/api/student_institutes/?institute=&type=&language=&time=&student_id=&educational_year=&is_transfer=2

const StudyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },
];

const ValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  educationalYear: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.educationYearErr" />),
});

const initialValues = {
  institute: [],
  educationalYear: [],
};
const MarksRegistration = ({ match }) => {
  const { institutes } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState([]);
  const [transferedStudents, setTransferedStudents] = useState([]);
  const [transferedStudentList, setTransferedStudentList] = useState(false);

  const { markId } = useParams();

  async function fetchStudent() {
    const { data } = await axios.get(
      // `${studentMarkId}/?student_id=${markId}`,
      `${1}/?student_id=${markId}`,
    );
    console.log(data, 'object of the data');
  }

  useEffect(() => {
    if (markId) {
      fetchStudent();
      //setUpdateMode(true);
    }
  }, [markId]);

  const fetchTransferedStudents = async (values) => {
    const response = await callApi(
      `students/student_institutes/?institute=${values.institute.value}&educational_year=${values.educationalYear.value}&is_transfer=true`,
      '',
      null,
    );
    console.log('response of transfer students', response);
    setTransferedStudents(response.data);
    //console.log('transfered students list', data);
    setIsLoaded(true);
    setTransferedStudentList(true);
  };

  const onSubmit = (values) => {
    setTransferedStudentList(true);
    fetchTransferedStudents(values);
  };

  return (
    <>
      {transferedStudentList ? (
        <TransferedStudentList item_list={transferedStudents} />
      ) : (
        <Card>
          <div className="mt-4 ml-5">
            <h2 className="mt-5 m-5 titleStyle">
              <IntlMessages id="student.transferred-studentList" />
            </h2>
          </div>
          <CardBody>
            {' '}
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right style ">
                  <Row className="mr-5 ml-5 mt-5 mb-1 justify-content-center">
                    <Colxx xxs="6">
                      {/* set if condition, if institutes are loaded */}
                      <FormGroup className="form-group has-float-label error-l-150 ">
                        <Label>
                          <IntlMessages id="forms.InstituteLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <FormikReactSelect
                          name="institute"
                          id="institute"
                          value={values.institute}
                          options={institutes}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedInstitute(values.institute)}
                        />

                        {errors.institute && touched.institute ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.institute}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5  error-l-150">
                        <Label>
                          <IntlMessages id="forms.educationYearLabel" />
                        </Label>
                        <FormikReactSelect
                          name="educationalYear"
                          id="educationalYear"
                          options={educationalYearsOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          onClick={setSelectedEducationalYear(
                            values.educationalYear,
                          )}
                        />
                        {errors.educationalYear && touched.educationalYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white ">
                            {errors.educationalYear}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row className=" justify-content-center">
                    <Colxx xxs="6">
                      <Button
                        color="primary"
                        className="float-right buttonStyle"
                        size="lg"
                        type="submit"
                        style={{ margin: '7% 0% 8% 1%', paddingInline: '5%' }}
                      >
                        <span className="label">
                          <IntlMessages id="search.studentId" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default MarksRegistration;
