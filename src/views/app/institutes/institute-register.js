import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';

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

const ProvinceOptions = [
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
];

const options = [
  { value: 'Electronic', label: 'الکترونیکی' },
  { value: 'paper', label: 'کاغذی' },
];

const instTypeOptions = [
  { value: '1', label: <IntlMessages id="institute.instTypeOptions_1" /> },
  { value: '2', label: <IntlMessages id="institute.instTypeOptions_2" /> },
];

const genderOptions = [
  { value: '1', label: <IntlMessages id="institute.studentgenderOption_1" /> },
  { value: '2', label: <IntlMessages id="institute.studentgenderOption_2" /> },
  { value: '3', label: <IntlMessages id="institute.studentgenderOption_3" /> },
];

const ValidationSchema = Yup.object().shape({
  institute: Yup.string().required(<IntlMessages id="inst.nameErr" />),

  province: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),

  instType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="inst.typeErr" />),

  gender: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="institute.gender" />),
});

const initialValues = {
  institute: '',
  province: [],
  district: '',
  village: '',
  instType: [],
  gender: [],
};

const InstituteRegister = () => {
  const [province, setProvince] = useState({});
  const [instType, setInstType] = useState({});
  const [gender, setGender] = useState({});
  const [] = useState('وتاکئ / انتخاب کنید');

  const onRegister = (values) => {
    // if (!values.province || values.province.value === '0') {
    //   return;
    // }
    // if (!values.instType || values.instType.value === '0') {
    //   return;
    // }

    // insert the data to the API with Axios here and redirect to the current page
    const data = {
      name: values.institute,
      province: values.province.value,
      district: values.district,
      village: values.village,
      type: values.instType.value,
      // gender: values.gender[0],
    };
    //conver the data to JSON
    // const dataJSON = JSON.stringify(data);

    // console.log('data sent to the server1');

    //send the data to https://localhost:8000/institutes with Axios

    //define content type in the axios header

    axios
      .post('http://localhost:8000/institute/', data)
      .then((response) => {
        console.log(response);

        // window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(data);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="inst.register.title" />}
        </h3>
        <CardBody>
          <Formik
            validateOnMount
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={onRegister}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-right  error-l-200">
                <Row className="justify-content-center">
                  <Colxx xxs="10">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="inst.name" />
                      </Label>
                      <Field className="form-control" name="institute" />
                      {errors.institute && touched.institute && (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.institute}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.ProvinceLabel" />
                      </Label>
                      <FormikReactSelect
                        name="province"
                        id="province"
                        value={values.province}
                        options={ProvinceOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.province && touched.province ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.province}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label error-l-175">
                      <Label>
                        <IntlMessages id="forms.DistrictLabel" />
                      </Label>
                      <Field className="form-control" name="district" />
                      {errors.district && touched.district ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.district}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* village permanent */}
                    <FormGroup className="form-group has-float-label ">
                      <Label>
                        <IntlMessages id="forms.VillageLabel" />
                      </Label>
                      <Field className="form-control" name="village" />
                      {errors.village && touched.village ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.village}
                        </div>
                      ) : null}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="inst.type" />
                      </Label>
                      <FormikReactSelect
                        name="instType"
                        id="instType"
                        value={values.instType}
                        options={instTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.instType && touched.instType ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.instType}
                        </div>
                      ) : null}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="gender" />
                      </Label>
                      <FormikReactSelect
                        name="gender"
                        id="gender"
                        value={values.gender}
                        options={genderOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.gender && touched.gender ? (
                        <div className="invalid-feedback d-block bg-danger text-white">
                          {errors.gender}
                        </div>
                      ) : null}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center float-right">
                      <Button
                        className="m-4"
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
                    </div>
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

export default InstituteRegister;
