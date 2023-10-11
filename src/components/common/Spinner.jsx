import React from 'react'

export const Spinner = () => {
  return (
    <div>
      <div className="overlay">
    <div className='flex flex-col items-center justify-center mx-auto mt-40  space-y-10' >
    <div className='spinner '></div>
    <p className='text-lg font-semibold text-white '>Loading......</p>
</div>
</div>
</div>
  )
}