import {IUser} from '../model/userSchema';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');

dotenv.config(); 

export const generateJwtToken = async (user : IUser) : Promise<String> => {

    const secretOrKey = process.env.JWT_KEY as string;
    const jwtToken = await jwt.sign(user.toJSON(), secretOrKey, {
        expiresIn:"1d",
    });
    return jwtToken;
};