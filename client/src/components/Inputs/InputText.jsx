




import React, { memo } from 'react'

function InputText({data, setData}) {
 
  return (
    <>
      <input 
        type='text'
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }}/>
    </>
  )
}
export default memo(InputText);
