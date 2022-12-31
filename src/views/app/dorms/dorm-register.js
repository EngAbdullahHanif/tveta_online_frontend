import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './dorm-register.css';

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
  Name: Yup.string().required(<IntlMessages id="dorm.NameErr" />),

  Capicity: Yup.string().required(<IntlMessages id="dorm.CapicityErr" />),

  TotalBuildingNo: Yup.string().required(
    <IntlMessages id="dorm.TotalBuildingNoErr" />
  ),
  TotalRooms: Yup.string().required(<IntlMessages id="dorm.TotalRoomsErr" />),
  TotalKitchens: Yup.string().required(
    <IntlMessages id="dorm.TotalKitchensErr" />
  ),
  Toilet: Yup.string().required(<IntlMessages id="dorm.ToiletErr" />),
});

const DormRegistration = (values) => {
  const initialValues = {
    TazkiraType: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    LevelOfEducation: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Status: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Gender: {
      value: '0',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    BuildingType: {
      value: '1',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    PublicBuildingOwner: {
      value: '1',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    PrivateBuildingType: {
      value: '1',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },
    C_Province: {
      value: '',
      label: <IntlMessages id="forms.TazkiraTypeDefaultValue" />,
    },

    IdCardPageNo: '0',
    IdCardJoldNo: '0',
  };

  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const onRegister = (values) => {
    console.log(' The Values', values);
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
                      <Field className="form-control" name="Capicity" />
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
                        name="BuildingType"
                        id="BuildingType"
                        value={values.BuildingType}
                        options={BuildingTypeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.BuildingType && touched.BuildingType ? (
                        <div className="invalid-feedback d-block">
                          {errors.BuildingType}
                        </div>
                      ) : null}
                    </FormGroup>
                    {values.BuildingType.value == '1' ? (
                      <div>
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
                            name="PrivateBuildingType"
                            id="PrivateBuildingType"
                            value={values.PrivateBuildingType}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            options={PrivateBuildingTypeOptions}
                            required
                          />
                          {errors.PrivateBuildingType &&
                          touched.PrivateBuildingType ? (
                            <div className="invalid-feedback d-block">
                              {errors.PrivateBuildingType}
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
                      <Field className="form-control" name="TotalKitchens" />
                      {errors.TotalKitchens && touched.TotalKitchens ? (
                        <div className="invalid-feedback d-block">
                          {errors.TotalKitchens}
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
                      <Field className="form-control" name="Quota" />
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
                      <Field className="form-control" name="TotalBuildingNo" />
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
                      <Field className="form-control" name="TotalRooms" />
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
                      <Field className="form-control" name="Toilet" />
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
