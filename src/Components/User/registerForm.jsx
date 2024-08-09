import { useState } from "react";
import Button from "../Button";
import "./styling.css";
import { HandleRegister } from "../../Utils/auth";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onClick = (e) => {
    e.preventDefault();
    try  {
        HandleRegister(
            formData.email,
            formData.password,
            formData.username,
            formData.firstName
        )
        setFormData({
            email: "",
            password: "",
            username: "",
            firstName: "",
        })
    } catch (err) {
        return alert(err.message)
    }
  };

  return (
    <div className="sign-up-form-box">
      <form className="sign-up-form">
        <input
          className="textinput"
          type="textbox"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <input
          className="textinput"
          type="textbox"
          placeholder="Password"
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
      <Button text="Sign Up" className="login-button" onClick={onClick}/>
    </div>
  );
}
