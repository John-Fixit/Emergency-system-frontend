import axios from "axios";
import { baseUrl } from "../URL";

const sendMsg = (msgDetail) => {
  return axios
    .post(`${baseUrl}/msg/sendMsg`, msgDetail)
    .then((res) => {
      return res.data;
    }).catch((err)=>{
      return err.response.data
    })
};

export { sendMsg };
