const express = require('express');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error.js')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
// importing routes
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute.js');
const orderRoute = require('./routes/orderRoute.js');

const app = express();
const dotenv = require('dotenv');
app.use(cors());            // to allow react app to make call
// created environment
app.use(express.json()); // if we don't do that we will not be able to use req.body to access data
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
dotenv.config({path:"backend/config/config.env"})

// using routes
app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute)
// error middleware 
app.use(errorMiddleware)

module.exports = app;