/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Row,
  Card,
  CardBody,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Pagination from 'containers/pages/Pagination';
import { servicePath } from 'constants/defaultValues';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Separator, Colxx } from 'components/common/CustomBootstrap';

const apiUrl = `${servicePath}/cakes/paging`;

const Search = ({ match }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword] = useState('Cake');
  const [pageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modalBasic, setModalBasic] = useState(true);

  useEffect(() => {
    async function fetchData() {
      axios
        .get(
          `${apiUrl}?pageSize=${pageSize}&currentPage=${currentPage}&search=${keyword}`
        )
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setItems(data.data);
          setTotalPage(data.totalPage);
          setIsLoading(false);
        });
    }
    fetchData();
  }, [pageSize, currentPage, keyword]);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.search" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card>
            <CardBody>
              {!isLoading ? (
                items.map((item, i) => {
                  return (
                    <div
                      key={`item_${i}`}
                      className={`${items.length !== i + 1 ? 'mb-3' : ''}`}
                    >
                      <NavLink to={`#${item.id}`} className="w-40 w-sm-100">
                        <p className="list-item-heading mb-1 color-theme-1">
                          {item.title}
                        </p>
                        <p className="mb-1 text-muted text-small">
                          Products | {item.category}
                        </p>
                        <p className="mb-4 text-small">{item.description}</p>
                      </NavLink>
                      {items.length !== i + 1 && <Separator />}
                    </div>
                  );
                })
              ) : (
                <div className="loading" />
              )}
            </CardBody>
          </Card>
        </Colxx>
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i) => setCurrentPage(i)}
        />
      </Row>
      {/* مودال اطلاعه به کاربر */}
      <Modal
        isOpen={modalBasic}
        toggle={() => setModalBasic(!modalBasic)}
      >
        <ModalHeader>
          یک پیام از طرف طراح محصول (فاطمه کاظمی) :
        </ModalHeader>
        <ModalBody>
          کاربر عزیزی که الان این صفحه رو باز کردی
          <br />
          شاید برات سوال باشه که چرا این صفحه انگلیسیه. خب باید بگم داده های این صفحه کاملا داره از وب سرویس خونده میشه و من هیچ دخالتی در ویرایش داده ها ندارم
          <br />
          میتونم اونو برات بصورت استاتیک و فارسی بزارم ولی دیگه برات این صفحه کاربردی نداره چون اصل استفاده ی این صفحه نمونه ی وب سرویس و فراخوانی داده از اونه
          <br />
          منم بخاطر همین بهش هیچ دست نمیزنم
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => setModalBasic(false)}
          >
            اکی فهمیدم!
          </Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Search;
