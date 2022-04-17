import React, { useEffect } from 'react';
import { logoutUser, isUserLoggedIn } from '../../utils/UserUtils';

export const Header = ({ title = "Package Management" }) => {

    const logout = () => {
        logoutUser();
        window.location.reload()
    }
    return (
        <div className="blue-background text-white p-3 font-30-px d-flex flex-row justify-content-between">
            <div onClick={() => window.location.replace('/')}>{title}</div>
            {isUserLoggedIn() && <div className="" onClick={logout}>Logout</div>}
        </div>
    )
}