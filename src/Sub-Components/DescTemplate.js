import { Chip } from '@mui/material'
import React from 'react'
const descList = [
  {categoryName: "Road Accident", desc: "There is a sudden vehicle accident that you need to attend to "},
  {categoryName: "Fire", desc: "There is a sudden Fire that you need to attend to immediately, Fire agency is needed quicly."},
  {categoryName: "Medical", desc: "Please, medical emergency is needed quickly..."},
  {categoryName: "Robbery", desc: "There is an ongoing robbery, you need to help us please"},
  {categoryName: "Riot", desc: "There is an ongoing riot, please come and help us to settle it, it's becoming more serious."},
  {categoryName: "Natural Disaster", desc: "Natural Disaster is happening currently, help is really need!"},
]

function DescTemplate({handleTemplate, category}) {
  return (
        <React.Fragment>
          <p className="fw-bold">Available Message Templates:</p>
          {
            descList.map((item, i)=>{
              return <Chip key={i} label={item.categoryName} className={`border border-danger border-1 fire m-1 ${category === item.categoryName? "ens_bg-danger text-light": "bg-light"}`} onClick={()=>handleTemplate({ desc: item.desc, index:i})} />
            })
          }
        </React.Fragment>
  )
}

export default DescTemplate