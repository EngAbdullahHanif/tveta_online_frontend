import React from 'react';
import { Card, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const PromotionDemotionListBody = ({
  promotionDemotion,
  isSelect,
  collect,
  onCheckItem,
}) => {
  return (
    <Colxx xxs="12" key={promotionDemotion.id} className="mb-3">
      <ContextMenuTrigger
        id="menu_id"
        data={promotionDemotion.id}
        collect={collect}
      >
        <Card
          onClick={(event) => onCheckItem(event, promotionDemotion.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink
                to={`promotionDemotion/${promotionDemotion.id}`}
                className=""
              >
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">{promotionDemotion.id}</span>
                  {promotionDemotion.teacher_id.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">
                {promotionDemotion.institute_id.name}
              </p>

              {promotionDemotion.type === '1' ? (
                <div className="mb-1 text-small">
                  <Badge color="primary" pill>
                    مکافات
                  </Badge>
                </div>
              ) : (
                <div className="mb-1 text-small">
                  <Badge color="secondary" pill>
                    مجازات
                  </Badge>
                </div>
              )}
            </div>
            {/* <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
              <CustomInput
                className="item-check mb-0"
                type="checkbox"
                id={`check_${teacher.id}`}
                checked={isSelect}
                onChange={() => {}}
                label=""
              />
            </div> */}
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(PromotionDemotionListBody);
