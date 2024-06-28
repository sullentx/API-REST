import { Request } from "express";
import { CustomerPayload } from "./customerPayLoad";

export interface AuthRequest extends Request {
    customerData?: CustomerPayload;
}
