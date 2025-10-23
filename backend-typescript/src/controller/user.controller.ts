import { Response, Request } from "express";
import { UserSchema } from "../model/userModel";
import { IUsuario } from "../interface/IUsuarios";

export const createUser = async (req:Request, res:Response):Promise<IUsuario | void> => {
    try {
        const {nombre, edad, email, password} = req.body;
        console.log(req.body)
        if (!nombre || !edad || !email || !password) {

            res.status(400).json({message: "Todos los campos son obligatorios"});
            return;
        }
        const newUser = new UserSchema({nombre, edad, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    }catch (error) {
        res.status(500).json({message: "Error al crear el usuario", error});
}}



export const loginUser = async (req:Request, res:Response):Promise<void> => {
    const {email, password} = req.body;
    try {
        const user = await UserSchema.findOne({email, password});
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
}