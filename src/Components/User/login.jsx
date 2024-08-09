import { useState } from 'react'
import LoginForm from './loginForm'
import './styling.css'
import backArrow from '../../assets/svg/backarrow.svg'
import RegisterForm from './registerForm'

export default function Login() {
    const [registered, setRegistered] = useState(true)

    function backToLogin() {
        setRegistered(true)
    }

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
        </div>
    )
}