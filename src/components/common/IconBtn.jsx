import React from 'react'

const IconBtn = ({
  text,
  onclick,
  children,
  disabled,
  outline=false,
  customClasses,
  type,
}) => {
return (
  <button 
  disabled={disabled}
  onClick={onclick}
  type={type}>
      {
          children ? (
              <div className='flex items-center  gap-3 bg-yellow-25 px-8 py-4 rounded-lg'>
                  <span className='text-richblack-800'>
                      {text}
                  </span>
                  {children}
              </div>
          ) : ( <div className='flex items-center flex-row-reverse gap-3 bg-yellow-25 px-8 py-4 rounded-lg'>
          <span className='text-richblack-800'>
              {text}
          </span></div>)
      }
  </button>
)
}

export default IconBtn 