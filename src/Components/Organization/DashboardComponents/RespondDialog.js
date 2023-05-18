import {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {ImLocation} from 'react-icons/im'
import {IoTimerOutline} from 'react-icons/io5'
import { FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import { baseUrl } from '../../../URL';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-spinners/BarLoader'
export default function RespondDialog({message}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('')
  const user = useSelector((state=>state.user.details))
  const [isLoading, setIsLoading] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit=async()=>{
    setIsLoading(true)
    axios.post(`${baseUrl}/respond/comment`, {comment, messageId: message._id, responderId: user._id, messageCategory: message.category}).then((result)=>{
        const {message, success} = result.data
        if(success){
          setComment('')
          setOpen(false)
        }
    }).catch((err)=>{
        setResponseMsg(err.message)
    }).finally(()=>{
        setIsLoading(false)
    })
  }

  return (
    <div>
      <Button variant="outlined" className='px-5 py-2 my-2' onClick={handleClickOpen}>
        Respond
        </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reply to this Alert</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <b>Message <FaEnvelope size={'3vh'} color='blue'/>: </b>{message.message.text}
          </DialogContentText>
          <DialogContentText>
            <b>Location <ImLocation size={'3vh'} color='red'/>: </b>{message.location}
          </DialogContentText>
          <DialogContentText>
            <b>Time <IoTimerOutline size={'3vh'} color='blue'/>: </b>{new Date(message.createdAt).toLocaleTimeString()}
          </DialogContentText>
            <div className="col-sm-12 my-2">
              <Loader loading={isLoading} cssOverride={{width: '100%'}} color='blue'/>
                <p className={`alert alert-danger form-control text-center ${!!responseMsg?'': 'd-none'}`}>{responseMsg}</p>
                    <div className="input-grop">
                        <textarea rows="4" cols="5" style={{resize: 'none'}} className='form-control' value={comment} placeholder='Leave your Respond message here' onChange={(e)=>setComment(e.target.value)}></textarea>
                        <button type="submit" className={`btn btn-primary float-end my-2 ${!!comment? '': 'disabled'}`} onClick={()=>handleSubmit()}>Submit</button>
                    </div>
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}