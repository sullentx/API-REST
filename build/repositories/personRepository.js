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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonRepository = void 0;
const database_1 = __importDefault(require("../shared/config/database"));
class PersonRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT id, first_name, last_name, email, phone_number, address FROM person', (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const persons = results;
                        resolve(persons);
                    }
                });
            });
        });
    }
    static findById(person_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM person WHERE id = ?', [person_id], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const persons = results;
                        if (persons.length > 0) {
                            resolve(persons[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                database_1.default.query('SELECT * FROM person WHERE email = ?', [email], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const persons = results;
                        if (persons.length > 0) {
                            resolve(persons[0]);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static createPerson(person) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO person (first_name, last_name, email, password, phone_number, address, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [person.first_name, person.last_name, person.email, person.password, person.phone_number, person.address, person.role_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const createdPersonId = result.insertId;
                        const createdPerson = Object.assign(Object.assign({}, person), { id: createdPersonId });
                        resolve(createdPerson);
                    }
                });
            });
        });
    }
    static updatePerson(person_id, personData) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE person SET first_name = ?, last_name = ?, email = ?, password = ?, phone_number = ?, address = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [personData.first_name, personData.last_name, personData.email, personData.password, personData.phone_number, personData.address, personData.updated_at, personData.updated_by, personData.deleted, person_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            const updatedPerson = Object.assign(Object.assign({}, personData), { id: person_id });
                            resolve(updatedPerson);
                        }
                        else {
                            resolve(null);
                        }
                    }
                });
            });
        });
    }
    static deletePerson(person_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM person WHERE id = ?';
            return new Promise((resolve, reject) => {
                database_1.default.execute(query, [person_id], (error, result) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (result.affectedRows > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                });
            });
        });
    }
}
exports.PersonRepository = PersonRepository;
