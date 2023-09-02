import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import IntlMessages from 'helpers/IntlMessages';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from './EvaluationListHeading';

import ListPageListing from './EvaluationListCatagory';
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
const evaluationApiUrl = `${servicePath}/teachers/evaluation/`;
const instituteApiUrl = `${servicePath}/institute/`;

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

const filterOptions = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  { column: '1', label: 'ارزیابی شوی' },
  { column: '0', label: 'نا ارزیابی سوی' },
];
const createNotification = (type, className) => {
  const cName = className || '';
  switch (type) {
    case 'success':
      NotificationManager.success(
        'استاد موفقانه رجستر شو',
        'موفقیت',
        3000,
        null,
        null,
        cName,
      );
      break;
    case 'warning':
      NotificationManager.warning(
        'لطفا انستیتوت هم انتخاب کری',
        'اخطاریه',
        3000,
        null,
        null,
        cName,
      );
      break;
    case 'error':
      NotificationManager.error(
        'استاد ثبت نشو،لطفا معلومات دقیق دننه کی',
        'خطا',
        5000,
        () => {
          alert('callback');
        },
        null,
        cName,
      );
      break;
    default:
      NotificationManager.info('Info message');
      break;
  }
};

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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [evaluationYear, setEvaluationYear] = useState('');
  const [institute, setInstitute] = useState({
    id: '',
    label: '',
  });
  const [institutes, setInstitutes] = useState([]);

  const [selectedFilter, setSelectFilter] = useState({
    column: 'all',
    label: 'تول / همه',
  });
  const [rest, setRest] = useState(0);
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
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize, selectedOrderOption]);

  useEffect(() => {
    if (selectedFilter.column == 0 && institute == '') {
      createNotification('warning', 'filled');
    }

    async function fetchData() {
      axios
        .get(
          `${evaluationApiUrl}?evaluated=${selectedFilter.column}&evaluation_year=${evaluationYear}&institute_id=${institute.id}`,
        )

        .then((res) => {
          console.log(
            `${evaluationApiUrl}?evaluated=${selectedFilter.column}&evaluation_year=${evaluationYear}&institute_id=${institute.id}`,
          );
          return res.data;
        })
        .then((data) => {
          setItems(data);
          setSelectedItems([]);
          setTotalItemCount(data.totalItem);
          setIsLoaded(true);
        });
    }
    fetchData();
  }, [
    selectedPageSize,
    currentPage,
    selectedOrderOption,
    search,
    startDate,
    endDate,
    selectedFilter,
    evaluationYear,
    institute,
  ]);

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
        }),
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

  console.log('Data displayed on the table', items);

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="د ارزیابیو لست/ لست ارزیابی ها"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
          changeFilterOption={(column) => {
            setSelectFilter(filterOptions.find((x) => x.column === column));
          }}
          filterOptions={filterOptions}
          changePageSize={setSelectedPageSize}
          selectedPageSize={selectedPageSize}
          totalItemCount={totalItemCount}
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
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          changeFilterBy={(column) => {
            setSelectedOrderOption(
              orderOptions.find((x) => x.column === column),
            );
          }}
          orderOptions={orderOptions}
          selectedOrderOption={selectedOrderOption}
          onSelectStartDate={setStartDate}
          onSelectEndDate={setEndDate}
          onEvaluationYearChange={(e) => {
            if (e.key === 'Enter') {
              setEvaluationYear(e.target.value);
            }
          }}
          institutes={institutes}
          onInstituteSelect={setInstitute}
        />

        <table className="table">
          <thead
            style={{ maxHeight: '55px ' }}
            className="pl-2 d-flex flex-grow-1  table-dark mb-2"
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="marks.No" />
              </th>
              <th
                style={{
                  width: '14%',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="forms.StdName" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                <IntlMessages id="forms.StdFatherName" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="forms.ProvinceLabel" />
              </th>
              <th
                style={{
                  width: '14%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="teacher.PhoneNoLabel" />
              </th>
              <th
                style={{
                  width: '15%',
                  padding: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
                <IntlMessages id="teacher.MajorLabel" />
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
                <IntlMessages id="teacher.GradeLabel" />
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
        </table>
      </div>
    </>
  );
};

export default ThumbListPages;
