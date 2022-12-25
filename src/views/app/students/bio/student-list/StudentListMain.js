import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from 'views/app/students/bio/student-list/StudentListHeading';

import ListPageListing from 'views/app/students/bio/student-list/StudentListCatagory';
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
const studentApiUrl = `${servicePath}/api/`;

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
  const [institutes, setInstitutes] = useState([]);
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
  }, [
    selectedPageSize,
    selectedOrderOption,
    selectedGenderOption,
    selectedProvinceOption,
  ]);

  useEffect(() => {
    async function fetchData() {
      if (
        selectedProvinceOption.column === 'all' &&
        selectedGenderOption.column === 'all'
      ) {
        if (rest == true) {
          setDistrict('');
          setStudentId('');
          setRest(false);
        }
        axios
          .get(
            `${studentApiUrl}?std_id=${studentId}&current_district=${district}`
          )
          .then((res) => {
            console.log('res.data', res.data);
            return res.data;
          })
          .then((data) => {
            console.log(
              `${studentApiUrl}?std_id=${studentId}&current_district=${district}`
            );

            setItems(data);
            setSelectedItems([]);
            setTotalItemCount(data.totalItem);
            setIsLoaded(true);
          });
      } else if (selectedProvinceOption.column === 'all') {
        axios
          .get(
            `${studentApiUrl}?std_id=${studentId}&gender=${selectedGenderOption.column}&current_district=${district}`
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            console.log(
              `${studentApiUrl}?std_id=${studentId}&gender=${selectedGenderOption.column}&current_district=${district}`
            );

            setItems(data);
            setSelectedItems([]);
            setTotalItemCount(data.totalItem);
            setIsLoaded(true);
          });
      } else if (selectedGenderOption.column === 'all') {
        axios
          .get(
            `${studentApiUrl}?std_id=${studentId}&current_province=${selectedProvinceOption.column}&current_district=${district}`
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            console.log(
              `${studentApiUrl}?std_id=${studentId}&current_province=${selectedProvinceOption.column}&current_district=${district}`
            );

            setItems(data);
            setSelectedItems([]);
            setTotalItemCount(data.totalItem);
            setIsLoaded(true);
          });
      } else {
        axios
          // get data from localhost:8000/api/student
          .get(
            `${studentApiUrl}?std_id=${studentId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}`
          )
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            console.log(
              `${studentApiUrl}?std_id=${studentId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}`
            );
            setItems(data);

            setSelectedItems([]);
            setTotalItemCount(data.totalItem);
            setIsLoaded(true);
          });
      }
    }
    fetchData();
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
  ]);

  const fetchInstitutes = async () => {
    const response = await axios.get('http://localhost:8000/institute/');
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
          heading="د شاگرد لست/لست شاگردان"
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
              provinces.find((x) => x.column === column)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedProvinceOption={selectedProvinceOption}
          genderOptions={genderOptions}
          provinces={provinces}
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
        />

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
      </div>
    </>
  );
};

export default ThumbListPages;
