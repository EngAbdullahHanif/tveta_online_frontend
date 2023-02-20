import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const FieldListBody = ({ field, isSelect, collect, onCheckItem }) => {
  console.log('inside body', field)
  return (
    <Colxx xxs="12" key={field.fieldId} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={field.fieldId} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, field.fieldId)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{ width: '100%' }}
            >
              <NavLink to={`fields/${field.fieldId}`} style={{ width: '30%' }}>
                <p className="list-item-heading mb-1 truncate">{field.fieldId}</p>
              </NavLink>
             
              <p
                className="mb-1 text-small"
                style={{ width: '31%', textAlign: 'right' }}
              >
              {field.fieldTitle}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {field.fieldEnglishTitle}
              </p>
             
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(FieldListBody);
