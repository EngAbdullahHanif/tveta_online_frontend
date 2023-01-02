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
  District: Yup.string().required(<IntlMessages id="forms.DistrictErr" />),
  Village: Yup.string().required(<IntlMessages id="forms.VillageErr" />),
});

const DormRegistration = (values) => {
  const initialValues = {
    Province: {
      value: '',
      label: <IntlMessages id="forms.EducationLevelDefaultValue" />,
    },
  };

  const [data, setData] = useState(2);

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
                        <IntlMessages id="search.studentIdSearchLabel" />
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
                                        <IntlMessages id="forms.ConfirmButton" />
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
                        <div className="square border border-dark p-3">
                          <h6 className=" mb-4">
                            {<IntlMessages id="forms.StudentResidentsPlace" />}
                          </h6>

                          {/* province permanent*/}
                          <FormGroup className="form-group has-float-label ">
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

                          {/* village permanent */}
                          <FormGroup className="form-group has-float-label">
                            <Label>
                              <IntlMessages id="forms.VillageLabel" />
                            </Label>
                            <Field className="form-control" name="Village" />
                            {errors.Village && touched.Village ? (
                              <div className="invalid-feedback d-block">
                                {errors.Village}
                              </div>
                            ) : null}
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
