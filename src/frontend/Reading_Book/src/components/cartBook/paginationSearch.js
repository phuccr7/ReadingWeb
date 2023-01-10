import React, {useState} from "react";
import { Link } from "react-router-dom";
import './style.css'

const Pagination = () => {
    let pages = [];
    const currentPageNum = localStorage.getItem('currentPageSearch');

    const totalPage = localStorage.getItem('totalPageSearch');
    const [currentPage, setCurrentPage] = useState(parseInt(currentPageNum));
    for(var i = 1; i <= parseInt(totalPage); i++){
        pages.push(i);
    }
    

    return(
        <div className='pagination'>
            {
                
                pages.map((page, index) => {

                    return <a href={`/search/book/page/${page}`}>
                    <button key={index} onClick={() => {
                        localStorage.setItem("currentPageSearch", page);
                        setCurrentPage(page)}}
                    className={page === currentPage ? "active" : ""}>{page}</button>
                    </a>
                    
                })
            }
            
        </div>
    )
}

export default Pagination