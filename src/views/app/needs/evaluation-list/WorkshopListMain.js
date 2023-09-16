import React, { useState, useEffect, useContext } from 'react';

import useMousetrap from 'hooks/use-mousetrap';

import callApi from 'helpers/callApi';
import { Field, Formik } from 'formik';
import { FormikReactSelect } from 'containers/form-validations/FormikFields';
import { Table as TB } from 'antd';
import { AuthContext } from 'context/AuthContext';
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const ThumbListPages = ({ match }) => {
  const { institutes } = useContext(AuthContext);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);

  const [isFilter, setIsFilter] = useState(false);

  const columns = [
    {
      title: 'ګڼه/شماره',
      dataIndex: 'sno',
      width: '5%',
    },
    {
      title: 'نمبر اساس',
      dataIndex: 'number',
      width: '5%',
      responsive: ['sm'],
    },
    {
      title: 'عنوان',
      dataIndex: 'title',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'تاریخ شروع',
      dataIndex: 'start_date',
      width: '10%',
    },
    {
      title: 'تاریخ ختم',
      dataIndex: 'end_date',
      width: '10%',
    },
    {
      title: 'موضوع',
      dataIndex: 'topic',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'ادرس',
      dataIndex: 'location',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'توضیحات',
      dataIndex: 'description',
      width: '10%',
      responsive: ['sm'],
    },
    {
      title: 'اپډیټ',
      dataIndex: 'action',
      width: '10%',
      responsive: ['sm'],
    },
  ];
  async function fetchData(params = {}) {
    console.log('PARAMSSSSSSSSSS: ', params);
    setIsLoading(true);
    let endpoint = `workshops/`;
    const params1 = {
      ...params,
      // if filters reseted, goto first page
      page: !isFilter ? tableParams.pagination.current : params.page,
      page_size: tableParams.pagination.pageSize || null,
    };
    try {
      const response = await callApi(endpoint, null, null, params1);
      if (response.data && response.status === 200) {
        console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEE', response.data);
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
  const deleteWorkshop = (id) => {
    callApi(`workshops/${id}`, 'DELETE')
      .then((response) => {
        console.log('Response in Workshop Delete', response.data);
        setModalBasic(false);
        fetchData();
      })
      .catch((err) => {
        console.log('Error in deleting workshop', err);
        setModalBasic(false);
      });
  };
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

  useMousetrap(['ctrl+a', 'command+a'], () => {
    handleChangeSelectAll(false);
  });

  useMousetrap(['ctrl+d', 'command+d'], () => {
    setSelectedItems([]);
    return false;
  });

  return (
    <>
      <div className="disable-text-selection">
        <h1>د د ورکشاپونو لست/ لست ورکشاپ ها</h1>

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
            sno: (tableParams.pagination.current - 1) * 10 + (index + 1),
            number: item.id,
            title: item.title,
            start_date: item.start_date,
            end_date: item.end_date,
            location: item.location,
            topic: item.topic,
            description: item.description,
            action: (
              <div style={{ display: 'flex' }}>
                <div>
                  <NavLink to={`/app/workshops/register/${item.id}`}>
                    <div>
                      <BsPencilSquare
                        color="green"
                        outline
                        style={{ fontSize: '20px' }}
                        id="updateIcon"
                      />
                    </div>
                  </NavLink>
                </div>
                <div className="ml-2">
                  <BsTrashFill
                    id="deleteIcon"
                    color="red"
                    outline
                    onClick={() => setModalBasic(true)}
                    style={{ fontSize: '20px' }}
                  />
                </div>
                <Modal
                  isOpen={modalBasic}
                  toggle={() => setModalBasic(!modalBasic)}
                  style={{ marginTop: '10%' }}
                >
                  <ModalHeader>
                    <IntlMessages id="modal.deletion-message-title" />
                  </ModalHeader>
                  <ModalBody className="text-center">
                    <IntlMessages id="modal.deletion-message-details" />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => setModalBasic(false)}
                      style={{ marginLeft: '55%' }}
                    >
                      نه/ نخیر
                    </Button>
                    <Button
                      color="danger"
                      onClick={() => {
                        deleteWorkshop(item.id);
                      }}
                      style={{ marginLeft: '5%' }}
                    >
                      هو / بلی
                    </Button>{' '}
                  </ModalFooter>
                </Modal>{' '}
              </div>
            ),
          }))}
        />
      </div>
    </>
  );
};

export default ThumbListPages;
