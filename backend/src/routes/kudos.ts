import { Router } from 'express';
import { validateToken } from '../middleware/auth';
import { kudosComparisonService } from '../services/kudosComparison';
import { stravaApiService } from '../services/stravaApi';

const router = Router();

// Get kudos comparison between two athletes
router.get(
  '/compare/:targetAthleteId',
  validateToken,
  async (req, res) => {
    try {
      const targetAthleteId = parseInt(req.params.targetAthleteId);
      const { startDate, endDate } = req.query;
      const accessToken = req.headers.authorization?.split(' ')[1] || '';

      // In production, you would get the athleteId from the authenticated session
      const athleteId = parseInt(req.query.athleteId as string);

      const comparison = await kudosComparisonService.compareKudos(
        accessToken,
        {
          athleteId,
          targetAthleteId,
          startDate: startDate as string,
          endDate: endDate as string
        }
      );

      res.json(comparison);
    } catch (error) {
      console.error('Error comparing kudos:', error);
      res.status(500).json({
        error: 'Failed to compare kudos',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
);

// Search for athletes
router.get('/search/athletes', validateToken, async (req, res) => {
  try {
    const { query } = req.query;
    const accessToken = req.headers.authorization?.split(' ')[1] || '';

    if (!query) {
      return res.status(400).json({
        error: 'Query parameter is required'
      });
    }

    // Note: Strava doesn't provide a direct athlete search API
    // In a production app, you would need to implement a different
    // strategy for finding athletes, such as searching through
    // the user's followers/following list

    res.json({
      message: 'Athlete search not implemented in this version'
    });
  } catch (error) {
    console.error('Error searching athletes:', error);
    res.status(500).json({
      error: 'Failed to search athletes'
    });
  }
});

// Get athlete profile
router.get('/athlete/:id', validateToken, async (req, res) => {
  try {
    const athleteId = parseInt(req.params.id);
    const accessToken = req.headers.authorization?.split(' ')[1] || '';

    const profile = await stravaApiService.getAthleteProfile(
      accessToken,
      athleteId
    );

    res.json(profile);
  } catch (error) {
    console.error('Error fetching athlete profile:', error);
    res.status(500).json({
      error: 'Failed to fetch athlete profile'
    });
  }
});

export default router;
