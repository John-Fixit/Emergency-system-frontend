
import axios from "axios";
import { baseUrl } from "../URL";
export const loginOrg=(data)=>{
    const {email} = data;
    return axios.post(`${baseUrl}/org/login`, {email}).then((response)=>{
            return response.data;
    }).catch((err)=>{
        if(err.response){
            return err.response.data
         }
           else{
             return {message: err.message, success: false}
         }
    })
}

export const authorize=({token})=>{
   return axios.get(`${baseUrl}/org/authorize`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }).then((res)=>{
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