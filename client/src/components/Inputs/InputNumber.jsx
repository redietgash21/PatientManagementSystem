






import React, { memo } from 'react'

function InputNumber({data, setData}) {
 
  return (
    <>
      <input 
        type='number'
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }}/>
    </>
  )
}
export default memo (InputNumber);
