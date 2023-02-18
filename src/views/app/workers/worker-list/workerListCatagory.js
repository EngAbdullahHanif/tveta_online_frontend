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
import WorkerListBody from 'views/app/workers/worker-list/workerListBody.js'
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
  console.log('inside Catagory', roughData)

  return (
    <>
      <Row>
        {roughData.length === 0 ? (
          <div className="no-result">
            <h5>هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {roughData.map((worker) => {
          
          if (displayMode === 'imagelist') {
            console.log('inside map ImageList', worker)
            return (
              <ImageListView
                key={worker.workerId}
                worker={worker}
                isSelect={selectedItems.includes(worker.workerId)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            console.log('inside map thumblist', worker)
            return (
              <WorkerListBody
                key={worker.workerId}
                worker={worker}
                isSelect={selectedItems.includes(worker.workerId)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
         
          return (
            
            <DataListView
              key={worker.workerId}
              worker={worker}
              isSelect={selectedItems.includes(worker.workerId)}
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
