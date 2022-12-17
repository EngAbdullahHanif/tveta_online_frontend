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
} from '../../../containers/form-validations/FormikFields';

const SignupSchema = Yup.object().shape({


        FieldId: Yup.string()
      .required(<IntlMessages id="field.FieldIdErr" />),
  
FieldName: Yup.string()
    //  .min(3, <IntlMessages id="forms.StdId" />)
    .required(<IntlMessages id="field.FieldNameErr" />),

     
    FieldEngName: Yup.string()
    .required(<IntlMessages id="field.FieldEngNameErr" />),

               
 
});






const FieldRegister = () => {
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
        <h3 className="mt-5 m-5">{ <IntlMessages id="field.FieldRegisterTitle" />}</h3>
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


                     {/* Field ID */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="field.FieldIdLabel" />
                      </Label>
                    
                      <Field className="form-control" name="FieldId" />
                      {errors.FieldId && touched.FieldId ? (
                        <div className="invalid-feedback d-block">
                          {errors.FieldId}
                        </div>
                      ) : null}
                    </FormGroup>

                       {/* Field Name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="field.FieldNameLabel" />
                      </Label>
                    
                      <Field className="form-control" name="FieldName" />
                      {errors.FieldName && touched.FieldName ? (
                        <div className="invalid-feedback d-block">
                          {errors.FieldName}
                        </div>
                      ) : null}
                    </FormGroup>

                    
                    
                    {/* Field Name In English */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="field.FieldEngNameLabel" />
                      </Label>
                      <Field className="form-control" name="FieldEngName" />
                      {errors.FieldEngName && touched.FieldEngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.FieldEngName}
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

export default FieldRegister ;

