const { initializeApp } = require( "firebase/app");
const {getAuth , createUserWithEmailAndPassword} = require("firebase/auth");
const admin = require("firebase-admin");
const {Pool} = require("pg");

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


function signup (req , res){
  const { email, password } = req.body;

   
  createUserWithEmailAndPassword(newAuth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    res.json(user);
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      res.status(500).json({error : "already"});
    } else {
      res.status(400).json({error : "error"});;
    }
    
  });
    }
    

    

module.exports = {signup};