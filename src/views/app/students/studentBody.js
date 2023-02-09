import React from "react";

const StudentBody = ({students}) => {

   
    return (
        <div>
            {students.map((student) => {
            return student.gender === 'male' ? (<h2>{student.Id + " "}{"Mr. " + student.name + " "}{student.fatherName + " "}{student.gender} </h2>) :
            <h5>{student.Id + " "}{"Mrs. " + student.name + " "}{student.fatherName + " "}{student.gender} </h5> 
  
             })}
        </div>
    )
}

export default StudentBody;