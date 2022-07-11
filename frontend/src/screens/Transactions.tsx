import React from "react";
import { Avatar, CircularProgress, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import classes from "../css.modules/Main.module.css"
import { useGetTransactionsQuery } from "../features/api";
import ChartTransfer from "./parts/ChartTransfer";
import moment from 'moment';

type Props = {
    _id: string
}

const Transactions = ({_id}: Props) => {
    const { data } = useGetTransactionsQuery(_id);
    
    // show progress bar if no data received
    if(!data) return <CircularProgress /> 
    
    return (
        <div className={classes.contentForm}>
            <div style={{height: "30px"}}></div>
            <Typography align="center" variant="h5" gutterBottom component="div">
                My Algorand Transactions
            </Typography>
            <div className={classes.chart}>
              {/* chart of transfers */}
              <ChartTransfer data={data} />
            </div>
            <div style={{height: "50px"}}></div>
            <Typography align="center" variant="h5" gutterBottom component="div">
                {data.length > 0 ? "List of Transactions" : "No transactions yet"}
            </Typography>

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {data.map((e)=>(
                <div key={e._id}>
                  <ListItem  style={{maxWidth:"700px", margin:"auto"}}>
                    <ListItemAvatar>
                      <Avatar>
                        <img src="https://cryptologos.cc/logos/algorand-algo-logo.png" width="20" alt="algorand"/>
                      </Avatar>
                    </ListItemAvatar>
                    <div>
                      <a target="_blank" rel="noreferrer" href={`https://testnet.algoexplorer.io/tx/${e.txId}`}>
                          <ListItemText style={{wordBreak: "break-all"}} primary={e.txId} secondary={moment(e.updatedAt).fromNow()} />
                      </a>
                      <div>Amount: <img src="https://testnet.algoexplorer.io/images/global/light/algo.png" width={"13px"} alt="algorand" /> {e.amount}</div>
                    </div>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              ))}
            </List>
        </div>
  );
}

export default Transactions