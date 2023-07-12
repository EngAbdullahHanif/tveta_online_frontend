import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import ListPageHeading from './AttendanceListHeading';
import {
  provincesOptionsForList,
  genderOptionsForList,
} from '../../../global-data/options';

import ListPageListing from './AttendanceListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import { useAsyncDebounce } from 'react-table';
import callApi from 'helpers/callApi';
import DisplayMessage from 'components/messages/DisplayMessage';
import config from '../../../../../config';
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
  const [institutes, setInstitutes] = useState();
  const [institute, setInstitute] = useState('');
  const [attendance, setAttendance] = useState([]);

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
        <ListPageHeading
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
                {/* <th
                style={{
                  width: '10%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="صنف/ټولګۍ" />
              </th> */}
                {/* <th
                style={{
                  width: '10%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="سمستر." />
              </th> */}
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
                {/* <th
                style={{
                  width: '10%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="دیپارتمنت" />
              </th> */}
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
                {/* <th
                  style={{
                    width: '11%',
                    padding: '0%',
                    textAlign: 'right',
                    borderStyle: 'hidden',
                  }}
                >
                  {' '}
                  <IntlMessages id="روز ها تعلیمی" />
                </th> */}
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
        )}
      </div>
    </>
  );
};

export default ThumbListPages;
