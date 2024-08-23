import { useEffect, useState } from "react";
import { getUsersListById } from "../../Utils/apiClient";
import { useParams } from "react-router-dom";
import ListPage from "../UsersList/listPage";
import "../UsersList/styling.css"
import Button from "../Button";
import Add from "../AddFilm";
import useSearch from "../hooks/useSearch";

export default function List() {
    const [userslist, setUsersList] = useState({status: "pending"})
    const URLParams = useParams()
    const { searchResRef } = useSearch()

    useEffect(() => {
        getUsersListById(URLParams.listId).then(setUsersList)
    }, [])

    const onClick = () => {
        return window.scrollTo({top: searchResRef.current, behavior: 'smooth'})
    }

    return (
        <div className="list-container">
            {userslist.status === "success" &&
            <>
            <header className="list-page-heading-box">
                <h2>{userslist.data.list.title}</h2>
            </header>
            <main>
                <ListPage list={userslist.data.list.films}/>
                <Button text={<Add />} className={"addFilm-button"} onClick={() => onClick()}/>
            </main>
            </>
            }
        </div>
    )
}