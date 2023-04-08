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
//import TeacherListBody from './TeacherListBody';
import FieldListBody from './FieldListBody';
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
        {items && items.length === 0 ? (
          <div className="no-result">
            <h5>هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {items &&
          items.map((field) => {
            if (displayMode === 'imagelist') {
              return (
                <ImageListView
                  key={field.id}
                  field={field}
                  isSelect={selectedItems.includes(field.id)}
                  collect={collect}
                  onCheckItem={onCheckItem}
                />
              );
            }
            if (displayMode === 'thumblist') {
              return (
                <FieldListBody
                  key={field.id}
                  field={field}
                  isSelect={selectedItems.includes(field.id)}
                  collect={collect}
                  onCheckItem={onCheckItem}
                />
              );
            }

            return (
              <DataListView
                key={field.id}
                field={field}
                isSelect={selectedItems.includes(field.id)}
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
