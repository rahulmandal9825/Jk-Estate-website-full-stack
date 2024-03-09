import { errorHandler } from "./error.js";
import  Jwt  from "jsonwebtoken";

const JWT_SECRET="rahuliswebdev";

 export const verifyToken = (req,res,next) =>{
        const token = req.cookies.access_token;
    if (!token) return next(errorHandler(401, 'Unauthorized'));

        Jwt.verify(token, JWT_SECRET, (err,user) => {
            if (err) return next(errorHandler(403, ' Forbiden'));
            req.user = user;

            next();

        });


 }