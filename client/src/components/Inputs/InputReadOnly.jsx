






import React, { memo } from 'react'

function InputReadOnly({data, setData}) {
 
  return (
    <>
      <input 
        type='number'
        required
        value={data}
        readOnly
       />
    </>
  )
}
export default memo (InputReadOnly);
