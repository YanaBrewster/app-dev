// Yanas set up code
const express = require('express');
const app = express();
const path = require('path');
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

// register a member ============================================================
// Yanas code

app.post('/registerMember', (req,res) =>{
  //checking if member is found in the db already
  Member.findOne({username:req.body.username},(err,memberResult)=>{
    if (memberResult){
      res.send('Members name is already taken. Please choose another name');
    } else{
      const hash = bcryptjs.hashSync(req.body.password); //hash the password
      const member = new Member({
        _id : new mongoose.Types.ObjectId,
        username : req.body.username,
        email : req.body.email,
        password : hash,
        about : req.body.about,
        location : req.body.location,
        website : req.body.website
      });

      member.save().then(result =>{
        // security measures
        res.send('Your account has been created, please login to activate your account');
      }).catch(err => res.send(err));
    }
  })
});

// get all members =============================================================
// Yanas code

app.get('/allMembers', (req,res) =>{
  Member.find().then(result =>{
    res.send(result);
  })
});

// login a member ==============================================================
// Yanas code

app.post('/loginMember', (req,res) =>{
  Member.findOne({username:req.body.username},(err,memberResult) => {
    if (memberResult){
      if (bcryptjs.compareSync(req.body.password, memberResult.password)){
        res.send(memberResult);
      } else {
        res.send('not authorized');
      }
    } else {
      res.send('Member not found. Please register');
    }
  });
});


// add an artwork to portfolio =================================================
// Yanas code

app.post('/addPortfolio', (req,res) =>{
  //checking if portfolio is found in the db already
  Portfolio.findOne({name:req.body.title},(err,portfolioResult)=>{
    if (portfolioResult){
      res.send('Artwork already added');
    } else{
      const portfolio = new Portfolio({
        _id : new mongoose.Types.ObjectId,
        title : req.body.title,
        description : req.body.description,
        image : req.body.image,
        category : req.body.category,
        price : req.body.price,
        memberId : req.body.memberId
      });

      portfolio.save().then(result =>{
        res.send(result);
      }).catch(err => res.send(err));
    }
  })
});

// get all portfolios ==========================================================
// Yanas code

app.get('/allPortfolios', (req,res) =>{
  Portfolio.find().then(result =>{
    res.send(result);
  })
});


//  Yanas code ends
// =============================================================================




















app.listen(port, () => console.log(`Example app listening on port ${port}!`))
