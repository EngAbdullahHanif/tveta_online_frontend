import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from './DormStudentsListHeading';

import ListPageListing from './DormStudentsListCatagory';
import useMousetrap from 'hooks/use-mousetrap';

const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

const servicePath = 'http://localhost:8000';
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
const provinces = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  {
    column: '1',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_1" />,
  },
  {
    column: '2',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_2" />,
  },
  {
    column: '3',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_3" />,
  },
  {
    column: '4',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_4" />,
  },
  {
    column: '5',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_5" />,
  },
  {
    column: '6',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_6" />,
  },
  {
    column: '7',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_7" />,
  },
  {
    column: '8',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_8" />,
  },
  {
    column: '9',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_9" />,
  },
  {
    column: '10',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_10" />,
  },
  {
    column: '11',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_11" />,
  },
  {
    column: '12',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_12" />,
  },
  {
    column: '13',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_13" />,
  },
  {
    column: 'کابل',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_14" />,
  },
  {
    column: '15',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_15" />,
  },
  {
    column: '16',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_16" />,
  },
  {
    column: '17',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_17" />,
  },
  {
    column: '18',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_18" />,
  },
  {
    column: '19',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_19" />,
  },
  {
    column: '20',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    column: '21',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_21" />,
  },
  {
    column: '22',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_22" />,
  },
  {
    column: '23',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_23" />,
  },
  {
    column: '24',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_24" />,
  },
  {
    column: '25',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_25" />,
  },
  {
    column: '26',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_26" />,
  },
  {
    column: '27',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_27" />,
  },
  {
    column: '28',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_28" />,
  },
  {
    column: '29',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_29" />,
  },
  {
    column: '30',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_30" />,
  },
  {
    column: '31',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_31" />,
  },
  {
    column: '32',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_32" />,
  },
  {
    column: '33',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_33" />,
  },
  {
    column: '34',
    label: <IntlMessages id="forms.StdSchoolProvinceOptions_34" />,
  },
];
const educationYears = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { value: '1', label: <IntlMessages id="forms.educationalYearOption_1" /> },
  { value: '2', label: <IntlMessages id="forms.educationalYearOption_2" /> },
  { value: '3', label: <IntlMessages id="forms.educationalYearOption_3" /> },
  { value: '4', label: <IntlMessages id="forms.educationalYearOption_4" /> },
  { value: '5', label: <IntlMessages id="forms.educationalYearOption_5" /> },
  { value: '6', label: <IntlMessages id="forms.educationalYearOption_6" /> },
  { value: '7', label: <IntlMessages id="forms.educationalYearOption_7" /> },
  { value: '8', label: <IntlMessages id="forms.educationalYearOption_8" /> },
  { value: '9', label: <IntlMessages id="forms.educationalYearOption_9" /> },
  { value: '10', label: <IntlMessages id="forms.educationalYearOption_10" /> },
  { value: '11', label: <IntlMessages id="forms.educationalYearOption_11" /> },
  { value: '12', label: <IntlMessages id="forms.educationalYearOption_12" /> },
  { value: '13', label: <IntlMessages id="forms.educationalYearOption_13" /> },
  { value: '14', label: <IntlMessages id="forms.educationalYearOption_14" /> },
  { value: '15', label: <IntlMessages id="forms.educationalYearOption_15" /> },
  { value: '16', label: <IntlMessages id="forms.educationalYearOption_16" /> },
  { value: '17', label: <IntlMessages id="forms.educationalYearOption_17" /> },
  { value: '18', label: <IntlMessages id="forms.educationalYearOption_18" /> },
  { value: '19', label: <IntlMessages id="forms.educationalYearOption_19" /> },
  { value: '20', label: <IntlMessages id="forms.educationalYearOption_20" /> },
  { value: '21', label: <IntlMessages id="forms.educationalYearOption_21" /> },
  { value: '22', label: <IntlMessages id="forms.educationalYearOption_22" /> },
  { value: '23', label: <IntlMessages id="forms.educationalYearOption_23" /> },
  { value: '24', label: <IntlMessages id="forms.educationalYearOption_24" /> },
  { value: '25', label: <IntlMessages id="forms.educationalYearOption_25" /> },
  { value: '26', label: <IntlMessages id="forms.educationalYearOption_26" /> },
  { value: '27', label: <IntlMessages id="forms.educationalYearOption_27" /> },
  { value: '28', label: <IntlMessages id="forms.educationalYearOption_28" /> },
  { value: '29', label: <IntlMessages id="forms.educationalYearOption_29" /> },
  { value: '30', label: <IntlMessages id="forms.educationalYearOption_30" /> },
  { value: '31', label: <IntlMessages id="forms.educationalYearOption_31" /> },
  { value: '31', label: <IntlMessages id="forms.educationalYearOption_32" /> },
  { value: '32', label: <IntlMessages id="forms.educationalYearOption_33" /> },
  { value: '33', label: <IntlMessages id="forms.educationalYearOption_34" /> },
  { value: '34', label: <IntlMessages id="forms.educationalYearOption_35" /> },
  { value: '35', label: <IntlMessages id="forms.educationalYearOption_36" /> },
];
const DormTypeOptions = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  { column: '1', label: 'بدل عاشه' },
  { column: '2', label: 'بدیل عاشه' },
];
const statusOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { column: '1', label: <IntlMessages id="forms.StudyTypeInrolled" /> },
  { column: '2', label: <IntlMessages id="forms.StudyTypeDismissed" /> },
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
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedDormTypeOption, setSelectedDormTypeOption] = useState({
    column: 'all',
    label: <IntlMessages id="dorm.type" />,
  });

  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });

  const [selectedYearOption, setSelectedYearOption] = useState({
    column: 'all',
    label: <IntlMessages id="dorm.yearList-1" />,
  });

  const [selectedStatusOptions, setSelectedStatusOptions] = useState({
    column: 'all',
    label: <IntlMessages id="teacher.status" />,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);
  const fetchDorms = async () => {
    const response = await axios.get(`${dormUrl}`);
    const updatedData = await response.data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    setDormsFilterList(updatedData);
    console.log('dormsFilterList', dormsFilterList);
  };

  useEffect(() => {
    fetchDorms();
  }, []);

  useEffect(() => {
    console.log('district', district);
    async function fetchData() {
      if (selectedDormTypeOption.column == 'all') {
        console.log('selectedDormTypeOption', selectedDormTypeOption.column);
        setSelectedDormTypeOption({
          column: '',
          label: <IntlMessages id="dorm.type" />,
        });
      }
      if (dormName !== '') {
        const response = await axios.get(
          `${dormStudentsUrl}/?dorm_id=${dormName.id}&district=${district}&province=${selectedProvinceOption.column}&dorm_type=${selectedDormTypeOption.column}`
        );
        setDorms(response.data);
        setIsLoaded(true);
      } else {
        const response = await axios.get(
          `${dormStudentsUrl}/?district=${district}&province=${selectedProvinceOption.column}&dorm_type=${selectedDormTypeOption.column}`
        );
        setDorms(response.data);
        setIsLoaded(true);
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
          changeDormTypeBy={(column) => {
            setSelectedDormTypeOption(
              DormTypeOptions.find((x) => x.column === column)
            );
          }}
          changeProvinceBy={(column) => {
            setSelectedProvinceOption(
              provinces.find((x) => x.column === column)
            );
          }}
          changeYearBy={(column) => {
            setSelectedYearOption(
              educationYears.find((x) => x.column === column)
            );
          }}
          changeStatusBy={(column) => {
            setSelectedStatusOptions(
              statusOptions.find((x) => x.column === column)
            );
          }}
          selectedDormTypeOption={selectedDormTypeOption}
          selectedProvinceOption={selectedProvinceOption}
          selectedYearOption={selectedYearOption}
          selectedStatusOptions={selectedStatusOptions}
          DormTypeOptions={DormTypeOptions}
          provinces={provinces}
          educationYears={educationYears}
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
