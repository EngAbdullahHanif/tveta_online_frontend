import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { provinceOptions } from '../global-data/options';
import { publicBuildingOwnerOptions } from '../global-data/options';
import { privateBuildingTypeOptions } from '../global-data/options';
import { BuildingTypeOptions } from '../global-data/options';
import { dormGenderOptions } from '../global-data/options';
import './dorm-register.css';
import axios from 'axios';
import callApi from 'helpers/callApi';
import * as Yup from 'yup';
import { NotificationManager } from 'components/common/react-notifications';

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
import { useParams } from 'react-router-dom';

import config from '../../../config';

const servicePath = config.API_URL;
const dormCreateAPI = `${servicePath}/institute/dorms_create/`;
const dormAPI = `${servicePath}/institute/dorms`;
//http://localhost:8000/institute/dorms/?id=1

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { inputLabel } from 'config/styling';
const UpdateMode = true;
const SignupSchema = Yup.object().shape({
  name: Yup.string().required(<IntlMessages id="dorm.NameErr" />),

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

  // PublicBuildingOwner: UpdateMode
  //   ? Yup.object()
  //       .shape({
  //         value: Yup.string().required(),
  //       })
  //       .nullable()
  //       .required(<IntlMessages id="dorm.genderErr" />)
  //   : null,

  totalRooms: Yup.string().required(<IntlMessages id="dorm.TotalRoomsErr" />),
  // quota: Yup.string().required(<IntlMessages id="dorm.QuotaErr" />),

  totalKitchens: Yup.string().required(
    <IntlMessages id="dorm.TotalKitchensErr" />
  ),
  toilet: Yup.string().required(<IntlMessages id="dorm.ToiletErr" />),

  province: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  district: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.DistrictErr" />),
});

const updateMode = true;
const DormRegistration = (values) => {
  const { provinces } = useContext(AuthContext);
  const [updatingDorm, setUpdatingDorm] = useState([]);
  const [initialName, setInitialName] = useState('');
  const [initialCapicity, setInitialCapicity] = useState('');
  const [initialTotalKitchens, setInitialTotalKitchens] = useState('');
  const [initialGender, setInitialGender] = useState([]);
  const [initialBuildingType, setInitialBuildingType] = useState([]);
  const [initialPublicBuildingOwner, setInitialPublicBuildingOwner] = useState(
    []
  );
  const [initialPrivateBuildingType, setInitialPrivateBuildingType] = useState(
    []
  );
  const [initialQuota, setInitialQuota] = useState('');
  const [initialTotalRooms, setInitialTotalRooms] = useState('');
  const [initialTotalBuildingNo, setInitialTotalBuildingNo] = useState('');
  const [initialToilet, setInitialToilet] = useState('');
  const [initialProvince, setInitialProvince] = useState([]);
  const [initialDistrict, setInitialDistrict] = useState([]);
  // const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const { dormId } = useParams();
  //console.log('Dorm info', dormId);

  if (dormId) {
    useEffect(() => {
      async function fetchData() {
        // const { data } = await axios.get(`${dormAPI}/?id=${dormId}`);
        const response = await callApi(`institute/dorms/?id=${dormId}`);
        const updValues = response?.data.results[0];
        setUpdatingDorm(updValues);
        console.log(updValues, 'response?.data');
        setInitialName(updValues.name);
        setInitialCapicity(updValues.capacity);
        setInitialTotalKitchens(updValues.number_of_kitchens);
        // BuildingTypeOptions.map((dormType) => {
        //   if (dormType.value === updValues.building_ownership) {
        //     setInitialBuildingType(dormType);
        //   }
        // });
        setInitialBuildingType(
          BuildingTypeOptions.find(
            (option) => option.value === updValues.building_ownership
          )
        );

        // publicBuildingOwnerOptions.map((publicDorm) => {
        //   if (publicDorm.value === updValues.dorm_type_option) {
        //     setInitialPublicBuildingOwner(publicDorm);
        //   }
        // });
        setInitialPublicBuildingOwner(
          publicBuildingOwnerOptions.find(
            (option) => option.value === updValues.building_type_option
          )
        );

        // privateBuildingTypeOptions.map((privateDormType) => {
        //   if (privateDormType.value === updValues.dorm_type_option) {
        //     setInitialPrivateBuildingType(privateDormType);
        //   }
        // });

        setInitialPrivateBuildingType(
          privateBuildingTypeOptions.find(
            (option) => option.value === updValues.building_type_option
          )
        );

        setInitialProvince(
          provinces.find((option) => option.value === updValues.province)
        );

        setInitialDistrict(
          districts.find((option) => option.value === updValues.district)
        );

        dormGenderOptions.map((gender) => {
          if (gender.value === updValues.gender) {
            setInitialGender(gender);
          }
        });

        setInitialTotalRooms(updValues.number_of_rooms);
        setInitialTotalBuildingNo(updValues.number_of_buildings);
        setInitialToilet(updValues.number_of_toilets);
        // setInitialDistrict(updValues.district);
        setInitialQuota(updValues.quota);
      }
      fetchData();
      //setUpdateMode(true);
    }, []);
  }

  // const fetchProvinces = async () => {
  //   const response = await callApi('core/provinces/', 'GET', null);
  //   if (response.data && response.status === 200) {
  //     const updatedData = await response?.data.map((item) => ({
  //       value: item.id,
  //       label: item.native_name,
  //     }));

  //     setProvinces(updatedData);
  //   } else {
  //     console.log('province error');
  //   }
  // };

  const fetchDistricts = async (provinceId) => {
    console.log('provinceId', provinceId);
    const response = await callApi(
      `core/districts/?province=${provinceId}`,
      'GET',
      null
    );
    if (response.data && response.status === 200) {
      const updatedData = await response?.data.map((item) => ({
        value: item.id,
        label: item.native_name,
      }));
      setDistricts(updatedData);
    } else {
      console.log('district error');
    }
  };

  // useEffect(() => {
  //   fetchProvinces();
  // }, []);

  useEffect(() => {
    console.log('selectedProvince', selectedProvince);
    if (selectedProvince) {
      fetchDistricts(selectedProvince);
    }
  }, [selectedProvince]);

  const initialValues = {
    name: initialName,
    capicity: initialCapicity,
    totalKitchens: initialTotalKitchens,
    gender: initialGender,
    buildingType: initialBuildingType,
    PublicBuildingOwner: initialPublicBuildingOwner,
    privateBuildingType: initialPrivateBuildingType,
    quota: initialQuota,
    totalRooms: initialTotalRooms,
    totalBuildingNo: initialTotalBuildingNo,
    toilet: initialToilet,
    province: initialProvince,
    district: initialDistrict,
  };

  // notification message
  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'لیله موفقان ثبت شوو',
          'موفقیت',
          3000,
          null,
          null,
          cName
        );
        break;
      case 'error':
        NotificationManager.error(
          'لیلیه ثبت نشو، بیا کوشش وکری',
          'خطا',
          9000,
          () => {
            alert('callback');
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };
  const [isNext, setIsNext] = useState(false);

  // post dorm record to the backend
  const postDormRecord = async (data) => {
    const apiParams = {
      endPoint: 'institute/dorms/',
      method: 'POST',
    };
    if (dormId) {
      apiParams.endPoint = `institute/dorms/${dormId}/`;
      apiParams.method = 'PATCH';
    }
    const response = await callApi(apiParams.endPoint, apiParams.method, data);
    if (response) {
      createNotification('success', 'filled');
      setIsNext(true);
      console.log('success message', response.data);
    } else {
      createNotification('error', 'filled');
      console.log('class error');
    }
  };

  const onRegister = (values, { resetForm }) => {
    // resetForm();
    let DormTypeOptions = '';
    if (values.buildingType.value === 'governmental')
      DormTypeOptions = values.PublicBuildingOwner?.value;
    else DormTypeOptions = values.privateBuildingType?.value;
    const data = {
      name: values?.name,
      province: values.province?.value,
      district: values.district?.value,
      gender: values.gender?.value,
      building_ownership: values.buildingType?.value,
      building_type_option: DormTypeOptions,
      number_of_buildings: values?.totalBuildingNo,
      number_of_rooms: values?.totalRooms,
      number_of_kitchens: values?.totalKitchens,
      number_of_toilets: values?.toilet,
      quota: values?.quota || null,
      capacity: values?.capicity,
    };
    postDormRecord(data);
  };

  return (
    <>
      {console.log('updateingDorm', updatingDorm)}
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {<IntlMessages id="dorm.RegisterTitle" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              initialValues={initialValues}
              onSubmit={onRegister}
              // validationSchema={SignupSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                resetForm,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-100">
                  <Row className="justify-content-center inlineBlock">
                    <Colxx xxs="">
                      {/* Dorm Name */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.NameLabel" />
                        </Label>
                        <Field className="form-control" name="name" />
                        {errors.name && touched.name ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.name}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Dorm Capicity */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.CapicityLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="capicity"
                          type="number"
                        />
                        {errors.capicity && touched.capicity ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.capicity}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Building Type */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
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
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.buildingType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {values.buildingType.value == 'governmental' ? (
                        <div>
                          {/* DormOwner */}
                          <FormGroup className="form-group has-float-label">
                            <Label style={inputLabel}>
                              <IntlMessages id="dorm.PublicBuildingOwnerLabel" />
                            </Label>
                            <FormikReactSelect
                              name="PublicBuildingOwner"
                              id="PublicBuildingOwner"
                              value={values.PublicBuildingOwner}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              options={publicBuildingOwnerOptions}
                            />
                            {errors.PublicBuildingOwner &&
                            touched.PublicBuildingOwner ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.PublicBuildingOwner}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      ) : (
                        <div>
                          {/* Private Building Students */}
                          <FormGroup className="form-group has-float-label">
                            <Label style={inputLabel}>
                              <IntlMessages id="dorm.PrivateBuildingTypeLabel" />
                            </Label>
                            <FormikReactSelect
                              name="privateBuildingType"
                              id="privateBuildingType"
                              value={values.privateBuildingType}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                              options={privateBuildingTypeOptions}
                              required
                            />
                            {errors.privateBuildingType &&
                            touched.privateBuildingType ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.privateBuildingType}
                              </div>
                            ) : null}
                          </FormGroup>
                        </div>
                      )}

                      {/* Total Number of Kitchen*/}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.TotalKitchensLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="totalKitchens"
                          type="number"
                        />
                        {errors.totalKitchens && touched.totalKitchens ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.totalKitchens}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.ProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={setFieldValue} //onChange should conatain single line
                          onBlur={setFieldTouched}
                          onClick={setSelectedProvince(values.province.value)}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>
                      {/* District  permanent*/}
                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.DistrictLabel" />
                        </Label>
                        <FormikReactSelect
                          name="district"
                          id="district"
                          value={values.district}
                          options={districts}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.district && touched.district ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.district}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>

                    <Colxx xxs="">
                      {/* Dorm Gender*/}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.Gender" />
                        </Label>
                        <FormikReactSelect
                          name="gender"
                          id="gender"
                          value={values.gender}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={dormGenderOptions}
                          required
                        />
                        {errors.gender && touched.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.gender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Dorm Quota(Sahmiya) */}
                      {/* <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.QuotaLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="quota"
                          type="number"
                        />
                        {errors.quota && touched.quota ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.quota}
                          </div>
                        ) : null}
                      </FormGroup> */}

                      {/* Total Number of Buildings*/}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.TotalBuildingNoLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="totalBuildingNo"
                          type="number"
                        />
                        {errors.totalBuildingNo && touched.totalBuildingNo ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.totalBuildingNo}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Total Number of Rooms*/}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.TotalRoomsLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="totalRooms"
                          type="number"
                        />
                        {errors.totalRooms && touched.totalRooms ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.totalRooms}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* Total Number of Toilet*/}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="dorm.ToiletLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="toilet"
                          type="number"
                        />
                        {errors.toilet && touched.toilet ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.toilet}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    {' '}
                    <Colxx style={{ marginLeft: '5%', marginBottom: '8%' }}>
                      <Button
                        className="float-right m-5 "
                        size="lg"
                        type="submit"
                        color="primary"
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label" style={inputLabel}>
                          <IntlMessages id="forms.SubimssionButton" />
                        </span>
                      </Button>
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
                <Button
                  className="m-5 bg-primary"
                  onClick={() => setIsNext(false)}
                >
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

export default DormRegistration;
