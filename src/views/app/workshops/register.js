import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field } from 'formik';
import { useParams } from 'react-router-dom';
import { persianMonthOptions } from '../global-data/options';
// import {
//   teacherEvaluationValidationSchema,
// } from '../global-data/forms-validation';
import { Card, CardBody, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import config from '../../../config';
// import TeacherList from '../teachers/Components/TeacherList';
import callApi from 'helpers/callApi';
import { useLocation } from 'react-router-dom';
import { inputLabel } from 'config/styling';
import { AuthContext } from 'context/AuthContext';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
const servicePath = config.API_URL;

const TeacherEvaluationAPI = `${servicePath}/teachers/evaluation`;
//http://localhost:8000/teachers/evaluation/?id=1

const WorkshopRegister = (props) => {
  const { institutes } = useContext(AuthContext);
  const [workshop, setWorkshop] = useState({});
  const [workshopTopics, setWorkshopTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { type, workshopId } = useParams();

  const location = useLocation();
  console.log('teacher evaluation', workshopId);

  async function fetchData() {
    let data;
    setIsLoading(true);
    try {
      const response = await callApi('workshops/', '', null);
      if (response.data && response.status === 200) {
        console.log('RESPONSE in Fetch Workshop for update: ', response.data);
        const updatedData = await response?.data.results.filter(
          (item) => item.id == workshopId,
        );
        data = updatedData[0];
        console.log('UPDATED DATA: ', data);
        setWorkshop(data);

        console.log('UPDATED Workshop DATA: ', workshop);
      } else {
        console.log('institute error');
      }
    } catch (e) {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (workshopId) {
      fetchData();
    }
  }, []);

  const [teacher, setTeacher] = useState([]);
  const getWorkshopTopics = () => {
    callApi('workshops/topics/').then(async (response) => {
      if (response.data && response.status === 200) {
        const updatedData = await response.data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setWorkshopTopics(updatedData);
      } else {
        console.log('workshop error');
      }
    });
  };
  useEffect(() => {
    getWorkshopTopics();
    console.log('state: ', location);
    setTeacher(location.state?.item);
  }, []);

  const onSubmit = async (values) => {
    values.start_date =
      values?.start_date && typeof values.start_date != 'string'
        ? values?.start_date
            .convert(gregorian, gregorian_en)
            .format('YYYY-MM-DD')
        : values.start_date || null;
    values.end_date =
      values?.end_date && typeof values.end_date != 'string'
        ? values?.end_date.convert(gregorian, gregorian_en).format('YYYY-MM-DD')
        : values.end_date || null;
    values.topic = values.topic.value;
    console.log('VVVVVVVVVVVVVVVVVVVV', values);
    let params = { endPoint: 'workshops/', method: 'POST' };

    if (workshopId) {
      params.endPoint = `workshops/${workshopId}/`;
      params.method = 'PATCH';
    }
    await callApi(params.endPoint, params.method, values)
      .then((response) => {
        console.log('response in workshops ', response.data);
        setIsNext(true);
      })
      .catch((error) => {
        console.log('Error in workshops ', error);
      });
  };
  const [isNext, setIsNext] = useState(false);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">فورم ورکشاپ </h3>
        <CardBody className="w-50">
          {!isNext ? (
            <Formik
              enableReinitialize={true}
              initialValues={{
                title: workshop.title || '',
                description: workshop.description || '',
                start_date: workshop.start_date || '',
                end_date: workshop.end_date || '',
                location: workshop.location || '',
                topic:
                  workshopTopics.find((op) => op.value === workshop.topic) ||
                  '',
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
                        عنوان
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field className="form-control fieldStyle" name="title" />
                    </div>
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        توضیحات
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="description"
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div className="">
                        <label
                          style={inputLabel}
                          for="year_of_completion"
                          className="col-form-label"
                        >
                          تاریخ شروع
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <br />

                        <DatePicker
                          style={{
                            width: '100%',
                            height: 40,
                            borderRadius: 0,
                            border: 'none',
                            boxShadow: 'none',
                          }}
                          containerClassName="form-control fieldStyle"
                          name="start_date"
                          value={values.start_date}
                          calendar={persian}
                          locale={persian_fa}
                          months={persianMonthOptions}
                          format="YYYY-MM-DD"
                          onChange={(date) => {
                            setFieldValue(
                              'start_date',
                              date?.isValid ? date : '',
                            );
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={inputLabel}
                          for="year_of_completion"
                          className="col-form-label"
                        >
                          تاریخ ختم
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <br />

                        <DatePicker
                          style={{
                            width: '100%',
                            height: 40,
                            borderRadius: 0,
                            border: 'none',
                            boxShadow: 'none',
                          }}
                          containerClassName="form-control fieldStyle"
                          name="end_date"
                          value={values.end_date}
                          calendar={persian}
                          locale={persian_fa}
                          months={persianMonthOptions}
                          format="YYYY-MM-DD"
                          onChange={(date) => {
                            setFieldValue(
                              'end_date',
                              date?.isValid ? date : '',
                            );
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        ادرس
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="location"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="educational_year"
                        className="col-form-label"
                      >
                        موضوع
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="topic"
                        id="topic"
                        value={values.topic}
                        options={workshopTopics}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        isSearchable={true}
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
export default WorkshopRegister;
