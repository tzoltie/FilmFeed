import { useEffect, useState } from "react";
import { FilmList } from "../FilmLists/index";
import useAuth from "../hooks/useAuth";
import { getUsersListById } from "../../Utils/apiClient";

export default function List() {
    const { loggedInUser } = useAuth()
    const [userslist, setUsersList] = useState({status: "pending"})
    

    useEffect(() => {
        getUsersListById(loggedInUser.id).then(setUsersList)
    }, [loggedInUser])

    return (
        <div className="list-container">
            {userslist.status === "success" &&
            <FilmList loggedInUser={loggedInUser} list={userslist.data.title} results={userslist}/>}
        </div>
    )
}