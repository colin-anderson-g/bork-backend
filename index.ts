import express from 'express';
import bodyParser from 'body-parser';
import borkRouter from './resources/bork';
import borkerRouter from './resources/borker';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use('/bork', borkRouter);
app.use('/borker', borkerRouter);


app.listen(PORT, () => {
	console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
