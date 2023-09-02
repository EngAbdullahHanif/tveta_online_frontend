import React, { useState } from 'react';
import {
  Card,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import classnames from 'classnames';
import { ContextMenuTrigger } from 'react-contextmenu';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
import callApi from 'helpers/callApi';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { NotificationManager } from 'components/common/react-notifications';

const createNotification = (type, className) => {
  const cName = className || '';
  switch (type) {
    case 'success':
      NotificationManager.success(
        'مضمون په بریالیتوب سره دیلیت شو',
        'موفقیت',
        3000,
        null,
        null,
        cName,
      );
      break;
    case 'error':
      NotificationManager.error(
        'مضمون دیلیت نه شو بیا کوشش وکری',
        'خطا',
        9000,
        () => {
          alert('callback');
        },
        null,
        cName,
      );
      break;
    default:
      NotificationManager.info('Info message');
      break;
  }
};

const SubjectListBody = ({ subject, isSelect, collect, onCheckItem }) => {
  const [modalBasic, setModalBasic] = useState(false);

  console.log('subject list body', subject);
  const handleClick = async (subjectId) => {
    const instituteResponse = await callApi(
      `institute/subject/${subjectId}/`,
      'DELETE',
      null,
    );
    if (instituteResponse.status >= 200 && instituteResponse.status < 300) {
      console.log('succesfully deleted');
      createNotification('success', 'filled');
      // relaoad after 3 seconds to see the changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      console.log('error');
      createNotification('error', 'filled');
    }

    // setDeletion(event);
  };
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
              <p
                className="list-item-heading mb-1  truncate"
                style={{ width: '9%', marginRight: '-5px', fontSize: '20px' }}
              >
                {subject.code}
              </p>
              <p
                className="list-item-heading mb-1 truncate"
                style={{ width: '14%', marginRight: 30, fontSize: '20px' }}
              >
                {subject.name}
              </p>
              <p
                className="mb-1 text-small"
                style={{
                  width: '20%',
                  textAlign: 'right',
                  marginRight: 55,
                  fontSize: '20px',
                }}
              >
                {subject.english_name}
              </p>

              <p
                className="mb-1 text-small"
                style={{
                  width: '7%',
                  textAlign: 'right',
                  marginRight: 40,
                  fontSize: '20px',
                }}
              >
                {subject.credit}
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
                {subject.type == 'general'
                  ? 'عمومی'
                  : subject.type == 'supporting'
                  ? 'فرعی'
                  : subject.type == 'core'
                  ? 'اصلی'
                  : subject.type == 'specialized'
                  ? 'مسلکی'
                  : subject.type == 'practical'
                  ? 'عملی'
                  : 'اختیاری'}
              </p>
              <p
                className="mb-1 text-small"
                style={{ width: '16%', textAlign: 'right', fontSize: '20px' }}
              >
                {subject.system_type == 'general'
                  ? 'عمومی'
                  : subject.system_type == 'giz'
                  ? 'GiZ'
                  : subject.system_type == 'nima'
                  ? 'نیما'
                  : 'تعلیمات خاص'}
              </p>
            </div>
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <div>
                  <BsPencilSquare
                    outline
                    style={{ fontSize: '20px' }}
                    id="updateIcon"
                  />
                </div>
                <div className="ml-2">
                  <BsTrashFill
                    id="deleteIcon"
                    outline
                    onClick={() => setModalBasic(true)}
                    style={{ fontSize: '20px' }}
                  />
                </div>
              </div>
              <Modal
                isOpen={modalBasic}
                toggle={() => setModalBasic(!modalBasic)}
                style={{ marginTop: '10%' }}
              >
                <ModalHeader>
                  <IntlMessages id="modal.deletion-message-title" />
                </ModalHeader>
                <ModalBody className="text-center">
                  <IntlMessages id="modal.deletion-message-details" />
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => setModalBasic(false)}
                    style={{ marginLeft: '55%' }}
                  >
                    نه/ نخیر
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => {
                      handleClick(`${subject.id}`);
                    }}
                    style={{ marginLeft: '5%' }}
                  >
                    هو / بلی
                  </Button>{' '}
                </ModalFooter>
              </Modal>{' '}
            </>
          </div>
        </Card>
      </ContextMenuTrigger>
    </Colxx>
  );
};

/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
export default React.memo(SubjectListBody);
