import React, { useState, useEffect } from 'react';
import axios from 'axios';

const servicePath = 'http://localhost:8000';
const studentsApiUrl = `${servicePath}/api/`;

const StudentTest = ({ match }) => {
  const fetchStudents = async () => {
    const response = await axios.get(studentsApiUrl);
    const updatedData = await response.data;
    console.log('updatedData', updatedData);
  };

  return <></>;
};

export default StudentTest;
