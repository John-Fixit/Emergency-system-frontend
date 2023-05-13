import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from 'react-spinners/BarLoader'
import { useSelector } from 'react-redux';
import axios from 'axios';
import useSWR from 'swr'
import { baseUrl } from '../../../URL';
import PreLoader from 'react-spinners/PropagateLoader'
import TimeAgo from 'react-timeago';
export default function CommentsModal({respondedMsg, msgId, msgCategory}) {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [comment, setComment] = useState('')
  const [isSending, setIsSending] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');
  const descriptionElementRef = useRef(null);
  const comments = useRef(null)
  const user = useSelector((state=>state.user.details))
  const {data, error, isLoading, mutate} = useSWR(`${baseUrl}/respond/comment/${msgId}`);

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  
  comments.current = data?.data.comments
  if(isLoading){
      return <>
        <div className="mx-auto text-center">
          <PreLoader cssOverride={{margin: "auto"}} color="blue"/>
     </div>
    </>
  }
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit=async()=>{
    setIsSending(true)
    axios.post(`${baseUrl}/respond/comment`, {comment, messageId: msgId, responderId: user._id, messageCategory: msgCategory}).then((result)=>{
        const {message, success} = result.data
        if(success){
            setComment('')
            mutate();
        }
    }).catch((err)=>{
        setResponseMsg(err.message)
    }).finally(()=>{
        setIsSending(false)
    })
  }
  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Show Comments</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
      >
        <DialogTitle id="scroll-dialog-title" sx={{minWidth: '35vw'}}>All Comments</DialogTitle>
        <DialogContent dividers={scroll === 'paper'} className='shadow-sm'>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {
                comments.current?.length?
            comments.current.map((msg, index)=>{
                return (
                    <div className='comment my-4 text-end' key={index}>
                        <p className='shadow-sm py-2 px-3 rounded text-dark'>{msg.comment}</p>
                        <small className='float-end'>
                        <TimeAgo date={msg.createdAt}/>
                        </small>
                    </div>
                )
            }):
            <h4>No Comment yet</h4>
            }
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{display: 'flex', flexDirection: 'column',}}>
            <div className="col-sm-12 my-2">
              <Loader loading={isSending} cssOverride={{width: '100%'}} color='blue'/>
                <p className={`alert alert-danger form-control text-center ${!!responseMsg?'': 'd-none'}`}>{responseMsg}</p>
                    <div className="input-grop">
                        <textarea rows="3" cols="70" style={{resize: 'none'}} className='form-control' value={comment} placeholder='Leave your Respond here' onChange={(e)=>setComment(e.target.value)}></textarea>
                    </div>
            </div>
            <div className='ms-auto'>
                <Button onClick={handleClose} sx={{color: 'red'}}>Cancel</Button>
                {
                    !!comment?
                    <Button onClick={()=>handleSubmit()}>Submit</Button>:
                    <Button disabled onClick={()=>handleSubmit()}>Submit</Button>
                }
            </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}