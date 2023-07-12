import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';

// import { servicePath } from 'constants/defaultValues';
import { subjectCreditOptions } from '../../global-data/options';
//import ListPageHeading from 'views/app/teachers/bio/teacher-list/TeacherListHeading';
import {
  subjectSystemOptions,
  subjectTypeOptions,
} from '../../global-data/options';

//import ListPageHeadings from './workerListHeading'
import ListPageHeading from 'views/app/subjects/subject-list/SubjectListHeading';

import ListPageListing from 'views/app/subjects/subject-list/SubjectListCatagory';
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

const servicePath = 'http://localhost:8000';

const apiUrl = `${servicePath}/cakes/paging`;
const teacherApiUrl = `${servicePath}/teachers/`;
const instituteApiUrl = `${servicePath}/institute/`;
const teacherInstituteApiUrl = `${servicePath}/teachers/institute/`;

const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

// Hard Coded Data
const roughData = [
  {
    subjectName: 'فزیک',
    subjectEnglishName: 'Maths',
    subjectCode: '33353',
    subjectCredits: '3',
    subjectType: 'اصلی',
    subjectSystemType: 'عمومی',
  },
  {
    subjectName: 'ریاضی',
    subjectEnglishName: 'Maths',
    subjectCode: '33353',
    subjectCredits: '3',
    subjectType: 'اصلی',
    subjectSystemType: 'عمومی',
  },
  {
    subjectName: 'منطق',
    subjectEnglishName: 'Maths',
    subjectCode: '33353',
    subjectCredits: '3',
    subjectType: 'اصلی',
    subjectSystemType: 'عمومی',
  },
  {
    subjectName: 'تاریخ',
    subjectEnglishName: 'Maths',
    subjectCode: '33353',
    subjectCredits: '3',
    subjectType: 'اصلی',
    subjectSystemType: 'عمومی',
  },
];

const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);

  const [selectedCreditOption, setSelectedCreditOption] = useState({
    column: 'all',
    label: 'کریدت',
  });
  const [selectedTypeOption, setSelectedTypeOption] = useState({
    column: 'all',
    label: <IntlMessages id="subject.typeList" />,
  });
  const [selectedSystemOption, setSelectedSystemOption] = useState({
    column: 'all',
    label: <IntlMessages id="subject.systemList" />,
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

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedCreditOption,
    selectedTypeOption,
    selectedSystemOption,
  ]);

  useEffect(() => {
    console.log('institute', institute);
    console.log('current page', currentPage);
    console.log('current page Size', selectedPageSize);
    const accessToken = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${accessToken}` };
    async function fetchData() {
      const response = await callApi(`institute/subject/`, '', null);
      if (response.data && response.status === 200) {
        console.log('response of subjects', response.data);
        setItems(response.data);
        setSelectedItems([]);
        // setTotalItemCount(data);
        setIsLoaded(false);
      } else {
        console.log('students error');
      }
    }

    fetchData();
  }, [
    selectedPageSize,
    currentPage,
    selectedCreditOption,
    selectedTypeOption,
    selectedSystemOption,
    teacherId,
    province,
    district,
    rest,
    institute,
  ]);

  const fetchInstitutes = async () => {
    const response = await callApi('institute/', '', null);
    if (response.data && response.status === 200) {
      const updatedData = await response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setInstitutes(updatedData);
    } else {
      console.log('institute error');
    }
  };

  useEffect(() => {
    fetchInstitutes();
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

  return isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="د مضامینو لست/ لست مضامین"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeCreditBy={(column) => {
            setSelectedCreditOption(
              subjectCreditOptions.find((x) => x.column === column)
            );
          }}
          changeTypeBy={(column) => {
            setSelectedTypeOption(
              subjectTypeOptions.find((x) => x.column === column)
            );
          }}
          changeSystemBy={(column) => {
            setSelectedSystemOption(
              subjectSystemOptions.find((x) => x.column === column)
            );
          }}
          selectedCreditOption={selectedCreditOption}
          selectedSystemOption={selectedSystemOption}
          selectedTypeOption={selectedTypeOption}
          subjectCreditOptions={subjectCreditOptions}
          subjectSystemOptions={subjectSystemOptions}
          subjectTypeOptions={subjectTypeOptions}
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
          roughDate={roughData}
        />
        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark"
            style={{ maxHeight: '55px', marginRight: 2 }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '18px',
                }}
              >
                کود
              </th>
              <th
                style={{
                  width: '18%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '18px',
                }}
              >
                <IntlMessages id="subject.nameList" />
              </th>
              <th
                style={{
                  width: '22%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '18px',
                }}
              >
                <IntlMessages id="subject.english_name" />
              </th>

              <th
                style={{
                  width: '11%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '18px',
                }}
              >
                {' '}
                <IntlMessages id="subject.credits" />
              </th>
              <th
                style={{
                  width: '13%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '18px',
                }}
              >
                {' '}
                <IntlMessages id="inst.type" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '18px',
                }}
              >
                {' '}
                <IntlMessages id="subject.system.type" />
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
            // roughData={roughData}
          />
        </table>
      </div>
    </>
  );
};

export default ThumbListPages;
