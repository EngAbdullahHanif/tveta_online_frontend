import React, { useState, useEffect } from 'react';

import IntlMessages from 'helpers/IntlMessages';

// import { servicePath } from 'constants/defaultValues';

//import ListPageHeading from 'views/app/teachers/bio/teacher-list/TeacherListHeading';
//import ListPageHeadings from './workerListHeading'
import ListPageHeading from './CurriculumListHeading';
import callApi from 'helpers/callApi';
import ListPageListing from './CurriculumListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import config from '../../../../config';
import { reset } from 'mousetrap';

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
const teacherApiUrl = `${servicePath}/teachers/`;
const instituteApiUrl = `${servicePath}/institute/`;
const teacherInstituteApiUrl = `${servicePath}/teachers/institute/`;

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

// DEPARTMENT SHOULD BE TAKEN FROM BACKEND

const pageSizes = [4, 8, 12, 20];

// Hard Coded Data
const roughData = [
  {
    curriculumId: '1',
    department: 'انجینری',
    subject: 'ریاضی',
    class: '3',
    educationalYear: '1399',
  },
  {
    curriculumId: '2',
    department: 'انجینری',
    subject: 'فزیک',
    class: '4',
    educationalYear: '1389',
  },
  {
    curriculumId: '3',
    department: 'طب',
    subject: 'بیولژی',
    class: '2',
    educationalYear: '1400',
  },
  {
    curriculumId: '4',
    department: 'طب',
    subject: 'کیمیا',
    class: '3',
    educationalYear: '1399',
  },
];

const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState({
    value: 'all',
    label: <IntlMessages id="attendance.departmentLabel" />,
  });
  const [selectedClassOption, setSelectedClassOption] = useState({
    value: 'all',
    label: <IntlMessages id="marks.ClassLabelList" />,
  });

  const [selectedEducationalYearOption, setSelectedEducationalYearOption] =
    useState({
      value: 'all',
      label: <IntlMessages id="curriculum.eduactionalYearList" />,
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
  const [institutes, setInstitutes] = useState([]);
  const [institute, setInstitute] = useState('');
  const [instituteTeachers, setInstituteTeachers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);

  // fetch department list
  const fetchDepartments = async () => {
    const response = await callApi('institute/department/', 'GET', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      const all = { value: 'all', label: 'همه' };
      updatedData.unshift(all);
      setDepartments(updatedData);
    } else {
      console.log('department error');
    }
  };

  const fetchClasses = async () => {
    const response = await callApi('institute/classs/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name + ' - ' + item.semester + ' - ' + item.section,
      }));
      const all = { value: 'all', label: 'همه' };
      updatedData.unshift(all);
      setClasses(updatedData);
    } else {
      console.log('class error');
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchClasses();
  }, []);

  // fetch curriculum list from server
  const fetchCurrculumn = async () => {
    if (
      selectedDepartmentOption.value === 'all' &&
      selectedClassOption.value === 'all' &&
      selectedEducationalYearOption.value === 'all'
    ) {
      if (reset == true) {
        setRest(false);
      }
      const response = await callApi(
        'institute/department-subject/',
        'GET',
        null
      );
      if (response.data && response.status === 200) {
        console.log('list of the curriculum', response.data);
        setItems(response.data);
      } else {
        console.log('class error');
      }
    } else if (selectedDepartmentOption.value === 'all') {
      let newClass = selectedClassOption?.value;

      if (selectedClassOption?.value === 'all') {
        newClass = '';
      }

      let newEducationalYear = selectedEducationalYearOption?.value;
      if (selectedEducationalYearOption?.value === 'all') {
        newEducationalYear = '';
      }

      const response = await callApi(
        `institute/department-subject/?classs=${newClass}&educational_year=${newEducationalYear}`,
        'GET',
        null
      );
      if (response.data && response.status === 200) {
        console.log('list of the curriculum', response.data);
        setItems(response.data);
      }
    } else if (selectedClassOption.value === 'all') {
      let newDepartment = selectedDepartmentOption?.value;
      if (selectedDepartmentOption?.value === 'all') {
        newDepartment = '';
      }

      let newEducationalYear = selectedEducationalYearOption?.value;
      if (selectedEducationalYearOption?.value === 'all') {
        newEducationalYear = '';
      }

      const response = await callApi(
        `institute/department-subject/?department=${newDepartment}&educational_year=${newEducationalYear}`,
        'GET',
        null
      );
      if (response.data && response.status === 200) {
        console.log('list of the curriculum', response.data);
        setItems(response.data);
      }
    } else if (selectedDepartmentOption.value === 'all') {
      let newClass = selectedClassOption?.value;
      if (selectedClassOption?.value === 'all') {
        newClass = '';
      }

      let newEducationalYear = selectedEducationalYearOption?.value;
      if (selectedEducationalYearOption?.value === 'all') {
        newEducationalYear = '';
      }

      const response = await callApi(
        `institute/department-subject/?classs=${newClass}&educational_year=${newEducationalYear}`,
        'GET',
        null
      );
      if (response.data && response.status === 200) {
        console.log('list of the curriculum', response.data);
        setItems(response.data);
      } else {
        console.log('class error');
      }
    } else {
      let newDepartment = selectedDepartmentOption?.value;
      if (selectedDepartmentOption?.value === 'all') {
        newDepartment = '';
      }

      let newClass = selectedClassOption?.value;
      if (selectedClassOption?.value === 'all') {
        newClass = '';
      }

      let newEducationalYear = selectedEducationalYearOption?.value;
      if (selectedEducationalYearOption?.value === 'all') {
        newEducationalYear = '';
      }
      const response = await callApi(
        `institute/department-subject/?classs=${newClass}&educational_year=${newEducationalYear}&department=${newDepartment}`,
        'GET',
        null
      );
      if (response.data && response.status === 200) {
        console.log('list of the curriculum', response.data);
        setItems(response.data);
      } else {
        console.log('class error');
      }
    }
  };

  useEffect(() => {
    fetchCurrculumn();
  }, [
    selectedDepartmentOption,
    selectedClassOption,
    selectedEducationalYearOption,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedDepartmentOption,
    selectedClassOption,
    selectedEducationalYearOption,
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
          heading="د نصاب لست/ لست نصاب"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeDepartmentBy={(value) => {
            setSelectedDepartmentOption(
              departments.find((x) => x.value === value)
            );
          }}
          changeClassBy={(value) => {
            setSelectedClassOption(classes.find((x) => x.value === value));
          }}
          changeEducationalYearBy={(value) => {
            setSelectedEducationalYearOption(
              educationalYearsOptions.find((x) => x.value === value)
            );
          }}
          selectedDepartmentOption={selectedDepartmentOption}
          selectedClassOption={selectedClassOption}
          selectedEducationalYearOption={selectedEducationalYearOption}
          educationalYearsOptions={educationalYearsOptions}
          departmentOptions={departments}
          classes={classes}
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
          onResetClick={setRest}
          reset={rest}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          institutes={institutes}
          onInstituteSelect={setInstitute}
          items={items}
        />
        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark"
            style={{ maxHeight: '55px', marginRight: 2 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '20%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                شماره
              </th>
              <th
                style={{
                  width: '20%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                مضمون
              </th>
              <th
                style={{
                  width: '20%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="curriculum.departmentIdLabel" />
              </th>
              <th
                style={{
                  width: '20%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="curriculum.classLabel" />
              </th>

              <th
                style={{
                  width: '20%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="curriculum.eduactionalYearLabel" />
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
            roughData={roughData}
          />
        </table>
      </div>
    </>
  );
};

export default ThumbListPages;
