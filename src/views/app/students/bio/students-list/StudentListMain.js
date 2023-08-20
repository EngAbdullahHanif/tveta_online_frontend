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
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    onFilter: (value, record) => record.gender.indexOf(value) === 0,
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
      pageSize: 10,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });
  const [selectedDistrict, setSelectedDistrict] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [rest, setRest] = useState(0);
  // const [institutes, setInstitutes] = useState();
  const [institute, setInstitute] = useState('');

  const [studentId, setStudentId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  // const { provinces: provincesOptionsForList } = useContext(AuthContext);

  const [selectedGenderOption, setSelectedGenderOption] = useState();
  const [selectedProvinceOption, setSelectedProvinceOption] = useState();
  const [selectedShiftOption, setSelectedShiftOption] = useState();
  const [selectedEducationalYearOption, seSelectedEducationalYearOption] =
    useState();
  const [studentTypeOptions, setStudentTypeOptions] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [filterId, setFilterId] = useState();
  const [filterProvince, setFilterProvince] = useState({});
  const [filterInstitute, setFilterInstitute] = useState();

  // if any filter changes, go to first page
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedOrderOption,
    selectedGenderOption,
    selectedProvinceOption,
    selectedShiftOption,
    selectedEducationalYearOption,
    studentTypeOptions,
  ]);

  const itemsPerPage = 10;

  async function fetchData(params) {
    console.log('PARAMSSSSSSSSSSSSSSS', params);
    // if institute not selected
    let endpoint = 'students/';
    // const params = {
    //   page: currentPage,
    // };
    console.log('institute: ', institute);
    if (institute) {
      params.institute = institute.value;
      endpoint = 'students/student_institutes/';
    }

    console.log('institute is: ', institute);

    // params.gender = selectedGenderOption?.value;
    // params.current_province = selectedProvinceOption?.value;
    // params.current_district = district?.value;
    // params.student_id = studentId || null;

    // params.gender = selectedGenderOption?.value;
    // params.current_province = filterData.filterInsitute?.value;
    // params.current_province = filterData.filterProvince?.value;
    // params.student_id = filterData.filterId || null;

    try {
      // fetch filtered data
      const response = await callApi(endpoint, null, null, params);
      if (response.data && response.status === 200) {
        setTotalPage(Math.ceil(response.data.count / itemsPerPage));
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
        setSelectedItems([]);
        setTotalItemCount(response.data.count);
        setIsLoaded(false);
      } else {
        console.log('students error');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }

  // const handleReset = () => {
  //   setStudentId('');
  //   setInstitute('');
  //   setProvince('');
  //   setSelectedGenderOption('');
  //   setSelectedProvinceOption('');
  //   fetchData();
  // };

  useEffect(async () => {
    fetchData();
  }, [
    selectedPageSize,
    currentPage,
    selectedOrderOption,
    search,
    selectedGenderOption,
    selectedProvinceOption,
    province,
    district,
    rest,
    institute,
    studentTypeOptions,
  ]);

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
  console.log('isLoadedsdfsd', isLoaded);

  const genderLabels = {
    male: 'نارینه/ مذکر',
    female: 'ښځینه/ موٌنث',
  };

  const handleStudentIdSearch = (e) => {
    if (e.key === 'Enter') {
      // handleStudentSearch(e.target.value.trim().toLowerCase());
      fetchData();
    }
  };

  if (isLoaded) {
    return <Spinner />;
  }

  const onFilter = async (values) => {
    let params = {
      page: currentPage,
    };
    params.current_province = values.filterInsitute?.value;
    params.current_province = values.filterProvince?.value;
    params.student_id = values.filterId || null;
    fetchData(params);
    console.log('Filter Data', filterId, filterProvince, filterInstitute);
  };
  const resetFilter = (values, { resetForm, setFieldValue }) => {
    resetForm();
    setFieldValue('filterInstitute', []);
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
            // onReset={resetFilter}
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
                <Field
                  id="filterId"
                  name="filterId"
                  // style={{ width: 200, borderRadius: 10, height: 32 }}
                  placeholder="ایدی"
                />
                <FormikReactSelect
                  className="w-100"
                  placeholder="ولایت"
                  name="filterProvince"
                  options={provinces}
                  // value={values.filterProvince}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                <FormikReactSelect
                  className="w-100"
                  placeholder="انستیتوت"
                  name="filterInstitute"
                  options={institutes}
                  // value={values.filterInsitute}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />
                <button className="btn btn-secondary" onClick={handleSubmit}>
                  Filter
                </button>
                <button
                  type="reset"
                  className="btn btn-warning"
                  onClick={resetForm}
                >
                  Reset
                </button>
              </>
            )}
          </Formik>
        </div>

        {/* <ListPageHeading
          heading="د شاگرد لست/لست شاگردان"
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
          setSelectedStudentId={setStudentId}
          onSearchKey={(e) => {
            if (e.key === 'Enter') {
              setSearch(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          // Gender
          changeGenderBy={(value) => {
            console.log('changeGenderBy: ', value);
            setSelectedGenderOption(
              genderOptionsForList.find((x) => x.value == value)
            );
          }}
          changeProvinceBy={(provinceId) => {
            setSelectedProvinceOption(
              provinces.find((province) => province.value === provinceId)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedEducationalYearOption={selectedEducationalYearOption}
          studentTypeOptions={studentTypeOptions}
          selectedProvinceOption={selectedProvinceOption}
          selectedShiftOption={selectedShiftOption}
          genderOptionsForList={genderOptionsForList}
          studyTimeOptionsForList={studyTimeOptionsForList}
          provincesOptionsForList={provinces}
          onIdSearchKey={handleStudentIdSearch}
          // Province
          onProvinceSearchKey={(e) => {
            if (e.key === 'Enter') {
              setProvince(e.target.value.toLowerCase());
            }
          }}
          // District
          onDistrictSearchKey={(e) => {
            if (e.key === 'Enter') {
              setDistrict(e.target.value.toLowerCase());
            }
          }}
          onResetClick={handleReset}
          reset={rest}
          institutes={institutes}
          onInstituteSelect={setInstitute}
          selectedStudentId={studentId}
          selectedInstitute={institute}
          handleReset={handleReset}
          // Shift
          changeShiftBy={(column) => {
            setSelectedShiftOption(
              studyTimeOptionsForList.find((x) => x.column === column)
            );
          }}
          // Educational Year
          changeEducationalYearBy={(column) => {
            seSelectedEducationalYearOption(
              educationalYearsOptionsForList.find((x) => x.column === column)
            );
          }}
          educationalYearsOptionsForList={educationalYearsOptionsForList}
          // Level of Education
          changeStudentTypeBy={(column) => {
            setStudentTypeOptions(studentType.find((x) => x.column === column));
          }}
          studentType={studentType}
          setSelectedDistrict={setSelectedDistrict}
        /> */}

        {/* <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark mb-2"
            style={{ maxHeight: '55px' }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  fontSize: '20px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="student.rollNo" />
              </th>
              <th
                style={{
                  width: '14%',
                  fontSize: '20px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="forms.StdName" />
              </th>
              <th
                style={{
                  width: '15%',
                  fontSize: '20px',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="forms.StdFatherName" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="forms.ProvinceLabel" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="student.PhoneNo" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="student.interenaceType" />
              </th>
              <th
                style={{
                  width: '10%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="study.type" />
              </th>
            </tr>
          </thead>

          <ListPageListing
            items={items}
            displayMode={displayMode}
            selectedItems={selectedItems}
            onCheckItem={onCheckItem}
            currentPage={currentPage}
            totalPage={totalPage}
            onContextMenuClick={onContextMenuClick}
            onContextMenu={onContextMenu}
            onChangePage={setCurrentPage}
          />
        </table> */}

        {isLoading && <Spinner />}

        {!isLoading && (
          <TB
            style={{ fontSize: 20 }}
            size="large"
            columns={columns}
            // rowKey={(record) => record.login.uuid}
            pagination={tableParams.pagination}
            loading={loading}
            // onChange={handleTableChange}
            dataSource={items?.map((item, index) => ({
              key: index,
              student_id: item.student_id,
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
        )}
      </div>
    </>
  );
};

export default ThumbListPages;
