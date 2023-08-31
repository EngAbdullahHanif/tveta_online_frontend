import React, { useState, useEffect, useContext } from 'react';
import {
  BuildingTypeOptions,
  dormGenderOptions,
  instituteStatusOptions,
} from '../../global-data/options';

import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Badge } from 'reactstrap';
import { Table as TB } from 'antd';
import { NavLink } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
// import { servicePath } from 'constants/defaultValues';


import useMousetrap from 'hooks/use-mousetrap';
import config from '../../../../config';
import { AuthContext } from 'context/AuthContext';
import { userRole } from 'constants/defaultValues';

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
const dormUrl = `${servicePath}/institute/dorms`;

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

const genderOptions = [
  {
    value: 'all',
    label: 'تول / همه',
  },
  { value: 'male', label: 'ذکور' },
  { value: 'female', label: 'اناث' },
];

// const statusOptions = [
//   {
//     value: 'all',
//     label: <IntlMessages id="option.all" />,
//   },
//   { value: 'active', label: <IntlMessages id="institute.statusOption_1" /> },
//   { value: 'deactive', label: <IntlMessages id="institute.statusOption_2" /> },
// ];
const statusOptions = [
  {
    value: 'all',
    label: <IntlMessages id="option.all" />,
  },
  {
    value: 'governmental',
    label: 'دولتی',
  },
  { value: 'private', label: 'شخصی' },
];

const buildingTypeOptions = [
  {
    value: 'all',
    label: <IntlMessages id="option.all" />,
  },
  {
    value: 'tveta',
    label: <IntlMessages id="dorm.PublicBuildingOwnerLabelOption_1" />,
  },
  {
    value: 'other_org',
    label: <IntlMessages id="dorm.PublicBuildingOwnerLabelOption_2" />,
  },
  {
    value: 'rent',
    label: <IntlMessages id="dorm.PrivateBuildingTypeOption_1" />,
  },
  {
    value: 'aid',
    label: <IntlMessages id="dorm.PrivateBuildingTypeOption_2" />,
  },
];

const ThumbListPages = ({ match, roles }) => {
  const { user, provinces, districts } = useContext(AuthContext);
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [dorms, setDorms] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [selectedFilter, setSelectFilter] = useState({
    column: 'all',
    label: 'تول / همه',
  });
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [rest, setRest] = useState(0);
  const [dormsFilterList, setDormsFilterList] = useState([]);
  const [dormName, setDormName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    value: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    value: 'all',
    label: 'ولایت',
  });
  const [selectedStatusOptions, setSelectedStatusOptions] = useState({
    value: 'all',
    label: 'ملکیت',
  });

  const [selectedBuildingType, setSelectedBuildingType] = useState({
    value: 'all',
    label: 'نوع تعمیر',
  });
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [
  //   selectedPageSize,
  //   selectedOrderOption,
  //   selectedStatusOptions,
  //   selectedBuildingType,
  // ]);
  const columns = [
    {
      title: 'نمبر اساس',
      dataIndex: 'number',
      width: '5%',
      responsive: ['sm'],
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
      title: 'ظرفیت',
      dataIndex: 'capacity',
      width: '10%',
    },
    {
      title: 'سهمیه',
      dataIndex: 'quota',
      width: '10%',
    },
    {
      title: 'جنسیت',
      dataIndex: 'gender',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'د تعمیر ډول',
      dataIndex: 'building_ownership',
      width: '10%',
    },
    {
      title: 'اپډیټ',
      dataIndex: 'action',
    },
  ];

  const canUpdateRoles = [
    userRole.dormManager,
    userRole.provinceDataentry,
    userRole.admin,
  ];
  const authUser = user.groups.filter((group) =>
    canUpdateRoles.includes(group.name)
  );
  if (!authUser) columns.pop();

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
    params.building_ownership = values.filterOwnership?.value;
    params.province = values.filterProvince?.value;
    params.district = values.filterDistrict?.value;
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
        filterOwnership: [],
        filterDistrict: [],
      },
    });
    setDistrictsOptions([]);
    setIsFilter(false);
    fetchData();
  };
  const fetchDorms = async () => {
    // const response = await axios.get(`institute/dorms`);
    const response = await callApi('institute/all', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response?.data.map((item) => ({
        id: item.id,
        name: item.name,
        label: item.name,
      }));
      setDormsFilterList(updatedData);
      console.log('dormsFilterList', dormsFilterList);
    } else {
      console.log('error');
    }
  };
  const fetchProvinces = async () => {
    const response = await callApi('core/provinces/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.native_name,
      }));
      const all = { value: 'all', label: 'همه' };
      updatedData.unshift(all);
      setProvinceOptions(updatedData);
    } else {
      console.log('province error');
    }
  };

  useEffect(() => {
    fetchDorms();
    fetchProvinces();
  }, []);

  async function fetchData(params = {}) {
    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = `institute/dorms/`;
    const params1 = {
      ...params,
      // if filters reseted, goto first page
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };
    try {
      const response = await callApi(endpoint, null, null, params1);
      setIsLoading(false);
      if (response.data && response.status === 200) {
        setDorms(response.data?.results);
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
    // let endpoint = `institute/dorms/`;
    // let params = {};

    // if (dormName !== '') {
    //   params['id'] = dormName.value;
    // } else {
    //   if (selectedProvinceOption?.value !== 'all') {
    //     params['province'] = selectedProvinceOption.value;
    //   }

    //   if (district !== '') {
    //     params['district'] = district;
    //   }

    //   if (selectedGenderOption?.value !== 'all') {
    //     params['gender'] = selectedGenderOption.value;
    //   }

    //   if (selectedBuildingType?.value !== 'all') {
    //     params['building_type_option'] = selectedBuildingType.value;
    //   }

    //   if (selectedStatusOptions?.value !== 'all') {
    //     params['building_ownership'] = selectedStatusOptions.value;
    //   }
    // }

    // try {
    //   const response = await callApi(endpoint, '', null, params);

    //   if (response.data && response.status === 200) {
    //     setDorms(response.data);
    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('Error fetching data from API');
    //   }
    // } catch (error) {
    //   console.log('API request failed:', error);
    // }
  }

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

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  const startIndex = (currentPage - 1) * selectedPageSize;
  const endIndex = currentPage * selectedPageSize;

  return (
    <>
      <div className="disable-text-selection">
        <h1>د لیلیو لست/ لست لیله ها</h1>
        {/* <ListPageHeading
          heading="د لیلیو لست/ لست لیله ها"
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
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
          itemsLength={dorms ? dorms.length : 0}
          onSearchDistrict={(e) => {
            if (e.key === 'Enter') {
              setDistrict(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          changeGenderBy={(value) => {
            setSelectedGenderOption(
              genderOptions.find((x) => x.value === value)
            );
          }}
          changeProvinceBy={(value) => {
            setSelectedProvinceOption(
              provinceOptions.find((x) => x.value === value)
            );
          }}
          changeStatusBy={(value) => {
            setSelectedStatusOptions(
              statusOptions.find((x) => x.value === value)
            );
          }}
          changeBuildingTypeBy={(value) => {
            setSelectedBuildingType(
              buildingTypeOptions.find((x) => x.value === value)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedProvinceOption={selectedProvinceOption}
          selectedStatusOptions={selectedStatusOptions}
          selectedBuildingType={selectedBuildingType}
          genderOptions={genderOptions}
          statusOptions={statusOptions}
          buildingTypeOptions={buildingTypeOptions}
          provincesOptionsForList={provinceOptions}
          dormsFilterList={dormsFilterList}
          onDormSelect={setDormName}
          onResetClick={setRest}
          reset={rest}
        />
        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark mb-2"
            style={{ maxHeight: '55px' }}
          >
            <tr
              className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center"
              style={{ width: '100%' }}
            >
              <th
                style={{
                  width: '10%',
                  fontSize: '20px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="student.ID" />
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
                  width: '13%',
                  fontSize: '20px',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
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
                <IntlMessages id="forms.DistrictLabel" />
              </th>
              <th
                style={{
                  width: '11%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="dorm.CapicityList" />
              </th>
              <th
                style={{
                  width: '11%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="dorm.QuotaLabel" />
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
                <IntlMessages id="dorm.BuildingTypeList" />
              </th>
            </tr>
          </thead>
          <ListPageListing
            dorms={dorms}
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
                  onChange={(name, option) => {
                    setFieldValue(name, option);
                    const dd = districts.filter(
                      (dis) => dis.province === option.value
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
        {console.log('ITTTTTTTTTTTTTTTTTT', dorms)}
        <TB
          style={{ fontSize: 20 }}
          size="large"
          columns={columns}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={dorms?.map((item, index) => ({
            key: item?.id,
            number: item?.id,
            name: (
              <NavLink to={`dorm/${item?.id}`} style={{ width: '10%' }}>
                {item?.name}
              </NavLink>
            ),
            province: provinces.find((pro) => pro.value == item?.province)
              ?.label,
            district: districts.find((pro) => pro.value == item?.district)
              ?.label,
            gender: dormGenderOptions.find((pro) => pro.value == item?.gender)
              ?.label,
            capacity: item.capacity,
            quota: item.quota,
            building_ownership: BuildingTypeOptions.find(
              (op) => op.value === item.building_ownership
            ).label,
            status: instituteStatusOptions.map((status) => {
              if (status.value == item?.status) {
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
                to={`register/${item?.id}`}
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
