import Loader from 'react-spinners/PropagateLoader'
import styled from 'styled-components';
function ListOfOrgs({allOrg, isLoading}) {
  console.log(allOrg)
  return (
    <>
        <div className='col-lg-4'>
            <div className='card h-100 shadow-sm'>
                <h3 className='card-header text-center'>Agent Contacts</h3>
                {/* <a href={`tel: +2349160261836`}>9160261836</a> */}
                {
                  isLoading?   <div className="mx-auto text-center">
                  <Loader cssOverride={{margin: "auto"}} color="blue"/>
                </div>: 
                <ContactList className={`px-2`}>
                  {
                    allOrg?.map((org, index)=>{
                      return (
                        <div className='org-contact shadow-sm px-2 rounded d-flex justify-content-between py-3' key={index}>
                          <p>{org?.name} -</p>
                          <p>
                            <a href={`tel: +234${org?.mobile}`}>{org?.mobile}</a>
                          </p>
                        </div>
                      )
                    })
                  }
                </ContactList>
                }
            </div>
        </div>
    </>
  )
}

export default ListOfOrgs;
const ContactList = styled.div`
  height: 100vh;
  overflow: auto;
  white-space: nowrap;
  &::-webkit-scrollbar{
    height: 5px;
    background-color: rgb(212, 209, 209);
    border-radius: 5vh;
    &-thumb{
      background-color: blue;
    }
  }
  
  .org-contact{
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