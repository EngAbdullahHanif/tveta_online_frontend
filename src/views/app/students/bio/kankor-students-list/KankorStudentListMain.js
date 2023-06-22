import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import { provincesOptionsForList } from '../../../global-data/options';
import callApi from 'helpers/callApi';

// import { servicePath } from 'constants/defaultValues';
import ListPageHeading from 'views/app/students/bio/kankor-students-list/KankorStudentListHeading';
import ListPageListing from 'views/app/students/bio/kankor-students-list/KankorStudentListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import { department } from 'lang/locales/fa_IR';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

import config from '../../../../../config';

const servicePath = config.API_URL;
const kankorStudentApiUrl = `${servicePath}/api/kankorResults/`;
const instituteApiUrl = `${servicePath}/institute/`;

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];
const pageSizes = [10, 20, 40, 80];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];
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

  const roughData = [
    {
      kankorStudentName: '  نعمان احمدی',
      kankorStudentFatherName: 'محمد',
      institute: 'تکنالوژی',
      timeing: 'سهار',
      department: 'معلومات تکنالوژی',
      kankorId: '2412',
      kankorMarks: '89',
      field: 'گرافکس',
      registrationDate: '1401/3/6',
    },
    {
      kankorStudentName: ' شاکر',
      kankorStudentFatherName: ' محمد',
      institute: 'تکنالوژی',
      timeing: 'سهار',
      department: 'معلومات تکنالوژی',
      kankorId: '456',
      kankorMarks: '89',
      field: 'گرافکس',
      registrationDate: '1401/3/6',
    },
    {
      kankorStudentName: ' علی',
      kankorStudentFatherName: ' محمد',
      institute: 'تکنالوژی',
      timeing: 'سهار',
      department: 'معلومات تکنالوژی',
      kankorId: '78',
      kankorMarks: '89',
      field: 'گرافکس',
      registrationDate: '1401/3/6',
    },
    {
      kankorStudentName: ' احمدی',
      kankorStudentFatherName: ' محمد',
      institute: 'تکنالوژی',
      timeing: 'سهار',
      department: 'معلومات تکنالوژی',
      kankorId: '3454',
      kankorMarks: '89',
      field: 'گرافکس',
      registrationDate: '1401/3/6',
    },
  ];

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

  const [studentId, setStudentId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [educationYear, setEducationYear] = useState('');
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    column: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedOrderOption,
    selectedGenderOption,
    selectedProvinceOption,
  ]);

  useEffect(() => {
    console.log('studentId', studentId);
    async function fetchData() {
      // await axios
      //   .get(`${kankorStudentApiUrl}`)
      //   .then((res) => {
      //     return res.data;
      //   })
      //   .then((data) => {
      //     setItems(data);
      //     setSelectedItems([]);
      //     setTotalItemCount(data.totalItem);
      //     setIsLoaded(true);
      //   });

      const response = await callApi(`api/kankorResults/`, '', null);
      if (response.data && response.status === 200) {
        setItems(response.data);
        setSelectedItems([]);
        // setTotalItemCount(data);
        setIsLoaded(true);
      } else {
        console.log('Kankor students error');
      }
    }
    fetchData();
    //console.log('items', items)
  }, [
    selectedPageSize,
    currentPage,
    selectedOrderOption,
    search,
    selectedGenderOption,
    selectedProvinceOption,
    studentId,
    province,
    district,
    rest,
    institute,
    educationYear,
  ]);
  // console.log('items', items)

  const fetchInstitutes = async () => {
    const response = await axios.get(instituteApiUrl);
    const updatedData = await response.data.map((item) => ({
      id: item.id,
      name: item.name,
    }));
    setInstitutes(updatedData);
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
          heading="د کانکور د شاگردانو لست/لست شاگردان کانکوریان"
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
              genderOptions.find((x) => x.column === column)
            );
          }}
          changeProvinceBy={(column) => {
            setSelectedProvinceOption(
              provincesOptionsForList.find((x) => x.column === column)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedProvinceOption={selectedProvinceOption}
          genderOptions={genderOptions}
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
          onEducationYearSelect={(e) => {
            if (e.key === 'Enter') {
              setEducationYear(e.target.value);
            }
          }}
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
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="marks.No" />
              </th>
              <th
                style={{
                  width: '11%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="kankorStudentId" />
              </th>
              <th
                style={{
                  width: '15%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="workerName" />
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
                <IntlMessages id="institute" />
              </th>
              <th
                style={{
                  width: '14%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="department" />
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
                <IntlMessages id="student.Markslist" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="dorm.yearList" />
              </th>
            </tr>
          </thead>

          <ListPageListing
            items={items}
            roughData={roughData}
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
