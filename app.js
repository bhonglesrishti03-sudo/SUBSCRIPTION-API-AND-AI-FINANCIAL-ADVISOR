

//bring the default export from the Express package and store it in the variable express
import express from 'express';

import {PORT} from './config/env.js'
// express default export is actually a function

// console.log({
//   token: process.env.QSTASH_TOKEN ? "exists" : "missing",
//   current: process.env.QSTASH_CURRENT_SIGNING_KEY ? "exists" : "missing",
//   next: process.env.QSTASH_NEXT_SIGNING_KEY ? "exists" : "missing",
// });


import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js'
import connectDB from './database/index.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import workflowRouter from './routes/workflow.routes.js';



const app = express(); // returns an Express Application object

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

//security practices
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(arcjetMiddleware);


//app.use is generally used with middlewares but we also use them when we need to use a route
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/users' , userRouter);
app.use('/api/v1/subscriptions' , subscriptionRouter);
app.use('/api/v1/workflows' , workflowRouter);


app.use(errorMiddleware);

app.get('/' , (req , res) => {
    res.send('Welcome to the Subscription Tracker API!');

}); // first route

app.listen(process.env.PORT, async() => {
  console.log('Subscription Tracker API is running on http://localhost:4000');

  await connectDB();
});// by just creating our first route our server will not listen so we have to make our server listen
// for request trying to access specific routes.

export default app; // by this other files can access app

