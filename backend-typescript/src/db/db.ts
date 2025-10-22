import mongoose from "mongoose"
import { MONGO_URI } from "../env/env"
import { IConexionDB } from "../interface/IConexiondb"

export class ConexionDB implements IConexionDB {
    private static instance: ConexionDB;

    static getInstance(): ConexionDB {
        if (!ConexionDB.instance) {
            ConexionDB.instance = new ConexionDB();
        }
        return ConexionDB.instance;
    }

    async connect(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URI);
            console.log("Conexión a la base de datos exitosa");
        }
        catch (error) {
            console.error("Error al conectar a la base de datos:", error);
            throw error;
        }
    }
}
