// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>; // DiaryEntry mutta comment excludattu

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>; 

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string; // Kysymysmerkki tarkoittaa, että tämä on optional eli ei ole pakko olla
}

export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
}

