import React from 'react'

function ProfileContent() {
    const infoMenu = [
        {name: 'Mobile', value: '9892982938'},
        {name: 'Category', value: 'Road'},
        {name: 'Description', value: 'Not Available'},
    ]
  return (
    <>
        <div className='col-sm-10 mx-auto'>
            <div className="card p-4 my-lg-3 my-2">
                <div className='content'>
                    <h3>Basic Information</h3>
                    {
                        infoMenu.map((item, index)=>{
                            return (
                                <div key={index} className='row my-2'>
                                    <p className='col-2'>{item.name} </p>
                                    <p className='col-3'>{item.value}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='my-lg-5 my-2'>
                    <h3>Address</h3>
                    <p>Isale Ofan Ogbomoso, Kininra after new Era, Ogbomoso, Oyo state, 19209</p>
                </div>

            </div>
        </div>
    </>
  )
}

export default ProfileContent