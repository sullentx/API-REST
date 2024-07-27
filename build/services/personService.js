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
exports.PersonService = void 0;
const personRepository_1 = require("../repositories/personRepository");
const DateUtils_1 = require("../shared/utils/DateUtils");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = process.env.SECRET || "";
const saltRounds = 10;
class PersonService {
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const person = yield this.getPersonByEmail(email);
                if (!person) {
                    return null;
                }
                const passwordMatch = yield bcrypt_1.default.compare(password, person.password);
                if (!passwordMatch) {
                    return null;
                }
                const payload = {
                    id: person.id,
                    email: person.email,
                    role_id: person.role_id
                };
                console.log(payload.role_id);
                return jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '90m' });
            }
            catch (error) {
                throw new Error(`Error al logearse: ${error.message}`);
            }
        });
    }
    static getAllPersons() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield personRepository_1.PersonRepository.findAll();
            }
            catch (error) {
                throw new Error(`Error al obtener personas: ${error.message}`);
            }
        });
    }
    static getPersonById(person_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield personRepository_1.PersonRepository.findById(person_id);
            }
            catch (error) {
                throw new Error(`Error al encontrar persona: ${error.message}`);
            }
        });
    }
    static getPersonByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield personRepository_1.PersonRepository.findByEmail(email);
            }
            catch (error) {
                throw new Error(`Error al encontrar persona: ${error.message}`);
            }
        });
    }
    static addPerson(person) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                person.first_name = person.first_name;
                person.last_name = person.last_name;
                person.email = person.email;
                person.password = person.password;
                person.phone_number = person.phone_number;
                person.address = person.address;
                person.created_at = DateUtils_1.DateUtils.formatDate(new Date());
                person.created_by = person.email;
                person.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                person.updated_by = person.email;
                person.deleted = person.deleted;
                person.role_id = person.role_id;
                person.password = yield bcrypt_1.default.hash(person.password, salt);
                if (!person.role_id) {
                    person.role_id = 2;
                }
                console.log(person);
                person.deleted = false;
                return yield personRepository_1.PersonRepository.createPerson(person);
            }
            catch (error) {
                console.log(person);
                throw new Error(`Error al crear persona: ${error.message}`);
            }
        });
    }
    static modifyPerson(personId, personData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personFound = yield personRepository_1.PersonRepository.findById(personId);
                const salt = yield bcrypt_1.default.genSalt(saltRounds);
                if (personFound) {
                    if (personData.email) {
                        personFound.email = personData.email;
                    }
                    if (personData.password) {
                        personFound.password = yield bcrypt_1.default.hash(personData.password, salt);
                    }
                    if (personData.phone_number) {
                        personFound.phone_number = personData.phone_number;
                    }
                    if (personData.address) {
                        personFound.address = personData.address;
                    }
                    if (personData.deleted) {
                        personFound.deleted = personData.deleted;
                    }
                    if (personData.updated_by) {
                        personFound.updated_by = personData.updated_by;
                    }
                    personFound.updated_at = DateUtils_1.DateUtils.formatDate(new Date());
                    console.log(personFound);
                    return yield personRepository_1.PersonRepository.updatePerson(personId, personFound);
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error(`Error al modificar persona: ${error.message}`);
            }
        });
    }
    static deletePerson(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield personRepository_1.PersonRepository.deletePerson(personId);
            }
            catch (error) {
                throw new Error(`Error al eliminar persona: ${error.message}`);
            }
        });
    }
}
exports.PersonService = PersonService;
