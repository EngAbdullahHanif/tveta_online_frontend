import React, { useState } from 'react';
import {
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import Pagination from '../../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../../containers/pages/ContextMenuContainer';
import DataListView from '../../../../../containers/pages/DataListView';
import ImageListView from '../../../../../containers/pages/ImageListView';
import KankorStudentListBody from './KankorStudentListBody';

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
  roughData
}) => {
  const [modalBasic, setModalBasic] = useState(true);

  return (
    <>
      <Row>
        {roughData.length === 0 ? (
          <div className="no-result">
            <h5>هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {roughData.map((student) => {
          if (displayMode === 'imagelist') {
            return (
              <ImageListView
                key={student.kankorId}
                student={student}
                isSelect={selectedItems.includes(student.kankorId)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            return (
              <KankorStudentListBody
                key={student.kankorId}
                student={student}
                isSelect={selectedItems.includes(student.kankorId)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          return (
            <DataListView
              key={student.kankorId}
              student={student}
              isSelect={selectedItems.includes(student.kankorId)}
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
