import { useLocation } from "react-router-dom"

export default function ListPage() {
    const listData = useLocation()
    const list = listData.state 
    console.log(list)
    return (
        <div className="list-page-container">
            <header>
                <div className="list-title-container">
                    {/* <h2>{list.title}</h2> */}
                </div>
            </header>
        </div>
    )
}