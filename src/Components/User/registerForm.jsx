import { useState } from "react"
import Button from "../Button"

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        firstName: ""
    })

    const onChange = (e) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value})
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        if(
            formData.email === "" ||
            formData.password === "" ||
            formData.username === "" ||
            formData.firstName === ""
        ) {
            return alert("Form is incomplete please ensure all fields are complete")
        }
    }

    return (
        <>
        <form className="sign-up-form" onSubmit={onSubmit}>
            <input
                className="textinput"
                type="textbox"
                placeholder='Email'
                name="email"
                value={formData.email}
                onChange={onChange}
                required
            />
            <input
                className="textinput"
                type='textbox'
                placeholder='Password'
                name="password"
                value={formData.password}
                onChange={onChange}
                required
            />
            <input 
                className="textinput"
                type="textbox"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={onChange}
                required
            />
            <input
                className="textinput"
                type="textbox"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                required
            />
        </form>
        <Button text="Sign Up" className="login-button"/>
        </>
    )
}