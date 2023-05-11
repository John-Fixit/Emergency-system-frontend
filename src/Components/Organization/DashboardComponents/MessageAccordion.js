import React, {useState} from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from "react-redux";
import RespondDialog from "./RespondDialog";
function MessageAccordion() {
    const allMessage = useSelector((state) => state.message.fetchMessages.data);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
  return (
    <>
      <div className="my-2 alert-messages-container">
        {allMessage
          ?.slice(-20)
          .reverse().filter((msg)=>msg.respond!==true)
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
                    <RespondDialog message={message}/>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </>
  );
}

export default MessageAccordion;
