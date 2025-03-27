import { Router } from 'express';
import getUsersWithRoles from './combinedData.controllers';

const router = Router();

router.get('/users-with-roles', getUsersWithRoles);

export default router;