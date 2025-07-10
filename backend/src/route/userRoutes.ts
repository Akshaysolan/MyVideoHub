import express from 'express';
const router = express.Router();
import authRoute from './authRoute';
import passport = require('passport');
import { getUserDetails, updateUser } from '../controller/userController';

router.get("/profile", getUserDetails);
router.post("/update", updateUser);


export default router;
