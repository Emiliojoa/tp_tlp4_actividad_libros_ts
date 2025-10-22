import { Types } from "mongoose";

export interface IUsuario {
    _id?: Types.ObjectId | string;
    nombre: string;
    email: string;
    password: string;
    edad: number;
}
