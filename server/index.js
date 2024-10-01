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



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import dbConnection from "./db/conn.js";
// import userRouter from "./routes/userRoutes.js";

// // Load environment variables from .env file
// dotenv.config();

// // Establish database connection
// await dbConnection()
//   .then(() => {
//     console.log('Database connected successfully');
//   })
//   .catch((error) => {
//     console.error('Error connecting to the database:', error);
//     process.exit(1);  // Exit process if the database connection fails
//   });

// const app = express();
// const Port = process.env.PORT || 3000;  // Use PORT from environment variables

// // Middleware to handle JSON and CORS
// app.use(express.json());

// // CORS configuration - customize based on your frontend setup
// app.use(cors({
//   origin: 'http://localhost:3001',  // Your frontend's origin (adjust as needed)
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,  // If you want to allow credentials (like cookies)
// }));

// // Debugging middleware to log incoming requests
// app.use((req, res, next) => {
//   console.log(`${req.method} request made to ${req.url}`);
//   next();
// });

// // User routes
// app.use("/api/v1/user", userRouter);

// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something went wrong!');
// });

// // Start the server
// app.listen(Port, () => {
//   console.log(`Server is running at http://localhost:${Port}`);
// });
