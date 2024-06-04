






import React, { memo } from 'react'

function InputNumberRequired({data, setData}) {
 
  return (
    <>
      <input 
        type='number'
        required
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }}/>
    </>
  )
}
export default memo (InputNumberRequired);
