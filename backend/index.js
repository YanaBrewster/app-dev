// Yanas set up code
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const config = require('./config.json'); // store creditials
const Comment = require('./models/comment.js');
const Member = require('./models/member.js');
const Portfolio = require('./models/portfolio.js');

const port = 5000;

app.get('/', (req, res) => res.send('Hello World from Hayley, Rahul and Yana!'))

const mongodbURI = `mongodb+srv://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_CLUSTER_NAME}-tvmnw.mongodb.net/test?retryWrites=true&w=majority`
mongoose.connect(mongodbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB connected'))
.catch(err =>{
  console.log(`DBConnectionError: ${err.message}`);
});

// test connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('We are connected to MongoDB');
});

// connect endpoints
app.use((req,res,next)=>{
  console.log(`${req.method} request for ${req.url}`);
  next();//include this to go to the next middleware
});

// include body-parser, cors, bcryptjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
