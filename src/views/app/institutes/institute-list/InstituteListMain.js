import React, { useState, useEffect, useContext } from 'react';
import {
  provincesOptionsForList,
  fetchProvinces,
  studentStatusOptions,
  instTypeOptions,
  BuildingTypeOptions,
  instituteStatusOptions,
  dormGenderOptions,
} from '../../global-data/options';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Badge, FormGroup, Input, Label, Spinner } from 'reactstrap';
import { Select, Spin, Table as TB } from 'antd';
// import { servicePath } from 'constants/defaultValues';
import { NavLink } from 'react-router-dom';
import ListPageHeading from './InstituteListHeading';

import ListPageListing from './InstituteListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import config from '../../../../config';
import { el } from 'date-fns/locale';
import { AuthContext } from 'context/AuthContext';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
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
const instituteApiUrl = `${servicePath}/institute/`;

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];

const genderOptions = [
  {
    value: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: 'male', label: 'ذکور' },
  { value: 'female', label: 'اناث' },
  { value: 'coed', label: 'مختلط' },
];
const statusOptions = [
  {
    value: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: 'active', label: <IntlMessages id="institute.statusOption_1" /> },
  { value: 'inactive', label: <IntlMessages id="institute.statusOption_2" /> },
];
const genderLabels = {
  male: 'نارینه/ مذکر',
  female: 'ښځینه/ موٌنث',
};
const instituteTypeOptions = [
  {
    value: 'all',
    label: <IntlMessages id="option.all" />,
  },
  {
    value: 'governmental',
    label: <IntlMessages id="institute.instTypeOptions_1" />,
  },
  {
    value: 'private',
    label: <IntlMessages id="institute.instTypeOptions_2" />,
  },
];

const pageSizes = [4, 8, 12, 20];

const ThumbListPages = ({ match }) => {
  const { provinces, districts } = useContext(AuthContext);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [rest, setRest] = useState(0);
  // const [institutes, setInstitutes] = useState([]);
  const [instituteId, setInstituteId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [institutes, setInstitutes] = useState([]);
  const [institute, setInstitute] = useState('');
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
    label: 'حالت',
  });
  const [selectedInstituteType, setSelectedInstituteType] = useState({
    value: 'all',
    label: 'ډول/ نوعیت',
  });
  const [provinceOptions, setProvinceOptions] = useState([]);
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
      setIsLoading(false);
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
    }
    // if (institute !== '') {
    //   const response = await callApi(`institute/${institute.value}/`, '', null);
    //   if (response && response.status === 200) {
    //     setItems(response.data?.results);
    //     setSelectedItems([]);
    //     // setTotalItemCount(data);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // } else if (
    //   selectedProvinceOption.value === 'all' &&
    //   selectedGenderOption.value === 'all'
    // ) {
    //   if (rest == true) {
    //     setDistrict('');
    //     setInstituteId('');
    //     setSelectedStatusOptions({ value: 'all' });
    //     setSelectedInstituteType({ value: 'all' });
    //     setRest(false);
    //   }
    //   if (selectedInstituteType?.value == 'all') {
    //     selectedInstituteType.value = '';
    //     console.log('selelctedInstituteType', selectedInstituteType);
    //   }
    //   let newCount = selectedStatusOptions?.value;

    //   if (selectedStatusOptions?.value == 'all') {
    //     newCount = '';
    //     console.log('selectedStatusOptions', selectedStatusOptions);
    //   }

    //   console.log('selectedStatusOptions23212', newCount);
    //   const response = await callApi(
    //     `institute/?id=${instituteId}&district=${district}&status=${newCount}&ownership=${selectedInstituteType?.value}`,
    //     '',
    //     null
    //   );
    //   if (response.data && response.status === 200) {
    //     setItems(response.data?.results);
    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // } else if (selectedProvinceOption.value === 'all') {
    //   if (selectedInstituteType?.value === 'all') {
    //     selectedInstituteType.value = '';
    //   }
    //   if (selectedStatusOptions?.value === 'all') {
    //     selectedStatusOptions.value = '';
    //   }

    //   const response = await callApi(
    //     `institute/?id=${instituteId}&gender=${selectedGenderOption.value}&district=${district}&status=${selectedStatusOptions?.value}&ownership=${selectedInstituteType?.value}`,
    //     '',
    //     null
    //   );
    //   if (response.data && response.status === 200) {
    //     setItems(response.data?.results);
    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // } else if (selectedGenderOption.value === 'all') {
    //   if (selectedInstituteType?.value === 'all') {
    //     selectedInstituteType.value = '';
    //   }
    //   if (selectedStatusOptions?.value === 'all') {
    //     selectedStatusOptions.value = '';
    //   }

    //   const response = await callApi(
    //     `institute/?id=${instituteId}&province=${selectedProvinceOption.value}&district=${district}&status=${selectedStatusOptions?.value}&ownership=${selectedInstituteType?.value}`,
    //     '',
    //     null
    //   );
    //   if (response.data && response.status === 200) {
    //     console.log('response is here');
    //     setItems(response.data);
    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // } else if (selectedStatusOptions?.value === 'all') {
    //   if (selectedInstituteType?.value === 'all') {
    //     selectedInstituteType.value = '';
    //   }
    //   const response = await callApi(
    //     `institute/?id=${instituteId}&gender=${selectedGenderOption.value}&province=${selectedProvinceOption.value}&district=${district}&ownership=${selectedInstituteType?.value}`,
    //     '',
    //     null
    //   );
    //   if (response.data && response.status === 200) {
    //     setItems(response.data?.results);
    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // } else if (selectedInstituteType.value === 'all') {
    //   if (selectedStatusOptions?.value === 'all') {
    //     selectedStatusOptions.value = '';
    //   }

    //   const response = await callApi(
    //     `institute/?id=${instituteId}&gender=${selectedGenderOption.value}&province=${selectedProvinceOption.value}&district=${district}&status=${selectedStatusOptions?.value}`,
    //     '',
    //     null
    //   );
    //   if (response.data && response.status === 200) {
    //     setItems(response.data);

    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // } else {
    //   const response = await callApi(
    //     `institute/?id=${instituteId}&gender=${selectedGenderOption.value}&province=${selectedProvinceOption.value}&district=${district}`,
    //     '',
    //     null
    //   );
    //   if (response.data && response.status === 200) {
    //     setItems(response.data?.results);
    //     setSelectedItems([]);
    //     setIsLoaded(true);
    //   } else {
    //     console.log('students error');
    //   }
    // }
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

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data?.results.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };
  // const fetchProvincesList = async () => {
  //   console.log('provinces');
  //   const provinces = await fetchProvinces();
  //   setProvinceOptions(provinces);
  // };

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
    fetchInstitutes();
    fetchProvinces();
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

  const [districtsOptions, setDistrictsOptions] = useState([]);

  return (
    <>
      <div className="disable-text-selection">
        <h1>د انستیوت لست/ لست انستیتوت ها</h1>
        {/* <ListPageHeading
          heading="د انستیوت لست/ لست انستیتوت ها"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeOrderBy={(value) => {
            setSelectedOrderOption(orderOptions.find((x) => x.value === value));
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
            setSearch(e.target.value.toLowerCase());
            // if (e.key === 'Enter') {
            // }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          changeGenderBy={(value) => {
            setSelectedGenderOption(
              genderOptions.find((x) => x.value === value)
            );
          }}
          changeStatusBy={(value) => {
            setSelectedStatusOptions(
              statusOptions.find((x) => x.value === value)
            );
          }}
          changeInstituteBy={(value) => {
            setSelectedInstituteType(
              instituteTypeOptions.find((x) => x.value === value)
            );
          }}
          changeProvinceBy={(value) => {
            setSelectedProvinceOption(
              provinceOptions.find((x) => x.value === value)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedStatusOptions={selectedStatusOptions}
          selectedInstituteType={selectedInstituteType}
          selectedProvinceOption={selectedProvinceOption}
          genderOptions={genderOptions}
          statusOptions={statusOptions}
          instituteTypeOptions={instituteTypeOptions}
          provincesOptionsForList={provinceOptions}
          onIdSearchKey={(e) => {
            if (e.key === 'Enter') {
              setInstituteId(e.target.value.toLowerCase());
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

        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark "
            style={{ maxHeight: '55px' }}
          >
            <tr
              className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center"
              style={{ width: '100%' }}
            >
              <th
                style={{
                  width: '10%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                شماره
              </th>
              <th
                style={{
                  width: '10%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                کود
              </th>
              <th
                style={{
                  width: '16%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="inst.nameList" />
              </th>
              <th
                style={{
                  width: '13%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="forms.ProvinceLabel" />
              </th>
              <th
                style={{
                  width: '13%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="forms.DistrictLabel" />
              </th>
              <th
                style={{
                  width: '13%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="inst.type" />
              </th>
              <th
                style={{
                  width: '13%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="gender" />
              </th>
              <th
                style={{
                  width: '13%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="institute.status" />
              </th>
            </tr>
          </thead>

          <ListPageListing
            items={items}
            fetchInstitutes={fetchInstitutes}
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
              (op) => op.value === item.ownership
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
