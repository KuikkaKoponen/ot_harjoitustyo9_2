import diagnoses from '../../data/diagnosesTs';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};