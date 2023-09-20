import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useLocation } from 'react-router-dom';
import { Table as TB } from 'antd';
// import {
//   teacherEvaluationValidationSchema,
// } from '../global-data/forms-validation';
import { Card, CardBody } from 'reactstrap';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
// import TeacherList from '../teachers/Components/TeacherList';
import callApi from 'helpers/callApi';
import { inputLabel } from 'config/styling';

//http://localhost:8000/teachers/evaluation/?id=1

const EmployeeEvaluation = ({ employeeId }) => {
  const [evaluations, setEvaluations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);

  const location = useLocation();

  async function fetchData() {
    const { data } = await callApi(`programs/employee-training/`);
    console.log('programs/employee-training', data.results);

    setEvaluations(data.results);
  }
  const evaluationTypes = [
    {
      value: 'need_assessment',
      label: 'اقتضایی',
    },
    {
      value: 'probation',
      label: 'آزمایشی',
    },
    {
      value: 'annual',
      label: 'سالانه',
    },
  ];

  const boolOptions = [
    {
      value: false,
      label: 'نی',
    },
    {
      value: true,
      label: 'بلی',
    },
  ];

  const fetchCategories = async () => {
    await callApi('programs/categories/').then(async (response) => {
      console.log('CCCCCCCCCCCCCCCCCC', response.data);
      setTopics(response.data?.results);
      const updatedData = await response.data.results.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setCategories(updatedData);
    });
  };
  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const [teacher, setTeacher] = useState([]);
  // const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    console.log('state: ', location);
    setTeacher(location.state?.item);
  }, []);

  const onSubmit = async (values) => {
    console.log('Evaluation values', values);
    values.is_during_service = values.is_during_service.value;
    values.is_required_again = values.is_required_again.value;
    values.category = values.category.value;
    values.survey = values.survey.value || null;
    values.employee = employeeId;
    let endPoint = 'programs/employee-training/';
    await callApi(endPoint, 'POST', values)
      .then((response) => {
        console.log('response in teacher evaluation', response.data);
        fetchData();
      })
      .catch((error) => {
        console.log('Error in teacher evaluation', error);
      });
  };
  const [isNext, setIsNext] = useState(false);
  const columns = [
    {
      title: 'اساس نمبر',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'نوم',
      dataIndex: 'name',
      width: '5%',
    },
    {
      title: 'اداره',
      dataIndex: 'organization',
      width: '10%',
    },
    {
      title: 'duration_in_days',
      dataIndex: 'duration_in_days',
      width: '10%',
    },
    {
      title: 'is_during_service',
      dataIndex: 'is_during_service',
      width: '10%',
    },
    {
      title: 'is_required_again',
      dataIndex: 'is_required_again',
      width: '10%',
    },
    {
      title: 'survey',
      dataIndex: 'survey',
      width: '10%',
    },
    {
      title: 'category',
      dataIndex: 'category',
      width: '10%',
    },
  ];
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">فورم نیاز سنجی کارمندان</h3>

        <CardBody className="w-100">
          <TB
            columns={columns}
            // rowKey={(record) => record.login.uuid}
            // pagination={tableParams.pagination}
            // loading={isLoading}
            // onChange={handleTableChange}
            dataSource={evaluations?.map((item, index) => ({
              key: index,
              id: item.id,
              name: item.name,
              organization: item.organization,
              duration_in_days: item.duration_in_days,
              is_during_service: item.is_during_service ? 'Yes' : 'No',
              is_required_again: item.is_required_again ? 'Yes' : 'No',
              survey: item.survey,
              category: item.category,
            }))}
          />

          <Formik
            enableReinitialize={true}
            initialValues={{
              name: '',
              organization: '',
              duration_in_days: '',
              survey: [],
              category: [],
              is_during_service: [],
              is_required_again: [],
            }}
            // validationSchema={teacherEvaluationValidationSchema}
            onSubmit={onSubmit}
          >
            {({
              errors,
              touched,
              values,
              setFieldTouched,
              setFieldValue,
              handleSubmit,
            }) => (
              <>
                <form>
                  <div style={{ display: 'flex' }}>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        Name
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field className="form-control fieldStyle" name="name" />
                    </div>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        organization
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="organization"
                      />
                    </div>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        Duration in Days
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="duration_in_days"
                        type="number"
                        min="0"
                      />
                    </div>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="survey"
                        className="col-form-label"
                      >
                        survey
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="survey"
                        id="survey"
                        value={values.survey}
                        options={evaluationTypes}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.survey && touched.survey ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.survey}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="category"
                        className="col-form-label"
                      >
                        category
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="category"
                        id="category"
                        value={values.category}
                        options={categories}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.category && touched.category ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.category}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="is_during_service"
                        className="col-form-label"
                      >
                        is_during_service
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="is_during_service"
                        id="is_during_service"
                        value={values.is_during_service}
                        options={boolOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.is_during_service && touched.is_during_service ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.is_during_service}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="is_required_again"
                        className="col-form-label"
                      >
                        is_required_again
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="is_required_again"
                        id="is_required_again"
                        value={values.is_required_again}
                        options={boolOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.is_required_again && touched.is_required_again ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.is_required_again}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <br />
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    ثبت
                  </button>
                </form>
              </>
            )}
          </Formik>
          <br />
          <CardBody className="w-40">
            <Formik
              enableReinitialize={true}
              initialValues={{}}
              // validationSchema={teacherEvaluationValidationSchema}
              onSubmit={(data) => {
                console.log('DDDDDDDDDDDDDDDATA: ', data);
              }}
            >
              {({
                errors,
                touched,
                values,
                setFieldTouched,
                setFieldValue,
                handleSubmit,
              }) => (
                <>
                  <form>
                    {topics.map((item) => {
                      return (
                        <>
                          <h3>{item.name}</h3>
                          <div style={{ display: 'flex' }}>
                            <div className="form-group w-100">
                              <label
                                style={inputLabel}
                                for="category"
                                className="col-form-label"
                              >
                                حتمی
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <FormikReactSelect
                                name={item.type + '_hatmi'}
                                id={item.type}
                                options={item.topics.map((op) => ({
                                  value: op.id,
                                  label: op.name,
                                }))}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.category && touched.category ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.category}
                                </div>
                              ) : null}
                            </div>
                            <div className="form-group w-100">
                              <label
                                style={inputLabel}
                                for={item.type}
                                className="col-form-label"
                              >
                                اختیاری
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <FormikReactSelect
                                name={item.type + '_ikhtyari'}
                                id={item.type}
                                options={item.topics.map((op) => ({
                                  value: op.id,
                                  label: op.name,
                                }))}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                required
                              />
                              {errors.category && touched.category ? (
                                <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                                  {errors.category}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </>
                      );
                    })}

                    <br />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      ثبت
                    </button>
                  </form>
                </>
              )}
            </Formik>
          </CardBody>
        </CardBody>
      </Card>
    </>
  );
};
export default EmployeeEvaluation;
