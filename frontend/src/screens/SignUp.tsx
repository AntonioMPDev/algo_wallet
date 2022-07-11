import React from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "../css.modules/Main.module.css"
import { Link , Navigate} from "react-router-dom";
import back from "../assets/back.jpg"
import { useSignUpMutation } from "../features/api";
import Storage from "../utils/storage";

type Inputs = {
    username: string,
    email: string,
    password: string,
    repeat_password: string
};

const SignUp = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const password = watch("password")
    const [signUp, {isSuccess}] = useSignUpMutation();

    // check if token exist in storage
    if(new Storage().get("token") != null) return <Navigate to="/" />

    // onSuccess redirect to login page
    if(isSuccess) return <Navigate to="/login" replace />

    // call useSignUpMutation
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        signUp(data)
    };

    return (
        <Container>
            <Paper style={{backgroundImage: `url(${back})`}} className={ classes.centerBox + " " + classes.stack + " " + classes.hasBackground }>
                <span className={classes.overlay}></span>

                <div className={classes.contentForm}>
                    <Typography align="center" variant="h4" gutterBottom component="div">
                        Signup
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            margin="dense" 
                            label="Username"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("username", { required: true })} 
                        />
                        {/* handle username field errors */}
                        {errors.username && <span className={classes.dangerText}>This field is required</span>}

                        <TextField 
                            margin="dense" 
                            label="Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            {...register("email", { required: true })} 
                        />
                        {/* handle email field errors */}
                        {errors.email && <span className={classes.dangerText}>This field is required</span>}

                        <TextField 
    
                            margin="dense" 
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            {...register("password", {
                                required: "You must specify a password",
                                minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                                }
                            })} 
                        />
                        {/* handle password field errors */}
                        {errors.password && <span className={classes.dangerText}>{errors.password.message}</span>}

                        <TextField 
                            margin="dense" 
                            label="Repeat Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            {...register("repeat_password", {
                                validate: value => value === password || "The passwords do not match"
                            })} 
                        />
                        {/* handle repeat_password field errors */}
                        {errors.repeat_password && <span className={classes.dangerText}>{errors.repeat_password.message}</span>}

                        <Button className={classes.buttonSubmit} variant="contained" type="submit" >Submit</Button>

                        <div className={classes.signupLinks}>
                            <p>Have an account? <Link to="/login">Login </Link></p>                   
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
  );
}

export default SignUp