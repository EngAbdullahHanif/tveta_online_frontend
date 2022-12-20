import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';



// Year  and SHift

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

const LevelOfEdcationOptions = [
  { value: '1', label: 'اصلی' },
  { value: '2', label: 'فرعی' },
];

const FieldOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA'},
  { value: 'PHD', label: 'Mechenical Engineering' },
];

const SemesterOptions = [
  { value: '1', label: <IntlMessages id="marks.SemesterOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SemesterOption_2" /> },
  // { value: '3', label: <IntlMessages id="marks.SemesterOption_3" /> },
  //   { value: '4', label: <IntlMessages id="marks.SemesterOption_4" /> },
  
];

const SectionOptions = [
  { value: '1', label: <IntlMessages id="marks.SectionOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.SectionOption_2" /> },
  { value: '3', label: <IntlMessages id="marks.SectionOption_3" /> },
  { value: '4', label: <IntlMessages id="marks.SectionOption_4" /> },
  { value: '5', label: <IntlMessages id="marks.SectionOption_5" /> },

];

const ClassOptions = [
  { value: '1', label: <IntlMessages id="marks.ClassOption_1" /> },
  { value: '2', label: <IntlMessages id="marks.ClassOption_2" /> },
  { value: '3', label: <IntlMessages id="marks.ClassOption_3" /> },
  { value: '4', label: <IntlMessages id="marks.ClassOption_4" /> },
  { value: '5', label: <IntlMessages id="marks.ClassOption_5" /> },
  { value: '6', label: <IntlMessages id="marks.ClassOption_6" /> },



];

const StudyTimeOptions = [
  { value: '1', label: <IntlMessages id="forms.StudyTimeOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.StudyTimeOption_2" /> },

];

const SubjectOptions = [
  { value: '14th', label: 'Computer Science' },
  { value: 'bachelor', label: 'Agriculture' },
  { value: 'master', label: 'BBA'},
  { value: 'PHD', label: 'Mechenical Engineering' },
];


const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [10, 20, 40, 80];

const MarksRegistration = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);


const [inNext, setIsNext] = useState(true);

  const initialValues = {

    Field: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> },
    Semester: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> },
    Section: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> },
    Subject: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> },
    Class: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> },
    StudyTime: { value: '', label: <IntlMessages id="forms.TazkiraTypeDefaultValue" /> },
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
                  
                    <Row className='m-5'>
                    <Colxx xxs="6" >
                        <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Field"
                        id="Field"
                        value={values.Field}
                        options={FieldOptions}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                         required />    
                      {errors.Field && touched.Field ? (
                        <div className="invalid-feedback d-block">
                          {errors.Field}
                        </div>
                      ) : null}
                      </FormGroup>

                      
                               <FormGroup className="form-group has-float-label mt-5  ">
                      <Label>
                        <IntlMessages id="forms.StudyTimeLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Semester"
                        id="StudyTime"
                        value={values.StudyTime}
                        options={StudyTimeOptions}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                         required />    
                      {errors.StudyTime && touched.StudyTime ? (
                        <div className="invalid-feedback d-block">
                          {errors.StudyTime}
                        </div>
                      ) : null}
                      </FormGroup>



                            <FormGroup className="form-group has-float-label mt-5">
                      <Label>
                        <IntlMessages id="marks.SectionLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Section"
                        id="Section"
                        value={values.Section}
                        options={SectionOptions}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                         required />    
                      {errors.Section && touched.Section ? (
                        <div className="invalid-feedback d-block">
                          {errors.Section}
                        </div>
                      ) : null}
                      </FormGroup>
                                        
                                      
                                      </Colxx>
                                      

                    <Colxx xxs="6">
                             <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="marks.ClassLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Class"
                        id="Class"
                        value={values.Class}
                        options={ClassOptions}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                         required />    
                      {errors.Class && touched.Class ? (
                        <div className="invalid-feedback d-block">
                          {errors.Class}
                        </div>
                      ) : null}
                      </FormGroup>


                                 <FormGroup className="form-group has-float-label mt-5  ">
                      <Label>
                        <IntlMessages id="marks.SemesterLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Semester"
                        id="Semester"
                        value={values.Semester}
                        options={SemesterOptions}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                         required />    
                      {errors.Semester && touched.Semester ? (
                        <div className="invalid-feedback d-block">
                          {errors.Semester}
                        </div>
                      ) : null}
                      </FormGroup>



                      <FormGroup className="form-group has-float-label mt-5">
                      <Label>
                        <IntlMessages id="marks.SubjectLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Subject"
                        id="Subject"
                        value={values.Subject}
                        options={SubjectOptions}
                        onChange={setFieldValue }
                        onBlur={setFieldTouched}
                         required />    
                      {errors.Subject && touched.Subject ? (
                        <div className="invalid-feedback d-block">
                          {errors.Subject}
                        </div>
                      ) : null}
                      </FormGroup>

                
                         <Button onClick={() => handleClick(false)} className="float-right " style={{marginTop:'15%'}} >
                    <IntlMessages id="button.Next" /></Button>
                                      
                      </Colxx>
                     
                   
                                   
                  </Row>
                 
                                  
                ) : (
                    <>
                     
                                 
                      <Row   className='border border me-5 p-1 ' style={{marginInline:'16%'}}>
                        <Colxx xxs='2'>
                         <Label>
                        <IntlMessages id="forms.FieldLabel" />
                      </Label>
                            <h6>کمپیوتر ساینس</h6>       
                        </Colxx>

                              <Colxx xxs='2'>
                         <Label>
                         <IntlMessages id="marks.ClassLabel" />
                      </Label>
                            <h6>یوولسم/ یازدهم</h6>       
                        </Colxx>

                        
                              <Colxx xxs='2'>
                         <Label>
                          <IntlMessages id="forms.StudyTimeLabel" />
                      </Label>
                            <h6>شپې/ شبانه</h6>       
                        </Colxx>

                               <Colxx xxs='2'>
                         <Label>
                               <IntlMessages id="marks.SemesterLabel" />
                      </Label>
                            <h6>لومړی/ اول</h6>       
                        </Colxx>

                            <Colxx xxs='2'>
                         <Label>
                               <IntlMessages id="marks.SectionLabel" />
                      </Label>
                            <h6>الف</h6>       
                        </Colxx>

                           <Colxx xxs='2'>
                         <Label>
                               <IntlMessages id="marks.SubjectLabel" />
                      </Label>
                            <h6>اساسات</h6>       
                        </Colxx>


                      </Row>

                     
                      <Row className='justify-content-center  border border' style={{marginInline:'16%' ,
                  }}>
                        <table className='table'>
                          
                           <thead className='thead-dark'><tr>
                                <th scope="col"><IntlMessages id="marks.No"/></th>
                                <th scope="col"><IntlMessages id="marks.FullName"/></th>
                                <th scope="col"><IntlMessages id="marks.FatherName"/></th>
                                <th scope="col"><IntlMessages id="marks.ID"/></th>
                                <th scope="col"><IntlMessages id="marks.Marks"/></th>
                             </tr>
                          </thead>
                        </table>
                      </Row>
                      
                    <Row className='justify-content-center  border border' style={{marginInline:'16%' ,
                    height: '30rem',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                  }}>

               

                          <table class="table " >
                            <tbody className='border border ' style={{
                    height: '200px',
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                  }}>
                              <tr>
                                <th scope="row">1</th>
                                <td>Samiullah</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                          
                               <div class="form-group mx-sm-3 mb-2">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="number" class="form-control" id="inputPassword2" placeholder="marks"/>
  </div>
                          
                              </tr>
                              <tr>
                               <th scope="row">2</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                    <div class="form-group mx-sm-3 mb-2">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="number" class="form-control" id="inputPassword2" placeholder="marks"/>
  </div>
                              </tr>
                              <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>
                                <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>    <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>      
                                <td>the Bird</td>
                                <td>@twitter</td>
                                                                              
                                <div class="form-group mx-sm-3 mb-2">
                                  <label for="inputPassword2" class="sr-only">Password</label>
                                  <input type="number" class="form-control" id="inputPassword2" placeholder="marks" />
                                  </div>
                            </tr>
                            
                          </tbody>
                        </table>    
                        

                        
                      </Row> 
                      <Row className='justify-content-center  border border' style={{
                        marginInline: '16%'
                      }}>
                        <table class="table "> 
                      
                          <tbody>
                            <tr>
                                <td></td>      
                                <td></td>
                            <td></td>
                                <td></td>
                            </tr>

                          </tbody>
                           <tfoot className='thead-dark'><tr>
                                <th scope="col"><IntlMessages id="marks.No"/></th>
                                <th scope="col"><IntlMessages id="marks.FullName"/></th>
                                <th scope="col"><IntlMessages id="marks.FatherName"/></th>
                                <th scope="col"><IntlMessages id="marks.ID"/></th>
                                <th scope="col"><IntlMessages id="marks.Marks"/></th>
                             </tr>
                          </tfoot>
                        </table>
                      </Row>
                      <Row className=' justify-content-center'>
                        
    
                                  <Colxx xxs='9' className='m-5'>
                        <Button className=' m-4 ' onClick={() => handleClick(true)}>
                          <IntlMessages id='button.Back'/>
                          </Button>
                          


                           <div className="d-flex justify-content-between align-items-center m-4 float-right">
                  <Button
                    className={`btn-shadow btn-multiple-state `}
                    size="lg"
                    type="submit"
                    >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className="label">
                      <IntlMessages id="SubmitButton" />
                    </span>
                  </Button>
                </div>
                        
                        </Colxx>
                                       </Row>
                       </>  
                    
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



