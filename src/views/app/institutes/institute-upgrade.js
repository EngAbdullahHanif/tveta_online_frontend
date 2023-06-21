import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';
import axios from 'axios';
import profilePhoto from './../../../assets/img/profiles/22.jpg';
import { upgradeToOption } from '../global-data/options';

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
  InputGroup,
  InputGroupAddon,
  CustomInput,
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
import { institute } from 'lang/locales/fa_IR';

const servicePath = 'http://localhost:8000';
const instituteSearchApiUrl = `${servicePath}/institute/`;
const instituteUpgradeApiUrl = `${servicePath}/institute/upgrade-institute/`;

const SignupSchema = Yup.object().shape({});

const InstituteUpgrade = (values) => {
  const [message, setMessage] = useState('');
  const [data, setData] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [instituteId, setInstituteId] = useState();
  const [institute, setInstitute] = useState();

  const initialValues = {
    upgradingOptions: {
      value: '',
      label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    },
  };

  const handleClick = (event) => {
    setIsNext(event);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSearch = async () => {
    //search for the institute in the server
    const response = await axios.get(
      `${instituteSearchApiUrl}?id=${instituteId}`
    );
    const instituteResponse = await response.data;

    if (instituteResponse.length > 0) {
      setInstitute(instituteResponse);
      setData(true);
    } else {
      setData(false);
    }
  };

  const onSubmit = (values) => {
    console.log('values.institute.value', values);
    data = {
      institute_id: instituteId,
      institute_new_name: values.instituteNewName,
      institute_old_name: institute[0].name,
      upgrade_date: values.upgradeDate,
      upgrade_to: values.upgradeTo.value,
      upgrade_document: values.upgradeDocument,
    };
    //upgrade the institute
    axios
      .post(`${instituteUpgradeApiUrl}`, {
        data,
      })
      .then((response) => {
        console.log(response, 'response');
        if (response.status === 201) {
          console.log('success');
        }
      })
      .catch((error) => {
        console.log(error, 'error');
      });
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5" style={{ fontSize: 25, fontWeight: 'bold' }}>
          {<IntlMessages id="institute.UpgradeTitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                {isNext ? (
                  <div>
                    {' '}
                    <Row className="justify-content-center inlineBlock">
                      <Label style={{ fontSize: 18, fontWeight: 'bold' }}>
                        <IntlMessages id="search.instituteIdSearchLabel" />
                      </Label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
                            onClick={handleSearch}
                          >
                            <IntlMessages id="search.studentId" />
                          </button>
                        </div>
                        <input
                          type="text"
                          class="form-control"
                          placeholder=""
                          aria-label=""
                          aria-describedby="basic-addon1"
                          onChange={(e) => setInstituteId(e.target.value)}
                        />
                      </div>

                      <Colxx style={{ paddingInline: '3%' }}>
                        {data ? (
                          <div className="border rounded">
                            <Label>
                              <h6 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h6>
                            </Label>{' '}
                            {/* <Row>
                              <Colxx xxs="1"></Colxx>

                              <Colxx>
                                <img
                                  src={profilePhoto}
                                  alt="Photo"
                                  width={'10%'}
                                />{' '}
                              </Colxx>
                            </Row> */}
                            <Row>
                              <Colxx>
                                <div>
                                  <Row className="justify-content-center border border-primary rounded m-5">
                                    <Colxx
                                      className=" p-5  border rounded"
                                      xxs=""
                                    >
                                      <Label>
                                        <IntlMessages id="teacher.NameLabel" />
                                      </Label>
                                      <h3>{institute[0].name}</h3>
                                      <Label>
                                        <IntlMessages id="forms.ProvinceLabel" />
                                      </Label>
                                      <h3>{institute[0].province}</h3>
                                      <Label>
                                        <IntlMessages id="forms.DistrictLabel" />
                                      </Label>
                                      <h3>{institute[0].district}</h3>
                                      <Label>
                                        <IntlMessages id="forms.VillageLabel" />
                                      </Label>
                                      <h3>{institute[0].village}</h3>
                                      <Label>
                                        {/* <IntlMessages id="forms.InstituteLabel" /> */}
                                        د انستیتوت نوعیت/ نوعیت انستیتوت
                                      </Label>
                                      {institute[0].type == '1' ? (
                                        <h3>دولتی</h3>
                                      ) : (
                                        <h3>خصوصی</h3>
                                      )}
                                      <Label>
                                        {/* <IntlMessages id="marks.ClassLabel" /> */}
                                        د انستیتوت نوعیت/ نوعیت انستیتوت
                                      </Label>
                                      {institute[0].inst_city_type == '1' ? (
                                        <h3>شهری</h3>
                                      ) : (
                                        <h3>دهاتی</h3>
                                      )}
                                    </Colxx>
                                    <Colxx className="p-5 border rounded">
                                      <Label>
                                        {/* <IntlMessages id="field.SemesterLabel" /> */}
                                        د انستیتوت اقلیم/ اقلیم انستیتوت
                                      </Label>
                                      {institute[0].inst_climaty == '1' ? (
                                        <h3>سردسیر</h3>
                                      ) : institute[0].inst_climaty == '2' ? (
                                        <h3>گرم سیر</h3>
                                      ) : (
                                        <h3>زیادسردسیر</h3>
                                      )}
                                      <Label>
                                        {/* <IntlMessages id="forms.FieldLabel" /> */}
                                        د تدریس ژبه / زبان تدریسی
                                      </Label>
                                      {institute[0].language == '1' ? (
                                        <h3>پشتو</h3>
                                      ) : institute[0].language == '2' ? (
                                        <h3>دری</h3>
                                      ) : (
                                        <h3>انگلیسی</h3>
                                      )}
                                    </Colxx>
                                  </Row>
                                  <Row>
                                    <Colxx>
                                      <Button
                                        onClick={() => handleClick(false)}
                                        className="float-right m-5  "
                                        style={{
                                          paddingInline: '30px',
                                        }}
                                      >
                                        <IntlMessages id="button.institute-upgrade" />
                                      </Button>
                                    </Colxx>
                                  </Row>
                                </div>
                              </Colxx>
                            </Row>
                          </div>
                        ) : (
                          <div
                            className={
                              message == '' ? 'd-none' : 'border rounded'
                            }
                          >
                            <Label>
                              <h6 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h6>
                            </Label>
                            <Row className="justify-content-center mb-5">
                              <Colxx xxs="6">
                                <h5 className="m-5">
                                  <IntlMessages id="forms.NoData" />
                                </h5>
                              </Colxx>
                            </Row>
                          </div>
                        )}
                      </Colxx>
                    </Row>
                  </div>
                ) : (
                  <div>
                    <Row className="mb-4 justify-content-center">
                      <Colxx xxs="8">
                        <div className="  p-3">
                          {/* Institute Name*/}
                          <FormGroup className="form-group has-float-label ">
                            <Label>
                              <IntlMessages id="forms.upgradingOptionsLabel" />
                            </Label>
                            <FormikReactSelect
                              name="upgradeTo"
                              id="ّinstitute"
                              value={values.upgradeTo}
                              options={upgradeToOption}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.upgradeTo && touched.upgradeTo ? (
                              <div className="invalid-feedback d-block">
                                {errors.upgradeTo}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* New Name */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="institute.newNameLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="instituteNewName"
                            />
                            {errors.instituteNewName &&
                            touched.instituteNewName ? (
                              <div className="invalid-feedback d-block">
                                {errors.instituteNewName}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* date */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="institute.upgradeDateLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="upgradeDate"
                              type="date"
                            />
                            {errors.upgradeDate && touched.upgradeDate ? (
                              <div className="invalid-feedback d-block">
                                {errors.upgradeDate}
                              </div>
                            ) : null}
                          </FormGroup>

                          <FormGroup>
                            <Label>
                              <IntlMessages id="institute.upgradingDocuments" />
                            </Label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                {/* <IntlMessages id="teacher.fileUploadBttn" /> */}
                                آپلود
                              </InputGroupAddon>
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="upgradeDocument"
                              />
                            </InputGroup>
                          </FormGroup>
                        </div>
                        <Button
                          onClick={() => handleClick(true)}
                          className="m-2 m-5"
                        >
                          شاته/ عقب
                        </Button>
                        <Button
                          style={{
                            paddingInline: '30px',
                          }}
                          className="float-right m-2 mt-5"
                          type="submit"
                          // onSubmit={handleSubmit}
                          // onClick={}
                        >
                          {<IntlMessages id="forms.SubimssionButton" />}
                        </Button>
                      </Colxx>
                    </Row>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default InstituteUpgrade;
