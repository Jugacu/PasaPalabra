import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import {MONGODB_URI} from './util/secrets';

// Controllers (route handlers)
import * as homeController from './api/controllers/home';
import * as questionaryController from './api/controllers/questionary';

// Create Express server
const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI + '', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => console.log('Connected to Mongo.'))
    .catch((err: any) => console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err));
mongoose.set('useCreateIndex', true);

// Express configuration
app.set('port', process.env.PORT || 3500);
app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/questionary/random', questionaryController.random);


export default app;
