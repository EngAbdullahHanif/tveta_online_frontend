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
import CurriculumListBody from './CurriculumListBody'
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
  console.log('curriculum data', roughData)

  return (
    <>
      <Row>
        {roughData.length === 0 ? (
          <div className="no-result">
            <h5>هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {roughData.map((curriculum) => {
          
          if (displayMode === 'imagelist') {
            
            return (
              <ImageListView
                key={curriculum.curriculumId}
                curriculum={curriculum}
                isSelect={selectedItems.includes(curriculum.curriculumId)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            console.log('inside map thumblist', curriculum)
            return (
              <CurriculumListBody
                key={curriculum.curriculumId}
                curriculum={curriculum}
                isSelect={selectedItems.includes(curriculum.curriculumId)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
         
          return (
            
            <DataListView
              key={curriculum.curriculumId}
              curriculum={curriculum}
              isSelect={selectedItems.includes(curriculum.curriculumId)}
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
