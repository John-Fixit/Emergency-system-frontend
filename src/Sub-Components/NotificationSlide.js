import { Avatar } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import {useSelector} from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import '../Styles/notificationSlide.css'
function NotificationSlide() {
    const newMessages = useSelector(state=>state.newMessage.newMessages)
  return (
   <>
        <div className="offcanvas offcanvas-end p-2" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Messages Notification</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {
                    newMessages.length >0?
                    newMessages.map((message, index)=>{
                        return (
                            <div className='card messageCard my-2'>
                                <p className="card-header"></p>
                                <div className="d-flex p-2">
                                    <Avatar sx={{bgcolor: pink[500]}}>
                                        <MedicalServicesIcon />
                                    </Avatar>
                                        <div className='px-2' >
                                            <b className='card-title'>Location: {message.location}</b>
                                            <p>{message.text}</p>
                                    </div>
                                    <p>
                                        <FaTimes fontWeight={100}/>
                                    </p>
                                </div>
                                <p className="card-footer "></p>
                        </div>
                        )
                    }): <h4>No New Messages</h4>
                }
            </div>
        </div>
   </>
  )
}

export default NotificationSlide