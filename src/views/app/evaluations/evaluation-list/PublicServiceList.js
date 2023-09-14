import React, { useContext, useState } from 'react';
import { Table as TB } from 'antd';
import { NavLink } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { AuthContext } from 'context/AuthContext';
import IntlMessages from 'helpers/IntlMessages';
import {
  evaluationTypes,
  genderOptions,
  gradeOptions,
  instituteStatusOptions,
  outcomeOptions,
  stepOptions,
} from '../../global-data/options';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const PublicServiceList = ({
  onFilter,
  handleResetFields,
  handleTableChange,
  data,
  isLoading,
  teacherLink,
}) => {
  const { provinces, institutes } = useContext(AuthContext);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns = [
    {
      title: 'اساس نمبر',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'تاریخ',
      dataIndex: 'evaluation_date',
      width: '5%',
    },
    {
      title: 'title',
      dataIndex: 'title',
      sorter: (a, b) => a.title - b.title,
      width: '10%',
    },
    {
      title: 'institute',
      dataIndex: 'institute',
      sorter: (a, b) => a.institute - b.institute,
      width: '10%',
    },
    {
      title: 'evaluation_type',
      dataIndex: 'evaluation_type',
      width: '5%',
    },
    {
      title: 'employee',
      dataIndex: 'employee',
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
      title: 'sts',
      dataIndex: 'self_total_score',
      width: '5%',
    },

    {
      title: 'dts',
      dataIndex: 'director_total_score',
      width: '5%',
    },
    {
      title: 'dd',
      dataIndex: 'direct_director',
      width: '10%',
    },
    {
      title: 'dds',
      dataIndex: 'direct_director_suggestions',
      width: '10%',
    },
    {
      title: 'ارزیابی ډول',
      dataIndex: 'evaluation_type',
      width: '10%',
    },
    {
      title: 'ارزیابی نتیجه',
      dataIndex: 'evaluation_outcome',
      width: '10%',
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
          id: item.id,
          evaluation_date: item.evaluation_date,
          title: (
            <NavLink to={{ pathname: teacherLink + item.id, state: { item } }}>
              {item.title}
            </NavLink>
          ),
          institute: institutes.find((op) => op.value === item.institute)
            ?.label,
          evaluation_type: evaluationTypes.find(
            (op) => op.value === item.evaluation_type,
          )?.label,
          employee: item.employee,
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

          self_total_score: item.self_total_score,

          director_total_score: item.director_total_score,

          direct_director: item.direct_director,
          direct_director_suggestions: item.direct_director_suggestions,
          evaluation_outcome: outcomeOptions.find(
            (op) => op.value === item.evaluation_outcome,
          )?.label,

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

export default PublicServiceList;
