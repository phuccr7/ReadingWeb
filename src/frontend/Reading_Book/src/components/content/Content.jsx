import React, { useContext } from "react";
import Style from "../../style/content.module.css";
import { Main, StoreContext } from "../cartBook/CartBook";
import { updateBook } from "../store/action";
import Context from "../store/Context";
import { useStore } from "../store/hook";
import Pagination from "../cartBook/pagination";
import $ from "jquery"
function Content(props) {
  return (
    <>
      <div style={props.style}>
        <div className={Style.content}>
          <div className={Style.headerContent}>

            <div style={{ flex: 1 }}> </div>
            <div className="main-search-input-wrap" >
              <div
                className="main-search-input fl-wrap"
                style={{ display: "flex", marginRight: "20px" }}
              >
                <div className="main-search-input-item">
                  <input type="text" defaultValue="" placeholder="Search..." id="searchHome" />
                </div>

                <button className="main-search-button" onClick={() => {
                  let name = $('#searchHome').val();
                  let result = name.toLowerCase();
                  localStorage.setItem("searchName", result);
                  localStorage.setItem("currentPageSearch", 1);

                  window.location.href = "https://ebooks4u.netlify.app/search"

                }}>Search</button>
              </div>
            </div>
          </div>

          <div className={Style.forYou}>
            <div>For You</div>
            <div className={Style.contentForYou}>
              <Main />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default Content;
