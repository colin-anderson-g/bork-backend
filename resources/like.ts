import express, { Router, RouterOptions } from 'express';
import bodyParser from 'body-parser';
import pool from './db';

const borkRouter = Router();

borkRouter.use(express.json());
borkRouter.use(bodyParser.json());

borkRouter.get('/', (req, res) => {
  pool.query('SELECT * FROM bork_data.likes', (err, result) => {
    if (err) {
      res.send(`You encountered error: ${err.stack}`);
    }

    res.send(result.rows);
  });
});

borkRouter.post('/likeBork', (req, res) => {
  const { bork_id } = req.body;

  pool.query(`update bork_data.borks set likes_count = likes_count + 1 where bork_id = ${bork_id}`, (err, result) => {
    if (err) {
      res.send(`You encountered error: ${err.stack}`);
    }
  });
});

borkRouter.post('/unlikeBork', (req, res) => {
    const { bork_id } = req.body;
  
    pool.query(`update bork_data.borks set likes_count = likes_count  1 where bork_id = ${bork_id}`, (err, result) => {
      if (err) {
        res.send(`You encountered error: ${err.stack}`);
      }
    });
  });

export default borkRouter;
