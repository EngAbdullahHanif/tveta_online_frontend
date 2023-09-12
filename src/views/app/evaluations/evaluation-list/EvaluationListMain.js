import React, { useState, useEffect, useContext } from 'react';

import useMousetrap from 'hooks/use-mousetrap';

import callApi from 'helpers/callApi';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Table as TB } from 'antd';
import { AuthContext } from 'context/AuthContext';
const getIndex = (value, arr, prop) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i][prop] === value) {
      return i;
    }
  }
  return -1;
};
const ThumbListPages = ({ match }) => {
  const { institutes } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(20);
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'title',
    label: 'Product Name',
  });
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [lastChecked, setLastChecked] = useState(null);

  const [isFilter, setIsFilter] = useState(false);

  const columns = [
    {
      title: 'نمبر اساس',
      dataIndex: 'number',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'تاریخ نیازسنجی',
      dataIndex: 'date',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'ارزیابی کننده',
      dataIndex: 'evaluator_name',
      width: '10%',
    },
    {
      title: 'انستیتوت',
      dataIndex: 'institute',
      width: '10%',
    },
    {
      title: 'استاد',
      dataIndex: 'teacher',
      width: '15%',
      responsive: ['sm'],
    },
    {
      title: 'سمستر',
      dataIndex: 'semester',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'اعلی',
      dataIndex: 'excellent',
      width: '5%',
    },
    {
      title: 'عالی',
      dataIndex: 'outstanding',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'خوب',
      dataIndex: 'good',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'متوسط',
      dataIndex: 'average',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'ضعیف',
      dataIndex: 'weak',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'موجود نیست',
      dataIndex: 'not_applicable',
      width: '10%',
      responsive: ['sm'],
    },
    // {
    //   title: 'حالت',
    //   dataIndex: 'status',
    //   width: '10%',
    // },
    // {
    //   title: 'اپډیټ',
    //   dataIndex: 'action',
    // },
  ];
  async function fetchData(params = {}) {
    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = `evaluations/nasab/`;
    const params1 = {
      ...params,
      // if filters reseted, goto first page
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };
    try {
      const response = await callApi(endpoint, null, null, params1);
      if (response.data && response.status === 200) {
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE', response.data?.results);
        setItems(response.data?.results);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: response?.data?.count,
          },
        });
      } else {
        console.log('students error');
      }
    } catch (error) {
      console.log('error: ', error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleTableChange = (pagination, filter, sorter) => {
    setIsFilter(false);
    setTableParams({ pagination, filter, ...sorter });
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setItems([]);
    }
  };
  const onFilter = async (values) => {
    console.log('VVVVVVVVVVVVVVVVVVVVVVALUES', values);
    setIsFilter(true);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });
    let params = {
      page: 1,
    };
    params.institute = values.institute?.value;
    params.educational_year = values.educational_year;
    params.teacher = values.filterId || null;
    fetchData(params);
  };
  useEffect(() => {
    fetchData();
  }, [!isFilter ? JSON.stringify(tableParams) : null]);

  const handleResetFields = (resetForm) => {
    resetForm({
      values: { filterId: '', institute: [], educational_year: '' },
    });
    setIsFilter(false);
    fetchData();
  };
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selectedPageSize, selectedOrderOption]);

  // useEffect(() => {
  //   if (selectedFilter.column == 0 && institute == '') {
  //     createNotification('warning', 'filled');
  //   }

  //   async function fetchData() {
  //     axios
  //       .get(
  //         `${evaluationApiUrl}?evaluated=${selectedFilter.column}&evaluation_year=${evaluationYear}&institute_id=${institute.id}`,
  //       )

  //       .then((res) => {
  //         console.log(
  //           `${evaluationApiUrl}?evaluated=${selectedFilter.column}&evaluation_year=${evaluationYear}&institute_id=${institute.id}`,
  //         );
  //         return res.data;
  //       })
  //       .then((data) => {
  //         setItems(data);
  //         setSelectedItems([]);
  //         setTotalItemCount(data.totalItem);
  //         setIsLoaded(true);
  //       });
  //   }
  //   fetchData();
  // }, [
  //   selectedPageSize,
  //   currentPage,
  //   selectedOrderOption,
  //   search,
  //   startDate,
  //   endDate,
  //   selectedFilter,
  //   evaluationYear,
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

  return (
    <>
      <div className="disable-text-selection">
        <h1>د د نیازسنجیو لست/ لست نیازسنجی ها</h1>
        {/* <ListPageHeading
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
        </table> */}
        <div
          style={{
            padding: 10,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Formik
            initialValues={{
              filterId: '',
              institute: [],
            }}
            onSubmit={onFilter}
          >
            {({
              values,
              setFieldValue,
              handleSubmit,
              setFieldTouched,
              resetForm,
            }) => (
              <>
                <Field
                  className="form-control fieldStyle"
                  name="filterId"
                  placeholder="استاد ایدی"
                />
                {/* <Field name="teacher" placeholder="استاد" /> */}
                <Field
                  className="form-control fieldStyle"
                  name="educational_year"
                  placeholder="تعلیمی کال"
                  type="number"
                  min="1370"
                  max="1450"
                />
                <FormikReactSelect
                  className="w-100"
                  placeholder="انستیتوت"
                  name="institute"
                  options={institutes}
                  value={values.institute}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                />

                <button className="btn btn-secondary" onClick={handleSubmit}>
                  فلټر
                </button>

                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleResetFields(resetForm)}
                >
                  ریسیټ
                </button>
              </>
            )}
          </Formik>
        </div>
        <TB
          style={{ fontSize: 20 }}
          size="large"
          columns={columns}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          loading={isLoading}
          dataSource={items?.map((item, index) => ({
            key: index + 1,
            number: item.id,
            institute: institutes.find((op) => op.value === item.institute)
              ?.label,
            teacher: item.teacher.name,
            date: item.date,
            semester: item.semester,
            evaluator_name: item.evaluator_name,
            excellent: item.excellent,
            outstanding: item.outstanding,
            good: item.good,
            average: item.average,
            weak: item.weak,
            not_applicable: item.not_applicable,
          }))}
        />
      </div>
    </>
  );
};

export default ThumbListPages;
