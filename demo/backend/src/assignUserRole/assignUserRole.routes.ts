import { Router } from 'express';
import { assignUserRole, getAllAssignUserRoles, deleteAssignUserRole, editAssignUserRole } from './assignUserRole.controllers';

const router = Router();

router.post('/user-role', assignUserRole);
router.get('/user-role', getAllAssignUserRoles);
router.delete('/user-role/:id', deleteAssignUserRole);
router.put('/user-role/:id', editAssignUserRole);

export default router;
