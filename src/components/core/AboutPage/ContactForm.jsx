import React from 'react'
import { ContactUsForm } from '../../common/ContactUsForm'

export const ContactForm = () => {
  return (
    <div className='flex flex-col mx-auto gap-4 mt-16 justify-center items-center'>
        <h1 className='text-4xl font-semibold text-white'>
        Get in Touch
        </h1>
        <p className='text-richblack-300 font-medium'>  
        We’d love to here for you, Please fill out this form.
        </p>
        <div>
            <ContactUsForm/>
        </div>

    </div>
  )
}
