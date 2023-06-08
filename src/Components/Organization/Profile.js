import React, { useEffect } from 'react'
import ProfileHeader from '../../Sub-Components/ProfileHeader'
import ProfileContent from '../../Sub-Components/ProfileContent'
import OrgHeader from '../../Sub-Components/OrgHeader'
import { useSelect } from '@mui/base'
import { useSelector } from 'react-redux'

function Profile() {
  const org_detail = useSelector((state)=>state.user.details)
  return (
    <>
        <OrgHeader page={'Profile'}/>
        <ProfileHeader name={org_detail?.name} email={org_detail?.email} profile_photo={"profile_photo" in org_detail && org_detail?.profile_photo}/>
        <ProfileContent org_detail={org_detail}/>
    </>
  )
}

export default Profile