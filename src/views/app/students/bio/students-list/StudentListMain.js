import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';
import {
  provincesOptionsForList,
  educationalYearsOptionsForList,
  studentType,
  genderOptionsForList,
  studyTimeOptionsForList,
} from '../../../global-data/options';
// import { servicePath } from 'constants/defaultValues';
import ListPageHeading from 'views/app/students/bio/students-list/StudentListHeading';
import ListPageListing from 'views/app/students/bio/students-list/StudentListCatagory';
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
const studentInstituteApiUrl = `${servicePath}/api/student_institutes/`;
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
  const [selectedShiftOption, setSelectedShiftOption] = useState({
    column: 'all',
    label: 'وقت/ شفت',
  });
  const [selectedEducationalYearOption, seSelectedEducationalYearOption] =
    useState({
      column: 'all',
      label: 'سال تعلیمی',
    });
  const [studentTypeOptions, setStudentTypeOptions] = useState({
    column: 'all',
    label: 'حالت شاگرد',
  });
  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedOrderOption,
    selectedGenderOption,
    selectedProvinceOption,
    selectedShiftOption,
    selectedEducationalYearOption,
    studentTypeOptions,
  ]);

  const itemsPerPage = 10;

  useEffect(async () => {
    async function fetchData() {
      console.log('institute', institute);
      console.log('province', province);
      console.log('district', district);
      console.log('studentId', studentId);
      console.log('selectedGenderOption', selectedGenderOption);
      console.log('currentPage', currentPage);

      if (institute !== '') {
        const response = await callApi(
          `api/student_institutes/?institute_id=${institute.id}&page=${currentPage}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setTotalPage(Math.ceil(response.data.count / itemsPerPage));
          setItems(response.data.results);
          setSelectedItems([]);
          setTotalItemCount(response.data.count);
          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else if (
        selectedProvinceOption.column === 'all' &&
        selectedGenderOption.column === 'all' &&
        selectedShiftOption
      ) {
        if (rest == true) {
          setDistrict('');
          setStudentId('');
          setRest(false);
        }
        const response = await callApi(
          `api/?student_id=${studentId}&current_district=${district}&p=${currentPage}&page=${1}`,
          '',
          null
        );
        console.log('respons', response);
        if (response.data && response.status === 200) {
          setTotalPage(Math.ceil(response.data.count / itemsPerPage));
          setItems(response.data.results);
          console.log('response of the ', response);
          setSelectedItems([]);
          setTotalItemCount(response.data.count);

          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else if (selectedProvinceOption.column === 'all') {
        const response = await callApi(
          `api/?student_id=${studentId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}`,
          '',
          null
        );

        if (response.data && response.status === 200) {
          setTotalPage(Math.ceil(response.data.count / itemsPerPage));
          setItems(response.data.results);
          setSelectedItems([]);
          setTotalItemCount(response.data.count);
          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else if (selectedGenderOption.column === 'all') {
        const response = await callApi(
          `api/?student_id=${studentId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setTotalPage(Math.ceil(response.data.count / itemsPerPage));
          setItems(response.data.results);
          setSelectedItems([]);
          setTotalItemCount(response.data.count);
          setIsLoaded(true);
        } else {
          console.log('students error');
        }
      } else {
        setTotalItemCount(response.data.totalItem);
        const response = await callApi(
          `api/?student_id=${studentId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setTotalPage(Math.ceil(response.data.count / itemsPerPage));
          setItems(response.data.results);
          setSelectedItems([]);
          setTotalItemCount(response.data.count);
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
    studentId,
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
        {/* This is he */}
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
          // Gender
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
          selectedEducationalYearOption={selectedEducationalYearOption}
          studentTypeOptions={studentTypeOptions}
          selectedProvinceOption={selectedProvinceOption}
          selectedShiftOption={selectedShiftOption}
          genderOptionsForList={genderOptionsForList}
          studyTimeOptionsForList={studyTimeOptionsForList}
          provincesOptionsForList={provincesOptionsForList}
          onIdSearchKey={(e) => {
            if (e.key === 'Enter') {
              setStudentId(e.target.value.toLowerCase());
            }
          }}
          // Province
          onProvinceSearchKey={(e) => {
            if (e.key === 'Enter') {
              setProvince(e.target.value.toLowerCase());
            }
          }}
          // District
          onDistrictSearchKey={(e) => {
            if (e.key === 'Enter') {
              setDistrict(e.target.value.toLowerCase());
            }
          }}
          onResetClick={setRest}
          reset={rest}
          institutes={institutes}
          onInstituteSelect={setInstitute}
          // Shift
          changeShiftBy={(column) => {
            setSelectedShiftOption(
              studyTimeOptionsForList.find((x) => x.column === column)
            );
          }}
          // Educational Year
          changeEducationalYearBy={(column) => {
            seSelectedEducationalYearOption(
              educationalYearsOptionsForList.find((x) => x.column === column)
            );
          }}
          educationalYearsOptionsForList={educationalYearsOptionsForList}
          // Level of Education
          changestudentTypeBy={(column) => {
            setStudentTypeOptions(studentType.find((x) => x.column === column));
          }}
          studentType={studentType}
        />
        <table className="table">
          <thead
            className="pl-2 d-flex flex-grow-1  table-dark mb-2"
            style={{ maxHeight: '55px' }}
          >
            <tr className="card-body align-self-center d-flex flex-column flex-lg-row align-items-lg-center">
              <th
                style={{
                  width: '11%',
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
                  width: '15%',
                  fontSize: '20px',
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
                  fontSize: '20px',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                }}
              >
                {' '}
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
                <IntlMessages id="student.PhoneNo" />
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
                <IntlMessages id="student.interenaceType" />
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
                <IntlMessages id="study.type" />
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
