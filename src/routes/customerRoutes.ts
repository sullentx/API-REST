import { Router } from 'express';
import { getPersonById, createPerson, updatePerson, deletePerson, loginPerson,getPersons } from '../controllers/personController';
import { authMiddleware } from '../shared/middlewares/auth';
import { adminMiddleware } from '../shared/middlewares/roleMiddleware';

const personRoutes: Router = Router();

personRoutes.post('/login', loginPerson);

personRoutes.post('/', createPerson);
personRoutes.put('/:person_id', authMiddleware, adminMiddleware, updatePerson);
personRoutes.delete('/:person_id', authMiddleware, adminMiddleware, deletePerson);
personRoutes.get('/persons',authMiddleware,adminMiddleware,getPersons);

personRoutes.get('/:person_id', authMiddleware, getPersonById);

export default personRoutes;
 