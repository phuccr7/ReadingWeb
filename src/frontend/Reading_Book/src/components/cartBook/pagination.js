import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css'

const Pagination = () => {
    let pages = [];
    const currentPageNum = localStorage.getItem('currentPage');

    const totalPage = localStorage.getItem('totalPage');
    const [currentPage, setCurrentPage] = useState(parseInt(currentPageNum));
    for (var i = 1; i <= parseInt(totalPage); i++) {
        pages.push(i);
    }


    return (
        <div className='pagination'>
            {

                pages.map((page, index) => {

                    return (<a href={`/book/page/${page}`}>
                        <button key={index} onClick={() => {
                            localStorage.setItem("currentPage", page);
                            setCurrentPage(page)
                        }}
                            className={page === currentPage ? "active" : ""}>{page}</button>
                    </a>)

                })
            }

        </div>
    )
}

export default Pagination