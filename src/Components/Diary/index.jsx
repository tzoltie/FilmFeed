import { useEffect, useState } from "react"
import { getUserDiary } from "../../Utils/apiClient"
import useAuth from "../hooks/useAuth"
import DiaryList from "./diaryList.jsx"
import "./styling.css"

export default function Diary() {
    const [diary, setDiary] = useState({ status: "pending" })
    const { loggedInUser } = useAuth()
    const isLoggedIn = localStorage.getItem('token')
    const userDiary = []
    const user = JSON.parse(localStorage.getItem('user'))


    useEffect(() => {
        getUserDiary().then(setDiary)
    }, [])

    const checkDate = () => {
        const jan = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "1") return review})
        const feb = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "2") return review})
        const mar = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "3") return review})
        const apr = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "4") return review})
        const may = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "5") return review})
        const jun = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "6") return review})
        const jul = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "7") return review})
        const aug = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "8") return review})
        const sep = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "0" && review.createdAt[6] === "9") return review})
        const oct = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "1" && review.createdAt[6] === "0") return review})
        const nov = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "1" && review.createdAt[6] === "1") return review})
        const dec = diary.data.reviews.filter((review) => {if(review.createdAt[5] === "1" && review.createdAt[6] === "2") return review})
        if(jan.length >= 1) {
            console.log("jan arr test",jan)
            userDiary.push({month: "January", list: jan})
        }
        if(feb.length >= 1) {
            userDiary.push({month: "February", list: feb})
        }
        if(mar.length >= 1) {
            userDiary.push({month: "March", list: mar})
        }
        if(apr.length >= 1) {
            userDiary.push({month: "April", list: apr})
        }
        if(may.length >= 1) {
            userDiary.push({month: "May", list: may})
        }
        if(jun.length >= 1) {
            userDiary.push({month: "June", list: jun})
        }
        if(jul.length >= 1) {
            userDiary.push({month: "Jul", list: jul})
        }
        if(aug.length >= 1) {
            userDiary.push({month: "August", list: aug})
        }
        if(sep.length >= 1) {
            userDiary.push({month: "September", list: sep})
        }
        if(oct.length >= 1) {
            userDiary.push({month: "October", list: oct})
        }
        if(nov.length >= 1) {
            userDiary.push({month: "Nov", list: nov})
        }
        if(dec.length >= 1) {
            userDiary.push({month: "December", list: dec})
        }
        return userDiary.map((d, index) => <DiaryList month={d.month} monthList={d.list} key={index}/>)
    }

    return (
        <div className="diary-container">
            {typeof user === 'object' &&
            <>
            <header className="diary-header">
                <h2>{`${user.profile.name}'s`} Diary</h2>
            </header>
            <main>
                {diary.status === "pending" ? (
                    <div className="empty-diary-container">
                        <h3>No films logged so far, rate all yours films you watch to log them</h3>
                    </div>
                ) : (
                    <div className="populated-diary-container">
                        {checkDate()}
                    </div>
                )}
            </main>
            </>
            }
        </div>
    )
}