import { Request, Response, NextFunction } from 'express';
import { stravaAuthService } from '../services/stravaAuth';

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Here you would:
    // 1. Verify the token
    // 2. Check if it's expired
    // 3. Refresh if necessary
    // 4. Attach user info to request

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
    });
  }
};
