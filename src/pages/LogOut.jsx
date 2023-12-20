import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import {ResumesContext} from '../context/resumes';

export default function LogOut() {
    const { auth } = useContext(ResumesContext);

    const handlelogout = () => {
        signOut(auth).then(() => {
            console.log(auth);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div className="App-header">
            <input
                placeholder="Email"
                name="email"
                type="email"
                className="input-fields"
                onChange={event => handleInputs(event)}
            />
            <input
                placeholder="Password"
                name="password"
                type="password"
                className="input-fields"
                onChange={event => handleInputs(event)}
            />

            <button onClick={handlelogout}>Log out</button>
        </div>

    )
}
