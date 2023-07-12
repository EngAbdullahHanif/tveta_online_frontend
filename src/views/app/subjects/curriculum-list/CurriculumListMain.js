import React, { useState, useEffect } from 'react';

import IntlMessages from 'helpers/IntlMessages';

// import { servicePath } from 'constants/defaultValues';

//import ListPageHeading from 'views/app/teachers/bio/teacher-list/TeacherListHeading';
import { educationalYearsOptionsForList } from '../../global-data/options';
//import ListPageHeadings from './workerListHeading'
import ListPageHeading from './CurriculumListHeading';
import callApi from 'helpers/callApi';
import ListPageListing from './CurriculumListCatagory';
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
const teacherApiUrl = `${servicePath}/teachers/`;
const instituteApiUrl = `${servicePath}/institute/`;
const teacherInstituteApiUrl = `${servicePath}/teachers/institute/`;

const orderOptions = [
  { column: 'title', label: 'Product Name' },
  { column: 'category', label: 'Category' },
  { column: 'status', label: 'Status' },
];

// DEPARTMENT SHOULD BE TAKEN FROM BACKEND
const departmentOptions = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  { column: '1', label: 'integrate' },
  { column: '2', label: 'integrate ' },
];
const pageSizes = [4, 8, 12, 20];

const categories = [
  { label: 'Cakes', value: 'Cakes', key: 0 },
  { label: 'Cupcakes', value: 'Cupcakes', key: 1 },
  { label: 'Desserts', value: 'Desserts', key: 2 },
];

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

const classes = [
  {
    column: 'all',
    label: 'تول / همه',
  },
  {
    column: '1',
    label: <IntlMessages id="Integrate" />,
  },
];
const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedDepartmentOption, setSelectedDepartmentOption] = useState({
    column: 'all',
    label: <IntlMessages id="attendance.departmentLabel" />,
  });
  const [selectedClassOption, setSelectedClassOption] = useState({
    column: 'all',
    label: <IntlMessages id="marks.ClassLabelList" />,
  });

  const [selectedEducationalYearOption, setSelectedEducationalYearOption] =
    useState({
      column: 'all',
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

  // fetch curriculum list from server
  const fetchCurrculumn = async () => {
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
  };

  useEffect(() => {
    fetchCurrculumn();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPageSize,
    selectedDepartmentOption,
    selectedClassOption,
    selectedEducationalYearOption,
  ]);

  // useEffect(() => {
  //   console.log('institute', institute);
  //   console.log('current page', currentPage);
  //   async function fetchData() {
  //     if (institute !== '') {
  //       const res = await axios.get(
  //         `${teacherInstituteApiUrl}?institute_id=${institute.id}&page=${currentPage}&limit=${selectedPageSize}`
  //       );
  //       console.log('res', res.data);
  //       setInstituteTeachers(res.data);
  //       setItems(res.data);
  //       setTotalItemCount(res.data.count);
  //       setIsLoaded(true);
  //     } else if (
  //       selectedProvinceOption.column === 'all' &&
  //       selectedGenderOption.column === 'all'
  //     ) {
  //       if (rest == true) {
  //         setDistrict('');
  //         setTeacherId('');
  //         setRest(false);
  //       }
  //       axios
  //         .get(
  //           `${teacherApiUrl}?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //         )
  //         .then((res) => {
  //           return res.data;
  //         })
  //         .then((data) => {
  //           console.log(
  //             `${teacherApiUrl}?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //           );

  //           setItems(data);
  //           setTotalPage(data.total_pages);
  //           setSelectedItems([]);
  //           setTotalItemCount(data.totalItem);
  //           setIsLoaded(true);
  //         });
  //     } else if (selectedProvinceOption.column === 'all') {
  //       axios
  //         .get(
  //           `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //         )
  //         .then((res) => {
  //           return res.data;
  //         })
  //         .then((data) => {
  //           console.log(
  //             `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //           );

  //           setItems(data);
  //           setSelectedItems([]);
  //           setTotalItemCount(data.totalItem);
  //           setIsLoaded(true);
  //         });
  //     } else if (selectedGenderOption.column === 'all') {
  //       axios
  //         .get(
  //           `${teacherApiUrl}?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //         )
  //         .then((res) => {
  //           return res.data;
  //         })
  //         .then((data) => {
  //           console.log(
  //             `${teacherApiUrl}?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //           );

  //           setItems(data);
  //           setSelectedItems([]);
  //           setTotalItemCount(data.totalItem);
  //           setIsLoaded(true);
  //         });
  //     } else {
  //       axios
  //         // get data from localhost:8000/teachers
  //         .get(
  //           `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //         )
  //         .then((res) => {
  //           return res.data;
  //         })
  //         .then((data) => {
  //           console.log(
  //             `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
  //           );
  //           setItems(data);

  //           setSelectedItems([]);
  //           setTotalItemCount(data.totalItem);
  //           setIsLoaded(true);
  //         });
  //     }
  //   }

  //   fetchData();
  // }, [
  //   selectedPageSize,
  //   currentPage,
  //   selectedGenderOption,
  //   selectedProvinceOption,
  //   teacherId,
  //   province,
  //   district,
  //   rest,
  //   institute,
  // ]);

  // const fetchInstitutes = async () => {
  //   const response = await axios.get(instituteApiUrl);
  //   const updatedData = await response.data.map((item) => ({
  //     id: item.id,
  //     name: item.name,
  //   }));
  //   setInstitutes(updatedData);
  // };

  // useEffect(() => {
  //   fetchInstitutes();
  // }, []);

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
          changeDepartmentBy={(column) => {
            setSelectedDepartmentOption(
              departmentOptions.find((x) => x.column === column)
            );
          }}
          changeClassBy={(column) => {
            setSelectedClassOption(classes.find((x) => x.column === column));
          }}
          changeEducationalYearBy={(column) => {
            setSelectedEducationalYearOption(
              educationalYearsOptionsForList.find((x) => x.column === column)
            );
          }}
          selectedDepartmentOption={selectedDepartmentOption}
          selectedClassOption={selectedClassOption}
          selectedEducationalYearOption={selectedEducationalYearOption}
          educationalYearsOptionsForList={educationalYearsOptionsForList}
          departmentOptions={departmentOptions}
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
