





import React, { memo, useEffect, useState } from 'react'

function Select({data, setData}) {
     const jobs= ['Doctor','Record Officer','Casher','Lab Technician','Manager','Pharmacist'];
     const [display, setDisplay]=useState([]);

     const select=()=>{
       if(data==jobs){
        return
       }
     }

  useEffect(()=>{

  })
  return (
    <>
      <select 
        type='text'
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }} >
            {jobs.map((job)=>(<option value={job}>{job}</option>))}

      </select>
      
    </>
  )
}
export default memo(Select);
