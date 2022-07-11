import React from "react";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "../css.modules/Main.module.css"
import { Link, Navigate } from "react-router-dom";
import back from "../assets/back.jpg"
import { useLoginMutation } from "../features/api";
import Storage from "../utils/storage";

type Inputs = {
    email: string,
    password: string,
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [login, {error, isSuccess}] = useLoginMutation();
    const restError: any = error

    // check if token exist in storage
    if(new Storage().get("token") != null) return <Navigate to="/" />

    // onSuccess redirect to dashboard page
    if(isSuccess) return <Navigate to="/" replace />

    // call useLoginMutation
    const onSubmit: SubmitHandler<Inputs> = (data:Inputs) => {
        const email = data.email
        const password = data.password
        login({ email, password });
    };

    return (
        <Container>
            <Paper style={{backgroundImage: `url(${back})`}} className={ classes.centerBox + " " + classes.stack + " " + classes.hasBackground }>
                <span className={classes.overlay}></span>
                
                <div className={classes.contentForm}>
                    <Typography align="center" variant="h4" gutterBottom component="div">
                        Login
                    </Typography>

                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

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
                        {/* handle pasword field errors */}
                        {errors.password && <span className={classes.dangerText}>{errors.password.message}</span>}
                        
                        {/* handle res errors */}
                        {restError && <div className={classes.dangerText}>{restError.data.message}</div>}

                        <Button className={classes.buttonSubmit} variant="contained" type="submit"> Submit </Button>
                        
                        <div className={classes.signupLinks}>
                            <p>Don't have an account? <Link to="/signup">SignUp </Link></p>                   
                        </div>
                    </form>
                </div>
            </Paper>
        </Container>
  );
}

export default Login