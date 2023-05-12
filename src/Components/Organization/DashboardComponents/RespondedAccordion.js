import {useState} from 'react'
import {Typography, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CommentsModal from './CommentsModal';
function RespondedAccordion({respondedMessages, allMessages}) {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
        <div className="my-2 alert-messages-container">
        {allMessages?.filter((msg)=>msg.respond===true).map((message, index) => {
            return (
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                key={index}
                sx={{ m: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "80%",
                      flexShrink: 0,
                    }}
                  >
                    <b>Message: </b>
                    {message.message.text}
                   <div className=''>

                   </div>

                  </Typography>
                 
                </AccordionSummary>
                <AccordionDetails>
                  {/* <Typography>{message.message.text}</Typography>
                  <div
                    className={`${!!message?.message.audio ? "" : "d-none"}`}
                  >
                    <audio src={message?.message.audio} controls />
                  </div>
                  <div
                    className={`${!!message?.message.video ? "" : "d-none"}`}
                  >
                    <video
                      width="270px"
                      height="200px"
                      src={message?.message.video}
                      controls
                    />
                  </div>
                  <Typography>
                    <b>Date: </b>
                    {new Date(message.createdAt).toLocaleTimeString()}
                  </Typography> */}
                    {/* <RespondDialog message={message}/> */}
                    
                    <CommentsModal respondedMsg={respondedMessages} msgId={message._id} msgCategory={message.category}/>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </>
  )
}

export default RespondedAccordion