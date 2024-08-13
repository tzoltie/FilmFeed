import { useState } from "react"
import Button from "../Button"
import "../UsersList/styling.css"

export default function CreateList() {
    const [newListForm, setNewListForm] = useState({
        listTitle: ""
    })

    const onChange = (e) => {
        const { listTitle } = e.target
        setNewListForm({ listTitle: listTitle })
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
                    onChange={onChange}
                    />
                </header>
                <main>
                    <Button className="add-film-to-list-btn"/>
                </main>
            </div>
        </div>
    )
}