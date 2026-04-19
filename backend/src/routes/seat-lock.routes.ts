import { Router } from 'express';
import { lockSeats, getLockedSeats } from '../controllers/seat-lock.controller.js';

const router = Router();

router.post('/lock', lockSeats);
router.get('/locked/:show_id', getLockedSeats);

export default router;
