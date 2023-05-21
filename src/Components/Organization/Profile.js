import React from 'react'
import ProfileHeader from '../../Sub-Components/ProfileHeader'
import ProfileContent from '../../Sub-Components/ProfileContent'
import OrgHeader from '../../Sub-Components/OrgHeader'

function Profile() {
  return (
    <>
    <OrgHeader page={'Profile'}/>
        <ProfileHeader/>
        <ProfileContent />
    </>
  )
}

export default Profile