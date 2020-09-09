// hakee datan, muokkaa dataa ja lisää uutta dataa.
import patients from '../../data/patientsTs';
import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getEntries = () : PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

// Katso läpi
const findPatient = (id: string): NonSensitivePatientEntry => {
  const patient = patients.find(patient => patient.id === id);
  
  if (!patient ) {
    throw new Error('Incorrect or missing id');
  }

  const copy = Object.assign({}, patient);
  delete copy.ssn;
  return copy;
};


const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: Math.floor(Math.random() * 1000).toString(), // ID generaattori
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findPatient
};