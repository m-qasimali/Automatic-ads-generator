import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./signUp.css";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Switch from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from 'react-router-dom';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../utils/firebase";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const navigate = useNavigate();
  const [data, setData] = React.useState(
    {
      name: { value: "", helperText: "", isValid: true },
      email: { value: "", helperText: "", isValid: true },
      password: { value: "", helperText: "", isValid: true },
      cpassword: { value: "", helperText: "", isValid: true },
      policy: { value: false, helperText: "", isValid: true }
    }
  )
  const location = useLocation();
  const [user, loading, error] = useAuthState(auth);
  React.useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/dashboard",{replace:true});
    }
  }, [user, loading]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFieldChange = (event) => {
    setData(prevs => {
      const updated = { ...prevs };
      if (event.target.type == "checkbox") {
        updated['policy'].value = !(updated['policy'].value);
        updated.policy.helperText = ""
      }
      else {
        updated[event.target.name].value = event.target.value;
        updated[event.target.name].isValid = true;
        updated[event.target.name].helperText = "";
      }
      return updated;
    });
  }

  const validation = () => {
    let isValid = true;
    setData(prevs => {
      const updated = { ...prevs };
      if (data.name.value.trim().length == 0) {
        updated.name.helperText = "Name required!"
        updated.name.isValid = false;
        isValid = false;
      }
      else {
        updated.name.helperText = ""
        updated.name.isValid = true;
      }

      if (data.email.value.trim().length == 0) {
        updated.email.helperText = "Email required!"
        updated.email.isValid = false;
        isValid = false;
      }
      else if (!validator.isEmail(data.email.value)) {
        updated.email.helperText = "Email invalid!"
        updated.email.isValid = false;
        isValid = false;
      }
      else {
        updated.email.helperText = ""
        updated.email.isValid = true;
      }

      if (data.password.value.trim().length == 0) {
        updated.password.helperText = "Password required!"
        updated.password.isValid = false;
        isValid = false;
      }
      else if (!validator.isStrongPassword(data.password.value, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      })) {
        updated.password.helperText = "Weak password!"
        updated.password.isValid = false;
        isValid = false;
      }
      else {
        updated.password.helperText = ""
        updated.password.isValid = true;
      }

      if (data.cpassword.value.trim().length == 0) {
        updated.cpassword.helperText = "Confirm Password required!"
        updated.cpassword.isValid = false;
        isValid = false;
      }
      else if (data.cpassword.value != data.password.value) {
        updated.cpassword.helperText = "Password not matched!"
        updated.cpassword.isValid = false;
        isValid = false;
      }
      else {
        updated.cpassword.helperText = ""
        updated.cpassword.isValid = true;
      }

      if (!(data.policy.value)) {
        updated.policy.helperText = "required!"
        updated.policy.isValid = false;
        isValid = false;
      }
      else {
        updated.policy.helperText = ""
        updated.policy.isValid = true;
      }

      return updated;
    });

    return isValid;
  }

  const handleForm = async () => {
    let result = validation();
    registerWithEmailAndPassword(data.name.value, data.email.value, data.password.value);
  }

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 27,
    height: 16,
    padding: 0,
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#5F4FC1',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid className='container-a' container>
          <Grid className='banner overlay' container justifyContent='center' item xs={12} md={4}>
            <div className='signUp-content'>
              <div>
                <p className='banner-header'>
                  Start your journey with us
                </p>
                <p className='banner-details'>
                  Connect your ad accounts to your brands and let our AI learn from your own data and bring you even more personalized results.
                </p>
              </div>
              <img className='customer-card' src="./images/cutomer-card.svg" />
              <div className="social-media-div">
                <img className='banner-icon' src="./images/instagram.svg" />
                <img className='banner-icon' src="./images/google.svg" />
                <img className='banner-icon' src="./images/facebook.svg" />
              </div>
            </div>
          </Grid>
          <Grid className='form-side' container justifyContent='center' item xs={12} md={8}>
            <div class="form-wrapper">
              <div className="form-container">
                <div>
                  <p className='signUp-title'>
                    Sign Up
                  </p>
                </div>
                <FormControl error={(data.name.isValid) ? false : true} style={{ width: '100%', marginBottom: '20px' }} sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-name"
                    type="text"
                    label="Name"
                    name="name"
                    value={data.name.value}
                    onChange={handleFieldChange}
                  />
                  <FormHelperText id="component-helper-text">{data.name.helperText}</FormHelperText>

                </FormControl>
                <FormControl error={(data.email.isValid) ? false : true} style={{ width: '100%', marginBottom: '20px' }} sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="email"
                    label="Email"
                    name="email"
                    value={data.email.value}
                    onChange={handleFieldChange}
                  />
                  <FormHelperText id="component-helper-text">{data.email.helperText}</FormHelperText>
                </FormControl>
                <FormControl error={(data.password.isValid) ? false : true} style={{ width: '100%', marginBottom: '20px' }} sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={data.password.value}
                    onChange={handleFieldChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText id="component-helper-text">{data.password.helperText}</FormHelperText>
                </FormControl>

                <FormControl error={(data.cpassword.isValid) ? false : true} style={{ width: '100%', marginBottom: '10px' }} sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-cpassword" style={{ backgroundColor: "#fff" }}>Confirm Password  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-cpassword"
                    type={showPassword1 ? 'text' : 'password'}
                    name="cpassword"
                    value={data.cpassword.value}
                    onChange={handleFieldChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle cpassword visibility"
                          onClick={handleClickShowPassword1}
                          onMouseDown={handleMouseDownPassword1}
                          edge="end"
                        >
                          {showPassword1 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                  <FormHelperText id="component-helper-text">{data.cpassword.helperText}</FormHelperText>
                </FormControl>

                <div className='switch-style'>
                  <AntSwitch id="component-helper-policy" onChange={handleFieldChange} checked={data.policy.value} inputProps={{ 'aria-label': 'ant design' }} />
                  <span style={{ paddingLeft: "5px" }}>I agree to the <span style={{ color: "#5F4FC1" }}>terms of services</span> and <span style={{ color: "#5F4FC1" }}>privacy policy</span></span>
                  <FormHelperText id="component-helper-policy" style={{ color: "#d32f2f", paddingLeft: "15px" }}>{data.policy.helperText}</FormHelperText>
                </div>

                <Button onClick={handleForm} style={{ width: '98%', marginBottom: '20px' }} sx={{ backgroundColor: '#5f4fc1' }} variant="contained">
                  <p className='button-text'>
                    Sign Up
                  </p>
                </Button>

                <div className='signUpWith'>
                  Or login with your email
                </div>

                <Button onClick={signInWithGoogle} className='google-button' style={{ width: '98%', marginBottom: '20px' }} sx={{ color: "#5f4fc1", border: '2px solid #5f4fc1', outline: 'none', "&:hover": { border: '2px solid #5f4fc1' } }} variant="outlined">
                  <img style={{ width: "25px", marginRight: "20px" }} src="./images/google.svg" alt="" />
                  <p className='button-text' style={{ textTransform: 'capitalize' }}>
                    Sign Up With Google
                  </p>
                </Button>

                <div className='already-signUp'>
                  <span style={{ color: '#433F4C' }}>
                    Already have an account?
                  </span>
                  <Link to="/login">
                    <span style={{ color: "#5F4FC1" }}>  Sign in!</span>
                  </Link>
                </div>

              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SignUp;