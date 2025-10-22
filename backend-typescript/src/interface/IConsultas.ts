import { IUsuario } from "./IUsuarios";

export interface IConsulta {
    selectOne?(email: string, password: string): Promise<IUsuario | null>;

}