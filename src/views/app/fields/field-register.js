import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import callApi from 'helpers/callApi';
import { NotificationManager } from 'components/common/react-notifications';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from '../../../containers/form-validations/FormikFields';

const SignupSchema = Yup.object().shape({
  fieldId: Yup.string().required(<IntlMessages id="field.FieldIdErr" />),

  fieldName: Yup.string()
    //  .min(3, <IntlMessages id="forms.StdId" />)
    .required(<IntlMessages id="field.FieldNameErr" />),

  fieldEnglishName: Yup.string().required(
    <IntlMessages id="field.FieldEngNameErr" />
  ),

  sector: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.sectorErr" />),
});

//const sectorOptions = [
//   { value: '1', label: 'economic' },
//   { value: '2', label: 'technology' },
//   { value: '3', label: 'agriculture' },
// ];

const FieldRegister = () => {
  const [isNext, setIsNext] = useState(false);
  const [sectorOptions, setSectorOptions] = useState([]);

  //fetch sector list
  const fetchSectors = async () => {
    const response = await callApi('institute/sectors/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.sector,
      }));
      setSectorOptions(updatedData);
    } else {
      console.log('class error');
    }
  };
  useEffect(() => {
    fetchSectors();
  }, []);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'رشته موفقانه ثبت شوو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'رشته ثبت نشو، بیا کوشش وکری',
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
  const postStudentRecord = async (data) => {
    const response = await callApi('institute/field-create/', 'POST', data);
    if (response) {
      createNotification('success', 'filled');
      setIsNext(true);
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };
  const onSubmit = (values, { resetForm }) => {
    resetForm();
    //remove the user_id after authentication is done
    const data = {
      name: values.name,
      english_name: values.english_name,
      sector: values.sector.value,
      user_id: '1',
    };
    postStudentRecord(data);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="field.FieldRegisterTitle" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={{
                fieldId: '',
                fieldName: '',
                fieldEnglishName: '',
                sector: [],
              }}
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
                resetForm,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-175">
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      {/* Field Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="field.FieldNameLabel" />
                        </Label>

                        <Field className="form-control" name="fieldName" />
                        {errors.fieldName && touched.fieldName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.fieldName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Field Name In English */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="field.FieldEngNameLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="fieldEnglishName"
                        />
                        {errors.fieldEnglishName && touched.fieldEnglishName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.fieldEnglishName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* sector*/}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.sector" />
                        </Label>
                        <FormikReactSelect
                          name="sector"
                          id="sector"
                          value={values.sector}
                          options={sectorOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.sector && touched.sector ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.sector}
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

export default FieldRegister;
