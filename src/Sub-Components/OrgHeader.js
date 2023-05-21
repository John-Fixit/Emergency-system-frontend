import React from 'react'

function OrgHeader({page}) {
  return (
   <>
        <div className='page_header bg-danger p-2 w-25 text-light'>
            <h2>{page}</h2>
        </div>
   </>
  )
}

export default OrgHeader