import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import './login.css'
import UserContext from '../../context/UserContext';
import axios from 'axios';
import validateInputs from '../../utils/ValidateInputs';
import { login } from '../../utils/apiUrl';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userNameErrorMessage, setUserNameErrorMessage] = useState('');
    const [passwordErrorMessage, setPassWordErrorMessage] = useState('');
    const history = useHistory();
    const { setUser } = useContext(UserContext);

    function handleSubmit() {
        let  isValid  = validateInputs("email", email);
        if (!isValid) {
            setUserNameErrorMessage('Not a valid email.');
            return;
        }
         isValid  = validateInputs("password", password);
        if (!isValid) {
            setPassWordErrorMessage('Password must contain at least 8 characters, including at least one letter and one number.');
            return;
        }
        axios.post(login, { email, password })
            .then((response) => {
                setUser(response.data);
                history.push('/home');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="align">
            <div className="grid">
                <div className="form login">
                    <div className='login-heading'>Login Here!</div>
                    <div className="form__field">
                        <label htmlFor="login__username"><svg className="icon">
                            <use xlinkHref="#icon-user"></use>
                        </svg><span className="hidden">Password</span></label>
                        <input
                            autoComplete='username'
                            id="login__username"
                            type="text" name="username"
                            className="form__input"
                            placeholder="Username"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required />
                            {userNameErrorMessage && <p className="error">{userNameErrorMessage}</p>}
                    </div>
                    <div className="form__field">
                        <label htmlFor="login__password"><svg className="icon">
                            <use xlinkHref="#icon-lock"></use>
                        </svg><span className="hidden">Password</span></label>
                        <input
                            id="login__password"
                            type="password"
                            name="password"
                            className="form__input"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required />
                            {passwordErrorMessage && <div className="error">{passwordErrorMessage}</div>}
                    </div>
                    <div className="form__field">
                        <input type="submit" onClick={handleSubmit} value="Sign In" />
                    </div>
                </div>
                <p className="text--center">Not a member? <Link to="/signup">Sign up now </Link>
                    <svg className="icon">
                        <use xlinkHref="#icon-arrow-right"></use>
                    </svg>
                </p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icons">
                <symbol id="icon-lock" viewBox="0 0 1792 1792">
                    <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
                </symbol>
                <symbol id="icon-user" viewBox="0 0 1792 1792">
                    <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                </symbol>
            </svg>
        </div>
    );
}

export default Login;
