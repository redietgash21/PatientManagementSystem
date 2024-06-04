





import React,{memo} from 'react'

 function LabelHidden({text, hide}) {
  
  return (
    <>
     <label htmlFor=""  
        hidden={hide=="Doctor"?true:false}
        >
        {text}
     </label>
    </>
  )
}

export default memo(LabelHidden)
