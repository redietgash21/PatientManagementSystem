




import React, { memo } from 'react'

function InputTextHidden({data, setData, hide}) {
 
  return (
    <>
      <input 
        type='text'
        hidden={hide=="Doctor"?true:false}
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }}/>
       
    </>
  )
}
export default memo(InputTextHidden);
