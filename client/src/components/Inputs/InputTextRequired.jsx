








import React, { memo } from 'react'

function InputTextRequired({data, setData}) {
 
  return (
    <>
      <input 
        type='text'
        required
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }}/>
    </>
  )
}
export default memo(InputTextRequired);
