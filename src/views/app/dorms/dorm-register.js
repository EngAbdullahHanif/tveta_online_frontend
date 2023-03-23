import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './dorm-register.css';
import axios from 'axios';
import callApi from 'helpers/callApi';
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
import { useParams } from 'react-router-dom';

const servicePath = 'http://localhost:8000';
const dormCreateAPI = `${servicePath}/institute/dorms_create/`;
const dormAPI = `${servicePath}/institute/dorms`;
//http://localhost:8000/institute/dorms/?id=1

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from 'containers/form-validations/FormikFields';
import { useEffect } from 'react';
import { NotificationManager } from 'components/common/react-notifications';
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
  buildingType: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
    : null,

  totalBuildingNo: Yup.string().required(
    <IntlMessages id="dorm.TotalBuildingNoErr" />
  ),

  province: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
    : null,

  gender: updateMode
    ? Yup.object()
        .shape({
          value: Yup.string().required(),
        })
        .nullable()
        .required(<IntlMessages id="dorm.genderErr" />)
    : null,

  totalRooms: Yup.string().required(<IntlMessages id="dorm.TotalRoomsErr" />),
  quota: Yup.string().required(<IntlMessages id="dorm.QuotaErr" />),

  totalKitchens: Yup.string().required(
    <IntlMessages id="dorm.TotalKitchensErr" />
  ),
  toilet: Yup.string().required(<IntlMessages id="dorm.ToiletErr" />),
  district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
});

const updateMode = true;
const DormRegistration = (values) => {
  const TestData = {
    Name1: 'Number-01',
    Capicity: '25',
    TotalKitchens: '2',
    Gender: '2',
    BuildingType: 'Private',
    PublicBuildingOwner: 'Tveta',
    PrivateBuildingType: 'Donated',
    Province: 'Baghlan',
    Quota: '120',
    TotalRooms: '40',
    TotalBuildingNo: '8',
    Toilet: '18',
    District: 'Doshi',
  };

  const { dormId } = useParams();
  //console.log('Dorm info', dormId);

  if (dormId) {
    useEffect(() => {
      async function fetchData() {
        const { data } = await axios.get(`${dormAPI}/?id=${dormId}`);
        console.log(data, 'data');
        setInitialName1(data[0].name);
        setInitialCapicity(data[0].dorm_capacity);
        setInitialTotalKitchens(data[0].kitchen_qty);
        const dormTypeOptions = BuildingTypeOptions.map((dormType) => {
          if (dormType.value === data[0].dorm_type) {
            setInitialBuildingType(dormType);
          }
        });
        const publicDormTypeOptions = PublicBuildingOwnerOptions.map(
          (publicDorm) => {
            if (publicDorm.value === data[0].dorm_type_option) {
              setInitialPublicBuildingOwner(publicDorm);
            }
          }
        );
        const privateDormTypeOptions = PrivateBuildingTypeOptions.map(
          (privateDormType) => {
            if (privateDormType.value === data[0].dorm_type_option) {
              setInitialPrivateBuildingType(privateDormType);
            }
          }
        );
        const provinceOptions = StdSchoolProvinceOptions.map((province) => {
          if (province.value === data[0].provence) {
            setInitialProvince(province);
          }
        });
        const genderOptions = GenderOptions.map((gender) => {
          if (gender.value === data[0].gender_type) {
            setInitialGender(gender);
          }
        });

        setInitialTotalRooms(data[0].rooms_qty);
        setInitialTotalBuildingNo(data[0].building_qty);
        setInitialToilet(data[0].toilet_qty);
        setInitialDistrict(data[0].district);
        setInitialQuota(data[0].dorm_quota);
      }
      fetchData();
      //setUpdateMode(true);
    }, []);
  }

  const [initialName1, setInitialName1] = useState('');
  const [initialCapicity, setInitialCapicity] = useState('');
  const [initialTotalKitchens, setInitialTotalKitchens] = useState('');
  const [initialProvince, setInitialProvince] = useState([]);
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
  const [initialDistrict, setInitialDistrict] = useState('');

  const initialValues = {
    name1: initialName1,
    capicity: initialCapicity,
    totalKitchens: initialTotalKitchens,
    gender: initialGender,
    buildingType: initialBuildingType,
    publicBuildingOwner: initialPublicBuildingOwner,
    privateBuildingType: initialPrivateBuildingType,
    province: initialProvince,
    quota: initialQuota,
    totalRooms: initialTotalRooms,
    totalBuildingNo: initialTotalBuildingNo,
    toilet: initialToilet,
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
  const [dormTypeOption, setDormTypeOption] = useState('');
  const [isNext, setIsNext] = useState(false);

  // post dorm record to the backend
  const postDormRecord = async (data) => {
    const response = await callApi('institute/dorms_create/', 'POST', data);
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
    resetForm();
    let DormTypeOptions;
    if (values.buildingType.value === '1') {
      //setDormTypeOption(values.PublicBuildingOwner.value);
      console.log('condition true', values.PublicBuildingOwner.value);
      DormTypeOptions = values.publicBuildingOwner.value;
    } else {
      //setDormTypeOption(values.PrivateBuildingType.value);
      console.log('condition false', values.privateBuildingType.value);
      DormTypeOptions = values.privateBuildingType.value;
    }

    //REMOVE USER FROM HERE LATTER, IT'S JUST FOR TESTING PURPOSE

    const data = {
      name: values.name1,
      provence: values.province.value,
      district: values.district,
      gender_type: values.gender.value,
      dorm_type: values.buildingType.value,
      dorm_type_option: DormTypeOptions,
      building_qty: values.totalBuildingNo,
      rooms_qty: values.totalRooms,
      kitchen_qty: values.totalKitchens,
      toilet_qty: values.toilet,
      dorm_quota: values.quota,
      dorm_capacity: values.capicity,
      user_id: '1',
    };
    console.log('object of data', data);
    postDormRecord(data);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">{<IntlMessages id="dorm.RegisterTitle" />}</h3>
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
                        <Label>
                          <IntlMessages id="dorm.NameLabel" />
                        </Label>
                        <Field className="form-control" name="name1" />
                        {errors.name1 && touched.name1 ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.name1}
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
                          <div className="invalid-feedback d-block bg-danger text-white">
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
                              <div className="invalid-feedback d-block bg-danger text-white">
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
                          <div className="invalid-feedback d-block bg-danger text-white">
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
                          name="province"
                          id="province"
                          value={values.province}
                          options={StdSchoolProvinceOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
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
                          name="gender"
                          id="gender"
                          value={values.gender}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={GenderOptions}
                          required
                        />
                        {errors.gender && touched.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.gender}
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
                          name="quota"
                          type="number"
                        />
                        {errors.quota && touched.quota ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.quota}
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
                        <Label>
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
                        <Label>
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

                      {/* District  permanent*/}
                      <FormGroup className="form-group has-float-label">
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
