import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CustomSelectInput from 'components/common/CustomSelectInput';
import axios from 'axios';
import * as Yup from 'yup';
import Select from 'react-select';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import DualListBox from 'react-dual-listbox';
import './group-premission.css';

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
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const groupPremissionOptions = [
  { value: 'Super Admin', label: 'Super Admin' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Institute', label: 'Institute' },
  { value: 'Teacher', label: 'Teacher' },
  { value: 'Student', label: 'Student' },
  { value: 'Hr', label: 'Hr' },
];

const ValidationSchema = Yup.object().shape({
  groupName: Yup.object()
    .shape({
      value: Yup.string().required(),
    })
    .nullable()
    .required(<IntlMessages id="group.groupNameErr" />),
});

const GroupPremissions = () => {
  const [isNext, setIsNext] = useState(false);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [GroupName, setGroupName] = useState('');
  const [selected, setSelected] = useState([]);

  // API Should be Called and Selected is the Assigned Premissions.
  console.log(selected, 'Selected');

  const onRegisterFirstPage = (values, { resetForm }) => {
    console.log(values, 'Value');
    setIsSecondPage(true);
  };

  const options = [
    { value: 'phobos', label: 'Phobos' },
    { value: 'deimos', label: 'Deimos' },
    { value: 'io', label: 'Io' },
    { value: 'ganymede', label: 'Ganymede' },
    { value: 'One', label: 'Callisto' },
    { value: 'Two', label: 'Callisto' },
    { value: 'Three', label: 'Callisto' },
  ];

  const onChange = (data) => {
    setAvailableData(data.availableData);
    setSelectedData(data.selectedData);
    setAllSelected(data.allSelected);
  };
  let fields = { text: 'Name' };
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="groug.premssion.title" />}
        </h3>
        <CardBody>
          <div>
            {!isSecondPage ? (
              <Formik
                initialValues={{
                  groupName: [],
                }}
                onSubmit={onRegisterFirstPage}
                validationSchema={ValidationSchema}
              >
                {({
                  errors,
                  touched,
                  values,
                  setFieldValue,
                  setFieldTouched,
                  resetForm,
                }) => (
                  <Form className="av-tooltip tooltip-label-right error-l-100">
                    <Row className="justify-content-center">
                      <Colxx xxs="8" style={{ marginTop: '8%' }}>
                        {/* Group Name */}
                        <FormGroup className="form-group has-float-label">
                          <Label>
                            <IntlMessages id="group.groupName" />
                          </Label>
                          <FormikReactSelect
                            name="groupName"
                            id="groupName"
                            value={values.groupName}
                            options={groupPremissionOptions}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                            onClick={setGroupName(values.groupName)}
                          />
                          {errors.groupName && touched.groupName ? (
                            <div className="invalid-feedback d-block bg-danger text-white">
                              {errors.groupName}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <Row>
                      {' '}
                      <Colxx
                        xxs="10"
                        style={{
                          marginLeft: '3%',
                          marginTop: '5%',
                          marginBottom: '12%',
                        }}
                      >
                        <Button
                          className="float-right m-4 "
                          size="lg"
                          type="submit"
                          color="primary"
                        >
                          <IntlMessages id="forms.SubimssionButton" />
                        </Button>
                      </Colxx>
                    </Row>
                  </Form>
                )}
              </Formik>
            ) : (
              <>
                {!isNext ? (
                  <>
                    <Row className="justify-content-center  border m-5 ">
                      <Colxx xxs="9">
                        <h1 className="float-right m-2">
                          {' '}
                          GroupName: {GroupName.value}
                        </h1>
                      </Colxx>
                    </Row>
                    <Row className="m-5">
                      <Colxx>
                        {' '}
                        <DualListBox
                          style={{
                            backgroundColor: 'blue !important',
                            borderRadius: '15px !important',
                          }}
                          alignActions="top"
                          canFilter
                          options={options}
                          selected={selected}
                          onChange={(value) => setSelected(value)}
                          className="dualbox"
                        />
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx style={{ marginLeft: '6%', marginBottom: '10%' }}>
                        <div className="d-flex justify-content-between align-items-center m-4 float-right">
                          <Button
                            size="lg"
                            type="submit"
                            onClick={() => setIsNext(true)}
                          >
                            <IntlMessages id="button.SubmitButton" />
                          </Button>
                        </div>
                      </Colxx>
                    </Row>
                  </>
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
                        onClick={() => {
                          setIsSecondPage(false);
                          setIsNext(false);
                        }}
                      >
                        <IntlMessages id="button.back" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};
export default GroupPremissions;
