import app from "./app";
import './database'

app.listen(process.env.PORT || 4000)

console.log("Server listen on port", 4000)