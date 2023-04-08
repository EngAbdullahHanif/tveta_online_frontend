import React, { useState, useEffect } from 'react';
import { provincesOptionsForList } from './../../global-data/data';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';

// import { servicePath } from 'constants/defaultValues';

import ListPageHeading from './InstituteListHeading';

import ListPageListing from './InstituteListCatagory';
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
const instituteApiUrl = `${servicePath}/institute/`;

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];

const genderOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { column: '1', label: 'ذکور' },
  { column: '2', label: 'اناث' },
];
const statusOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { column: '1', label: <IntlMessages id="institute.statusOption_1" /> },
  { column: '2', label: <IntlMessages id="institute.statusOption_2" /> },
];

const instituteTypeOptions = [
  {
    column: 'all',
    label: <IntlMessages id="option.all" />,
  },
  { column: '1', label: <IntlMessages id="institute.instTypeOptions_1" /> },
  { column: '2', label: <IntlMessages id="institute.statusOption_2" /> },
];

const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
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
  // const [institutes, setInstitutes] = useState([]);
  const [instituteId, setInstituteId] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [institutes, setInstitutes] = useState([]);
  const [institute, setInstitute] = useState('');
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    column: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });
  const [selectedStatusOptions, setSelectedStatusOptions] = useState({
    column: 'all',
    label: 'حالت',
  });
  const [selectedInstituteType, setSelectedInstituteType] = useState({
    column: 'all',
    label: 'ډول/ نوعیت',
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedOrderOption,
    selectedOrderOption,
    selectedGenderOption,
    selectedProvinceOption,
    selectedStatusOptions,
    selectedInstituteType,
  ]);

  useEffect(() => {
    async function fetchData() {
      if (institute !== '') {
        // const res = await axios.get(`institute/?id=${institute.id}`);
        // console.log('res', response.data);
        // setItems(response.data);
        // setTotalItemCount(response.data.totalItem);
        // setIsLoaded(true);

        const response = await callApi(
          `institute/?id=${institute.id}`,
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
      } else if (
        selectedProvinceOption.column === 'all' &&
        selectedGenderOption.column === 'all'
      ) {
        if (rest == true) {
          setDistrict('');
          setInstituteId('');
          setRest(false);
        }
        // axios
        //   .get(`${instituteApiUrl}?id=${instituteId}&district=${district}`)
        //   .then((res) => {
        //     console.log('res.data', res.data);
        //     return res.data;
        //   })
        //   .then((data) => {
        //     console.log(
        //       `${instituteApiUrl}?id=${instituteId}&district=${district}`
        //     );

        //     setItems(data);
        //     setSelectedItems([]);
        //     setTotalItemCount(data.totalItem);
        //     setIsLoaded(true);
        //   });
        const response = await callApi(
          `institute/?id=${instituteId}&district=${district}`,
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
      } else if (selectedProvinceOption.column === 'all') {
        // axios
        //   .get(
        //     `${instituteApiUrl}?id=${instituteId}&gender=${selectedGenderOption.column}&district=${district}`
        //   )
        //   .then((res) => {
        //     return res.data;
        //   })
        //   .then((data) => {
        //     console.log(
        //       `${instituteApiUrl}?id=${instituteId}&gender=${selectedGenderOption.column}&district=${district}`
        //     );

        //     setItems(data);
        //     setSelectedItems([]);
        //     setTotalItemCount(data.totalItem);
        //     setIsLoaded(true);
        //   });

        const response = await callApi(
          `institute/?id=${instituteId}&gender=${selectedGenderOption.column}&district=${district}`,
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
      } else if (selectedGenderOption.column === 'all') {
        // axios
        //   .get(
        //     `${instituteApiUrl}?id=${instituteId}&province=${selectedProvinceOption.column}&district=${district}`
        //   )
        //   .then((res) => {
        //     return res.data;
        //   })
        //   .then((data) => {
        //     console.log(
        //       `${instituteApiUrl}?id=${instituteId}&province=${selectedProvinceOption.column}&district=${district}`
        //     );

        //     setItems(data);
        //     setSelectedItems([]);
        //     setTotalItemCount(data.totalItem);
        //     setIsLoaded(true);
        //   });

        const response = await callApi(
          `institute/?id=${instituteId}&province=${selectedProvinceOption.column}&district=${district}`,
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
        axios;
        // get data from localhost:8000/api/student
        // .get(
        //   `${instituteApiUrl}?id=${instituteId}&gender=${selectedGenderOption.column}&province=${selectedProvinceOption.column}&district=${district}`
        // )
        // .then((res) => {
        //   return res.data;
        // })
        // .then((data) => {
        //   console.log(
        //     `${instituteApiUrl}?id=${instituteId}&gender=${selectedGenderOption.column}&province=${selectedProvinceOption.column}&district=${district}`
        //   );
        //   setItems(data);

        //   setSelectedItems([]);
        //   setTotalItemCount(data.totalItem);
        //   setIsLoaded(true);
        // });
        const response = await callApi(
          `institute/?id=${instituteId}&gender=${selectedGenderOption.column}&province=${selectedProvinceOption.column}&district=${district}`,
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
    instituteId,
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
          heading="د انستیوت لست/ لست انستیتوت ها"
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
            setSearch(e.target.value.toLowerCase());
            // if (e.key === 'Enter') {
            // }
          }}
          orderOptions={orderOptions}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          changeGenderBy={(column) => {
            setSelectedGenderOption(
              genderOptions.find((x) => x.column === column)
            );
          }}
          changeStatusBy={(column) => {
            setSelectedStatusOptions(
              statusOptions.find((x) => x.column === column)
            );
          }}
          changeInstituteBy={(column) => {
            setSelectedInstituteType(
              instituteTypeOptions.find((x) => x.column === column)
            );
          }}
          changeProvinceBy={(column) => {
            setSelectedProvinceOption(
              provincesOptionsForList.find((x) => x.column === column)
            );
          }}
          selectedGenderOption={selectedGenderOption}
          selectedStatusOptions={selectedStatusOptions}
          selectedInstituteType={selectedInstituteType}
          selectedProvinceOption={selectedProvinceOption}
          genderOptions={genderOptions}
          statusOptions={statusOptions}
          instituteTypeOptions={instituteTypeOptions}
          provincesOptionsForList={provincesOptionsForList}
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
                <IntlMessages id="student.ID" />
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
