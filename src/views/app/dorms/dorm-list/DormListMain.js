import React, { useState, useEffect } from 'react';
import { provincesOptionsForList } from '../../global-data/options';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from './DormListHeading';

import ListPageListing from './DormListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import config from '../../../../config';

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

const ThumbListPages = ({ match }) => {
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

  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [
  //   selectedPageSize,
  //   selectedOrderOption,
  //   selectedStatusOptions,
  //   selectedBuildingType,
  // ]);
  const fetchDorms = async () => {
    // const response = await axios.get(`institute/dorms`);
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        id: item.id,
        name: item.name,
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

  useEffect(() => {
    console.log('district', district);
    async function fetchData() {
      if (dormName !== '') {
        const response = await callApi(
          `institute/dorms/?id=${dormName.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setSelectedItems([]);
          // setTotalItemCount(data);
          setIsLoaded(true);
        } else {
          console.log('dorm 1 error');
        }
      } else if (
        selectedProvinceOption.value === 'all' &&
        selectedGenderOption.value === 'all'
      ) {
        if (rest == true) {
          setDistrict('');
          setDormName('');
          setSelectedStatusOptions({ value: 'all' });
          setSelectedBuildingType({ value: 'all' });
          setRest(false);
        }
        if (selectedBuildingType?.value == 'all') {
          selectedBuildingType.value = '';
        }
        let newCount = selectedStatusOptions?.value;

        if (selectedStatusOptions?.value == 'all') {
          newCount = '';
        }

        const response = await callApi(
          `institute/dorms/?district=${district}&building_ownership=${newCount}&building_type_option=${selectedBuildingType.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setSelectedItems([]);
          // setTotalItemCount(data);
          setIsLoaded(true);
        } else {
          console.log('Dorm 2 error');
        }
      } else if (selectedProvinceOption.value === 'all') {
        if (selectedBuildingType?.value === 'all') {
          selectedBuildingType.value = '';
        }
        if (selectedStatusOptions?.value === 'all') {
          selectedStatusOptions.value = '';
        }

        const response = await callApi(
          `institute/dorms/?building_type_option=${selectedBuildingType.value}&district=${district}&gender=${selectedGenderOption.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);

          setSelectedItems([]);
          // setTotalItemCount(data);
          setIsLoaded(true);
        } else {
          console.log('dorm 3 error');
        }
      } else if (selectedGenderOption.value === 'all') {
        if (selectedBuildingType?.value === 'all') {
          selectedBuildingType.value = '';
        }
        if (selectedStatusOptions?.value === 'all') {
          selectedStatusOptions.value = '';
        }

        const response = await callApi(
          `institute/dorms/?province=${selectedProvinceOption.value}&district=${district}&building_type_option=${selectedBuildingType.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          console.log('response is here');
          setDorms(response.data);

          setSelectedItems([]);
          // setTotalItemCount(data);
          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else if (selectedStatusOptions?.value === 'all') {
        if (selectedBuildingType?.value === 'all') {
          selectedBuildingType.value = '';
        }
        const response = await callApi(
          `institute/dorms/?province=${selectedProvinceOption.value}&district=${district}&building_type_option=${selectedBuildingType.value}&gender=${selectedGenderOption.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setItems(response.data);
          setSelectedItems([]);
          // setTotalItemCount(data);
          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else if (selectedBuildingType.value === 'all') {
        if (selectedStatusOptions?.value === 'all') {
          selectedStatusOptions.value = '';
        }

        const response = await callApi(
          `institute/dorms/?province=${selectedProvinceOption.value}&district=${district}&gender=${selectedGenderOption.value}&building_ownership=${selectedStatusOptions.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setItems(response.data);
          setSelectedItems([]);
          // setTotalItemCount(data);
          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else {
        const response = await callApi(
          `institute/dorms/?gender_type=${selectedGenderOption.value}&province=${selectedProvinceOption.value}&district=${district}&building_type_option=${selectedBuildingType.value}&building_ownership=${selectedStatusOptions.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setSelectedItems([]);
          // setTotalItemCount(data.totalItem);
          setIsLoaded(true);
        } else {
          console.log('dorm 1 error');
        }
      }
    }
    fetchData();
  }, [
    selectedPageSize,
    currentPage,
    selectedOrderOption,
    dormName,
    rest,
    district,
    selectedBuildingType,
    selectedGenderOption,
    selectedProvinceOption,
    selectedStatusOptions,
    province,
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

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="د لیلیو لست/ لست لیله ها"
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
        </table>
      </div>
    </>
  );
};

export default ThumbListPages;
