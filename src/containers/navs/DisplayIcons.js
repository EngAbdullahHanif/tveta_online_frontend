import React from 'react';

import * as MD from 'react-icons/md';
import * as CG from 'react-icons/cg';
import * as GR from 'react-icons/gr';
import * as IM from 'react-icons/im';
import * as FA from 'react-icons/fa';
import * as BI from 'react-icons/bi';
import * as RI from 'react-icons/ri';
import * as IO from 'react-icons/io5';
import * as SI from 'react-icons/si';
import * as BS from 'react-icons/bs';

{
  /* THIS FUNCTION IS MATCH THE CORRECT COMPONENTS FOR THE ICON AND RETURN IT*/
}
const Icons = (icon, size) => {
  switch (icon) {
    case 'FA.FaChalkboardTeacher':
      return <FA.FaChalkboardTeacher size={size} />;
    case 'CG.CgUserList':
      return <CG.CgUserList size={size} />;
    case 'GR.GrUserAdd':
      return <GR.GrUserAdd size={size} />;
    case 'IM.ImProfile':
      return <IM.ImProfile size={size} />;
    case 'MD.MdOutlineTransferWithinAStation':
      return <MD.MdOutlineTransferWithinAStation size={size} />;
    case 'FA.FaUserGraduate':
      return <FA.FaUserGraduate size={size} />;
    case 'FA.FaUsers':
      return <FA.FaUsers size={size} />;
    case 'FA.FaUniversity':
      return <FA.FaUniversity size={size} />;
    case 'FA.FaLevelUpAlt':
      return <FA.FaLevelUpAlt size={size} />;
    case 'BI.BiMessageAltDetail':
      return <BI.BiMessageAltDetail size={size} />;
    case 'FA.FaHotel':
      return <FA.FaHotel size={size} />;
    case 'RI.RiHotelFill':
      return <RI.RiHotelFill size={size} />;
    case 'IO.IoPersonRemoveSharp':
      return <IO.IoPersonRemoveSharp size={size} />;
    case 'IO.IoBook':
      return <IO.IoBook size={size} />;
    case 'MD.MdDashboard':
      return <MD.MdDashboard size={size} />;
    case 'SI.SiGoogleclassroom':
      return <SI.SiGoogleclassroom size={size} />;
    case 'MD.MdOutlineNoteAlt':
      return <MD.MdOutlineNoteAlt size={size} />;
    case 'BS.BsCardChecklist':
      return <BS.BsCardChecklist size={size} />;
    case 'MD.MdManageAccounts':
      return <MD.MdManageAccounts size={size} />;
    case 'MD.MdAddBox':
      return <MD.MdAddBox size={size} />;
    case 'FA.FaList':
      return <FA.FaList size={size} />;

    default:
      return <div>wrong icons selected</div>;
  }
};
const DisplayIcons = ({ icon, size }) => {
  return <div style={{ color: 'black' }}>{Icons(icon, size)}</div>;
};

export default DisplayIcons;
