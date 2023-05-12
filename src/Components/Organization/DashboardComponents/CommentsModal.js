import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Loader from 'react-spinners/BarLoader'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../../URL';
export default function CommentsModal({respondedMsg, msgId, msgCategory}) {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');

  const user = useSelector((state=>state.user.details))
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  let thisMessage = respondedMsg.filter((msg)=>msg.messageId===msgId);
  console.log(thisMessage)
  const handleSubmit=async()=>{
    console.log({comment, messageId: msgId, responderId: user._id, messageCategory: msgCategory})
    setIsLoading(true)
    axios.post(`${baseUrl}/respond/comment`, {comment, messageId: msgId, responderId: user._id, messageCategory: msgCategory}).then((result)=>{
        const {message, success} = result.data
        if(success){
            setComment('')
        }
    }).catch((err)=>{
        setResponseMsg(err.message)
    }).finally(()=>{
        setIsLoading(false)
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
        <DialogTitle id="scroll-dialog-title" sx={{minWidth: '30vw'}}>All Comments</DialogTitle>
        <DialogContent dividers={scroll === 'paper'} className=''>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {
                thisMessage.length?
            thisMessage.map((msg, index)=>{
                return (
                    <div className='comment my-3' key={index}>
                <p className='shadow-sm py-2 px-3 rounded'>{msg.comment}</p>
                <small className='float-end'>{new Date(msg.createdAt).toDateString()} | {new Date(msg.createdAt).toLocaleTimeString()}</small>
            </div>
                )
            }):
            <h4>No Comment yet</h4>
            }
            
            <div className="col-sm-12 my-2">
              <Loader loading={isLoading} cssOverride={{width: '100%'}} color='blue'/>
                <p className={`alert alert-danger form-control text-center ${!!responseMsg?'': 'd-none'}`}>{responseMsg}</p>
                    <div className="input-grop">
                        <textarea rows="3" cols="10" style={{resize: 'none'}} className='form-control' value={comment} placeholder='Leave your Respond message here' onChange={(e)=>setComment(e.target.value)}></textarea>
                    </div>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} sx={{color: 'red'}}>Cancel</Button>
          <Button className={`${!!comment? '': 'disabled'}`} onClick={()=>handleSubmit()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}