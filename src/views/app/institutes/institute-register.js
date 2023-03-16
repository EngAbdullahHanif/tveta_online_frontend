import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

import callApi from 'helpers/callApi';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
const provinces = [
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
  { value: '1', label: 'دولتی' },
  { value: '1', label: 'شخصی' },
];

const genderOptions = [
  { value: '1', label: 'مرد' },
  { value: '2', label: 'زن' },
];
const servicePath = 'http://localhost:8000';
const instituteApiUrl = `${servicePath}/institute/institute_create`;
//http://localhost:8000/institute/institute_create

const InstituteRegister = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState([]);
  const [initialInstituteName, setInitialInstituteName] = useState('');

  const [initialProvince, setInitialProvince] = useState('');
  const [initialDistrict, setInitialDistrict] = useState('');
  const [initialInstType, setInitialInstType] = useState([]);
  const [initialVillage, setInitialVillage] = useState('');

  const [initialGender, setInitialGender] = useState([]);

  const [isNext, setIsNext] = useState(true);
  const [province, setProvince] = useState({});
  const [instType, setInstType] = useState({});
  const [gender, setGender] = useState({});
  const [] = useState('وتاکئ / انتخاب کنید');

  if (instituteId) {
    useEffect(() => {
      async function fetchInstitute() {
        const { data } = await axios.get(`${instituteApiUrl}/${instituteId}`);
        setInstitute(data);
        console.log(data, 'object of the data');
        setInitialInstituteName(data.name);
        setInitialDistrict(data.district);
        setInitialVillage(data.village);
        const Instprovince = provinces.map((provName) => {
          if (provName.label === data.province) {
            setInitialProvince([provName]);
          }
        });
        const instTypee = instTypeOptions.map((instType) => {
          if (instType.value === data.type) {
            setInitialInstType([instType]);
          }
        });
        const instGender = genderOptions.map((instGender) => {
          if (instGender.value === data.gender) {
            setInitialGender(instGender);
          }
        });
      }
      fetchInstitute();
      setUpdateMode(true);
    }, []);
  }

  // this function is used to update all the state of the fields in case we are updating a record
  function updateFormFields() {}

  const ValidationSchema = Yup.object().shape({
    institute: Yup.string().required(<IntlMessages id="inst.nameErr" />),

    province: updateMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
      : null,

    district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

    village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),

    instType: updateMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="inst.typeErr" />)
      : null,

    gender: updateMode
      ? Yup.object()
          .shape({
            value: Yup.string().required(),
          })
          .nullable()
          .required(<IntlMessages id="institute.gender" />)
      : null,
  });

  const handleClick = (event) => {
    // setIsNext(event);
  };

  // post student record to server
  const postInstituteRecord = async (data) => {
    const response = await callApi('institute/institute_create', 'POST', data);
    if (response.data && response.status === 200) {
      console.log('success message', response.data);
    } else {
      console.log('class error');
    }
  };

  const onRegister = (values) => {
    //console.log('values of the form', values);
    const data = {
      name: values.institute,
      address: `${values.district}, ${values.province.value}`,
      province: values.province.value,
      district: values.district,
      village: values.village,
      type: values.instType.value,
      inst_city_type: '1',
      inst_status: '1', //as it is registered for the first time so it is considered to be active
      inst_climaty: '1',
      school_type: '1',
      language: '1',
      gender: values.gender.value,
      user_id: '1',
    };
    //console.log('data of the form', data);
    postInstituteRecord(data);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="inst.register.title" />}
        </h3>
        <CardBody>
          {isNext ? (
            <Formik
              enableReinitialize={true}
              validateOnMount
              initialValues={{
                institute: initialInstituteName,
                province: initialProvince,
                district: initialDistrict,
                village: initialVillage,
                instType: initialInstType,
                gender: initialGender,
              }}
              validationSchema={ValidationSchema}
              onSubmit={onRegister}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right  error-l-200">
                  <Row className="justify-content-center">
                    <Colxx xxs="6">
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
                          options={provinces}
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
                    </Colxx>
                    <Colxx xxs="6">
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

                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.ProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.ProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* village permanent */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.ProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="forms.ProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center float-right mb-5 mt-3">
                        <Button
                          className="m-4"
                          size="lg"
                          type="submit"
                          color="primary"
                          onClick={() => {
                            handleClick(false);
                          }}
                        >
                          <span className="spinner d-inline-block ">
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

export default InstituteRegister;
