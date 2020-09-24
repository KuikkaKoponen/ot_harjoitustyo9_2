// hakee datan, muokkaa dataa ja lisää uutta dataa.
import patients from '../../data/patientsTs';
import {NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry} from '../types';
import diagnoseEntries from '../../data/diagnosesTs';

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

const findPatient = (id: string): PatientEntry => {
  
  const patient =  patients.find(patient => patient.id === id);
  if (!patient ) {
    throw new Error('Incorrect or missing id');
  }

  // Aika karmeen näkönen.
  if (patient.entries) {
    patient.entries.forEach(entry => {  
      if (entry.diagnosisCodes) {
        entry.diagnosisCodes.forEach((diagnosisCode, index) => { 
          // en tiedä miksi piti uudestaan laittaa tämä tarkistus
          if(entry.diagnosisCodes) {
          // en saanut muuten kuin tällä indeksillä muutettua.
            entry.diagnosisCodes[index] = returnDiagnosis(diagnosisCode);}
        });
      }
    });
  }
  
  function returnDiagnosis(code: string ): string {
      const entry = diagnoseEntries.find(diagnose => diagnose.code === code);
      if(entry) return code + ": " + entry.name;
      return code;
  }

  return patient;  
};


const addEntry = (id: string, newEntry: Entry): Entry => {
  const patient =  patients.find(patient => patient.id === id); 
  // tää pitäs tehä myöhemmin. Nyt id annettu
  /*
  const entryWithId = {
    id2: Math.floor(Math.random() * 1000).toString(), // ID-generaattori
    ...newEntry
  };
  */

  if (patient && patient.entries) {
    patient.entries.push(newEntry);
    return newEntry;
  } else if (patient) {
    patient.entries = [newEntry];
    return newEntry;
  }
  throw new Error('Incorrect or missing patient');

};


const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: Math.floor(Math.random() * 1000).toString(), // ID-generaattori
    ...entry
  };
  console.log(newPatientEntry);
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  addEntry,
  findPatient
};