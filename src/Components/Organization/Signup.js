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
            {/* <ThemeProvider theme={theme}>
              <CssBaseline /> */}
      {/* <Container component="main" maxWidth="sm" className="p-2 shadow rounded-3">
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign up your Organization
          </Typography>
            <div className="mt-3">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name of Organization"
                  autoFocus
                  onChange={(e)=>handleChange(e)}
                  value={orgData.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl sx={{ m: 2, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="category"
                  value={orgData.category}
                  label="Category"
                   onChange={(e)=>handleChange(e)}
                >
                  <MenuItem value={"vehicleAccident"}>Vehicle Accident</MenuItem>
                  <MenuItem value={"fireAccident"}>Fire Accident</MenuItem>
                  <MenuItem value={"robbery"}>Robbery</MenuItem>
                  <MenuItem value={"riot"}>Riot</MenuItem>
                </Select>
                <FormHelperText>
                  Select the Category of your Organization
                </FormHelperText>
              </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Organization Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                   onChange={(e)=>handleChange(e)}
                   value={orgData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <FormHelperText>
                  Provide your organization's description here
                </FormHelperText>
                <textarea rows="10" cols="10" name="description" placeholder="Your Organization description" className="form-control textArea"
                 onChange={(e)=>handleChange(e)}
                 value={orgData.description} 
                 >
                </textarea>

                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=>handleChange(e)}
                value={orgData.password}
              />
              </Grid>


              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="We also want to receive notification and updates via email."
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="gap-2"
              onClick={handleSubmit}
            >
              <Loader loading={isLoading} size={20} color={"white"} cssOverride={{}}/>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={`/login`} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            </div> 
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
    {/* </ThemeProvider> */}
    <ToastContainer />
      </React.Fragment>
  );
}
