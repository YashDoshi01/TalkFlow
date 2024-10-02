// import firebase from "firebase/compat/app";  
// import { authen } from '../config/firebase-config.js';

import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Register(){
  
  const navigate = useNavigate();
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [pass , setPass] = useState(true);
    const [name,setName] = useState("");
    const [already , setAlready] = useState(true);
    
      const handleUserSignup = async (e) => {
        e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password , name}),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created:", data);
        navigate("/login");
        alert("Account created successfully , login to continue");
      } else {
        
        // console.error("Error creating user:", response.error);
        if(data.error === "error")
           setPass(false);
        if(data.error === "already")
          setAlready(false);
        // console.log(data.error)

      }
    } catch (error) {
      console.error("Error:", error);
    }

    }
    return(
        <div className="registerContainer">
            <Logo/>
            <Form handleSignUp = {handleUserSignup} email={email} setEmail={setEmail} password={password} setPassword={setPassword} navigate={navigate} pass= {pass} already = {already} name = {name} setName = {setName}/>
        </div>
    );
}
function Logo(){
    return (
        <div className="logo">
            <h1 className="title">Flow <span>Talk</span></h1>
            <p className="text">
            Welcome to Flow Talk! Connect instantly with friends, family, 
            or colleagues through private and group messaging. Enjoy real-time conversations,
             share images, and exchange files seamlessly. With secure user authentication,
              your chats remain private and safe. Sign up or log in to start
              chatting now!</p>
        </div>
    );
}
function Form({handleSignUp , email , setEmail , password  , setPassword , navigate ,pass , already , name , setName}){

    
    
    return (
        <div className="registerForm">
            <h1 className="head">Create Account </h1>
            <form className="formR" onSubmit={(e) => {
                handleSignUp(e)}}>
                <input type="text" className="textInput" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="email" className="textInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {(!already) && <p className='password'>email already in use</p>}
                <input type="password" className="textInput" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                {(!pass) ? <p className='password'>password must be atleast 6 letters</p>  : ""}
                {/* <input type="file" className="fileInput" id = "file" style={{display : "none"}}/>
                <label htmlFor="file" className="color fileInput">
                <svg className="w-6 h-6 text-gray-800  dark:text-white color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
                </svg>
                    <span>Upload an image</span>
                </label> */}
                <button className="registerButton">Register</button>
            </form>
            <h3 className="loginText" onClick={()=>{
              navigate("/login")
            }}>Already have an account ? Log in</h3>
        </div>
    );
}

Form.propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    pass:PropTypes.bool.isRequired,
    already:PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,

};
export default Register;
