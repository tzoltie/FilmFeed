import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { getUsersLists } from "../../Utils/apiClient"
import "./styling.css"
import CreateList from "../CreateList/index.jsx"
import AddNewList from "./usersListsPage/addNewList.jsx"
import AllLists from "./usersListsPage/allLists.jsx"
import { useMediaQuery } from "react-responsive"

export default function UsersLists() {
    const { loggedInUser } = useAuth()
    const [usersList, setUsersLists] = useState({ status: "pending"})
    const [newList, setNewList] = useState(false)
    const [listsUpdated, setListsUpdated] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
    const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

    useEffect(() => {
        getUsersLists(user.id).then(setUsersLists)
    }, [user, newList, listsUpdated, isMobile])

    
   
    return (
        <div className="lists-container">
            <header>
                <h2>{`${user.profile.name}'s`} lists</h2>
            </header>
            <main>
            {newList || usersList.status === "pending" || usersList.status === "fail" &&
                <AddNewList setNewList={setNewList}/>}
                {!newList &&
                <CreateList setNewList={setNewList} setListsUpdated={setListsUpdated}/>
                }
                {newList || usersList.status === "success" &&
                <AllLists usersList={usersList}/>
                }
            </main>
        </div>
    )
}