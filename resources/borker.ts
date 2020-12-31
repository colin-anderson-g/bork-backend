import express from 'express';
import pool from "./db";
import bodyParser from 'body-parser';
import { Router } from 'express';

const borkerRouter = Router();

borkerRouter.use(express.json());
borkerRouter.use(bodyParser.json());

borkerRouter.get('/', (req, res) => {
	pool.query('SELECT * FROM bork_data.borker', (err, result) => {
		if (err) {
			res.send('You encountered error: ' + err.stack);
		}

		res.send(result.rows);
	});
});

borkerRouter.post('/testInsert', (req, res) => {
	pool.query('insert into bork_data.borker values(\'test_1\', \'test_2\', \'test_bio\', current_timestamp)', (err, result) => {
		if (err) {
			res.send('You encountered error: ' + err.stack);
		}
	});
});


borkerRouter.post('/insert', (req, res) => {
	const { username } = req.body;
	const { display_name } = req.body;
	const { bio_content } = req.body;


	pool.query(`insert into bork_data.borker(username, display_name, bio_content, time_created) 
				values('${username}', ${display_name}, ${bio_content}, current_timestamp)`, (err, result) => {
		if (err) {
			res.send(`You encountered error: ${err.stack}`);
		}
	});
});

borkerRouter.post('/changeDisplayName', (req, res) => {
	const { username } = req.body;
	const { new_display_name } = req.body;


	pool.query(`update bork_data.borker set display_name = '${new_display_name}' where username = '${username}`, (err, result) => {
		if (err) {
			res.send(`You encountered error: ${err.stack}`);
		}
	});
});

borkerRouter.post('/changeBioContent', (req, res) => {
	const { username } = req.body;
	const { new_bio_content } = req.body;


	pool.query(`update bork_data.borker set bio_content = '${new_bio_content}' where username = '${username}`, (err, result) => {
		if (err) {
			res.send(`You encountered error: ${err.stack}`);
		}
	});
});

export default borkerRouter;