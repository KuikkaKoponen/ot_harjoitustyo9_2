/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewDiaryEntry, Weather, Visibility } from './types';
import { NewPatientEntry, Gender, Entry, SickLeave, Discharge, HealthCheckRating } from './types';

// saa postin mukana tulleen objectin (type = any), parsii sen ja varmistaa, että vastaa oikee typeä

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment)
  };
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation)
  };
};

const toNewEntry = (object: any): Entry => { 
  // Baseentry: id, date, description, specialist, diagnosisCodes?
  // HealthCheckEntry: type, healthCheckRating
  // HospitalEntry: type, description, discharge
  // OccupationalHealthcareEntry: type, description, employer, sickLeave, 
  
  let entry = {
    id: parseString(object.id),
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist)
  };

  if (object.diagnosisCodes) {
      const diagnoses = {diagnoses: parseStringArray(object.diagnosisCodes)};
      entry = Object.assign(entry, diagnoses);
  }

  switch (object.type) {
    case "Hospital":
      const a = {
        type: parseString(object.type),
        description: parseString(object.description),
        discharge: parseDischarge(object.discharge)
      };
      entry = Object.assign(entry, a);
      break;
    case "OccupationalHealthcare":
      const b = {
        type: parseString(object.type),
        description: parseString(object.description),
        employerName: parseString(object.employerName), 
      };
      if (object.sickLeave) {
        const sickLeave = {sickLeave: parseSickLeave(object.sickLeave)};
        entry = Object.assign(entry, b, sickLeave);
      } else {
        entry = Object.assign(entry, b);
    }  
      break;
    case "HealthCheck":
      const c = {
        type: parseString(object.type),
        healthCheckRating: parsehealthCheckRating(object.healthCheckRating), 
      };
      entry = Object.assign(entry, c);
      break;
    default: 
      throw new Error('entry type missing');
  }
  
  return entry;
};  


const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // tämä on boolean
  console.log(param);
  return Object.values(HealthCheckRating).includes(param);
};


const parsehealthCheckRating = (number: any): HealthCheckRating => {
  // jostain syystä nolla (0) tulkitaan !number nulliksi/falseksi
  if (!isHealthCheckRating(number)) {
    throw new Error('Incorrect or missing helthcheck rating');
  }
  return number;
};  


const parseStringArray = (array: any): string[] => {
  if (!array || !Array.isArray(array)) {
    throw new Error('Incorrect or missing array');
  }
  const checkedArray = array.map(item => parseString(item));
  if (checkedArray) {
    return checkedArray;
  }
  
  throw new Error('Incorrect or missing array items');  
};

const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (sickLeave.startDate && sickLeave.endDate && isString(sickLeave.startDate) && isString(sickLeave.endDate)) {
    return true;
  } else return false;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

const isDischarge = (discharge: any): discharge is Discharge => {
  console.log(discharge);
  if (discharge.date && discharge.criteria && isString(discharge.date) && isString(discharge.criteria)) {
    return true;
  } else return false;
};

// discharge: {date: string, criteria: string };
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge) ) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

// If the type guard function returns true, the TypeScript compiler knows that the tested variable has the type that was defined in the type predicate
// isString is a function which returns a boolean and which has a type predicate as the return type
const isString = (text: any): text is string => {  // 'text is string' = type predicate // eli ilmeisesti kertoo boolean lisäksi tyypin
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
  return comment;
};

// we can't use a type guard here since a date in this case is only considered to be a string
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date');
  }
  return date;
};

/*
const isWeather = (str: any): str is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'stormy' ].includes(str);
};
*/

// Tyyppi vaihdettiin enumiksi, koska ylläolevalla tyylillä jouduttaisiin pitämään 'sunny' ym. tietoja kahdessa paikkaa.
// enum säilyy käännöksen jälkeen
const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather');
  }
  return weather;
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing visibility');
  }
  return visibility;
};

const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing data');
  }
  return param;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export default {
  toNewDiaryEntry,
  toNewPatientEntry,
  toNewEntry  
};