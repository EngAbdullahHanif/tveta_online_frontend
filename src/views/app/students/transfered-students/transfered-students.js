import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';

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
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import userEvent from '@testing-library/user-event';
import TransferedStudentList from './transfered-student-list/TransferedListMain';
const servicePath = 'http://localhost:8000';
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

  educationlaYear: Yup.string().required(
    <IntlMessages id="forms.educationYearErr" />
  ),
});

const initialValues = {
  institute: [],
  educationlaYear: '',
};
const MarksRegistration = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [selectedEducationalYear, setSelectedEducationalYear] = useState('');
  const [transferedStudents, setTransferedStudents] = useState([]);
  const [transferedStudentList, setTransferedStudentList] = useState(false);

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

  // const fetchInstitutes = async () => {
  //   const response = await axios.get('http://localhost:8000/institute/');
  //   const updatedData = await response.data.map((item) => ({
  //     value: item.id,
  //     label: item.name,
  //   }));
  //   setInstitutes(updatedData);
  // };

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };
  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchTransferedStudents = async (values) => {
    const { data } = await axios.get(
      `${transferedStudentsAPI}/?institute=${values.institute.value}&type=&language=&time=&student_id=&educational_year=${values.educationlaYear}&is_transfer=2`
    );
    setTransferedStudents(data);
    //console.log('transfered students list', data);
    setIsLoaded(true);
    setTransferedStudentList(true);
  };

  const onSubmit = (values) => {
    setTransferedStudentList(true)
    fetchTransferedStudents(values);
  };

  return (
    <>
      {transferedStudentList ? (
        <TransferedStudentList item_list={transferedStudents} />
      ) : (
        <Card>
          <h2 className="mt-5 m-5"><IntlMessages id="student.transferred-studentList" /></h2>
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
                  <Row className="mr-5 ml-5 mt-5 mb-1 justify-content-center">
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
                  <Row className=" justify-content-center">
                    <Colxx xxs="6" >
            
                    <Button 
                    className="float-right m-3 mb-5"
                      size="lg"
                      type="submit"
                      color="primary"
                    >
                      <span className="label">
                        <IntlMessages id="search.studentId" />
                      </span>
                    </Button>
                    </Colxx>
                    
                  </Row>
                  <br/>  
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
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
