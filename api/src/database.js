import mongoose from "mongoose"
import config from "./config"


export const db =  mongoose.connect(config.database)
    .then(db => console.log("DB is connected"))
    .catch(error => console.log(error))
    
