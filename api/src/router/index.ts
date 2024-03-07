import { Router } from 'express';

import monsterRouter from './monster.routes';
import battleRouter from './battle.routes';
const cors = require('cors');

const router = Router();

router.use('/monsters', cors(), monsterRouter);
router.use('/battle', cors(), battleRouter);

export default router;
