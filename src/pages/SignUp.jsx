import React, { useContext, useState } from 'react'
import { ResumesContext } from '../context/resumes'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
    const navigate=useNavigate()
    const {register}=useContext(ResumesContext)
    const [data, setData] = useState({
        email: '',
        password: '',
        role: 'user'
    })
    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }

    const handleSignUp = () => {
        register(data)
        navigate('/')
    }

    return (
        <>
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

                <button onClick={handleSignUp}>sign up</button>
            </div>
        </>
    )
}
