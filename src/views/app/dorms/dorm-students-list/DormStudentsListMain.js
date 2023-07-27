import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from './DormStudentsListHeading';

import ListPageListing from './DormStudentsListCatagory';
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
const dormStudentsUrl = `${servicePath}/api/student_dorms`;

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

const DormTypeOptions = [
  {
    value: 'all',
    label: 'تول / همه',
  },
  { value: 'in_dorm', label: 'بدل عاشه' },
  { value: 'cash', label: 'بدیل عاشه' },
];
const statusOptions = [
  {
    value: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: 'active', label: <IntlMessages id="forms.StudyTypeInrolled" /> },
  { value: 'past', label: 'گزشته' },
  { value: 'dismiss', label: <IntlMessages id="forms.StudyTypeDismissed" /> },
];
const educationalYearsOptions = [
  { value: 'all', label: 'تول/همه' },
  { value: '1390', label: '1390' },
  { value: '1391', label: '1391' },
  { value: '1392', label: '1392' },
  { value: '1393', label: '1393' },
  { value: '1394', label: '1394' },
  { value: '1395', label: '1395' },
  { value: '1396', label: '1396' },
  { value: '1397', label: '1397' },
  { value: '1398', label: '1398' },
  { value: '1399', label: '1399' },
  { value: '1400', label: '1400' },
  { value: '1401', label: '1401' },
  { value: '1402', label: '1402' },
  { value: '1403', label: '1403' },
  { value: '1404', label: '1404' },
  { value: '1405', label: '1405' },
  { value: '1406', label: '1406' },
  { value: '1407', label: '1407' },
  { value: '1408', label: '1408' },
  { value: '1409', label: '1409' },
  { value: '1410', label: '1410' },
];
const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    value: 'title',
    label: 'Product Name',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [dorms, setDorms] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);
  const [selectedFilter, setSelectFilter] = useState({
    value: 'all',
    label: 'تول / همه',
  });
  const [rest, setRest] = useState(0);
  const [dormsFilterList, setDormsFilterList] = useState([]);
  const [dormName, setDormName] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedDormTypeOption, setSelectedDormTypeOption] = useState({
    value: 'all',
    label: <IntlMessages id="dorm.type" />,
  });

  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    value: 'all',
    label: 'ولایت',
  });

  const [selectedYearOption, setSelectedYearOption] = useState({
    value: 'all',
    label: <IntlMessages id="dorm.yearList-1" />,
  });

  const [selectedStatusOptions, setSelectedStatusOptions] = useState({
    value: 'all',
    label: <IntlMessages id="teacher.status" />,
  });
  const [provinceOptions, setProvinceOptions] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  const fetchDorms = async () => {
    const response = await callApi('institute/dorms/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setDormsFilterList(updatedData);
    } else {
      console.log('dorms error');
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
    async function fetchData() {
      if (dormName !== '') {
        console.log('dormName', dormName);
        const response = await callApi(
          `students/student_dorms/?dorm=${dormName?.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setIsLoaded(true);
        } else {
          console.log('1, dorms students error');
        }
      } else if (
        selectedProvinceOption?.value === 'all' &&
        selectedStatusOptions?.value === 'all' &&
        selectedDormTypeOption?.value === 'all' &&
        selectedYearOption?.value === 'all'
      ) {
        if (rest == true) {
          setSelectedProvinceOption({ value: 'all', label: 'ولایت' });
          setSelectedDormTypeOption({ value: 'all', label: 'تول / همه' });
          setSelectedYearOption({
            value: 'all',
            label: <IntlMessages id="dorm.yearList-1" />,
          });
          setSelectedStatusOptions({
            value: 'all',
            label: <IntlMessages id="teacher.status" />,
          });
          setDormName('');
          setDistrict('');
          setRest(false);
        }
        const response = await callApi(`students/student_dorms/`, '', null);
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setIsLoaded(true);
        } else {
          console.log('Dorm 2 error');
        }
      } else if (selectedProvinceOption.value === 'all') {
        let newYear = selectedYearOption?.value;

        if (selectedYearOption?.value === 'all') {
          newYear = '';
        }
        if (selectedStatusOptions.value === 'all') {
          selectedStatusOptions.value = '';
        }
        let newCount = selectedDormTypeOption?.value;

        if (selectedDormTypeOption?.value == 'all') {
          console.log('thest');
          newCount = '';
        }
        console.log('selectedDormTypeOption', newCount);

        const response = await callApi(
          `students/student_dorms/?dorm_type=${newCount}&educational_year=${newYear}&district=${district}&status=${selectedStatusOptions?.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setIsLoaded(true);
        } else {
          console.log('Dorm 3 error');
        }
      } else if (selectedDormTypeOption.value === 'all') {
        if (selectedYearOption?.value === 'all') {
          selectedYearOption.value = '';
        }
        if (selectedStatusOptions.value === 'all') {
          selectedStatusOptions.value = '';
        }

        const response = await callApi(
          `students/student_dorms/?province=${selectedProvinceOption.value}&educational_year=${selectedYearOption.value}&district=${district}&status=${selectedStatusOptions.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setIsLoaded(true);
        } else {
          console.log('Dorm 2 error');
        }
      } else if (selectedYearOption.value === 'all') {
        const response = await callApi(
          `students/student_dorms/?province=${selectedProvinceOption.value}&dorm_type=${selectedDormTypeOption.value}&district=${district}&status=${selectedStatusOptions.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);

          setIsLoaded(true);
        } else {
          console.log('Dorm 2 error');
        }
      } else if (selectedStatusOptions.value === 'all') {
        const response = await callApi(
          `students/student_dorms/?province=${selectedProvinceOption.value}&dorm_type=${selectedDormTypeOption.value}&educational_year=${selectedYearOption.value}&district=${district}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setDorms(response.data);
          setIsLoaded(true);
        } else {
          console.log('Dorm 2 error');
        }
      } else {
        const response = await callApi(
          `students/student_dorms/?province=${selectedProvinceOption?.value}&dorm_type=${selectedDormTypeOption?.value}&educational_year=${selectedYearOption?.value}&district=${district}&status=${selectedStatusOptions?.value}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          console.log('response.data of student-dorm', response.data);
          setDorms(response.data);
          setIsLoaded(true);
        } else {
          console.log('2, dorms students error');
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
    selectedDormTypeOption,
    selectedProvinceOption,
    selectedYearOption,
    selectedStatusOptions,
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
          heading="د لیلیو شاګردان/ لست شاگردان لیله ها"
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
          itemsLength={dorms ? dorms.length : 0}
          onSearchDistrict={(e) => {
            if (e.key === 'Enter') {
              setDistrict(e.target.value.toLowerCase());
            }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          changeDormTypeBy={(value) => {
            setSelectedDormTypeOption(
              DormTypeOptions.find((x) => x.value === value)
            );
          }}
          changeProvinceBy={(value) => {
            setSelectedProvinceOption(
              provinceOptions.find((x) => x.value === value)
            );
          }}
          changeYearBy={(value) => {
            setSelectedYearOption(
              educationalYearsOptions.find((x) => x.value === value)
            );
          }}
          changeStatusBy={(value) => {
            setSelectedStatusOptions(
              statusOptions.find((x) => x.value === value)
            );
          }}
          selectedDormTypeOption={selectedDormTypeOption}
          selectedProvinceOption={selectedProvinceOption}
          selectedYearOption={selectedYearOption}
          selectedStatusOptions={selectedStatusOptions}
          DormTypeOptions={DormTypeOptions}
          provinces={provinceOptions}
          educationYears={educationalYearsOptions}
          statusOptions={statusOptions}
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
                  width: '14%',
                  fontSize: '20px',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="forms.ProvinceLabel" />
              </th>
              {/* <th
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
              </th> */}
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
                <IntlMessages id="dorm.NameList" />
              </th>
              <th
                style={{
                  width: '9%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="dorm.yearList" />
              </th>
              <th
                style={{
                  width: '12%',
                  padding: '0%',
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="teacher.promotion.type" />
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
                <IntlMessages id="teacher.status" />
              </th>
            </tr>
          </thead>
          <ListPageListing
            dormStudents={dorms}
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
