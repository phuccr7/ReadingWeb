import React, { useState, useEffect } from 'react'
import UserPage from '../userPage/UserPage';
import style from '../userPage/style1.module.css'
import DescribeContentUser from '../content/DescribeContentUser'
import ContentFavorite from '../content/ContentFavorite'
import "../sidebar/homeUser.css"
import HeaderUser from '../../components/header/HeaderUser'
import Heart from '../../assets/imgs/heart.png'
import { Outlet } from 'react-router-dom'



function FavoriteBook() {
    const [book, setBook] = useState(10);

    

    return (
        <div className="contentUser" style={{marginLeft:"20px"}}>
                    
                    <div className={style.library}>
                        <div className={style.libraryheader1}>
                            <img src={Heart} alt="" height={50} width={50} style={{marginRight:"30px",marginTop:"15px"}}/><div className={style.title1}>My favorite books</div>

                        </div>
                        <ContentFavorite style={{ flex: 3 }} setBook={setBook} />
                        
                    </div>
                </div>
    )
}

export default FavoriteBook
