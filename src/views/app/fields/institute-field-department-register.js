import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import axios from 'axios';

import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import {
  FormikReactSelect,
} from '../../../containers/form-validations/FormikFields';

import config from '../../../config';

const servicePath = config.API_URL;
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

const InstituteFieldDepartmentRegister = () => {
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
          Institute Field Department Register
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
                  <Colxx xxs="6">
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
                  </Colxx>
                  <Colxx xxs="6">
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
                  </Colxx>
                  <Button className="float-right m-3 ">
                    {<IntlMessages id="forms.SubimssionButton" />}
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export default InstituteFieldDepartmentRegister;
