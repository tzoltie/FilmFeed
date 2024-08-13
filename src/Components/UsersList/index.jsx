import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { ListCard } from "./listCard.jsx"
import { getUsersLists } from "../../Utils/apiClient"
import Button from "../Button/index.jsx"
import "./styling.css"
import Add from "../AddFilm/index.jsx"
import CreateList from "../CreateList/index.jsx"

export default function UsersLists() {
    const { loggedInUser } = useAuth()
    const [usersList, setUsersLists] = useState([])
    const [newList, setNewList] = useState(false)

    useEffect(() => {
        getUsersLists(loggedInUser.id).then(setUsersLists)
    }, [loggedInUser, newList])

    const onClick = () => {
        setNewList(true)
    }
   
    return (
        <div className="lists-container">
            <header>
                <h2>{`${loggedInUser.profile.name}'s`} lists</h2>
            </header>
            <main>
            {usersList.length === 0 || usersList?.data.lists.length === 0 || usersList.status === "fail" || !newList ? (
                <div className="empty-list-container">
                    <div className="empty-list-header">
                        <h3>{loggedInUser.username}, add films to your list</h3>
                    </div>
                    <div>
                        <ul className="empty-list-list">
                            <li className="empty-list-item">
                                <section className="list-poster"><Button text={Add} onClick={onClick} className="add-list-button"/></section>
                                <div className="list-title-container">
                                    <h4>Add new list</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                ) : (
                    <div className="list-container">
                        <ul className="list-list">
                        {usersList.data.lists.map((list) => 
                            <ListCard list={list} key={list.id}/>)}
                        </ul>
                    </div>
                )}
                {newList &&
                <CreateList />}
            </main>
        </div>
    )
}