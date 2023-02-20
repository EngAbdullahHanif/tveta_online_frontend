import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

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
import { FormikReactSelect } from 'containers/form-validations/FormikFields';



const ValidationSchema = Yup.object().shape({
  departmentName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="departmentNameErr" />),

    departmentField:  Yup.object()
    .shape({
       value: Yup.string().required(),
      }).nullable().required(<IntlMessages id="departmentFieldErr" />),


      departmentEnglishName: Yup.string()
    .min(3, <IntlMessages id="min.minInputValue" />)
    .max(50, <IntlMessages id="max.maxInputValue" />)
    .required(<IntlMessages id="departmentEnglishNameErr" />),
});



const StudentRegistraion = () => {

  // worker's field initiliazation
  const initialValues = {
   departmentField: [],
   departmentName: '',
   departmentEnglishName: ''
    
  };

  // state varibales are going to be set to defaul values
  const [isNext, setIsNext] = useState(true);
  const [workerProvince, setWorkerProvince] = useState( [
    { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
    { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
    { value: '3', label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" /> },
    { value: '4', label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" /> },
    { value: '5', label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" /> },
    { value: '6', label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" /> },
    { value: '7', label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" /> },
    { value: '8', label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" /> },
    { value: '9', label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" /> },
    {
      value: '10',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
    },
    {
      value: '11',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
    },
    {
      value: '12',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
    },
    {
      value: '13',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
    },
    {
      value: '14',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
    },
    {
      value: '15',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
    },
    {
      value: '16',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
    },
    {
      value: '17',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
    },
    {
      value: '18',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
    },
    {
      value: '19',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
    },
    {
      value: '20',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
    },
    {
      value: '21',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
    },
    {
      value: '22',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
    },
    {
      value: '23',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
    },
    {
      value: '24',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
    },
    {
      value: '25',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
    },
    {
      value: '26',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
    },
    {
      value: '27',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
    },
    {
      value: '28',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
    },
    {
      value: '29',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
    },
    {
      value: '30',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
    },
    {
      value: '31',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
    },
    {
      value: '32',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
    },
    {
      value: '33',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
    },
    {
      value: '34',
      label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
    },
  ]);
  const [workerAppointedType, setworkerAppointedType] = useState([
    {
    value: 1,
    label: 'حکمی'
    },
    {
      value: 2,
      label: 'رقابتی'
    }
]);
const [workerGender, setWorkerGender] = useState([
  {
  value: 1,
  label: 'مرد'
  },
  {
    value: 2,
    label: 'زن'
  }
]);

const [workerGrade, setworkerGrade] = useState([
  {
  value: 1,
  label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
    },
    {
      value: 4,
      label: '4'
    },
    {
      value: 5,
      label: '5'
      },
      {
        value: 6,
        label: '6'
      },
      {
        value: 7,
        label: '7'
        },
        {
          value: 8,
          label: '8'
        },
        {
          value: 9,
          label: 'مافوق'
        },

]);

const [workerTashkilGrade, setworkerTashkilGrade] = useState([
  {
  value: 1,
  label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
    },
    {
      value: 4,
      label: '4'
    },
    {
      value: 5,
      label: '5'
      },
      {
        value: 6,
        label: '6'
      },
      {
        value: 7,
        label: '7'
        },
        {
          value: 8,
          label: '8'
        },
        {
          value: 9,
          label: 'مافوق'
        },

]);

const [workerGradeType, setWorkerGradeType] = useState([
  {
  value: 1,
  label: 'مامور'
  },
  {
    value: 2,
    label: 'اجیر'
  }
]);

// hardCoded data

const [departmentField, SetdepartmentField] = useState([{
    value: '1',
    label: 'طب'
},
{
    value: '2',
    label: 'انجینری'
},
{
    value: '3',
    label: 'کمپیوتر ساینس'
},
{
    value: '4',
    label: 'اقتصاد'
}
])


 // after submitting the form
  const handleClick = (event) => {
     //setIsNext(event);
  };

  // when form is submitted
  const onRegister = (values) => {
    console.log('values', values);
  };

  useEffect(() => {

  }, []);



  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="departmentRegistration" />}
        </h3>
        <CardBody>
          {isNext == true ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,  
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right">
                  <Row>
                    <Colxx xxs="6">

                        {/* fields */}
                    <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="departmentField" />
                        </Label>
                        <FormikReactSelect
                          name="departmentField"
                          id="departmentField"
                          value={values.departmentField}
                          options={departmentField}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.departmentField && touched.departmentField ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentField}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department Name */}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="departmentName" />
                        </Label>
                        <Field className="form-control" name="departmentName"/>
                        {errors.departmentName && touched.departmentName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentName}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Department English Name  */}

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label>
                          <IntlMessages id="departmentEnglishName" />
                        </Label>
                        <Field className="form-control" name="departmentEnglishName"/>
                        {errors.departmentEnglishName && touched.departmentEnglishName ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.departmentEnglishName}
                          </div>
                        ) : null}
                      </FormGroup>                        
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx>
                      <Button
                        color="primary"
                        className="float-right m-5"
                        size="lg"
                        type="submit"
                        onClick={() => {
                          handleClick(false);
                        }}
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
            <div className="wizard-basic-step text-center pt-3">
              <div>
                <h1 className="mb-2">
                  <IntlMessages id="wizard.content-thanks" />
                </h1>
                <h3>
                  <IntlMessages id="wizard.registered" />
                </h3>
                <Button className="m-5 bg-primary">
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

export default StudentRegistraion;
