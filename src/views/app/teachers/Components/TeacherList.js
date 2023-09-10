import React, { useContext, useState } from 'react';
import { Badge } from 'reactstrap';
import { Table as TB } from 'antd';
import { NavLink } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { AuthContext } from 'context/AuthContext';
import IntlMessages from 'helpers/IntlMessages';
import {
  genderOptions,
  gradeOptions,
  instituteStatusOptions,
  teacherCurrentStatusOptions,
} from '../../global-data/options';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

const TeacherList = ({
  onFilter,
  handleResetFields,
  handleTableChange,
  data,
  columns,
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
              <Field name="filterId" placeholder="ایدی" />
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
          student_id: item.id,
          name: (
            <NavLink to={{ pathname: teacherLink + item.id, state: { item } }}>
              {item.name}
            </NavLink>
          ),
          gender: genderOptions.find((op) => op.value === item.gender).label,
          father_name: item.father_name,
          province: provinces.find((pro) => pro.value == item.current_province)
            .label,
          phone_number: item.phone_number,
          status: teacherCurrentStatusOptions.map((status) => {
            if (status.value == item.status) {
              return (
                <div
                  className="mb-1 text-small"
                  style={{ fontSize: '20px', width: '10%' }}
                >
                  <Badge
                    color={
                      status.value == 'dismissed'
                        ? 'danger'
                        : status.value == 'inprogress' ||
                          status.value == 'active'
                        ? 'success'
                        : status.value == 'freeze'
                        ? 'secondary'
                        : 'warning'
                    }
                    pill
                  >
                    {status.label}
                  </Badge>
                </div>
              );
            }
          }),
          grade: gradeOptions.map((g) => {
            if (g.value === item.grade)
              return <IntlMessages id={g.label.props.id} />;
          }),
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

export default TeacherList;
