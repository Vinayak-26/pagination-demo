import React, { useState } from "react";
import './styles.css';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [registerUsername, setRegUsername] = useState(props?.value ?? '');
    const [registerPassword, setRegPass] = useState(props?.value ?? '');

    const [loginUsername, setLoginUsername] = useState(props?.value ?? '');
    const [loginPassword, setLoginPass] = useState(props?.value ?? '');
    const navigate = useNavigate();
    
    const userLogin= (e) =>{
        e.preventDefault();
        const userInput= {
            email : loginUsername,
            password : loginPassword
        }
        if(userInput.email != '' && userInput.password != '' && userInput.email != ' ' && userInput.password != ' '){
            fetch('http://localhost:3001/login', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(userInput)
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if(data.success){
                    navigate('/home');
                    // console.log(data); 
                }
                else{
                    alert(data.message); 
                    // console.log(data);
                }
                     
            });
            setLoginPass('');
            setLoginUsername('');
        }
        else{
            alert("Enter Valid input!");
        }

    }
    const userRegister= (e) =>{ 
        e.preventDefault();
        const userInput = {
            id : Math.random().toPrecision(8),
            email : registerUsername,
            password : registerPassword
        }
        if(userInput.email != '' && userInput.password != '' && userInput.email != ' ' && userInput.password != ' ')
        {
           fetch('http://localhost:3001/register', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(userInput)
            })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);        
               
            });
            setRegPass('');
            setRegUsername('');
        }
        else{
                alert("Enter Valid input!");
        }
    }
    
    return(
        <div className="login-wrap">
            <form>
            <h1>Register</h1>
            <label><b>Username</b></label>
            <input 
            type="text" 
            value={registerUsername}
            placeholder="Enter email id"
            onInput={e => setRegUsername(e.target.value)}
            />
            <label ><b>Password</b></label>
            <input 
            type="password" 
            placeholder="Enter password"
            value={registerPassword}
            onInput={e => setRegPass(e.target.value)}
            />
            <button onClick={userRegister}>Sign up</button>
            <hr/>
            <p>Already a user Login below! </p>
            <h1>Login</h1>
            <label><b>Username</b></label>  
            <input 
            type="text" 
            placeholder="Enter an email id"
            value={loginUsername}
            onInput={e => setLoginUsername(e.target.value)}
            />
            <label ><b>Password</b></label>
            <input 
            type="password" 
            placeholder="Enter password"
            value={loginPassword}
            onInput={e => setLoginPass(e.target.value)}
            />
            <button  
            onClick={userLogin}
            className="login-wrap-link">Login</button>
            </form>

        </div>
        

    );
}
export default Login;