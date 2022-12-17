import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const InstituteListBody = ({ institute, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={institute.id} className="mb-3">
      <ContextMenuTrigger id="menu_id" data={institute.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, institute.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          {/* <NavLink to={`?p=${institute.id}`} className="d-flex">
            <img
              alt={institute.title}
              src={institute.img}
              className="list-thumbnail responsive border-0 card-img-left"
            />
          </NavLink> */}
          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
              <NavLink to={`${institute.id}`} className="">
                <p className="list-item-heading mb-1 truncate">
                  <span className="mr-5">{institute.id}</span>
                  {institute.name}
                </p>
              </NavLink>
              <p className="mb-1 text-small">{institute.province}</p>
              {institute.type === '1' ? (
                <p className="mb-1 text-small">دولتی</p>
              ) : (
                <p className="mb-1 text-small">شخصی</p>
              )}

              {institute.gender === '1' ? (
                <p className="mb-1 text-small">ذکور</p>
              ) : institute.gender === '2' ? (
                <p className="mb-1 text-small">اناث</p>
              ) : (
                <p className="mb-1 text-small">مختلط</p>
              )}
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(InstituteListBody);
