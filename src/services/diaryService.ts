//import diaryData from '../../data/diaries.json';
import diaries from '../../data/diariesTs';
import { NewDiaryEntry, NonSensitiveDiaryEntry, DiaryEntry } from '../types';

// const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>; // as Array<DiaryEntry> lisäys piti tehdä koska json filen weather ja visibility ymmärretään stringinä. Tätä kutsutaan type assertioksi. Toinen vaihtoehto on viedä data .ts fileen ja exportata type muuttuja jossa data on -> const diaryEntries: Array<DiaryEntry> = [ {....data...} ]. Huom: Json-fileä ei voi tyypittää. 

const getEntries = () : DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry [] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};