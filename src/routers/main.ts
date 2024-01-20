import express, { Express, Request, Response, NextFunction, Router } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('root render');
  try {
  } catch (error) {
    next(error);
  }
});

export default router;
