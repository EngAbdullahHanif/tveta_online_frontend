import React, { useState, useEffect, useContext } from 'react';

import { Table as TB } from 'antd';
import IntlMessages from 'helpers/IntlMessages';
import './list.css';
import callApi from 'helpers/callApi';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';

import {
  genderOptions,
  gradeOptions,
  instituteStatusOptions,
  teacherCurrentStatusOptions,
} from '../../../global-data/options';
import useMousetrap from 'hooks/use-mousetrap';
import { Badge } from 'reactstrap';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

import { NavLink } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { AuthContext } from 'context/AuthContext';

const pageSizes = [4, 8, 12, 20];

const ThumbListPages = ({ match }) => {
  const { provinces, institutes } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const provincesOptionsForList = provinces.map((province) => ({
    column: province.value,
    label: province.label,
  }));
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    column: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });
  const [selectLevelOfEducationOption, setSelectLevelOfEducationOption] =
    useState({
      column: 'all',
      label: 'سطح تحصیلی',
    });

  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [teacherId, setTeacherId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [rest, setRest] = useState(0);
  const [institute, setInstitute] = useState('');
  const [instituteTeachers, setInstituteTeachers] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedGenderOption,
    selectedProvinceOption,
    selectLevelOfEducationOption,
  ]);
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
    fetchData();
  }, [!isFilter ? JSON.stringify(tableParams) : null]);

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

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <h1>د استاد لست/ لست استادان</h1>
        {/* <ListPageHeading
          heading="د استاد لست/ لست استادان"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          changeGenderBy={(column) => {
            setSelectedGenderOption(
              genderOptionsForList.find((x) => x.value === column)
            );
          }}
          changeProvinceBy={(column) => {
            setSelectedProvinceOption(
              provincesOptionsForList.find((x) => x.column === column)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedProvinceOption={selectedProvinceOption}
          selectLevelOfEducationOption={selectLevelOfEducationOption}
          genderOptionsForList={genderOptionsForList}
          provincesOptionsForList={provincesOptionsForList}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
          match={match}
          startIndex={startIndex}
          endIndex={endIndex}
          selectedItemsLength={selectedItems ? selectedItems.length : 0}
          itemsLength={items ? items.length : 0}
          onIdSearchKey={(e) => {
            if (e.key === 'Enter') {
              setTeacherId(e.target.value.toLowerCase());
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
          // Level of Education
          changeLevelOfEducationBy={(column) => {
            setSelectLevelOfEducationOption(
              levelOfEdcationForList.find((x) => x.column === column)
            );
          }}
          levelOfEdcationForList={levelOfEdcationForList}
          onResetClick={setRest}
          reset={rest}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          institutes={institutes}
          onInstituteSelect={setInstitute}
        /> */}
        {/* <table className="table">
          <thead
            style={{ maxHeight: '55px ' }}
            className="pl-2 d-flex flex-grow-1  table-dark"
          >
            <tr className="card-body align-self-center d-flex flex-lg-row align-items-lg-center">
              <th
                className=""
                style={{
                  width: '110px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="marks.No" />
              </th>
              <th
                className="header-responsiveness"
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="forms.StdName" />
              </th>
              <th
                className="header-responsiveness"
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="forms.StdFatherName" />
              </th>
              <th
                className="header-responsiveness1 "
                style={{
                  width: '110px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="teacher.GradeLabel" />
              </th>
              <th
                className="header-responsiveness2 "
                style={{
                  width: '110px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="teacher.Step" />
              </th>
              <th
                className="header-responsiveness3 "
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="teacher.LevelOfEducationList" />
              </th>
              <th
                className="header-responsiveness4 "
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="teacher-list.MajorLabel" />
              </th>
              <th
                className="header-responsiveness4 "
                style={{
                  width: '100px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="teacher.status" />
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
          dataSource={items.map((item, index) => ({
            key: index,
            student_id: item.id,
            name: <NavLink to={`teacher/${item.id}`}>{item.name}</NavLink>,
            gender: genderOptions.find((op) => op.value === item.gender).label,
            father_name: item.father_name,
            province: provinces.find(
              (pro) => pro.value == item.current_province
            ).label,
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
      </div>
    </>
  );
};

export default ThumbListPages;
