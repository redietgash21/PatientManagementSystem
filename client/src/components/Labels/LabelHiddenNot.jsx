





import React,{memo} from 'react'

 function LabelHiddenNot({text, hide}) {
  
  return (
    <>
     <label htmlFor=""  
        hidden={hide=="Doctor"?false:true}
        >
        {text}
     </label>
    </>
  )
}

export default memo(LabelHiddenNot)
