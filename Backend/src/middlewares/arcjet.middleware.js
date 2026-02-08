import aj from '../utils/arcjet.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import { isSpoofedBot } from '@arcjet/inspect';


export const arcjetProtection = asyncHandler(async (req, res, next) => {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
          throw new ApiError(429, "Rate limit exceeded. Please try again later");
        } else if (decision.reason.isBot()) {
          throw new ApiError(403, "Bot access denied");
        } else {
          throw new ApiError(403, "Access denied by security policy");
        }
    } 

    // Check for spoofed bots
    if (decision.results.some(isSpoofedBot)) {
        throw new ApiError(403, 'Malicious bot activity detected');
    }

    return next();
})