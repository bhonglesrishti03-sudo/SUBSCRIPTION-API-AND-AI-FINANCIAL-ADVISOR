//bring the default export from the Express package and store it in the varaible express
import express from 'express';

import {PORT} from './config/env.js'
// express default export is actually a function
const app = express(); // returns an Express Application object

app.get('/' , (req , res) => {
    res.send('Welcome to the Subscription Tracker API!');
}); // first route

app.listen(3000 , () => {
  console.log('Subscription Tracker API is running on http://localhost:3000')
}) // by just creating our first route our server will not listen so we have to make our server listen
// for request trying to access specific routes.

export default app; // by this other files can access app
