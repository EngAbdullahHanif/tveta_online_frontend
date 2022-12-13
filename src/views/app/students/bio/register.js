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
  StdName: Yup.string()
     .min(3, <IntlMessages id="forms.nameChar" />)
    .required(<IntlMessages id="forms.nameerror" />),
  
  StdEngName: Yup.string()
    // .min('ستاسو انګریزی نوم سم ندی/ نام انگلسی شما اشتبا است')
    .required(<IntlMessages id="forms.englishNameError" />),   
  
   StdFatherName: Yup.string()
    // .min('ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.StdFatherNameError" />),
   
  StdFatherEngName: Yup.string()
    // .min('ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.FatherEnglishNameErr" />),
  
    StdFatherDuty: Yup.string()
    // .min('ستاسو دپلار نوم سم ندی/ نام پدر شما اشتباه است')
    .required(<IntlMessages id="forms.StdFatherDutyErr" />),

       StdFatherDutyLocation: Yup.string()
    .required(<IntlMessages id="forms.StdFatherDutyLocationErr" />),

        StdDoB: Yup.date()
    .required(<IntlMessages id="forms.StdDoBErr" />),
  

  
  
 
});

const options = [
  { value: 'Electronic', label: 'الکترونیکی' },
  { value: 'paper', label: 'کاغذی', },

];







const FormikCustomWithTopLabels = () => {
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
  const [isNext, setIsNext] = useState(false);
  const [IdCard, setIdCard] = useState(null);

  const handleClick = (event) => {
     setIsNext(event);
  };
  

  return (
    <>
      
      <Card>
        <h3 className="mt-5 m-5">{ <IntlMessages id="forms.title" />}</h3>
                    <CardBody>   
       <Formik
            initialValues={{
              state: { value: 'Electronic', label: <IntlMessages id="forms.TazkiraTypeDefaultValue"/>} 
            
                 
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
                
            {!isNext ? (

                  <Row  className="mb-4">
                  <Colxx xxs="6">

                      {/* Name */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdName" />
                      </Label>
                      <Field className="form-control" name="StdName" />
                      {errors.StdName && touched.StdName? (
                        <div className="invalid-feedback d-block">
                          {errors.StdName}
                        </div>
                      ) : null}
                      </FormGroup>

                      {/* Father Name */}
                       <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdFatherName" />
                      </Label>
                      <Field className="form-control" name="StdFatherName" />
                      {errors.StdFatherName && touched.StdFatherName ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdFatherName}
                        </div>
                      ) : null}
                      </FormGroup>

                         {/* Father Duty */}
                       <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdFatherDutyLabel" />
                      </Label>
                      <Field className="form-control" name="StdFatherDuty" />
                      {errors.StdFatherDuty && touched.StdFatherDuty ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdFatherDuty}
                        </div>
                      ) : null}
                      </FormGroup>

                      
                      {/* DOB */}
                    <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="forms.StdDoBLabel" />
                      </Label>
                      <FormikDatePicker
                        name="StdDoB"
                        value={values.StdDoB}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.StdDoB && touched.StdDoB ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdDoB}
                        </div>
                      ) : null}
                      </FormGroup>

                      
                      {values.state.value === 'paper' ? (
                        // Tazkira number
                        <div>
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                        </FormGroup>

                          {/* Jold */}
                           <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.name" />
                      </Label>
                      <Field className="form-control" name="name" />
                      {errors.name && touched.name ? (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      ) : null}
                      </FormGroup>)
                        </div>
                        )
                        : (
                            // Tazkira number
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                        </FormGroup>
                         
                        )}
    
                       <div className='square border border-dark p-3 '>
                        <h6 className='p- mb-4'> اوسنی ادرس/ ادرس فعلی</h6>

                      {/* ////////////////////////////////////////////////////////// */}
                      {/* Perment Address */}
                      {/* province */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                        </FormGroup>
                         

                            {/* District */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                      </FormGroup>
                      
                      
                            {/* village */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                        </FormGroup>

                        </div>
                      


                      

                        
                      
                    


  

                    
                        




        


                    </Colxx> 
                    


                    <Colxx xxs="6">

                      <div>  
                      {/* Student English Name */}
                      <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="StdEngName" />
                      {errors.StdEngName && touched.StdEngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdEngName}
                        </div>
                      ) : null}
                      </FormGroup>

                        

                          {/*Students Father English Name */}
                      <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Std_father_Eng_Name" />
                        
                      </Label>
                      <Field className="form-control" name="StdFatherEngName" />
                      {errors.StdFatherEngName && touched.StdFatherEngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdFatherEngName}
                        </div>
                      ) : null}
                      </FormGroup>

                         {/* Father duty place */}
                       <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdFatherDutyLocationLabel" />
                      </Label>
                      <Field className="form-control" name="StdFatherDutyLocation" />
                      {errors.StdFatherDutyLocation && touched.StdFatherDutyLocation ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdFatherDutyLocation}
                        </div>
                      ) : null}
                      </FormGroup>
                      
                     {/*Tazkira Type  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.tazkira" />
                      </Label>
                      <FormikReactSelect
                        name="state"
                        id="state"
                        value={values.state}
                        options={options}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                          />    
                
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">
                          {errors.state}
                        </div>
                      ) : null}
                        </FormGroup>
                      
                    

             

                      
 


                      {values.state.value === 'paper' ? (
                        //  Sfha
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.tazkira" />
                      </Label>
                      <FormikReactSelect
                        name="state"
                        id="state"
                        value={values.state}
                        options={options}
                        onChange={setFieldValue && setIdCard=== setFieldValue }
                        onBlur={setFieldTouched}
                          />
                          <div>{}</div>
                      {errors.state && touched.state ? (
                        <div className="invalid-feedback d-block">
                          {errors.state}
                        </div>
                      ) : null}
                        </FormGroup>
                        // Di sakok Number
                      ) : (
                          <div></div>
                        )}



                        <div className='square border border-dark p-3'>
                          <h6 className='p-3'>دایمی ادرس/ ادرس دایمی</h6>
                    
                          {/* province */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                        </FormGroup>
                         
                      
                      {/* Current address */}
                            {/* District */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                      </FormGroup>
                      
                      
                            {/* village */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.Eng_name" />
                        
                      </Label>
                      <Field className="form-control" name="EngName" />
                      {errors.EngName && touched.EngName ? (
                        <div className="invalid-feedback d-block">
                          {errors.EngName}
                        </div>
                      ) : null}
                          </FormGroup>
                                
                        </div>
                      </div>


                        <Button onClick={() => handleClick(true)} className="float-right mt-5 ">مخته / بعدی</Button>
                      </Colxx>   
                 </Row>
            ) : (
          
          <Row>
                      <Colxx xxs="6">
                        

                        {/* درجه تحصیل */}
                     <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.email" />
                      </Label>
                      <Field className="form-control" name="email" />
                      {errors.email && touched.email ? (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      ) : null}
                        </FormGroup>

                                     {/* Student Maktab*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>


                                         {/* Study type*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>




                                               {/* internse type*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>



                        
                                               {/* Documents Upload*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>



                        


                         

                        
                          <Button onClick={() => handleClick(false)} className="m-2">شاته/ عقب</Button> 
                        
                         
                      </Colxx>     
                      <Colxx xxs="6">
                        

                        {/* سال فراغت */}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>
                        

                        
                        {/*School province*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>
                        

                              {/*School province*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>
                        

                              {/*Student Type*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                        </FormGroup>
                        


                                  {/* Student photo*/}
                      <FormGroup className="form-group has-float-label">
                      <Label className="d-block">
                        <IntlMessages id="form-components.date" />
                      </Label>
                      <FormikDatePicker
                        name="date"
                        value={values.date}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.date && touched.date ? (
                        <div className="invalid-feedback d-block">
                          {errors.date}
                        </div>
                      ) : null}
                      </FormGroup>
                        
                        <Button onClick={() => handleClick(false)} className="float-right m-2">ثبت</Button>
                         
                      </Colxx> 
                      
                     

                                           
  </Row>    
            )}
          </Form>
                  )}
                </Formik>
         
       </CardBody>
                    </Card>
      </>
  );
};

export default FormikCustomWithTopLabels;

