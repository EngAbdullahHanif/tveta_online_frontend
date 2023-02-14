import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './dorm-register.css';
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
  Input,
} from 'reactstrap';
import Select from 'react-select';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';

const servicePath = 'http://localhost:8000';
const dormCreateAPI = `${servicePath}/institute/dorms_create/`;

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { useEffect } from 'react';

const GenderOptions = [
  { value: '1', label: <IntlMessages id="dorm.GenderOptions_1" /> },
  { value: '2', label: <IntlMessages id="dorm.GenderOptions_2" /> },
  { value: '3', label: <IntlMessages id="dorm.GenderOptions_3" /> },
];
const BuildingTypeOptions = [
  { value: '1', label: <IntlMessages id="dorm.BuildingTypeOptions_1" /> },
  { value: '2', label: <IntlMessages id="dorm.BuildingTypeOptions_2" /> },
];

const PublicBuildingOwnerOptions = [
  {
    value: '1',
    label: <IntlMessages id="dorm.PublicBuildingOwnerLabelOption_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="dorm.PublicBuildingOwnerLabelOption_2" />,
  },
];

const PrivateBuildingTypeOptions = [
  {
    value: '1',
    label: <IntlMessages id="dorm.PrivateBuildingTypeOption_1" />,
  },
  {
    value: '2',
    label: <IntlMessages id="dorm.PrivateBuildingTypeOption_2" />,
  },
];

const StdSchoolProvinceOptions = [
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

const SignupSchema = Yup.object().shape({
  name1: Yup.string().required(<IntlMessages id="dorm.NameErr" />),

  capicity: Yup.string().required(<IntlMessages id="dorm.CapicityErr" />),
  buildingType: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  totalBuildingNo: Yup.string().required(
    <IntlMessages id="dorm.TotalBuildingNoErr" />
  ),
  totalRooms: Yup.string().required(<IntlMessages id="dorm.TotalRoomsErr" />),
  totalKitchens: Yup.string().required(
    <IntlMessages id="dorm.TotalKitchensErr" />
  ),
  toilet: Yup.string().required(<IntlMessages id="dorm.ToiletErr" />),
});

const DormRegistration = (values) => {
  const initialValues = {
    nmae1: '',
    capicity: '',
    gender: [],
    buildingType: [],
    publicBuildingOwner: [],
    privateBuildingType: [],
    province: [],
  };

  const [dormTypeOption, setDormTypeOption] = useState('');

  const onRegister = (values) => {
    console.log(' The Values', values);
    // if (errors) {
    //   console.log('error');

    //   return;
    // }
    // if (!values) {
    //   console.log('empty');

    //   return;
    // }
    //insert data to database

    if (values.BuildingType.value == '1') {
      setDormTypeOption(values.PublicBuildingOwner.value);
    } else {
      setDormTypeOption(values.PrivateBuildingType.value);
    }

    //REMOVE USER FROM HERE LATTER, IT'S JUST FOR TESTING PURPOSE

    const data = {
      name: values.Name,
      provence: values.province.value,
      district: values.district,
      gender_type: values.gender.value,
      dorm_type: values.buildingType.value,
      dorm_type_option: dormTypeOption,
      building_qty: valuestotalBuildingNo,
      rooms_qty: values.totalRooms,
      kitchen_qty: values.totalKitchens,
      toilet_qty: values.toilet,
      dorm_quota: values.quota,
      dorm_capacity: values.capicity,
      user_id: 1,
    };

    axios
      .post(dormCreateAPI, data)
      .then((response) => {
        console.log(response);

        // window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">{<IntlMessages id="dorm.RegisterTitle" />}</h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onRegister}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row className="justify-content-center inlineBlock">
                  <Colxx xxs="">
                    {/* Dorm Name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.NameLabel" />
                      </Label>
                      <Field className="form-control" name="Name" />
                      {errors.Name && touched.Name ? (
                        <div className="invalid-feedback d-block">
                          {errors.Name}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* Dorm Capicity */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.CapicityLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="Capicity"
                        type="number"
                      />
                      {errors.Capicity && touched.Capicity ? (
                        <div className="invalid-feedback d-block">
                          {errors.Capicity}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Building Type */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.BuildingTypeLabel" />
                      </Label>
                      <FormikReactSelect
                        name="buildingType"
                        id="buildingType"
                        value={values.buildingType}
                        options={BuildingTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.buildingType && touched.buildingType ? (
                        <div className="invalid-feedback d-block">
                          {errors.buildingType}
                        </div>
                      ) : null}
                    </FormGroup>

                    {values.buildingType.value == '1' ? (
                      <div>
                        {/* DormOwner */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="dorm.PublicBuildingOwnerLabel" />
                          </Label>
                          <FormikReactSelect
                            name="PublicBuildingOwner"
                            id="PublicBuildingOwner"
                            value={values.PublicBuildingOwner}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            options={PublicBuildingOwnerOptions}
                            required
                          />
                          {errors.PublicBuildingOwner &&
                          touched.PublicBuildingOwner ? (
                            <div className="invalid-feedback d-block">
                              {errors.PublicBuildingOwner}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    ) : (
                      <div>
                        {/* Private Building Students */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="dorm.PrivateBuildingTypeLabel" />
                          </Label>
                          <FormikReactSelect
                            name="privateBuildingType"
                            id="privateBuildingType"
                            value={values.privateBuildingType}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            options={PrivateBuildingTypeOptions}
                            required
                          />
                          {errors.privateBuildingType &&
                          touched.privateBuildingType ? (
                            <div className="invalid-feedback d-block">
                              {errors.privateBuildingType}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                    )}

                    {/* Total Number of Kitchen*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.TotalKitchensLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="totalKitchens"
                        type="number"
                      />
                      {errors.totalKitchens && touched.totalKitchens ? (
                        <div className="invalid-feedback d-block">
                          {errors.totalKitchens}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* province permanent*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="forms.ProvinceLabel" />
                      </Label>
                      <FormikReactSelect
                        name="Province"
                        id="Province"
                        value={values.Province}
                        options={StdSchoolProvinceOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.Province && touched.Province ? (
                        <div className="invalid-feedback d-block">
                          {errors.Province}
                        </div>
                      ) : null}
                    </FormGroup>
                  </Colxx>

                  <Colxx xxs="">
                    {/* Dorm Gender*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.Gender" />
                      </Label>
                      <FormikReactSelect
                        name="Gender"
                        id="Gender"
                        value={values.Gender}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        options={GenderOptions}
                        required
                      />
                      {errors.Gender && touched.Gender ? (
                        <div className="invalid-feedback d-block">
                          {errors.Gender}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Dorm Quota(Sahmiya) */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.QuotaLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="Quota"
                        type="number"
                      />
                      {errors.Quota && touched.Quota ? (
                        <div className="invalid-feedback d-block">
                          {errors.Quota}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Total Number of Buildings*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.TotalBuildingNoLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="TotalBuildingNo"
                        type="number"
                      />
                      {errors.TotalBuildingNo && touched.TotalBuildingNo ? (
                        <div className="invalid-feedback d-block">
                          {errors.TotalBuildingNo}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Total Number of Rooms*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.TotalRoomsLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="TotalRooms"
                        type="number"
                      />
                      {errors.TotalRooms && touched.TotalRooms ? (
                        <div className="invalid-feedback d-block">
                          {errors.TotalRooms}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Total Number of Toilet*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="dorm.ToiletLabel" />
                      </Label>
                      <Field
                        className="form-control"
                        name="Toilet"
                        type="number"
                      />
                      {errors.Toilet && touched.Toilet ? (
                        <div className="invalid-feedback d-block">
                          {errors.Toilet}
                        </div>
                      ) : null}
                    </FormGroup>
                    {/* District  permanent*/}
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

                    <Button className="float-right m-4 ">
                      <IntlMessages id="forms.SubimssionButton" />
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

export default DormRegistration;
