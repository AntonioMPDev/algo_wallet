import app from "./app";
import './database'

export const server = app.listen(process.env.PORT || 4000)

console.log("Server listen on port", 4000)