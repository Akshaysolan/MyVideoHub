import express from 'express';
const router = express.Router();
import authRoute from './authRoute';
import passport = require('passport');
import { getUserDetails } from '../controller/userController';

router.get("/profile", getUserDetails);


export default router;
