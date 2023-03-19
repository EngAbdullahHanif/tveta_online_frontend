import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from '../../../containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const fieldsApiUrl = `${servicePath}/institute/field/`;
const departmentRegisterationApiUrl = `${servicePath}/institute/department-create/`;

const SignupSchema = Yup.object().shape({
  departmentName: Yup.string().required(
    <IntlMessages id="department.nameErr" />
  ),

  departmentEnglishName: Yup.string().required(
    <IntlMessages id="department.englishNameErr" />
  ),

  field: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.fieldErr" />),
});

const DepartmentRegister = () => {
  const [fields, setFields] = useState([]);
  const [isNext, setIsNext] = useState(false);

  const fetchFields = async () => {
    const response = await axios.get(fieldsApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setFields(updatedData);
  };

  useEffect(() => {
    fetchFields();
  }, []);
  const onRegister = (values) => {
    setIsNext(true);
    console.log('values', values);

    //remove the user_id after authentication is done
    const data = {
      filed: values.field.value,
      name: values.departmentName,
      english_name: values.departmentEnglishName,
      user_id: 1,
    };

    axios
      .post(departmentRegisterationApiUrl, data)
      .then((res) => {
        console.log('success');
      })
      .catch((err) => {
        console.log('failed');
      });
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="department.departmentRegisterlabel" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={{
                departmentName: '',
                departmentEnglishName: '',
                field: [],
              }}
              validationSchema={SignupSchema}
              onSubmit={onRegister}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-175">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      {/* Department Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="field.FieldNameLabel" />
                        </Label>

                        <Field className="form-control" name="departmentName" />
                        {errors.departmentName && touched.departmentName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department Name In English */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="department.FieldEngNameLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="departmentEnglishName"
                        />
                        {errors.departmentEnglishName &&
                        touched.departmentEnglishName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentEnglishName}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* field*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="department.field" />
                        </Label>
                        <FormikReactSelect
                          name="field"
                          id="field"
                          value={values.field}
                          options={fields}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.field && touched.field ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.field}
                          </div>
                        ) : null}
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
            // A component should be create for the the submission message component and then component should be imported here.
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
                <Button
                  className="m-5 bg-primary"
                  onClick={() => setIsNext(false)}
                >
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

export default DepartmentRegister;
