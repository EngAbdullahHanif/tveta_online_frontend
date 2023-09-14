import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  gradeOptions,
  persianMonthOptions,
  stepOptions,
} from '../global-data/options';
// import {
//   teacherEvaluationValidationSchema,
// } from '../global-data/forms-validation';
import { Card, CardBody, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import config from '../../../config';
// import TeacherList from '../teachers/Components/TeacherList';
import callApi from 'helpers/callApi';
import { useLocation } from 'react-router-dom';
import { inputLabel } from 'config/styling';
import { AuthContext } from 'context/AuthContext';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
const servicePath = config.API_URL;

const TeacherEvaluationAPI = `${servicePath}/teachers/evaluation`;
//http://localhost:8000/teachers/evaluation/?id=1

const EmployeeEvaluation = (props) => {
  const { institutes } = useContext(AuthContext);
  const [updatingRecord, setUpdatingRecord] = useState({});
  const [evaluationDate, setEvaluationDate] = useState();

  const { type, teacherId } = useParams();

  const location = useLocation();
  console.log('teacher evaluation', teacherId);
  async function fetchData() {
    const { data } = await axios.get(
      `${TeacherEvaluationAPI}/?id=${teacherId}`,
    );
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
  const outcomeOptions = [
    {
      value: 'promotion',
      label: 'ارتقاأ',
    },
    {
      value: 'continue',
      label: 'ادامه',
    },
    {
      value: 'dismissal',
      label: 'انفصال',
    },
  ];
  const placeOfDutyOptions = [
    {
      value: 'local',
      label: 'محلی',
    },
    {
      value: 'central',
      label: 'مرکزی',
    },
  ];

  useEffect(() => {
    if (teacherId) {
      fetchData();
    }
    //setUpdateMode(true);
  }, []);

  const [teacher, setTeacher] = useState([]);
  // const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    console.log('state: ', location);
    setTeacher(location.state?.item);
  }, []);

  const onSubmit = async (values) => {
    console.log('EEEEEEEEEEEEEEEEEEEEEMPLOYEE', values);
    values.evaluation_outcome = values.evaluation_outcome.value;
    values.institute = values.institute.value;
    values.evaluation_type = values.evaluation_type.value;
    values.grade = values.grade.value;
    values.step = values.step.value;
    values.employee = parseInt(teacherId);
    values.evaluation_date = evaluationDate;
    console.log('Evaluation values', values);
    let endPoint = 'evaluations/public_service/';
    await callApi(endPoint, 'POST', values)
      .then((response) => {
        console.log('response in teacher evaluation', response.data);
        setIsNext(true);
      })
      .catch((error) => {
        console.log('Error in teacher evaluation', error);
      });
  };
  const [isNext, setIsNext] = useState(false);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">فورم ارزیابی مامور ملکی</h3>

        <CardBody className="w-50">
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              initialValues={{
                title: '',
                grade: [],
                step: [],
                place_of_duty: '',
                evaluation_type: '',
                evaluation_date: '',
                self_plan_execution_score: '',
                self_competency_score: '',
                self_behavioral_score: '',
                director_plan_execution_score: '',
                director_competency_score: '',
                director_behavioral_score: '',
                direct_director: '',
                direct_director_suggestions: '',
                upper_director: '',
                upper_director_score: [],
                evaluation_outcome: '',
                self_total_score: '',
                director_total_score: '',
                employee: [],
                institute: [],
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
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        Title
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field className="form-control fieldStyle" name="title" />

                      <label
                        style={inputLabel}
                        for="institute"
                        className="col-form-label"
                      >
                        انستتیوت
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="institute"
                        id="institute"
                        value={values.institute}
                        options={institutes}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.institute && touched.institute ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.institute}
                        </div>
                      ) : null}
                      <label
                        style={inputLabel}
                        for="institute"
                        className="col-form-label"
                      >
                        محل کار
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="place_of_duty"
                        id="place_of_duty"
                        value={values.place_of_duty}
                        options={placeOfDutyOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.place_of_duty && touched.place_of_duty ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.place_of_duty}
                        </div>
                      ) : null}
                      <div className="form-group">
                        <label style={inputLabel}>
                          <IntlMessages id="teacher.GradeLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <FormikReactSelect
                          name="grade"
                          id="grade"
                          value={values.grade}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          options={gradeOptions}
                          required
                        />
                        {errors.grade && touched.grade ? (
                          <div className="invalid-feedback d-block  bg-danger text-white messageStyle">
                            {errors.grade}
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label style={inputLabel}>
                          <IntlMessages id="teacher.StepLabel" />
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <FormikReactSelect
                          name="step"
                          id="step"
                          value={values.step}
                          options={stepOptions}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.step && touched.step ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.step}
                          </div>
                        ) : null}
                      </div>
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        نمره نیازسنجی کارمند خود
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div className="form-group">
                          <label
                            style={inputLabel}
                            for="excellent"
                            className="col-form-label"
                          >
                            plan_execution_score
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            className="form-control fieldStyle"
                            name="self_plan_execution_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.excellent && touched.excellent ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.excellent}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label
                            style={inputLabel}
                            for="outstanding"
                            className="col-form-label"
                          >
                            competency_score
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            className="form-control fieldStyle"
                            name="self_competency_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.outstanding && touched.outstanding ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.outstanding}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label
                            style={inputLabel}
                            for="good"
                            className="col-form-label"
                          >
                            behavioral_score
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            className="form-control fieldStyle"
                            name="self_behavioral_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.good && touched.good ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.good}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        نمره نیازسنجی امر
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div className="form-group">
                          <label
                            style={inputLabel}
                            for="average"
                            className="col-form-label"
                          >
                            plan_execution_score
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            className="form-control fieldStyle"
                            name="director_plan_execution_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.average && touched.average ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.average}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label
                            style={inputLabel}
                            for="weak"
                            className="col-form-label"
                          >
                            competency_score
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            className="form-control fieldStyle"
                            name="director_competency_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.weak && touched.weak ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.weak}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label
                            style={inputLabel}
                            for="not_applicable"
                            className="col-form-label"
                          >
                            behavioral_score
                            <span style={{ color: 'red' }}>*</span>
                          </label>
                          <Field
                            className="form-control fieldStyle"
                            name="director_behavioral_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.not_applicable && touched.not_applicable ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.not_applicable}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        نمره نیازسنجی امر مافوق
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div className="form-group">
                          <Field
                            className="form-control fieldStyle"
                            name="upper_director_score"
                            type="number"
                            min="0"
                            max="100"
                          />
                          {errors.average && touched.average ? (
                            <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                              {errors.average}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        direct_director_suggestions
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="direct_director_suggestions"
                      />
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        upper_director
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="upper_director"
                      />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <div className="form-group w-100">
                        <label
                          style={inputLabel}
                          for="evaluation_type"
                          className="col-form-label"
                        >
                          ارزیابی ډول
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <FormikReactSelect
                          name="evaluation_type"
                          id="evaluation_type"
                          value={values.evaluation_type}
                          options={evaluationTypes}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.evaluation_type && touched.evaluation_type ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.evaluation_type}
                          </div>
                        ) : null}
                      </div>
                      <div className="">
                        <label
                          style={inputLabel}
                          for="year_of_completion"
                          className="col-form-label"
                        >
                          ارزیابی تاریخ
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <br />

                        <DatePicker
                          className="form-control fieldStyle"
                          style={{
                            width: '100%',
                            height: 38,
                            borderRadius: 0,
                          }}
                          name="evaluation_date"
                          calendar={persian}
                          locale={persian_fa}
                          value={updatingRecord?.evaluation_date}
                          months={persianMonthOptions}
                          onChange={(e) =>
                            setEvaluationDate(
                              new Date(e.toDate()).getFullYear() +
                                '-' +
                                (new Date(e.toDate()).getMonth() + 1) +
                                '-' +
                                new Date(e.toDate()).getDate(),
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="form-group w-100">
                      <label
                        style={inputLabel}
                        for="evaluation_outcome"
                        className="col-form-label"
                      >
                        evaluation_outcome
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="evaluation_outcome"
                        id="evaluation_outcome"
                        value={values.evaluation_outcome}
                        options={outcomeOptions}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.evaluation_outcome &&
                      touched.evaluation_outcome ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.evaluation_outcome}
                        </div>
                      ) : null}
                    </div>

                    <br />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                      ثبت
                    </button>
                  </form>
                </>
              )}
            </Formik>
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
export default EmployeeEvaluation;
