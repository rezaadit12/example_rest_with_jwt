import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
// import Users from "./models/M_users.js";
dotenv.config();

const app = express();

try{
    await db.authenticate();
    console.log('database connected')
    // await Users.sync(); 
}catch(err){
    console.error(err);
}


app.use(cors({ credentials:true, origin: 'http://localhost:3000/' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(4000, () => {
    console.log(`Server berjalan di http://localhost:4000/`);
});