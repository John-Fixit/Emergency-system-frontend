import axios from "axios"
import { baseUrl } from "../URL"

const createOrg=(org_details)=>{
    return axios.post(`${baseUrl}/org/addOrg`, org_details).then((res)=>{
        return res.data
    }).catch((err)=>{
        if(err.response){
           return err.response.data
        }
          else{
            return {message: err.message, success: false}
        }
    })
}


export {createOrg}