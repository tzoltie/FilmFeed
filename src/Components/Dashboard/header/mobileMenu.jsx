import { useNavigate } from "react-router-dom";
import Menu from "../../Assets/Menu/menu";
import Button from "../../Button";
import { useState } from "react";


export default function MobileMenu() {
    const navigate = useNavigate()
    const [firstClick, setFirstClick] = useState(true)

    const onClick = () => {
        if(firstClick) {
            setFirstClick(false)
            navigate('/menu')
        } else {
            setFirstClick(true)
            navigate(-2)
        }
    }
    

    return (
        <section className="mobile-menu-container">
            <Button text={<div className="mobile-menu-dropdown">
                <Menu />
            </div>} onClick={() => onClick()} className={"logo-btn"}>
            </Button>
        </section>
    )
}