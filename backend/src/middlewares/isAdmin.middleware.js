import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const isAdmin = asyncHandler(async(req,_,next)=>{
    const admin = req.user.role === "admin";
    if (!admin) {
        throw new ApiError(403, "Only admin can access this route");
    }
    next();
})