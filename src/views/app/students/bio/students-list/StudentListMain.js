import React, { useState, useEffect, useContext } from 'react';
import { Table as TB } from 'antd';
import callApi from 'helpers/callApi';

import { Badge } from 'reactstrap';
// import { servicePath } from 'constants/defaultValues';
import useMousetrap from 'hooks/use-mousetrap';

import { AuthContext } from 'context/AuthContext';
import { BsPencilSquare } from 'react-icons/bs';
import { studentStatusOptions } from './../../../global-data/options';
import { NavLink } from 'react-router-dom';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Field, Formik } from 'formik';

const columns = [
  {
    title: 'نمبر اساس',
    dataIndex: 'student_id',
    width: '5%',
  },
  {
    title: 'تذکره',
    dataIndex: 'registration_number',
    width: '15%',
  },
  {
    title: 'نوم/نام',
    dataIndex: 'name',
    width: '15%',
  },
  {
    title: 'د پلار نوم',
    dataIndex: 'father_name',
    width: '10%',
  },
  {
    title: 'جنسیت',
    dataIndex: 'gender',
    width: '8%',
  },

  {
    title: 'ولایت',
    dataIndex: 'province',
    width: '8%',
  },
  {
    title: 'تلفون شمیره',
    dataIndex: 'phone_number',
    width: '10%',
  },
  {
    title: 'شمولیت انستیتوت',
    dataIndex: 'institute_enrollment',
    width: '17%',
  },
  {
    title: 'حالت',
    dataIndex: 'student_type',
    width: '8%',
  },
  {
    title: 'اپډیټ',
    dataIndex: 'action',
  },
];

const ThumbListPages = () => {
  const { provinces, institutes } = useContext(AuthContext);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  // const [isLoaded, setIsLoaded] = useState(false);

  // const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedItems, setSelectedItems] = useState([]);

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  // const [filterId, setFilterId] = useState();
  // const [filterProvince, setFilterProvince] = useState([]);
  // const [filterInstitute, setFilterInstitute] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  console.log(isFilter);
  const handleTableChange = (pagination, filter, sorter) => {
    setIsFilter(false);
    setTableParams({ pagination, filter, ...sorter });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setItems([]);
    }
  };

  async function fetchData(params = {}) {
    // params['institute_enrollment__status'] = 'inprogress';

    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = 'students/';
    const params1 = {
      ...params,
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };

    try {
      const response = await callApi(endpoint, null, null, params1);
      if (response.data && response.status === 200) {
        if (params.institute) {
          setItems(
            response?.data?.map((item) => ({
              ...item.student,
              institute: item.institute,
            })),
          );
        } else {
          setItems(response.data.results);
        }
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

  const genderLabels = {
    male: 'نارینه/ مذکر',
    female: 'ښځینه/ موٌنث',
  };

  // const handleStudentIdSearch = (e) => {
  //   if (e.key === 'Enter') {
  //     // handleStudentSearch(e.target.value.trim().toLowerCase());
  //     fetchData();
  //   }
  // };

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
    params.institute_enrollment__institute = values.filterInstitute?.value;
    params.current_province = values.filterProvince?.value;
    params.student_id = values.filterId || null;

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

  return (
    <>
      <div className="disable-text-selection">
        {/* This is he */}
        <h1>د شاگرد لست/لست شاگردان</h1>
        <br />

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
                  placeholder="انستیتوت"
                  name="filterInstitute"
                  options={institutes}
                  value={values.filterInstitute}
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
            key: index,
            student_id: item.student_id,
            registration_number: item.registration_number,
            name: (
              <NavLink to={`student/${item.id}`} style={{ width: '10%' }}>
                {item.name}
              </NavLink>
            ),
            father_name: item.father_name,
            gender: genderLabels[item.gender],
            province: provinces.find(
              (pro) => pro.value == item.current_province,
            )?.label,
            phone_number: item.phone_number,
            institute_enrollment: item.institute_enrollment?.map((inst) => {
              return (
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: 18, color: 'green' }}>
                    {institutes.find(
                      (pro) =>
                        pro.value == inst.institute &&
                        inst.status == 'inprogress',
                    )?.label || null}
                  </p>
                </div>
              );
            }),
            student_type: studentStatusOptions.map((status) => {
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
            description: item.description,
            action: (
              <NavLink
                to={`/app/students/student-update/${item.id}`}
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
      </div>
    </>
  );
};

export default ThumbListPages;
