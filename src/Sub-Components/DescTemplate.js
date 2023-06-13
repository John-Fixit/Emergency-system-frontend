import { Chip } from '@mui/material'
import React from 'react'
const descList = [
  {catName: "Road Accident", desc: "There is a sudden vehicle accident that you need to attend to "},
  {catName: "Fire", desc: "There is a sudden Fire that you need to attend to immediately, Fire agency is needed quicly."},
  {catName: "Medical", desc: "Please, medical emergency is needed quickly..."},
  {catName: "Robbery", desc: "There is an ongoing robbery, you need to help us please"},
  {catName: "Riot", desc: "There is an ongoing riot, please come and help us to settle it, it's becoming more serious."},
  {catName: "Natural Disaster", desc: "Natural Disaster is happening currently, help is really need!"},
]

function DescTemplate({handleTemplate}) {
  return (
        <React.Fragment>
          {
            descList.map((item, i)=>{
              return <Chip key={i} label={item.catName} className={`border border-danger fire px-2 m-1 bg-light`} onClick={()=>handleTemplate(item.desc)} />
            })
          }
        </React.Fragment>
  )
}

export default DescTemplate