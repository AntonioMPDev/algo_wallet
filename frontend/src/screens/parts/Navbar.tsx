import { AppBar, Button, Grid, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import classes from "../../css.modules/Main.module.css"
import useLogout from "../../hooks/useLogout";


const Navbar = () => {
    const {logout} = useLogout()

    return (
        <>
            <AppBar position="static">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Typography className={classes.headerTitle} align="center" variant="h4" gutterBottom component="div">
                            <DashboardIcon /> My Algorand Wallet
                        </Typography>
                    </Grid>
                    <Grid item xs={4} justifyContent="center" alignItems="center" container direction="row">
                        <Button onClick={logout} variant="outlined" style={{background:"white"}}>Logout</Button>
                    </Grid>              
                </Grid>
            </AppBar>
        </>
    )
}

export default Navbar