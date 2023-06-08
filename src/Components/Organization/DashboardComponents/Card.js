
import React from 'react'
import { MdMessage } from 'react-icons/md'
import styled from "styled-components"

function Card({icon, name, quality}) {

  return (
    <>
        <MsgCard className='msg-card rounded w-auto my-2 d-flex gap-2'>
            <div className="card-bod card_icon d-flex gap-3">
                <span className="icon_box border-end border-primary border-2">
                 {icon}
                </span>
                <div className="card_text my-auto">
                  <h4 className="fw-bold fs-2">{quality}</h4>
                  <span>{name}</span>
                </div>
            </div>
        </MsgCard>
   </>
  )
}

export default Card

const MsgCard = styled.div`
        background-color: #fff;

    `