import { Router } from 'express';
import { getUsersWithRoles } from '../controllers/combinedData.controllers';

const router = Router();

router.get('/users-with-roles', getUsersWithRoles);

export default router;