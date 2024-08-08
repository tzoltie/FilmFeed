import { useState } from 'react'
import Button from '../Button'
import LoginForm from './loginForm'
import './styling.css'
import backArrow from '../../assets/svg/backarrow.svg'
import RegisterForm from './registerForm'

export default function Login() {
    const [registered, setRegistered] = useState(true)
    const [buttonText, setButtonText] = useState("Login")
    const [formClass, setFormClass] = useState("login-form")


    function backToLogin() {
        setRegistered(true)
        setButtonText("Login")
        setFormClass("login-form")
    }

    return (
        <div className="login-page-container">
            <section className="login-page">
                {registered &&
                <div className='login-form-container'>
                <LoginForm text={buttonText} registered={registered} formClass={formClass} setRegistered={setRegistered} setButtonText={setButtonText} setFormClass={setFormClass}/>
                </div>
                }
                {!registered &&
                <div className='sign-up-form-container'>
                    <img 
                        src={backArrow}
                        className='icon'
                        id='form-backarrow'
                        onClick={() => backToLogin()}
                    />
                    <RegisterForm />
                </div>
                }
            </section>
        </div>
    )
}