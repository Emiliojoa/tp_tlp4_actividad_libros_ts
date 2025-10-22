import mongoose from "mongoose";

export interface ITasks extends Document {
    _id: string;
    titulo: string;
    descripcion: string;
    estado: string;
}

const userSchema = new mongoose.Schema<ITasks> ({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    }
})

export const tasksModel = mongoose.model<ITasks>("Tasks", userSchema)