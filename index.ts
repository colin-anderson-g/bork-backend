import express from 'express';

const app = express();
const PORT = 8000;
import {pool} from "./resources/db";
import bodyParser from 'body-parser';

app.use(express.json());
app.use(bodyParser.json());

// app.get('/borker', (req, res, next) => {
// 	// pool.query('SELECT * FROM bork_data.borker', (err, result) => {
// 	// 	if (err){
// 	// 		res.send('You encountered error: ' + err.stack);
// 	// 	}

        
// 	 res.send(next('/borker/get'));
//     // });
// });

app.listen(PORT, () => {
	console.log(`[server]: Server is running at https://localhost:${PORT}`);
});
