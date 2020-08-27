/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewDiaryEntry } from './types';

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  return {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  };
};

// If the type guard function returns true, the TypeScript compiler knows that the tested variable has the type that was defined in the type predicate
// isString is a function which returns a boolean and which has a type predicate as the return type
const isString = (text: any): text is string => {  // 'text is string' = type predicate 
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error('Incorrect or missing comment: ' + comment);
  }
  return comment;
};

// we can't use a type guard here since a date in this case is only considered to be a string
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

/*
const isWeather = (str: any): str is Weather => {
  return ['sunny', 'rainy', 'cloudy', 'stormy' ].includes(str);
};
*/

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
      throw new Error('Incorrect or missing weather: ' + weather);
  }
  return weather;
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
      throw new Error('Incorrect or missing visibility: ' + visibility);
  }
  return visibility;
};

export default toNewDiaryEntry;