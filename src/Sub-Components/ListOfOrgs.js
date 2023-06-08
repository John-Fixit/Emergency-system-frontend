import Loader from 'react-spinners/PropagateLoader'
import styled from 'styled-components';
function ListOfOrgs({allOrg, isLoading, category}) {
  const newOrgContacts = allOrg?.filter((item)=>item.category === category)
console.log(category)
  return (
    <>
        <div className='col-lg-4'>
            <div className='card h-100 shadow-sm'>
                <h3 className='card-header text-center'>Agent Contacts</h3>
                <a href={`tel: +2349160261836`}>9160261836</a>
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
                            <a href={`tel: +234${org.mobile}`}>{org.mobile}</a>
                            {/* {org?.mobile} */}
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
  }
`