import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useLocation } from 'react-router-dom';
import { Table as TB, message } from 'antd';
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
  const [topicOptions, setTopicOptions] = useState([]);

  const location = useLocation();

  async function fetchData() {
    const { data } = await callApi(`programs/employee-training/`);
    console.log('programs/employee-training', data.results);

    setEvaluations(data.results);
  }
  const institutions = [
    {
      value: 'institute',
      label: 'مرکز تعلیمی تخنیکی و مسلکی',
    },
    {
      value: 'province',
      label: 'آمریت ولایتی',
    },
    {
      value: 'zone',
      label: 'زون انکشافی',
    },
    {
      value: 'center',
      label: 'اداره مرکزی',
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
      console.log('CCCCCCCCCCCCCCCCCC', response.data.results);
      setTopics(response.data?.results);

      const typeArrays = {};
      response.data.results.forEach((parentItem) => {
        parentItem.topics.forEach((topicItem) => {
          const type = parentItem.type;
          if (!typeArrays[type]) {
            typeArrays[type] = [];
          }
          typeArrays[type].push({
            category: parentItem.type,

            value: topicItem.id,
            label: topicItem.name,
          });
        });
      });
      setTopicOptions(typeArrays);
      console.log('RRRRRRRRRRRRRESULT ARRAY: ', typeArrays);
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
      title: 'مدت (روز)',
      dataIndex: 'duration_in_days',
      width: '10%',
    },
    {
      title: 'داخل خدمت؟',
      dataIndex: 'is_during_service',
      width: '10%',
    },
    {
      title: 'نیاز مجدد است؟',
      dataIndex: 'is_required_again',
      width: '10%',
    },
    {
      title: 'کتگوری',
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
            dataSource={evaluations?.map((item, index) => ({
              key: index,
              id: item.id,
              name: item.name,
              organization: item.organization,
              duration_in_days: item.duration_in_days,
              is_during_service: item.is_during_service ? 'Yes' : 'No',
              is_required_again: item.is_required_again ? 'Yes' : 'No',
              category: item.category,
            }))}
          />
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: '',
              organization: '',
              duration_in_days: '',
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
                        نوم
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
                        ارګان
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
                        مدت (روز)
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
                        for="category"
                        className="col-form-label"
                      >
                        کتگوری
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
                        داخل خدمت؟
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="is_during_service"
                        id="is_during_service"
                        value={values.is_during_service}
                        options={boolOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        isSearchable={false}
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
                        نیاز مجدد است؟
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="is_required_again"
                        id="is_required_again"
                        value={values.is_required_again}
                        options={boolOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        isSearchable={false}
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
        </CardBody>
        <CardBody className="w-100">
          <Formik
            enableReinitialize={true}
            initialValues={{}}
            onSubmit={(data) => {
              console.log('DDDDDDDDDDDDDDDATA: ', data);
            }}
          >
            {({ setFieldTouched, setFieldValue, handleSubmit }) => (
              <>
                <form>
                  {Object.keys(topicOptions).map((type) => (
                    <div style={{ display: 'flex' }}>
                      <div key={type} className="w-100">
                        <h3>{` حتمی (${type})`}</h3>
                        <FormikReactSelect
                          name={type + '_hatmi'}
                          id={type}
                          options={topicOptions[type].map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                      </div>
                      <div key={type} className="w-100">
                        <h3>{` اختیاری (${type})`}</h3>
                        <FormikReactSelect
                          name={type + '_ikhtyari'}
                          id={type}
                          options={topicOptions[type].map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <br />
                  {topicOptions.length > 0 && (
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      ثبت
                    </button>
                  )}
                </form>
              </>
            )}
          </Formik>
        </CardBody>
        <CardBody className="w-100">
          <Formik
            enableReinitialize={true}
            initialValues={{
              other_required_program: '',
              training_location_preference: [],
            }}
            onSubmit={async (data, { resetForm }) => {
              if (
                data.training_location_preference ||
                data.other_required_program
              ) {
                message.warning('لطفا فورم پر کنین');
                return;
              }
              data.employee = employeeId;
              data.training_location_preference =
                data.training_location_preference.value;
              await callApi('need-assessments/survey/', 'POST', data)
                .then((response) => {
                  console.log('NEED ASSESS', response.data);
                  message.success('ثبت شد');
                  resetForm({
                    values: {
                      other_required_program: '',
                      training_location_preference: [],
                    },
                  });
                })
                .catch((err) => {
                  message.error('ثبت نشد');
                });
            }}
          >
            {({ setFieldTouched, setFieldValue, handleSubmit }) => (
              <>
                <form>
                  <div className="form-group w-100">
                    <label
                      style={inputLabel}
                      for="educational_year"
                      className="col-form-label"
                    >
                      یک برنامه اموزشی که در این فورم درج نشده مگر نیاز مبرم
                      پنداشته می شود برای رفع مشکلات وظیفوی را بنویسید؟
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Field
                      className="form-control fieldStyle"
                      name="other_required_program"
                    />
                  </div>

                  <div className="form-group w-100">
                    <label
                      style={inputLabel}
                      for="educational_year"
                      className="col-form-label"
                    >
                      به نظر شما برنامه های اموزشی حوزه در مدیریتی در کجا بر
                      گزار گردد؟
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <FormikReactSelect
                      name="training_location_preference"
                      options={institutions}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    />
                  </div>
                  <br />
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    ثبت
                  </button>
                </form>
              </>
            )}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};
export default EmployeeEvaluation;
