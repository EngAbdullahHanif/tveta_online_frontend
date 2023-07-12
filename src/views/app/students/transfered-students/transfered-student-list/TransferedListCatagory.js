import React, { useState } from 'react';
import {
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

//import Pagination from '../../../../containers/pages/Pagination';
import Pagination from '../../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../../containers/pages/ContextMenuContainer';
import DataListView from '../../../../../containers/pages/DataListView';
import ImageListView from '../../../../../containers/pages/ImageListView';
import StudentsListBody from './TransferedListBody';

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
            <h5 className="m-3">هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {items.map((transferedStudents, index) => {
          if (displayMode === 'imagelist') {
            return (
              <ImageListView
                key={transferedStudents.id}
                transferedStudents={transferedStudents}
                isSelect={selectedItems.includes(transferedStudents.id)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            return (
              <StudentsListBody
                key={transferedStudents.id}
                transferedStudents={transferedStudents}
                index={index}
                isSelect={selectedItems.includes(transferedStudents.id)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          return (
            <DataListView
              key={transferedStudents.id}
              transferedStudents={transferedStudents}
              isSelect={selectedItems.includes(transferedStudents.id)}
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
    </>
  );
};

export default React.memo(ListPageListing);
