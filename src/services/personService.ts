import { PersonRepository } from "../repositories/personRepository";
import { Person } from "../models/person";
import { DateUtils } from "../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET || "";
const saltRounds = 10;

export class PersonService {

  public static async login(email: string, password: string): Promise<string | null> {
    try {
      const person = await this.getPersonByEmail(email);

      if (!person) {
        return null;
      }
      console.log('Password received:', password);
      console.log('Person password:', person.password);
      const passwordMatch = await bcrypt.compare(password, person.password);

      if (!passwordMatch) {
        return null;
      }

      const payload = {
        id: person.id,
        email: person.email
      };
      return jwt.sign(payload, secretKey, { expiresIn: '1500m' });

    } catch (error: any) {
      throw new Error(`Error al logearse: ${error.message}`);
    }
  }

  public static async getAllPersons(): Promise<Person[]> {
    try {
      return await PersonRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener personas: ${error.message}`);
    }
  }

  public static async getPersonById(person_id: number): Promise<Person | null> {
    try {
      return await PersonRepository.findById(person_id);
    } catch (error: any) {
      throw new Error(`Error al encontrar persona: ${error.message}`);
    }
  }

  public static async getPersonByEmail(email: string): Promise<Person | null> {
    try {
      return await PersonRepository.findByEmail(email);
    } catch (error: any) {
      throw new Error(`Error al encontrar persona: ${error.message}`);
    }
  }

  public static async addPerson(person: Person): Promise<Person> {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        person.created_at = DateUtils.formatDate(new Date());
        person.updated_at = DateUtils.formatDate(new Date());
        person.password = await bcrypt.hash(person.password, salt);
        if (!person.role_id) {
            person.role_id = 2; 
        }
        return await PersonRepository.createPerson(person);
    } catch (error: any) {
        throw new Error(`Error al crear persona: ${error.message}`);
    }
}


  public static async modifyPerson(personId: number, personData: Person): Promise<Person | null> {
    try {
      const personFound = await PersonRepository.findById(personId);
      const salt = await bcrypt.genSalt(saltRounds);

      if (personFound) {
        if (personData.email) {
          personFound.email = personData.email;
        }
        if (personData.password) {
          personFound.password = await bcrypt.hash(personData.password, salt);
        }
        if (personData.deleted) {
          personFound.deleted = personData.deleted;
        }
        personFound.updated_by = personData.updated_by;
        personFound.updated_at = DateUtils.formatDate(new Date());
        return await PersonRepository.updatePerson(personId, personFound);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar persona: ${error.message}`);
    }
  }

  public static async deletePerson(personId: number): Promise<boolean> {
    try {
      return await PersonRepository.deletePerson(personId);
    } catch (error: any) {
      throw new Error(`Error al eliminar persona: ${error.message}`);
    }
  }
  
}
