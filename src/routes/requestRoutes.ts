import { Router } from 'express';
import { getRequests, getRequestById, createRequest, updateRequest, deleteRequest, updateRequestStatus } from '../controllers/requestController';
import { authMiddleware } from '../shared/middlewares/auth';
import { customerMiddleware } from '../shared/middlewares/roleMiddleware';

const routerRequest = Router();

routerRequest.get('/requests', getRequests);
routerRequest.get('/requests/:id', getRequestById);
routerRequest.post('/requests/addcarrito',authMiddleware,customerMiddleware ,createRequest);
routerRequest.put('/requests/:id', updateRequest);
routerRequest.delete('/requests/:id', deleteRequest);
routerRequest.patch('/requests/:id/status', authMiddleware,customerMiddleware ,updateRequestStatus);

export default routerRequest;
