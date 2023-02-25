import axios from "axios" 



let baseUrl = process.env.NODE_ENV === 'development'? process.env.REACT_APP_SERVER_DEV_URL: process.env.REACT_APP_SERVER_PRO_URL;

const sendMsg=(msgDetail)=>{
   return axios.post(`${baseUrl}/msg/sendMsg`, msgDetail).then((res)=>{
        return res
   }).catch((err)=>{
        return err
   })
}

export {sendMsg}