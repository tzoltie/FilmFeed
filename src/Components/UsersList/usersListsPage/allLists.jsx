import { ListCard } from "../listCard";

export default function AllLists({usersList}) {
    return (
        <div className="list-container">
            <ul className="list-list">
            {usersList.data.lists.toReversed().map((list) => 
                <ListCard list={list} key={list.id} films={list.films}/>)}
            </ul>
        </div>
    )
}