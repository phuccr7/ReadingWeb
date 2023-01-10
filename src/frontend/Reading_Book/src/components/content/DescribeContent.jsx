import React, { useEffect, useState } from "react";
import { useStore } from "../store/hook";
import { Link } from "react-router-dom";
import Style from "./styleDescript.module.css";

import "../topbook/card.css";
import bookService from "../../service/bookService";

const read = (id) => {

  localStorage.setItem("currentChapter", 0);
  window.localStorage.setItem("idBookForRead", id);
  window.location.href = "https://ebooks4u.netlify.app/read";
};
function DescribeContent(props) {
  const [state, update] = useStore();
  const [top, setTop] = useState([]);
  useEffect(() => {
    bookService
      .getTopBookAdmin(3)
      .then((res) => {
        setTop(res.data.data);
      })
      .catch((e) => { });
  }, []);
  return (
    <>
      <div className={Style.container} style={props.style}>
        <div style={{ marginTop: "40px" }}>
          TOP BOOK
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <div className="listTopBook">
              {top.map((item, index) => {
                let text = item?.category.map((a) => a.name);
                text = text.toString();
                text = text.substring(0, text.length);
                return (
                  <div className="cardHoverMe" key={index}>
                    <div className="contentHoverMe">
                      <div className="front">
                        <div className="cardTopBook">
                          <div className="TopBook">
                            <img src={item?.image} alt="top book" />
                          </div>
                        </div>
                      </div>

                      <div className="back">
                        <div>
                          <div style={{ marginBottom: "10px" }}>
                            {" "}
                            {item?.name}
                          </div>
                          <div className="country block-ellipsis ">
                            <span className="titleTopBook">Author:&nbsp;</span>
                            {item?.author}
                          </div>
                          <div className="country block-ellipsis ">
                            <span className="titleTopBook">
                              Category:&nbsp;
                            </span>
                            {text}
                          </div>
                          <div className="country block-ellipsis ">
                            <span className="titleTopBook">Country:&nbsp;</span>
                            {item?.country?.name}
                          </div>
                          <Link to={"/read"} onClick={() => {
                            read(item?._id);
                          }}>
                            <button

                            >
                              Read Now
                            </button>
                          </Link>

                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DescribeContent;
