import { useState } from "react";
import Button from "../Button";
import './styling.css'

export default function LoginForm({setRegistered, setButtonText, setFormClass}) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function renderSignUpForm() {
        setRegistered(false)
        setButtonText("Sign Up")
        setFormClass("sign-up-form")
        return 
     }
    

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }
    return (
        <>
        <form className="login-form">
            <input
                className="textinput"
                type="textbox"
                placeholder='Email'
                value={formData.email}
                onChange={onChange}
                required
                
            />
            <input
                className="textinput"
                type='textbox'
                placeholder='Password'
                value={formData.password}
                onChange={onChange}
                required
            />
            
        </form>
        <div className="login-form-buttons">
            <Button text="Login" className="login-button" />
            <Button text={"Sign Up"} className={"login-button"} onClick={() => renderSignUpForm()}/>
        </div>

        </>
    )
}