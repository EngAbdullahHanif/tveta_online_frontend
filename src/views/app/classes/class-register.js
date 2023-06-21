import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import CustomSelectInput from "components/common/CustomSelectInput";
import axios from "axios";
import callApi from "helpers/callApi";
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
import Select from "react-select";

import IntlMessages from "helpers/IntlMessages";
import { Colxx } from "components/common/CustomBootstrap";
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from "containers/form-validations/FormikFields";
import { message } from "antd";

const subjectOptions = [
  { value: "1", label: "اصلی" },
  { value: "2", label: "فرعی" },
];

const systemOption = [
  { value: "1", label: "عمومی" },
  { value: "2", label: "GIZ" },
  { value: "3", label: "نیما" },
];

const ValidationSchema = Yup.object().shape({
  className: Yup.string().required(<IntlMessages id="class.nameErr" />),
  semester: Yup.string().required(<IntlMessages id="class.semesterErr" />),
});

const updateMode = true;
const SubjcetRegister = () => {
  const TestData = {
    ClassName: "10th A",
    Semester: "1",
  };
  const [initialClassName, setInitialClassName] = useState(
    TestData.ClassName ? TestData.ClassName : ""
  );
  const [initialSemester, setInitialSemester] = useState(
    TestData.Semester ? TestData.Semester : ""
  );
  const [initialSeason, setInitialSeason] = useState([]);
  const [initialSection, setInitialSection] = useState([]);

  const [isNext, setIsNext] = useState(false);

  const initialValues = {
    className: initialClassName,
    semester: initialSemester,
    season: initialSeason,
    section: initialSection,
  };
  const onRegister = async (values, { resetForm }) => {
    console.log(values, "Value");
    setIsNext(true);
    resetForm();

    const data = {
      name: values.className,
      semester: values.semester,
      season: values.season.value,
      section: values.section.value,
      user_id: 1,
    };
    console.log("data", data);
    const response = await callApi("institute/classs_create/", "POST", data);
    if (response) {
      setLoader(false);
      message.success("Class Added");
      console.warn("success message from backend", response.data);
      createNotification("success", "filled");
      resetForm();
      setIsNext(true);
    } else {
      createNotification("error", "filled");
      console.log("class error");
    }
    // await axios
    //   .post("http://localhost:8000/institute/classs/", data)
    //   .then((response) => {
    //     console.log(response);
    //     console.log("data sent to the server2");
    //   })
    //   .catch((error) => {
    //     console.log("data sent to the server4");
    //     console.log(error);
    //   });

    if (!loading) {
      // if (values.email !== '' && values.password !== '') {
      //   loginUserAction(values, history);
      // }
    }
  };
  const seasonOptions = [
    {
      label: "Bahari",
      value: "1",
    },
    {
      label: "Khazani",
      value: "2",
    },
  ];
  const sectionOptions = [
    {
      label: "A",
      value: "A",
    },
    {
      label: "B",
      value: "B",
    },
  ];
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="class.register.title" />}
        </h3>
        <CardBody>
          {!isNext ? (
            <Formik
              initialValues={initialValues}
              onSubmit={onRegister}
              validationSchema={ValidationSchema}
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
                  <Row className="justify-content-center">
                    <Colxx xxs="10">
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="class.nameLabel" />
                        </Label>
                        <Field className="form-control" name="className" />
                        {errors.className && touched.className && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.className}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="class.semesterLabel" />
                        </Label>
                        <Field
                          className="form-control"
                          name="semester"
                          type="number"
                        />
                        {errors.semester && touched.semester && (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.semester}
                          </div>
                        )}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="season" />
                        </Label>
                        <FormikReactSelect
                          name="season"
                          id="season"
                          value={values.season}
                          options={seasonOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.season && touched.season ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.season}
                          </div>
                        ) : null}
                      </FormGroup>
                      <FormGroup className="form-group has-float-label">
                        <Label>
                          <IntlMessages id="section" />
                        </Label>
                        <FormikReactSelect
                          name="section"
                          id="section"
                          value={values.section}
                          options={sectionOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.section && touched.section ? (
                          <div className="invalid-feedback d-block bg-danger text-white">
                            {errors.section}
                          </div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx style={{ marginLeft: "5%", marginBottom: "8%" }}>
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

export default SubjcetRegister;
