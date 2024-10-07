import { useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";
import LoginForm from './loginForm'
import './styling.css'
import backArrow from '../../assets/svg/backarrow.svg'
import RegisterForm from './registerForm'
import { useMediaQuery } from 'react-responsive';
import Button from '../Button';

export default function Login() {
    const [registered, setRegistered] = useState(true)
    const [popup, setPopup] = useState(false)

    function backToLogin() {
        setRegistered(true)
    }

    const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

    return (
        <div className="login-page-container">
            <section className="login-page">
                {registered &&
                <div className='login-form-container'>
                    <h2>Sign In</h2>
                <LoginForm setRegistered={setRegistered} />
                </div>
                }
                {!registered &&
                <div className='sign-up-form-container'>
                    <h2>Sign Up</h2>
                    <div className='sign-up-form-body'>
                        <img 
                        src={backArrow}
                        className='icon'
                        id='form-backarrow'
                        onClick={() => backToLogin()}
                        />
                        <RegisterForm />
                    </div>
                    <h3>By creating an account you will be able to log and review every film you watch.</h3>
                </div>
                }
            </section>
            {isMobile && !popup &&
            <div className="mobile-popup-loginPage">
                <div className="login-popup-body">
                    <div className="login-popup-text">
                        <p>Filmfeed is not currently mobile friendly, for best user experience use on a larger screen.</p>
                    </div>
                    <div>
                        <Button text={"continue"} className={"login-popup-continue"} onClick={()=> setPopup(true)}/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}