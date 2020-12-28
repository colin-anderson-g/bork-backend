import express, { Router, RouterOptions } from 'express';
import bodyParser from 'body-parser';
import { pool } from './db';

const borkRouter = Router();

borkRouter.use(express.json());
borkRouter.use(bodyParser.json());

borkRouter.get('/', (req, res) => {
  pool.query('SELECT * FROM bork_data.borks', (err, result) => {
    if (err) {
      res.send(`You encountered error: ${err.stack}`);
    }

    res.send(result.rows);
  });
});

borkRouter.post('/testInsert', (req, res) => {
  pool.query('insert into bork_data.borks(content, likes_count, time_borked, username) values(\'First bork LOL\', 5, current_timestamp, \'BigPenis69\')', (err, result) => {
    if (err) {
      res.send(`You encountered error: ${err.stack}`);
    }

    res.send(result.rows);
  });
});

borkRouter.post('/insert', (req, res) => {
  const { username } = req.body;
  const { content } = req.body;

  pool.query(`insert into bork_data.borks(content, likes_count, time_borked, username) values('${content}', 0, current_timestamp, '${username}')`, (err, result) => {
    if (err) {
      res.send(`You encountered error: ${err.stack}`);
    }

    res.send(result.rows);
  });
});

export default borkRouter;
