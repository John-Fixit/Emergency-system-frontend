import React from 'react'

function ProfileContent({org_detail}) {
    const infoMenu = [
        {name: 'Mobile', value: org_detail?.mobile ??'9892982938'},
        {name: 'Category', value: org_detail?.category ??'Category'},
        {name: 'Description', value: !!org_detail?.description ? org_detail?.description:  'Not Available'},
        {name: 'Website', value: <a href="">{!!org_detail?.websiteLink ? org_detail?.websiteLink: 'https://yourwebsite'}</a>}
    ]
  return (
    <>
        <div className='col-sm-10 mx-auto'>
            <div className="card p-4 my-lg-3 my-2">
                <div className='content'>
                    <h3 className='border-bottom border-danger'>Basic Information</h3>
                    {
                        infoMenu.map((item, index)=>{
                            return (
                                <div key={index} className='row my-2'>
                                    <p className='col-lg-2 col-sm-6 fw-bold'>{item.name} :</p>
                                    <p className='col-lg-3 col-sm-6'>
                                        <span > {item.value}</span>
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='my-lg-5 my-2'>
                    <h3 className='border-bottom border-danger'>Location / Address</h3>
                    <p>{!!org_detail?.location ? org_detail?.location: "Not Available"}</p>
                </div>

            </div>
        </div>
    </>
  )
}

export default ProfileContent