import dns from "node:dns";
import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

// Ensure reliable DNS resolution for MongoDB Atlas & external services
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const app = express();

// using middleware
app.use(express.json());
app.use(cors());



//using routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is working on port ${process.env.PORT}`);
  connectDb();
});
