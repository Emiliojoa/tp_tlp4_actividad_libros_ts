import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ConexionDB } from "./db/db";
import { PORT } from "./env/env";
import {taskRouter} from "./router/task.router";
import { userRouter } from "./router/user.router";
const app = express();

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api", taskRouter);
app.use("/api",userRouter);



app.listen(PORT, () => {
    const db = ConexionDB.getInstance();
    db.connect();
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
