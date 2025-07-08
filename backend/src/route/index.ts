import express from "express";
import authRoute from './authRoute';
import passport from "passport";
import userRoutes from  "./userRoutes";

const router = express.Router();

router.use('/auth', authRoute);
router.use(
    "/user", 
    passport.authenticate("jwt", {session:false}),
    userRoutes
);

export default router;
