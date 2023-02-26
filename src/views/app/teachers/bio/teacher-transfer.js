import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import './../../dorms/dorm-register.css';
import profilePhoto from './../../../../../src/assets/img/profiles/22.jpg';

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

const instituteOptions = [
  { value: '1', label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" /> },
  { value: '2', label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" /> },
];

const ValidationSchema = Yup.object().shape({
  institute: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="forms.InstituteErr" />),

  transferDate: Yup.string().required(
    <IntlMessages id="teacher.transferDateErr" />
  ),
});

const initialValues = {
  institute: [],
  transferDate: '',
  transferDoc: [],
};

const DormRegistration = (values) => {
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
          {<IntlMessages id="treacher.TansferTitle" />}
        </h3>
        <CardBody>
          {isNext ? (
            <div>
              {' '}
              <Row className="justify-content-center inlineBlock">
                <Label>
                  <IntlMessages id="search.teacherIdSearchLabel" />
                </Label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button">
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
                          <img src={profilePhoto} alt="Photo" width={'10%'} />{' '}
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx>
                          <div>
                            <Row className="justify-content-center border border-primary rounded m-5">
                              <Colxx className=" p-5  border rounded" xxs="">
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
                                  className="float-right m-5 "
                                  color="primary"
                                  style={{
                                    paddingInline: '30px',
                                  }}
                                >
                                  <IntlMessages id="button.Teacher-transfer" />
                                </Button>
                              </Colxx>
                            </Row>
                          </div>
                        </Colxx>
                      </Row>
                    </div>
                  ) : (
                    <div
                      className={message == '' ? 'd-none' : 'border rounded'}
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
            <Formik
              initialValues={initialValues}
              // onSubmit={onRegister}
              validationSchema={ValidationSchema}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
              }) => (
                <Form className="av-tooltip tooltip-label-right error-l-150 ">
                  <div>
                    <Row className="mb-4 justify-content-center">
                      <Colxx xxs="8">
                        <div className=" p-3">
                          <h6 className=" mb-4">
                            {
                              <IntlMessages id="teacher.TransferNewInfoTittle" />
                            }
                          </h6>

                          {/* Institute Name*/}
                          <FormGroup className="form-group has-float-label ">
                            <Label>
                              <IntlMessages id="forms.InstituteLabel" />
                            </Label>
                            <FormikReactSelect
                              name="institute"
                              id="institute"
                              value={values.institute}
                              options={instituteOptions}
                              onChange={setFieldValue}
                              onBlur={setFieldTouched}
                            />

                            {errors.institute && touched.institute ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.institute}
                              </div>
                            ) : null}
                          </FormGroup>

                          {/* date */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="teacher.transferDateLabel" />
                            </Label>
                            <Field
                              className="form-control"
                              name="transferDate"
                              type="date"
                            />
                            {errors.transferDate && touched.transferDate ? (
                              <div className="invalid-feedback d-block bg-danger text-white">
                                {errors.transferDate}
                              </div>
                            ) : null}
                          </FormGroup>

                          <FormGroup>
                            <Label>
                              <IntlMessages id="teacher.transferDocuments" />
                            </Label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                {/* <IntlMessages id="teacher.fileUploadBttn" /> */}
                                آپلود
                              </InputGroupAddon>
                              <CustomInput
                                type="file"
                                id="exampleCustomFileBrowser1"
                                name="transferDoc"
                              />
                            </InputGroup>
                          </FormGroup>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx>
                        <Button
                          style={{ marginLeft: '34%' }}
                          color="primary"
                          className="float-right mb-5 "
                          size="lg"
                          onClick={() => {
                            handleClick(true);
                          }}
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            <IntlMessages id="button.Back" />
                          </span>
                        </Button>
                      </Colxx>
                      <Colxx>
                        <Button
                          style={{ marginLeft: '38%' }}
                          color="primary"
                          className="float-right mb-5 "
                          size="lg"
                          type="submit"
                          onClick={() => {
                            handleClick(false);
                          }}
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
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default DormRegistration;
