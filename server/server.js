import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from "./db/dbcon.js";
import instru from "./routes/instru.js"
import authRoutes from './routes/auth.js'

dotenv.config({path: "./config.env"});

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(express.json())
app.use("/api", instru);
app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>{
   console.log(`le server est démarré sur le port ${PORT}`);
   // let db = dbcon;
});