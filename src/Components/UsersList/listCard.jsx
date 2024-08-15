import { useNavigate } from "react-router-dom";
import ListImage from "./listImage";

export function ListCard({list, films}) {
    const navigate = useNavigate()

    const onClick = () => {
        navigate(`${list.id}`, { state: list})
    }

    return (
        <li className="users-list-item" onClick={onClick}>
            <div>
                <h3>{list.title}</h3>
            </div>
            {films.length === 0 &&
            <div className="empty-image-container"></div>}
            {films.length > 0 &&
            <ListImage films={films}/>
            }
        </li>
    )
}