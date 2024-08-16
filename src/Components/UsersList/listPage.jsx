import { useLocation } from "react-router-dom"
import ListImage from "./listImage"
import "./styling.css"

export default function ListPage() {
    const listData = useLocation()
    // const list = listData.state 
    // console.log(list)
    const list = [{film: {id: 238, poster: "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg"}}, {film: {id: 242, poster: "/lm3pQ2QoQ16pextRsmnUbG2onES.jpg"}}, {film: {id: 268, poster: "/cij4dd21v2Rk2YtUQbV5kW69WB2.jpg"}}, {film: {id: 278, poster: "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"}}, {film: {id: 389, poster: "/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg"}}, {film: {id: 497, poster: "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg"}}]
    return (
        <div className="list-page-container">
            <header>
                <div className="list-title-container">
                    {/* <h2>{list.title}</h2> */}
                </div>
            </header>
            <main>
                <div className="list-page-main">
                    <ul className="list-page-list">
                        <ListImage films={list}/>
                    </ul>
                </div>
            </main>
        </div>
    )
}