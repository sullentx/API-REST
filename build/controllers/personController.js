"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePerson = exports.updatePerson = exports.createPerson = exports.getPersonById = exports.getPersons = exports.loginPerson = void 0;
const personService_1 = require("../services/personService");
const loginPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const token = yield personService_1.PersonService.login(email, password);
        if (!token) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
        else {
            res.status(200).json({ token });
        }
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginPerson = loginPerson;
const getPersons = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const persons = yield personService_1.PersonService.getAllPersons();
        if (persons) {
            res.status(200).json(persons);
        }
        else {
            res.status(404).json({ message: 'No records found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getPersons = getPersons;
const getPersonById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const person = yield personService_1.PersonService.getPersonById(parseInt(req.params.person_id, 10));
        if (person) {
            res.status(200).json(person);
        }
        else {
            res.status(404).json({ message: 'Person not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getPersonById = getPersonById;
const createPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPerson = yield personService_1.PersonService.addPerson(req.body);
        if (newPerson) {
            res.status(201).json(newPerson);
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
});
exports.createPerson = createPerson;
const updatePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPerson = yield personService_1.PersonService.modifyPerson(parseInt(req.params.person_id, 10), req.body);
        if (updatedPerson) {
            res.status(200).json(updatedPerson);
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updatePerson = updatePerson;
const deletePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield personService_1.PersonService.deletePerson(parseInt(req.params.person_id, 10));
        if (deleted) {
            res.status(200).json({ message: 'Person deleted.' });
        }
        else {
            res.status(400).json({ message: 'Something went wrong' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deletePerson = deletePerson;
