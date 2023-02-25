import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddOrg from './AddOrg'


function Index() {
  return (
    <React.Fragment>
        <Routes>
        <Route path='/addOrg' element={<AddOrg />}/>
        </Routes>
    </React.Fragment>
  )
}

export default Index