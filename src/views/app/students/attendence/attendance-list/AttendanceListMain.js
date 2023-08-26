import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import ListPageHeading from './AttendanceListHeading';
import {
  provincesOptionsForList,
  genderOptionsForList,
  educationalYearsOptions,
} from '../../../global-data/options';
import { Select, Spin, Table as TB } from 'antd';
import ListPageListing from './AttendanceListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import { useAsyncDebounce } from 'react-table';
import callApi from 'helpers/callApi';
import DisplayMessage from 'components/messages/DisplayMessage';
import config from '../../../../../config';
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { FormGroup, Label, NavLink } from 'reactstrap';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};
const servicePath = config.API_URL;
const apiUrl = `${servicePath}/cakes/paging`;
const studentApiUrl = `${servicePath}/api/`;
const studentInstituteApiUrl = `${servicePath}/api/student_institutes/`;
const instituteApiUrl = `${servicePath}/institute/`;
const attendanceListAPI = `${servicePath}/api/stdatten/`;

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [10, 20, 40, 80];
const genderOptions = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  { column: '1', label: 'ذکور' },
  { column: '2', label: 'اناث' },
];

const ThumbListPages = ({ match }) => {
  const { provinces, institutes, departments } = useContext(AuthContext);

  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [rest, setRest] = useState(0);
  // const [institutes, setInstitutes] = useState();
  const [institute, setInstitute] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    column: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [isFilter, setIsFilter] = useState(false);
  const fetchAttendance = async () => {
    const response = await callApi(`students/stdatten/`, '', null);
    console.log('ATTENDANCE: ', response.data);
    if (response.data && response.status === 200) {
      setAttendance(response.data);
      setIsLoaded(true);
      console.log('resonse.data attendance', response.data);
    } else {
      console.log('Attendance error: ' + response.status);
    }
  };

  async function fetchData(params = {}) {
    setIsLoading(true);
    let endpoint = 'students/stdatten/';
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
  const columns = [
    {
      title: 'شماره',
      dataIndex: 'id',
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
      title: 'انستیتوت',
      dataIndex: 'institute',
      width: '10%',
    },
    {
      title: 'دپارتمنت',
      dataIndex: 'department',
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' },
      // ],
      // onFilter: (value, record) => record.gender.indexOf(value) === 0,
      width: '10%',
    },

    {
      title: 'حاضر',
      dataIndex: 'present_hours',
      width: '10%',
    },
    {
      title: 'ضروری',
      dataIndex: 'necessary_work_hours',
      width: '10%',
    },
    {
      title: 'مریضی',
      dataIndex: 'sickness_hours',
      width: '10%',
    },
    {
      title: 'غیر حاضر',
      dataIndex: 'absent_hours',
      width: '10%',
    },
    {
      title: 'سال',
      dataIndex: 'year',
      width: '10%',
    },
  ];
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
    params.institute = values.filterInstitute?.value;
    params.department = values.department?.value;
    params.educational_year = values.educationalYear?.value;
    // params.province = values.filterProvince?.value;
    params.id = values.filterId || null;
    fetchData(params);
  };

  useEffect(() => {
    fetchData();
  }, [!isFilter ? JSON.stringify(tableParams) : null]);

  const handleResetFields = (resetForm) => {
    resetForm({
      values: {
        filterId: '',
        filterInstitute: [],

        educationalYear: [],
        department: [],
      },
    });
    setIsFilter(false);
    fetchData();
  };
  useEffect(() => {
    fetchAttendance();
    console.log('ATT: ', attendance);
  }, []);

  const onCheckItem = (event, id) => {
    if (
      event.target.tagName === 'A' ||
      (event.target.parentElement && event.target.parentElement.tagName === 'A')
    ) {
      return true;
    }
    if (lastChecked === null) {
      setLastChecked(id);
    }

    let selectedList = [...selectedItems];
    if (selectedList.includes(id)) {
      selectedList = selectedList.filter((x) => x !== id);
    } else {
      selectedList.push(id);
    }
    setSelectedItems(selectedList);

    if (event.shiftKey) {
      let newItems = [...items];
      const start = getIndex(id, newItems, 'id');
      const end = getIndex(lastChecked, newItems, 'id');
      newItems = newItems.slice(Math.min(start, end), Math.max(start, end) + 1);
      selectedItems.push(
        ...newItems.map((item) => {
          return item.id;
        })
      );
      selectedList = Array.from(new Set(selectedItems));
      setSelectedItems(selectedList);
    }
    document.activeElement.blur();
    return false;
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

  const onContextMenuClick = (e, data) => {
    // params : (e,data,target)
    console.log('onContextMenuClick - selected items', selectedItems);
    console.log('onContextMenuClick - action : ', data.action);
  };

  const onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!selectedItems.includes(clickedProductId)) {
      setSelectedItems([clickedProductId]);
    }

    return true;
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

  console.log('items', items);
  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <h1>د حاضری لست/لست حاضری</h1>
        {/* <ListPageHeading
          heading="د حاضری لست/لست حاضری"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeOrderBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column)
            );
          }}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          selectedOrderOption={selectedOrderOption}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          changeGenderBy={(column) => {
            setSelectedGenderOption(
              genderOptionsForList.find((x) => x.column === column)
            );
          }}
          changeProvinceBy={(column) => {
            setSelectedProvinceOption(
              provincesOptionsForList.find((x) => x.column === column)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedProvinceOption={selectedProvinceOption}
          genderOptionsForList={genderOptionsForList}
          provincesOptionsForList={provincesOptionsForList}
          onIdSearchKey={(e) => {
            if (e.key === 'Enter') {
              setStudentId(e.target.value.toLowerCase());
            }
          }}
          onProvinceSearchKey={(e) => {
            if (e.key === 'Enter') {
              setProvince(e.target.value.toLowerCase());
            }
          }}
          onDistrictSearchKey={(e) => {
            if (e.key === 'Enter') {
              setDistrict(e.target.value.toLowerCase());
            }
          }}
          onResetClick={setRest}
          reset={rest}
          institutes={institutes}
          onInstituteSelect={setInstitute}
        />
        {attendance.length > 0 ? (
          <table className="table">
            <thead
              className="pl-2 d-flex flex-grow-1  table-dark"
              style={{ maxHeight: '55px' }}
            >
              <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
                <th
                  style={{
                    width: '9%',
                    paddingInline: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  <IntlMessages id="ایدی حاضری" />
                </th>
                <th
                  style={{
                    width: '14%',
                    paddingInline: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  <IntlMessages id="نام/نوم" />
                </th>
             
                <th
                  style={{
                    width: '13%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="دیپارتمنت" />
                </th>
                <th
                  style={{
                    width: '11%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="انستیتوت" />
                </th>
           
                <th
                  style={{
                    width: '10%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="حاضر" />
                </th>
                <th
                  style={{
                    width: '10%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="غیر حاضر" />
                </th>
                <th
                  style={{
                    width: '10%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="مریض" />
                </th>
             
                <th
                  style={{
                    width: '10%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="سال تعلیمی" />
                </th>

                <th
                  style={{
                    width: '10%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  محرومیت
                </th>
              </tr>
            </thead>
            <ListPageListing
              items={attendance}
              displayMode={displayMode}
              selectedItems={selectedItems}
              onCheckItem={onCheckItem}
              currentPage={currentPage}
              totalPage={totalPage}
              onContextMenuClick={onContextMenuClick}
              onContextMenu={onContextMenu}
              onChangePage={setCurrentPage}
            />
          </table>
        ) : (
          <DisplayMessage type="error" message="معلومات شتون نلری" />
        )} */}
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
              // filterProvince: [],
              educationalYear: [],
              department: [],
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
                {/* <FormGroup className="form-group has-float-label error-l-150">
                  <Label>ایدی</Label>
                  <Field
                    name="filterId"
                    placeholder="ایدی"
                    style={{ height: 37 }}
                  />
                </FormGroup> */}

                {/* <FormGroup className="form-group has-float-label error-l-150 w-100 ">
                  <Label>ولایت</Label>
                  <FormikReactSelect
                    placeholder="ولایت"
                    name="filterProvince"
                    options={provinces}
                    value={values.filterProvince}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </FormGroup> */}
                <FormGroup className="form-group has-float-label error-l-150 w-100 ">
                  <Label>انستیتوت</Label>
                  <FormikReactSelect
                    placeholder="انستیتوت"
                    name="filterInstitute"
                    options={institutes}
                    value={values.filterInstitute}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label error-l-150 w-100 ">
                  <Label>دپارتمنت</Label>
                  <FormikReactSelect
                    name="department"
                    id="department"
                    options={departments}
                    value={values.department}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </FormGroup>
                <FormGroup className="form-group has-float-label error-l-150 w-100 ">
                  <Label>سال تحصیل</Label>
                  <FormikReactSelect
                    name="educationalYear"
                    id="educationalYear"
                    options={educationalYearsOptions}
                    value={values.educationalYear}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                  />
                </FormGroup>
                <FormGroup className="form-group" style={{ display: 'flex' }}>
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
                </FormGroup>
              </>
            )}
          </Formik>
        </div>
        <TB
          style={{ fontSize: 20 }}
          size="large"
          columns={columns}
          pagination={tableParams.pagination}
          loading={isLoading}
          onChange={handleTableChange}
          dataSource={items?.map((item, index) => ({
            key: index,
            id: item.id,
            name: (
              <NavLink to={`student/${item.id}`}>{item.student.name}</NavLink>
            ),
            institute: institutes.find((pro) => pro.value == item.institute)
              ?.label,
            department: departments?.find((pro) => pro.value == item.department)
              ?.label,
            present_hours: item.present_hours,
            necessary_work_hours: item.necessary_work_hours,

            absent_hours: item.absent_hours,

            sickness_hours: item.sickness_hours,

            year: item.educational_year,
          }))}
        />
      </div>
    </>
  );
};

export default ThumbListPages;
