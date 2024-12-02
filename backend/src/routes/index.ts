import { Router } from 'express';
import authRoutes from './auth';
import kudosRoutes from './kudos';

const router = Router();

router.use('/auth', authRoutes);
router.use('/kudos', kudosRoutes);

export default router;
