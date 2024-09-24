import { useNavigate } from "react-router-dom";
import Menu from "../../Assets/Menu/menu";
import Button from "../../Button";

export default function MobileMenu() {
    const navigate = useNavigate()
    const onClick = () => {
        navigate('/menu')
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