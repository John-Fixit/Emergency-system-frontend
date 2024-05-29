import styled from "styled-components"
function OrgHeader({page}) {
  return (
   <>
        <div className='page_header p-2 col-lg-5 text-light sticky-top' style={{borderRadius: "10px", borderTopRightRadius: "0px", backgroundColor: "red"}}>
            <h3>{page}</h3>
        </div>
   </>
  )
}

export default OrgHeader