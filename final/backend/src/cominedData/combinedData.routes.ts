import { Router } from 'express';
import getUsersWithRoles, { getSingleUserWithRoles } from './combinedData.controllers';
import authMiddleware from '../middlewares/authMiddleware';
import checkPermissions from '../middlewares/checkPermissions';

const router = Router();

router.get('/users-with-roles', authMiddleware, checkPermissions(['view_user']), getUsersWithRoles);
router.get('/users-with-roles/:id', authMiddleware, checkPermissions(['view_user']), getSingleUserWithRoles);

export default router;