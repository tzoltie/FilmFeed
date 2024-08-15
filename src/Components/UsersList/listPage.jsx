import { useLocation } from "react-router-dom"

export default function ListPage() {
    const location = useLocation()
    const list = location.state
    console.log(list)
    return (
        <div className="list-page-container">

        </div>
    )
}