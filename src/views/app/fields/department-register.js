import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import callApi from 'helpers/callApi';
import * as Yup from 'yup';
import { NotificationManager } from 'components/common/react-notifications';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from '../../../containers/form-validations/FormikFields';

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
  const [isNext, setIsNext] = useState(true);
  const fetchFields = async () => {
    const response = await callApi('institute/field/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setFields(updatedData);
    } else {
      console.log('field error');
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'دیپارتمنت موفقانه ثبت شوو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'دیپارتمنت ثبت نشو، بیا کوشش وکری',
          'خطا',
          9000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  // post student record to server
  const postStudentRecord = async (data, resetForm) => {
    const response = await callApi(
      'institute/department-create/',
      'POST',
      data
    );
    if (response) {
      createNotification('success', 'filled');
      resetForm();
      setIsNext(false);
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const onSubmit = (values, { resetForm }) => {
    //remove the user_id after authentication is done
    const data = {
      field_of_study: values.field.value,
      name: values.departmentName,
      english_name: values.departmentEnglishName,
    };
    console.log('data', data);
    postStudentRecord(data, resetForm);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="department.departmentRegisterlabel" />}
        </h3>
        <CardBody>
          {isNext ? (
            <Formik
              initialValues={{}}
              // validationSchema={SignupSchema}
              onSubmit={onSubmit}
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
                <Form className="av-tooltip tooltip-label-bottom">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      {/* field*/}
                      <FormGroup className="form-group has-float-label">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {/* <IntlMessages id="forms.field" /> */}
                          field
                        </Label>
                        <FormikReactSelect
                          name="field"
                          id="field"
                          value={values.field}
                          options={fields}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.FieldId && touched.FieldId ? (
                          <div className="invalid-feedback d-block">
                            {errors.FieldId}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {/* <IntlMessages id="field.FieldNameLabel" /> */}
                          Department Name
                        </Label>

                        <Field className="form-control" name="departmentName" />
                        {errors.departmentName && touched.departmentName ? (
                          <div className="invalid-feedback d-block">
                            {errors.departmentName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department Name In English */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {/* <IntlMessages id="field.FieldEngNameLabel" /> */}
                          Department English Name
                        </Label>
                        <Field
                          className="form-control"
                          name="departmentEnglishName"
                        />
                        {errors.FieldEngName && touched.FieldEngName ? (
                          <div className="invalid-feedback d-block">
                            {errors.FieldEngName}
                          </div>
                        ) : null}
                      </FormGroup>

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
                            <span
                              className="label"
                              style={{ fontSize: 18, fontWeight: 'bold' }}
                            >
                              <IntlMessages id="forms.SubimssionButton" />
                            </span>
                          </Button>
                        </Colxx>
                      </Row>
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
                <Button
                  className="m-5 bg-primary"
                  onClick={() => setIsNext(true)}
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
