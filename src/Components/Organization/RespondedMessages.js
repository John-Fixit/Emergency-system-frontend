import React from 'react'
import { baseUrl } from '../../URL'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import Loader from 'react-spinners/PropagateLoader'
import styled from 'styled-components'
import RespondedAccordion from './DashboardComponents/RespondedAccordion'
import { useSelector } from 'react-redux'
function RespondedMessages() {
  const routeParam = useParams()
  const allMessages = useSelector((state) => state.message.fetchMessages.data)
  const {data, error, isLoading} = useSWR(`${baseUrl}/respond/${routeParam.category}`)
  const respondedMessages = data?.data.data

  if(isLoading){
    return<>
       <div className="mx-auto text-center">
          <Loader cssOverride={{margin: "auto"}} color="blue"/>
     </div>
    </>
  }
  return (
   <>
      <Container className={`col-lg-10 mx-auto`}>
          <h2 className='bg-primary text-white rounded p-3 text-center'>Responded Messages</h2>
          <RespondedAccordion respondedMessages={respondedMessages} allMessages={allMessages}/>
      </Container>
   </>
  )
}

export default RespondedMessages
const Container = styled.div`

`