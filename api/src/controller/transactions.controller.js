import Transaction from "../models/Transaction"
import algosdk from "algosdk"
import config from "../config"

// public in blockchain the transaction and save in db
export const makeTransaction = async (req, res) => {
    const {user, receiverAddr, amount} = req.body

    const token = {
        "x-api-key" : config.CONNECTION_API_KEY
    } 

    const port = ""

    let algodClient = new algosdk.Algodv2(token, config.ALGORAND_TESTNET_URL, port);
    let acc = algosdk.mnemonicToSecretKey(config.SENDER_MNEMONIC)

    // show balance
    let accountInfo = await algodClient.accountInformation(acc.addr).do();
    console.log("Account balance: %d microAlgos", accountInfo.amount);

    let txId = null;
    let confirmedTxn = null

    try {
        // Construct the transaction
        let params = await algodClient.getTransactionParams().do();
        // comment out the next two lines to use suggested fee
        params.fee = algosdk.ALGORAND_MIN_TX_FEE;
        params.flatFee = true;

        const receiver = receiverAddr;
        const enc = new TextEncoder();
        const note = enc.encode("Hello World");

        let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: acc.addr, 
            to: receiver, 
            amount: parseFloat(amount), 
            note: note, 
            suggestedParams: params
        });

        // Sign the transaction
        let signedTxn = txn.signTxn(acc.sk);
        txId = txn.txID().toString();
        console.log("Signed transaction with txID: %s", txId);

        // Submit the transaction
        await algodClient.sendRawTransaction(signedTxn).do();

        // Wait for confirmation
        confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        //Get the completed Transaction
        console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);
        // let mytxinfo = JSON.stringify(confirmedTxn.txn.txn, undefined, 2);
        // console.log("Transaction information: %o", mytxinfo);
        let string = new TextDecoder().decode(confirmedTxn.txn.txn.note);
        console.log("Note field: ", string);
        accountInfo = await algodClient.accountInformation(acc.addr).do();
        console.log("Transaction Amount: %d microAlgos", confirmedTxn.txn.txn.amt);        
        console.log("Transaction Fee: %d microAlgos", confirmedTxn.txn.txn.fee);
        console.log("Account balance: %d microAlgos", accountInfo.amount);     
    } catch (error) {
  
        res.status(400).json(error)
    }   

    ////////// from here save in db //////////
    if(txId){
        const newTransaction = new Transaction({
            user: user,
            txId: txId,
            amount: confirmedTxn.txn.txn.amt
        })
    
        const transactionSaved = await newTransaction.save()
    
        res.status(200).json(transactionSaved)
    } else {
        res.status(400).json(error)
    }
}

// get user transactions
export const getTransactions = async (req, res) => {

    const transactions = await Transaction.find({ user: req.params.id }).sort({createdAt: -1})
    res.json(transactions)
}

