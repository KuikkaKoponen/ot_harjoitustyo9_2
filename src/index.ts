import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

// ohjataan diaryRouter jossa vain '/' tähän päätteeseen. Helppoa
app.use('/api/diaries', diaryRouter);
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


/// muuta. Async-Await. Jos funtio palauttaa promisen niin tällaisen voi pysäyttää awaitillä, eli silloin odotetaan kunnes promis on resolved. Muuten jatkaisi eteenpäin. 