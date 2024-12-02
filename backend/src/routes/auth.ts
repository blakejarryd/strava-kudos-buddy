import { Router } from 'express';
import { stravaAuthService } from '../services/stravaAuth';

const router = Router();

router.get('/strava/url', (req, res) => {
  const authUrl = stravaAuthService.getAuthorizationUrl();
  res.json({ url: authUrl });
});

router.get('/strava/callback', async (req, res) => {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Authorization code is required',
    });
  }

  const result = await stravaAuthService.exchangeToken(code);
  
  if (!result.success) {
    return res.status(401).json(result);
  }

  // In a production environment, you would:
  // 1. Store the tokens securely
  // 2. Create a session or JWT
  // 3. Set secure cookies

  res.json(result);
});

export default router;
