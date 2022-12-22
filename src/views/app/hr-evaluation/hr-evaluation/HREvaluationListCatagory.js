import React, { useState } from 'react';
import {
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import DataListView from '../../../../containers/pages/DataListView';
import ImageListView from '../../../../containers/pages/ImageListView';
import HREvaluationListBody from './HREvaluationListBody';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
}) => {
  const [modalBasic, setModalBasic] = useState(true);

  return (
    <>
      <Row>
        {items.length === 0 ? (
          <div className="no-result">
            <h5>هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {items.map((hrEvaluation) => {
          if (displayMode === 'imagelist') {
            return (
              <ImageListView
                key={institute.id}
                institute={institute}
                isSelect={selectedItems.includes(institute.id)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            return (
              <HREvaluationListBody
                key={hrEvaluation.id}
                hrEvaluation={hrEvaluation}
                isSelect={selectedItems.includes(hrEvaluation.id)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          return (
            <DataListView
              key={institute.id}
              institute={institute}
              isSelect={selectedItems.includes(institute.id)}
              onCheckItem={onCheckItem}
              collect={collect}
            />
          );
        })}
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChangePage={(i) => onChangePage(i)}
        />
        <ContextMenuContainer
          onContextMenuClick={onContextMenuClick}
          onContextMenu={onContextMenu}
        />
      </Row>
      {/* مودال اطلاعه به کاربر */}
      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default React.memo(ListPageListing);
