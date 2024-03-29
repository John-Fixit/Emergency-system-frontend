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
        {allMessages?.filter((msg)=>msg.respond===true).reverse().map((message, index) => {
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
                      width: "100%",
                      flexShrink: 0,
                    }}
                  >
                   <span> <b>Message: </b>
                    {message.message.text}</span>
                   <div className=''>
                    <span>
                      <b>Location: </b>
                        {message.location}
                    </span>
                    <span>
                        <b className='mx-3'>Time: </b>
                          {new Date(message.createdAt).toUTCString ()}
                    </span>
                   </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
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