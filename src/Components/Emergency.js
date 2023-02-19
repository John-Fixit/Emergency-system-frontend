import React, { useState } from 'react'
import "../Styles/emergency.css"
// import {SEND_MSG} from "../Mutation/sendMsg"
function Emergency() {
    const [category, setcategory] = useState("")
    const [location, setlocation] = useState("")
    const [details, setdetails] = useState({
        category: "",
        text: "",
        location: ""
    })

    // const {} = useQuery(sendMsg)

    const handleChange =(e)=>{
        setdetails({...details, [e.target.name]: e.target.value})
    }

    const submit=()=>{
        const {category, text, location} = details
        let time = new Date()

        console.log(details, time)
    }



    const handleValidation =()=>{
        
    }

  return (
    <>
        <div className="">
            <div className='category'>
                <label htmlFor="">Emergency Category</label>
            <select className='form-control' name='category' onChange={e=>handleChange(e)}>
                <option value="">Choose Category</option>
                <option value="vehicleAccident">Vehicle Accident</option>
                <option value="fireAccident">Fire Accident</option>
                <option value="robbery">Robbery</option>
                <option value="riot">Riot</option>
            </select>
            </div>
            <div className='content my-2'>
                <div className='text_desc_area'>
                    <textarea rows="10" cols="30" name='text' className='form-control' onChange={e=>handleChange(e)}></textarea>
                </div>
                <div className='voice_desc_area'>
                   <label htmlFor="">Use voice record for more description of the incident</label>
                </div>
                <div className='video_desc_area'>
                   <label htmlFor="">Take video coverage for more description about the urgent incident: </label>
                </div>

                <div className=''>
                    <label htmlFor="">Enter the exact location of the Emergency</label>
                    <input type="text" name='location' onChange={e=>handleChange(e)} />

                    <div className='device_location'>
                        <label htmlFor="">Use my current location</label> <input type="checkbox" />
                    </div>
                </div>
            </div>
            <div className='submitContent'>
                <button className='btn submitBtn' onClick={()=>submit()}>Submit</button>
            </div>
        </div>
    </>
  )
}

export default Emergency