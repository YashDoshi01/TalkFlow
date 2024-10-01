import PropTypes from 'prop-types';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



function Login(){
  const navigate = useNavigate();
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
      const handleUserLogin = async (e) => {
        e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User Loggedin:", data);
        navigate("/");
      } else {
        console.error("Error logging in the  user:", response.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    }
    return(
        <div className="registerContainer">
            
            <Form handleLogin = {handleUserLogin} email={email} setEmail={setEmail} password={password} setPassword={setPassword} navigate={navigate}/>
            <Logo/>
        </div>
    );
}
function Logo(){
    return (
        <div className="logo">
            <h1 className="title">Flow <span>Talk</span></h1>
            <p className="text">
            Welcome Back to Flow Talk! Get back to Connecting instantly with friends, family, 
            or colleagues through private and group messaging. Enjoy real-time conversations,
             share images, and exchange files seamlessly. With secure user authentication,
              your chats remain private and safe. Sign up or log in to start
              chatting now!</p>
        </div>
    );
}
function Form({handleLogin , email , setEmail , password  , setPassword , navigate}){

    
    
    return (
        <div className="registerForm">
            <h1 className="head">Login </h1>
            <form className="formR" onSubmit={(e) => {
                handleLogin(e)}}>
                
                <input type="email" className="textInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" className="textInput" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="file" className="fileInput" id = "file" style={{display : "none"}}/>
                {/* <label htmlFor="file" className="color fileInput">
                <svg className="w-6 h-6 text-gray-800  dark:text-white color" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
                </svg>
                    <span>Upload an image</span>
                </label> */}
                <button className="registerButton">Login</button>
            </form>
            <h3 className="loginText" onClick={()=>{
              navigate("/register")
            }}>Dont have an account ? Create now</h3>
        </div>
    );
}

Form.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,

};
export default Login;