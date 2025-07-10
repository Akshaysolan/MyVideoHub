import { AuthenticatedRequestHandler } from "../config/passportJwtStrategy";
import User from "../model/userSchema";
import { sendResponse } from "../utils/sendResponse";

export const getUserDetails : AuthenticatedRequestHandler = async(req, res) =>{
    try{
        if(req.user instanceof User){
            const userId = req.user._id;
            if(!userId){
                return sendResponse(res, 400, false, 'Please sign in to continue');
            }
            const user = await User.findById(userId).select("-password");
            if(!user){
                return sendResponse(res, 404, false, 'User Not found');
            }
            sendResponse(res, 200, true, 'User details found', {user})
        }
    }catch(error){
        console.log(`Error in sending user Details ${error}`);
        sendResponse(res, 400, false, "Internal Server error");
    }
};


export const updateUser : AuthenticatedRequestHandler = async(req, res)=>{
    try{
    
        const {name, email} = req.body;
        if(!name){
            return sendResponse(res, 400, false, "Name is Required");
        }
        if(!email){
            return sendResponse(res, 400, false, "Email is Required");
        }
        if(req.user instanceof User){
            const userId = req.user._id;
            if(!userId){
                return sendResponse(res, 404, false, "User id is not found");
            }
            const user = await User.findById(userId);
            if(!user){
                return sendResponse(res, 404, false, "User not found");
            }
            sendResponse(res, 200, true, "Successfully updated your details",{
                name,
                email,
            });
        }
    }catch(error){
        console.log(`Error in Updating user Details ${error}`);
        sendResponse(res, 500, false, "Internal Server error");
    }
};