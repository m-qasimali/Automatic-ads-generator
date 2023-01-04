import * as React from 'react';
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
import FormHelperText from '@mui/material/FormHelperText';
import { Link, useNavigate } from "react-router-dom";
import validator from 'validator';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from '../../utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState(
        {
            email: { value: "", helperText: "", isValid: true },
            password: { value: "", helperText: "", isValid: true },
            remember: { value: false }
        }
    )
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user){
            navigate("/dashboard", { replace: true });
        }
    }, [user, loading]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFieldChange = (event) => {
        setData(prevs => {
            const updated = { ...prevs };
            if (event.target.type == "checkbox") {
                updated['remember'].value = !(updated['remember'].value);
            }
            else {
                updated[event.target.name].value = event.target.value;
                updated[event.target.name].isValid = true;
                updated[event.target.name].helperText = "";
            }
            return updated;
        });
    }

    const validateForm = () => {
        let isValid = true;
        setData(prevs => {
            const updated = { ...prevs };

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
            else {
                updated.password.helperText = ""
                updated.password.isValid = true;
            }

            return updated;
        });
        return isValid;
    }

    const handleForm = async () => {
        let result = validateForm();
        if (result) {
            logInWithEmailAndPassword(data.email.value, data.password.value);
        }
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid className='container-a' container>
                    <Grid className='banner overlay' container justifyContent='center' item xs={12} md={4}>
                        <div className='signUp-content'>
                            <div>
                                <p className='banner-header'>
                                    Welcome to your Automatic Ads Generator
                                </p>
                                <p className='banner-details'>
                                    Bring your Ads generation game to the next level with our services and features.
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
                    <Grid className='form-side1' container justifyContent='center' item xs={12} md={8}>
                        <div className="form-wrapper1">
                            <div className="form-container">
                                <div>
                                    <p className='welcome-title'>
                                        Hi, Welcome Back!
                                    </p>
                                </div>

                                <Button onClick={signInWithGoogle} className='google-button' style={{ width: '98%', marginBottom: '20px' }} sx={{ color: "#5f4fc1", border: '2px solid #5f4fc1', outline: 'none', "&:hover": { border: '2px solid #5f4fc1' } }} variant="outlined">
                                    <img style={{ width: "25px", marginRight: "20px" }} src="./images/google.svg" alt="" />
                                    <p className='button-text' style={{ textTransform: 'capitalize' }}>
                                        Sign In With Google
                                    </p>
                                </Button>

                                <div className='loginWith'>
                                    <span className='or'>or</span>
                                </div>

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
                                <FormControl error={(data.password.isValid) ? false : true} style={{ width: '100%', marginBottom: '5px' }} sx={{ m: 1, width: '25ch' }} variant="outlined">
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




                                <div className='switch-style1'>
                                    <div className='forgot-password'>
                                        <FormControlLabel style={{ color: '#433F4C' }} control={<Checkbox checked={data.remember.value ? true : false} onChange={handleFieldChange} style={{ color: "#5F4FC1", padding: "0px", paddingLeft: "15px" }} />} label="Remember for 30 days" />
                                        <Link to="/forgot">
                                            <span style={{ color: "#5F4FC1" }}>Forgot Password!</span>
                                        </Link>
                                    </div>
                                    <FormHelperText id="component-helper-policy" style={{ color: "#d32f2f", paddingLeft: "15px" }}>{data.remember.helperText}</FormHelperText>
                                </div>

                                <Button onClick={handleForm} style={{ width: '98%', marginBottom: '20px' }} sx={{ backgroundColor: '#5f4fc1' }} variant="contained">
                                    <p className='button-text'>
                                        Sign In
                                    </p>
                                </Button>


                                <div className='already-signUp'>
                                    <span style={{ color: '#433F4C' }}>
                                        Don't have an account?
                                    </span>
                                    <Link to="/signUp">
                                        <span style={{ color: "#5F4FC1" }}>  Sign Up!</span>
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

export default Login;