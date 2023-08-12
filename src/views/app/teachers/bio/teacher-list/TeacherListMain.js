import React, { useState, useEffect } from 'react';

import { Table as TB, Input, Popconfirm, Button } from 'antd';
import IntlMessages from 'helpers/IntlMessages';
import './list.css';
import callApi from 'helpers/callApi';
import {
  gradeOptions,
  provincesOptionsForList,
  teacherCurrentStatusOptions,
} from '../../../global-data/options';
import { levelOfEdcationForList } from '../../../global-data/options';
import { genderOptionsForList } from '../../../global-data/options';
import ListPageHeading from 'views/app/teachers/bio/teacher-list/TeacherListHeading';
import ListPageListing from 'views/app/teachers/bio/teacher-list/TeacherListCatagory';
import useMousetrap from 'hooks/use-mousetrap';
import { Badge } from 'reactstrap';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};

import { NavLink } from 'react-router-dom';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import PromptInput from 'components/prompInput';

const pageSizes = [4, 8, 12, 20];

const ThumbListPages = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
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

  const columns = [
    {
      title: (
        <PromptInput title="اساس نمبر" colName="gender" endpoint="teachers" />
      ),
      dataIndex: 'student_id',
      // sorter: (a, b) => a.student_id - b.student_id,
      width: '5%',
    },
    {
      title: 'نوم/نام',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
      // render: (name) => `${name.first} ${name.last}`,
      width: '15%',
    },
    {
      title: 'جنسیت',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' },
      ],
      filterSearch: true,
      onFilter: (value, record) => {
        record.gender.indexOf(value) === 0;
      },
      width: '10%',
    },
    {
      title: 'د پلار نوم',
      dataIndex: 'father_name',
      width: '10%',
    },
    {
      title: 'ولایت',
      dataIndex: 'province',
      width: '10%',
    },
    {
      title: 'تلفون شمیره',
      dataIndex: 'phone_number',
      width: '10%',
    },
    {
      title: 'بست',
      dataIndex: 'grade',
      width: '20%',
    },
    {
      title: 'حالت',
      dataIndex: 'status',
    },
    {
      title: 'اپډیټ',
      dataIndex: 'action',
    },
  ];
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
        {/* <table className="table">
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
        </table> */}

        <TB
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          pagination={tableParams.pagination}
          loading={loading}
          // onChange={handleTableChange}
          dataSource={items.map((item, index) => ({
            key: index,
            student_id: item.id,
            name: item.name,
            gender: item.gender,
            father_name: item.father_name,
            province: item.place_of_birth,
            phone_number: item.phone_number,
            status: teacherCurrentStatusOptions.map((status) => {
              if (status.value == item.status) {
                return (
                  <div
                    className="mb-1 text-small"
                    style={{ fontSize: '20px', width: '10%' }}
                  >
                    <Badge
                      color={
                        status.value == 'dismissed'
                          ? 'danger'
                          : status.value == 'inprogress' ||
                            status.value == 'active'
                          ? 'success'
                          : status.value == 'freeze'
                          ? 'secondary'
                          : 'warning'
                      }
                      pill
                    >
                      {status.label}
                    </Badge>
                  </div>
                );
              }
            }),
            grade: gradeOptions.map((g) => {
              if (g.value === item.grade)
                return <IntlMessages id={g.label.props.id} />;
            }),

            action: (
              <NavLink
                to={`/app/teachers/register/${item.id}`}
                // style={{ width: '10%' }}
              >
                <div>
                  <BsPencilSquare
                    color="green"
                    outline
                    style={{ fontSize: '20px' }}
                    id="updateIcon"
                  />
                </div>
              </NavLink>
            ),
          }))}
        />
      </div>
    </>
  );
};

export default ThumbListPages;
