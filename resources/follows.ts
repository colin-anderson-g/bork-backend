import express, { Router, RouterOptions } from 'express';
import bodyParser from 'body-parser';
import pool from './db';

const followRouter = Router();

followRouter.use(express.json());
followRouter.use(bodyParser.json());

followRouter.get('/', (req, res) => {
    pool.query('SELECT * FROM bork_data.follows', (err, result) => {
        if (err) {
            res.send(`You encountered error: ${err.stack}`);
        }

        res.send(result.rows);
    });
});

followRouter.post('/follow', (req, res) => {
    const { following } = req.body;
    const { follower } = req.body;

    pool.query(`insert into bork_data.follows(username, follower) values('${following}','${follower}')`, (err, result) => {
        if (err) {
            res.send(`You encountered error: ${err.stack}`);
        }
    });
});

followRouter.post('/unfollow', (req, res) => {
    const { following } = req.body;
    const { follower } = req.body;

    pool.query(`delete from bork_data.follows where username = '${following}' and follower = '${follower}')`, (err, result) => {
        if (err) {
            res.send(`You encountered error: ${err.stack}`);
        }
    });
});

followRouter.get('/userFollowers', (req, res) => {
    const { activeUser } = req.body;

    pool.query(`select follower from bork_data.follows where username = '${activeUser}`, (err, result) => {
        if (err) {
            res.send(`You encountered error: ${err.stack}`);
        }

        res.send(result.rows);
    });
});

followRouter.get('/userIsFollowing', (req, res) => {
    const { activeUser } = req.body;

    pool.query(`select username from bork_data.follows where follower = '${activeUser}`, (err, result) => {
        if (err) {
            res.send(`You encountered error: ${err.stack}`);
        }

        res.send(result.rows);
    });
});


export default followRouter;
