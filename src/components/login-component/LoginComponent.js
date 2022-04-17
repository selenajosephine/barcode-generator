import React, { useState } from 'react';
import { loginUser } from '../../services/AuthService';
import { updateSession } from '../../utils/UserUtils';

export const LoginComponent = ({ setUser }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await loginUser({ username, password });
        if (response.status === 'OK') {
            setUser(response.data.data);
            updateSession(response.data.data);
            window.location.reload()
        }
        else {
            setErrorMessage(response.error);
        }
    }

    return (
        <>
            <div className="login-wrapper">
                <h1>Please Log In to Continue</h1>
                {errorMessage && (
                    <div className="border border-danger px-3">
                        <h6 className="text-danger">{errorMessage} </h6>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="d-flex flex-column"   >
                    <label>
                        <div>Username</div>
                        <input type="text" onChange={e => setUserName(e.target.value)} value={username} />
                    </label>
                    <br />
                    <label>
                        <div>Password</div>
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
                    </label>
                    <br />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}