import React from "react";
import { CircularProgress, Paper } from "@mui/material";
import { Container } from "@mui/system";
import classes from "../css.modules/Main.module.css"
import { useGetMeQuery } from "../features/api";
import Transactions from "./Transactions";
import Navbar from "./parts/Navbar";
import Transfer from "./Transfer";

const Dashboard = () => {
    const { data } = useGetMeQuery("");

    if(!data) return <CircularProgress /> 

    return (
        <>
            <Navbar />

            <Container className={classes.containerDashboard}>
                <Paper elevation={0}>
                    <div className={classes.contentForm}>
                        <Transfer />
                        <Transactions _id={data._id}/>
                    </div>
                </Paper>
            </Container>
        </>
  );
}

export default Dashboard