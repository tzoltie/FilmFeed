import { useState } from "react";
import Button from "../Button";
import './styling.css'
import { HandleLogin } from "../../Utils/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setRegistered }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    function renderSignUpForm() {
        setRegistered(false)
        return 
     }
    

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const onClick = (e) => {
        e.preventDefault()
        try {
            HandleLogin(formData.email, formData.password)
            setFormData({
                email: "",
                password: ""
            })
        } catch(err) {
            return alert(err.message)
        }
    }

    return (
        <>
        <form className="login-form">
            <input
                className="textinput"
                type="textbox"
                placeholder='Email'
                value={formData.email}
                name="email"
                onChange={onChange}
                required
                
            />
            <input
                className="textinput"
                type='textbox'
                placeholder='Password'
                value={formData.password}
                name="password"
                onChange={onChange}
                required
            />
            
        </form>
        <div className="login-form-buttons">
            <Button text="Login" className="login-button" onClick={onClick}/>
            <Button text={"Sign Up"} className={"login-button"} onClick={() => renderSignUpForm()}/>
        </div>

        </>
    )
}