import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useForm, SubmitHandler } from "react-hook-form";
import classes from "../css.modules/Main.module.css"
import { useGetMeQuery, useTransferMutation } from "../features/api";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectDialog, open, close } from "../features/dialogSlice";

type Inputs = {
    user: string,
    receiverAddr: string,
    amount: number,
};

const Transfer = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const [transfer, {isLoading:transferIsloading,  error: transferError}] = useTransferMutation()
    const { data: me } = useGetMeQuery("");
    const dispatch = useAppDispatch(); // handle dialog
    const dialogStatus = useAppSelector(selectDialog);

    // handle sumitting form for transfer
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const transferData = data
        transferData.user = me?._id
        // call useTransferMutation
        transfer(transferData)
    };
    const transfError: any = transferError

    return (
        <>  
            <Fab size="medium" onClick={()=>dispatch(open())} className={classes.sendBtn}>
                <SendIcon color="primary" style={{width:"15px"}} />
            </Fab>
            {dialogStatus && <Dialog open={true} onClose={()=> dispatch(close())}>
                <DialogTitle>
                    Transfer
                </DialogTitle>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField 
                            margin="dense"
                            id="receiverAddr"
                            label="receiverAddr"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("receiverAddr", { required: true })} 
                        />
                        {/* handle receiverAddr field error */}
                        {errors.receiverAddr && <span className={classes.dangerText}>This field is required</span>}

                        <TextField 
                            margin="dense"
                            id="amount"
                            label="amount"
                            type="number"
                            fullWidth
                            variant="standard"
                            {...register("amount", { required: "This field is required", min: 0, max: 10000 })} 
                        />
                        {/* handle amount field errors */}
                        {errors.amount && <span className={classes.dangerText}>{errors.amount.message}</span>}
                        {(watch("amount") < 0) || (watch("amount") > 10000) ? (<span className={classes.dangerText}>Must be less than 10000</span>) : null }

                        {/* show error if user typed an invalid address */}
                        {transfError?.status === 409 && <span className={classes.dangerText}>Invalid address</span>}

                    </DialogContent>
                    {!transferIsloading ? <DialogActions>
                        <Button onClick={()=>dispatch(close())}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions> : <span>transfering...</span>}
                </form>

            </Dialog>}
        </>
    )
}

export default Transfer