import React, { useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import callApi from 'helpers/callApi';
import { NotificationManager } from 'components/common/react-notifications';

import { AuthContext } from 'context/AuthContext';

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
import { instTypeOptions } from 'views/app/global-data/options';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { localeOptions } from './../../../../constants/defaultValues';

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

const InstituteListBody = ({
  institute,
  isSelect,
  collect,
  onCheckItem,
  index,
  fetchInstitutes,
}) => {
  const [modalBasic, setModalBasic] = useState(false);
  const [dataDeletion, setDeletion] = useState(false);

  const { provinces, districts } = useContext(AuthContext);
  const history = useHistory();
  console.log('provinces from context: ', provinces);

  const handleClick = async (instituteId) => {
    const instituteResponse = await callApi(
      `institute/${instituteId}/`,
      'DELETE',
      null
    );
    if (instituteResponse.status >= 200 && instituteResponse.status < 300) {
      console.log('succesfully deleted');
      createNotification('success', 'filled');
      // relaoad after 3 seconds to see the changes
      fetchInstitutes();
      window.location.reload();
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
              className="py-3 card-body align-self-center d-flex flex-column flex-lg-row  min-width-zero align-items-lg-center"
              style={{ width: '100%' }}
            >
              <div style={{ width: '10%', fontSize: '20px' }}>
                <p
                  className="list-item-heading mb-1 "
                  style={{ fontSize: '20px' }}
                >
                  {index + 1}
                </p>
              </div>
              <div style={{ width: '18%', fontSize: '20px' }}>
                <NavLink to={`institute/${institute.id}`} className="">
                  <p
                    className="list-item-heading mb-1 truncate"
                    style={{ fontSize: '20px' }}
                  >
                    {institute.code}
                  </p>
                </NavLink>
              </div>
              <NavLink to={`institute/${institute.id}`} className="">
                <p className="mb-1 " style={{ fontSize: '20px' }}>
                  {institute.name}
                </p>
              </NavLink>
              <p className="mb-1 " style={{ width: '14%', fontSize: '20px' }}>
                {provinces &&
                  provinces.filter(
                    (province) => province.value === institute.province
                  )[0].label}
              </p>
              <p className="mb-1 " style={{ width: '14%', fontSize: '20px' }}>
                {districts &&
                  districts.filter(
                    (province) => province.value === institute.district
                  )[0].label}
              </p>

              {institute.ownership === 'governmental' ? (
                <p className="mb-1 " style={{ width: '14%', fontSize: '20px' }}>
                  {
                    instTypeOptions.find(
                      (op) => op.value === institute.institute_type
                    ).label
                  }
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '15%', fontSize: '20px' }}>
                  <IntlMessages id="dash.institutePrivate" />
                </p>
              )}

              {institute.gender === 'male' ? (
                <p className="mb-1 " style={{ width: '13%', fontSize: '20px' }}>
                  <IntlMessages id="institute.studentgenderOption_1" />
                </p>
              ) : institute.gender === 'female' ? (
                <p className="mb-1 " style={{ width: '13%', fontSize: '20px' }}>
                  <IntlMessages id="institute.studentgenderOption_2" />
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '13%', fontSize: '20px' }}>
                  <IntlMessages id="institute.studentgenderOption_3" />
                </p>
              )}

              {institute.status === 'active' ? (
                <p className="mb-1 " style={{ width: '15%', fontSize: '20px' }}>
                  <IntlMessages id="institute.statusOption_1" />
                </p>
              ) : (
                <p className="mb-1 " style={{ width: '15%', fontSize: '20px' }}>
                  <IntlMessages id="institute.statusOption_2" />
                </p>
              )}
            </div>
            <>
              <div
                style={{ display: 'flex', flexDirection: 'row' }}
                className="align-self-center pr-4"
              >
                <NavLink to={`/app/institutes/register/${institute.id}`}>
                  <div>
                    <BsPencilSquare
                      outline="true"
                      style={{ fontSize: '20px' }}
                      id="updateIcon"
                    />
                  </div>
                </NavLink>
                <div className="ml-2">
                  <BsTrashFill
                    id="deleteIcon"
                    outline="true"
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
                      setModalBasic(false);
                      handleClick(`${institute.id}`);
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
export default React.memo(InstituteListBody);
