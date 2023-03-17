import React from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../URL';
import Navbar from './Navbar';
import useSWR from "swr"

function Messages() {
  const route = useParams("");
  const {cat} = route;
  const {data, error, isLoading} = useSWR(`${baseUrl}/org/${cat}`)

 

  return (
   <React.Fragment>
    <Navbar />
        <div >
            {
              data?.data.allMessage.map((msg, index)=>{
                return <div key={index}>
                  <p>{msg.message.text}</p>
                  </div>
              })
            }
        </div>
   </React.Fragment>
  )
}

export default Messages