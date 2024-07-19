import { ResultSetHeader } from 'mysql2';
import connection from '../shared/config/database';
import { Person } from '../models/person'

export class PersonRepository {

  public static async findAll(): Promise<Person[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT id, first_name, last_name, email, phone_number, address FROM person', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const persons: Person[] = results as Person[];
          resolve(persons);
        }
      });
    });
  }

  public static async findById(person_id: number): Promise<Person | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM person WHERE id = ?', [person_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const persons: Person[] = results as Person[];
          if (persons.length > 0) {
            resolve(persons[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByEmail(email: string): Promise<Person | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM person WHERE email = ?', [email], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const persons: Person[] = results as Person[];
          if (persons.length > 0) {
            resolve(persons[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }


  public static async createPerson(person: Person): Promise<Person> {
    const query = 'INSERT INTO person (first_name, last_name, email, password, phone_number, address, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.execute(query, [person.first_name, person.last_name, person.email, person.password, person.phone_number, person.address, person.role_id], (error, result: ResultSetHeader) => {
            if (error) {
                reject(error);
            } else {
                const createdPersonId = result.insertId;
                const createdPerson: Person = { ...person, id: createdPersonId };
                resolve(createdPerson);
            }
        });
    });
}


  public static async updatePerson(person_id: number, personData: Person): Promise<Person | null> {
    const query = 'UPDATE person SET first_name = ?, last_name = ?, email = ?, password = ?, phone_number = ?, address = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [personData.first_name, personData.last_name, personData.email, personData.password, personData.phone_number, personData.address, personData.updated_at, personData.updated_by, personData.deleted, person_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedPerson: Person = { ...personData, id: person_id };
            resolve(updatedPerson);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deletePerson(person_id: number): Promise<boolean> {
    const query = 'DELETE FROM person WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [person_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
