import dotenv from 'dotenv';
import passport from 'passport';
import User from '../model/userSchema';
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Types } from 'mongoose';
import { RequestHandler } from 'express';


export interface AuthenticatedRequest extends Request{

    user:{
        _id:Types.ObjectId;
    };
}

export type AuthenticatedRequestHandler = RequestHandler<any, any, any, any, AuthenticatedRequest>;


const opts : StrategyOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string,
};

passport.use(new JWTStrategy(opts, async(jwtPayload, done) =>{
    try{

        const user = await User.findById(jwtPayload._id).select("-password");
        if(!user){
            return done(null, false);
        }
        return done(null, user);
    }catch(error){
        console.error(`Error in jwt Authentication ${error}`);
        return done(error);
    }
}));

export default passport;