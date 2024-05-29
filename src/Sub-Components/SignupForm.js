import styled from 'styled-components'
import React from 'react'
import {Box, Typography, TextField, Button, Grid, FormHelperText, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom' 
import Loader from "react-spinners/ClockLoader"
import { createOrg } from "../FunctionControllers/createOrgFunc";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const categories = [
  'Road Accident',
  'Fire',
  'Medical',
  'Robbery',
  'Riot',
  'Natural Disaster',
];
function SignupForm() {
    const navigate = useNavigate('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('');
    const [orgData, setOrgData] = React.useState({
        name: "",
        email: "",
        category: [],
        mobile: '',
        password: ''
    });

  const handleChange=(e)=>{ 
      setOrgData({...orgData, [e.target.name]: e.target.value})
  } 
  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setOrgData({...orgData, category: typeof value === 'string' ? value.split(',') : value,}
      // On autofill we get a stringified value.   
    );
  };
  const handleSubmit = () => {
    if(handleValidation().status){
      setIsLoading(true)
      createOrg(orgData)
        .then((res) => {
          if(res.success){
            orgData.name = ""
            orgData.email = ""
            orgData.category = ""
            orgData.mobile = ""
            orgData.password = ""
            navigate('/login');
          }
          else{
            setErrorMsg(res.message)
          } 
        })
        .catch((err) => {
            setErrorMsg(`${err.message}: please check your connection!`)
        }).finally(()=>{
          setIsLoading(false)
        });
    }
    else {
        let error = handleValidation()
        setErrorMsg(error.message)
    }
  };


  const handleValidation =()=>{
    if(!(!!orgData.name)){
        return {status: false, message: 'Organization name cannot be empty'};
    }
      if(orgData.category==='Choose Category'){
        return {status: false, message: 'Please select your organization category'};
    }
    if(!(!!orgData.mobile)){
        return {status: false, message: 'Please your organization contact'};
    }
    if(!phoneNumberHasCountryCode(orgData.mobile)){
      return { status: false, message: "Sorry, your mobile must include valid country code" }
    }
    else{
      return {status: true}
    }
  }

  const phoneNumberHasCountryCode = (phoneNumber) => {
    const countryCodeRegex = /^\+[1-9]\d{0,2}/; // Assumes country codes start with '+'
    const result = countryCodeRegex.test(phoneNumber)
    return result;
  };
  
  return (
    <>
        <Container className="col-sm-6 px-lg-5 px-2">
            <Box
                sx={{
                    marginTop: 3,
                }}
        >
            <div className='col-sm-10 mx-auto'>
            <div className="text-center">
                <Typography component="h1" variant="h5">
                    Organization Registration
                </Typography>
                <p className={`${!!errorMsg? '': 'd-none'} text-danger form-control is-invalid`}>{errorMsg}</p>
            </div>
            <div className="row my-3">
                <div className="col-md-12 my-1">
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
                    <FormHelperText>
                  Provide Your Organization Name
                </FormHelperText>
                </div>
                <div className="col-md-12 my-1">
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
                    <FormHelperText>
                  Provide Your Organization Email Address   
                </FormHelperText>
                </div>
                <div className='col-md-12 my-1'>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel id="demo-multiple-checkbox-label">Category *</InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={orgData.category}
                      onChange={handleChangeCategory}
                      input={<OutlinedInput label="Category *" />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {categories.map((name) => (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={orgData.category.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-md-12 my-1">
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="mobile"
                            label="contact"
                            type="tel"
                            id="contact"
                            autoComplete="contact"
                            onChange={(e)=>handleChange(e)}
                            value={orgData.mobile}
                    />
                    <FormHelperText>
                        Provide your Organization Contact here
                        {/* <small className="text-danger"> [ Please enter with country code ]</small> */}
                    </FormHelperText>
                </div>
                <div className="col-md-12">
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
                    <FormHelperText>
                    You will need a password for your account security
                    </FormHelperText>
                </div>
                <div className='col-md-12'>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, backgroundColor: 'primary' }}
                        className="bg-primary py-3"
                        onClick={handleSubmit}
                        >
                        <Loader loading={isLoading} size={20} color={"white"} cssOverride={{}}/>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-start" >
              <Grid item>
                <Link to={`/login`} variant="body2">
                  Already have an account? <span className='text-danger'>Sign in</span>
                </Link>
              </Grid>
            </Grid>
                </div>
            </div> 
            </div>
        </Box>
        </Container>
    </>
  )
}

export default SignupForm

const Container = styled.div`

`