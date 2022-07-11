import { Paper, Typography } from "@mui/material"
import { Container } from "@mui/system"
import classes from "../css.modules/Main.module.css"

const Page404 = ()=>{
    return (
        <Container>
            <Paper className={ classes.centerBox + " " + classes.stack }>
                <Typography>
                    Page not found
                </Typography>
            </Paper>
        </Container>
    )
}

export default Page404