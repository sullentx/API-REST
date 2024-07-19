import { Request, Response } from 'express';
import { PersonService } from '../services/personService';

export const loginPerson = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await PersonService.login(email, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid email or password' });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const getPersons = async (_req: Request, res: Response) => {
  try {
    const persons = await PersonService.getAllPersons();
    if (persons) {
      res.status(200).json(persons);
    } else {
      res.status(404).json({ message: 'No records found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  try {
    const person = await PersonService.getPersonById(parseInt(req.params.person_id, 10));
    if (person) {
      res.status(200).json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const createPerson = async (req: Request, res: Response) => {
  try {
    const newPerson = await PersonService.addPerson(req.body);
    if (newPerson) {
      res.status(201).json(newPerson);
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  try {
    const updatedPerson = await PersonService.modifyPerson(parseInt(req.params.person_id, 10), req.body);
    if (updatedPerson) {
      res.status(200).json(updatedPerson);
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    res.status (500).json({ error: error.message });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  try {
    const deleted = await PersonService.deletePerson(parseInt(req.params.person_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'Person deleted.' });
    } else {
      res.status(400).json({ message: 'Something went wrong' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

