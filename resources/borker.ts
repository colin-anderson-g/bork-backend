import express from 'express';
import pool from "./db";
import bodyParser from 'body-parser';
import { Router } from 'express';

const borkerRouter = Router();

borkerRouter.use(express.json());
borkerRouter.use(bodyParser.json());

borkerRouter.get('/', (req, res) => {
	pool.query('SELECT * FROM bork_data.borker', (err, result) => {
		if (err){
			res.send('You encountered error: ' + err.stack);
		}

		res.send(result.rows);
	});
});

borkerRouter.post('/testInsert', (req, res) => {
	pool.query('insert into bork_data.borker values(\'test_1\', \'test_2\', \'test_bio\', current_timestamp)', (err, result) => {
		if (err){
			res.send('You encountered error: ' + err.stack);
		}

		res.send(result.rows);
	});
});

export default borkerRouter;