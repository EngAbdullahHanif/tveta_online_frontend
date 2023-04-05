import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const CurriculumListBody = ({ curriculum, isSelect, collect, onCheckItem }) => {
  console.log('curriculum list body', curriculum);
  return (
    <Colxx xxs="12" key={curriculum.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={curriculum.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, curriculum.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row min-width-zero align-items-lg-center "
              style={{ width: '100%', marginTop: 8 }}
            >
              <NavLink
                to={`curriculums/${curriculum.id}`}
                style={{ width: '10%' }}
              >
                <p className="list-item-heading mb-1 truncate">
                  {curriculum.id}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{
                  width: '16%',
                  textAlign: 'right',
                  marginRight: 55,
                  marginRight: 100,
                }}
              >
                {curriculum.department.name}
              </p>

              <p
                className="mb-1 text-small"
                style={{ width: '18%', textAlign: 'right', marginRight: 40 }}
              >
                {curriculum.subject.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '23%', textAlign: 'right', marginRight: 50 }}
              >
                {curriculum.class_id.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {curriculum.educational_year}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(CurriculumListBody);
