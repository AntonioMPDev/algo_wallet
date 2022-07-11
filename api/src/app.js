import express from "express"
import morgan from "morgan"
import pkg from "../package.json"
import transactionsRoutes from "./routes/transactions.routes"
import authRoutes from "./routes/auth.routes"

// 
const app = express()

app.set('pkg', pkg)

//Cors Configuration - Start
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})
//Cors Configuration - End

app.use(morgan("dev"))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use("/api/transactions", transactionsRoutes)
app.use("/api/auth", authRoutes)

export default app