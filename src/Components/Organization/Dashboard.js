import "../../Styles/dashboard.css";
import { useState } from "react";
import { MdMessage } from "react-icons/md";
// import { FaRoadSpikes } from "react-icons/fa"
import {FaStreetView} from "react-icons/fa";
import {WiEarthquake} from "react-icons/wi";
import {GiKingJuMask, GiSwordman, GiFireBowl} from "react-icons/gi";
import Card from "./DashboardComponents/Card";
import { useSelector } from "react-redux";
import ResponsePanel from "./DashboardComponents/ResponsePanel";
import styled from "styled-components";

import { BsFillReplyAllFill } from "react-icons/bs";
import MessageAccordion from "./DashboardComponents/MessageAccordion";
import OrgHeader from "../../Sub-Components/OrgHeader";
function Dashboard() {
  const iconSize = 45;
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
          {
            org_detail?.category?.length?
            org_detail?.category.map((cat, index)=>{
              return <div className="col-lg-4">
               <Card
                  key={index}
                  icon={cat==='Road Accident'? <FaStreetView size={iconSize} color="red" />: cat==="Robbery"? <GiKingJuMask size={iconSize} color="red" />: cat==="Riot" ? <GiSwordman size={iconSize} color="red" />: cat==="Fire" ? <GiFireBowl size={iconSize} color="red" />: cat==="Natural Disaster" &&<WiEarthquake size={iconSize} color="red" />}
                  name={`${cat} Messages`}
                  quality={allMessage?.filter((msg)=>msg.category===cat)?.length}
                />
          </div>
            })
          :
          (
          <div className="col-lg-4">
            <Card 
              icon={<MdMessage size={60} color="blue" />}
              name={"Messages"}
              quality={allMessage?.length}
            />
          </div>)
          }
          <div className="col-lg-4">
              <Card
                  icon={<BsFillReplyAllFill size={iconSize} color="red" />}
                  name={"Responded Alerts"}
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
      background-color: rgb(228, 226, 226);
      box-shadow: inset 0px 4px 4px;
      border-radius: 15px;
      &-thumb{
        background-color: rgb(169, 157, 157);
        width: 0.5px !important;
        border-radius: 15px;
      }
  }
  }
`;
