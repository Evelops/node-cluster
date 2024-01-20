import { Request, Response, NextFunction} from 'express';

// IP Traking Middleware 
const trackingIpMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const clientIp:string = req.ip as string;
    console.log(`Request from IP: ${clientIp}`);
    next();
} 

export {trackingIpMiddleware};
