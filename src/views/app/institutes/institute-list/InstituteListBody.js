import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const InstituteListBody = ({ institute, isSelect, collect, onCheckItem }) => {
  return (
    <Colxx xxs="12" key={institute.id} className="mt-2">
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
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              <div style={{ width: '10%' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p className="list-item-heading mb-1">{institute.id}</p>
                </NavLink>
              </div>
              <div style={{ width: '22%' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p className="list-item-heading mb-1 truncate">
                    {institute.name}
                  </p>
                </NavLink>
              </div>
              <p className="mb-1 text-small" style={{ width: '22%' }}>
                {institute.province}
              </p>
              {institute.type === '1' ? (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  دولتی
                </p>
              ) : (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  شخصی
                </p>
              )}

              {institute.gender === '1' ? (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  ذکور
                </p>
              ) : institute.gender === '2' ? (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  اناث
                </p>
              ) : (
                <p className="mb-1 text-small" style={{ width: '22%' }}>
                  مختلط
                </p>
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
