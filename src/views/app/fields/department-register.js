import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
  CardTitle,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
  FormikTagsInput,
  FormikDatePicker,
} from '../../../containers/form-validations/FormikFields';

const servicePath = 'http://localhost:8000';
const fieldsApiUrl = `${servicePath}/institute/field/`;
const departmentRegisterationApiUrl = `${servicePath}/institute/department-create/`;

const SignupSchema = Yup.object().shape({
  FieldId: Yup.string().required(<IntlMessages id="field.FieldIdErr" />),

  FieldName: Yup.string()
    //  .min(3, <IntlMessages id="forms.StdId" />)
    .required(<IntlMessages id="field.FieldNameErr" />),

  FieldEngName: Yup.string().required(
    <IntlMessages id="field.FieldEngNameErr" />
  ),
});

const DepartmentRegister = () => {
  const [fields, setFields] = useState([]);

  const fetchFields = async () => {
    const response = await axios.get(fieldsApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setFields(updatedData);
  };

  useEffect(() => {
    fetchFields();
  }, []);
  const onSubmit = (values) => {
    console.log('values', values);

    //remove the user_id after authentication is done
    const data = {
      filed: values.field.value,
      name: values.departmentName,
      english_name: values.departmentEnglishName,
      user_id: 1,
    };

    axios
      .post(departmentRegisterationApiUrl, data)
      .then((res) => {
        console.log('success');
      })
      .catch((err) => {
        console.log('failed');
      });
  };

  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {/* {<IntlMessages id="field.FieldRegisterTitle" />} */}
          Department Register
        </h3>
        <CardBody>
          <Formik
            initialValues={{}}
            // validationSchema={SignupSchema}
            onSubmit={onSubmit}
          >
            {({
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form className="av-tooltip tooltip-label-bottom">
                <Row className="justify-content-center">
                  <Colxx xxs="10">
                    {/* field*/}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        {/* <IntlMessages id="forms.field" /> */}
                        field
                      </Label>
                      <FormikReactSelect
                        name="field"
                        id="field"
                        value={values.field}
                        options={fields}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.field && touched.field ? (
                        <div className="invalid-feedback d-block">
                          {errors.field}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Department Name */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        {/* <IntlMessages id="field.FieldNameLabel" /> */}
                        Department Name
                      </Label>

                      <Field className="form-control" name="departmentName" />
                      {errors.departmentName && touched.departmentName ? (
                        <div className="invalid-feedback d-block">
                          {errors.departmentName}
                        </div>
                      ) : null}
                    </FormGroup>

                    {/* Department Name In English */}
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        {/* <IntlMessages id="field.FieldEngNameLabel" /> */}
                        Department English Name
                      </Label>
                      <Field
                        className="form-control"
                        name="departmentEnglishName"
                      />
                      {errors.departmentEnglishName &&
                      touched.departmentEnglishName ? (
                        <div className="invalid-feedback d-block">
                          {errors.departmentEnglishName}
                        </div>
                      ) : null}
                    </FormGroup>

                    <Button className="float-right m-3 ">
                      {<IntlMessages id="forms.SubimssionButton" />}
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

export default DepartmentRegister;
