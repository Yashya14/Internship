import { Router } from 'express';
import { assignUserRole, getAllAssignUserRoles, deleteAssignUserRole, editAssignUserRole } from './assignUserRole.controllers';
import authMiddleware from '../middlewares/authMiddleware';
import checkPermissions from '../middlewares/checkPermissions';

const router = Router();

router.post('/user-role', authMiddleware, checkPermissions(['assign_role']), assignUserRole);
router.get('/user-role', authMiddleware, checkPermissions(['view_assign_role']), getAllAssignUserRoles);
router.delete('/user-role/:id', authMiddleware, checkPermissions(['delete_assign_role']), deleteAssignUserRole);
router.put('/user-role/:id', authMiddleware, checkPermissions(['edit_assign_role']), editAssignUserRole);

export default router;