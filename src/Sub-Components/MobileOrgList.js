import styled from "styled-components";
import { BiPhoneCall } from "react-icons/bi";
import { VscOrganization } from "react-icons/vsc";
import Loader from 'react-spinners/PropagateLoader'
function MobileOrgList({allOrg, isLoading, category}){
 return (
    <>
       <Container className="mobile_size_org_list">
        {
            isLoading?   <div className="mx-auto text-center">
            <Loader cssOverride={{margin: "auto"}} color="blue"/>
          </div>:
          !!category ?
          allOrg?.length?
            allOrg?.map((org, index)=>{
                return (
                    <div className="col-lg-3 col-sm-8 col-md-5 m-1" key={index}>
            <div className="card border-0 shadow-sm gap-3 p-2 h-100 pt-0">
                <p><span className="border-end border-primary border-2 text-danger px-1"><VscOrganization size={20}/></span> : {org?.name}</p>
                <p><span className="border-end border-primary border-2 text-danger px-1"><BiPhoneCall size={20}/></span> : <a href={`tel: +234${org?.mobile}`} >+234{org?.mobile}</a></p>
            </div>
          </div>
                )
            }): (
                <>
                  <marquee >No Organization with that category registered</marquee>
                  </>
            ): ""
        }
        </Container>
    </>
 )
}

export default MobileOrgList;

const Container = styled.div`
display: flex;
width: 100%;
overflow: auto;
transition: 0.5s;
// &:hover::-webkit-scrollbar {
//     transition: 0.5s;
//     height: 5px;
// }
&::-webkit-scrollbar{
    height: 2px;
    &:hover{
        height: 8px;
    }
    background-color:  rgb(228, 226, 226);
    border-radius: 5vh;
    &-thumb{
        background-color: rgb(169, 157, 157);
        width: 0.5px !important;
        border-radius: 15px;
    }
  }
  @media only screen and (min-width: 1040px){
        display: none;
  }
`