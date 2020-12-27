import express from 'express';

const app = express();
const PORT = 8000;
import {pool} from "./db";
import bodyParser from 'body-parser';
import { nextTick } from 'process';

app.use(express.json());
app.use(bodyParser.json());




app.get('/bork/get', (req, res, next) => {
	pool.query('SELECT * FROM bork_data.borker', (err, result) => {
		if (err){
			res.send('You encountered error: ' + err.stack);
		}

		res.send(result.rows);
	});
});

app.post('/bork/testInsert', (req, res) => {
	pool.query('insert into bork_data.borks(content, likes_count, time_borked, username) values(\'First bork LOL\', 5, current_timestamp, \'BigPenis69\')', (err, result) => {
		if (err){
			res.send('You encountered error: ' + err.stack);
		}

		res.send(result.rows);
	});
});

app.listen(PORT, () => {
	console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
