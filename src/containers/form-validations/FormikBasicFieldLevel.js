import React from 'react';
import { Formik, Form, Field } from 'formik';

import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';

const FormikBasicFieldLevel = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'لطفا پست الکترونیکی خودتو وارد کن';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'ایمیل که وارد کردی نامعتبره';
    }
    return error;
  };

  const validateName = (value) => {
    let error;
    if (!value) {
      error = 'لطفا اسمت رو وارد کن';
    } else if (value.length < 2) {
      error = 'باید بیشتر از 2 تا کاراکتر باشه';
    }
    return error;
  };

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">اعتبار سنجی فیلدها</h6>
            <Formik
              initialValues={{
                name: '',
                email: '',
              }}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <FormGroup>
                    <Label>نام</Label>
                    <Field
                      className="form-control"
                      name="name"
                      validate={validateName}
                    />
                    {errors.name && touched.name && (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <Label>پست الکترونیک</Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>

                  <Button color="primary" type="submit">
                    ارسال فرم
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};

export default FormikBasicFieldLevel;
