import styled from 'styled-components'
import React from 'react'
import {Box, Typography, TextField, Button, Grid, FormHelperText} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom' 
import Loader from "react-spinners/ClockLoader"
import { createOrg } from "../FunctionControllers/createOrgFunc";
function SignupForm() {
    const navigate = useNavigate('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('');
    const [orgData, setOrgData] = React.useState({
        name: "",
        email: "",
        category: "Choose Category",
        mobile: '',
        password: ''
    });

  const handleChange=(e)=>{
      setOrgData({...orgData, [e.target.name]: e.target.value})
  } 

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
        let errorName = handleValidation().name
        errorName==='category'? setErrorMsg('Please select your organization category'): errorName==='mobile'? setErrorMsg('Please your organization contact'): errorName==='name'&& setErrorMsg('Organization name cannot be empty') 
    }
  };


  const handleValidation =()=>{
    if(!(!!orgData.name)){
        return {status: false, name: 'name'};
    }
      if(orgData.category==='Choose Category'){
        return {status: false, name: 'category'};
    }
    if(!(!!orgData.mobile)){
        return {status: false, name: 'mobile'};
    }
    
    else{
      return {status: true}
    }
  }
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
               
                <div className="col-md-12 my-1">
                    <select className='form-select py-3' name='category' onChange={(e)=>handleChange(e)} style={{cursor: 'pointer'}}>
                        <option value={''}>Choose Category</option>
                        <option value={'Road Accident'}>Road Accident</option>
                        <option value={'Fire'}>Fire</option>
                        <option value={'Medical'}>Medical</option>
                        <option value={'Robbery'}>Robbery</option>
                        <option value={'Riot'}>Riot</option>
                        <option value={'Natural Disaster'}>Natural Disaster</option>
                    </select>
                    <FormHelperText>
                         Select the Category of your Organization
                    </FormHelperText>
                </div>
                <div className="col-md-12 my-1">
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="mobile"
                            label="contact"
                            type="number"
                            id="contact"
                            autoComplete="contact"
                            onChange={(e)=>handleChange(e)}
                            value={orgData.mobile}
                    />
                    <FormHelperText>
                        Provide your Organization Contact here
                        <small className="text-danger"> [ Please enter with country code ]</small>
                    </FormHelperText>
                </div>
                {/* <div className="col-md-12 my-1">
                    <textarea rows="3" cols="5" name="description" placeholder="Your Organization description" className="form-control textArea"
                    onChange={(e)=>handleChange(e)}
                    value={orgData.description}
                    >
                    </textarea>
                    <FormHelperText>
                        Provide your organization's description here
                    </FormHelperText>
                </div> */}
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
                        className="bg-primary"
                        onClick={handleSubmit}
                        >
                        <Loader loading={isLoading} size={20} color={"white"} cssOverride={{}}/>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-start" >
              <Grid item>
                <Link to={`/login`} variant="body2">
                  Already have an account? Sign in
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