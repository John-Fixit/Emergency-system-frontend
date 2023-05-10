import React, {useState} from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
function MessageAccordion() {
    const allMessage = useSelector((state) => state.message.fetchMessages.data);
    const [expanded, setExpanded] = useState(false);
    const [comment, setComment] = useState('')
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

      const handleSubmit=(message)=>{
        console.log(message)
      }
  return (
    <>
      <div className="my-2 alert-messages-container">
        {allMessage
          ?.slice(-20)
          .reverse()
          .map((message, index) => {
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
                    <b>Location: </b>
                    {message.location}
                  </Typography>
                  <Typography  sx={{
                      width: "20%",
                      flexShrink: 0,
                    }}>
                    <b>Time: </b>
                    {new Date(message.createdAt).toDateString()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <b>Message:</b>
                  <Typography>{message.message.text}</Typography>
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
                  </Typography>
                  <div className="col-lg-4 col-md-8 col-sm-12 my-2">
                    <div className="input-group">
                        <input type="text" name="comment" className="form-control" value={comment} placeholder='Comment here' onChange={(e)=>setComment(e.target.value)}/>
                        <button type="submit" className="btn btn-primary float-end" onClick={()=>handleSubmit(message)}>Submit</button>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </>
  );
}

export default MessageAccordion;
