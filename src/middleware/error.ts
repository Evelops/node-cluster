import { ErrorRequestHandler,Request, Response, NextFunction} from 'express';

// error handling Middleware
const errorHandlingMiddleware = (err:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
    console.log('ERROR: ',err);
    res.status(500).json({message:'Server Error'});
}
export {errorHandlingMiddleware};