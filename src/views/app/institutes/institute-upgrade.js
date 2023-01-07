import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../dorms/dorm-register.css';

import profilePhoto from './../../../assets/img/profiles/22.jpg';

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

const upgradingOptions = [
  { value: '1', label: <IntlMessages id="institute.upgradingOptions_1" /> },
  { value: '2', label: <IntlMessages id="institute.upgradingOptions_2" /> },
  { value: '3', label: <IntlMessages id="institute.upgradingOptions_3" /> },
];

const SignupSchema = Yup.object().shape({});

const DormRegistration = (values) => {
  const initialValues = {
    upgradingOptions: {
      value: '',
      label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    },
  };

  const [data, setData] = useState(1);

  const [isNext, setIsNext] = useState(true);
  const handleClick = (event) => {
    setIsNext(event);
  };

  const [message, setMessage] = useState('');

  console.log(message, 'Message');
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="institute.UpgradeTitle" />}
        </h3>
        <CardBody>
          <Formik
            initialValues={initialValues}
            // onSubmit={onRegister}
            validationSchema={SignupSchema}
          >
            {({ errors, touched, values, setFieldTouched, setFieldValue }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                {isNext ? (
                  <div>
                    {' '}
                    <Row className="justify-content-center inlineBlock">
                      <Label>
                        <IntlMessages id="search.instituteIdSearchLabel" />
                      </Label>
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <button
                            class="btn btn-outline-secondary"
                            type="button"
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
                          onChange={handleChange}
                        />
                      </div>

                      <Colxx style={{ paddingInline: '3%' }}>
                        {data == 1 ? (
                          <div className="border rounded">
                            <Label>
                              <h6 className="mt-5 m-5">
                                {<IntlMessages id="dorm.SearchResult" />}
                              </h6>
                            </Label>{' '}
                            <Row>
                              <Colxx xxs="1"></Colxx>

                              <Colxx>
                                <img
                                  src={profilePhoto}
                                  alt="Photo"
                                  width={'10%'}
                                />{' '}
                              </Colxx>
                            </Row>
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
                                      <h3>احمد شبیر</h3>
                                      <Label>
                                        <IntlMessages id="teacher.FatherNameLabel" />
                                      </Label>
                                      <h3>عبدالرحیم</h3>
                                      <Label>
                                        <IntlMessages id="teacher.PhoneNoLabel" />
                                      </Label>
                                      <h3>077000000000</h3>
                                      <Label>
                                        <IntlMessages id="teacher.EmailLabel" />
                                      </Label>
                                      <h3>ahamd12@gmail.com</h3>

                                      <Label>
                                        <IntlMessages id="forms.InstituteLabel" />
                                      </Label>
                                      <h3>نیما</h3>
                                      <Label>
                                        <IntlMessages id="marks.ClassLabel" />
                                      </Label>
                                      <h3>دیارلسم/ سیزدهم</h3>
                                    </Colxx>
                                    <Colxx className="p-5 border rounded">
                                      <Label>
                                        <IntlMessages id="field.SemesterLabel" />
                                      </Label>
                                      <h3>دوهم</h3>
                                      <Label>
                                        <IntlMessages id="forms.FieldLabel" />
                                      </Label>
                                      <h3>برق</h3>
                                      <Label>
                                        <IntlMessages id="forms.ProvinceLabel" />
                                      </Label>
                                      <h3>کابل</h3>
                                      <Label>
                                        <IntlMessages id="forms.DistrictLabel" />
                                      </Label>
                                      <h3>اوومه ناحیه / ناحیه هفتم</h3>
                                      <Label>
                                        <IntlMessages id="forms.VillageLabel" />
                                      </Label>
                                      <h3>تخنیکم</h3>
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
                              name="upgradingOptions"
                              id="ّinstitute"
                              value={values.upgradingOptions}
                              options={upgradingOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />
                            {errors.upgradingOptions &&
                            touched.upgradingOptions ? (
                              <div className="invalid-feedback d-block">
                                {errors.upgradingOptions}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* New Name */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="institute.newNameLabel" />
                            </Label>
                            <Field className="form-control" name="newName" />
                            {errors.newName && touched.newName ? (
                              <div className="invalid-feedback d-block">
                                {errors.newName}
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
                              name="StdInteranceDate"
                              type="date"
                            />
                            {errors.StdInteranceDate &&
                            touched.StdInteranceDate ? (
                              <div className="invalid-feedback d-block">
                                {errors.StdInteranceDate}
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
                                name="customFile"
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

export default DormRegistration;
