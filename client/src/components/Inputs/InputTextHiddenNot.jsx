




import React, { memo } from 'react'

function InputTextHiddenNot({data, setData, hide}) {
 
  return (
    <>
      <input 
        type='text'
        hidden={hide=="Doctor"?false:true}
        value={data}
        onChange={(e)=>{setData(e.target.value)
        }}/>
       
    </>
  )
}
export default memo(InputTextHiddenNot);
