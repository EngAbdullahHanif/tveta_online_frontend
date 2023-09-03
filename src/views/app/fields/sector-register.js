import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import callApi from 'helpers/callApi';
import * as Yup from 'yup';
import { NotificationManager } from 'components/common/react-notifications';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const ValidationSchema = Yup.object().shape({
  sectorName: Yup.string().required(
    'د سکتور نوم اړین دی / نام سکتور را وارد کنید'
  ),
});

const SectorRegister = () => {
  const [isNext, setIsNext] = useState(true);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'سکتور موفقانه ثبت شوو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'سکتور ثبت نشو، بیا کوشش وکری',
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
    const response = await callApi('institute/sectors_create/', 'POST', data);
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
      sector: values.sectorName,
    };
    console.log('data', data);
    postStudentRecord(data, resetForm);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="sector.sectorRegisterlabel" />}
        </h3>
        <CardBody>
          {isNext ? (
            <Formik
              initialValues={{}}
              validationSchema={ValidationSchema}
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
                      {/* Department Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                          {/* <IntlMessages id="field.FieldNameLabel" /> */}
                          سکتور نوم/نام سکتور
                        </Label>

                        <Field className="form-control" name="sectorName" />
                        {errors.sectorName && touched.sectorName ? (
                          <div className="invalid-feedback d-block">
                            {errors.sectorName}
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

export default SectorRegister;
