import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

// routeri

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});


router.get('/:id', (_req, res) => {
  try {
    res.send(patientService.findPatient(_req.params.id));
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = utils.toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

// JATKA TÄSTÄ
router.post('/:id/entries', (req, res) => {
  try {
    // kutsu vastaan, tutki type, 
    console.log("POST ID:llä " + req.params.id);

    const newEntry = utils.toNewEntry(req.body); // tee tää eka
    console.log("eeee");
    console.log(newEntry);
    // tallentaa listaan. 
    //patientService.addEntry(newEntry); // sitte tää
    
    // kuittaa new entry tiedolla
    res.send(" Kuittaus"); // vaihda 200
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;