import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./signUp.css";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { Player } from '@lottiefiles/react-lottie-player';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../../utils/firebase";

const ForgotPassword = () => {
    const [data, setData] = React.useState(
        {
            email: { value: "", helperText: "", isValid: true }
        }
    )
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    React.useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);

    const handleFieldChange = (event) => {
        setData(prevs => {
            const updated = { ...prevs };
            updated[event.target.name].value = event.target.value;
            updated[event.target.name].isValid = true;
            updated[event.target.name].helperText = "";
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

            return updated;
        });
        return isValid;
    }

    const handleForm = () => {
        let result = validateForm();
        if (result) {
            sendPasswordReset(data.email.value);
        }
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid className='container-a' container>
                    <Grid className='banner overlay' container justifyContent='center' item xs={12} md={4}>
                        <div className='signUp-content'>
                            <div></div>
                            <div>
                                <img className='forgot-quotes' src="./images/el_quotes.svg" />
                                <p className='forgot-header'>
                                    Creative without strategy is called art. Creative with strategy is called advertising.
                                </p>
                                <p style={{ textAlign: "right", margin: "10px 15px", fontSize: '1.2rem' }}>– Jef I. Richards</p>
                            </div>

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

                                <Player
                                    src='./lottieFiles/forgot.json'
                                    className="player"
                                    loop
                                    autoplay
                                    speed={2}
                                />

                                <div>
                                    <p className='welcome-title'>
                                        Forgot Your Password?
                                    </p>
                                </div>


                                <div className='instructions'>
                                    <span>
                                        Enter the email address you used when you joined and we'll send you instructions to reset your password.
                                    </span>
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

                                <Button onClick={handleForm} style={{ width: '100%', marginBottom: '20px' }} sx={{ backgroundColor: '#5f4fc1' }} variant="contained">
                                    <p className='button-text'>
                                        Submit
                                    </p>
                                </Button>


                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default ForgotPassword;