





import React,{memo} from 'react'

 function Label(props) {
  return (
    <>
     <label htmlFor="">
        {props.text}
     </label>
    </>
  )
}

export default memo(Label)
