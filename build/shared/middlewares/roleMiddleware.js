"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deliveryManMiddleware = exports.customerMiddleware = exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    var _a;
    if (((_a = req.personData) === null || _a === void 0 ? void 0 : _a.role_id) !== 1) {
        console.log(req);
        return res.status(403).json({ message: 'Access denied. Admins only' });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
const customerMiddleware = (req, res, next) => {
    var _a;
    if (((_a = req.personData) === null || _a === void 0 ? void 0 : _a.role_id) !== 2) {
        return res.status(403).json({ message: 'Access denied. Customers only' });
    }
    next();
};
exports.customerMiddleware = customerMiddleware;
const deliveryManMiddleware = (req, res, next) => {
    var _a;
    if (((_a = req.personData) === null || _a === void 0 ? void 0 : _a.role_id) !== 3) {
        return res.status(403).json({ message: 'Access denied. Delivery Men only' });
    }
    next();
};
exports.deliveryManMiddleware = deliveryManMiddleware;
