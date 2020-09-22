// hakee datan, muokkaa dataa ja lisää uutta dataa.
import patients from '../../data/patientsTs';
import {NonSensitivePatientEntry, PatientEntry, NewPatientEntry} from '../types';
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

/*
const addEntry = (entry: Entry) => {
  //tallenna uusi entry taulukkoon
};
*/

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: Math.floor(Math.random() * 1000).toString(), // ID-generaattori
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