import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { evaluationTypeOptions } from '../global-data/options';
// import { teacherEvalautionSchema } from '../global-data/forms-validation';
import { Card } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
// import { Colxx } from 'components/common/CustomBootstrap';
// import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import config from '../../../config';
import TeacherList from '../teachers/Components/TeacherList';
import callApi from 'helpers/callApi';

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

const TeacherSelection = () => {
  const { teacherId } = useParams();
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
      teacher_id: values.teacher.value,
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

    axios
      .post(evaluationApiUrl, data)
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
  const [isNext, setIsNext] = useState(false);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionTitle" />}
        </h3>
        <TeacherList
          onFilter={onFilter}
          handleResetFields={handleResetFields}
          handleTableChange={handleTableChange}
          data={items}
          columns={columns}
          isLoading={isLoading}
          teacherLink={`teacher-evalaution/`}
        />
      </Card>
    </>
  );
};
export default TeacherSelection;
