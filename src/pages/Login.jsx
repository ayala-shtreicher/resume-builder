import React, { useContext, useState } from 'react'
import { ResumesContext } from '../context/resumes';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



export default function Login() {
    const { logInUser ,getUserByEmail} = useContext(ResumesContext);
    const auth = getAuth();

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleInputs = (event) => {
        let inputs = { [event.target.name]: event.target.value }
        setData({ ...data, ...inputs })
    }

    const logIn = (e) => {
        debugger
        e.preventDefault();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                console.log(response.user)
                 getUserByEmail(response.user.email)
                 navigate('/list')
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message)
            });
        //    let issuccess= logInUser(data);
        //    console.log(issuccess)
        //    if(issuccess){
        //       

        //    }
        //    else{
        //     alert("try again")
        //    }
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

                <button onClick={logIn}>Log In</button>
            </div>
        </>
    )
}
