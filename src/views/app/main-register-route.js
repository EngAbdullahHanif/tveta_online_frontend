import { NavLink,useLocation} from 'react-router-dom';
import { useState } from 'react';
import StudentRegister from './students/bio/register';
import TeacherRegister from "./teachers/bio/teacher-register";
const Random = () => {
  const location = useLocation();
  const teacherRegistration = location.state.data
  return (
  <>
 {teacherRegistration ==='TEACHER' ?(
   <NavLink to={'/app/teachers/register'}>
      <div>
        <TeacherRegister />
      </div>
    </NavLink>
  ):(
     <NavLink to={'/app/students/register'}>
      <div>
        <StudentRegister />
      </div>
    </NavLink> 
    )
   } 
    </>)   

}; 

export default Random;
