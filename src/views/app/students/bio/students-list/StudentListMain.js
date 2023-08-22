import React, { useState, useEffect, useContext } from 'react';
import { Select, Spin, Table as TB } from 'antd';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';
import {
  educationalYearsOptionsForList,
  studentType,
  genderOptionsForList,
  studyTimeOptionsForList,
  StdInteranceOptions,
  genderOptions,
} from '../../../global-data/options';
import { Badge, FormGroup, Input, Label, Spinner } from 'reactstrap';
// import { servicePath } from 'constants/defaultValues';
import ListPageHeading from 'views/app/students/bio/students-list/StudentListHeading';
import ListPageListing from 'views/app/students/bio/students-list/StudentListCatagory';
import useMousetrap from 'hooks/use-mousetrap';

import { AuthContext } from 'context/AuthContext';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import {
  studentStatusOptions,
  provinceOptions,
} from './../../../global-data/options';
import { NavLink } from 'react-router-dom';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Field, Formik } from 'formik';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const columns = [
  {
    title: 'نمبر اساس',
    dataIndex: 'student_id',
    // sorter: (a, b) => a.student_id - b.student_id,
    width: '5%',
  },
  {
    title: 'تذکره',
    dataIndex: 'registration_number',
    // sorter: (a, b) => a.student_id - b.student_id,
    width: '5%',
  },
  {
    title: 'نوم/نام',
    dataIndex: 'name',
    // sorter: (a, b) => a.name - b.name,
    // render: (name) => `${name.first} ${name.last}`,
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
    // filters: [
    //   { text: 'Male', value: 'male' },
    //   { text: 'Female', value: 'female' },
    // ],
    // onFilter: (value, record) => record.gender.indexOf(value) === 0,
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
    width: '20%',
  },
  // {
  //   title: 'ده جزت نوعیت',
  //   dataIndex: 'std_status',
  //   width: '20%',
  // },
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

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [10, 20, 40, 80];

const ThumbListPages = ({ match }) => {
  const { provinces, institutes } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [items, setItems] = useState([]);
  const [institute, setInstitute] = useState('');

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
    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = 'students/';
    if (institute) {
      params.institute = institute.value;
      endpoint = 'students/student_institutes/';
    }
    console.log('institute is: ', institute, 'isFilter', isFilter);
    const params1 = {
      ...params,
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };

    try {
      const response = await callApi(endpoint, null, null, params1);
      setIsLoading(false);
      if (response.data && response.status === 200) {
        if (institute) {
          setItems(
            response?.data?.map((item) => ({
              ...item.student,
              institute: item.institute,
            }))
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

  console.log('isLoadedsdfsd', isLoaded);

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

  if (isLoaded) {
    return <Spinner />;
  }

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
    params.current_institute = values.filterInstitute?.value;
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
              handleReset,
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
                  Filter
                </button>

                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleResetFields(resetForm)}
                >
                  Reset
                </button>
              </>
            )}
          </Formik>
        </div>

        <TB
          style={{ fontSize: 20 }}
          size="large"
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          loading={isLoading}
          // onChange={handleTableChange}
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
              (pro) => pro.value == item.current_province
            )?.label,
            phone_number: item.phone_number,

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
