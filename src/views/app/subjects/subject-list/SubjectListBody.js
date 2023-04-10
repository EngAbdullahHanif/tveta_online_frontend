import React from 'react';
import { Card, CustomInput, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import IntlMessages from 'helpers/IntlMessages';
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
              style={{ width: '100%', marginTop: 8, marginRight: '0px' }}
            >
              <NavLink
                to={`subjects/${subject.code}`}
                style={{ width: '8%', marginRight: '-5px', fontSize: '20px' }}
              >
                <p
                  className="list-item-heading mb-1  truncate"
                  style={{ fontSize: '20px' }}
                >
                  {subject.code}
                  checkIntegration
                </p>
              </NavLink>
              <NavLink
                to={`subjects/${subject.code}`}
                style={{ width: '12%', marginRight: 30, fontSize: '20px' }}
              >
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ fontSize: '20px' }}
                >
                  {subject.name}
                </p>
              </NavLink>
              <p
                className="mb-1 text-small"
                style={{
                  width: '18%',
                  textAlign: 'right',
                  marginRight: 55,
                  fontSize: '20px',
                }}
              >
                {subject.english_name}
                checkIntegration
              </p>

              <p
                className="mb-1 text-small"
                style={{
                  width: '6%',
                  textAlign: 'right',
                  marginRight: 40,
                  fontSize: '20px',
                }}
              >
                {subject.sub_credit}
                checkinteg
              </p>
              <p
                className="mb-1 text-small"
                style={{
                  width: '13%',
                  textAlign: 'right',
                  marginRight: 50,
                  fontSize: '20px',
                }}
              >
                {subject.sub_type == 1 ? (
                  <IntlMessages id="subject.coreSubject" />
                ) : (
                  <IntlMessages id="subject.nonCoreSubject" />
                )}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '16%', textAlign: 'right', fontSize: '20px' }}
              >
                {subject.system}
                checkInteg
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
