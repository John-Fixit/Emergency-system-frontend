import { Avatar } from '@mui/material'
import React from 'react'
import { FaEnvelope, FaUserAlt } from 'react-icons/fa'

function ProfileHeader({name, email, profile_photo}) {
  return (
    <>
        <div className='col-sm-12'>
            <div className='card py-3 px-lg-5 px-2'>
                <div className='d-flex gap-4'>
                    <div className='org_avatar'>
                        <Avatar ></Avatar>
                    </div>
                    <div className='org_name my-auto'>
                        <h4 className=''>{name?? "Organisation Name"}</h4>
                    </div>
                    <div className='org_email d-flex gap-2 my-auto'>
                        <FaEnvelope size={'3vh'} color='blue'/>:
                        <p>
                            <span className='text-muted'>{email ?? "Organisation email"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileHeader