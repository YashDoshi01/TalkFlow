const { initializeApp } = require( "firebase/app");
const {getAuth , createUserWithEmailAndPassword} = require("firebase/auth");
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


function signup (req , res){
  const { email, password } = req.body;

    createUserWithEmailAndPassword(newAuth, email, password)
  .then((userCredential) => {
    
    const user = userCredential.user;
    res.json(user);
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    res.json("error");
  });
}
module.exports = {signup};