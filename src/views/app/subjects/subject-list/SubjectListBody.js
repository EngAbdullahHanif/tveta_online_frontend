import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';

const SubjectListBody = ({ subject, isSelect, collect, onCheckItem }) => {
  console.log('subject list body', subject);
  return (
    <Colxx xxs="12" key={subject.subjectCode} className="mt-2">
      <ContextMenuTrigger
        id="menu_id"
        data={subject.subjectCode}
        collect={collect}
      >
        <Card
          onClick={(event) => onCheckItem(event, subject.subjectCode)}
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
                to={`subjects/${subject.code}`}
                style={{ width: '16%' }}
              >
                <p className="list-item-heading mb-1 truncate">
                  {subject.code}
                </p>
              </NavLink>
              <NavLink
                to={`subjects/${subject.code}`}
                style={{ width: '15%', marginRight: 30 }}
              >
                <p className="list-item-heading mb-1 truncate">
                  {subject.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right', marginRight: 55 }}
              >
                {subject.english_name}
              </p>

              <p
                className="mb-1 text-small"
                style={{ width: '10%', textAlign: 'right', marginRight: 40 }}
              >
                {subject.sub_credit}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right', marginRight: 50 }}
              >
                {subject.sub_type == 1 ? 'اختیاری' ? subject.sub_type == 2 : 'اجباری' ? subject.sub_type == 3 : 'ترمی' ? subject.sub_type == 4 : 'ترمی اختیاری' ? subject.sub_type == 5 : 'ترمی اجباری' ? subject.sub_type == 6 : 'ترمی اختیاری' ? subject.sub_type == 7 : 'ترمی اجباری' ? subject.sub_type == 8 : 'ترمی اختیاری' ? subject.sub_type == 9 : 'ترمی ': 'sld'}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '15%', textAlign: 'right' }}
              >
                {subject.system}
              </p>
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(SubjectListBody);
