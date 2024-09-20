import { useNavigate } from "react-router-dom";
import FilmfeedLogo from "../../Assets/FilmfeedLogo";
import Button from "../../Button";

export default function LogoBtn() {
    const navigate = useNavigate()
    function goHome() {
        navigate('/home')
    }

    return (
        <section className="logo-container">
            <Button text={
                <div className='logo-text-box'>
                    <FilmfeedLogo />
                    <h1 className='header-title'>Filmfeed</h1>
                </div>
            } className={"logo-btn"} onClick={() => goHome()}/>
        </section>
    )
}