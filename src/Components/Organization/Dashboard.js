import "../../Styles/dashboard.css";
import { useState } from "react";
import { MdMessage } from "react-icons/md";
import Card from "./DashboardComponents/Card";
import { useSelector } from "react-redux";
import ResponsePanel from "./DashboardComponents/ResponsePanel";
import styled from "styled-components";

import { BsFillReplyAllFill } from "react-icons/bs";
import MessageAccordion from "./DashboardComponents/MessageAccordion";
import OrgHeader from "../../Sub-Components/OrgHeader";
function Dashboard() {
  const org_detail = useSelector((state) => state.user.details);
  const responseStatus = useSelector((state) => state.response.status);
  const allMessage = useSelector((state) => state.message.fetchMessages.data);
  const respondedMsg = allMessage?.filter((msg)=>msg.respond === true)
  return (
    <>
      <div className="dashboard_component">
        <OrgHeader page={'Dashboard'}/>
        <sub className={`fw-light fs-6`}>
            Category- <b className={`text-danger`}>
              {
                org_detail?.category?.length?
                org_detail?.category.map((cat, index)=>{
                  return <span key={index}> | {cat}</span>
                }): "Category"
              }
            </b>
          </sub>
        <div className="row">
          <div className="col-lg-4">
              <Card 
                icon={<MdMessage size={60} color="blue" />}
                name={"Messages"}
                quality={allMessage?.length}
              />
          </div> 
          <div className="col-lg-4">
              <Card
                  icon={<BsFillReplyAllFill size={60} color="red" />}
                  name={"Alert Attended To"}
                  quality={respondedMsg?.length}
              />
          </div>
          <div className="col-sm-12 ms-auto">
            <Dialog className="card">
                <h3 className="card-header text-center bg-white">Non-Responded Alerts On 
                {
                  org_detail?.category?.length?
                org_detail?.category.map((cat, index)=>{
                  return <span key={index}> | {cat}</span>
                }) : "Category"
              }
              </h3>
                <MessageAccordion />
              </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
const Dialog = styled.div`
  height: 80vh;
  .alert-messages-container{
    overflow-y: auto;
    padding: 3vh 2vh;
    transition: 0.5s;
    &::-webkit-scrollbar{
      width: 3px;
      background-color: rgb(169, 157, 157);
      box-shadow: inset 0px 4px 4px;
      border-radius: 15px;
      &-thumb{
        background-color: rgb(228, 226, 226);
        width: 0.5px !important;
        border-radius: 15px;
      }
  }
  }
`;
