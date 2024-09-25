import { useNavigate } from "react-router-dom";
import AddToWatchList from "../../Assets/AddToWatchlist";
import DiaryIcon from "../../Assets/Diary";
import ListIcon from "../../Assets/List";
import LogoutIcon from "../../Assets/Logout";
import PopularReleasesIcon from "../../Assets/Popular";
import ProfileIcon from "../../Assets/Profile";
import TheatreMaskIcon from "../../Assets/TheatreMasks";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
    const { onLogout, setIsLoggedIn } = useAuth()
    const navigate = useNavigate()
    const token = localStorage.getItem('user')

    function goToLists() {
        navigate('/lists')
    }

    function logOut() {
      setIsLoggedIn(false)
      localStorage.removeItem('user')
      onLogout
      navigate('/')
  }


  return (
    <section className="sidebar-nav">
      <div
        className="nav-bar-list-container"
        onClick={() => navigate("/popular")}
      >
        <PopularReleasesIcon />
        <h2>Popular Films</h2>
      </div>
      <div className="nav-bar-list-container">
        <TheatreMaskIcon />
        <h2>Cinema Greats</h2>
      </div>
      {typeof token === "string" && (
        <>
          <div
            className="nav-bar-list-container"
            onClick={() => navigate("/watchlist")}
          >
            <AddToWatchList />
            <h2>Watchlist</h2>
          </div>
          <div
            className="nav-bar-list-container"
            onClick={() => navigate("/profile")}
          >
            <ProfileIcon />
            <h2>Profile</h2>
          </div>
          <div
            className="nav-bar-list-container"
            onClick={() => navigate("/diary")}
          >
            <DiaryIcon />
            <h2>Diary</h2>
          </div>
          <div className="nav-bar-list-container" onClick={() => goToLists()}>
            <ListIcon />
            <h2>Lists</h2>
          </div>
          <div className="nav-bar-list-container" onClick={() => logOut()}>
            <LogoutIcon className={"logout-btn"} />
            <h2>Logout</h2>
          </div>
        </>
      )}
    </section>
  );
}
