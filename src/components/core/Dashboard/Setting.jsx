import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChangeProfile from './Setting/ChangeProfile'
import EditProfile from './Setting/EditProfile'
import UpdatePassword from './Setting/UpdatePassword'
import DeleteAccount from './Setting/DeleteAccount'

const Setting = () => {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
  return (
    <div className='w-full'>
    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
      Edit Profile
    </h1>  

     
     <ChangeProfile/>

     <EditProfile/>

     <UpdatePassword/>
     <DeleteAccount/>

    </div>
  )
}

export default Setting