import React, { useState, useEffect, useContext } from 'react';
import {
  BuildingTypeOptions,
  instituteStatusOptions,
  dormGenderOptions,
} from '../../global-data/options';
import callApi from 'helpers/callApi';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Badge } from 'reactstrap';
import { Table as TB } from 'antd';
// import { servicePath } from 'constants/defaultValues';
import { NavLink } from 'react-router-dom';

import useMousetrap from 'hooks/use-mousetrap';
import { AuthContext } from 'context/AuthContext';
import { BsPencilSquare } from 'react-icons/bs';

const ThumbListPages = ({ match }) => {
  const { provinces, districts, institutes } = useContext(AuthContext);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);

  const [isFilter, setIsFilter] = useState(false);

  const columns = [
    {
      title: 'نمبر اساس',
      dataIndex: 'number',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'کود',
      dataIndex: 'code',
      width: '10%',
    },
    {
      title: 'نوم/نام',
      dataIndex: 'name',
      width: '22%',
      responsive: ['sm'],
    },
    {
      title: 'ولایت',
      dataIndex: 'province',
      width: '10%',
    },
    {
      title: 'ولسوالی/تاحیه',
      dataIndex: 'district',
      width: '15%',
      responsive: ['sm'],
    },

    {
      title: 'نوعیت',
      dataIndex: 'ownership',
      width: '10%',
    },
    {
      title: 'جنسیت',
      dataIndex: 'gender',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'حالت',
      dataIndex: 'status',
      width: '10%',
    },
    {
      title: 'اپډیټ',
      dataIndex: 'action',
    },
  ];

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
    try {
      const response = await callApi(endpoint, null, null, params1);
      if (response.data && response.status === 200) {
        setItems(response.data?.results);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response?.data?.count,
          },
        });
      } else {
        console.log('students error');
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false);
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
    params.ownership = values.filterOwnership?.value;
    params.province = values.filterProvince?.value;
    params.gender = values.filterGender?.value;
    params.status = values.filterStatus?.value;
    params.code = values.filterId || null;
    fetchData(params);
  };
  useEffect(() => {
    fetchData();
  }, [!isFilter ? JSON.stringify(tableParams) : null]);

  const handleResetFields = (resetForm) => {
    resetForm({
      values: { filterId: '', filterInstitute: [], filterProvince: [] },
    });
    setIsFilter(false);
    fetchData();
  };

  const handleChangeSelectAll = (isToggle) => {
    if (selectedItems.length >= items.length) {
      if (isToggle) {
        setSelectedItems([]);
      }
    } else {
      setSelectedItems(items.map((x) => x.id));
    }
    document.activeElement.blur();
    return false;
  };

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  const [districtsOptions, setDistrictsOptions] = useState([]);

  return (
    <>
      <div className="disable-text-selection">
        <h1>د انستیوت لست/ لست انستیتوت ها</h1>

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
                <Field name="filterId" placeholder="کوډ" />
                <FormikReactSelect
                  className="w-100"
                  placeholder="ولایت"
                  name="filterProvince"
                  options={provinces}
                  value={values.filterProvince}
                  onChange={(name, option) => {
                    setFieldValue(name, option);
                    const dd = districts.filter(
                      (dis) => dis.province === option.value,
                    );
                    setDistrictsOptions(dd);
                  }}
                  onBlur={setFieldTouched}
                />
                <FormikReactSelect
                  className="w-100"
                  placeholder="ولسوالی"
                  name="filterDistrict"
                  options={districtsOptions}
                  value={values.filterDistrict}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                <FormikReactSelect
                  className="w-100"
                  placeholder="نوعیت"
                  name="filterOwnership"
                  options={BuildingTypeOptions}
                  value={values.filterOwnership}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                <FormikReactSelect
                  className="w-100"
                  placeholder="جنسیت"
                  name="filterGender"
                  options={dormGenderOptions}
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
          style={{ fontSize: 20 }}
          size="large"
          columns={columns}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={items?.map((item, index) => ({
            key: item.id,
            number: item.id,
            code: item.code,
            name: (
              <NavLink to={`institute/${item.id}`} style={{ width: '10%' }}>
                {item.name}
              </NavLink>
            ),
            province: provinces.find((pro) => pro.value == item.province)
              ?.label,
            district: districts.find((pro) => pro.value == item.district)
              ?.label,
            gender: dormGenderOptions.find((pro) => pro.value == item.gender)
              ?.label,
            ownership: BuildingTypeOptions.find(
              (op) => op.value === item.ownership,
            ).label,
            status: instituteStatusOptions.map((status) => {
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
                          : status.value == 'inprogress'
                          ? 'success'
                          : status.value == 'active'
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
            action: (
              <NavLink
                to={`/app/institutes/register/${item.id}`}
                // style={{ width: '10%' }}
              >
                <div>
                  <BsPencilSquare
                    color="green"
                    outline="true"
                    style={{ fontSize: '20px' }}
                    id="updateIcon"
                  />
                </div>
              </NavLink>
            ),
          }))}
        />
      </div>
    </>
  );
};

export default ThumbListPages;
