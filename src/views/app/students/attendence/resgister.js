import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';


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
} from '../../../../containers/form-validations/FormikFields';

const SignupSchema = Yup.object().shape({

StdId: Yup.string()
    //  .min(3, <IntlMessages id="forms.StdId" />)
    .required(<IntlMessages id="forms.StdIdErr" />),
  
     StdPresent: Yup.string()
    .required(<IntlMessages id="forms.StdPresentErr" />),
     
    StdAbsent: Yup.string()
    .required(<IntlMessages id="forms.StdAbsentErr" />),
                   
      StdSickness: Yup.string()
      .required(<IntlMessages id="forms.StdSicknessErr" />),
  
    StdNecessaryWork: Yup.string()
      .required(<IntlMessages id="forms.StdNecessaryWorkErr" />),

               
 
});




const StudentAttendance = () => {
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      state: values.state.value,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  

  return (
    <>
      
      <Card>
        <h3 className="mt-5 m-5">{ <IntlMessages id="forms.AttendanceTitle" />}</h3>
                    <CardBody>   
       <Formik
            initialValues={{              
                  }}
                  validationSchema={SignupSchema}
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
                
         
             <Row className='justify-content-center'>
                  <Colxx xxs="10">
                    
                    {/* Student Id */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdIdLabel" />
                      </Label>
                      <Field className="form-control" name="StdId" />
                      {errors.StdId && touched.StdId ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdId}
                        </div>
                      ) : null}
                    </FormGroup>


                    {/*Present  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdPresentLabel" />
                      </Label>
                      <Field className="form-control" name="StdPresent" type='number' />
                      {errors.StdPresent && touched.StdPresent ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdPresent}
                        </div>
                      ) : null}
                    </FormGroup>
                    


                    {/* ABsent */}
                   <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdAbsentLabel" />
                      </Label>
                      <Field className="form-control" name="StdAbsent" type='number' />
                      {errors.StdAbsent && touched.StdAbsent ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdAbsent}
                        </div>
                      ) : null}
                    </FormGroup>
                    

                    {/* Sickness */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdSicknessLabelLabel" />
                      </Label>
                      <Field className="form-control" name="StdSicknessLabel" type='number' />
                      {errors.StdSicknessLabel && touched.StdSicknessLabel ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdSicknessLabel}
                        </div>
                      ) : null}
                    </FormGroup>
                

                    
                    {/* Necessary Work */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdNecessaryWorkLabel" />
                      </Label>
                      <Field className="form-control" name="StdNecessaryWork" type='number' />
                      {errors.StdNecessaryWork && touched.StdNecessaryWork ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdNecessaryWork}
                        </div>
                      ) : null}
                    </FormGroup>
                    
                
                    <Button className="float-right m-3 ">{<IntlMessages id="forms.SubimssionButton"/> }
                    </Button>
                      
                  </Colxx>
                </Row>
              



          </Form>
                  )}
                </Formik>
         
       </CardBody>
                    </Card>
      </>
  );
};

export default StudentAttendance;

