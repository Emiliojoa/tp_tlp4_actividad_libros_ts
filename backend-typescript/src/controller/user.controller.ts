import { promises } from "dns";
import { Response, Request } from "express";


// export const loginUser = async (req:Request, res:Response):Promise<void> => {
//     const {email, password} = req.body;
//     try {
//         const user = await ServiceUsers.loginService(email, password);
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(401).json({ message: "Invalid credentials" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// }