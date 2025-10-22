import mongoose, { Schema, model,Types } from "mongoose";
import { IUsuario } from "../interface/IUsuarios";

const usersSchema = new Schema<IUsuario>({
    nombre:{
        type: String,
        required: true
    },
    edad:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

export const UserSchema = mongoose.model<IUsuario>("User", usersSchema);
