import React, { useContext, useState } from 'react';
import { Table as TB } from 'antd';
import { NavLink } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { AuthContext } from 'context/AuthContext';
import IntlMessages from 'helpers/IntlMessages';
import {
  genderOptions,
  gradeOptions,
  instituteStatusOptions,
  stepOptions,
} from '../../global-data/options';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const NeedsList = ({
  onFilter,
  handleResetFields,
  handleTableChange,
  data,
  isLoading,
  teacherLink,
}) => {
  const { provinces } = useContext(AuthContext);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns = [
    {
      title: 'ګڼه/شماره',
      dataIndex: 'sno',
      width: '5%',
    },
    {
      title: 'اساس نمبر',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'تاریخ',
      dataIndex: 'date',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'ارزیابی کننده نوم',
      dataIndex: 'evaluator_name',
      sorter: (a, b) => a.name - b.name,
      width: '10%',
    },
    {
      title: 'استاد نوم/نام',
      dataIndex: 'teacher_name',
      sorter: (a, b) => a.name - b.name,
      width: '10%',
    },
    {
      title: 'سال تعلیمی',
      dataIndex: 'educational_year',
      width: '15%',
    },
    {
      title: 'مضمون',
      dataIndex: 'subject',
      width: '15%',
    },
    {
      title: 'سمستر',
      dataIndex: 'semester',
      width: '5%',
    },
    {
      title: 'بست',
      dataIndex: 'grade',
      width: '10%',
    },
    {
      title: 'قدم',
      dataIndex: 'step',
      width: '10%',
    },
    {
      title: 'اعلی',
      dataIndex: 'excellent',
      width: '5%',
    },
    {
      title: 'عالی',
      dataIndex: 'outstanding',
      width: '5%',
    },
    {
      title: 'خوب',
      dataIndex: 'good',
      width: '5%',
    },
    {
      title: 'متوسط',
      dataIndex: 'average',
      width: '5%',
    },
    {
      title: 'ضعیف',
      dataIndex: 'weak',
      width: '5%',
    },
    {
      title: 'موجود نیست',
      dataIndex: 'not_applicable',
      width: '5%',
    },
    {
      title: 'جمله',
      dataIndex: 'total',
      width: '5%',
    },
    {
      title: 'topic',
      dataIndex: 'topic',
      width: '10%',
    },
    {
      title: 'description',
      dataIndex: 'description',
      width: '10%',
    },
    {
      title: 'حالت',
      dataIndex: 'status',
      width: '5%',
    },
  ];
  return (
    <>
      <div
        style={{
          padding: 10,
          display: 'flex',
        }}
      >
        <Formik
          initialValues={{
            filterId: '',
            filterInstitute: [],
            filterProvince: [],
          }}
          onSubmit={onFilter}
        >
          {({
            values,
            setFieldValue,
            handleSubmit,
            setFieldTouched,
            resetForm,
          }) => (
            <>
              <Field
                className="form-control fieldStyle"
                name="filterId"
                placeholder="ایدی"
              />
              <FormikReactSelect
                className="w-100"
                placeholder="ولایت"
                name="filterProvince"
                options={provinces}
                value={values.filterProvince}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              <FormikReactSelect
                className="w-100"
                placeholder="جنسیت"
                name="filterGender"
                options={genderOptions}
                value={values.filterGender}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              <FormikReactSelect
                className="w-100"
                placeholder="حالت"
                name="filterStatus"
                options={instituteStatusOptions}
                value={values.filterStatus}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
              />
              <button className="btn btn-secondary" onClick={handleSubmit}>
                فلټر
              </button>

              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleResetFields(resetForm)}
              >
                ریسیټ
              </button>
            </>
          )}
        </Formik>
      </div>

      <TB
        columns={columns}
        // rowKey={(record) => record.login.uuid}
        pagination={tableParams.pagination}
        loading={isLoading}
        onChange={handleTableChange}
        dataSource={data?.map((item, index) => ({
          key: index,
          sno: (tableParams.pagination.current - 1) * 10 + (index + 1),
          id: item.id,
          date: item.date,
          evaluator_name: (
            <NavLink to={{ pathname: teacherLink + item.id, state: { item } }}>
              {item.evaluator_name}
            </NavLink>
          ),
          teacher_name: item.teacher?.name,
          educational_year: item.educational_year,
          subject: item.subject,
          semester: item.semester,
          grade: gradeOptions.map((g) => {
            if (g.value === item.grade)
              return <IntlMessages id={g.label.props.id} />;
          }),
          step: stepOptions.map((g) => {
            if (g.value === item.step)
              return <IntlMessages id={g.label.props.id} />;
          }),
          excellent: item.excellent,
          outstanding: item.outstanding,
          good: item.good,
          average: item.average,
          weak: item.weak,
          not_applicable: item.not_applicable,
          topic: item.topic,
          description: item.description,
          action: (
            <NavLink
              to={`/app/teachers/register/${item.id}`}
              // style={{ width: '10%' }}
            >
              <div>
                <BsPencilSquare
                  color="green"
                  outline
                  style={{ fontSize: '20px' }}
                  id="updateIcon"
                />
              </div>
            </NavLink>
          ),
        }))}
      />
    </>
  );
};

export default NeedsList;
