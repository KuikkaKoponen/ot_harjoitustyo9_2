import { Entry } from "../src/types";

const data: Array<Entry> = [
  { "id": "id-numero",
    "ssn": "090786-122X",
    "description": "description text",
    "creationDate": "2017-05-11",
    "specialist": "Lääkäri jaako",
    "diagnosis": "Hulluus"
  },
  {"id": "id-numero 2",
  "ssn": "090786-122X",
  "description": "kuvaus",
  "creationDate": "2017-05-11",
  "specialist": "Lääkäri Pekka",
  "diagnosis": "Nauruus"
}
];

/*
const entries: entries [] = data.map(obj => {
    const object = utils.toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    console.log(object);
    return object;
  });

*/

export default data;