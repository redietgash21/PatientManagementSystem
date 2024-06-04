





import React, { memo, useEffect, useState } from 'react'

function SelectHiddenNot({data, setData, hide}) {
     const OfficeNumbers= ['OPD1','OPD2',' OPD3','OPD4','OPD5','OPD6','OPD7'];
     const [display, setDisplay]=useState([]);

   

  useEffect(()=>{

  })
  return (
    <>
      <select 
        type='text'
        hidden={hide=="Doctor"?false:true}
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }} >
            {OfficeNumbers.map((OfficeNumber)=>(<option value={OfficeNumber}>{OfficeNumber}</option>))}

      </select>
      
    </>
  )
}
export default memo(SelectHiddenNot);
