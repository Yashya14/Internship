import { Router } from 'express';
import { assignUserRole, getAllUserRoles, deleteAssignUserRole, editUserRole } from '../controllers/assignUserRole.controllers';

const router = Router();

router.post('/user-role', assignUserRole);
router.get('/user-role', getAllUserRoles);
router.delete('/user-role/:id', deleteAssignUserRole);
router.put('/user-role/:id', editUserRole);

export default router;
