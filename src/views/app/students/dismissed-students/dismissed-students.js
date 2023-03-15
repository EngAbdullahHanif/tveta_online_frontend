import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';

import DismissedStudents from './dismissed-student-list/DismissedListMain';
const servicePath = 'http://localhost:8000';
const studentApi = `${servicePath}/api`;
const dismissedStudentsAPI = `${servicePath}/api/student_institutes`;
// http://localhost:8000/api/student_institutes/?institute=1&type=3&language=&time=&student_id=&educational_year=1990&is_transfer=

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

  educationlaYear: Yup.string().required(
    <IntlMessages id="forms.educationYearErr" />
  ),
});

const initialValues = {
  institute: [],
  educationlaYear: '',
  studyTime: [],
  classs: [],
  department: [],
};
const MarksRegistration = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');
  const [dismissedStudents, setDismissedStudents] = useState([]);
  const [dismissedStudentsList, setDismissedStudentList] = useState(false);

  const { markId } = useParams();

  if (markId) {
    useEffect(() => {
      async function fetchStudent() {
        const { data } = await axios.get(
          `${studentMarkId}/?student_id=${markId}`
        );
        console.log(data, 'object of the data');

        // const instGender = genderOptions.map((studentGender) => {
        //   if (studentGender.value === data[0].gender) {
        //     setInitialGender(studentGender);
        //   }
        // });
      }
      fetchStudent();
      //setUpdateMode(true);
    }, []);
  }

  const fetchInstitutes = async () => {
    const response = await axios.get('http://localhost:8000/institute/');
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchDismissedStudents = async (values) => {
    const { data } = await axios.get(
      `${dismissedStudentsAPI}/?institute=${values.institute.value}&type=3&language=&time=&student_id=&educational_year=${values.educationlaYear}&is_transfer=`
    );
    setDismissedStudents(data);
    console.log('dismissed students list', data);
    setIsLoaded(true);
    setDismissedStudentList(true);
  };

  const onSubmit = (values) => {
    fetchDismissedStudents(values);
  };

  return (
    <>
      {dismissedStudentsList ? (
        <DismissedStudents item_list={dismissedStudents} />
      ) : (
        <Card>
          <h3 className="mt-5 m-5">لست شاگردان منفک شده</h3>
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
                <Form className="av-tooltip tooltip-label-right ">
                  <Row className="m-5">
                    <Colxx xxs="6">
                      {/* set if condition, if institutes are loaded */}
                      <FormGroup className="form-group has-float-label error-l-150 ">
                        <Label>
                          <IntlMessages id="forms.InstituteLabel" />
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institute}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label mt-5 error-l-150">
                        <Label>
                          <IntlMessages id="forms.educationYearLabel" />
                        </Label>
                        <Field
                          type="number"
                          id="educationlaYear"
                          className="form-control"
                          name="educationlaYear"
                          // assign value to selectedEducationalYear
                          onClick={setSelectedEducationalYear(
                            values.educationlaYear
                          )}
                        />
                        {errors.educationlaYear && touched.educationlaYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.educationlaYear}
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
      )}
    </>
  );
};

export default MarksRegistration;
