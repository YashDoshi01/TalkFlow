const { initializeApp } = require( "firebase/app");
const {getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword} = require("firebase/auth");
const admin = require("firebase-admin");
// const {Pool} = require("pg");
const {pool} = require("../database/db");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let loggedin = false;
const firebaseConfig = {
  apiKey: "AIzaSyDXOoP1929e0fymcGm7Idt6CwtlUHT8Tso",
  authDomain: "talk-flow-58f4d.firebaseapp.com",
  projectId: "talk-flow-58f4d",
  storageBucket: "talk-flow-58f4d.appspot.com",
  messagingSenderId: "1000922500317",
  appId: "1:1000922500317:web:177e258d5876d9dab69f34",
  measurementId: "G-07E19M4RD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const newAuth = getAuth();
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const maxAge = 60*60;
function createToken(id)
{
  return jwt.sign({id} , 'secretbro' , {
    expiresIn : maxAge,
  });
}


 function signup (req , res){
  const { email, password , name } = req.body;

   
  createUserWithEmailAndPassword(newAuth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    
      pool.query(`
        INSERT INTO userInfo(id  , name)
        VALUES($1,$2);
        ` , [user.uid,name])
        .then((result) => {
          res.json(result.rows)
        })
        .catch(err => res.status(500).json(err))
    
    // res.json(user);
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      res.status(500).json({error : "already"});
    } else {
      res.status(400).json(error.message);
    }
    
  });
    }

  function login(req , res){
    const {email , password} = req.body;
    signInWithEmailAndPassword(newAuth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const newtoken = createToken(user.uid);
    // localStorage.setItem('token' , newtoken);
    // res.cookie('loggedin' ,true, { maxAge: 900000, httpOnly: true });
    console.log(newtoken);
    res.json({user,newtoken});
    // ...
  })
  .catch((error) => {
    res.cookie('loggedin' ,false, { maxAge: 900000, httpOnly: true });
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorCode === "auth/invalid-credential")
    res.status(500).json("nope");
  });
  }
    
  function checkLogin(req, res) {
    const token = req.body.token;
  
    if (token) {
      // Token exists, attempt to verify
      jwt.verify(token, 'secretbro', (err, decodedToken) => {
        if (err) {
          // Send the error as a JSON response
          res.json({ error: 'Token verification failed', details: err });
        } else {
          // Token is valid, send a success message
          res.json({ message: 'Logged in', user: decodedToken });
        }
      });
    } else {
      // No token found, send an appropriate response
      res.json({ error: 'No token provided' });
    }
  }
    

module.exports = {signup , login , checkLogin};