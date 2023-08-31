import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
  Row,
  Card,
  CardBody,
  // Form,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
const ValidationSchema = Yup.object().shape({
  groupName: Yup.string().required(<IntlMessages id="group.groupNameErr" />),
});

const GroupRegister = () => {
  const [isNext, setIsNext] = useState(false);
  const onRegister = (values, { resetForm }) => {
    console.log(values, 'Value');
    setIsNext(true);
    resetForm();
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="groug.register.title" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={{
                groupName: '',
              }}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({ errors, touched, values, resetForm }) => (
                <Form className="av-tooltip tooltip-label-right error-l-100">
                  <Row className="justify-content-center">
                    <Colxx xxs="8" style={{ marginTop: '8%' }}>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="group.groupName" />
                        </Label>
                        <Field className="form-control" name="groupName" />
                        {errors.groupName && touched.groupName && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.groupName}
                          </div>
                        )}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    {' '}
                    <Colxx
                      xxs="10"
                      style={{
                        marginLeft: '3%',
                        marginBottom: '8%',
                      }}
                    >
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
export default GroupRegister;
