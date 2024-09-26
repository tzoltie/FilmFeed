import Add from "../../AddFilm";
import Button from "../../Button";

export default function AddNewList({setNewList}) {
    const onClick = () => {
        setNewList(true)
    }

    return (
        <div className="empty-list-container">
            <div>
                <ul className="empty-list-list">
                    <li className="empty-list-item">
                        <section className="list-poster">
                            <Button text={<Add />} onClick={onClick} className="add-list-button"/>
                        </section>
                        <div className="list-title-container">
                            <h4>Add new list</h4>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}