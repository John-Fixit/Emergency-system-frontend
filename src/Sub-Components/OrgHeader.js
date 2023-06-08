import React from 'react'

function OrgHeader({page}) {
  return (
   <>
        <div className='page_header bg-danger p-2 col-lg-4 text-light' style={{borderRadius: "10px", borderTopRightRadius: "0px"}}>
            <h2>{page}</h2>
        </div>
   </>
  )
}

export default OrgHeader