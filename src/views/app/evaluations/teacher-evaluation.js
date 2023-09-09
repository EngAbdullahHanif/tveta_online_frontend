import React, { useState, useEffect, useContext } from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  evaluationTypeOptions,
  genderOptions,
  persianMonthOptions,
} from '../global-data/options';
import {
  // teacherEvalautionSchema,
  teacherEvaluationValidationSchema,
} from '../global-data/forms-validation';
import { Row, Card, CardBody, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import { Col, InputNumber, Slider } from 'antd';
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
const teachersApiUrl = `${servicePath}/teachers/`;
const institutesApiUrl = `${servicePath}/institute/`;
const departmentsApiUrl = `${servicePath}/institute/department/`;
const classesApiUrl = `${servicePath}/institute/classs/`;
const subjectApiUrl = `${servicePath}/institute/subject/`;
// const fieldsApiUrl = `${servicePath}/institute/field/`;
const evaluationApiUrl = `${servicePath}/teachers/evaluation-create/`;
const TeacherEvaluationAPI = `${servicePath}/teachers/evaluation`;
//http://localhost:8000/teachers/evaluation/?id=1

const TeacherEvaluation = (props) => {
  const { provinces, districts } = useContext(AuthContext);
  const [updatingRecord, setUpdatingRecord] = useState({});
  const [evaluationDate, setEvaluationDate] = useState();

  const { teacherId } = useParams();
  const location = useLocation();
  console.log('teacher evaluation', teacherId);
  async function fetchData() {
    const { data } = await axios.get(
      `${TeacherEvaluationAPI}/?id=${teacherId}`,
    );
    setInitialEvaluator(data[0].evaluator_name);
    setInitialStrengthPoints(data[0].strong_points);
    setInitialWeaknessPoint(data[0].weak_points);
    setInitialMarks(data[0].score);
    setInitialEvaluationDate(data[0].evaluation_date);
    setInitialSuggestions(data[0].suggestions);
    setInitialTopic(data[0].topic);

    setInitialId([
      { value: data[0].teacher_id.id, label: data[0].teacher_id.name },
    ]);
    setInitialDepartment([
      {
        value: data[0].department_id.id,
        label: data[0].department_id.name,
      },
    ]);
    setInitialSubject([
      {
        value: data[0].subject_id.id,
        label: data[0].subject_id.name,
      },
    ]);

    setInitialInsititute([
      {
        value: data[0].institute_id.id,
        label: data[0].institute_id.name,
      },
    ]);
    setInitialClass([
      {
        value: data[0].class_id.id,
        label: data[0].class_id.name,
      },
    ]);

    const TeacherEvaluationOptions = evaluationTypeOptions.map(
      (evaluationType) => {
        if (evaluationType.value === data[0].evaluation_type) {
          setInitialEvluationType(evaluationType);
        }
      },
    );
  }

  useEffect(() => {
    if (teacherId) {
      fetchData();
    }
    //setUpdateMode(true);
  }, []);

  const [initialId, setInitialId] = useState([]);
  const [initialDepartment, setInitialDepartment] = useState([]);
  const [initialSubject, setInitialSubject] = useState([]);
  const [initialEvaluator, setInitialEvaluator] = useState();
  const [initialMarks, setInitialMarks] = useState('');
  const [initialStrengthPoints, setInitialStrengthPoints] = useState('');
  const [initialEvaluationDate, setInitialEvaluationDate] = useState('');
  const [initialInsititute, setInitialInsititute] = useState([]);
  const [initialClass, setInitialClass] = useState([]);
  const [initialTopic, setInitialTopic] = useState('');
  const [initialEvluationType, setInitialEvluationType] = useState([]);
  const [initialSuggestions, setInitialSuggestions] = useState('');
  const [initialWeaknessPoint, setInitialWeaknessPoint] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [strengthPoints, setStrengthPoints] = useState('');
  const [weaknessPoints, setWeaknessPoints] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [instituteTeachers, setInstituteTeachers] = useState([]);
  const [score, setScore] = useState(1);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns = [
    {
      // title: <PromptInput title="اساس نمبر" colName="id" endpoint="teachers" />,
      title: 'اساس نمبر',
      dataIndex: 'student_id',
      sorter: (a, b) => a.student_id - b.student_id,
      width: '5%',
    },
    {
      title: 'نوم/نام',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
      // render: (name) => `${name.first} ${name.last}`,
      width: '15%',
    },
    {
      title: 'د پلار نوم',
      dataIndex: 'father_name',
      width: '15%',
    },
    {
      title: 'جنسیت',
      dataIndex: 'gender',
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' },
      // ],
      // filterSearch: true,
      // onFilter: (value, record) => {
      //   record.gender.indexOf(value) === 0;
      // },
      width: '10%',
    },
    {
      title: 'ولایت',
      dataIndex: 'province',
      width: '10%',
    },
    {
      title: 'تلفون شمیره',
      dataIndex: 'phone_number',
      width: '12%',
    },
    {
      title: 'بست',
      dataIndex: 'grade',
      width: '15%',
    },
    {
      title: 'حالت',
      dataIndex: 'status',
      width: '5%',
    },
    {
      title: 'اپډیټ',
      dataIndex: 'action',
      width: '5%',
    },
  ];
  const fetchTeachers = async () => {
    const response = await axios.get(teachersApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setTeachers(updatedData);
  };

  const fetchInstitutes = async () => {
    const response = await axios.get(institutesApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setInstitutes(updatedData);
  };

  const fetchDepartments = async () => {
    const response = await axios.get(departmentsApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setDepartments(updatedData);
  };

  const fetchClasses = async () => {
    const response = await axios.get(classesApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name + ' - ' + item.semester + ' - ' + item.section,
    }));
    setClasses(updatedData);
  };
  const fetchSubjects = async () => {
    const response = await axios.get(subjectApiUrl);
    const updatedData = await response.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
    setSubjects(updatedData);
  };
  useEffect(() => {
    fetchData();
  }, [!isFilter ? JSON.stringify(tableParams) : null]);

  async function fetchData(params = {}) {
    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = `institute/`;
    const params1 = {
      ...params,
      // if filters reseted, goto first page
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };
    // const params = {
    //   id: teacherId,
    //   // current_district: district,
    //   page: currentPage,
    //   limit: selectedPageSize,
    //   gender: selectedGenderOption?.value,
    //   current_province:
    //     selectedProvinceOption?.column === 'all'
    //       ? ''
    //       : selectedProvinceOption?.column,
    // };
    // console.log('GENDER OPT', selectedProvinceOption);
    // if (institute !== '') {
    //   params.institute_id = institute.id;
    // } else if (
    //   selectedProvinceOption?.column === 'all' &&
    //   selectedGenderOption?.column === 'all'
    // ) {
    //   if (rest == true) {
    //     setDistrict('');
    //     setTeacherId('');
    //     setRest(false);
    //   }
    //   params.current_province = null;
    //   params.gender = null;
    // } else if (selectedProvinceOption?.column === 'all') {
    //   params.province = null;
    //   params.gender = selectedGenderOption?.value;
    // } else if (selectedGenderOption?.column === 'all') {
    //   params.gender = null;
    // }
    const response = await callApi(`teachers/`, '', null, params1);
    setIsLoading(false);
    if (response.data && response.status === 200) {
      setInstituteTeachers(response.data);
      console.log('TTTTTTTTTTTTTTTTTTTTTTTTT', response?.data);
      setItems(response?.data.results);
      setSelectedItems([]);
      // setTotalItemCount(data);
      setIsLoaded(true);
    } else {
      console.log('students error');
    }
  }

  const handleTableChange = (pagination, filter, sorter) => {
    setIsFilter(false);
    setTableParams({ pagination, filter, ...sorter });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setItems([]);
    }
  };
  const onFilter = async (values) => {
    setIsFilter(true);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
    let params = {
      page: 1,
    };

    params.current_province = values.filterProvince?.value;
    params.gender = values.filterGender?.value;
    params.status = values.filterStatus?.value;
    params.id = values.filterId || null;
    fetchData(params);
  };
  const handleResetFields = (resetForm) => {
    resetForm({
      values: {
        filterId: '',
        filterInstitute: [],
        filterProvince: [],
        filterGender: [],
      },
    });
    setIsFilter(false);
    fetchData();
  };
  useEffect(() => {
    console.log('state: ', location);
    setTeacher(location.state?.item);
    fetchTeachers();
    fetchInstitutes();
    fetchDepartments();
    fetchClasses();
    fetchSubjects();
  }, []);

  const initialValues = {
    id: initialId,
    department: initialDepartment,
    subject: initialSubject,
    evaluator: initialEvaluator,
    strengthPoints: initialStrengthPoints,
    marks: initialMarks,
    evaluationDate: initialEvaluationDate,
    institute: initialInsititute,
    class: initialClass,
    topic: initialTopic,
    evaluationType: initialEvluationType,
    weaknessPoints: initialWeaknessPoint,
    suggestion: initialSuggestions,
  };
  const onSubmit = (values) => {
    setIsNext(true);
    console.log(values);
    const data = {
      teacher_id: teacher.id,
      institute_id: values.institute.value,
      department_id: values.department.value,
      class_id: values.class.value,
      subject_id: values.subject.value,
      topic: values.topic,
      evaluator_name: values.evaluator,
      evaluation_type: values.evaluationType.value,
      strong_points: strengthPoints,
      weak_points: weaknessPoints,
      suggestions: suggestion,
      score: values.marks,
      evaluation_date: values.evaluationDate,
      user_id: 1,
    };
    console.log('Evaluation Data', values);
    // axios
    //   .post(evaluationApiUrl, data)
    //   .then((response) => {
    //     console.log('response', response);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  };
  const [isNext, setIsNext] = useState(false);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionTitle" />}
        </h3>
        <Card className="rounded m-4">
          <CardBody>
            <div>
              <Row>
                <Colxx className=" pt-5" style={{ paddingInline: '3%' }}>
                  <h2
                    className="bg-primary "
                    style={{
                      padding: '8px',
                      paddingInline: '30px',
                      borderRadius: '10px',
                    }}
                  >
                    <IntlMessages id="forms.personalInfo" />
                  </h2>
                </Colxx>
              </Row>
              <Row className="justify-content-center   rounded ">
                <Colxx style={{ paddingInline: '4%' }} xxs="">
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.NameLabel" />
                  </Label>
                  <h2>{teacher.name}</h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.FatherNameLabel" />
                  </Label>
                  <h2>{teacher.father_name}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.GrandFatherNameLabel" />
                  </Label>
                  <h2>{teacher.father_name}</h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="gender.gender" />
                  </Label>
                  <h2>
                    {
                      genderOptions.find((op) => op.value === teacher.gender)
                        ?.label
                    }
                  </h2>

                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.PhoneNoLabel" />
                  </Label>
                  <h2>{teacher.phone_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="teacher.EmailLabel" />
                  </Label>
                  <h2>{teacher.email}</h2>
                  <br />
                  <br />
                </Colxx>
                <Colxx style={{ paddingInline: '4%' }}>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdTazkiraNoLabel" />
                  </Label>
                  <h2>{teacher.registration_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdIdCardCoverLabel" />
                  </Label>
                  <h2>{teacher.cover_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdIdCardPageNoLabel" />
                  </Label>
                  <h2>{teacher.page_number}</h2>
                  <Label style={inputLabel}>
                    <IntlMessages id="forms.StdDoBLabel" />
                  </Label>
                  <h2>
                    {teacher.year_of_birth}-{teacher.month_of_birth || 'میاشت'}-
                    {teacher.day_of_birth || 'ورځ'}
                  </h2>

                  <br />
                  <br />
                </Colxx>
              </Row>
            </div>
          </CardBody>
        </Card>
        <CardBody className="w-50">
          {!isNext ? (
            // <Formik
            //   enableReinitialize={true}
            //   initialValues={initialValues}
            //   onSubmit={onSubmit}
            //   validationSchema={teacherEvalautionSchema}
            // >
            //   {({
            //     errors,
            //     touched,
            //     values,
            //     setFieldTouched,
            //     setFieldValue,
            //   }) => (
            //     <Form className="av-tooltip tooltip-label-right error-l-150 ">
            //       <Row className="justify-content-center">
            //         <Colxx xxs="5">
            //           {/* teacher Name*/}
            //           {/* <FormGroup className="form-group has-float-label ">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.IdLabel" />
            //             </Label>

            //             <FormikReactSelect
            //               name="id"
            //               id="id"
            //               value={values.id}
            //               options={teachers}
            //               onChange={setFieldValue}
            //               onBlur={setFieldTouched}
            //             />
            //             {errors.id && touched.id ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.id}
            //               </div>
            //             ) : null}
            //           </FormGroup> */}

            //           {/* Departement Id */}

            //           <FormGroup className="form-group has-float-label ">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="forms.studyDepartment" />
            //             </Label>
            //             <FormikReactSelect
            //               name="department"
            //               id="department"
            //               value={values.department}
            //               options={departments}
            //               onChange={setFieldValue}
            //               onBlur={setFieldTouched}
            //               required
            //             />
            //             {errors.department && touched.department ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.department}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Subject Id */}
            //           <FormGroup className="form-group has-float-label ">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="marks.SubjectLabel" />
            //             </Label>
            //             <FormikReactSelect
            //               name="subject"
            //               id="subject"
            //               value={values.subject}
            //               options={subjects}
            //               onChange={setFieldValue}
            //               onBlur={setFieldTouched}
            //               required
            //             />
            //             {errors.subject && touched.subject ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.subject}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* evaluator Name */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.evaluatorLabel" />
            //             </Label>
            //             <Field className="form-control" name="evaluator" />
            //             {errors.evaluator && touched.evaluator ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.evaluator}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Strength Points */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.strengthPointsLabel" />
            //             </Label>
            //             <Field
            //               className="form-control"
            //               name="strengthPoints"
            //               as="textarea"
            //             />
            //             {errors.strengthPoints && touched.strengthPoints ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.strengthPoints}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Achieved Marks */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.marksLabel" />
            //             </Label>
            //             <Field
            //               className="form-control"
            //               name="marks"
            //               type="number"
            //             />
            //             {errors.marks && touched.marks ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.marks}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Evalualtion Date */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.evaluationDateLabel" />
            //             </Label>
            //             <Field
            //               className="form-control"
            //               name="evaluationDate"
            //               type="date"
            //             />
            //             {errors.evaluationDate && touched.evaluationDate ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.evaluationDate}
            //               </div>
            //             ) : null}
            //           </FormGroup>
            //         </Colxx>
            //         <Colxx xxs="5">
            //           {/* Institute Name*/}
            //           <FormGroup className="form-group has-float-label ">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="forms.InstituteLabel" />
            //             </Label>

            //             <FormikReactSelect
            //               name="institute"
            //               id="institute"
            //               value={values.institute}
            //               options={institutes}
            //               onChange={setFieldValue}
            //               onBlur={setFieldTouched}
            //             />
            //             {errors.institute && touched.institute ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.institute}
            //               </div>
            //             ) : null}
            //           </FormGroup>
            //           {/*  Class Id  */}
            //           <FormGroup className="form-group has-float-label ">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="marks.ClassLabel" />
            //             </Label>
            //             <FormikReactSelect
            //               name="class"
            //               id="class"
            //               value={values.class}
            //               options={classes}
            //               onChange={setFieldValue}
            //               onBlur={setFieldTouched}
            //             />
            //             {errors.class && touched.class ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.class}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Topic */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.topicLabel" />
            //             </Label>
            //             <Field className="form-control" name="topic" />
            //             {errors.topic && touched.topic ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.topic}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Evlaution type */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.evaluationTypeLabel" />
            //             </Label>
            //             <FormikReactSelect
            //               name="evaluationType"
            //               id="evaluationType"
            //               value={values.evaluationType}
            //               options={evaluationTypeOptions}
            //               onChange={setFieldValue}
            //               onBlur={setFieldTouched}
            //               required
            //             />
            //             {errors.evaluationType && touched.evaluationType ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.evaluationType}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Weakness Points */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.weaknessPointsLabel" />
            //             </Label>
            //             <Field
            //               className="form-control"
            //               name="weaknessPoints"
            //               as="textarea"
            //             />
            //             {errors.weaknessPoints && touched.weaknessPoints ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.weaknessPoints}
            //               </div>
            //             ) : null}
            //           </FormGroup>

            //           {/* Suggestion */}
            //           <FormGroup className="form-group has-float-label">
            //             <Label style={inputLabel}>
            //               <IntlMessages id="teacher.suggestionLabel" />
            //             </Label>
            //             <Field
            //               className="form-control"
            //               name="suggestion"
            //               as="textarea"
            //               rows={4}
            //             />
            //             {errors.suggestion && touched.suggestion ? (
            //               <div className="invalid-feedback d-block bg-danger text-white">
            //                 {errors.suggestion}
            //               </div>
            //             ) : null}
            //           </FormGroup>
            //         </Colxx>
            //       </Row>

            //       <Row>
            //         <Colxx>
            //           <Button
            //             color="primary"
            //             className="float-right m-5"
            //             size="lg"
            //             type="submit"
            //           >
            //             <span className="spinner d-inline-block">
            //               <span className="bounce1" />
            //               <span className="bounce2" />
            //               <span className="bounce3" />
            //             </span>
            //             <span className="label">
            //               <IntlMessages id="button.SubmitButton" />
            //             </span>
            //           </Button>
            //         </Colxx>
            //       </Row>
            //     </Form>
            //   )}
            // </Formik>
            <Formik
              enableReinitialize={true}
              initialValues={
                !updatingRecord
                  ? {
                      topic: '',
                      evaluator_name: '',
                      evaluation_type: [],
                      strong_points: '',
                      weak_points: '',
                      suggestions: '',
                      evaluation_date: '',
                      institute: [],
                      department: [],
                      classs: [],
                      subject: [],
                    }
                  : {
                      topic: updatingRecord.topic,
                      evaluator_name: updatingRecord.evaluator_name,
                      evaluation_type: evaluationTypeOptions.find(
                        (inst) => inst.value === updatingRecord.evaluation_type,
                      ),
                      strong_points: updatingRecord.strong_points,
                      weak_points: updatingRecord.weak_points,
                      suggestions: updatingRecord.suggestions,
                      evaluation_date: updatingRecord.evaluation_date,
                      institute: institutes.find(
                        (inst) => inst.value === updatingRecord.institute,
                      ),
                      department: departments.find(
                        (dep) => dep.value === updatingRecord.department,
                      ),
                      classs: classes.find(
                        (dep) => dep.value === updatingRecord.classs,
                      ),
                      subject: subjects.find(
                        (dep) => dep.value === updatingRecord.subject,
                      ),
                    }
              }
              validationSchema={teacherEvaluationValidationSchema}
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
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      <div className="form-group w-100">
                        <label
                          style={inputLabel}
                          for="evaluator_name"
                          className="col-form-label"
                        >
                          ارزیابی کننده
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <Field
                          className="form-control fieldStyle"
                          name="evaluator_name"
                        />
                        {errors.evaluator_name && touched.evaluator_name ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.evaluator_name}
                          </div>
                        ) : null}
                      </div>
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
                          options={evaluationTypeOptions}
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
                      </div>
                      <div className="form-group w-100">
                        <label
                          style={inputLabel}
                          for="department"
                          className="col-form-label"
                        >
                          ډیپارتمنت
                          <span style={{ color: 'red' }}>*</span>
                        </label>
                        <FormikReactSelect
                          name="department"
                          id="department"
                          value={values.department}
                          options={departments}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.department && touched.department ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.department}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="classs"
                        className="col-form-label"
                      >
                        صنف
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <FormikReactSelect
                        name="classs"
                        id="classs"
                        value={values.classs}
                        options={classes}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                        required
                      />
                      {errors.classs && touched.classs ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.classs}
                        </div>
                      ) : null}
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
                          for="subject"
                          className="col-form-label"
                        >
                          مضمون
                          <span style={{ color: 'red' }}>*</span>
                        </label>

                        <FormikReactSelect
                          name="subject"
                          id="subject"
                          value={values.subject}
                          options={subjects}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                          required
                        />
                        {errors.subject && touched.subject ? (
                          <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                            {errors.subject}
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

                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="topic"
                        className="col-form-label"
                      >
                        موضوع
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field className="form-control fieldStyle" name="topic" />
                      {errors.topic && touched.topic ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.topic}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="strong_points"
                        className="col-form-label"
                      >
                        مثبت پواینت
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="strong_points"
                      />
                      {errors.strong_points && touched.strong_points ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.strong_points}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="weak_points"
                        className="col-form-label"
                      >
                        منفی پواینت
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="weak_points"
                      />
                      {errors.weak_points && touched.weak_points ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.weak_points}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-group">
                      <label
                        style={inputLabel}
                        for="suggestions"
                        className="col-form-label"
                      >
                        توسعه
                        <span style={{ color: 'red' }}>*</span>
                      </label>
                      <Field
                        className="form-control fieldStyle"
                        name="suggestions"
                      />
                      {errors.suggestions && touched.suggestions ? (
                        <div className="invalid-feedback d-block bg-danger text-white messageStyle">
                          {errors.suggestions}
                        </div>
                      ) : null}
                    </div>
                    <label
                      style={inputLabel}
                      for="score"
                      className="col-form-label"
                    >
                      نمری
                      <span style={{ color: 'red' }}>*</span>
                    </label>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Col span={4}>
                        <InputNumber
                          min={1}
                          max={10}
                          style={{ margin: '0 16px' }}
                          value={score}
                          onChange={(val) => setScore(val)}
                        />
                      </Col>
                      <Col span={17}>
                        <Slider
                          min={1}
                          max={10}
                          onChange={(val) => setScore(val)}
                          value={typeof score === 'number' ? score : 0}
                        />
                      </Col>
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
export default TeacherEvaluation;
