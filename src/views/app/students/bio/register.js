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
        
            StdTazkiraNo: Yup.string()
    .required(<IntlMessages id="forms.StdTazkiraNoErr" />),
            
             StdIdCardPageNo: Yup.string()
    .required(<IntlMessages id="forms.StdIdCardPageNoErr" />),
             
                         StdIdCardCover: Yup.string()
    .required(<IntlMessages id="forms.StdIdCardCoverErr" />),
                         
    StdIdCardSakukNo: Yup.string()
    .required(<IntlMessages id="forms.StdIdCardSakukNoErr" />),

        Province: Yup.string()
    .required(<IntlMessages id="forms.ProvinceErr" />),
        
           District: Yup.string()
    .required(<IntlMessages id="forms.DistrictErr" />),
           
                   Village: Yup.string()
    .required(<IntlMessages id="forms.VillageErr" />),
                   
                           C_Province: Yup.string()
    .required(<IntlMessages id="forms.ProvinceErr" />),
        
           C_District: Yup.string()
    .required(<IntlMessages id="forms.DistrictErr" />),
           
                   C_Village: Yup.string()
    .required(<IntlMessages id="forms.VillageErr" />),
                                    StdPlaceOfBirth: Yup.string()
    .required(<IntlMessages id="forms.StdPlaceOfBirthErr" />),
                
 
});

const options = [
  { value: 'Electronic', label: <IntlMessages id="forms.StdTazkiraElectronic" />  },
  { value: 'paper', label: <IntlMessages id="forms.StdTazkiraPaper" />  },

];

const EducationLevelOptions =  [
  { value: '9th', label: <IntlMessages id="forms.EducationalLevel_9th" />  },
  { value: '10th', label: <IntlMessages id="forms.EducationalLevel_10th" /> },
    { value: '11th', label: <IntlMessages id="forms.EducationalLevel_11th" />  },
  { value: '12th', label: <IntlMessages id="forms.EducationalLevel_12th" /> },  
      { value: '13th', label: <IntlMessages id="forms.EducationalLevel_13th" />  },
  { value: '14th', label: <IntlMessages id="forms.EducationalLevel_14th" /> }, 
];





const StudentRegistraion = () => {
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
              state: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> } ,
              EducationLevel: { value: '', label: <IntlMessages id="forms.EducationLevelDefaultValue"/>} 
            
                 
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
                
            {!isNext? (
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


                         {/*Tazkira Type  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.TazkiraType" />
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
                        <div>
                          {/* Safha */}
                          <div>
                            <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdIdCardPageNoLabel" />
                      </Label>
                      <Field className="form-control" name="StdIdCardPageNo" />
                      {errors.StdIdCardPageNo && touched.StdIdCardPageNo ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdIdCardPageNo}
                        </div>
                      ) : null}
                          </FormGroup> 
                          </div>
                          

                        </div>
                        )
                        : (
               
                          <div></div>
                        )}
    
                       <div className='square border border-dark p-3 '>
                        <h6 className=' mb-4'> اوسنی ادرس/ ادرس فعلی</h6>

                      {/* ////////////////////////////////////////////////////////// */}
                      {/* Perment Address */}
                      {/* province */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.ProvinceLabel" />
                        
                      </Label>
                      <Field className="form-control" name="C_Province" />
                      {errors.C_Province && touched.C_Province ? (
                        <div className="invalid-feedback d-block">
                          {errors.C_Province}
                        </div>
                      ) : null}
                        </FormGroup>
                         

                            {/* District */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.DistrictLabel" />
                        
                      </Label>
                      <Field className="form-control" name="C_District" />
                      {errors.C_District && touched.C_District ? (
                        <div className="invalid-feedback d-block">
                          {errors.C_District}
                        </div>
                      ) : null}
                      </FormGroup>
                      
                      
                            {/* village */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.VillageLabel" />
                        
                      </Label>
                      <Field className="form-control" name="C_Village" />
                      {errors.C_Village && touched.C_Village ? (
                        <div className="invalid-feedback d-block">
                          {errors.C_Village}
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
                        
                         <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.PlaceOfBirthLabel" />
                      </Label>
                      <Field className="form-control" name="StdPlaceOfBirth" />
                      {errors.StdPlaceOfBirth ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdPlaceOfBirth}
                        </div>
                      ) : null}
                      </FormGroup>
                      
              
                      
                        {values.state.value === 'paper' ? (


                          <div>
                                         {/* // Tazkira number */}
                   <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.StdTazkiraNoLabel" />
                        
                      </Label>
                      <Field className="form-control" name="StdTazkiraNo" />
                      {errors.StdTazkiraNo && touched.StdTazkiraNo ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdTazkiraNo}
                        </div>
                      ) : null}
                            </FormGroup>

                           {/* Jold */}
                           <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdIdCardCoverLabel" />
                      </Label>
                      <Field className="form-control" name="StdIdCardCover" />
                      {errors.StdIdCardCover && touched.StdIdCardCover ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdIdCardCover}
                        </div>
                      ) : null}
                      </FormGroup>    




                            {/* Sakuk Number */}
                      <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.StdIdCardSakukNoLabel" />
                      </Label>
                      <Field className="form-control" name="StdIdCardSakukNo" />
                      {errors.StdIdCardSakukNo && touched.StdIdCardSakukNo ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdIdCardSakukNo}
                        </div>
                      ) : null}
                      </FormGroup>
                           </div>
                      ) : (
                            <div>
                                                         {/* // Tazkira number */}
                   <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.StdTazkiraNoLabel" />
                        
                      </Label>
                      <Field className="form-control" name="StdTazkiraNo" />
                      {errors.StdTazkiraNo && touched.StdTazkiraNo ? (
                        <div className="invalid-feedback d-block">
                          {errors.StdTazkiraNo}
                        </div>
                      ) : null}
                        </FormGroup> 
                          </div>
                        )}
                        <div className='square border border-dark p-3'>
                          <h6 className=' mb-4'>دایمی ادرس/ ادرس دایمی</h6>

                       {/* Current address */}
                          {/* province */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.ProvinceLabel" />
                      </Label>
                      <Field className="form-control" name="Province" />
                      {errors.Province && touched.Province ? (
                        <div className="invalid-feedback d-block">
                          {errors.Province}
                        </div>
                      ) : null}
                        </FormGroup>
                         
                      
                   
                            {/* District */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.DistrictLabel" />
                        
                      </Label>
                      <Field className="form-control" name="District" />
                      {errors.District && touched.District ? (
                        <div className="invalid-feedback d-block">
                          {errors.District}
                        </div>
                      ) : null}
                      </FormGroup>
                      
                      
                            {/* village */}
                        <FormGroup className="form-group has-float-label">
                      <Label>
                          <IntlMessages id="forms.VillageLabel" />
                        
                      </Label>
                      <Field className="form-control" name="Village" />
                      {errors.Village && touched.Village ? (
                        <div className="invalid-feedback d-block">
                          {errors.Village}
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
                        
                        {/* درجه تحصیل*/}
                          {/*Tazkira Type  */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.EducationLevelLabel" />
                      </Label>
                      <FormikReactSelect
                        name="EdactionLevel"
                        id="EducationLevel"
                        value={values.EducationLevel}
                        options={EducationLevelOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                          />    
                
                      {errors.EducationLevel && touched.EducationLevel ? (
                        <div className="invalid-feedback d-block">
                          {errors.EducationLevel}
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

export default StudentRegistraion;

