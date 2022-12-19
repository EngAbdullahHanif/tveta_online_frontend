import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';

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
import userEvent from '@testing-library/user-event';

const subjectOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];






const MarksRegistration = () => {
const [inNext, setIsNext] = useState(true);

  const initialValues = {
    subjectType: { value: '0', label: 'وتاکئ / انتخاب کنید' },
    systemType: { value: '0', label: 'وتاکئ / انتخاب کنید' },
  };

     const handleClick = (event) => {
     setIsNext(event);
  };


  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="subject.register.title" />}
        </h3>
        <CardBody>
          <Formik
                      initialValues={initialValues}>
                      
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                              
                              {inNext ? (
                                  <Row>
                                      <Colxx xxs="6">
                                          <div>
                                              First
                                          </div>
                                      
                                      </Colxx>
                                      

                                      <Colxx xxs="6">
                                            <div>
                                          Second
                                          </div>
                                      
                                      </Colxx>
                                      <Button onClick={handleClick(false)}>
                                          First Page
                                      </Button>
                                  
                              </Row>
                                  
                              ) : (
                                      
                                      <Row>
                                          
                                      <Colxx xxs="6">
                                            <div>
                                         First
                                          </div>
                                          </Colxx>

                                             <Colxx xxs="6">
                                            <div>
                                  Second
                                          </div>
                                          </Colxx>
                                            <Button onClick={handleClick(false)}>
                                       Second Page
                                      </Button>
                                  
                              </Row>
                                      
                              )
                              }
                                
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default MarksRegistration;





               
                // <FormGroup className="form-group has-float-label">
                //   <Label>
                //     <IntlMessages id="subject.name" />
                //   </Label>
                //   <Field
                //     className="form-control"
                //     name="subjectName"
               
                //   />
                //   {errors.subjectName && touched.subjectName && (
                //     <div className="invalid-feedback d-block">
                //       {errors.subjectName}
                //     </div>
                //   )}
                // </FormGroup>

                // <FormGroup className="form-group has-float-label">
                //   <Label>
                //     <IntlMessages id="subject.english_name" />
                //   </Label>
                //   <Field
                //     className="form-control"
                //     name="englishName"
                //     // validate={validateenglishName}
                //   />
                //   {errors.englishName && touched.englishName && (
                //     <div className="invalid-feedback d-block">
                //       {errors.englishName}
                //     </div>
                //   )}
                // </FormGroup>

                // <FormGroup className="form-group has-float-label">
                //   <Label>
                //     <IntlMessages id="subject.code" />
                //   </Label>
                //   <Field
                //     type="number"
                //     className="form-control"
                //     name="subjectCode"
                //     // validate={validatesubjectCode}
                //   />
                //   {errors.subjectCode && touched.subjectCode && (
                //     <div className="invalid-feedback d-block">
                //       {errors.subjectCode}
                //     </div>
                //   )}
                // </FormGroup>

                // <FormGroup className="form-group has-float-label">
                //   <Label>
                //     <IntlMessages id="subject.credits" />
                //   </Label>
                //   <Field
                //     type="number"
                //     className="form-control"
                //     name="credits"
                //     // validate={validatecredits}
                //   />
                //   {errors.credits && touched.credits && (
                //     <div className="invalid-feedback d-block">
                //       {errors.credits}
                //     </div>
                //   )}
                // </FormGroup>

                // <FormGroup className="form-group has-float-label">
                //   <Label>
                //     <IntlMessages id="subject.type" />
                //   </Label>
                //   <FormikReactSelect
                //     name="subjectType"
                //     id="subjectType"
                //     value={values.subjectType}
                //     options={subjectOptions}
                //     onChange={setFieldValue}
                //     onBlur={setFieldTouched}
                //   />
                //   {errors.subjectType && touched.subjectType ? (
                //     <div className="invalid-feedback d-block">
                //       {errors.subjectType}
                //     </div>
                //   ) : null}
                // </FormGroup>

              

                // <div className="d-flex justify-content-between align-items-center">
                //   <Button
                //     color="primary"
                //     className={`btn-shadow btn-multiple-state`}
                //     size="lg"
                //     type="submit"
                //   >
                //     <span className="spinner d-inline-block">
                //       <span className="bounce1" />
                //       <span className="bounce2" />
                //       <span className="bounce3" />
                //     </span>
                //     <span className="label">
                //       <IntlMessages id="subject.register" />
                //     </span>
                //   </Button>
                // </div>

