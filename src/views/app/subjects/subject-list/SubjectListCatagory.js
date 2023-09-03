import React, { useState } from 'react';
import {
  Row,
} from 'reactstrap';

import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import DataListView from '../../../../containers/pages/DataListView';
import ImageListView from '../../../../containers/pages/ImageListView';
//import TeacherListBody from './TeacherListBody';
//import subjectListBody from 'views/app/subjects/subject-list/SubjectListBody'
import SubjectListBody from './SubjectListBody'
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
  console.log('subject data', items)

  return (
    <>
      <Row>
        {items.length === 0 ? (
          <div className="no-result">
            <h5>هیچ داده ای برای نمایش وجود ندارد</h5>
          </div>
        ) : null}
        {items && items.map((subject) => {
          
          if (displayMode === 'imagelist') {
            
            return (
              <ImageListView
                key={subject.subjectCode}
                subject={subject}
                isSelect={selectedItems.includes(subject.subjectCode)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            console.log('inside map thumblist', subject)
            return (
              <SubjectListBody
                key={subject.subjectCode}
                subject={subject}
                isSelect={selectedItems.includes(subject.subjectCode)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
         
          return (
            
            <DataListView
              key={subject.subjectCode}
              subject={subject}
              isSelect={selectedItems.includes(subject.subjectCode)}
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
