import React, { useState, useEffect, useContext } from 'react';
import { Card } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import callApi from 'helpers/callApi';
import { useParams } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';
import NeedsList from './NeedsList';
import PublicServiceList from './PublicServiceList';

const EvaluationListing = () => {
  const { provinces } = useContext(AuthContext);
  const { type } = useParams();
  const [isFilter, setIsFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns = [
    {
      title: 'اساس نمبر',
      dataIndex: 'student_id',
      sorter: (a, b) => a.student_id - b.student_id,
      width: '5%',
    },
    {
      title: 'نوم/نام',
      dataIndex: 'name',
      sorter: (a, b) => a.name - b.name,
      width: '15%',
    },
    {
      title: 'د پلار نوم',
      dataIndex: 'father_name',
      width: '15%',
    },
    {
      title: 'جنسیت',
      dataIndex: 'gender',
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
      width: '12%',
    },
    {
      title: 'بست',
      dataIndex: 'grade',
      width: '15%',
    },
    {
      title: 'حالت',
      dataIndex: 'status',
      width: '5%',
    },
  ];

  useEffect(() => {
    fetchData();
  }, [!isFilter ? JSON.stringify(tableParams) : null, type]);

  async function fetchData(params = {}) {
    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = `institute/`;
    const params1 = {
      ...params,
      // if filters reseted, goto first page
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };
    if (type === 'teaching_proccess') {
      endpoint = 'evaluations/teaching-process/';
    } else if (type === 'needs') {
      endpoint = 'evaluations/nasab/';
    } else {
      endpoint = 'evaluations/public-service/';
    }
    const response = await callApi(endpoint, '', 'GET', params1);
    setIsLoading(false);
    if (response.data && response.status === 200) {
      console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN', response?.data.results);
      setItems(response?.data.results);
      setSelectedItems([]);
      // setTotalItemCount(data);
      setIsLoaded(true);
    } else {
      console.log('students error');
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

    params.current_province = values.filterProvince?.value;
    params.gender = values.filterGender?.value;
    params.status = values.filterStatus?.value;
    params.id = values.filterId || null;
    fetchData(params);
  };
  const handleResetFields = (resetForm) => {
    resetForm({
      values: {
        filterId: '',
        filterInstitute: [],
        filterProvince: [],
        filterGender: [],
      },
    });
    setIsFilter(false);
    fetchData();
  };

  const [isNext, setIsNext] = useState(false);
  return (
    <>
      <Card>
        <h3 className="mt-5 m-5">
          {<IntlMessages id="teacher.EvalautionTitle" />}
        </h3>
        {type === 'needs' || type === 'teaching_proccess' ? (
          <NeedsList
            onFilter={onFilter}
            handleResetFields={handleResetFields}
            handleTableChange={handleTableChange}
            data={items}
            isLoading={isLoading}
            teacherLink={`${type}/`}
          />
        ) : type === 'public_service' ? (
          <PublicServiceList
            onFilter={onFilter}
            handleResetFields={handleResetFields}
            handleTableChange={handleTableChange}
            data={items}
            isLoading={isLoading}
            teacherLink={`${type}/`}
          />
        ) : null}
      </Card>
    </>
  );
};
export default EvaluationListing;
