import { Chip } from '@mui/material'
import React from 'react'
const descList = [
  {catName: "Vehicle Accident", desc: "There is a sudden vehicle accident that you need to attend to "},
  {catName: "Fire Accident", desc: "There is a sudden Fire accident that you need to attend to immediately, before it cause more than normal"},
  {catName: "Robbery", desc: "There is a sudden vehicle accident that you need to attend to "},
  {catName: "Riot", desc: "There is an ongoing riot, please come and help us to settle it, it's becoming more serious"},
]

function DescTemplate({handleTemplate}) {
  return (
        <React.Fragment>
          {
            descList.map((item, i)=>{
              return <Chip key={i} label={item.catName} onClick={()=>handleTemplate(item.desc)} />
            })
          }
        </React.Fragment>
  )
}

export default DescTemplate