import React, { useState } from 'react';
import spinner from "../../spinner.svg";
import {errorMessage,getErrorMessage} from "../../utility/errorMessage"
import './Login.css';


const Login = ({onLogin,setError}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [username,setUsername] = useState("");
    const [loginError,setLoginError] = useState('');



    function performLogin (){
        if(!username){
            setLoginError(errorMessage["login denied"]);
            return;
        }

        setError("");
        setIsLoading(true);

        onLogin(username)
            .then(setIsLoading(false))
            .catch((error) => {
                setLoginError (getErrorMessage(error.message));
                setIsLoading(false);
            });

    }

    function getUserName(event){
        setUsername(event.target.value);
    }



    return(
        <div className ="login-page">
            <div className={'form'}>
                <p className="message">{loginError}</p>
                <input onChange = {getUserName} placeholder={'username'} type={'text'}/>
                { isLoading ?
                    <img alt='spinner' src = {spinner} />:
                    <button onClick={performLogin}>Login</button>
                }
            </div>
        </div>
    );

};

export default Login;

