import React, { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useParams } from "react-router-dom";
import { dormGenderOptions } from "../global-data/options";
import { provincesOptionsForList } from "../global-data/options";
import * as Yup from "yup";

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
} from "reactstrap";

import callApi from "helpers/callApi";
import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import { NotificationManager } from "components/common/react-notifications";
import { institute } from "lang/locales/fa_IR";

import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from "containers/form-validations/FormikFields";
import { message, Spin } from "antd";
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
  rtl: true,
  prefixCls: "my-message",
});
const options = [
  { value: "Electronic", label: "الکترونیکی" },
  { value: "paper", label: "کاغذی" },
];

const instTypeOptions = [
  { value: "1", label: "دولتی" },
  { value: "1", label: "شخصی" },
];

const instituteCityOptions = [
  { value: "1", label: "شهری" },
  { value: "2", label: "دهاتی" },
];
const instituteLanguageOptions = [
  { value: "1", label: "پښتو" },
  { value: "2", label: "دری" },
];
const instituteClimateOptions = [
  { value: "1", label: "سرد سیر" },
  { value: "2", label: "گرم سیر" },
  { value: "3", label: "زیاد سرد سیر" },
];
const instituteTypeOptions = [
  { value: "1", label: "انستیتوت" },
  { value: "2", label: "لیسه" },
];

const servicePath = "http://localhost:8000";
const instituteApiUrl = `${servicePath}/institute/institute_create`;
//http://localhost:8000/institute/institute_create

const InstituteRegister = () => {
  const [loader, setLoader] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState();
  console.log("INSTITUTE: ", institute);
  const [initialInstituteName, setInitialInstituteName] = useState("");

  const [initialProvince, setInitialProvince] = useState("");
  const [initialDistrict, setInitialDistrict] = useState("");
  const [initialInstType, setInitialInstType] = useState([]);
  const [initialVillage, setInitialVillage] = useState("");

  const [initialGender, setInitialGender] = useState([]);

  const [isNext, setIsNext] = useState(false);
  const [instituteTypeGVT, setInstituteTypeGVT] = useState([]);
  const [cityType, setCityType] = useState([]);
  const [climate, setClimate] = useState([]);
  const [language, setLanguage] = useState([]);
  const [] = useState("وتاکئ / انتخاب کنید");
  // const initialState = {
  //   institute: instituteId ? institute.name : "",
  //   province: instituteId ? institute.province : "",
  //   district: instituteId ? institute.district : "",
  //   village: instituteId ? institute.village : "",
  //   instType: instituteId ? institute.type : "",
  //   instituteType: instituteId ? institute.school_type : "",
  //   institueCityType: instituteId ? institute.inst_city_type : "",
  //   gender: instituteId ? institute.gender : "",
  //   instituteClimate: instituteId ? institute.inst_climat : "",
  //   institueLanguage: instituteId ? institute.language : "",
  // };
  const initialState = {
    institute: initialInstituteName,
    province: initialProvince,
    district: initialDistrict,
    village: initialVillage,
    instType: initialInstType,
    instituteType: instituteTypeGVT,
    institueCityType: cityType,
    gender: initialGender,
    instituteClimate: climate,
    institueLanguage: language,
  };
  console.log("InITIAL State: ", initialState);
  if (instituteId) {
    let data;
    useEffect(() => {
      async function fetchInstitute() {
        const response = await callApi("institute/", "", null);
        if (response.data && response.status === 200) {
          console.log(
            "RESPONSE in Fetch Institute for update: ",
            response.data
          );
          const updatedData = await response.data.filter(
            (item) => item.id == instituteId
          );
          data = updatedData[0];
          console.log("UPDATED DATA: ", updatedData[0]);
          setInstitute(updatedData[0]);
          setInitialInstituteName(updatedData[0].name);
          setInitialDistrict(updatedData[0].district);
          setInitialVillage(updatedData[0].village);
          setInitialProvince(updatedData[0].province);
          setInstituteTypeGVT(updatedData[0].school_type);
          setCityType(updatedData[0].inst_city_type);
          setClimate(updatedData[0].inst_climat);

          console.log("UPDATED Institute DATA: ", institute);
        } else {
          console.log("institute error");
        }
        //end
        const Instprovince = provincesOptionsForList.map((provName) => {
          if (provName.value === data.province) {
            setInitialProvince([provName]);
          }
        });
        const instClimat = instituteClimateOptions.map((provName) => {
          if (provName.value === data.inst_climat) {
            setClimate([provName]);
          }
        });
        const instType = instituteTypeOptions.map((provName) => {
          if (provName.value === data.school_type) {
            setInstituteTypeGVT([provName]);
          }
        });
        const cityType = instituteCityOptions.map((provName) => {
          if (provName.value === data.inst_city_type) {
            setCityType([provName]);
          }
        });
        const instTypee = instTypeOptions.map((instType) => {
          if (instType.value === data.type) {
            setInitialInstType([instType]);
          }
        });
        const languageType = instituteLanguageOptions.map((lang) => {
          if (lang.value === data.language) {
            setLanguage([lang]);
          }
        });
        const instGender = dormGenderOptions.map((instGender) => {
          if (instGender.value === data.gender) {
            setInitialGender(instGender);
          }
        });
      }
      fetchInstitute();
      setUpdateMode(true);
    }, []);
  }

  const createNotification = (type, className) => {
    const cName = className || "";
    switch (type) {
      case "success":
        NotificationManager.success(
          "شاگرد موفقانه لیلی ته رجستر شو",
          "موفقیت",
          3000,
          null,
          null,
          cName
        );
        break;
      case "error":
        NotificationManager.error(
          "شاگرد ثبت نشو، بیا کوشش وکری",
          "خطا",
          9000,
          () => {
            alert("callback");
          },
          null,
          cName
        );
        break;
      default:
        NotificationManager.info("Info message");
        break;
    }
  };

  // this function is used to update all the state of the fields in case we are updating a record
  function updateFormFields() {}

  // const ValidationSchema = Yup.object().shape({
  //   institute: Yup.string().required(<IntlMessages id="inst.nameErr" />),

  //   province: updateMode
  //     ? Yup.object()
  //         .shape({
  //           value: Yup.string().required(),
  //         })
  //         .nullable()
  //         .required(<IntlMessages id="forms.StdSchoolProvinceErr" />)
  //     : null,

  //   instituteType: Yup.object()
  //     .shape({
  //       value: Yup.string().required(),
  //     })
  //     .nullable()
  //     .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  //   institueCityType: Yup.object()
  //     .shape({
  //       value: Yup.string().required(),
  //     })
  //     .nullable()
  //     .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  //   institueLanguage: Yup.object()
  //     .shape({
  //       value: Yup.string().required(),
  //     })
  //     .nullable()
  //     .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  //   province: Yup.object()
  //     .shape({
  //       value: Yup.string().required(),
  //     })
  //     .nullable()
  //     .required(<IntlMessages id="forms.StdSchoolProvinceErr" />),

  //   district: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),

  //   village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),

  //   instType: updateMode
  //     ? Yup.object()
  //         .shape({
  //           value: Yup.string().required(),
  //         })
  //         .nullable()
  //         .required(<IntlMessages id="inst.typeErr" />)
  //     : null,

  //   gender: updateMode
  //     ? Yup.object()
  //         .shape({
  //           value: Yup.string().required(),
  //         })
  //         .nullable()
  //         .required(<IntlMessages id="institute.gender" />)
  //     : null,

  // image validation
  // // image: Yup.mixed()
  // // .required("You need to provide a file")
  // // .test("fileSize", "The file is too large", (value) => {
  // //     return value && value[0].sienter <= 2000000;
  // // })
  // // .test("type", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .pdf and .doc", (value) => {
  // //     return value && (
  // //         value[0].type === "image/jpeg" ||
  // //         value[0].type === "image/bmp" ||
  // //         value[0].type === "image/png" ||
  // //         value[0].type === 'application/pdf' ||
  // //         value[0].type === "application/msword"
  // //     );
  // }),
  // });

  const onRegister = async (values) => {
    setLoader(true);
    const data = {
      name: values.institute,
      address: `${values.district}, Kabul`,
      province: "kabul", //Check the
      district: values.district,
      village: values.village,
      type: values.instType.value,
      inst_city_type: values.institueCityType.value,
      inst_status: "1", //as it is registered for the first time so it is considered to be active
      inst_climat: values.instituteClimate.value, //attribute name changed from inst_climaty to inst_climat
      school_type: values.instituteType.value,
      language: values.institueLanguage.value,
      gender: values.gender.value,
      user_id: 1, //Make this id Dynamic of the user logged in
    };
    console.log("VALUES: ", data);
    const response = await callApi(
      instituteId ? `institute/${instituteId}/` : "institute/institute_create/",
      instituteId ? "PUT" : "POST",
      data
    );
    if (response) {
      setLoader(false);
      message.success("Institute Added");
      console.warn("success message from backend", response.data);
      createNotification("success", "filled");
      resetForm();
      setIsNext(true);
    } else {
      createNotification("error", "filled");
      console.log("class error");
    }
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {instituteId ? (
            <IntlMessages id="ده انستیتوت اپډیډ" />
          ) : (
            <IntlMessages id="inst.register.title" />
          )}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              validateOnMount
              initialValues={initialState}
              // validationSchema={ValidationSchema}
              onSubmit={onRegister}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                handleChange,
                resetForm,
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
                          options={provincesOptionsForList}
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
                        <Label>
                          <IntlMessages id="institue type" />
                        </Label>
                        <FormikReactSelect
                          name="instituteType"
                          id="instituteType"
                          value={values.instituteType}
                          options={instituteTypeOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.instituteType && touched.instituteType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.instituteType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* institue city options */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="City Type" />
                        </Label>
                        <FormikReactSelect
                          name="institueCityType"
                          id="institueCityType"
                          value={values.institueCityType}
                          options={instituteCityOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.institueCityType && touched.institueCityType ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.institueCityType}
                          </div>
                        ) : null}
                      </FormGroup>

                      {/* institute language  */}
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="institute langugage" />
                        </Label>
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
                        <Label>
                          <IntlMessages id="institute climate" />
                        </Label>
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
              style={{ minHeight: "400px" }}
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

export default InstituteRegister;
