// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

// enum säilyy compilationin jälkeen
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>; // DiaryEntry mutta comment excludattu
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries' >; // HUOM! korjaa entries pois jossain vaiheessa
export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;
//export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string; // Kysymysmerkki tarkoittaa, että tämä on optional eli ei ole pakko olla
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries?: Entry[]
}

//type Entry = {id: string};

// Enums are usually used when there is a set of predetermined values which are not expected to change in the future. Usually enums are used for much tighter unchanging values (for example weekdays, months, directions) but since they offer us a great way to validate our incoming values we might as well use them in our case.
export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}


// i.e. description, creation date, information regarding the specialist who created it and possible diagnosis codes. Diagnosis codes map to the ICD-10 codes returned from the /api/diagnoses endpoint. 
// Our naive implementation will be that a patient has an array of entries.

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

export interface SickLeave {
  startDate: string; 
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry
  | BaseEntry;

  // BaseEntry nyt ekstrana koska muuten toNewEntry funtion return entry herjasi koska luulee, että voisi olla myös pelkkä BaseEntry



