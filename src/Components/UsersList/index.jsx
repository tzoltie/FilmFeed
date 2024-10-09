import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { getUsersLists } from "../../Utils/apiClient"
import "./styling.css"
import CreateList from "../CreateList/index.jsx"
import AddNewList from "./usersListsPage/addNewList.jsx"
import AllLists from "./usersListsPage/allLists.jsx"
import { useMediaQuery } from "react-responsive"
import Button from "../Button/index.jsx"
import Add from "../AddFilm/index.jsx"

export default function UsersLists() {
    const { loggedInUser } = useAuth()
    const [usersList, setUsersLists] = useState({ status: "pending"})
    const [newList, setNewList] = useState(false)
    const [listsUpdated, setListsUpdated] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'))
    const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
    const isMobile = useMediaQuery({ query: '(max-width: 430px)'})
    const [newListMobile, setNewListMobile] = useState(false)

    useEffect(() => {
        getUsersLists(user.id).then(setUsersLists)
        .then(updateMobileStyling)
    }, [user, newList, listsUpdated])

    const updateMobileStyling = () => {
        if(isMobile && !newListMobile) {
            const list = document.getElementsByClassName("list-list")[0]
            list.style.padding = "0"
            const listsPageContainer = document.getElementsByClassName("lists-container")[0]
            listsPageContainer.style.maxWidth = "100vw"
            listsPageContainer.style.padding = "0.25rem"
            return;
        }
    }

    const onClick = () => {
        return setNewListMobile(true)
    }
   
    return (
        <div className="lists-container">
            {!newListMobile ?
            <>
            <header>
                <h2>{`${user.profile.name}'s`} lists</h2>
            </header>
            <main>
            {newList || usersList.status === "pending" || usersList.status === "fail" &&
                <AddNewList setNewList={setNewList}/>}
                {!newList && isDesktop &&
                <CreateList setNewList={setNewList} setListsUpdated={setListsUpdated}/>
                }
                {newList || usersList.status === "success" &&
                <AllLists usersList={usersList}/>
                }
            </main>
            {isMobile && <Button text={<Add />} className={"addList-button"} onClick={() => onClick()}/>}
            </> :
            <CreateList setNewList={setNewList} setListsUpdated={setListsUpdated}/>
             }
        </div>
    )
}