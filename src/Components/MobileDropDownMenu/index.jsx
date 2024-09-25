import Sidebar from "../Dashboard/sidebar";

export default function MobileMenuDropDown() {
    const app = document.getElementsByClassName("app-container")
    app[0].style.height = "100vh"
    return (
        <div className="drop-down-menu-container">
            <Sidebar />
        </div>
    )
}