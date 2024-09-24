import '../../styling/dashboard.css'
import { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useSearch from '../hooks/useSearch'
import { useMediaQuery } from 'react-responsive'
import LogoBtn from './header/logoBtn'
import Searchbar from './header/searchbar'
import MobileSearchbar from './header/mobileSearchbar'
import Menu from '../Assets/Menu/menu'
import Sidebar from './sidebar'
import MobileMenu from './header/mobileMenu'


export default function Dashboard() {
    const { loggedInUser, setIsLoggedIn } = useAuth()
    const { request, setRequest, setSearchForm, searchResRef } = useSearch()
    const [userSearch, setUserSearch] = useState(false)
    const token = localStorage.getItem('token')
    
    useEffect(() => {
        userLoggedIn()
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    })

    const isDesktop = useMediaQuery({query: '(min-width: 1224px)'})
    const isMobile = useMediaQuery({ query: '(max-width: 430px)'})

    function userLoggedIn() {
        if(token) {
            setIsLoggedIn(true)
        }
    }
    

    const appTitle = document.getElementsByClassName("header-title")
    const mobileDashHeader = document.getElementsByClassName("header")
    const mobileDashSearchbar = document.getElementsByClassName("search-bar-container-dashboard")
    const mobileDashTextInput = document.getElementsByClassName("search-films-searchbar")

    function onClick() {
        if(isMobile) {
            appTitle[0].style.display = "none"
            mobileDashHeader[0].style.gridTemplateColumns = "0.1fr 0.1fr 1fr"
            mobileDashSearchbar[0].style.width = "95%"
            // console.log(mobileDashTextInput[0])
            // mobileDashTextInput[0].style.width = "91%"
        }
        setUserSearch(true)
    }

    const handleClickOutside = (e) => {
        if(
            searchResRef.current &&
            !searchResRef.current.contains(e.target) && isMobile
        ) {
            setUserSearch(false)
            setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
            setRequest({results: []})
            appTitle[0].style.display = ""
            mobileDashHeader[0].style.gridTemplateColumns = "0.1fr 1fr 1fr"
            mobileDashSearchbar[0].style.width = "85%"
        } else if(
            searchResRef.current &&
            !searchResRef.current.contains(e.target)
        ) {
            setUserSearch(false)
            setSearchForm(prevForm => ({ ...prevForm, filmTitle: "" }))
            setRequest({results: []})   
        }
    }

    return (
        <>
            <header className="header">
                {isDesktop &&
                <>
                <LogoBtn />
                <Searchbar searchResRef={searchResRef} userSearch={userSearch} request={request} onClick={onClick}/>
                </>}
                {isMobile &&
                <>
                <MobileMenu />
                <LogoBtn />
                <MobileSearchbar searchResRef={searchResRef} userSearch={userSearch} request={request} onClick={onClick}/>
                </>
                }
            </header>
            <aside className='left-sidebar'>
                <Sidebar />
            </aside>
            <footer className='footer'>

            </footer>
        </>
    )
}