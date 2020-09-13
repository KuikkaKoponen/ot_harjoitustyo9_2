// hakee datan, muokkaa dataa ja lisää uutta dataa.
import patients from '../../data/patientsTs';
import {NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';
//import diagnoseEntries from '../../data/diagnosesTs';

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
const findPatient = (id: string): PatientEntry => {
  const patient =  patients.find(patient => patient.id === id);
  if (!patient ) {
    throw new Error('Incorrect or missing id');
  }

  // jatka tästä. Googlaa miten listan alkioita saa muokattua
  if (patient.entries !== undefined) {
    patient.entries.forEach(entry => {  
      if (entry.diagnosisCodes) {
        entry.diagnosisCodes.forEach(diagnosisCode => {
        //const name: string = diagnoseEntries.find(diagnose => diagnose.code === diagnosisCode);
        const name = "testi";
        return `${diagnosisCode} ${name}`;
        });
      }        
    });
  }  

  // Patient data
  //const entries = patientEntries.filter(entry => entry.ssn === patient.ssn);
  // Let's create union
  //const copy = Object.assign({entries}, patient);
  return patient;
  
};

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