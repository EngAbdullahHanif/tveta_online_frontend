import React, { useState, useEffect } from 'react';

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import './list.css';
import callApi from 'helpers/callApi';
import { provincesOptionsForList } from './../../../global-data/data';
import { levelOfEdcationForList } from './../../../global-data/data';
import { genderOptionsForList } from './../../../global-data/data';
import ListPageHeading from 'views/app/teachers/bio/teacher-list/TeacherListHeading';
import ListPageListing from 'views/app/teachers/bio/teacher-list/TeacherListCatagory';
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
const teacherApiUrl = `${servicePath}/teachers/`;
const instituteApiUrl = `${servicePath}/institute/`;
const teacherInstituteApiUrl = `${servicePath}/teachers/institute/`;

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

const ThumbListPages = ({ match }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayMode, setDisplayMode] = useState('thumblist');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedGenderOption, setSelectedGenderOption] = useState({
    column: 'all',
    label: 'جنیست',
  });
  const [selectedProvinceOption, setSelectedProvinceOption] = useState({
    column: 'all',
    label: 'ولایت',
  });
  const [selectLevelOfEducationOption, setSelectLevelOfEducationOption] =
    useState({
      column: 'all',
      label: 'سطح تحصیلی',
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
    selectedGenderOption,
    selectedProvinceOption,
    selectLevelOfEducationOption,
  ]);

  useEffect(() => {
    console.log('institute', institute);
    console.log('current page', currentPage);
    // async function fetchData() {
    //   if (institute !== '') {
    //     const res = await axios.get(
    //       `${teacherInstituteApiUrl}?institute_id=${institute.value}&page=${currentPage}&limit=${selectedPageSize}`
    //     );
    //     console.log('res', res.data);
    //     setInstituteTeachers(res.data);
    //     setItems(res.data);
    //     setTotalItemCount(res.data.count);
    //     //setIsLoaded(true);
    //   } else if (
    //     selectedProvinceOption.column === 'all' &&
    //     selectedGenderOption.column === 'all'
    //   ) {
    //     if (rest == true) {
    //       setDistrict('');
    //       setTeacherId('');
    //       setRest(false);
    //     }
    //     const response = await callApi('institute/classs/', '', null);
    //     if (response.data && response.status === 200) {
    //       setItems(response.data);
    //       // setTotalPage(response.data.total_pages);
    //       setSelectedItems([]);
    //       // setTotalItemCount(response.data.totalItem);
    //       setIsLoaded(true);
    //     } else {
    //       setItems([]);
    //       console.log('insttutes error');
    //     }

    //     // axios
    //     //   .get(
    //     //     `${teacherApiUrl}?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //     //   )
    //     //   .then((res) => {
    //     //     return res.data;
    //     //   })
    //     //   .then((data) => {
    //     //     console.log(
    //     //       `${teacherApiUrl}?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //     //     );

    //     //     setItems(data);
    //     //     setTotalPage(data.total_pages);
    //     //     setSelectedItems([]);
    //     //     setTotalItemCount(data.totalItem);
    //     //     setIsLoaded(true);
    //     //   });
    //   } else if (selectedProvinceOption.column === 'all') {
    //     axios
    //       .get(
    //         `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //       )
    //       .then((res) => {
    //         return res.data;
    //       })
    //       .then((data) => {
    //         console.log(
    //           `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //         );

    //         setItems(data);
    //         setSelectedItems([]);
    //         setTotalItemCount(data.totalItem);
    //         setIsLoaded(true);
    //       });
    //   } else if (selectedGenderOption.column === 'all') {
    //     axios
    //       .get(
    //         `${teacherApiUrl}?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //       )
    //       .then((res) => {
    //         return res.data;
    //       })
    //       .then((data) => {
    //         console.log(
    //           `${teacherApiUrl}?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //         );

    //         setItems(data);
    //         setSelectedItems([]);
    //         setTotalItemCount(data.totalItem);
    //         setIsLoaded(true);
    //       });
    //   } else {
    //     axios
    //       // get data from localhost:8000/teachers
    //       .get(
    //         `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //       )
    //       .then((res) => {
    //         return res.data;
    //       })
    //       .then((data) => {
    //         console.log(
    //           `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
    //         );
    //         setItems(data);

    //         setSelectedItems([]);
    //         setTotalItemCount(data.totalItem);
    //         setIsLoaded(true);
    //       });
    //   }
    // }

    async function fetchData() {
      if (institute !== '') {
        // const res = await axios.get(
        //   `${teacherInstituteApiUrl}?institute_id=${institute.id}&page=${currentPage}&limit=${selectedPageSize}`
        // );
        // console.log('res', response.data);
        // setItems(response.data);
        // setTotalItemCount(response.data.count);
        // setIsLoaded(true);

        const response = await callApi(
          `teachers/institute/?institute_id=${institute.id}&page=${currentPage}&limit=${selectedPageSize}`,
          '',
          null
        );
        if (response.data && response.status === 200) {
          setInstituteTeachers(response.data);
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
          setTeacherId('');
          setRest(false);
        }
        // axios
        //   .get(
        //     `${teacherApiUrl}?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //   )
        //   .then((res) => {
        //     return res.data;
        //   })

        const response = await callApi(
          `teachers/?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`,
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
        // setTotalPage(response.data.total_pages);
        // setSelectedItems([]);
        // setTotalItemCount(response.data.totalItem);
        // setIsLoaded(true);
        // .then((data) => {
        //   console.log(
        //     `${teacherApiUrl}?id=${teacherId}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //   );

        //   setItems(data);
        //   setTotalPage(data.total_pages);
        //   setSelectedItems([]);
        //   setTotalItemCount(data.totalItem);
        //   setIsLoaded(true);
        // });
      } else if (selectedProvinceOption.column === 'all') {
        // axios
        //   .get(
        //     `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //   )
        //   .then((res) => {
        //     return res.data;
        //   })
        //   .then((data) => {
        //     console.log(
        //       `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //     );

        //     setItems(data);
        //     setSelectedItems([]);
        //     setTotalItemCount(data.totalItem);
        //     setIsLoaded(true);
        //   });

        const response = await callApi(
          `teachers/?id=${teacherId}&gender=${selectedGenderOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`,
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
        //     `${teacherApiUrl}?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //   )
        //   .then((res) => {
        //     return res.data;
        //   })
        //   .then((data) => {
        //     console.log(
        //       `${teacherApiUrl}?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //     );

        //     setItems(data);
        //     setSelectedItems([]);
        //     setTotalItemCount(data.totalItem);
        //     setIsLoaded(true);
        //   });
        const response = await callApi(
          `teachers/?id=${teacherId}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`,
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
        // axios
        //   // get data from localhost:8000/teachers
        //   .get(
        //     `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //   )
        //   .then((res) => {
        //     return res.data;
        //   })
        //   .then((data) => {
        //     console.log(
        //       `${teacherApiUrl}?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`
        //     );
        //     setItems(data);

        //     setSelectedItems([]);
        //     setTotalItemCount(data.totalItem);
        //     setIsLoaded(true);
        //   });
        const response = await callApi(
          `teachers/?id=${teacherId}&gender=${selectedGenderOption.column}&current_province=${selectedProvinceOption.column}&current_district=${district}&page=${currentPage}&limit=${selectedPageSize}`,
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
    selectedGenderOption,
    selectedProvinceOption,
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

  return !isLoaded ? (
    <div className="loading" />
  ) : (
    <>
      <div className="disable-text-selection">
        <ListPageHeading
          heading="د استاد لست/ لست استادان"
          // Using display mode we can change the display of the list.
          displayMode={displayMode}
          changeDisplayMode={setDisplayMode}
          handleChangeSelectAll={handleChangeSelectAll}
          // following code is used for order the list based on different element of the prod
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
          selectLevelOfEducationOption={selectLevelOfEducationOption}
          genderOptionsForList={genderOptionsForList}
          provincesOptionsForList={provincesOptionsForList}
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
          // Level of Education
          changeLevelOfEducationBy={(column) => {
            setSelectLevelOfEducationOption(
              levelOfEdcationForList.find((x) => x.column === column)
            );
          }}
          levelOfEdcationForList={levelOfEdcationForList}
          onResetClick={setRest}
          reset={rest}
          pageSizes={pageSizes}
          toggleModal={() => setModalOpen(!modalOpen)}
          institutes={institutes}
          onInstituteSelect={setInstitute}
        />
        <table className="table">
          <thead
            style={{ maxHeight: '55px ' }}
            className="pl-2 d-flex flex-grow-1  table-dark"
          >
            <tr className="card-body align-self-center d-flex flex-lg-row align-items-lg-center">
              <th
                className=""
                style={{
                  width: '110px',
                  paddingInline: '0%',
                  textAlign: 'right',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="marks.No" />
              </th>
              <th
                className="header-responsiveness"
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="forms.StdName" />
              </th>
              <th
                className="header-responsiveness"
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="forms.StdFatherName" />
              </th>
              <th
                className="header-responsiveness1 "
                style={{
                  width: '110px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="teacher.GradeLabel" />
              </th>
              <th
                className="header-responsiveness2 "
                style={{
                  width: '110px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="teacher.Step" />
              </th>
              <th
                className="header-responsiveness3 "
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                {' '}
                <IntlMessages id="teacher.LevelOfEducationList" />
              </th>
              <th
                className="header-responsiveness4 "
                style={{
                  width: '170px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="teacher-list.MajorLabel" />
              </th>
              <th
                className="header-responsiveness4 "
                style={{
                  width: '100px',
                  paddingInline: '0%',
                  borderStyle: 'hidden',
                  fontSize: '20px',
                }}
              >
                <IntlMessages id="teacher.status" />
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
