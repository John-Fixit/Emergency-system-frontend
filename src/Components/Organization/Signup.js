import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createOrg } from "../../FunctionControllers/createOrgFunc";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-spinners/ClockLoader"
import SignupBg from "../../Sub-Components/SignupBg";
import SignupForm from "../../Sub-Components/SignupForm";
import '../../Styles/signup.css'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="https://github.com/John-Fixit">
        John-Fixit
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [orgData, setOrgData] = React.useState({
    name: "",
    email: "",
    category: "Choose Category",
    description: "",
    password: ''
  });

  const toastStyle = { theme: "colored", delay: 8000, autoClose: true, draggable: true, pauseOnHover: true};

  const handleChange=(e)=>{
      setOrgData({...orgData, [e.target.name]: e.target.value})
  } 

  const handleSubmit = () => {
    if(handleValidation()){
      setIsLoading(true)
      createOrg(orgData)
        .then((res) => {
          if(res.success){
            toast.success(res.message, toastStyle);
            orgData.name = ""
            orgData.email = ""
            orgData.category = ""
            orgData.password = ""
            orgData.description = ""
          }
          else toast.error(res.message, toastStyle);
        })
        .catch((err) => {
            toast.error(`${err.message}: please check your connection!`, toastStyle)
        }).finally(()=>{
          setIsLoading(false)
        });
    }
    else {
        toast.error("Please select your organization category!", toastStyle)
    }
  };


  const handleValidation =()=>{
      if(!(!!orgData.category)){
        return false;
    }
    else{
      return true
    }
  }

  return (
      <React.Fragment>
          <div className="d-flex">
              <SignupBg />
              <SignupForm />
            </div>
    <ToastContainer />
      </React.Fragment>
  );
}
