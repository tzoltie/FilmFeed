import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styling.css"
import "../../styling/feed.css"
import FilmCard from "../Feed/FilmCard/FilmCard";
import { getProfile } from "../../Utils/apiClient";
import Button from "../Button";

export default function CastPage() {
    const [person, setPerson] = useState([])
    const urlPararms = useParams()
    const [showBio, setShowBio] = useState(false)
    const [allCredits, setAllCredits] = useState([])

    useEffect(() => {
        getProfile(urlPararms.id).then(setPerson)
    }, [urlPararms.id])

    const shortenBio = (bio) => {
        if(typeof bio === "undefined") {
            return bio
        }
        if(bio.length > 1000) {
            const shortenedBio = bio.slice(0, 1000)
            return `${shortenedBio}...`
        }
        return bio
    }

    const onClick = () => {
        setShowBio(prev => !prev)
    }

    
    const removeDuplicates = (crewList) => {
        const newList = []
        const filterCrewDups = crewList.forEach(role => {
            if(!newList.includes(role.job)) {
                newList.push(role.job)
            }
        })
        return newList
    }

    
    const onClickShowList = (role) => {
        
        if(typeof role === 'string') {
            const found = person.combined_credits.crew.filter((film) => film.job === role)
            if(found.length > 0) {
                const creditsFound = {credits: found}
                setAllCredits(creditsFound)
            }
            return;
        }
        if(typeof role !== 'string') {
            const castCredits = {credits: role}
            setAllCredits(castCredits)
        }
        return;
    }

    return (
        <>
            {typeof person === 'object' && (
            <div className="profile-container">
                <header className="profile-header">
                    <div>
                        <div>
                            <h1>{person.name}</h1>
                        </div>
                    </div>
                    <section className="profile-header-bio">
                        <div className="profile-image-container">
                            <img 
                            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                            alt={`${person.name}'s profile image`}
                            id="persons_profile_img"
                            />
                        </div>
                        <div className="bio-container" onClick={() => onClick()}>
                            {!showBio ? (
                                <p>{shortenBio(person.biography)}</p>
                            ) : (
                                <p>{person.biography}</p>
                            )}
                        </div>
                    </section>
                </header>
            <section className="film-list-container">
                <ul className="film-list">
                    {person.length === 0 ? (
                        <li></li>
                    ) : (
                <div className="credits-container">
                    {typeof person.combined_credits.crew !== 'undefined' &&
                        <div className="crew-credits-list-container">
                            <div className="credits-scroll-box">
                                <ul className="credits-list">
                                {removeDuplicates(person.combined_credits.crew).map((credits, index) =>
                                    {typeof person.combined_credits.cast !== 'undefined' ? (
                                        <>
                                        <li className="credit-box">
                                            <Button text={<h2>Actor</h2>} className={"credits-menu-btn"} onClick={() => {onClickShowList(person.combined_credits.cast)}}/>
                                        </li>
                                        <li key={index} className="credit-box">
                                            <Button text={<h2>{credits}</h2>} className={"credits-menu-btn"} onClick={() => onClickShowList(credits)}/>
                                        </li>
                                        </>
                                    ) : (
                                        <>
                                        <li key={index} className="credit-box">
                                        <Button text={<h2>{credits}</h2>} className={"credits-menu-btn"} onClick={() => onClickShowList(credits)}/>
                                        </li>
                                        </>
                                    )} 
                                )}
                                </ul>
                            </div>
                        </div>
                    }
                </div>
                    )}
                </ul>
                <div className="credits-list-container">
                    {typeof allCredits.credits !== 'undefined' &&
                    <div>
                        <ul className="credits-poster-list">
                            {allCredits.credits.map((film) => 
                            <li key={film.id}>
                                <img src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                className="list-image"/>
                            </li>)}
                        </ul>
                    </div>
                    }
                </div>
            </section>
        </div>
        )}
        </>
    )
}