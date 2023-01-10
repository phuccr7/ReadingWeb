import React, { useState, useEffect } from "react";

import { useStore } from "../store/hook";
import HeaderUser from "../header/HeaderUser";
import "./readbook.css";
import { getListChapter } from "../../service/GetChapter";
import left from "../../assets/imgs/left.png";
import star from "../../assets/imgs/star.png";
import heart from "../../assets/imgs/love.png";
import right from "../../assets/imgs/right.png";
import redirect from "../../assets/imgs/next.png";
import volume from "../../assets/imgs/volume.png";
import bookService from "../../service/bookService";
import UserService from "../../service/UserService";
import { jwt } from "../../service/authHeader";
import $ from "jquery";
import Footer from "../footer/Footer"

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const notify = () => toast('You need to login to comment!!!', {
  position: "top-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
});

function ContentAB(props) {
  if (props.chapter)
    return (
      <ContentRead
        chapter={props.chapter[props.currentChapter]}
        book={props.book.name}
      />
    );
}

const upComment = async () => {
  let ids = window.localStorage.getItem("idBookForRead");

  let check = jwt()
  if (check == "{}") {
    notify();
    return
  }
  let content = $("#CommentRead").val();
  if (content == "") return
  $("#CommentRead").val("");

  let jwts = jwt();

  await fetch(`https://ebook4u-server.onrender.com/user/comment/${ids}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: jwts,
    },
    method: "POST",
    body: JSON.stringify({ contentComment: content }),
  })
    .then((result) => {
      const load = async () => {
        const datas = await UserService.getProfileUser();
        let user = datas.data.data;
        let a = `
                <div class="commentLine">
                <img class ="imgAdd" src=${user.avatar}></img>
                                <div class='commentReadBook'>
                                     <div class='nameUserRead'>${user.username} </div>
                                <div> ${content}</div>
                                </div>
                                </div>`;
        $(".footerComment").prepend(a);
      };
      load();
    })
    .catch((error) => { });
};
const paint = (id) => {
  // alert(id)
  let idCur = `#chapter${id}`
  console.log(idCur);
  let a = $(id);
  console.log(a);
  // var element = document.getElementById(idCur);
  // console.log(element);
  // element.classList.add("current");
  $(id).addClass("current")

}
const ReadBook = () => {
  const [mode, setMode] = useState(0);

  const [chapter, setChapter] = useState(null);
  const [book, setbook] = useState([]);
  const [comment, setComment] = useState([]);
  let a = localStorage.getItem("currentChapter");
  if (!a) a = 0;
  const [currentChapter, setCurrentChapter] = useState(parseInt(a));
  let ids = window.localStorage.getItem("idBookForRead");
  // console.log(currentChapter)
  // console.log("currentChapter")
  $("#chapter" + currentChapter).addClass("current")

  useEffect(() => {
    // alert("Asd")


    const fetch = async () => {
      await bookService
        .getBookById(ids)
        .then((response) => {
          const load = async () => {
            await setChapter(response.data.data.chapters);
          };
          load();
          setbook(response.data.data.book);
          setComment(response.data.data.comments);
          window.localStorage.setItem(
            "maxChapter",
            response.data.data.chapters.length
          );
        })
        .catch((err) => { });
    };
    fetch();

  }, [currentChapter]);

  return (
    <>
      <div>
        <HeaderUser />
        <ToastContainer />

        <div className="mainRead">
          <div className="beforeMain">
            <img src={book.image} alt="" />
          </div>
          <div className="contentRead">
            <ContentAB
              chapter={chapter}
              book={book}
              currentChapter={currentChapter}
            />
          </div>
          <div className="afterMain">
            <div className="titleAfterMain">Chapter List</div>
            {chapter?.map((index, count) => {
              let id = "chapter" + count
              return (
                <div>
                  <span
                    id={id}
                    key={count}
                    className="chapterOfBook"
                    onClick={() => {

                      window.localStorage.setItem("currentChapter", count);
                      window.location.reload(false);
                    }}

                  >
                    {" "}
                    Chapter {count + 1}
                  </span>
                </div>
              )
            })}{" "}
          </div>
        </div>
        <div className="enterComment">
          <div className="form__group field">
            <input
              type="input"
              className="form__field"
              placeholder="Comment"
              name="name"
              id="CommentRead"
              required
            />
            <label for="name" className="form__label">
              Comment
            </label>
          </div>
          <div className="sendding">
            <button className="buttonSend" onClick={upComment}>
              <div className="svg-wrapper-1">
                <div className="svg-wrapper">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>Send</span>
            </button>
          </div>
        </div>
        <div className="footerComment">
          {comment?.map((item, index) => (
            <div className="commentLine" key={index}>
              <img className="imgAdd" src={item.user.avatar}></img>
              <div className="commentReadBook">
                <div className="nameUserRead">{item.user.username} </div>
                <div> {item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ "marginTop": "80px" }}></div>
      <Footer />
    </>
  );

  // $("#chapter" + currentChapter).attr("color", "red")

};

function ContentRead(props) {
  // const [currentChapter, setCurrenChapter] = useState([]);

  // console.log("---");
  // console.log(props);
  return (
    <div className="outContent">
      {/* {dataChapter.data.name} */}
      <div className="titleRead">
        <div className="prevTitle">
          <img
            src={left}
            alt=""
            onClick={() => {

              let index = parseInt(
                window.localStorage.getItem("currentChapter")
              );
              if (index != 0) {
                index -= 1;
                window.localStorage.setItem("currentChapter", index);
                window.location.reload(false);
              }
            }}
          />
        </div>
        <div className="midTittle">
          {/* <img src={heart} alt="" />
          <img src={star} alt="" />
          <img src={redirect} alt="" />
          <img src={volume} alt="" /> */}
        </div>
        <div className="nextTittle">
          <img
            src={right}
            alt=""
            onClick={() => {
              let index = parseInt(
                window.localStorage.getItem("currentChapter")
              );
              let max = parseInt(window.localStorage.getItem("maxChapter"));
              if (index != max - 1) {
                index += 1;
                window.localStorage.setItem("currentChapter", index);
                window.location.reload(false);

              }
            }}
          />
        </div>
      </div>
      <div className="story">
        <div className="nameBook">

          {props.book}
        </div>
        <div className="nameChapter">
          <p dangerouslySetInnerHTML={{
            __html: `${props.chapter?.name}`,
          }} />
          {/* {} */}
        </div>
        {/* <div className='contentOfPerChapter'> {props.chapter?.contentText}</div> */}
        <div className="contentOfPerChapter">
          <p
            dangerouslySetInnerHTML={{
              __html: `${props.chapter?.contentText}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ReadBook;
