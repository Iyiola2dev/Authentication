import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnection from "./db/conn.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config()
await dbConnection()

const app = express();
const Port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRouter)
app.listen(Port, ()=>{
    console.log(`Server is running at http://localhost:${Port}`);
})



