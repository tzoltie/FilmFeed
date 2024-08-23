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
    const [usersList, setUsersLists] = useState({ status: "pending"})
    const [newList, setNewList] = useState(false)
    const [listsUpdated, setListsUpdated] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        getUsersLists(user.id).then(setUsersLists)
    }, [user, newList, listsUpdated])


    const onClick = () => {
        setNewList(true)
    }

   
    return (
        <div className="lists-container">
            <header>
                <h2>{`${user.profile.name}'s`} lists</h2>
            </header>
            <main>
            {newList || usersList.status === "pending" || usersList.status === "fail" &&
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
                </div>}
                {!newList &&
                <CreateList setNewList={setNewList} setListsUpdated={setListsUpdated}/>
                }
                {newList || usersList.status === "success" &&
                <div className="list-container">
                    <ul className="list-list">
                    {usersList.data.lists.toReversed().map((list) => 
                        <ListCard list={list} key={list.id} films={list.films}/>)}
                    </ul>
                </div>
                }
            </main>
        </div>
    )
}