import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const isAdmin = asyncHandler(async(req,_,next)=>{
    const admin = req.user.role === "admin";
    if (!admin) {
        throw new ApiError(403, "Only admin can access this route");
    }
    next();
})