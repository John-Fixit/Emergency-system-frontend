import Loader from 'react-spinners/PropagateLoader'
import styled from 'styled-components';
function ListOfOrgs({allOrg, isLoading, category}) {
  return (
    <>
          {
            !!category?
        <div className='col-4 lg_org_contact_list'>
            <div className='card h-100 shadow-sm'>
                <h3 className='card-header text-center'>Agent Contacts</h3>
                {
                  isLoading?   <div className="mx-auto text-center">
                  <Loader cssOverride={{margin: "auto"}} color="blue"/>
                </div>: 
                <ContactList className={`px-2`}>
                  {
                     allOrg?.length ?
                    allOrg?.map((org, index)=>{
                      return (
                        <div className='org-contact shadow-sm px-2 rounded d-flex justify-content-between py-3' key={index}>
                          <p>{org?.name} -</p>
                          <p>
                            <a href={`tel: ${org?.mobile}`}>{org?.mobile}</a>
                          </p>
                        </div>
                      )
                    })
                    :(
                      <>
                      <p className='org-contact p-2'>No Organization with that {category} category registered</p>
                      </>
                    )
                  }
                </ContactList>
                }
            </div>
        </div> : ("")
          }
    </>
  )
}

export default ListOfOrgs;
const ContactList = styled.div`
  height: auto;
  white-space: nowrap;
  .org-contact{
    overflow: auto;
    &::-webkit-scrollbar{
      height: 3px;
      transition: 0.5s;
      background-color: rgb(228, 226, 226);
      border-radius: 5vh;
      &-thumb{
        background-color: rgb(169, 157, 157);
        width: 0.5px !important;
          border-radius: 15px;
      }
    }
    -webkit-animation: scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
  @-webkit-keyframes scale-in-top {
    0% {
      -webkit-transform: scale(0);
              transform: scale(0);
      -webkit-transform-origin: 50% 0%;
              transform-origin: 50% 0%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-transform-origin: 50% 0%;
              transform-origin: 50% 0%;
      opacity: 1;
    }
  }
  @keyframes scale-in-top {
    0% {
      -webkit-transform: scale(0);
              transform: scale(0);
      -webkit-transform-origin: 50% 0%;
              transform-origin: 50% 0%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
              transform: scale(1);
      -webkit-transform-origin: 50% 0%;
              transform-origin: 50% 0%;
      opacity: 1;
    }
  }
 
`