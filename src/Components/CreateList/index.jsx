import { useState } from "react"
import Button from "../Button"
import "../UsersList/styling.css"
import "./styling.css"
import Add from "../AddFilm"
import Search from "../Search"

export default function CreateList() {
    const [newFilm, setNewFilm] = useState(false)
    const [newListForm, setNewListForm] = useState({
        listTitle: ""
    })

    const titleOnChange = (e) => {
        const { name, value } = e.target
        setNewListForm({ [name]: value })
    }

    const onClick = () => {
        setNewFilm(true)
    }

    return (
        <div className="new-list-container">
            <div className="empty-list-item">
                <header>
                    <input
                    placeholder="List title"
                    className="listTitle-input"
                    name="listTitle"
                    value={newListForm.listTitle}
                    required
                    onChange={titleOnChange}
                    />
                </header>
                <main className="search-container">
                    {!newFilm &&
                        <Button text={Add} className="add-film-to-list-btn" onClick={onClick}/>
                    }
                    {newFilm &&
                    <div className="addFilmToList-container">
                        <Search />
                    </div>
                    }
                </main>
            </div>
        </div>
    )
}