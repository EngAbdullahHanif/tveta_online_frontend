import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  // Form,
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

const subjectOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];

const systemOption = [
  { value: '1', label: 'عمومی' },
  { value: '2', label: 'GIZ' },
  { value: '3', label: 'نیما' },
];

const ValidationSchema = Yup.object().shape({
  className: Yup.string().required(<IntlMessages id="class.nameErr" />),
  semester: Yup.string().required(<IntlMessages id="class.semesterErr" />),
});

const updateMode = true;
const SubjcetRegister = () => {
  const TestData = {
    ClassName: '13th',
    Semester: '1',
  };
  const [initialClassName, setInitialClassName] = useState(
    TestData.ClassName ? TestData.ClassName : ''
  );
  const [initialSemester, setInitialSemester] = useState(
    TestData.Semester ? TestData.Semester : ''
  );
  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    // setIsNext(event);
  };

  const initialValues = {
    className: initialClassName,
    semester: initialSemester,
  };
  const onRegister = (values) => {
    console.log(values);
    const data = {
      name: values.className,
      semester: values.semester,
    };
    console.log('data', data);

    axios
      .post('http://localhost:8000/institute/classs/', data)
      .then((response) => {
        console.log(response);
        console.log('data sent to the server2');
      })
      .catch((error) => {
        console.log('data sent to the server4');
        console.log(error);
      });

    if (!loading) {
      // if (values.email !== '' && values.password !== '') {
      //   loginUserAction(values, history);
      // }
    }
  };
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="class.register.title" />}
        </h3>
        <CardBody>
          {isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-100">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="class.nameLabel" />
                        </Label>
                        <Field className="form-control" name="className" />
                        {errors.className && touched.className && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.className}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="class.semesterLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="semester"
                          type="number"
                        />
                        {errors.semester && touched.semester && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.semester}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    {' '}
                    <Colxx style={{ marginLeft: '5%', marginBottom: '8%' }}>
                      <Button
                        className="float-right m-5 "
                        size="lg"
                        type="submit"
                        color="primary"
                        onClick={() => {
                          handleClick(false);
                        }}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="forms.SubimssionButton" />
                        </span>
                      </Button>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          ) : (
            <div
              className="wizard-basic-step text-center pt-3 "
              style={{ minHeight: '400px' }}
            >
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button className="m-5 bg-primary">
                  <IntlMessages id="button.back" />
                </Button>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default SubjcetRegister;
