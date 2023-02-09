import { func, string } from 'prop-types';
import React, { useState, useEffect } from 'react';

import StudentBody from './studentBody';



const studentList = [
  {"name": "Abdullah", "fatherName": "Mohammad", "Id": 1, "gender": 'male'},
  {"name": "Noman", "fatherName": "Ali", "Id": 2, "gender": 'male'},
  {"name": "John", "fatherName": "Wali", "Id": 3, "gender": 'male'},
  {"name": "Ali", "fatherName": "Jabar", "Id": 4, "gender": 'male'},
  {"name": "Fatima", "fatherName": "Shukor", "Id": 5, "gender": 'female'},
  {"name": "Muqadasa", "fatherName": "Raziq", "Id": 6, "gender": 'female'},
  {"name": "Raheemi", "fatherName": "Rasih", "Id": 7, "gender": 'male'},
  {"name": "Zameer", "fatherName": "Mateen", "Id": 8, "gender": 'male'}
]

const StudentTest = ({ match }) => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    setStudent(studentList)
  }, [] 
);


 
  return (
    <div>
      <StudentBody students = {student}/>
    </div>
  )
};

export default StudentTest;
