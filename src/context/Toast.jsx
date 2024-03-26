import React from 'react'
import {Toaster} from "react-hot-toast"

const Toast = ({children}) => {
  return (
    <div>
        {children}
        <Toaster/>
    </div>
  )
}

export default Toast