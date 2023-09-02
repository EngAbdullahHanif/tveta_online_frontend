import React, { useState } from 'react';
import { Row } from 'reactstrap';

import Pagination from '../../../../containers/pages/Pagination';
import ContextMenuContainer from '../../../../containers/pages/ContextMenuContainer';
import DataListView from '../../../../containers/pages/DataListView';
import ImageListView from '../../../../containers/pages/ImageListView';
import PromotionDemotionListBody from './PromotionDemotionListBody';

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
        {items.map((promotionDemotion) => {
          if (displayMode === 'imagelist') {
            return (
              <ImageListView
                key={promotionDemotion.id}
                promotionDemotion={promotionDemotion}
                isSelect={selectedItems.includes(promotionDemotion.id)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          if (displayMode === 'thumblist') {
            return (
              <PromotionDemotionListBody
                key={promotionDemotion.id}
                promotionDemotion={promotionDemotion}
                isSelect={selectedItems.includes(promotionDemotion.id)}
                collect={collect}
                onCheckItem={onCheckItem}
              />
            );
          }
          return (
            <DataListView
              key={promotionDemotion.id}
              promotionDemotion={promotionDemotion}
              isSelect={selectedItems.includes(promotionDemotion.id)}
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
