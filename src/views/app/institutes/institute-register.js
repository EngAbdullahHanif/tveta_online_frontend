import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams } from 'react-router-dom';
import {
  BuildingTypeOptions,
  dormGenderOptions,
  genderOptions,
  langOptions,
} from '../global-data/options';
import { InstituteShiftOptions } from '../global-data/options';
import * as Yup from 'yup';

import {
  Row,
  Card,
  CardBody,
  // Form,
  FormGroup,
  Label,
  Button,
  Spinner,
} from 'reactstrap';

import callApi from 'helpers/callApi';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';

import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { message, Spin } from 'antd';
import { CURRENT_SHAMSI_YEAR } from 'constants/defaultValues';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { inputLabel } from 'config/styling';
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: 'my-message',
});

const instTypeOptions = [
  { value: 'governmental', label: 'دولتی' },
  { value: 'private', label: 'خصوصی' },
];

const instituteCityOptions = [
  { value: 'urban', label: 'شهری' },
  { value: 'rural', label: 'دهاتی' },
];
const instituteLanguageOptions = [
  { value: 'pashto', label: 'پښتو' },
  { value: 'dari', label: 'دری' },
  { value: 'pashto_dari', label: 'پښتو و دری' },
  { value: 'english', label: 'انګلیسی' },
];
const instituteClimateOptions = [
  { value: 'cold', label: 'سرد سیر' },
  { value: 'warm', label: 'گرم سیر' },
  { value: 'very_cold', label: 'نهایت سرد سیر' },
];
const instituteTypeOptions = [
  { value: 'institute', label: 'انستیتوت' },
  { value: 'high_school', label: 'لیسه' },
  { value: 'special_education', label: 'تعلیمات خاص' },
];

const servicePath = 'http://localhost:8000';
//http://localhost:8000/institute/institute_create

const MyErrorMessage = ({ name, errors, touched }) => {
  if (errors[name] && touched[name]) {
    return (
      <div className="invalid-feedback d-block bg-danger text-white">
        {errors[name]}
      </div>
    );
  }
  return null;
};
const InstituteRegister = () => {
  const [loader, setLoader] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState([]);
  const [initialInstituteName, setInitialInstituteName] = useState('');
  const [initialCode, setInitialCode] = useState();
  const [initialProvince, setInitialProvince] = useState([]);
  const [initialDistrict, setInitialDistrict] = useState([]);
  const [initialInstType, setInitialInstType] = useState([]);
  const [initialVillage, setInitialVillage] = useState('');
  const [initialFoundationYear, setInitialFoundationYear] = useState('');
  const [initialShift, setInitialShift] = useState([]);
  const [initialOwnerhip, setInitialOwnership] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [initialOwnershipType, setInitialOwnershipType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { institutes, fetchInstitutes, provinces, districts } =
    useContext(AuthContext);

  const [districtsOptions, setDistrictsOptions] = useState([]);

  const [initialGender, setInitialGender] = useState([]);

  const [isNext, setIsNext] = useState(false);
  const [instituteTypeGVT, setInstituteTypeGVT] = useState([]);
  const [cityType, setCityType] = useState([]);
  const [climate, setClimate] = useState([]);
  const [language, setLanguage] = useState([]);
  const [] = useState('وتاکئ / انتخاب کنید');

  const initialState = {
    institute: initialInstituteName,
    province: initialProvince,
    district: initialDistrict,
    village: initialVillage,
    ownershipType: initialOwnershipType,
    instType: initialInstType,
    instituteType: instituteTypeGVT,
    cityType: cityType,
    gender: initialGender,
    instituteClimate: climate,
    institueLanguage: language,
  };
  console.log('InITIAL State: ', initialState);

  async function fetchInstitute() {
    let data;
    setIsLoading(true);
    try {
      const response = await callApi('institute/all/', '', null);
      if (response.data && response.status === 200) {
        console.log('RESPONSE in Fetch Institute for update: ', response.data);
        const updatedData = await response?.data.filter(
          (item) => item.id == instituteId,
        );
        data = updatedData[0];
        console.log('UPDATED DATA: ', data);
        setInstitute(data);
        setInitialInstituteName(data.name);
        setInitialDistrict(
          districts.find((dist) => {
            return dist.value === data.district;
          }),
        );
        setInitialVillage(data.village);
        setInitialProvince(
          provinces.find((prov) => prov.value === data.province),
        );
        setInitialOwnershipType(
          BuildingTypeOptions.find((op) => op.value === data.ownership),
        );
        setInstituteTypeGVT({
          value: data.school_type,
          label: data.school_type,
        });
        setInitialGender(genderOptions.find((op) => op.value === data.gender));
        setInitialInstType(
          instituteTypeOptions.find((sh) => {
            return sh.value == data.institute_type;
          }),
        );
        setCityType(
          instituteCityOptions.find((op) => op.value === data.location_type),
        );
        setInitialShift(
          InstituteShiftOptions.filter((sh) => {
            return sh.value == data.shift;
          }),
        );
        setClimate(
          instituteClimateOptions.find((op) => op.value === data.climate),
        );
        setInitialCode(data.code);
        setLanguage(langOptions.find((op) => op.value === data.language));
        setInitialFoundationYear(data.foundation_year);
        setInitialOwnership(
          instTypeOptions.filter((sh) => {
            return sh.value == data.ownership;
          }),
        );
        console.log('UPDATED Institute DATA: ', institute);
      } else {
        console.log('institute error');
      }
    } catch (e) {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (instituteId) {
      fetchInstitute();
      setUpdateMode(true);
    }
  }, [instituteId]);

  const createNotification = (type, className) => {
    const cName = className || '';
    switch (type) {
      case 'success':
        NotificationManager.success(
          'انستیتوت موفقانه رجستر شو',
          'موفقیت',
          3000,
          null,
          null,
          cName,
        );
        break;
      case 'error':
        NotificationManager.error(
          'انستیتوت ثبت نشو، بیا کوشش وکری',
          'خطا',
          9000,
          () => {
            alert('callback');
          },
          null,
          cName,
        );
        break;
      default:
        NotificationManager.info('Info message');
        break;
    }
  };

  const debounce = (func, delay) => {
    let timer;

    return (...args) => {
      clearTimeout(timer);

      return new Promise((resolve) => {
        timer = setTimeout(() => {
          resolve(func.apply(this, args));
        }, delay);
      });
    };
  };

  const debouncedUniqueCodeValidation = debounce(async (code) => {
    try {
      const response = await callApi(
        `institute/check-code-unique/`,
        'GET',
        null,
        { code },
      );
      const isUnique = response.data.is_unique;
      if (!isUnique) {
        throw new Error('انستتیوت دیگری همین کود را دارد');
      }
    } catch (error) {
      throw new Error(error);
    }
  }, 1000);
  // Adjust the debounce delay as needed (in milliseconds)

  const ValidationSchema = Yup.object().shape({
    institute: Yup.string().required(<IntlMessages id="inst.nameErr" />),
    code:
      !instituteId &&
      Yup.number()
        .required('کد مورد نیاز است')
        .min(1000, 'کود باید از 1000 بزرگتر باشد')
        .max(9999, 'کود باید از 10000 کوچکتر باشد')
        .test(
          'unique-code',
          'انستتیوت با این کود وجود دارد',
          async function (value) {
            if (value >= 1000 && value < 10000) {
              try {
                const response = await callApi(
                  `institute/check-code-unique/?code=${value}`,
                );
                return response.data.is_unique;
              } catch (error) {
                console.error('API error:', error);
                return false; // Return false in case of API error
              }
            }
            return true;
          },
        ),

    // instType: Yup.object()
    //   .shape({
    //     value: Yup.string().required(),
    //   })
    //   .nullable()
    //   .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

    foundationYear: Yup.number()
      .min(1300, 'از 1300 باید بیشتر باشد')
      .max(CURRENT_SHAMSI_YEAR, 'باید از سال فعلی کوچکتر باشد')
      .required('سال تاسیس الزامی است'),

    cityType: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

    institueLanguage: Yup.object()
      .shape({
        value: Yup.string().required(),
      })
      .nullable()
      .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

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

    // image validation
    // image: Yup.mixed()
    //   .required('You need to provide a file')
    //   .test('fileSize', 'The file is too large', (value) => {
    //     return value && value[0].sienter <= 2000000;
    //   })
    //   .test(
    //     'type',
    //     'Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc',
    //     (value) => {
    //       return (
    //         value &&
    //         (value[0].type === 'image/jpeg' ||
    //           value[0].type === 'image/bmp' ||
    //           value[0].type === 'image/png' ||
    //           value[0].type === 'application/pdf' ||
    //           value[0].type === 'application/msword')
    //       );
    //     }
    //   ),
  });

  // post student record to server
  const postInstituteRecord = async (data) => {
    const apiParams = {
      endPoint: 'institute/create/',
      method: 'POST',
    };
    if (instituteId) {
      apiParams.endPoint = `institute/${instituteId}/`;
      apiParams.method = 'PATCH';
    }
    setIsLoading(true);
    try {
      const response = await callApi(
        apiParams.endPoint,
        apiParams.method,
        data,
      );
      if (response && response.status >= 200 && response.status < 300) {
        createNotification('success', 'filled');
        // resetForm();
        setIsNext(true);
        console.log('success message from backend', response);
        fetchInstitutes();
      } else {
        createNotification('error', 'filled');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = (values) => {
    console.log('values of the form', values);
    const data = {
      name: values.institute,
      code: values.code,
      province: values.province.value,
      district: values.district.value,
      village: values.village,
      ownership: values.ownershipType.value,
      location_type: values.cityType.value,
      shift: values.shift.value,
      status: 'active', //as it is registered for the first time so it is considered to be active
      climate: values.instituteClimate.value,
      institute_type: values.instType.value,
      language: values.institueLanguage.value,
      gender: values.gender.value,
      foundation_year: values.foundationYear,

      // created_by: '1',
    };
    console.log('data of the form', data);
    postInstituteRecord(data);
  };

  return (
    <>
      <Card>
        <h3 style={{ fontSize: 25, fontWeight: 'bold' }} className="mt-5 m-5">
          {instituteId ? (
            'ده انستیتوت اپډیډ'
          ) : (
            <IntlMessages id="inst.register.title" />
          )}
        </h3>
        <CardBody>
          {isLoading && (
            <div className="text-center">
              <Spinner />
            </div>
          )}
          {!isNext && !isLoading && (
            <Formik
              enableReinitialize={true}
              validateOnMount
              initialValues={{
                institute: initialInstituteName,
                code: initialCode,
                province: initialProvince,
                district: initialDistrict,
                village: initialVillage,
                ownershipType: initialOwnershipType,
                instType: initialInstType,
                foundationYear: initialFoundationYear,
                gender: initialGender,
                shift: initialShift,
                instituteClimate: climate,
                cityType: cityType,
                institueLanguage: language,
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
                        <Label style={inputLabel}>
                          <IntlMessages id="inst.name" />
                        </Label>
                        <Field className="form-control" name="institute" />
                        {errors.institute && touched.institute && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institute}
                          </div>
                        )}
                      </FormGroup>

                      {!instituteId && (
                        <FormGroup className="form-group has-float-label">
                          <Label>کوډ/کود</Label>
                          <Field
                            className="form-control"
                            name="code"
                            type="number"
                          />
                          <MyErrorMessage
                            name="code"
                            errors={errors}
                            touched={touched}
                          />
                        </FormGroup>
                      )}

                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.ProvinceLabel" />
                        </Label>
                        <FormikReactSelect
                          name="province"
                          id="province"
                          value={values.province}
                          options={provinces}
                          onChange={(name, option) => {
                            setFieldValue(name, option);
                            const dd = districts.filter(
                              (dis) => dis.province === option.value,
                            );
                            setDistrictsOptions(dd);
                            setFieldValue('district', []);
                          }}
                          onBlur={setFieldTouched}
                          // onClick={setSelectedProvince(values.province.value)}
                        />
                        {errors.province && touched.province ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.province}
                          </div>
                        ) : null}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label error-l-175">
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.DistrictLabel" />
                        </Label>
                        <FormikReactSelect
                          name="district"
                          id="district"
                          value={values.district}
                          options={districtsOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.district && touched.district ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.district}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* village permanent */}
                      <FormGroup className="form-group has-float-label ">
                        <Label style={inputLabel}>
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
                        <Label style={inputLabel}>
                          <IntlMessages id="forms.StudyTimeLabel" />
                        </Label>
                        <FormikReactSelect
                          name="shift"
                          id="shift"
                          value={values.shift}
                          options={InstituteShiftOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.shift && touched.shift ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.shift}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>ملکیت</Label>
                        <FormikReactSelect
                          name="ownershipType"
                          id="ownershipType"
                          value={values.ownershipType}
                          options={instTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.ownershipType && touched.ownershipType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.ownershipType}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                    <Colxx xxs="6">
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>
                          <IntlMessages id="gender" />
                        </Label>
                        <FormikReactSelect
                          name="gender"
                          id="gender"
                          value={values.gender}
                          options={dormGenderOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.gender && touched.gender ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.gender}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* institute type */}

                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>ډول/نوع</Label>
                        <FormikReactSelect
                          name="instType"
                          id="instType"
                          value={values.instType}
                          options={instituteTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.instType && touched.instType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.instType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* institue city options */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>ځای/موقعیت</Label>
                        <FormikReactSelect
                          name="cityType"
                          id="cityType"
                          value={values.cityType}
                          options={instituteCityOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.cityType && touched.cityType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.cityType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* institute language  */}
                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>ژبې/زبان ها</Label>
                        <FormikReactSelect
                          name="institueLanguage"
                          id="institueLanguage"
                          value={values.institueLanguage}
                          options={instituteLanguageOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.institueLanguage && touched.institueLanguage ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institueLanguage}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* institute climate*/}

                      <FormGroup className="form-group has-float-label">
                        <Label style={inputLabel}>اقلیم</Label>
                        <FormikReactSelect
                          name="instituteClimate"
                          id="instituteClimate"
                          value={values.instituteClimate}
                          options={instituteClimateOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.instituteClimate && touched.instituteClimate ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.instituteClimate}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label error-l-100">
                        <Label style={inputLabel}>
                          {/* <IntlMessages id="forms.StdGraduationYearLabel" /> */}
                          د تأسیس کال/ سال تأسیس
                          <span style={{ color: 'red' }}>*</span>
                        </Label>
                        <Field
                          className="form-control"
                          name="foundationYear"
                          id="foundationYear"
                          type="number"
                        />
                        {errors.foundationYear && touched.foundationYear ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.foundationYear}
                          </div>
                        ) : null}
                      </FormGroup>
                      <div className="d-flex justify-content-between align-items-center float-right mb-5 mt-3">
                        <Button
                          className="m-4"
                          size="lg"
                          type="submit"
                          color="primary"
                        >
                          <Spin color="#fff" spinning={loader} />
                          <span className="spinner d-inline-block ">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label" style={inputLabel}>
                            <IntlMessages id="forms.SubimssionButton" />
                          </span>
                        </Button>
                      </div>
                    </Colxx>
                  </Row>
                </Form>
              )}
            </Formik>
          )}{' '}
          {isNext && !isLoading && (
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
                  {isLoading ? <Spinner /> : <IntlMessages id="button.back" />}
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
