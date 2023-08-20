import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import { NotificationManager } from 'components/common/react-notifications';

import {
  Card,
  CustomInput,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import IntlMessages from 'helpers/IntlMessages';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Colxx } from 'components/common/CustomBootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilSquare } from 'react-icons/bs';
import { async } from 'q';
import { AuthContext } from 'context/AuthContext';

const createNotification = (type, className) => {
  const cName = className || '';
  switch (type) {
    case 'success':
      NotificationManager.success(
        'انستیتوت په بریالیتوب سره دیلیت شو',
        'موفقیت',
        3000,
        null,
        null,
        cName
      );
      break;
    case 'error':
      NotificationManager.error(
        'انستیتوت دیلیت نه شو بیا کوشش وکری',
        'خطا',
        9000,
        () => {
          alert('callback');
        },
        null,
        cName
      );
      break;
    default:
      NotificationManager.info('Info message');
      break;
  }
};

const InstituteDepartmentListBody = ({
  institute,
  isSelect,
  collect,
  onCheckItem,
  index,
}) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);
  const { institutes, departments } = useContext(AuthContext);

  const handleClick = async (instituteId) => {
    const instituteResponse = await callApi(
      `institute/institute-department/${instituteId}/`,
      'DELETE',
      null
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
    <Colxx xxs="12" key={institute.id} className="mt-2">
      <ContextMenuTrigger id="menu_id" data={institute.id} collect={collect}>
        <Card
          onClick={(event) => onCheckItem(event, institute.id)}
          className={classnames('d-flex flex-row', {
            active: isSelect,
          })}
        >
          <div
            className="pl-2 d-flex flex-grow-1 min-width-zero"
            style={{ maxHeight: '50px', width: '100%' }}
          >
            <div
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              <p
                className="list-item-heading mb-1 truncate"
                style={{ width: '18%', fontSize: '20px' }}
              >
                {index + 1}
              </p>
              <div style={{ width: '18%', fontSize: '20px' }}>
                <p
                  className="list-item-heading mb-1 truncate"
                  style={{ width: '30%', fontSize: '20px' }}
                >
                  {
                    institutes.find(
                      (inst) => inst.value === institute.institute
                    ).label
                  }
                </p>
              </div>
              <p className="mb-1 " style={{ width: '18%', fontSize: '20px' }}>
                {
                  departments.find((dep) => dep.value === institute.department)
                    .label
                }
              </p>
              {institute.is_active === true ? (
                <p className="mb-1 " style={{ width: '18%', fontSize: '20px' }}>
                  {/* <IntlMessages id="dash.institutePublic" /> */}
                  فعال
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '18%', fontSize: '20px' }}>
                  غیر فعال
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
export default React.memo(InstituteDepartmentListBody);
